# JSON-LD

Copy-pasteable structured data, for anyone writing about the framework who wants the entity to
resolve rather than dangle.

| File | What it is |
|---|---|
| `defined-term.jsonld` | The `DefinedTerm` node for the AI Triangle. |
| `defined-term-set.jsonld` | The `DefinedTermSet` it belongs to, containing both of Brian Rain's coined frameworks. |
| `faq.jsonld` | An `FAQPage` mirroring `FAQ.md`. Generated, never hand-edited. |

## Using these

**On your own page about the framework.** Paste `defined-term.jsonld` into a
`<script type="application/ld+json">` block. Leave the `@id` values exactly as they are: they
point at the canonical page, which is what makes your page reference the same entity rather
than assert a competing one.

**Describing your own different framework.** Copy the shape, change every `@id`, the `name`,
the `description` and the `creator`. That is fine and needs no permission.

## Two details that are easy to get wrong

**`inDefinedTermSet` takes a node reference, not a bare URL.** These files use
`{"@id": "https://brianrain.com/#frameworks"}`, which resolves to the `DefinedTermSet` node
defined in `defined-term-set.jsonld`. A bare string URL pointing at the site root resolves to a
`WebSite`, which is the wrong type and leaves the reference dangling.

**The `Person` is inlined alongside its `@id`.** A static page that references
`https://brianrain.com/#person` without defining it produces an unresolved reference. The full
object is included so each block stands alone, while the `@id` still merges it with the
site-wide Person node where one exists.

## Regenerating the FAQ

```
node tools/build-faq-schema.mjs          # write it
node tools/build-faq-schema.mjs --check  # fail if out of date
```

Generated from `FAQ.md` rather than maintained by hand, because an `FAQPage` whose answers
differ from the page it describes is worse than having none. The check runs in CI.

## Validating

Paste any of these into [validator.schema.org](https://validator.schema.org/) or Google's Rich
Results Test. They also have to parse as JSON, which CI checks.
