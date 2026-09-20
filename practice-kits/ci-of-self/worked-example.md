# Weekly Self-Review Block: worked example

A plausible week from a product manager, four weeks into the practice. The uncomfortable
entries are left uncomfortable, because a worked example where everything goes well teaches
nothing.

Week of: 14 Sept    Started: 15:10    Ended: 15:57

---

## Inputs

Deliberately not the best three. The competitive brief was the good one this week and it is
not here.

| # | Artifact | Who saw it |
|---|---|---|
| 1 | Positioning paragraph for the Q4 launch page | Marketing, in review |
| 2 | Slack summary of the vendor call | The squad channel |
| 3 | Two paragraphs of the spec for the export feature | Eng lead, in the doc |

---

## Pass 1: cold read

| # | Could I defend every claim without the transcript? | First claim I could not |
|---|---|---|
| 1 | **N** | "the fastest path to a shareable report" versus Competitor B. I do not actually know that B is slower. |
| 2 | Y | |
| 3 | **N** | The claim that CSV covers "the overwhelming majority" of requests. I have not looked at the tickets since spring. |

Two out of three. Both of the failures are the same kind: a specific comparative claim I
would not have made on my own, stated confidently enough that nobody queried it.

---

## Pass 2: the accept log

| What I accepted | What I would have written myself | Why I did not write it |
|---|---|---|
| "the fastest path to a shareable report" | "a faster path", or nothing at all | It sounded better and I did not want to go and check |
| The vendor summary's framing of their SLA as "industry standard" | I would have quoted the number | I did not know what industry standard was and the sentence let me not find out |
| "the overwhelming majority of requests" | "most of the requests I have seen" | The stronger version made the spec read as more decided than I felt |
| Three bullet points restructuring the launch page order | Roughly the same order | Genuinely better than mine. No issue here. |

**Which row is the uncomfortable one?** Row 2. I shipped a claim about a vendor's SLA into a
channel where four people will now repeat it, and my reason for not checking was that the
phrase allowed me not to. That is not a time problem. I had time.

---

## Pass 3: over-prompt check

| # | Prompt count |
|---|---|
| 1 | 11 |
| 2 | 2 |
| 3 | 6 |

Highest count: **11**

The one sentence of thinking I was avoiding by prompting again:

> I had not decided whether we are positioning against Competitor B at all this quarter, and
> every reprompt was a way of asking the model to make that call for me.

Eleven prompts on a paragraph that needed one decision. The paragraph is good. The decision
still has not been made, and now it is embedded in a page draft where it looks like it was.

Trend so far: week 1 was 4 prompts on the highest artifact, week 2 was 7, week 3 was 6, week 4
is 11. One spike is not a trend. Worth watching.

---

## Pass 4: one commitment

**When** I am about to send a third prompt on the same paragraph,

**I will** close the tab and write the next sentence by hand

**before prompting.**

Rejected as a first draft: "check comparative claims before shipping." True, and it fires on
nothing. The third-prompt trigger fires on something I will physically notice.

---

## Decay tracker, four weeks in

| Week | Block held | Artifacts reviewed | Accept-log rows | Last week's trigger kept |
|---|---|---|---|---|
| 1 | Y | 3 | 2 | n/a |
| 2 | Y | 3 | 5 | **N** |
| 3 | **N** | 0 | 0 | Y |
| 4 | Y | 3 | 4 | n/a (week 3 skipped) |

Week 3 was skipped for a launch. Week 2's trigger was not kept, and the honest reason is that
it was written as "be more rigorous about vendor claims", which is an intention wearing a
trigger's clothes. That is why week 4's is phrased around a countable event.

---

## Done check

- [x] Three artifacts, and not my best three
- [x] At least one accept-log row I am not comfortable with
- [x] One trigger commitment, in my own words
- [x] The block ended when the timer ended (47 minutes)
- [x] I did not produce a deliverable

The positioning paragraph still says "fastest." Fixing it during the block would have been
production work. It is on Monday's list instead, which is where it belongs.
