# Agent Refactor Sprint: worksheet

Date: ____________    Type: light / full    Started: ______    Ended: ______

Method: [`README.md`](README.md). Done is not a new agent.

---

## Step 1: inventory refresh (15 min)

Working file: [`ai-stack-inventory.csv`](ai-stack-inventory.csv)

- [ ] Added everything new since last sprint
- [ ] Marked anything not run in 60 days as `dormant`
- [ ] Every row has a `last_changed` value or a blank I have looked at

New rows added: ______    Marked dormant: ______

---

## Step 2: rank and cut (10 min)

Score = `runs_per_week × blast_radius`. Take the top three. Only three.

| Rank | Asset | runs/wk | blast | Score |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

Is the top-ranked one also the one I least want to open? Y / N
(If yes, that is normal. Open it first.)

---

## Step 3: decay checklist (40 min)

Mark the bad answer. A checked box is a problem found.

### Asset 1: ______________________________

- [ ] Has accreted a second responsibility
- [ ] Does not live in a diffable file
- [ ] Encodes a model behaviour that has since changed
- [ ] Has no failure example; maintained from memory
- [ ] Uses a model where a deterministic step would do
- [ ] Is a workflow pretending to be an agent

Notes: ________________________________________________________________

### Asset 2: ______________________________

- [ ] Second responsibility
- [ ] Not diffable
- [ ] Stale model behaviour
- [ ] No failure example
- [ ] Model doing deterministic work
- [ ] Workflow pretending to be an agent

Notes: ________________________________________________________________

### Asset 3: ______________________________

- [ ] Second responsibility
- [ ] Not diffable
- [ ] Stale model behaviour
- [ ] No failure example
- [ ] Model doing deterministic work
- [ ] Workflow pretending to be an agent

Notes: ________________________________________________________________

---

## Step 4: write the change (15 min)

Format: `YYYY-MM-DD | asset | what changed | why | the failure that prompted it`

The last field is not optional. No failure means no change was needed.

```
1. ___________________________________________________________________

2. ___________________________________________________________________

3. ___________________________________________________________________
```

---

## Step 5: retire (10 min)

Retired or merged this sprint: ________________________________________

Why it was safe to retire: ____________________________________________

Sprints since the last retirement: ______
(Three or more means the stack is only growing.)

---

## Parked

Ideas for new assets that came up during the sprint. These go to the not-now ledger, not into
the stack today.

- _____________________________________________________________________
- _____________________________________________________________________

---

## Done check

- [ ] Three assets changed, each with a changelog line naming a real failure
- [ ] One asset retired or merged
- [ ] Inventory current
- [ ] I did not build anything new

---

The AI Triangle by Brian Rain, CC BY-NC-SA 4.0. https://brianrain.com/ai-triangle/
