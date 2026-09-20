# Scan-and-Triage Cadence

The maintaining practice for **CI of New AI**.

> The bounded, deliberate practice of scanning, testing, and triaging new tools, platform
> features, and automation patterns as they appear, without descending into infinite chasing.

A bounded weekly window, perhaps an hour. Read what is new. Test exactly one feature you might
actually use. Explicitly triage the rest as not now.

**Not no. Not yes. Not now. The triage is the skill.**

---

## Cadence

**60 minutes. Hard stop. Visible timer.**

The hard stop is not a suggestion and it is not about efficiency. It is the entire discipline
of this vertex. Without it, this is the practice that eats the other two, which is failure
mode 2: CI of New AI consumes all available time, CI of existing tools rots, and CI of Self
never moves.

A visible countdown matters more here than in the other two kits, because scanning is
genuinely absorbing and time perception goes first.

## Before the first one

**Fix your source list.** Five to eight sources, written down in the worksheet. Not a feed you
scroll, a list you check. An unbounded input makes a bounded window impossible.

Reassess the list quarterly, not weekly. Changing where you look every week is scanning about
scanning.

## The hour: three blocks

| Block | Time | Rules |
|---|---|---|
| **Scan** | 20 min | Work the fixed source list. Capture into the intake list only. No clicking through, no signups, no installs, no "quick look." |
| **Test** | 25 min | Exactly one item, against a real task you already have. Write the success criterion **before** you start. |
| **Triage** | 15 min | Every other intake item gets one of three dispositions: no, yes, not now. Every not-now gets a revisit date **and** a trigger condition. |

### Scan, 20 minutes

Capture only. The failure here is the tab that becomes forty minutes because it looked
interesting, and the defence is a mechanical rule rather than willpower: nothing gets opened
properly during the scan block. Write the name and the source, move on.

### Test, 25 minutes

**Exactly one.** Three shallow tests teach you nothing that three headlines would not have.

**Against a real task you already have.** Testing against a toy problem tells you the tool
works on toy problems. Use something on your actual list this week.

**Write the success criterion first.** This is the pass-3-of-self-review of this kit: the
discipline that stops you from retrofitting the standard to the result. "Produces the Friday
summary with no factual edits from me" is a criterion. "Seems promising" is a feeling you had
after the fact.

A test that fails its criterion is a successful test. It cost you twenty-five minutes and
saved you an adoption.

### Triage, 15 minutes

Every intake item gets a disposition. The intake list ends the hour empty. An intake list that
rolls forward is tool sprawl with extra steps.

**"Not now" is the important one and the one that rots.** A real not-now carries:

- a **revisit date**, and
- a **trigger condition**: the observable event that would make it worth looking at.

"Revisit when my inventory has a row this would replace" is a trigger condition. "Revisit in
Q3" is a calendar entry, and a ledger built from calendar entries becomes a graveyard of
things you feel vaguely guilty about.

## The two-passes rule

**An item whose revisit date has passed twice with no decision converts to a hard no,
automatically, and you do not get to feel bad about it.**

This is what makes "not now" a real disposition rather than a polite deferral. Without a
forcing function, deferral is permanent and the ledger becomes the sprawl it was built to
prevent. That is failure mode 5.

The worksheet has a column for recording the conversion, so it happens on paper rather than by
vague attrition.

## What done looks like

- The hour ended on the hour.
- Exactly one test, with a written verdict against the criterion you wrote first: adopt,
  discard, or not now.
- Every intake item dispositioned. The intake list is empty.
- No overdue ledger items.

## What done is not

- Three shallow tests.
- An intake list carried over to next week.
- A signup.

## Anti-patterns

**The hour becomes two.** The most common failure, and the reason for the visible timer.

**Testing three things badly.** Feels productive, produces nothing you can act on.

**Writing the success criterion after seeing the result.** The result will always meet it.

**The intake list that never empties.** Covered above; the triage block exists to prevent it.

**Adopting during the scan block.** If it is genuinely urgent, it can survive until next
week's test block. Almost nothing is.

---

**Ledger:** [`not-now-ledger.csv`](not-now-ledger.csv) ·
**Worksheet:** [`worksheet.md`](worksheet.md) ·
**Filled in:** [`worked-example.md`](worked-example.md) ·
**Print:** [`printable/scan-and-triage-cadence.html`](printable/scan-and-triage-cadence.html)
