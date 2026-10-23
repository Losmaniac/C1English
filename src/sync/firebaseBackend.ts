import { SCHEMA_VERSION, parseAppData } from '../storage/repository';
import {
  PROGRESS_COLLECTION,
  PROGRESS_DOCUMENT,
  PROGRESS_SUBCOLLECTION,
  firebaseConfig,
  isSyncConfigured,
} from './config';
import type { RemoteProgress, SyncBackend, SyncUser } from './types';

/**
 * Firebase is loaded with dynamic imports, so the SDK is a separate chunk that
 * is only fetched when sync is configured. Nothing here runs in a local-only
 * build, and the app never depends on the network to study.
 */
let backendPromise: Promise<SyncBackend | null> | null = null;

/**
 * Returns null only when sync is not configured. If the SDK chunk cannot be
 * fetched (offline, blocked) the promise rejects, so the UI can say that sync
 * failed instead of pretending the build has no sync support.
 */
export function getSyncBackend(): Promise<SyncBackend | null> {
  if (!isSyncConfigured) return Promise.resolve(null);

  backendPromise ??= createFirebaseBackend().catch((error: unknown) => {
    backendPromise = null; // allow a retry on the next attempt
    throw error;
  });

  return backendPromise;
}

function toSyncUser(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
}): SyncUser {
  return { uid: user.uid, email: user.email, displayName: user.displayName };
}

/**
 * Remote data goes through the same defensive parsing as local data, so a
 * malformed document can never corrupt this device.
 */
export function toRemoteProgress(raw: unknown): RemoteProgress | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const candidate = raw as { reviews?: unknown; sessions?: unknown; updatedAt?: unknown };
  const parsed = parseAppData(
    JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      settings: {},
      reviews: candidate.reviews ?? {},
      sessions: candidate.sessions ?? [],
    }),
  );
  if (!parsed) return null;
  return {
    schemaVersion: SCHEMA_VERSION,
    reviews: parsed.reviews,
    sessions: parsed.sessions,
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : new Date(0).toISOString(),
  };
}

async function createFirebaseBackend(): Promise<SyncBackend | null> {
  let modules;
  try {
    modules = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]);
  } catch {
    throw new Error(
      'The sync library could not be loaded. Check your connection, then try again; your progress stays safe on this device.',
    );
  }

  try {
    const [{ initializeApp }, auth, firestore] = modules;

    const app = initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId,
    });

    const authInstance = auth.getAuth(app);

    // Offline-tolerant writes: Firestore queues them in IndexedDB and retries.
    let db;
    try {
      db = firestore.initializeFirestore(app, {
        localCache: firestore.persistentLocalCache({
          tabManager: firestore.persistentMultipleTabManager(),
        }),
      });
    } catch {
      db = firestore.getFirestore(app);
    }

    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const docRef = (uid: string) =>
      firestore.doc(db, PROGRESS_COLLECTION, uid, PROGRESS_SUBCOLLECTION, PROGRESS_DOCUMENT);

    // Completes a redirect sign-in when the browser blocked the popup.
    void auth.getRedirectResult(authInstance).catch(() => undefined);

    return {
      onUserChanged(callback) {
        return auth.onAuthStateChanged(authInstance, (user) => {
          callback(user ? toSyncUser(user) : null);
        });
      },
      async signInWithGoogle() {
        try {
          const result = await auth.signInWithPopup(authInstance, provider);
          return toSyncUser(result.user);
        } catch (error) {
          const code = (error as { code?: string }).code ?? '';
          if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
            await auth.signInWithRedirect(authInstance, provider);
            throw new Error('Google sign-in continues in this window; the page may reload.');
          }
          throw error;
        }
      },
      async signOut() {
        await auth.signOut(authInstance);
      },
      async pull(uid) {
        const snapshot = await firestore.getDoc(docRef(uid));
        if (!snapshot.exists()) return null;
        return toRemoteProgress(snapshot.data());
      },
      async push(uid, progress) {
        await firestore.setDoc(docRef(uid), progress);
      },
    };
  } catch {
    return null;
  }
}
