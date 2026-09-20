# Agent Refactor Sprint

The maintaining practice for **CI of Your AI Tools**.

> Your prompts, agents, sub-agents, and automations are versioned artifacts that decay
> without active maintenance.

Monthly or quarterly depending on cadence, revisit the highest-frequency assets in your
personal AI stack and re-architect them based on what you learned by running them in
production. Not the cosmetic cleanup version of CI. The deliberate redesign of the conditions
that produce your work.

---

## Cadence

**90 minutes.** Monthly for a light sprint, quarterly for a full one. If you only do one, make
it quarterly and make it real.

The difference: a light sprint runs steps 1, 2 and 3 against one asset. A full sprint runs all
five steps against three.

## Prerequisite: the inventory

You cannot refactor a stack you have not listed. Before the first sprint, fill in
[`ai-stack-inventory.csv`](ai-stack-inventory.csv).

It is a CSV rather than a table in a document because it is living data. It gets sorted,
filtered and appended to for years, and a markdown table stops being maintained at about row
twelve.

| Column | Means |
|---|---|
| `name` | What you call it |
| `lives_where` | File path, tool, or "in my head" (which is itself a finding) |
| `purpose` | One line. If it takes two, see decay question 1. |
| `runs_per_week` | Honest estimate |
| `last_changed` | Date. Blank means never, which is the point of the column. |
| `owner` | You, usually. Someone else sometimes, which changes the blast radius. |
| `blast_radius` | 1 to 3. What breaks if it is wrong: 1 = only me, 2 = my team sees it, 3 = it goes outside. |
| `status` | `active`, `dormant` (not run in 60 days), `retired` |

Building the first inventory takes about thirty minutes and is usually the most informative
half hour of the whole vertex, because most people find at least one thing they depend on
daily and have never edited.

## The sprint: five steps, 90 minutes

| Step | Time | What you do |
|---|---|---|
| 1. Inventory refresh | 15 min | Add anything new. Mark anything not run in 60 days `dormant`. |
| 2. Rank and cut | 10 min | Score `runs_per_week × blast_radius`. Take the top three. **Only three.** |
| 3. Decay checklist | 40 min | Run the six questions against each of the three. |
| 4. Write the change | 15 min | One changelog line per asset. |
| 5. Retire | 10 min | At least one retirement or merge. |

**Only three** is a real constraint. Four assets in ninety minutes produces four shallow
reviews, which is how a sprint becomes the cosmetic cleanup it is defined against.

## The decay checklist

Six questions per asset. Each is yes or no, with a follow-up if the answer is bad.

1. **Does it still have exactly one responsibility, or has it accreted a second?**
   The single-tool single-responsibility principle from the agentic workflows literature. This
   is the most common decay and the hardest to see, because accretion happens one reasonable
   addition at a time.

2. **Does it live in a file you can diff, outside the chat window?**
   Externalized prompt management. If it lives in a conversation, you have no history, no
   diff, and no way to answer question 4.

3. **Does it encode a model behaviour that has since changed?**
   Prompts written to work around a limitation outlive the limitation. Instructions that
   compensate for something the model no longer does are now just noise competing for
   attention.

4. **Is there a failure example attached to it, or are you maintaining it from memory?**
   An asset with no recorded failures is one you are tuning by vibe.

5. **Is an LLM doing work a deterministic step could do cheaper and more reliably?**
   The KISS principle. Sorting, filtering, formatting and arithmetic do not need a model.

6. **Is it a workflow pretending to be an agent?**
   Anthropic's distinction: a workflow orchestrates components along predefined paths; an
   agent directs its own process. If the path is actually fixed, the flexibility is costing
   you determinism for nothing.

## The changelog line

Fixed format, so it is greppable a year from now:

```
YYYY-MM-DD | asset | what changed | why | the failure that prompted it
```

**The last field is not optional.** A change with no prompting failure behind it is a
cosmetic change, which is precisely what this vertex is defined against. If you cannot name
the failure, you are tidying, and tidying is not what the ninety minutes is for.

This is also the discipline that makes the whole vertex measurable. Assessment item 8 asks
whether you can name the failure behind your last change, and the changelog is where that
answer lives.

## What done looks like

- Three assets changed, each with a changelog line naming a real failure.
- One asset retired or merged.
- Every inventory row has a `last_changed` date or an explicit blank you have looked at.

## What done is not

**A new agent.** Building something new during the refactor sprint is the named anti-pattern.
It is more fun than refactoring and it feels like progress, and it is how the inventory grows
while nothing in it improves. If you have an idea for a new agent during the sprint, write it
on the not-now ledger from the CI of New AI kit and carry on.

## Anti-patterns

**The inventory becomes the deliverable.** Maintained beautifully, acted on never. That is
failure mode 4. The done condition requires changes, not tidiness.

**Refactoring the interesting one instead of the ranked one.** The ranking exists because the
asset that most needs attention is rarely the one you most want to open.

**Retiring nothing.** If nothing has been retired in three sprints, the stack is only growing,
and you are heading for tool sprawl by a different road.

---

**Inventory:** [`ai-stack-inventory.csv`](ai-stack-inventory.csv) ·
**Worksheet:** [`worksheet.md`](worksheet.md) ·
**Filled in:** [`worked-example.md`](worked-example.md) ·
**Print:** [`printable/agent-refactor-sprint.html`](printable/agent-refactor-sprint.html)
