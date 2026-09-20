/* Every relative link and image in the repo must resolve to a real file.
 *
 * Broken internal links are the most common rot in a documentation repo and
 * the least visible, because nothing fails at write time.
 *
 * Run: node tools/verify-links.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, resolve } from 'node:path';
import { walk } from './_walk.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* Markdown inline links and images: [text](target) and ![alt](target) */
const MD_LINK = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
/* HTML href/src, for the printable cards */
const HTML_REF = /(?:href|src)="([^"]+)"/g;

const failures = [];
let checked = 0;

for (const file of walk(root, ['.md', '.html'])) {
  const rel = relative(root, file);
  const text = readFileSync(file, 'utf8');
  const base = dirname(file);
  const patterns = rel.endsWith('.html') ? [MD_LINK, HTML_REF] : [MD_LINK];

  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      const raw = m[1];
      /* Skip absolute URLs, anchors, mailto and data URIs. Absolute URLs are
         only checked with --network, below. */
      if (/^(https?:|mailto:|data:|#|\/\/)/.test(raw)) continue;
      const target = resolve(base, raw.split('#')[0]);
      checked++;
      if (!existsSync(target)) {
        failures.push(`${rel}: ${raw}`);
      }
    }
  }
}

if (failures.length) {
  console.error(`verify-links: FAIL, ${failures.length} broken\n\n${failures.join('\n')}\n`);
  process.exit(1);
}
console.log(`verify-links: OK. ${checked} relative links and images resolve.`);
