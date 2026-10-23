import type { ReviewState, SessionRecord } from '../domain/types';

export interface SyncUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

/**
 * What is stored in the cloud: study progress only. Device preferences
 * (theme, session length, focus, Czech notes) deliberately stay local.
 */
export interface RemoteProgress {
  schemaVersion: number;
  reviews: Record<string, ReviewState>;
  sessions: readonly SessionRecord[];
  updatedAt: string;
}

export interface SyncBackend {
  /** Subscribes to sign-in state. Returns an unsubscribe function. */
  onUserChanged(callback: (user: SyncUser | null) => void): () => void;
  signInWithGoogle(): Promise<SyncUser>;
  signOut(): Promise<void>;
  pull(uid: string): Promise<RemoteProgress | null>;
  push(uid: string, progress: RemoteProgress): Promise<void>;
}

export type SyncStatus =
  | 'unconfigured'
  | 'signed-out'
  | 'signing-in'
  | 'syncing'
  | 'synced'
  | 'error';
