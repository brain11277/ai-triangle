# Agent Refactor Sprint: worked example

A full quarterly sprint from a staff engineer with a nine-row inventory. The interesting part
is asset 1, which had been quietly getting worse for two months.

Date: 18 Sept    Type: full    Started: 09:30    Ended: 11:04

---

## Step 1: inventory refresh

Nine rows going in, plus two added during the refresh that had never been written down: a
commit-message prompt used daily, and an incident-summary agent built in July and used twice.

| name | lives_where | runs/wk | last_changed | blast | status |
|---|---|---|---|---|---|
| weekly-report-agent | ~/agents/weekly-report.md | 1 | 2026-06-30 | 3 | active |
| pr-description-prompt | snippets/pr-desc.txt | 14 | 2026-08-14 | 2 | active |
| commit-msg-prompt | in my head | 30 | (never) | 1 | active |
| test-gen-agent | ~/agents/testgen.md | 6 | 2026-05-02 | 2 | active |
| oncall-triage-helper | ~/agents/triage.md | 3 | 2026-07-19 | 3 | active |
| doc-summarizer | snippets/summarize.txt | 4 | 2026-04-11 | 1 | active |
| incident-summary-agent | ~/agents/incident.md | 0.2 | 2026-07-01 | 3 | **dormant** |
| changelog-drafter | snippets/changelog.txt | 0 | 2026-03-20 | 2 | **dormant** |
| schema-diff-explainer | ~/agents/schemadiff.md | 2 | 2026-06-15 | 1 | active |
| adr-template-prompt | snippets/adr.txt | 0.5 | 2026-02-08 | 2 | active |
| slack-standup-prompt | in my head | 5 | (never) | 2 | active |

New rows added: **2**. Marked dormant: **2**.

Two of eleven live "in my head" and have never been changed, one of them running thirty times
a week. That is the finding of step 1 and it was not what I expected to find.

---

## Step 2: rank and cut

| Rank | Asset | runs/wk | blast | Score |
|---|---|---|---|---|
| 1 | commit-msg-prompt | 30 | 1 | 30 |
| 2 | pr-description-prompt | 14 | 2 | 28 |
| 3 | oncall-triage-helper | 3 | 3 | 9 |

weekly-report-agent scores 3 and did not make the cut, which is worth noting because it is the
one that turned out to be broken. The ranking is a heuristic, not an oracle. I ran the
checklist on it anyway as a fourth, informally, because a colleague had said something.

Is the top-ranked one also the one I least want to open? **Yes.** commit-msg-prompt has never
been written down and works fine, so opening it feels like inventing work.

---

## Step 3: decay checklist

### Asset 1: commit-msg-prompt

- [x] Does not live in a diffable file
- [x] Has no failure example; maintained from memory

Runs thirty times a week, exists only as muscle memory, and varies slightly every time because
I retype it. Not broken, but unversioned and unimprovable. Wrote it to
`snippets/commit-msg.txt`, which took four minutes and should have happened a year ago.

### Asset 2: pr-description-prompt

- [x] Encodes a model behaviour that has since changed
- [x] Uses a model where a deterministic step would do

Contains three lines instructing the model not to invent file paths, written against a model
that used to do that and no longer does. Also asks it to count changed files, which `git diff
--stat` does correctly and for free. Removed both.

### Asset 3: oncall-triage-helper

- [x] Is a workflow pretending to be an agent

The path is fixed: read alert, check runbook, classify severity, draft the update. Nothing
about it benefits from the model choosing its own sequence, and when it does deviate it is
always wrong. Converted to three explicit steps.

### Asset 4 (unranked, checked on a hunch): weekly-report-agent

- [x] **Has accreted a second responsibility**

This is the real finding of the sprint. It began as "pull the board data and format it." Over
five months it acquired "decide what is notable," and then "write the prose." Three
responsibilities in one prompt, added one reasonable commit at a time.

The symptom was that the reports had been getting blander since roughly mid-July, which I had
noticed without registering, and which a colleague named last week when they asked why the
reports all sound the same. The model was averaging across three jobs and doing the middle one
worst.

Split into three: a deterministic data pull, a notability pass with explicit criteria, and a
drafting step that receives the selected items rather than choosing them.

---

## Step 4: write the change

```
2026-09-18 | commit-msg-prompt | Externalized to snippets/commit-msg.txt | Was unversioned and drifting | Retyped from memory 30x/wk, no two identical, could not diff or improve it

2026-09-18 | pr-description-prompt | Removed 3 lines of stale anti-hallucination guidance and the file-count instruction | Model no longer needs it; git diff --stat is exact | PR description reported 11 changed files when the diff had 14

2026-09-18 | oncall-triage-helper | Converted from agent to 3 fixed steps | Path was never actually dynamic | Sev-2 classified as Sev-3 on 9 Sept because it reordered and skipped the runbook check

2026-09-18 | weekly-report-agent | Split into data pull, notability pass, drafting step | Had accreted 3 responsibilities since June | Reports drifting generic since mid-July; noticed by a colleague before me, which is the actual failure here
```

Four lines rather than three, because the fourth asset earned it.

---

## Step 5: retire

Retired or merged this sprint: **changelog-drafter**

Why it was safe to retire: zero runs in six months. The release notes are generated from
commit messages now, which the commit-msg-prompt makes good enough to use directly. It was
superseded and nobody noticed.

incident-summary-agent left `dormant` rather than retired: two runs since July, but both were
during real incidents, and blast radius 3. Low frequency is not the same as low value.

Sprints since the last retirement: **0**

---

## Parked

Went to the not-now ledger, not into the stack:

- An agent that reviews my own PRs before I open them
- Something to keep the ADR template in sync with the docs site

---

## Done check

- [x] Three assets changed, each with a changelog line naming a real failure (four)
- [x] One asset retired
- [x] Inventory current, with two previously unrecorded assets now in it
- [x] I did not build anything new

**Ninety-four minutes.** Four over, entirely on the weekly-report-agent split. Worth it, and
worth noticing that the asset which most needed the sprint was the one the ranking missed.
