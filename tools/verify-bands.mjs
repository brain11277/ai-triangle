/* Prove that the paper instrument and the reference widget can never disagree.
 *
 * assessment/bands.json is the source of truth. The widget inlines an
 * equivalent implementation because it has to ship as one dependency-free
 * file. This script enumerates all 125 possible rating triples, evaluates
 * both, and fails on any difference.
 *
 * Run: node tools/verify-bands.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const spec = JSON.parse(readFileSync(join(root, 'assessment', 'bands.json'), 'utf8'));

/* The widget is a classic script, not a module, because Chrome blocks module
   scripts over file:// and the kit promises no build step and no server. So it
   is run here rather than imported, and its API is read off globalThis. */
const widgetPath = join(root, 'widget', 'ai-triangle-widget.js');
vm.runInThisContext(readFileSync(widgetPath, 'utf8'), { filename: widgetPath });
const { interpret, band } = globalThis.AITriangle;

/* Evaluate bands.json directly from its data, with no knowledge of the
   widget's implementation. If this ever needs to know about the widget to
   agree with it, the check has stopped being a check. */
function fromSpec(values) {
  for (const rule of spec.rules) {
    const w = rule.when;
    if (w.otherwise) return rule;
    if (w.allAtLeast !== undefined && !values.every((n) => n >= w.allAtLeast)) continue;
    if (w.allAtMost !== undefined && !values.every((n) => n <= w.allAtMost)) continue;
    if (w.countBelowThreeAtLeast !== undefined &&
        !(values.filter((n) => n < 3).length >= w.countBelowThreeAtLeast)) continue;
    if (w.countBelowThreeEquals !== undefined &&
        !(values.filter((n) => n < 3).length === w.countBelowThreeEquals)) continue;
    if (w.remainingAtLeast !== undefined &&
        !values.filter((n) => n >= 3).every((n) => n >= w.remainingAtLeast)) continue;
    return rule;
  }
  throw new Error('bands.json has no matching rule and no otherwise rule');
}

const failures = [];
let checked = 0;

for (let s = 1; s <= 5; s++) {
  for (let t = 1; t <= 5; t++) {
    for (let n = 1; n <= 5; n++) {
      const values = [s, t, n];
      const specRule = fromSpec(values);
      const widgetBand = band(values);
      checked++;
      if (specRule.verdict !== widgetBand.verdict || specRule.shape !== widgetBand.shape) {
        failures.push(
          `(${values.join(',')})\n` +
          `    bands.json: ${specRule.shape} / ${specRule.verdict}\n` +
          `    widget:     ${widgetBand.shape} / ${widgetBand.verdict}`
        );
      }
      if (interpret(values) !== widgetBand.verdict) {
        failures.push(`(${values.join(',')}) interpret() disagrees with band()`);
      }
    }
  }
}

/* The five cases where the rule order is what decides the answer. If someone
   "simplifies" the ordering, these are what break first, so they are asserted
   by hand rather than left to the sweep. */
const ORDER_SENSITIVE = [
  [[3, 3, 3], 'Collapsing'],
  [[2, 3, 3], 'Collapsing'],
  [[2, 4, 4], 'Lopsided'],
  [[2, 3, 5], 'Uneven'],
  [[4, 4, 3], 'Uneven']
];

for (const [values, expected] of ORDER_SENSITIVE) {
  const got = band(values).shape;
  if (got !== expected) {
    failures.push(`order-sensitive case (${values.join(',')}): expected ${expected}, got ${got}`);
  }
}

if (failures.length) {
  console.error(`verify-bands: FAIL\n\n${failures.join('\n\n')}\n`);
  process.exit(1);
}

console.log(`verify-bands: OK. ${checked} triples plus ${ORDER_SENSITIVE.length} order-sensitive cases agree.`);
