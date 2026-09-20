#!/usr/bin/env node
/* Render diagrams/*.svg to committed PNGs in diagrams/png/, at 1x and 2x.
 *
 * You do not need this to use the kit. The PNGs are committed. This exists so
 * that whoever edits an SVG next has a reproducible way to regenerate them,
 * rather than having to reverse-engineer how the first export happened.
 *
 * It drives headless Chrome rather than adding a rasterizer dependency,
 * because this repository has no package.json and is not going to acquire one
 * for a build step that runs about twice a year. Chrome also gets correct text
 * shaping for free.
 *
 * Fonts: the SVGs set type in Source Serif 4 and IBM Plex, which are not
 * system fonts. Rendering an SVG directly makes Chrome fall back to Times. So
 * each SVG is wrapped in an HTML document declaring @font-face against woff2
 * files inlined as base64. If those files are not present the render still
 * succeeds using the fallbacks declared in each SVG, and says so.
 *
 * Usage:  node tools/render-diagrams.mjs
 *         node tools/render-diagrams.mjs --fonts /path/to/woff2/dir
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const CHROME = process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const argIdx = process.argv.indexOf('--fonts');
const FONT_DIR = argIdx > -1 ? process.argv[argIdx + 1] : null;

/* Maps a family name to a filename fragment to look for in the font dir. */
const FAMILIES = [
  ['Source Serif 4', 'source-serif-4-wght'],
  ['IBM Plex Sans', 'ibm-plex-sans-wght'],
  ['IBM Plex Mono', 'ibm-plex-mono-500']
];

function fontFaces() {
  if (!FONT_DIR || !existsSync(FONT_DIR)) return { css: '', found: 0 };
  const files = readdirSync(FONT_DIR);
  let found = 0;
  const css = FAMILIES.map(([family, frag]) => {
    /* Exclude italic explicitly: 'source-serif-4-wght-italic' contains the
       upright fragment, and readdir hands it back first, which silently
       renders every heading in italic. */
    const hit = files.find((f) =>
      f.includes(frag) && f.endsWith('.woff2') && !f.includes('italic'));
    if (!hit) return '';
    found++;
    const b64 = readFileSync(join(FONT_DIR, hit)).toString('base64');
    return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${b64}) format('woff2');font-weight:100 900;font-display:block;}`;
  }).join('\n');
  return { css, found };
}

const SIZES = [1, 2];
const svgs = readdirSync(join(ROOT, 'diagrams')).filter((f) => f.endsWith('.svg'));
if (!svgs.length) { console.error('render-diagrams: no SVGs found. Run build-diagrams.mjs first.'); process.exit(1); }

const { css, found } = fontFaces();
if (found === 0) {
  console.warn('render-diagrams: no woff2 files found, rendering with the fallback fonts declared in each SVG.');
  console.warn('  Pass --fonts <dir> for the branded render.');
} else {
  console.log(`render-diagrams: inlined ${found} font families.`);
}

const tmp = mkdtempSync(join(tmpdir(), 'ai-triangle-render-'));
let count = 0;

try {
  for (const name of svgs) {
    const svg = readFileSync(join(ROOT, 'diagrams', name), 'utf8');
    const w = Number(/width="(\d+)"/.exec(svg)?.[1] || 460);
    const h = Number(/height="(\d+)"/.exec(svg)?.[1] || 384);

    for (const scale of SIZES) {
      const html = `<!DOCTYPE html><meta charset="utf-8"><style>${css}
html,body{margin:0;padding:0;background:transparent}
svg{display:block;width:${w * scale}px;height:${h * scale}px}</style>${svg}`;
      const htmlPath = join(tmp, `${name}.${scale}.html`);
      writeFileSync(htmlPath, html);

      execFileSync(CHROME, [
        '--headless', '--disable-gpu', '--hide-scrollbars',
        `--window-size=${w * scale},${h * scale}`,
        '--default-background-color=00000000',
        `--screenshot=${join(tmp, 'shot.png')}`,
        `file://${htmlPath}`
      ], { stdio: 'pipe' });

      const suffix = scale === 1 ? '' : `@${scale}x`;
      const outName = basename(name, '.svg') + suffix + '.png';
      copyFileSync(join(tmp, 'shot.png'), join(ROOT, 'diagrams', 'png', outName));
      count++;
    }
  }
  console.log(`render-diagrams: wrote ${count} PNGs to diagrams/png/`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
