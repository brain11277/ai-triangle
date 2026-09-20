# Bibliography

Annotated. Each entry carries a resolvable identifier, what the source found, **what it does
not show**, the vertex it anchors, and a confidence marker.

The "does not show" line is not hedging. The framework is a practitioner model, and the
research establishes that the problem it addresses is real, not that this framework solves it.
Stating the limits here is cheaper than having them stated for you.

**Confidence markers**

| Marker | Means |
|---|---|
| `high` | Peer-reviewed, with a DOI, verified against the publisher record. |
| `medium` | Preprint, industry survey, or vendor publication. Real and citable, not peer-reviewed. |
| `unverified` | A specific figure that could not be confirmed against the primary source. |

All entries accessed 2026-09-20.

---

## CI of Self

### Gerlich, M. (2025)
**AI Tools in Society: Impacts on Cognitive Offloading and the Future of Critical Thinking.**
*Societies* 15(1), 6. DOI: [10.3390/soc15010006](https://doi.org/10.3390/soc15010006)
SBS Swiss Business School. n = 666. Confidence: `high`

Mixed-method study, surveys plus interviews, across diverse age and education groups. Found a
significant negative relationship between frequent AI tool use and critical thinking, with
cognitive offloading as the mediating mechanism. Younger participants showed higher AI
dependence and lower critical thinking scores.

**What it does not show.** It is correlational and cross-sectional. It does not establish that
AI use *causes* critical thinking to decline, and the reverse direction is not excluded:
people with weaker critical thinking habits may simply adopt these tools more readily. No
participant was followed over time.

**Note on the specific coefficients.** The often-quoted figures of r = +0.72 between AI use
and cognitive offloading, and r = -0.75 between cognitive offloading and critical thinking,
could not be confirmed against the publisher's full text at the time of writing, and are
marked `unverified` until someone checks them in the PDF. The *direction and significance* of
the relationship is confirmed. Quote the direction with confidence; check the decimals before
you put them on a slide.

**Also note.** A formal Correction to this article has been published in *Societies*. Anyone
citing specific statistics should read the correction notice first.

Anchors: CI of Self.

### Kosmyna, N., et al. (2025)
**Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay
Writing Task.** MIT Media Lab. arXiv:[2506.08872](https://arxiv.org/abs/2506.08872).
Also deposited at PMC12723506. n = 54 (18 in the fourth session). Confidence: `medium`

EEG study. Participants wrote essays in three conditions: LLM, search engine, and brain-only.
Brain-only participants showed the strongest and most distributed neural connectivity; LLM
users the weakest. A fourth session swapped conditions. The LLM group also showed poorer
recall of their own writing shortly after producing it.

**What it does not show.** Small sample, one task type, one short time horizon. EEG
connectivity is not a measure of skill, and lower neural engagement during a task is not
evidence of durable capability loss. "Cognitive debt" is the authors' framing, not a
demonstrated long-term outcome.

Anchors: CI of Self, specifically the claim that the practitioner cannot feel the gap forming.

### Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., Wilson, N. (2025)
**The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive
Effort and Confidence Effects From a Survey of Knowledge Workers.** CHI 2025.
DOI: [10.1145/3706598.3713778](https://doi.org/10.1145/3706598.3713778)
Microsoft Research and Carnegie Mellon. n = 319, 936 first-hand examples. Confidence: `high`

Surveyed knowledge workers on when and how they apply critical thinking with GenAI. Found that
**confidence in the tool** was associated with *less* critical thinking, while **self-confidence
in one's own expertise** was associated with *more*. Also documented a shift in the nature of
the work: from information gathering to verification, from problem-solving to integrating an
AI response, from doing to supervising.

**What it does not show.** Self-reported, so it measures perceived effort rather than measured
capability. It is a snapshot, not a trajectory.

**Why this is the most important entry for the framework.** The confidence finding is the
mechanism behind the assessment's central weakness: the profile most at risk is the one most
likely to rate itself generously. This is addressed directly in
[`../assessment/ASSESSMENT.md`](../assessment/ASSESSMENT.md).

Anchors: CI of Self, and the design of the assessment instrument.

### Korn Ferry, CEO imposter syndrome research (2024)
**71% of U.S. CEOs Experience Imposter Syndrome.**
[Korn Ferry press release](https://www.kornferry.com/about-us/press/71percent-of-us-ceos-experience-imposter-syndrome-new-korn-ferry-research-finds)
Confidence: `medium`, and **the common framing of this figure is wrong**

**Correction to the framing used elsewhere.** The 71% figure is frequently cited as
"Korn Ferry Workforce 2025: 71% of CEOs reported AI contributed to imposter feelings." That
attribution is incorrect on three counts. The figure is from **2024**, not 2025. It concerns
**U.S. CEOs** reporting imposter syndrome **in general**, with no AI attribution. The separate
2025 Korn Ferry Global Workforce Survey reports **43%** of senior executives experiencing
imposter syndrome.

The original publication of the AI Triangle carried the incorrect framing. It is corrected
here rather than quietly dropped, because a framework that asks practitioners to notice their
own unexamined acceptances should be willing to demonstrate the habit.

**What it does not show.** Nothing in this source links imposter feelings to AI use. If you
want that link, cite something else or cite nothing.

Anchors: nothing load-bearing. Retained as context on practitioner self-perception only.

---

## CI of Your AI Tools

### Bandara, E., Gore, R., Foytik, P., Shetty, S., Mukkamala, R., Rahman, A., Liang, X., et al. (2025)
**A Practical Guide for Designing, Developing, and Deploying Production-Grade Agentic AI
Workflows.** arXiv:[2512.08769](https://arxiv.org/abs/2512.08769), December 2025.
Old Dominion University, Deloitte, Florida International University and others.
Confidence: `medium` (preprint)

Proposes an engineering framework for agentic workflows plus nine best practices for
production reliability, determinism and governance, with a full multimodal case study. The
practices this framework draws on directly: **externalized prompt management**, **single-tool
and single-responsibility agents**, clean separation of workflow logic from servers, and
adherence to **KISS**.

**What it does not show.** A preprint, not peer-reviewed. Its practices are engineering
recommendations grounded in a case study, not findings from a controlled comparison. Nothing
in it measures practitioner capability, which is the framework's actual subject.

Anchors: CI of Your AI Tools, and questions 1, 2 and 5 of the decay checklist.

### Anthropic. **Building Effective Agents.**
https://www.anthropic.com/engineering/building-effective-agents
Confidence: `medium` (vendor engineering publication)

The canonical statement of the workflow-versus-agent distinction: workflows orchestrate
components along predefined code paths; agents direct their own process and tool use
dynamically. Recommends the simplest pattern that works.

**What it does not show.** Written by a model vendor about building with models. Useful and
widely adopted as a vocabulary, but not independent and not empirical.

Anchors: CI of Your AI Tools, decay checklist question 6.

---

## CI of New AI

### S&P Global Market Intelligence (2025)
**Voice of the Enterprise: AI & Machine Learning.**
[Research summary](https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/10/generative-ai-shows-rapid-growth-but-yields-mixed-results)
Survey of 1,000+ enterprises across North America and Europe. Confidence: `medium`

**42% of companies abandoned most of their AI initiatives in 2025, up from 17% the year
prior.** The average organization scrapped 46% of AI proof-of-concepts before production.
Leading obstacles cited were cost, data privacy and security risk.

**Sourcing note.** The original publication of the AI Triangle cited this figure as
unattributed "industry coverage." It is sourced here. This is the finding the vertex rests on,
so it needed a name.

**What it does not show.** A vendor survey, self-reported by respondents, not audited. It
reports abandonment but does not establish *why* in any rigorous way, so the framework's claim
that "the bottleneck was the human practice around the model, not model capability" is an
interpretation, and should be read as one.

Anchors: CI of New AI.

---

## On the overall evidentiary position

Three of the eight entries are preprints or vendor publications. Two of the peer-reviewed
studies are correlational. One widely repeated figure in the original publication turned out to
be misattributed, and one turned out to be unattributed but correct.

That is a normal evidence base for a practitioner framework, and it is stated plainly so that
nobody has to discover it adversarially. The framework's claims about *what to do* are not
derived from this literature. They are practitioner judgments, and they should be evaluated as
such. What the literature supports is the narrower claim that **discernment can degrade without
the artifact showing it**, which is the premise the whole framework rests on.

Corrections are welcome. Open an issue with a source.
