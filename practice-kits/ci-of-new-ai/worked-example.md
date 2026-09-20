# Scan-and-Triage Cadence: worked example

A week from the same staff engineer as the refactor sprint example. **The test fails.** That
is deliberate: a worked example where the new thing turns out to be great teaches nothing
about triage, which is the skill this vertex is named for.

Week of: 14 Sept    Started: 16:00    **Hard stop: 17:00**

---

## My source list

1. Two vendor changelogs (the two we actually run on)
2. One aggregator newsletter, weekly
3. Two engineering blogs
4. The arXiv cs.SE new-submissions digest, skimmed
5. One community Slack, #tools channel only

Six sources. Set in July, unchanged since, next review in October.

---

## Block 1: scan, 20 minutes

Eleven items captured. Nothing opened.

| # | Item | Source |
|---|---|---|
| 1 | Agent orchestration: durable multi-step runs | vendor changelog A |
| 2 | Structured output: new schema enforcement mode | vendor changelog A |
| 3 | Spreadsheet-to-chart in the assistant UI | vendor changelog B |
| 4 | Prompt caching price change | vendor changelog B |
| 5 | Open-source eval harness, v2 | newsletter |
| 6 | "We replaced our RAG stack" writeup | eng blog |
| 7 | Local model runner, 1.0 release | newsletter |
| 8 | Paper: agent failure taxonomies | arXiv digest |
| 9 | IDE extension for prompt versioning | #tools |
| 10 | Managed vector store, free tier | newsletter |
| 11 | CLI for diffing model outputs | #tools |

Item 9 is the one I wanted to open immediately, because prompt versioning is exactly the gap
the refactor sprint just found. Did not open it. It goes through the test block or it waits.

---

## Block 2: test, 25 minutes

Item under test: **#1, durable multi-step agent runs**

Chose it over #9 because blast radius: #1 would touch the oncall path, #9 would touch my own
snippets. If one of them is going to be wrong, I would rather find out about the expensive one.

Real task I am testing it against: **the Friday squad summary**, which I owe today and which
the weekly-report-agent currently drafts.

**Success criterion, written before starting:**

> Produces the Friday summary with no factual edits from me. Formatting edits are fine.
> Anything I have to go and verify counts as a factual edit.

Did it meet the criterion? **N**

What actually happened: the durable-run framing genuinely solved the step-ordering problem,
which was real and which I had worked around with a retry. But the summary contained two
items that were not on the board and one date that was a week out. Three factual edits. The
orchestration improved and the output did not, because the orchestration was never the
problem. The problem was the three-responsibilities issue the refactor sprint found on Tuesday.

Verdict: **not now**

This is the useful outcome. Twenty-five minutes established that a migration I was mildly
excited about would have fixed a thing that was not broken while leaving the actual defect in
place. Had I adopted on the strength of the changelog, I would have spent a week on it and
still had bland reports.

---

## Block 3: triage, 15 minutes

| # | Item | Disposition | Revisit | Trigger condition |
|---|---|---|---|---|
| 1 | Durable multi-step runs | not now | 2026-12-01 | When the split weekly-report agents are stable and step ordering is still costing me a retry |
| 2 | Schema enforcement mode | **yes** | | Adopting next week: pr-description-prompt already hand-rolls this |
| 3 | Spreadsheet-to-chart | not now | 2026-11-15 | When someone asks me for the same chart twice in a month |
| 4 | Prompt caching price change | **no** | | Informational. Nothing to do. |
| 5 | Eval harness v2 | not now | 2027-01-15 | When I have more than 3 assets with recorded failure examples to evaluate against |
| 6 | RAG replacement writeup | **no** | | We do not run RAG |
| 7 | Local model runner | **no** | | No offline requirement. Saying no to this for the third time; it is a hard no now. |
| 8 | Agent failure taxonomies | **yes** | | 20 min read, goes in next week's scan block. Feeds the decay checklist. |
| 9 | IDE prompt versioning extension | not now | 2026-10-20 | When commit-msg-prompt and the other externalized snippets have been in files for a month and I know whether plain git is enough |
| 10 | Managed vector store | **no** | | See 6 |
| 11 | Model output diff CLI | not now | 2026-12-01 | When I next need to compare two versions of an asset and find myself doing it by eye |

Intake list ends empty. Two yes, four no, five not now.

Item 9 is the instructive one. I wanted it at 16:05. The trigger I gave it is honest: I do not
yet know whether git alone solves the problem, because the snippets have existed for three
days. Adopting a versioning tool for files I have not tried to version yet would be tooling
ahead of need.

---

## Ledger maintenance

Items whose revisit date has passed: **2**

| Item | Passes before today | Decision |
|---|---|---|
| Notebook-style agent scratchpad | 1 | **hard no (2nd pass)** |
| Team prompt library SaaS | 0 | revisit, new date 2026-11-30 |

Converted to hard no this week: **1**

The scratchpad had been on the ledger since May with two revisit dates gone by and no trigger
ever firing. The rule converted it. Slightly annoying, obviously correct: something I have
declined to act on twice across four months is not a not-now, it is a no that nobody wanted to
say.

---

## Done check

- [x] The hour ended on the hour (17:00, one item mid-triage, finished the row and stopped)
- [x] Exactly one test, criterion written first
- [x] Every intake item dispositioned, intake list empty
- [x] Every not-now has a trigger condition
- [x] No overdue ledger items
- [x] I did not sign up for anything

**Adopted: one.** Schema enforcement, because it replaces something I am already doing by
hand. That is the shape a good week has: eleven things seen, one tested, one adopted, and the
adopted one was not the exciting one.
