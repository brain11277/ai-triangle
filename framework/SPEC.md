# The AI Triangle: specification

Version 1.0.0. Canonical page: https://brianrain.com/ai-triangle/

> The AI Triangle is a practitioner-facing project management triangle, published by Brian
> Rain in 2026, in which Quality is fixed and means the human's discernment is still intact,
> and the three trade variables are continuous improvement disciplines the practitioner
> imposes on themselves: continuous improvement of self, of their AI tools, and of new AI.

This document is the normative definition. The microsite explains the framework and the
practice kits operationalize it; this is the reference the other two agree with.

---

## 1. Lineage

| Triangle | Year | Author | Variables | Trade-offs |
|---|---|---|---|---|
| Iron | 1969 | Dr. Martin Barnes, Royal Institute of Technology, Stockholm. Course: "Time and Money in Contract Control." | time, cost, quality | imposed by the project |
| Agile | 2009 | Jim Highsmith, *Agile Project Management* (2nd edition) and the Cutter Consortium | Value, Quality, collapsed Constraints | still external |
| AI | 2026 | Brian Rain, The Friday Agile Sync | CI of Self, CI of Your AI Tools, CI of New AI | internal |

Both prior triangles assumed the practitioner's discernment and capability were stable inputs.
That assumption broke in 2023.

## 2. Quality is fixed, and its meaning changes

In the Iron Triangle, Quality meant conformance to specification. In the Agile Triangle, it
meant continuous delivery of a reliable, adaptive product. In the AI Triangle, Quality means
the human's discernment is still intact. The artifact looks good is not the same claim as the
human producing the artifact still knows what good looks like. An LLM that hallucinates with
confidence will not flag the gap.

> The artifact will be polished regardless. Quality is measured by whether the practitioner
> still knows what good looks like.

This is the load-bearing move of the framework. Every other part follows from it. If Quality
is redefined back to a property of the artifact, the three variables stop making sense,
because an artifact-level quality bar can be met by a practitioner whose judgment has gone.

## 3. The three variables

Each is a continuous improvement (CI) discipline the practitioner imposes on themselves, and
each has one maintaining practice. The practices are specified in `practice-kits/`.

### 3.1 Continuous Improvement of Self (CI of Self)

> Your discernment, your AI literacy, your judgment about when to trust output and when to
> overrule it.

**Pattern: Weekly Self-Review Block.** Thirty to sixty minutes once a week, spent reviewing
your own AI-assisted output specifically for discernment failures. Places you accepted an
output you should have challenged. Places you over-prompted instead of thinking first. The
output of the block is not a deliverable. It is the maintenance of your own ability to read
your work honestly.

Kit: [`practice-kits/ci-of-self/`](../practice-kits/ci-of-self/)

### 3.2 Continuous Improvement of Your AI Tools (CI of Your AI Tools)

> Your prompts, agents, sub-agents, and automations are versioned artifacts that decay
> without active maintenance.

**Pattern: Agent Refactor Sprint.** Monthly or quarterly depending on cadence, revisit the
highest-frequency assets in your personal AI stack and re-architect them based on what you
learned by running them in production. Not the cosmetic cleanup version of CI. The deliberate
redesign of the conditions that produce your work.

Kit: [`practice-kits/ci-of-your-ai-tools/`](../practice-kits/ci-of-your-ai-tools/)

### 3.3 Continuous Improvement of New AI (CI of New AI)

> The bounded, deliberate practice of scanning, testing, and triaging new tools, platform
> features, and automation patterns as they appear, without descending into infinite chasing.

**Pattern: Scan-and-Triage Cadence.** A bounded weekly window, perhaps an hour. Read what is
new. Test exactly one feature you might actually use. Explicitly triage the rest as not now.

**Not no. Not yes. Not now. The triage is the skill.**

Kit: [`practice-kits/ci-of-new-ai/`](../practice-kits/ci-of-new-ai/)

## 4. Research anchors, mapped

The microsite lists its sources but does not bind each one to a vertex. This table does. Every
entry is annotated in [`BIBLIOGRAPHY.md`](BIBLIOGRAPHY.md), including what each source does
*not* show.

| Vertex | Anchors |
|---|---|
| CI of Self | Gerlich 2025; Kosmyna et al. 2025; Lee et al. 2025 |
| CI of Your AI Tools | Production-grade agentic workflows preprint, Dec 2025; Anthropic, "Building Effective Agents" |
| CI of New AI | S&P Global Market Intelligence, *Voice of the Enterprise: AI & Machine Learning*, 2025 |

