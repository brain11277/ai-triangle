/* The widget must not store or transmit anything.
 *
 * This is a promise made in widget/README.md and in the BSL Additional Use
 * Grant ("stores nothing and transmits nothing"), so it is checked rather
 * than asserted.
 *
 * Comments are stripped before scanning, because the file's own header
 * comment names these APIs in order to invite the reader to grep for them.
 *
 * Run: node tools/verify-widget-purity.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'widget', 'ai-triangle-widget.js'), 'utf8');

/* Block comments then line comments. Crude, and sufficient: this file has no
   string literal containing a comment marker. */
const code = src
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

const BANNED = [
  ['fetch(', /\bfetch\s*\(/],
  ['XMLHttpRequest', /\bXMLHttpRequest\b/],
  ['localStorage', /\blocalStorage\b/],
  ['sessionStorage', /\bsessionStorage\b/],
  ['indexedDB', /\bindexedDB\b/],
  ['sendBeacon', /\bsendBeacon\b/],
  ['WebSocket', /\bWebSocket\b/],
  ['document.cookie', /document\s*\.\s*cookie/],
  ['eval', /\beval\s*\(/]
];

const hits = BANNED.filter(([, re]) => re.test(code)).map(([name]) => name);

if (hits.length) {
  console.error(
    `verify-widget-purity: FAIL. The widget must store and transmit nothing.\n` +
    `  Found: ${hits.join(', ')}\n`
  );
  process.exit(1);
}
console.log(`verify-widget-purity: OK. None of the ${BANNED.length} storage or network APIs appear in code.`);
