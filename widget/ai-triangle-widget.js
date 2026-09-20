/*!
 * The AI Triangle: reference widget
 * Copyright (c) 2026 Brian Rain. https://brianrain.com/ai-triangle/
 * Licensed under the Business Source License 1.1.
 * Change Date: 2029-09-20. Change License: Apache License, Version 2.0.
 * Terms: https://github.com/brain11277/ai-triangle/blob/main/LICENSES/BSL-1.1.md
 * Commercial use: https://github.com/brain11277/ai-triangle/blob/main/COMMERCIAL-LICENSE.md
 * Keeping this header satisfies the license's display requirement.
 */

/* Zero dependencies. No build step. Nothing is stored, nothing is sent.
   You can verify that last claim yourself: grep this file for fetch,
   XMLHttpRequest, localStorage, sessionStorage or sendBeacon. There are none.

   This is a CLASSIC script, deliberately, not an ES module. Chrome blocks
   module scripts loaded over file:// as a cross-origin request, so a module
   build could not be opened by double-clicking example.html, and "no build
   step, no server" is a promise this kit actually needs to keep: the same
   person who prints the paper assessment should be able to open the widget.

   The API is published on globalThis.AITriangle so Node can load this file
   with node:vm and check the verdict logic against assessment/bands.json.
   See tools/verify-bands.mjs. */

