# Contributing

## What is welcome

- **Corrections with a source.** The most useful contribution to this repo. One figure in the
  original publication was misattributed and another was unattributed; both are fixed in
  `framework/BIBLIOGRAPHY.md`. If you find a third, open an issue with a citation.
- **Reports that a worksheet did not work in practice.** Especially the specific way it failed.
  Four of the six failure modes exist because practices survive contact with real weeks badly.
- **Translations** of the worksheets, the assessment items or the diagram labels.
- **Additional practice kits** that fit an existing vertex.
- **Accessibility fixes** to the widget or the printables.

## What is not

- **Renaming the vertices**, changing what Quality means, or altering the five verdict strings.
  These are a stability commitment; see `framework/SPEC.md` section 9.
- **Softening the research caveats.** The "what it does not show" lines in the bibliography and
  the "what this instrument cannot see" section in the assessment are load-bearing.
- **Adding dependencies.** There is no `package.json` and there is not going to be one. Every
  tool runs on stock Node, every printable opens from a file path, and the widget is one file.
- **Turning the assessment into a score.** No totals, no levels, no percentages.

## Before you open a PR

```
node tools/verify-bands.mjs
node tools/verify-definition.mjs
node tools/verify-no-emdash.mjs
node tools/verify-links.mjs
node tools/verify-widget-purity.mjs
node tools/build-faq-schema.mjs --check
```

All six run in CI. Three things they enforce that are easy to trip over:

1. **No em dashes or en dashes**, including HTML entities. House style. The only exception is
   the Medium article's own title inside a citation, which is allowlisted by line.
2. **The canonical definition sentence is frozen.** It appears in nine places and must be
   byte-identical in all of them. Change it in one and CI fails; change it deliberately and you
   change it in nine.
3. **The paper instrument and the widget must agree** across all 125 possible inputs. If you
   touch the verdict logic, `assessment/bands.json` is the source of truth and the widget
   mirrors it.

If you edit `FAQ.md`, run `node tools/build-faq-schema.mjs` and commit the regenerated
`schema/faq.jsonld`. If you edit a diagram, run `node tools/build-diagrams.mjs` and, if you
have Chrome, `node tools/render-diagrams.mjs`.

## Licensing of contributions

Inbound equals outbound. Contributions to the materials are accepted under CC BY-NC-SA 4.0,
and contributions to `widget/` and `tools/` under BSL 1.1, the same terms the repository
already carries. There is no CLA and you keep your copyright.

By opening a PR you confirm the work is yours to license that way.

## Voice

Read a few existing files before writing. Plain, concrete and practitioner-facing. No
exclamation points unless quoting someone. "Agile" is always capitalized. Prefer a specific
observation to a general claim, and prefer saying what something does not do over letting a
reader find out.
