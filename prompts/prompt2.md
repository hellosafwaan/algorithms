# Self-Improvement System
# Add this to your DSA Learning OS prompt, or paste into Claude Code as a follow-up after setup.

---

## Additional Folder to Create

```
dsa-learning/
└── meta/
    ├── improvement-log.md      ← Raw observations written after every session
    ├── pending-improvements.md ← Prioritised proposals waiting for Safwaan's review
    └── changelog.md            ← Approved changes and when they were applied
```

---

## File: `meta/improvement-log.md`

Seed with this content:

```markdown
# Improvement Log

Raw observations from each session. Unfiltered — quantity over quality here.
Reviewed periodically to extract actionable proposals into pending-improvements.md.

---

<!-- New entries added automatically after each session, newest first -->
```

---

## File: `meta/pending-improvements.md`

Seed with this content:

```markdown
# Pending Improvements

These are proposals waiting for Safwaan's review.
Each one is either ✅ Approved, ❌ Rejected, or 💬 Needs Discussion.

Approved items get applied immediately and logged in changelog.md.
Rejected items get a reason noted so we don't re-propose the same thing.

---

## How to Review
Read each proposal. Add your verdict on the Status line:
- ✅ Approved — Claude Code applies it at the start of the next session
- ❌ Rejected — add a brief reason so it doesn't get re-proposed
- 💬 Needs Discussion — Claude Code will discuss it with you before deciding

---

<!-- Proposals added here automatically, newest first -->
```

---

## File: `meta/changelog.md`

Seed with this content:

```markdown
# Changelog

Record of every improvement that was approved and applied.
This is the system's evolution history.

---

## Format
### [YYYY-MM-DD] — [What Changed]
**Category:** Coaching / Curriculum / File Structure / Prompt
**Proposed because:** [observation that triggered it]
**What changed:** [exactly what was modified]
**Impact:** [what this should improve]

---

<!-- Entries added here when improvements are applied, newest first -->
```

---

## Add This Section to `CLAUDE.md`

Append the following section to the existing CLAUDE.md:

```markdown
---

## Self-Improvement System

This system evolves through use. After every session, reflect and write observations.
Safwaan reviews proposals before anything is applied — never make changes unilaterally.

### Step 1 — Reflect After Every Session

After completing the standard post-session updates (TRACKER, patterns, session file etc.),
spend 2–3 minutes reflecting on the session and write raw observations to
`meta/improvement-log.md`.

Use these reflection prompts:

**Coaching quality:**
- Was I pitching questions at the right level — too easy, too hard, just right?
- Did I give anything away before he'd genuinely attempted it?
- Was there a moment where a different question would have unlocked things faster?
- Did I miss a chance to connect this problem to something he already knows?
- Was my tone right — did I over-explain anything he's already demonstrated?

**Curriculum intelligence:**
- Is this problem in the right position in the sequence?
- Did he struggle with something that suggests a prerequisite is missing?
- Is he moving too fast or too slow through this topic?
- Should a problem be added, removed, or reordered?
- Is there a pattern that needs more reinforcement before moving on?

**Safwaan model accuracy:**
- Did he do something that contradicts or updates what's in safwaan/identity.md?
- Did a new mistake pattern emerge that isn't in safwaan/patterns.md?
- Did something I thought was fragile turn out to be solid, or vice versa?
- Is the expertise calibration in CLAUDE.md still accurate?

**System quality:**
- Was there information I needed but couldn't find easily?
- Is any file getting unwieldy or hard to navigate?
- Is there a workflow that felt clunky or slow?
- Is there a file, folder, or structure that should exist but doesn't?
- Would a different format (table vs prose, split file vs merged) work better?

**Missed opportunities:**
- Was there a tool, reference, or resource that would have helped?
- Was there a visualization or example that would have made something click faster?
- Did Safwaan ask something that revealed a gap in the notes?

Write observations as raw bullet points — don't filter. Bad ideas can be rejected later.
Even "this felt slightly off but I can't articulate why" is worth logging.

### Step 2 — Generate Proposals (Every 3 Sessions)

Every 3 sessions, review the raw observations in `meta/improvement-log.md` and
synthesize actionable proposals into `meta/pending-improvements.md`.

Each proposal must follow this exact format:

```
### [Short Title]
**Category:** Coaching | Curriculum | File Structure | Prompt | Safwaan Model
**Priority:** 🔴 High | 🟡 Medium | 🟢 Low
**Status:** ⏳ Pending Review