(function (root) {
'use strict';

/* ── Geometry ─────────────────────────────────────────────────────────────
   Shared by both elements so the interactive diagram and the self-check draw
   the same triangle at the same scale. CENTROID is the point a vertex
   collapses to at rating 1; FULL is where it sits at rating 5. */
const FULL = {
  self: { x: 230, y: 58 },
  tools: { x: 70, y: 322 },
  newai: { x: 390, y: 322 }
};
const CENTROID = { x: 230, y: 234 };
const ORDER = ['self', 'tools', 'newai'];

const DEFAULT_LABELS = {
  self: 'CI of Self',
  tools: 'CI of Your AI Tools',
  newai: 'CI of New AI'
};

/* Short-form definitions, also used as the accessible names of the three
   vertex buttons in the diagram element. */
const SUMMARIES = {
  self: 'Your discernment, your judgment, your AI literacy. Maintained by a weekly self-review block.',
  tools: 'Your prompts and agents as versioned artifacts. Maintained by a periodic refactor sprint.',
  newai: 'Bounded scanning and explicit triage. Maintained by an hour a week.'
};

/* ── Verdict logic ────────────────────────────────────────────────────────
   This is an inlined mirror of assessment/bands.json, which is the source of
   truth. tools/verify-bands.mjs enumerates all 125 possible triples and fails
   if this implementation and that file ever disagree.

   Rule order is load-bearing. allAtMost 3 is tested before the countBelow
   tests, so (3,3,3) is collapsing rather than uneven, and (2,3,3) is
   collapsing rather than tilting. Do not reorder these to "simplify" them. */
const BANDS = [
  {
    id: 'balanced',
    shape: 'Balanced',
    test: (v) => v.every((n) => n >= 4),
    verdict: 'Balanced. Maintain the rhythm.'
  },
  {
    id: 'collapsing',
    shape: 'Collapsing',
    test: (v) => v.every((n) => n <= 3),
    verdict: 'The shape is collapsing. Pick one vertex to start with this week. CI of self is usually the right one.'
  },
  {
    id: 'tilting',
    shape: 'Tilting',
    test: (v) => v.filter((n) => n < 3).length >= 2,
    verdict: 'Triangle is tilting. The artifact still looks polished. The maintenance is not happening.'
  },
  {
    id: 'lopsided',
    shape: 'Lopsided',
    test: (v) =>
      v.filter((n) => n < 3).length === 1 &&
      v.filter((n) => n >= 3).every((n) => n >= 4),
    verdict: 'Lopsided. The neglected vertex is the one to invest in next.'
  },
  {
    id: 'uneven',
    shape: 'Uneven',
    test: () => true,
    verdict: 'Uneven. Invest in the lowest vertex next.'
  }
];

/**
 * Resolve three ratings to a band. Accepts either an object keyed by axis or
 * an array in ORDER. Returns the whole band, so callers can use the shape
 * word without re-deriving it from the verdict string.
 */
function band(values) {
  const v = Array.isArray(values) ? values.slice() : ORDER.map((a) => values[a]);
  return BANDS.find((b) => b.test(v));
}

/** The verdict string alone. */
function interpret(values) {
  return band(values).verdict;
}

/** Where a vertex sits for a given rating. t = 0 is the centroid, t = 1 the full vertex. */
function warped(axis, value) {
  const t = (value - 1) / 4;
  const f = FULL[axis];
  return {
    x: CENTROID.x + (f.x - CENTROID.x) * t,
    y: CENTROID.y + (f.y - CENTROID.y) * t
  };
}


/* ── Shared styles ────────────────────────────────────────────────────────
   Every token is prefixed --ait- and carries an in-var() fallback, so the
   widget renders correctly with zero host configuration and a host page that
   happens to define --ink or --mono cannot repaint it. Custom properties
   inherit through the shadow boundary, which is exactly why the generic token
   names used on brianrain.com are not safe to reuse here.

   No @font-face. The microsite self-hosts six woff2 files at absolute paths
   that would 404 on any other origin, and shipping 190KB of fonts with a
   widget is not acceptable. Hosts that already load IBM Plex can set
   --ait-font-sans and get the original look. */
const BASE_CSS = `
  :host {
    display: block;
    max-width: var(--ait-max-width, 760px);
    color: var(--ait-ink, #1A1A1A);
    font-family: var(--ait-font-sans, system-ui, -apple-system, 'Segoe UI', sans-serif);
    font-size: var(--ait-font-size, 1rem);
    line-height: 1.6;
    -webkit-text-size-adjust: 100%;
  }
  :host([hidden]) { display: none; }
  :host, *, *::before, *::after { box-sizing: border-box; }

  .tri-outline, .check-frame {
    fill: none;
    stroke: var(--ait-accent, #B5532A);
    stroke-width: 2.5;
    stroke-linejoin: round;
  }
  .tri-centroid {
    font-family: var(--ait-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
    font-size: 17px;
    fill: var(--ait-accent-strong, #6B1F1A);
  }
  svg { width: 100%; height: auto; display: block; overflow: visible; }
`;

/* Scoped rather than a global * !important block. The microsite can afford
   the blunt version because it owns the page; a widget cannot. */
const MOTION_CSS = `
  @media (prefers-reduced-motion: reduce) {
    .vertex, .vertex-dot, .vertex-label, .check-dot, .check-fill {
      transition: none !important;
    }
  }
`;

function parseValues(raw) {
  const parts = String(raw || '').split(',').map((s) => parseInt(s.trim(), 10));
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
  return parts.map((n) => Math.min(5, Math.max(1, n)));
}

function parseLabels(raw) {
  const parts = String(raw || '').split(',').map((s) => s.trim());
  if (parts.length !== 3 || parts.some((s) => !s)) return null;
  return { self: parts[0], tools: parts[1], newai: parts[2] };
}

/* Custom element classes evaluate their `extends` clause as soon as the script
   runs, so a bare HTMLElement reference would make this file unloadable
   anywhere without a DOM. tools/verify-bands.mjs runs it in plain Node to
   check the verdict logic against assessment/bands.json, so it has to load
   there too. */
const ElementBase = typeof HTMLElement !== 'undefined' ? HTMLElement : class {};

/* ── <ai-triangle-diagram> ────────────────────────────────────────────────
   The framework diagram. Hover, tap or keyboard reveals one vertex summary.
   All state lives on the instance, so several can share a page. */
class AiTriangleDiagram extends ElementBase {
  static get observedAttributes() { return ['labels']; }

  constructor() {
    super();
    this._hoverKey = null;
    this._lockedKey = null;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._built) { this._render(); this._built = true; }
  }

  attributeChangedCallback() {
    if (this._built) { this._render(); }
  }

  get _labels() {
    return parseLabels(this.getAttribute('labels')) || {
      self: 'Self', tools: 'Your AI Tools', newai: 'New AI'
    };
  }

  _render() {
    const L = this._labels;
    const caption = this.getAttribute('caption') ||
      'Three continuous improvement disciplines. Quality is fixed. You are the variable.';
    const fallback = 'Hover, tap, or focus a vertex to read its discipline.';

    this.shadowRoot.innerHTML = `
      <style>
        ${BASE_CSS}
        figure { margin: 0; }
        figcaption {
          font-family: var(--ait-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--ait-ink-soft, #3D3835);
          margin: 0 0 14px;
        }
        .vertex { cursor: pointer; transition: opacity 0.25s ease; }
        .vertex-hit { fill: transparent; }
        .vertex-dot {
          fill: var(--ait-accent, #B5532A);
          transition: r 0.18s ease, fill 0.18s ease;
        }
        .vertex-label {
          font-family: var(--ait-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
          font-size: 15px;
          font-weight: 500;
          fill: var(--ait-accent-strong, #6B1F1A);
        }
        svg[data-active] .vertex:not(.is-active) { opacity: 0.6; }
        .vertex.is-active .vertex-dot { fill: var(--ait-accent-strong, #6B1F1A); r: 12; }
        .vertex:focus { outline: none; }
        .vertex:focus-visible .vertex-dot {
          r: 12;
          stroke: var(--ait-accent-strong, #6B1F1A);
          stroke-width: 3;
        }
        .vertex.is-active .vertex-label,
        .vertex:focus-visible .vertex-label { font-weight: 600; }
        .summary {
          min-height: 3.2em;
          margin: 14px 0 0;
          font-size: 0.95rem;
          color: var(--ait-ink-soft, #3D3835);
        }
        ${MOTION_CSS}
      </style>
      <figure>
        <figcaption>${caption}</figcaption>
        <svg viewBox="0 0 460 384" role="group"
             aria-label="The AI Triangle: three continuous improvement disciplines surrounding You at the center.">
          <polygon class="tri-outline" points="230,58 70,322 390,322" />
          <text class="tri-centroid" x="230" y="237" text-anchor="middle">You</text>
          ${ORDER.map((key) => {
            const p = FULL[key];
            const dy = key === 'self' ? -20 : 30;
            return `
          <g class="vertex" data-vertex="${key}" tabindex="0" role="button" aria-pressed="false"
             aria-label="${DEFAULT_LABELS[key]}. ${SUMMARIES[key]}">
            <circle aria-hidden="true" class="vertex-hit" cx="${p.x}" cy="${p.y}" r="26" />
            <circle aria-hidden="true" class="vertex-dot" cx="${p.x}" cy="${p.y}" r="9" />
            <text aria-hidden="true" class="vertex-label" x="${p.x}" y="${p.y + dy}"
                  text-anchor="middle">${L[key]}</text>
          </g>`;
          }).join('')}
        </svg>
        <p class="summary" aria-live="polite">${fallback}</p>
      </figure>
    `;

    this._svg = this.shadowRoot.querySelector('svg');
    this._summary = this.shadowRoot.querySelector('.summary');
    this._fallback = fallback;
    this._vertices = Array.from(this.shadowRoot.querySelectorAll('.vertex'));

    this._vertices.forEach((v) => {
      const key = v.getAttribute('data-vertex');
      v.addEventListener('mouseenter', () => { this._hoverKey = key; this._paint(); });
      v.addEventListener('mouseleave', () => {
        if (this._hoverKey === key) { this._hoverKey = null; this._paint(); }
      });
      v.addEventListener('focus', () => { this._hoverKey = key; this._paint(); });
      v.addEventListener('blur', () => {
        if (this._hoverKey === key) { this._hoverKey = null; this._paint(); }
      });
      v.addEventListener('click', () => { this._toggle(key); });
      v.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          this._toggle(key);
        }
      });
    });
  }

  _toggle(key) {
    this._lockedKey = this._lockedKey === key ? null : key;
    this._paint();
  }

  _paint() {
    const key = this._lockedKey || this._hoverKey;
    this._vertices.forEach((v) => {
      const k = v.getAttribute('data-vertex');
      v.classList.toggle('is-active', k === key);
      /* aria-pressed tracks the locked key only, not hover. These are toggle
         buttons and the pressed state is what a click or Enter commits;
         announcing a hover as a state change would fight the live region. */
      v.setAttribute('aria-pressed', k === this._lockedKey ? 'true' : 'false');
    });
    if (key) {
      this._svg.setAttribute('data-active', key);
      this._summary.textContent = SUMMARIES[key];
    } else {
      this._svg.removeAttribute('data-active');
      this._summary.textContent = this._fallback;
    }
  }
}

