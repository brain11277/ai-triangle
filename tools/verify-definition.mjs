/* The canonical definition sentence must be byte-identical everywhere.
 *
 * Answer engines bind to a short, self-contained, attributed definition.
 * Divergent copies across the repo, the schema and the site are what break
 * that binding, and the divergence is invisible until someone diffs them.
 *
 * Run: node tools/verify-definition.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* The one true copy. Every other location is checked against this. */
export const CANONICAL =
  "The AI Triangle is a practitioner-facing project management triangle, published by Brian " +
  "Rain in 2026, in which Quality is fixed and means the human's discernment is still intact, " +
  "and the three trade variables are continuous improvement disciplines the practitioner " +
  "imposes on themselves: continuous improvement of self, of their AI tools, and of new AI.";

/* Normalize whitespace and markdown blockquote markers only. Markdown hard
   wraps at 96 columns, YAML block scalars re-indent, JSON keeps it on one
   line, and the sentence is quoted as a blockquote in two places. Everything
   else, including punctuation and capitalization, must match exactly. */
const norm = (s) => s.replace(/^[ \t]*>[ \t]?/gm, '').replace(/\s+/g, ' ').trim();
const target = norm(CANONICAL);

const LOCATIONS = [
  ['README.md', 'md'],
  ['framework/SPEC.md', 'md'],
  ['framework/GLOSSARY.md', 'md'],
  ['FAQ.md', 'md'],
  ['llms.txt', 'md'],
  ['CITATION.cff', 'md'],
  ['schema/defined-term.jsonld', 'json-description'],
  ['schema/defined-term-set.jsonld', 'json-term'],
  ['schema/faq.jsonld', 'json-faq']
];

const failures = [];
let found = 0;

for (const [rel, kind] of LOCATIONS) {
  let text;
  try { text = readFileSync(join(root, rel), 'utf8'); }
  catch { failures.push(`${rel}: file missing`); continue; }

  let hay;
  if (kind === 'json-description') {
    hay = [JSON.parse(text).description];
  } else if (kind === 'json-term') {
    hay = JSON.parse(text).hasDefinedTerm.map((t) => t.description);
  } else if (kind === 'json-faq') {
    hay = JSON.parse(text).mainEntity.map((q) => q.acceptedAnswer.text);
  } else {
    hay = [text];
  }

  if (hay.some((h) => norm(h || '').includes(target))) found++;
  else failures.push(`${rel}: canonical definition not found, or it has drifted`);
}

if (failures.length) {
  console.error(
    `verify-definition: FAIL\n\n${failures.join('\n')}\n\nExpected:\n  ${target}\n`
  );
  process.exit(1);
}
console.log(`verify-definition: OK. Identical in all ${found} locations.`);
