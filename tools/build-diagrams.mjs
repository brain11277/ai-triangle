/* Generate the diagram SVGs.
 *
 * Standalone SVGs lose any external stylesheet, so every shape carries
 * presentation attributes rather than a class. Fonts are named with real
 * fallbacks for the same reason: a viewer with no IBM Plex installed must get
 * something sensible rather than Times.
 *
 * The warped shapes in the failure-modes diagram are computed with the same
 * warped() the widget and the printable grid use, so every representation of
 * a given triple is the same shape.
 *
 * Run: node tools/build-diagrams.mjs
 */

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'diagrams');

/* The widget is a classic script (see its header comment), so it is run here
   rather than imported. Reusing its warped() is the point: it keeps the tick
   marks and the failure-mode shapes identical to what the widget draws. */
const widgetPath = join(root, 'widget', 'ai-triangle-widget.js');
vm.runInThisContext(readFileSync(widgetPath, 'utf8'), { filename: widgetPath });
const { warped, FULL, ORDER } = globalThis.AITriangle;

/* Burnished Clay. Documented in diagrams/README.md. */
const C = {
  terracotta: '#B5532A',
  terracottaInk: '#9A3D18',
  oxblood: '#6B1F1A',
  sand: '#E8D5B7',
  sandAlt: '#F0E4CC',
  ink: '#1A1A1A',
  inkSoft: '#3D3835',
  offWhite: '#FAF6EE'
};
const SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif";
const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";

const LABEL = { self: 'Self', tools: 'Your AI Tools', newai: 'New AI' };
const NUDGE = { self: -22, tools: 32, newai: 32 };

const LICENSE = (t) =>
  `<!-- ${t}\n       The AI Triangle by Brian Rain. Licensed CC BY-NC-SA 4.0.\n` +
  `       https://brianrain.com/ai-triangle/\n` +
  `       Recoloring or editing this file is an adaptation: the result carries the same license. -->`;

function triangle({ stroke, dot, label, bg, outlineWidth = 2.5, centroidText = 'You' }) {
  return `
  <rect width="460" height="384" fill="${bg}"/>
  <polygon points="230,58 70,322 390,322" fill="none" stroke="${stroke}"
           stroke-width="${outlineWidth}" stroke-linejoin="round"/>
  <text x="230" y="240" text-anchor="middle" font-family="${MONO}" font-size="19"
        fill="${label}">${centroidText}</text>
${ORDER.map((k) => {
  const p = FULL[k];
  return `  <circle cx="${p.x}" cy="${p.y}" r="9" fill="${dot}"/>
  <text x="${p.x}" y="${p.y + NUDGE[k]}" text-anchor="middle" font-family="${MONO}"
        font-size="16" font-weight="500" fill="${label}">${LABEL[k]}</text>`;
}).join('\n')}`;
}

