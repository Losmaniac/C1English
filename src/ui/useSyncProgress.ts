import { useCallback, useEffect, useRef, useState } from 'react';
import type { AppData, ReviewState, SessionRecord } from '../domain/types';
import { SCHEMA_VERSION } from '../storage/repository';
import { getSyncBackend } from '../sync/firebaseBackend';
import { mergeProgress } from '../sync/merge';
import type { RemoteProgress, SyncBackend, SyncStatus, SyncUser } from '../sync/types';

const PUSH_DEBOUNCE_MS = 1500;

interface UseSyncProgressArgs {
  data: AppData;
  /** Applies merged progress (remote + local) to the app and local storage. */
  onRemoteMerge: (reviews: Record<string, ReviewState>, sessions: SessionRecord[]) => void;
}

function messageFor(error: unknown): string {
  const code = (error as { code?: string }).code;
  if (code === 'auth/popup-closed-by-user') {
    return 'Google sign-in was closed before it finished. Nothing was changed.';
  }
  if (code === 'auth/unauthorized-domain') {
    return 'This domain is not authorised in Firebase. Add it under Authentication → Settings → Authorized domains.';
  }
  if (code === 'auth/network-request-failed') {
    return 'No connection to Google right now. Your progress is safe on this device and will sync later.';
  }
  if (code === 'permission-denied') {
    return 'Firestore refused the write. Check that the security rules allow users to write only their own document.';
  }
  return error instanceof Error ? error.message : 'Sync failed. Your progress is still saved on this device.';
}

export function toRemoteProgress(data: AppData): RemoteProgress {
  return {
    schemaVersion: SCHEMA_VERSION,
    reviews: data.reviews,
    sessions: data.sessions,
    updatedAt: new Date().toISOString(),
  };
}

export function useSyncProgress({ data, onRemoteMerge }: UseSyncProgressArgs) {
  const [status, setStatus] = useState<SyncStatus>('unconfigured');
  const [user, setUser] = useState<SyncUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const dataRef = useRef(data);
  dataRef.current = data;
  const backendRef = useRef<SyncBackend | null>(null);
  const userRef = useRef<SyncUser | null>(null);
  const timerRef = useRef<number | null>(null);
  const mergeRef = useRef(onRemoteMerge);
  mergeRef.current = onRemoteMerge;

  const push = useCallback(async () => {
    const backend = backendRef.current;
    const current = userRef.current;
    if (!backend || !current) return;

    setStatus('syncing');
    try {
      await backend.push(current.uid, toRemoteProgress(dataRef.current));
      setStatus('synced');
      setLastSyncedAt(new Date().toISOString());
      setError(null);
    } catch (caught) {
      setStatus('error');
      setError(messageFor(caught));
    }
  }, []);

  /** Called after a session so the cloud copy catches up, without spamming it. */
  const schedulePush = useCallback(() => {
    if (!userRef.current) return;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      void push();
    }, PUSH_DEBOUNCE_MS);
  }, [push]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      let backend: SyncBackend | null;
      try {
        backend = await getSyncBackend();
      } catch (caught) {
        if (!cancelled) {
          setStatus('error');
          setError(messageFor(caught));
        }
        return;
      }

      if (cancelled) return;
      if (!backend) {
        setStatus('unconfigured');
        return;
      }
      backendRef.current = backend;
      setStatus('signed-out');

      unsubscribe = backend.onUserChanged((nextUser) => {
        userRef.current = nextUser;
        setUser(nextUser);

        if (!nextUser) {
          setStatus('signed-out');
          return;
        }

        void (async () => {
          setStatus('syncing');
          try {
            const remote = await backend.pull(nextUser.uid);
            const merged = mergeProgress(dataRef.current, remote);
            if (merged.changed) mergeRef.current(merged.reviews, merged.sessions);
            await backend.push(nextUser.uid, toRemoteProgress({ ...dataRef.current, ...merged }));
            setStatus('synced');
            setLastSyncedAt(new Date().toISOString());
            setError(null);
          } catch (caught) {
            setStatus('error');
            setError(messageFor(caught));
          }
        })();
      });
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const signIn = useCallback(async () => {
    setError(null);
    let backend: SyncBackend | null;
    try {
      backend = backendRef.current ?? (await getSyncBackend());
    } catch (caught) {
      setStatus('error');
      setError(messageFor(caught));
      return;
    }

    if (!backend) {
      setStatus('unconfigured');
      return;
    }

    backendRef.current = backend;
    setStatus('signing-in');
    try {
      await backend.signInWithGoogle();
    } catch (caught) {
      setStatus('error');
      setError(messageFor(caught));
    }
  }, []);

  const signOut = useCallback(async () => {
    const backend = backendRef.current;
    if (!backend) return;
    try {
      await backend.signOut();
    } catch (caught) {
      setStatus('error');
      setError(messageFor(caught));
    }
  }, []);

  return { status, user, error, lastSyncedAt, signIn, signOut, syncNow: push, schedulePush };
}
