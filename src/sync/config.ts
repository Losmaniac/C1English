/**
 * Firebase configuration comes from build-time environment variables, so no
 * credentials live in the repository:
 *
 *   VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
 *   VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID,
 *   VITE_FIREBASE_APP_ID
 *
 * For local development put them in `.env.local` (git-ignored). For GitHub
 * Pages add them as repository variables, which the deploy workflow passes to
 * the build. When they are absent the app stays local-only and the Settings
 * screen says so instead of showing buttons that cannot work.
 */
const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
};

export const isSyncConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId,
);

/** users/{uid}/state/progress — one document per learner. */
export const PROGRESS_COLLECTION = 'users';
export const PROGRESS_SUBCOLLECTION = 'state';
export const PROGRESS_DOCUMENT = 'progress';
