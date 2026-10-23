# English C1 Practice (offline PWA)

**Live app:** https://losmaniac.github.io/C1English/ — open it on your phone and choose
*Add to Home screen* / *Install app*. After the first load it works offline.

The build is path-independent (`base: './'`), so the same bundle runs at `/` locally and at
`/C1English/` on GitHub Pages. `.github/workflows/deploy-pages.yml` runs typecheck, tests, the
offline guard and the build on every push to `main`, then publishes `dist/` to Pages.

An installable, offline-first practice app for C1 English: advanced grammar, high-value vocabulary,
collocations, phrasal verbs and idioms, with spaced review and an explanation after every answer.

Nothing is fetched at runtime. There is no backend, no account, no analytics and no AI service —
all learning content is static, reviewed data compiled into the app.

## Commands

```bash
npm install
npm run dev            # local development server
npm test               # unit + integration tests (Vitest + Testing Library)
npm run typecheck      # tsc --noEmit, strict
npm run build          # typecheck + production build into dist/
npm run preview        # serve the production build (use this to test the PWA)
npm run check:offline  # fails if src/ gains fetch calls, remote URLs or AI SDKs
```

## Project layout

```
src/
  content/     reviewed learning content + integrity checks (no logic, no UI)
    grammar.ts, grammarReference.ts, grammarModals.ts, grammarClauses.ts, grammarEmphasis.ts
    vocabulary.ts, vocabularyNuance.ts
    collocations.ts, collocationsAdvanced.ts
    idioms.ts, idiomsAdvanced.ts
    index.ts   content registry and lookups
    validate.ts structural checks, run in tests and at app start
  domain/      pure logic: types, answer normalisation, scheduler, session planning, progress
  storage/     versioned local persistence (load/save/export/import with recovery)
  ui/          screens and components (Today, Library, Session, Summary, Progress, Settings)
  styles/      design tokens and all styling (hand-written CSS, no CSS framework)
```

## How practice works

1. **Today** shows what is due, how many items have never been practised, and a note on how much is
   stored locally. The counts follow your current focus area.
2. **Start session** builds a queue: due reviews first (earliest first), then up to the configured
   number of new items. Session length is `max(5, round(minutes × 1.1))` questions.
3. **Each question** is answered by selection or by typing (typed answers are compared after safe
   normalisation and against an explicit list of accepted answers).
4. **Feedback** states whether the answer is right, gives the answer key, explains why, and shows the
   item's meaning, examples, common error, collocations, register and (optionally) a Czech note.
5. **Review dates** are set by an SM-2-inspired scheduler: 1 day → 3 days → interval × ease; a wrong
   answer returns tomorrow; a hint halves the next interval.
6. **Summary** lists what was missed, so those items can be reviewed deliberately.
7. **Library** lists all 104 items with a search box, area and status filters (not started, learning,
   due, mastered), expandable notes, and a "Practise this item" shortcut.
8. **Progress** reports accuracy, attempts, items practised/learned/mastered, due counts, area
   coverage, recent sessions, and a **trouble-spots** list of everything missed at least once, with a
   button that drills exactly those items. These are practice indicators, not a CEFR assessment.

### Keyboard shortcuts during a session

| Key | Action |
|---|---|
| `1`–`9` | Select the corresponding option (choice questions) |
| `Enter` | Check the answer; after feedback, go to the next question |
| `n` | Next question after feedback |

## Content

| Area | Items | Exercises |
|---|---|---|
| Grammar | 31 | 32 |
| Vocabulary | 29 | 25 |
| Collocations | 24 | 24 |
| Idioms and phrasal verbs | 20 | 20 |
| **Total** | **104** | **106** |

Every item carries a meaning, two or three natural examples, a "Watch out" note on the common error,
collocations or patterns where they matter, a register label, and occasionally a Czech-interference
note. All of it is original, reviewed content compiled into the bundle.

## Data and privacy

- All progress lives in `localStorage` under `english-c1:data` with `schemaVersion: 2`.
- Version 1 data (no focus setting) is migrated on load, not discarded.
- Loads are defensive: unreadable data is copied to `english-c1:data:corrupt` and replaced with a
  fresh set rather than crashing the app.
- Settings → Backup and restore exports/imports a JSON file. Clearing browser data deletes progress
  unless a backup exists.

## Optional cross-device sync (Firebase)

The app works with no account at all. Sign-in is optional and, when it is not configured, the
Settings screen says so instead of showing buttons that cannot work.

