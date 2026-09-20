# Assessment

Twelve items, ten minutes, one shape.

| Start here | |
|---|---|
| **Print it** | [`printable/ai-triangle-assessment.html`](printable/ai-triangle-assessment.html). Open in any browser, print, fill in with a pen. One page, includes the plotting grid. |
| **Read it** | [`ASSESSMENT.md`](ASSESSMENT.md). The twelve items, how to answer, and what the instrument cannot see. |
| **Score it** | [`SCORING.md`](SCORING.md). Raw to axis, the band table, and what each of the five shapes means. |
| **Embed it** | The [widget](../widget/) is the interactive version. Same rules, same verdicts. |

## How it works

Each vertex has four behavioural items about the **last 30 days**, scored yes 2, partly 1, no
0. Vertex raw runs 0 to 8, which maps onto a 1 to 5 axis. Three axis values resolve to one of
five shapes: Balanced, Collapsing, Tilting, Lopsided, Uneven.

Behavioural and time-bounded rather than attitudinal, because "I value continuous improvement"
is unfalsifiable and "I held a self-review block three times in the last 30 days" is checkable
against your own calendar.

## Three things worth knowing

**There is no total.** The three scores are never summed. (5,5,1) and (4,4,3) have nearly the
same area and describe completely different practitioners, so only the shape gets a name.
[`SCORING.md`](SCORING.md) explains this at length, because the impulse to add them up is
strong and is the first step toward treating the instrument as a metric.

**It is self-report, and it says so.** The research underpinning CI of Self found that the
profile most at risk is the one most likely to rate itself generously. The instrument is
weakest exactly where the problem is worst, this cannot be fixed from inside the instrument,
and [`ASSESSMENT.md`](ASSESSMENT.md) addresses it directly rather than leaving a critic to
find it.

**It is never an input to a review.** If a number from this has ended up in a document that
outlives the session, something has gone wrong. See
[`../framework/FAILURE-MODES.md`](../framework/FAILURE-MODES.md), failure mode 6, and
[`../facilitation/manager-prebrief.md`](../facilitation/manager-prebrief.md).

## Paper and widget agree, provably

[`bands.json`](bands.json) is the machine-readable verdict logic and the source of truth. The
widget inlines an equivalent implementation because it ships as one dependency-free file.
`node tools/verify-bands.mjs` enumerates all 125 possible combinations and fails if the two
ever disagree. It runs in CI on every commit.

This matters more than it might appear. If someone assessed on paper and someone else assessed
in the widget and they got different verdicts from the same answers, the instrument would be
worthless for a team, and the drift would be silent.
