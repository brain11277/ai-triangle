/* No em dashes or en dashes anywhere, including HTML entities.
 *
 * House style. The one exception is a third-party title reproduced inside a
 * citation, which must be quoted verbatim, so those lines are allowlisted
 * explicitly rather than by pattern.
 *
 * Run: node tools/verify-no-emdash.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { walk } from './_walk.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXTS = ['.md', '.html', '.js', '.mjs', '.svg', '.cff', '.txt', '.json', '.jsonld', '.csv', '.yml'];
/* Built from char codes rather than written literally, so this file does not
   itself contain the characters it rejects and can be linted like everything
   else. 0x2014 is the em dash, 0x2013 the en dash. */
const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);
const BAD = new RegExp(
  [EM, EN, '&mdash;', '&ndash;', '&#8212;', '&#8211;', '&#x2014;', '&#x2013;'].join('|')
);

/* The Medium article's own title contains an em dash. A citation has to
   reproduce its source exactly, so every line carrying that title is allowed.
   Nothing else is. */
const ALLOWED_LINE = new RegExp(
  'The AI Triangle ' + EM + ' When the Practitioner Becomes the Variable'
);

/* The vendored CC legal code is a verbatim third-party document. Altering its
   punctuation would make it not the license.

   This file is also exempt, unavoidably: it has to name the entity strings it
   rejects in order to reject them. */
const ALLOWED_FILES = new Set([
  'LICENSES/CC-BY-NC-SA-4.0.md',
  'tools/verify-no-emdash.mjs'
]);

const hits = [];
for (const file of walk(root, EXTS)) {
  const rel = relative(root, file);
  if (ALLOWED_FILES.has(rel)) continue;
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (BAD.test(line) && !ALLOWED_LINE.test(line)) {
      hits.push(`${rel}:${i + 1}  ${line.trim().slice(0, 110)}`);
    }
  });
}

if (hits.length) {
  console.error(`verify-no-emdash: FAIL, ${hits.length} occurrence(s)\n\n${hits.join('\n')}\n`);
  process.exit(1);
}
console.log('verify-no-emdash: OK. No em dashes or en dashes outside the allowlist.');