/* ── <ai-triangle-check> ──────────────────────────────────────────────────
   The self-assessment. Three sliders warp the triangle and produce a verdict. */
class AiTriangleCheck extends ElementBase {
  static get observedAttributes() { return ['values', 'heading', 'readout', 'labels']; }

  constructor() {
    super();
    this._timer = null;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._built) { this._render(); this._built = true; }
  }

  disconnectedCallback() {
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
  }

  attributeChangedCallback(name) {
    if (!this._built) return;
    if (name === 'values') { this._applyValues(parseValues(this.getAttribute('values'))); }
    else { this._render(); }
  }

  /** Current ratings, as an object. */
  get values() {
    const out = {};
    ORDER.forEach((a) => {
      const el = this.shadowRoot.getElementById('s-' + a);
      out[a] = el ? parseInt(el.value, 10) : 1;
    });
    return out;
  }

  set values(v) { this._applyValues(Array.isArray(v) ? v : ORDER.map((a) => v[a])); }

  _applyValues(vals) {
    if (!vals) return;
    ORDER.forEach((a, i) => {
      const el = this.shadowRoot.getElementById('s-' + a);
      if (el) el.value = String(vals[i]);
    });
    this._update(false);
  }

  _render() {
    const L = parseLabels(this.getAttribute('labels')) || DEFAULT_LABELS;
    const vals = parseValues(this.getAttribute('values')) || [4, 3, 2];
    const heading = this.getAttribute('heading');
    const showReadout = this.getAttribute('readout') !== 'off';

    this.shadowRoot.innerHTML = `
      <style>
        ${BASE_CSS}
        h2 { font-size: 1.3rem; margin: 0 0 18px; color: var(--ait-accent-strong, #6B1F1A); }
        .grid { display: grid; gap: 28px; }
        @media (min-width: 640px) { .grid { grid-template-columns: 1fr 1fr; gap: 40px; } }
        .row { display: grid; grid-template-columns: 1fr auto; gap: 6px 12px; margin-bottom: 20px; }
        label { grid-column: 1 / -1; font-size: 0.92rem; color: var(--ait-ink-soft, #3D3835); }
        input[type="range"] { width: 100%; accent-color: var(--ait-accent, #B5532A); }
        output {
          font-family: var(--ait-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--ait-accent-strong, #6B1F1A);
          min-width: 1.4em;
          text-align: right;
        }
        .scale-note {
          font-family: var(--ait-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
          font-size: 0.78rem;
          color: var(--ait-ink-soft, #3D3835);
          margin: 0;
        }
        figure { margin: 0; }
        svg { max-width: 420px; margin: 0 auto; }
        .check-frame { stroke-dasharray: 5 5; opacity: 0.45; stroke-width: 2; }
        .check-fill {
          fill: var(--ait-fill, rgba(181, 83, 42, 0.18));
          stroke: var(--ait-accent-strong, #6B1F1A);
          stroke-width: 2.5;
          stroke-linejoin: round;
          transition: all 0.18s ease;
        }
        .check-dot {
          fill: var(--ait-accent-strong, #6B1F1A);
          transition: all 0.18s ease;
        }
        .readout {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--ait-ink, #1A1A1A);
          min-height: 3em;
          margin: 16px 0 0;
          text-align: center;
        }
        ${MOTION_CSS}
      </style>
      ${heading ? `<h2>${heading}</h2>` : ''}
      <div class="grid">
        <form aria-label="Rate your current investment in each vertex">
          ${ORDER.map((a, i) => `
          <div class="row">
            <label for="s-${a}">${L[a]} investment this past month</label>
            <input type="range" id="s-${a}" data-axis="${a}" min="1" max="5" step="1"
                   value="${vals[i]}" aria-describedby="scale-note" />
            <output for="s-${a}" data-out="${a}">${vals[i]}</output>
          </div>`).join('')}
          <p class="scale-note" id="scale-note">Scale: 1 = none, 5 = consistent practice.</p>
        </form>
        <figure>
          <svg viewBox="0 0 460 384" role="img"
               aria-label="A triangle whose three vertices stretch outward or collapse inward based on your ratings.">
            <polygon class="check-frame" points="230,58 70,322 390,322" />
            <polygon class="check-fill" points="230,58 70,322 390,322" />
            ${ORDER.map((a) => `<circle class="check-dot" data-axis="${a}" cx="${FULL[a].x}" cy="${FULL[a].y}" r="7" />`).join('')}
          </svg>
          ${showReadout ? '<p class="readout" aria-live="polite"></p>' : ''}
        </figure>
      </div>
    `;

    this._fill = this.shadowRoot.querySelector('.check-fill');
    this._readout = this.shadowRoot.querySelector('.readout');
    this.shadowRoot.querySelectorAll('input[type="range"]').forEach((s) => {
      s.addEventListener('input', () => this._update(true));
    });
    this._update(false);
  }

  _update(announce) {
    const vals = this.values;
    const list = ORDER.map((a) => vals[a]);

    ORDER.forEach((a) => {
      const out = this.shadowRoot.querySelector('[data-out="' + a + '"]');
      if (out) out.textContent = String(vals[a]);
      const dot = this.shadowRoot.querySelector('.check-dot[data-axis="' + a + '"]');
      if (dot) {
        const p = warped(a, vals[a]);
        dot.setAttribute('cx', p.x.toFixed(1));
        dot.setAttribute('cy', p.y.toFixed(1));
      }
    });

    this._fill.setAttribute('points', ORDER.map((a) => {
      const p = warped(a, vals[a]);
      return p.x.toFixed(1) + ',' + p.y.toFixed(1);
    }).join(' '));

    const b = band(list);

    /* The shape updates on every input event, but the live region is debounced.
       Holding an arrow key on a range input fires input continuously, and an
       undebounced aria-live region makes a screen reader queue every
       intermediate verdict. Settling first means one announcement, the one
       the user actually landed on. */
    if (this._readout) {
      if (this._timer) clearTimeout(this._timer);
      if (announce) {
        this._timer = setTimeout(() => { this._readout.textContent = b.verdict; }, 350);
      } else {
        this._readout.textContent = b.verdict;
      }
    }

    this.dispatchEvent(new CustomEvent('ai-triangle-change', {
      bubbles: true,
      composed: true,
      detail: { self: vals.self, tools: vals.tools, newai: vals.newai, shape: b.shape, verdict: b.verdict }
    }));
  }
}

if (typeof customElements !== 'undefined') {
  if (!customElements.get('ai-triangle-diagram')) {
    customElements.define('ai-triangle-diagram', AiTriangleDiagram);
  }
  if (!customElements.get('ai-triangle-check')) {
    customElements.define('ai-triangle-check', AiTriangleCheck);
  }
}

/* The public API. In a browser this lands on window; in Node, tools load this
   file with node:vm and read it off globalThis. */
root.AITriangle = {
  band, interpret, warped,
  FULL, CENTROID, ORDER, BANDS,
  AiTriangleDiagram, AiTriangleCheck
};

})(typeof globalThis !== 'undefined' ? globalThis : this);
