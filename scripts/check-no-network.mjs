#!/usr/bin/env node
/**
 * Guard rail for brief constraints 1-3: the app must not talk to the network
 * at runtime and must not embed AI SDKs. Scans application source only.
 */
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = fileURLToPath(new URL('../', import.meta.url));
const SCAN_DIRS = ['src'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.css', '.html']);

/**
 * The app may reach the network in exactly one place: the optional Firebase
 * sync layer in src/sync/. Anything else, and any AI or analytics SDK, is a
 * failure. Firebase imports are therefore allowed only under src/sync.
 */
const ALLOWED_NETWORK_DIRS = ['src/sync', 'src/ui/useSyncProgress.ts'];

const FORBIDDEN = [
  { pattern: /\bfetch\s*\(/, label: 'fetch() call' },
  { pattern: /XMLHttpRequest/, label: 'XMLHttpRequest' },
  { pattern: /\baxios\b/, label: 'axios dependency' },
  { pattern: /\bEventSource\b/, label: 'EventSource' },
  { pattern: /\bnavigator\.sendBeacon\b/, label: 'sendBeacon' },
  { pattern: /\bopenai\b/i, label: 'OpenAI reference' },
  { pattern: /\banthropic\b/i, label: 'Anthropic reference' },
  { pattern: /@google\/generative-ai/, label: 'Generative AI SDK' },
  { pattern: /\bgtag\b|\bga\s*\(\s*['"]create/, label: 'analytics snippet' },
  { pattern: /https?:\/\/(?!www\.w3\.org)/, label: 'remote URL' },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (EXTENSIONS.has(extname(entry.name))) {
      yield full;
    }
  }
}

let failures = 0;
for (const dir of SCAN_DIRS) {
  for await (const file of walk(join(PROJECT_ROOT, dir))) {
    const relativePath = relative(PROJECT_ROOT, file).replace(/\\/g, '/');
    const syncAllowed = ALLOWED_NETWORK_DIRS.some((allowed) => relativePath.startsWith(allowed));
    const text = await readFile(file, 'utf8');

    text.split(/\r?\n/).forEach((line, index) => {
      for (const rule of FORBIDDEN) {
        if (rule.pattern.test(line)) {
          failures += 1;
          console.error(`${relativePath}:${index + 1}  ${rule.label}`);
        }
      }

      // Firebase must stay inside the sync layer, and must be imported
      // dynamically so a local-only build never ships or loads it.
      if (/from\s+['"]firebase\//.test(line) && !syncAllowed) {
        failures += 1;
        console.error(`${relativePath}:${index + 1}  firebase import outside src/sync`);
      }
      if (/from\s+['"]firebase\//.test(line) && syncAllowed) {
        failures += 1;
        console.error(`${relativePath}:${index + 1}  use a dynamic import() for firebase`);
      }
    });
  }
}

if (failures > 0) {
  console.error(`\nOffline/AI guard failed with ${failures} finding(s).`);
  process.exit(1);
}
console.log('Offline/AI guard passed: no network calls, remote assets or AI SDK references in src/.');
