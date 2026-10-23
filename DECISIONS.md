# Decision log — English C1 Practice PWA

Recorded decisions only. Anything still open is listed at the end.

## Product and scope (confirmed by the learner)

| Topic | Decision | Status |
|---|---|---|
| Learning priorities | Grammar accuracy, collocations/phrasal verbs in context, nuance and register | Decided |
| English variety | British-leaning, with American variants noted where they differ | Decided |
| Explanation language | English only; optional Czech-interference notes inside feedback | Decided |
| Daily study time | 5–10 minutes per day, default session 10 minutes | Decided |
| Session composition | Due reviews first, then a bounded number of new items | Decided |
| Exercise formats v1 | Multiple choice, gap fill, error correction, collocation completion, best expression in context | Decided |
| Typed answers | Allowed only where answers are pre-authored and normalisation is safe | Decided |
| Content volume | 104 reviewed learning items and 106 exercises across five areas | Decided |
| Library screen | Browse, search, filter by area and derived status, practise a single item | Decided |
| Session focus | Optional per-area focus in settings; Today counts follow it | Decided |
| Trouble spots | Derived from lapses and last outcome; one-click drill session | Decided |
| Keyboard support | 1–9 select, Enter checks/advances, n advances | Decided |
| Review algorithm | SM-2-inspired scheduler, documented in `src/domain/srs.ts` | Decided |
| Error notebook | No separate notebook in v1; wrong answers re-enter the queue sooner | Decided |
| Gamification | None. No points, badges, streak pressure or leaderboards | Decided |
| Progress metrics | Accuracy, attempts, items practised/learned/mastered, due count, categories, recent sessions | Decided |
| CEFR claims | Figures labelled as informal practice indicators, never certification | Decided |
| Data location | Device-only `localStorage`, versioned, with export/import backup | Decided |
| Accounts / sync / analytics | None; no server, no API, no AI at runtime | Decided |
| Stack | React 19 + TypeScript (strict) + Vite 8 + `vite-plugin-pwa` 2, hand-written CSS | Decided (repository was empty) |
| Target devices | Mobile-first responsive web app; installable on supporting browsers | Decided |
| Offline requirement | Full offline use after first load; all icons, fonts and content bundled | Decided |
| Hosting | Static build; no deployment configured yet | Open |
| Visual style | Calm editorial cards, serif headings, light/dark support, no gamification | Decided |

## Implementation decisions (engineering)

| Area | Decision | Rationale |
|---|---|---|
| Navigation | View state in `App.tsx`, no router | One-screen-at-a-time flow; avoids deep-link and offline-fallback complexity |
| Storage key | `english-c1:data`, `schemaVersion: 2` | Single atomic payload; migrations live in `migrate()` (v1 data gains `focus: 'all'`) |
| Library status | Derived on the fly from `ReviewState`, never stored | One source of truth; no stale labels |
| Focus effect | Filters the queue only; reviews outside the focus simply wait | Predictable, reversible, and never loses progress |
| Trouble spots | `lapses > 0` or `lastOutcome === 'incorrect'`, worst first, capped at 10 | Honest signal that reuses existing data; no separate notebook to maintain |
| Corrupt data | Copy to `english-c1:data:corrupt`, start fresh, tell the learner | Never destroy data silently, never crash on bad JSON |
| Session size | `max(5, round(minutes × 1.1))` exercises | 10-minute default yields 11 planned questions |
| New-item cap | 0/2/4/6/8 per session, default 4 | Keeps review debt under control |
| Answer checking | Case/quotes/dash/whitespace normalisation plus explicit accepted list | No brittle exact-string matching, no free-text judging |
| Duplicate items in session | Prevention at item level, one exercise per item | Avoids drilling the same item twice in a row |
| Hint effect | Half the next interval, no ease bonus, noted in feedback | Discourages hint-farming without punishment |
| "Learned" | ≥ 2 correct recalls | Simple, explainable definition |
| "Mastered" | ≥ 3 correct recalls and interval ≥ 7 days | Documented in the UI |
| Update behaviour | `registerType: 'prompt'`, banner offers reload | Never discards an in-progress session |
| Network use | None; `npm run check:offline` scans `src/` for fetch/remote URLs/AI SDKs | Enforces brief constraints 1–3 |
| PWA icons | Generated locally as PNG (192/512) with System.Drawing | No remote/CDN assets |

## Open questions (nothing here blocks daily use)

1. Which grammar areas should the next batch cover? Candidates: punctuation and advanced learner errors,
   hedging in spoken English, more modality, nominalisation for academic writing.
2. Should listening or pronunciation features be added later? They need bundled audio, which is its own decision.
3. Where will the built app be hosted, if anywhere? Right now it runs from a local build.
4. Do you want a weekly review digest on the Progress screen (for example "this week: 5 sessions, 82%")?