The framework is a practitioner model, not an empirical finding. The research establishes that
the problem it addresses is real. It does not establish that this framework solves it. That
distinction is kept deliberately throughout.

## 5. Failure modes

Fully specified in [`FAILURE-MODES.md`](FAILURE-MODES.md). The two named in the original
publication:

**Over-prompting as a discernment hide.** A practitioner whose CI of self has quietly
atrophied compensates by writing increasingly elaborate prompts. The prompt does the thinking,
the output looks great, and the practitioner is genuinely worse than they were six months ago
and cannot tell. You become your own downstream colleague.

**Tool sprawl masquerading as adoption.** CI of new AI consumes all available time, CI of
existing tools rots, and CI of self never moves. Output quality may stay flat or even decline,
masked by the dopamine of trying new things.

Both failure modes share a feature. The artifact does not signal the problem. The practitioner
has to notice.

The discipline of the AI Triangle is not investing equally in all three vertices. It is
investing deliberately, and noticing the shape your investment is actually producing.

## 6. Normative requirements

Key words follow RFC 2119. This section exists so that "practising the AI Triangle" means
something checkable rather than something claimed.

To say you are practising the AI Triangle, you **MUST**:

1. Hold all three cadences, at any interval you have chosen in advance and written down.
2. Keep at least one durable written artifact per vertex: the accept log, the AI stack
   inventory, the not-now ledger.
3. Re-assess at least quarterly using the instrument in [`../assessment/`](../assessment/) or
   an equivalent of your own.
4. Treat Quality as the fixed constraint. If a cadence is dropped to ship more, the framework
   is not being practised; something else is.

You **SHOULD**:

5. Write self-review commitments as triggers ("when X, I will Y") rather than intentions.
6. Attach a prompting failure to every tool change you record.
7. Give every not-now item a trigger condition rather than only a date.
8. Run an observer pass at least once a year, with someone whose judgment you trust and who
   is not your manager.

It is **OUT OF SCOPE** for this framework to specify: which AI tools you use, how much you use
them, what your output volume should be, or what "good" means in your domain. The framework
governs the maintenance of judgment, not the exercise of it.

## 7. Boundary conditions

**Who this is for.** An individual practitioner with discretion over their own tools, their
own working methods, and at least a few hours a month of their own calendar.

**Who this is not for.** A practitioner without that discretion. If you cannot choose your
tools, cannot change your prompts, and cannot protect an hour a week, the framework will
describe your situation accurately and give you nothing to do about it. In that setting it
becomes a grievance rather than a practice, which helps nobody. The prerequisite is agency,
and the honest move is to say so rather than to sell the framework anyway.

**What it does not claim to be.** Not a maturity model. Not a certification. Not a
productivity metric. Not a hiring signal. Not a predictor of output quality.

## 8. Anti-uses

These are uses the framework is structurally unsuited to, listed so that the objection is on
the record before someone tries them.

- **As a management scorecard.** The instrument is self-report. Attaching consequences to a
  self-report destroys the report. See [`../facilitation/manager-prebrief.md`](../facilitation/manager-prebrief.md).
- **To justify tool procurement.** CI of Your AI Tools is about maintaining what you have.
  A low score is not a budget request.
- **As a personality test.** The three vertices are practices with cadences, not traits. A
  low score is a schedule problem, not a character finding.
- **As a gate.** Nobody should need to demonstrate a shape to be allowed to do something.

## 9. Stability

The following cannot change without a major version:

- The three vertices, their names, and their abbreviations.
- Quality as the fixed constraint, defined as the human's discernment being intact.
- The five verdict strings and the rule order that produces them, specified in
  [`../assessment/bands.json`](../assessment/bands.json) and locked by
  `tools/verify-bands.mjs`.
- The canonical definition sentence at the top of this document.

The following may change in a minor version: worksheet fields, timeboxes, worked examples,
the assessment items, diagrams, and anything in the bibliography.

## 10. Citation

The citation of record is the book:

Rain, Brian. *Agile Rebuilt for AI*. Independently published, 2026. ISBN 979-8199222839.
https://brianrain.com/agile-rebuilt-for-ai

The framework first appeared ten days earlier in the article, which remains the genesis:

Rain, Brian. "The Friday Agile Sync: The AI Triangle — When the Practitioner Becomes the Variable." *Inventive Flexibility*, May 22, 2026. https://brianrain.com/ai-triangle/

(The dash in that title is reproduced from the source. It is the only place in this
repository where one appears; see `tools/verify-no-emdash.mjs`.)

See [`../CITATION.cff`](../CITATION.cff) for the machine-readable form.
