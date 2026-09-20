# The reference widget

Two custom elements, one file, no dependencies, no build step. Nothing is stored and nothing
is sent.

**Before you embed anything, consider whether you need to.** Two options cost nothing and
require no license conversation at all:

1. **Link to it.** `https://brianrain.com/ai-triangle/#check` is the canonical interactive
   version, always current.
2. **Print it.** [`../assessment/printable/ai-triangle-assessment.html`](../assessment/printable/ai-triangle-assessment.html)
   is one page, works on paper, and is a better instrument in a room full of people.

Embed when you want the assessment inside your own docs, intranet or internal app. That is
what the Additional Use Grant in [`../LICENSES/BSL-1.1.md`](../LICENSES/BSL-1.1.md) is written
to cover.

---

## Use it

```html
<script src="./ai-triangle-widget.js"></script>

<ai-triangle-diagram></ai-triangle-diagram>
<ai-triangle-check heading="Where is your triangle right now?" values="4,3,2"></ai-triangle-check>
```

That is the whole integration. Open [`example.html`](example.html) by double-clicking it.

**It is a classic script, not an ES module, deliberately.** Chrome blocks module scripts loaded
over `file://` as cross-origin, so a module build could not be opened without a server. This
kit promises no build step and no server, and that promise is worth a plain `<script>` tag.

## The elements

### `<ai-triangle-diagram>`
The framework diagram. Hover, tap or keyboard focus reveals one vertex summary; click or Enter
locks it.

| Attribute | Default |
|---|---|
| `labels` | `Self, Your AI Tools, New AI`. Three comma-separated strings, for translation. |
| `caption` | The standard figcaption. |

### `<ai-triangle-check>`
The self-assessment. Three sliders warp the triangle and produce a verdict.

| Attribute | Default |
|---|---|
| `values` | `4,3,2`. Three integers 1 to 5, clamped. |
| `heading` | None. Omit it and no heading renders. |
| `readout` | `on`. Set `off` to suppress the verdict text and handle it yourself via the event. |
| `labels` | `CI of Self, CI of Your AI Tools, CI of New AI` |

**Property:** `el.values` reads and writes `{self, tools, newai}`.

**Event:** `ai-triangle-change`, bubbling and composed, so it reaches `document`.

```js
document.addEventListener('ai-triangle-change', (e) => {
  const { self, tools, newai, shape, verdict } = e.detail;
});
```

## Theming

Every token is `--ait-` prefixed and carries an in-`var()` fallback, so the widget renders
correctly with zero configuration. Set any of these on the element or an ancestor:

| Token | Default |
|---|---|
| `--ait-ink` | `#1A1A1A` |
| `--ait-ink-soft` | `#3D3835` |
| `--ait-accent` | `#B5532A` |
| `--ait-accent-strong` | `#6B1F1A` |
| `--ait-fill` | `rgba(181, 83, 42, 0.18)` |
| `--ait-font-sans` | `system-ui, -apple-system, 'Segoe UI', sans-serif` |
| `--ait-font-mono` | `ui-monospace, SFMono-Regular, Menlo, monospace` |
| `--ait-max-width` | `760px` |

**The prefix is not decoration.** Custom properties inherit *through* the shadow boundary, so
a host page defining `--ink` or `--mono`, which the original microsite does, would silently
repaint the widget. [`example-themed.html`](example-themed.html) is a deliberately hostile page
that defines those tokens as bright green Comic Sans, mounts two instances, and includes a host
element with a colliding `id="s-self"`. If you change this file, open that page and confirm all
three still hold.

**No fonts are fetched.** The widget declares no `@font-face` at all. If your page already
loads IBM Plex, set `--ait-font-sans` and `--ait-font-mono` to get the original look for free.

## What it does not do

No storage, no network, no analytics, ever. You do not have to take that on trust:

```
grep -E 'fetch|XMLHttpRequest|localStorage|sessionStorage|sendBeacon' ai-triangle-widget.js
```

Zero hits. This is checked in CI.

**Ratings are never persisted**, not even to `localStorage`. That is a design decision rather
than an omission: an assessment whose numbers are retrievable becomes an assessment whose
numbers can be asked for, and see failure mode 6.

## Three ways to embed

| | |
|---|---|
| **Self-host** *(recommended)* | Copy `ai-triangle-widget.js` into your assets. Works offline, no third party, and the license header travels with the file. |
| **CDN, version-pinned** | `https://cdn.jsdelivr.net/gh/brain11277/ai-triangle@v1.0.0/widget/ai-triangle-widget.js`. Always pin a tag, never `@main`. |
| **Iframe** | [`embed.html`](embed.html), for hosts that will not allow a third-party script tag. **Set an explicit height,** around 640px: a framed document cannot resize its own frame. |

## Accessibility

Vertices are keyboard reachable with visible focus, and toggle with Enter or Space.
`aria-pressed` tracks the locked vertex only, not hover, so a hover does not get announced as a
state change.

The verdict live region is **debounced to about 350 milliseconds** while the shape updates
immediately. Holding an arrow key on a range input fires `input` continuously, and an
undebounced `aria-live` region makes a screen reader queue every intermediate verdict. Settling
first means one announcement: the one the user actually landed on. This is the one behavioural
improvement over the version on brianrain.com.

`prefers-reduced-motion` suppresses transitions, scoped to the widget's own selectors rather
than a global `*` override.

There is no `<noscript>` inside the element, because a custom element that never upgrades
leaves its light DOM visible. Put your own fallback between the tags if you need one:

```html
<ai-triangle-check>
  <p>The paper version: <a href="...">printable assessment</a>.</p>
</ai-triangle-check>
```

## Verdicts are provably correct

The widget inlines the verdict logic because it ships as one file.
[`../assessment/bands.json`](../assessment/bands.json) is the source of truth, and
`node tools/verify-bands.mjs` runs all 125 possible combinations through both and fails on any
disagreement. A paper score and a widget score cannot drift apart.

## License

Business Source License 1.1. See [`../LICENSES/BSL-1.1.md`](../LICENSES/BSL-1.1.md).
Converts to Apache 2.0 on **2029-09-20**.

Free for your own practice, your own organization's internal use including at a for-profit
company, and accredited teaching. A commercial license is needed to offer it to third parties
as a hosted service, a product, a bundled tool, or as part of a paid course, training or
consulting offering. See [`../COMMERCIAL-LICENSE.md`](../COMMERCIAL-LICENSE.md).

**Keep the header comment.** The license requires conspicuous display on each copy, and leaving
those eight lines in place is the whole of what that means here. Do not minify them out.
