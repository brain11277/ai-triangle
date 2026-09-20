# CLAUDE.md, ai-triangle

Context for any AI tool working in this repo. Committed deliberately: this repository is meant
to be handed to AI tools, so its own working notes are public.

## What this repo is

The resource kit for the AI Triangle, an original framework by Brian Rain. The canonical page
for the framework is https://brianrain.com/ai-triangle/; this repo is the usable half, not the
explanation.

It is a documentation repository with a small amount of code. No `package.json`, no
dependencies, no build step for anything a reader consumes.

## Non-negotiables

**The canonical definition sentence is frozen.** It appears in nine places and must be
byte-identical in all of them. `node tools/verify-definition.mjs` enforces this. Changing it
means changing it in nine places on purpose, not in one by accident.

**The paper instrument and the widget must never disagree.** `assessment/bands.json` is the
source of truth for the verdict logic; `widget/ai-triangle-widget.js` inlines a mirror of it
because it ships as a single file. `node tools/verify-bands.mjs` checks all 125 possible inputs.
If these drift, a team where some people used paper and some used the widget gets different
answers from the same inputs, silently.

**Rule order in the band table is load-bearing.** `allAtMost 3` is tested before the
countBelow tests, so (3,3,3) is Collapsing not Uneven, and (2,3,3) is Collapsing not Tilting.
Do not reorder these to read more logically.

**No em dashes or en dashes anywhere**, including HTML entities, including code comments.
`node tools/verify-no-emdash.mjs` enforces it. One allowlisted exception: the Medium article's
title inside a citation, because a citation reproduces its source verbatim.

**The materials operationalize the framework; they never restate the microsite.** If a new file
would only rephrase what brianrain.com/ai-triangle/ already says, it does not belong here. The
test for a practice kit is whether someone could run it on Friday without inventing anything.

**The widget is a classic script, not an ES module.** Chrome blocks module scripts over
`file://`, and "open it by double-clicking, no server" is a promise this kit keeps. Its API
goes on `globalThis.AITriangle`, and Node tools load it with `node:vm`.

**No dependencies, ever.** Every tool runs on stock Node. Every printable opens from a file
path with no network. If something needs a library, it does not go in.

## Honesty rules

These are the parts most likely to be "improved" away by someone trying to make the kit more
persuasive. They are deliberate.

- `framework/BIBLIOGRAPHY.md` carries a **"what it does not show"** line per source and a
  confidence marker. Two anchors are correlational; one figure in the original publication was
  misattributed and is corrected in place rather than dropped.
- `assessment/ASSESSMENT.md` has a **"what this instrument cannot see"** section admitting the
  instrument is weakest exactly where the problem is worst.
- `framework/SPEC.md` names **who the framework is not for** and lists **anti-uses**.
- `TRADEMARK.md` spends more words on what is *not* claimed than what is.

Do not soften any of these. They are what makes the kit credible to the audience it is for.

## Before committing

```
node tools/verify-bands.mjs
node tools/verify-definition.mjs
node tools/verify-no-emdash.mjs
node tools/verify-links.mjs
node tools/verify-widget-purity.mjs
node tools/build-faq-schema.mjs --check
```

Edited `FAQ.md`? Regenerate `schema/faq.jsonld`. Edited a diagram? Run `build-diagrams.mjs`,
then `render-diagrams.mjs` if Chrome is available.

## Workflow

Public repo: branch, open a PR, show the diff before merging. Never commit to `main` directly.

## Secrets

None, ever. This repo is public and holds only published material.
