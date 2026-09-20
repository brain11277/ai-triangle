# Diagrams

Seven SVGs, each with a 1x and 2x PNG committed in [`png/`](png/). Use whichever suits.

| File | For |
|---|---|
| `ai-triangle.svg` | The main diagram. Default choice for a slide or a post. |
| `ai-triangle-dark.svg` | Dark backgrounds. |
| `ai-triangle-mono.svg` | Single colour. Photocopies, handouts, slides on any background. |
| `ai-triangle-blank.svg` | The plotting grid, with five tick marks per axis. Used by the printable assessment. |
| `ai-triangle-lineage.svg` | Iron 1969, Agile 2009, AI 2026 in a row. The one to open a talk with. |
| `ai-triangle-failure-modes.svg` | The two failure modes drawn as warped shapes. |
| `ai-triangle-social-1200x630.svg` | Social card. |

## Two things about how these are built

**Presentation attributes, not CSS classes.** A standalone SVG loses any external stylesheet,
so every shape carries its own `fill` and `stroke`, and every `font-family` names real
fallbacks. Drop any of these into a document, an email or a slide and it renders the same.

**The warped shapes are computed, not drawn.** The tick marks in `ai-triangle-blank.svg` and
the two shapes in `ai-triangle-failure-modes.svg` come from the same `warped()` function the
widget uses, via [`../tools/build-diagrams.mjs`](../tools/build-diagrams.mjs). A shape you
plot by hand on the printable, a shape the widget draws, and the shape in the failure-modes
diagram are therefore the same shape for the same numbers. If they were drawn by eye they
would drift.

## Regenerating

You do not need to do this to use the kit. Both steps are committed.

```
node tools/build-diagrams.mjs                       # SVGs
node tools/render-diagrams.mjs --fonts <woff2-dir>  # PNGs, needs Chrome
```

`render-diagrams.mjs` drives headless Chrome rather than adding a rasterizer dependency, since
this repository has no `package.json` and is not going to grow one for a step that runs twice
a year. Without `--fonts` it renders with each SVG's declared fallbacks and tells you so.

## Palette

Burnished Clay, shared with the microsite.

| Token | Hex | Used for |
|---|---|---|
| Terracotta | `#B5532A` | Outlines, vertex dots, the accent rule |
| Terracotta ink | `#9A3D18` | Terracotta at normal text sizes, where contrast needs it |
| Oxblood | `#6B1F1A` | Headings, labels, the filled shape |
| Sand | `#E8D5B7` | Background |
| Sand alt | `#F0E4CC` | Alternating background |
| Ink | `#1A1A1A` | Body text |
| Ink soft | `#3D3835` | Secondary text |
| Off white | `#FAF6EE` | The plotting grid ground |

Type: Source Serif 4 (headings), IBM Plex Sans (body), IBM Plex Mono (labels and chrome). All
three have real fallbacks declared, so nothing has to be installed.

## Using these

**Attribution is required, and a slide footer is enough:**

```
AI Triangle / Brian Rain / CC BY-NC-SA 4.0
```

**Recoloring is an adaptation.** Changing the palette to match your brand is allowed and the
result carries CC BY-NC-SA 4.0 too, under ShareAlike. So does translating the labels, redrawing
it in your own tool from these as a source, or building a slide template around one. If you are
only placing a diagram in a deck unchanged, nothing propagates.

If your deck is part of a paid course, workshop or client engagement, see
[`../COMMERCIAL-LICENSE.md`](../COMMERCIAL-LICENSE.md). Using it in an unpaid talk, internally,
or in teaching at an accredited institution needs no permission.

**A ready-made attribution slide,** so complying costs nothing:

> **The AI Triangle**
> Framework by Brian Rain, 2026. brianrain.com/ai-triangle
> Diagrams licensed CC BY-NC-SA 4.0. Adapted for this deck.

Drop the last line if you did not adapt anything.