**What is synced:** review dates (`ReviewState`) and session history, in one Firestore document per
learner: `users/{uid}/state/progress`. **What is not synced:** theme, session length, focus and the
Czech-note toggle — those are device preferences and stay in `localStorage`.

**Merge rule (deterministic):** per item, the more recently reviewed state wins; ties break by
repetitions, then lapses, then interval. Sessions are unioned by id. Merging twice gives the same
result, and both devices end up identical after a sync.

### This repo's project (already provisioned)

| Item | Value |
|---|---|
| Firebase project | `c1english-e3ac9` (display name C1English) |
| Web app | `1:388845762667:web:87b986f4060a60ce02d92e` |
| Firestore database | `(default)`, location `europe-west3` |
| Sign-in provider | Google, enabled |
| Authorized domains | `localhost`, `c1english-e3ac9.firebaseapp.com`, `c1english-e3ac9.web.app`, `losmaniac.github.io` |
| Build variables | the six `VITE_FIREBASE_*` GitHub repository variables |

What the CLI did, so it can be repeated on another project:

```bash
firebase apps:create web "English C1 Practice" --project c1english-e3ac9
firebase apps:sdkconfig web <appId> --project c1english-e3ac9
firebase firestore:databases:create "(default)" --location europe-west3 --project c1english-e3ac9
firebase deploy --only firestore:rules            # uses .firebaserc
```

The CLI has no command for sign-in providers or authorized domains, so those were set through the
Identity Toolkit Admin API (`defaultSupportedIdpConfigs/google.com` to check the provider,
`config?updateMask=authorizedDomains` to allow `losmaniac.github.io`), authenticated with the CLI's
own stored credentials.

### Enabling it from scratch

1. Firebase console → your project → **Add app → Web** and copy the config values.
2. **Authentication → Sign-in method → Google → Enable**.
3. **Authentication → Settings → Authorized domains**: add `losmaniac.github.io` (localhost is there
   by default).
4. **Firestore Database → Create database** (production mode is fine).
5. Publish the security rules from `firestore.rules` — each user can touch only their own document:
   ```
   firebase deploy --only firestore:rules     # or paste the file into the console
   ```
6. Provide the six values to the build:
   - locally: copy `.env.example` to `.env.local` and fill it in;
   - GitHub Pages: **Settings → Secrets and variables → Actions → Variables** and add
     `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
     `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.

These are public client identifiers, not secrets — access is controlled by the Firestore rules and
the authorized-domain list. That is why they are build variables rather than repository secrets.

### How it behaves offline

The Firebase SDK is a separate chunk, loaded with a dynamic import only when sync is configured. If
the chunk cannot be fetched, the app reports a sync error and keeps working locally. Firestore's
persistent cache queues writes made offline and flushes them when the connection returns.

## What "no network" means here, precisely

- `npm run check:offline` scans `src/` and fails the check if any `fetch`, `XMLHttpRequest`, axios,
  analytics snippet, remote URL or AI SDK reference appears, and it fails if `firebase` is imported
  anywhere outside `src/sync/` or without a dynamic `import()`.
- The production bundle was inspected byte by byte: it contains no `fetch(` and no `XMLHttpRequest`
  at all. The module-preload polyfill is disabled for this reason.
- The only `https://` string in the bundle is React's own error-documentation link
  (`https://react.dev/errors/...`), which is plain text inside React's minified error decoder. It is
  never requested.

## PWA behaviour

- `vite-plugin-pwa` generates the manifest and service worker; icons are local PNGs.
- Updates are offered as a banner (`registerType: 'prompt'`) so a session is never interrupted.
- Test offline mode with `npm run preview`: load once, then disable the network and reload; the app
  and all content still work.

## Adding content

1. Add a `LearningItem` to the relevant file in `src/content/` with a stable slug `id`.
2. Add at least one `Exercise` that references that `itemId`.
3. Keep answers unambiguous: list every legitimate alternative in `accepted`, or use selection-based
   formats when usage genuinely allows more than one right answer.
4. Run `npm test` — `src/content/content.test.ts` fails if ids clash, an answer key is missing, an
   option is duplicated, or an item has no exercise.

## Known limitations

- 104 items is a solid practice set, not a complete C1 syllabus: further grammar areas (punctuation,
  hedging in speech, advanced punctuation) and more business registers can be added without touching
  the engine.
- No listening, pronunciation or free-writing feedback: those need bundled audio or human/AI review.
- Review timing is a rolling 24 hours from the last answer, not a fixed "study day" boundary.
- No accounts or sync by design; device migration is via export/import only.
- Offline behaviour is verified through the service-worker precache list and a local production
  preview, not on physical iOS/Android hardware.
