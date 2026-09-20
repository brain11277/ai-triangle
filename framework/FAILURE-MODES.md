# Failure modes

Six ways the practice goes wrong. The first two were named in the original publication. The
other four only appear once people have been running the kits for a few months, which is why
they are not on the microsite.

Every one of them shares the property that makes the framework necessary in the first place:
**the artifact does not signal the problem. The practitioner has to notice.**

---

## 1. Over-prompting as a discernment hide

> A practitioner whose CI of self has quietly atrophied compensates by writing increasingly
> elaborate prompts. The prompt does the thinking, the output looks great, and the
> practitioner is genuinely worse than they were six months ago and cannot tell. You become
> your own downstream colleague.

**Symptoms**
- Your prompts have grown longer over time while your artifacts have not grown better.
- You reach for a prompt before you have formed an opinion, rather than after.
- Asked to defend a claim in your own work without opening the transcript, you cannot.

**Why the artifact will not tell you.** Elaborate prompting produces genuinely better output.
The quality signal moves in the right direction the whole time the capability behind it is
moving in the wrong one. There is no point at which the work looks worse.

**Counter-move.** CI of Self, pass 3 of the Weekly Self-Review Block: count prompts per
artifact, take the highest, and write the one sentence of thinking you were avoiding by
prompting again. The counting is what makes the trend visible, since no single instance
looks like a problem.

**Worked case.** A product manager writes a positioning paragraph. Two years ago that was
twenty minutes and one draft. Now it is eleven prompts across forty minutes, and the result is
better than the old one. The eleven prompts are not the failure; they are the symptom. The
failure is that when a director asks in a meeting why the second claim is true, there is a
three second pause that did not used to be there. Nothing in the document records that pause.
The accept log is the only place it can be written down.

---

## 2. Tool sprawl masquerading as adoption

> CI of new AI consumes all available time, CI of existing tools rots, and CI of self never
> moves. Output quality may stay flat or even decline, masked by the dopamine of trying new
> things.

**Symptoms**
- Your inventory has rows you have not run in sixty days and did not notice.
- You can name five tools you tried last month and no change you made to one you rely on.
- Your intake list never empties, it only rolls forward.

**Why the artifact will not tell you.** Trying new things feels like the responsible response
to a fast-moving field, and it is legible to others as engagement. Nothing about it looks like
avoidance until you measure what it displaced.

**Counter-move.** The hard stop on the Scan-and-Triage Cadence, plus the rule that the sprint
must retire something. If new intake is bounded and retirement is mandatory, sprawl cannot
accumulate quietly.

**Worked case.** An engineer spends four to six hours a week on new tooling for five months.
In that period they adopt nine things and refactor nothing. The weekly report agent they built
in month one is still running with the model behaviour it was written against, and its output
has been drifting blander for eight weeks. They notice in month six, when a colleague asks why
the reports all sound the same.

---

## 3. The self-review block that became a production block

**Symptoms.** The block reliably happens, and it reliably produces work. You leave it with a
better draft rather than an uncomfortable observation.

**Why it happens.** It is the path of least resistance. The block is an hour of protected
focus time, which is scarce, and production is what the rest of the week rewards.

**Counter-move.** The done condition is explicit and negative: done is not a better prompt, a
longer artifact, or a to-do list. If the block produced a deliverable, it did not happen. Put
the definition of done at the top of the worksheet where you will see it before you start.

---

## 4. The inventory that is maintained but never acted on

**Symptoms.** `ai-stack-inventory.csv` is current, tidy and accurate. The `last_changed`
column is full of dates from months ago.

**Why it happens.** Maintaining a list is satisfying and bounded. Refactoring an agent you
depend on is neither. The inventory becomes the deliverable instead of the input.

**Counter-move.** The sprint's done condition requires three changed assets each with a
changelog line naming a real prompting failure, plus one retirement. A sprint that updated the
inventory and changed nothing did not happen.

---

## 5. The not-now ledger that never empties

**Symptoms.** Dozens of rows, revisit dates in the past, nothing ever converted to a yes or a
no. The ledger has become a list of things you feel guilty about.

**Why it happens.** "Not now" is comfortable precisely because it defers. Without a forcing
function it defers permanently, and the ledger turns into the sprawl it was meant to prevent.

**Counter-move.** The two-passes rule: an item whose revisit date passes twice with no
decision converts to a hard no automatically, and you do not get to feel bad about it. Plus
the requirement that every row has a trigger condition rather than only a date, because a
trigger can actually fire.

---

## 6. The team that turned the assessment into a scoreboard

**Symptoms.** Someone can tell you what another person scored. A number appeared in a document
that outlives the session. The phrase "where are you on the triangle" is being used to mean
"how are you performing."

**Why it happens.** The instrument produces something that looks like a metric, and
organizations metabolize metrics into comparisons by default. Nobody has to intend it.

**Why it is fatal rather than merely unfortunate.** The instrument is self-report. The moment
a score carries consequence, the honest answer and the safe answer come apart, everyone gives
the safe one, and every subsequent run is worthless. This failure mode does not degrade the
practice; it ends it, and it cannot be undone by promising to be careful next time.

**Counter-move.** Structural, not cultural. Individual numbers are never spoken, never written
on a shared surface, never collected. The session reports shape words only. The facilitator
names their own lowest vertex first. `facilitation/manager-prebrief.md` exists to prevent the
request before it is made, and it offers the two aggregate signals that are legitimate to
share: the shape tally, and the commitment-kept rate at 90 days.
