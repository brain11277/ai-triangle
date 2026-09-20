/* Generate schema/faq.jsonld from FAQ.md.
 *
 * Generated rather than hand-maintained so the two cannot drift. An FAQPage
 * whose answers differ from the page it describes is worse than no FAQPage.
 *
 * Run: node tools/build-faq-schema.mjs
 * Check: node tools/build-faq-schema.mjs --check   (exits 1 if out of date)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const md = readFileSync(join(root, 'FAQ.md'), 'utf8');
const outPath = join(root, 'schema', 'faq.jsonld');

/* Strip the markdown that would be meaningless inside a JSON-LD string value,
   keeping the text itself identical. */
function plain(s) {
  return s
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s*\n\s*/g, ' ')
    .trim();
}

const entries = [];
const re = /^### (.+)$/gm;
let m;
const marks = [];
while ((m = re.exec(md)) !== null) marks.push({ q: m[1].trim(), start: re.lastIndex });

marks.forEach((mark, i) => {
  const end = i + 1 < marks.length ? md.lastIndexOf('###', marks[i + 1].start) : md.length;
  const body = md.slice(mark.start, end).replace(/^\s*|\s*$/g, '').replace(/\n---\s*$/, '');
  entries.push({ q: plain(mark.q), a: plain(body) });
});

if (!entries.length) {
  console.error('build-faq-schema: no "### " headings found in FAQ.md');
  process.exit(1);
}

const doc = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://brianrain.com/ai-triangle/#faq',
  about: { '@id': 'https://brianrain.com/ai-triangle/#term' },
  inLanguage: 'en',
  license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  mainEntity: entries.map((e) => ({
    '@type': 'Question',
    name: e.q,
    acceptedAnswer: { '@type': 'Answer', text: e.a }
  }))
};

const json = JSON.stringify(doc, null, 2) + '\n';

if (process.argv.includes('--check')) {
  let current = '';
  try { current = readFileSync(outPath, 'utf8'); } catch { /* not built yet */ }
  if (current !== json) {
    console.error('build-faq-schema: schema/faq.jsonld is out of date. Run node tools/build-faq-schema.mjs');
    process.exit(1);
  }
  console.log(`build-faq-schema: OK. ${entries.length} questions, in sync with FAQ.md.`);
} else {
  writeFileSync(outPath, json);
  console.log(`build-faq-schema: wrote ${entries.length} questions to schema/faq.jsonld`);
}
