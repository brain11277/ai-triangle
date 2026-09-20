# Scoring

Turn three raw scores into a shape. Five minutes.

---

## Step 1: convert each raw score to the axis

| Raw score (0 to 8) | Axis value |
|---|---|
| 0 to 1 | 1 |
| 2 to 3 | 2 |
| 4 to 5 | 3 |
| 6 to 7 | 4 |
| 8 | 5 |

The axis runs 1 to 5, where **1 = none and 5 = consistent practice**. A 5 requires a perfect
8, which is deliberate: consistent practice means all four behaviours, not most of them.

This mapping is what makes the paper instrument and the interactive widget interchangeable.
Both produce a value from 1 to 5 per vertex, and both feed the identical rules below.

```
CI of Self            raw ___ / 8   →   axis ___
CI of Your AI Tools   raw ___ / 8   →   axis ___
CI of New AI          raw ___ / 8   →   axis ___
```

## Step 2: find your shape

Read top to bottom. **Stop at the first row that matches.**

| Check | Shape | Verdict |
|---|---|---|
| All three are 4 or 5 | Balanced | Balanced. Maintain the rhythm. |
| All three are 3 or below | Collapsing | The shape is collapsing. Pick one vertex to start with this week. CI of self is usually the right one. |
| Two or more are below 3 | Tilting | Triangle is tilting. The artifact still looks polished. The maintenance is not happening. |
| Exactly one is below 3, and the other two are both 4 or 5 | Lopsided | Lopsided. The neglected vertex is the one to invest in next. |
| Anything else | Uneven | Uneven. Invest in the lowest vertex next. |

**The order matters and it is not obvious.** "All three are 3 or below" is checked before the
counting rows, so (3,3,3) is Collapsing rather than Uneven, and (2,3,3) is Collapsing rather
than Tilting. If you reorder these rows to make them read more logically, you will get
different answers than the widget gives. The machine-readable version is
[`bands.json`](bands.json), and `tools/verify-bands.mjs` proves the two agree across all 125
possible combinations.

The five verdict strings are a stability commitment and cannot change without a major version.

---

## Step 3: read your shape

### Balanced
*Balanced. Maintain the rhythm.*

**What this actually means.** All three cadences are running and you can evidence them. This
is maintenance mode, not an achievement to be defended. The framework has no level above this
one, deliberately, because there is nothing to optimize toward once the practices are running.

**The one move this week.** Nothing new. Protect what exists. The most common way people leave
this state is by adding a fourth thing, and the second most common is a quarter where the
calendar gets eaten and nobody notices which block went first.

**What you would expect to see in 30 days.** The same three cadences, unchanged, and an item 4
answer that has moved. If you are Balanced twice in a row with the *same* answer to item 4,
the self-review block may have gone quiet without going missing.

### Collapsing
*The shape is collapsing. Pick one vertex to start with this week. CI of self is usually the right one.*

**What this actually means.** None of the three practices is running consistently. This is the
most common first result and it is not a crisis, it is a starting line. It usually reflects a
period where everything was delivery, which is a normal thing for a quarter to be.

**The one move this week.** One block, on the calendar, for CI of Self. Not all three. The
guidance to start with self is not arbitrary: the other two vertices are hard to do honestly
without it, because deciding which agent to refactor and which tool to skip are both
discernment problems.

**What you would expect to see in 30 days.** Three self-review blocks held, and one accept-log
row you did not enjoy writing. That is the whole target. Tools and new AI stay where they are.

### Tilting
*Triangle is tilting. The artifact still looks polished. The maintenance is not happening.*

**What this actually means.** Two or more vertices are genuinely low while at least one is
holding. Your output has probably not visibly degraded, which is precisely why this state
persists. Nothing in your week is going to tell you about it.

**The one move this week.** Identify which single vertex is propping up the shape, and note
honestly whether it is the one you enjoy rather than the one that is needed. Then put a block
on the calendar for the lowest one.

**What you would expect to see in 30 days.** One vertex moved up a band. Not three. A tilting
triangle corrected on all fronts at once usually reflects a burst of enthusiasm rather than a
change in cadence, and it reverts.

### Lopsided
*Lopsided. The neglected vertex is the one to invest in next.*

**What this actually means.** Two vertices are strong and one is genuinely neglected. This is
the most actionable shape on the instrument, because the diagnosis is unambiguous and the
remedy is a single calendar entry.

**The one move this week.** Open the practice kit for the low vertex and schedule its first
session. The two strong vertices need no attention this month.

**What you would expect to see in 30 days.** The low vertex up at least one band, and the
other two unchanged. If the other two dropped while you fixed the third, you traded rather
than added, and the shape will be Uneven next time.

### Uneven
*Uneven. Invest in the lowest vertex next.*

**What this actually means.** A mixed picture with no single dominant story. Often a practice
in transition: something is being built, something else is being let go. It is the most common
result on a second or third assessment.

**The one move this week.** Take the numerically lowest vertex and schedule one session from
its kit. If two are tied, take CI of Self.

**What you would expect to see in 30 days.** Movement on one vertex and no loss on the others.
Uneven to Lopsided is progress, despite sounding worse.

---

## Reading the shape rather than the score

**No total is computed, here or in the widget.** This is deliberate and it is worth
understanding rather than working around.

A triangle with values (5,5,1) and one with (4,4,3) have close to the same area, and they
describe completely different practitioners. The first is someone with a strong practice and
one genuine blind spot, which is a specific and fixable situation. The second is someone doing
a bit of everything and not quite enough of any of it, which needs an entirely different
response. A single number out of 15 would call them nearly the same and would tell you to do
nothing useful.

So only the shape gets a name. If you find yourself adding the three numbers to see whether
you improved, that impulse is worth noticing: it is the instrument being turned into a score,
which is the first step toward failure mode 6.

**Comparing over time.** Compare shape words, not numbers. Self-report drift across three
months makes a one-point numeric change meaningless, while a move from Collapsing to Lopsided
is a real and legible change in practice.