**Observation:**
[What was noticed across sessions — specific, not vague.
 If it's from a specific session, reference it.]

**Proposed change:**
[Exactly what would change. Be specific enough that it could be implemented
 without asking clarifying questions. If it's a file change, say which file
 and what would be added/modified/removed.]

**Expected impact:**
[What this should improve and how you'd know it worked.]

**Tradeoffs:**
[Any downside or risk to this change. If none, say "None identified."]
```

Prioritisation guide:
- 🔴 High: Directly affects learning quality or wastes significant time
- 🟡 Medium: Would improve the experience but not blocking anything
- 🟢 Low: Nice to have, polish, or exploratory

### Step 3 — Flag for Review

When new proposals are added to `meta/pending-improvements.md`, tell Safwaan at the
start of the next session:

> "I've added [N] improvement proposals to meta/pending-improvements.md since last session.
> Want to review them now or after we solve today's problem?"

Don't block the session on this. It's a prompt, not a gate.

### Step 4 — Apply Approved Changes

When Safwaan marks a proposal ✅ Approved:
1. Apply the change immediately in the same session
2. Log it in `meta/changelog.md` with the format defined in that file
3. Mark the proposal as ✅ Applied in `pending-improvements.md`
4. If the change affects CLAUDE.md, update it so it persists to future sessions

When Safwaan marks ❌ Rejected:
1. Note the reason on the proposal (so it doesn't get re-proposed)
2. Archive it at the bottom of pending-improvements.md under `## Rejected`

When Safwaan marks 💬 Needs Discussion:
1. Raise it at the start of the next session
2. Present the tradeoffs clearly
3. Let Safwaan decide — don't advocate strongly either way

### Step 5 — Explicit Feedback

If Safwaan gives direct feedback mid-session ("that question was too leading",
"I want more time before hints", "these notes are hard to read"), treat it as
a High priority observation. Log it immediately in improvement-log.md and
generate a proposal before the end of the session — don't wait for the 3-session cycle.

### What Can Be Improved

Everything is in scope:
- **Coaching:** questioning style, pacing, hint timing, tone, what to probe
- **Curriculum:** problem order, difficulty curve, problem count per topic, skipping
- **Safwaan model:** identity.md, patterns.md, expertise calibration in CLAUDE.md
- **File structure:** adding, renaming, splitting, merging files or folders
- **Prompts:** CLAUDE.md itself, session file format, problem file format, handoffs
- **Notes:** topic notes depth, format, missing patterns, outdated content

### What Cannot Be Changed Without Explicit Approval

- Removing problems from TRACKER.md
- Changing the NeetCode 150 problem order significantly
- Merging or deleting safwaan/ files
- Any change that would cause information loss

These require Safwaan to say "yes, do this" explicitly — not just ✅ on a proposal.
```

---

## Seed: First Improvement Log Entry

After creating the meta/ folder, write this as the first entry in `meta/improvement-log.md`
to demonstrate the format:

```markdown
### 2026-05-09 — Session: Recursion & DP Fundamentals (Retrospective)

**Coaching observations:**
- Complexity analysis was consistently omitted until Safwaan explicitly requested it
  → this became a rule but only after he flagged it himself, not proactively
- The cache bug (if(cache[n]) vs if(n in cache)) was self-caught — good signal that
  guided questions are working, but worth noting the specific question that triggered it
- Fibonacci call tree visualization was the single highest-leverage moment in the session —
  the abstract concept clicked only when made visual

**Curriculum observations:**
- Recursion fundamentals (Sum, Factorial, Power of 2) were covered before the main
  curriculum starts — these don't have a home in the NeetCode 150 structure
  → consider a "recursion foundations" pre-phase or fold them into 1D DP notes
- The jump from basic recursion to memoized DP in one session was fast —
  Safwaan handled it but it's worth monitoring whether DP foundations are solid enough
  when we reach Phase 7

**Safwaan model observations:**
- First attempt on Sum 1 to N took 3 tries — pattern recognition wasn't there yet
- By Power of 2 he was first-attempt successful — suggests he learns patterns quickly
  once the template is internalized
- He self-advocates: flagged missing complexity analysis, flagged impracticality of O(n²)
  recursion — this is a reliable behavior, not a one-off

**System observations:**
- The recursion problems (Count Digits, Reverse String, Palindrome) are not in
  the NeetCode 150 but are in the project — they need a clear home
- No explicit link between safwaan/sessions/ and the problem files in topics/ yet —
  cross-referencing would help navigation
```

---

## How the Full Loop Works

```
Session happens
    ↓
Standard post-session updates (TRACKER, patterns, session file, topic notes, handoff)
    ↓
Reflection → raw observations written to meta/improvement-log.md
    ↓
Every 3 sessions: synthesize into proposals in meta/pending-improvements.md
    ↓
Claude Code flags pending proposals at start of next session
    ↓
Safwaan reviews: ✅ Approved / ❌ Rejected / 💬 Discuss
    ↓
Approved changes applied + logged in meta/changelog.md
    ↓
CLAUDE.md updated if needed → persists to all future sessions
    ↓
System is slightly better than it was 3 sessions ago
```

The compounding effect: each improvement makes the next session marginally better.
Over 150 problems, that compounds into a significantly more sophisticated system
than what you started with.