function svg(w, h, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
${LICENSE(title)}
${body}
</svg>
`;
}

const files = {};

/* 1. The main diagram. */
files['ai-triangle.svg'] = svg(460, 384, 'The AI Triangle: three continuous improvement disciplines around You at the center.',
  triangle({ stroke: C.terracotta, dot: C.terracotta, label: C.oxblood, bg: C.sand }));

/* 2. Dark ground. */
files['ai-triangle-dark.svg'] = svg(460, 384, 'The AI Triangle, dark version.',
  triangle({ stroke: '#D4744A', dot: '#D4744A', label: C.sand, bg: '#1F1B18' }));

/* 3. One bit, for photocopying and for slides on any background. */
files['ai-triangle-mono.svg'] = svg(460, 384, 'The AI Triangle, single colour version.',
  triangle({ stroke: '#000000', dot: '#000000', label: '#000000', bg: '#FFFFFF' }));

/* 4. The plotting grid. Ticks come from warped(), so a shape drawn here by
      hand matches a shape the widget draws. */
files['ai-triangle-blank.svg'] = svg(460, 384, 'Blank AI Triangle plotting grid with five tick marks on each axis.', `
  <rect width="460" height="384" fill="${C.offWhite}"/>
  <polygon points="230,58 70,322 390,322" fill="none" stroke="#999" stroke-width="2"
           stroke-dasharray="5 5" stroke-linejoin="round"/>
${ORDER.map((k) => {
  const p = FULL[k];
  return `  <line x1="230" y1="234" x2="${p.x}" y2="${p.y}" stroke="#CCC" stroke-width="1"/>`;
}).join('\n')}
  <circle cx="230" cy="234" r="2.5" fill="#666"/>
  <text x="230" y="226" text-anchor="middle" font-family="${SANS}" font-size="11" fill="#666">1</text>
${ORDER.map((k) => [2, 3, 4, 5].map((v) => {
  const p = warped(k, v);
  const tx = k === 'self' ? p.x + 12 : (k === 'tools' ? p.x + 2 : p.x - 12);
  const ty = k === 'self' ? p.y + 4 : p.y - 8;
  return `  <circle cx="${p.x.toFixed(0)}" cy="${p.y.toFixed(0)}" r="4" fill="none" stroke="#666"/>` +
         `<text x="${tx.toFixed(0)}" y="${ty.toFixed(0)}" font-family="${SANS}" font-size="11" fill="#666">${v}</text>`;
}).join('\n')).join('\n')}
${ORDER.map((k) => {
  const p = FULL[k];
  return `  <text x="${p.x}" y="${p.y + NUDGE[k]}" text-anchor="middle" font-family="${SANS}"
        font-size="14" font-weight="600" fill="${C.oxblood}">${LABEL[k]}</text>`;
}).join('\n')}`);

/* 5. Lineage: three triangles in a row. */
function mini(x, labels, year, name, accent) {
  return `  <g transform="translate(${x},0)">
    <polygon points="110,40 25,190 195,190" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="110" y="24" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${C.inkSoft}">${labels[0]}</text>
    <text x="25" y="212" text-anchor="start" font-family="${SANS}" font-size="13" fill="${C.inkSoft}">${labels[1]}</text>
    <text x="195" y="212" text-anchor="end" font-family="${SANS}" font-size="13" fill="${C.inkSoft}">${labels[2]}</text>
    <text x="110" y="250" text-anchor="middle" font-family="${SERIF}" font-size="21" font-weight="600" fill="${C.oxblood}">${name}</text>
    <text x="110" y="272" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${C.terracottaInk}">${year}</text>
  </g>`;
}
files['ai-triangle-lineage.svg'] = svg(760, 300, 'Three project management triangles: Iron 1969, Agile 2009, AI 2026.', `
  <rect width="760" height="300" fill="${C.sand}"/>
${mini(20, ['Time', 'Cost', 'Quality'], '1969', 'Iron Triangle', '#8A8A8A')}
${mini(270, ['Value', 'Quality', 'Constraints'], '2009', 'Agile Triangle', '#8A8A8A')}
${mini(520, ['Self', 'Your AI Tools', 'New AI'], '2026', 'AI Triangle', C.terracotta)}
  <text x="380" y="292" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${C.inkSoft}">Trade-offs imposed by the project, then still external, then internal.</text>`);

/* 6. The two failure modes, drawn by feeding real triples through warped(). */
function warpedPoly(vals) {
  return ORDER.map((k, i) => {
    const p = warped(k, vals[i]);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ');
}
function shapeCard(x, vals, title, caption) {
  return `  <g transform="translate(${x},0)">
    <polygon points="230,58 70,322 390,322" fill="none" stroke="#B9A184" stroke-width="2"
             stroke-dasharray="5 5" stroke-linejoin="round" transform="scale(0.62) translate(30,30)"/>
    <polygon points="${warpedPoly(vals)}" fill="rgba(181,83,42,0.20)" stroke="${C.oxblood}"
             stroke-width="2.5" stroke-linejoin="round" transform="scale(0.62) translate(30,30)"/>
    <text x="160" y="278" text-anchor="middle" font-family="${SERIF}" font-size="19" font-weight="600" fill="${C.oxblood}">${title}</text>
    <text x="160" y="300" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${C.inkSoft}">${caption}</text>
  </g>`;
}
files['ai-triangle-failure-modes.svg'] = svg(700, 320, 'Two AI Triangle failure modes drawn as warped shapes.', `
  <rect width="700" height="320" fill="${C.sandAlt}"/>
${shapeCard(20, [5, 5, 1], 'Over-prompting hide', 'Self and tools held. New AI at 1.')}
${shapeCard(370, [1, 2, 5], 'Tool sprawl', 'New AI at 5. Self and tools collapsing.')}`);

/* 7. Social card. Same layout as the microsite's OG source. */
files['ai-triangle-social-1200x630.svg'] = svg(1200, 630, 'The AI Triangle social card.', `
  <rect width="1200" height="630" fill="${C.sand}"/>
  <rect x="0" y="0" width="1200" height="12" fill="${C.terracotta}"/>
  <g transform="translate(820, 145)">
    <polygon points="160,30 20,290 300,290" fill="none" stroke="${C.terracotta}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="160" cy="30" r="13" fill="${C.terracotta}"/>
    <circle cx="20" cy="290" r="13" fill="${C.terracotta}"/>
    <circle cx="300" cy="290" r="13" fill="${C.terracotta}"/>
    <text x="160" y="200" text-anchor="middle" font-family="${MONO}" font-size="26" fill="${C.oxblood}">You</text>
  </g>
  <text x="90" y="250" font-family="${SERIF}" font-size="88" font-weight="600" fill="${C.oxblood}">The AI</text>
  <text x="90" y="345" font-family="${SERIF}" font-size="88" font-weight="600" fill="${C.oxblood}">Triangle</text>
  <text x="92" y="415" font-family="${SANS}" font-size="29" fill="${C.terracottaInk}">When the practitioner becomes the variable</text>
  <text x="92" y="560" font-family="${MONO}" font-size="24" fill="${C.inkSoft}">Brian Rain &#183; Inventive Flexibility</text>`);

let n = 0;
for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(out, name), content);
  n++;
}
console.log(`build-diagrams: wrote ${n} SVGs to diagrams/`);
