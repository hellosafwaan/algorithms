# Changelog

Every improvement that was applied to the system — what changed, why, and when.

---

## Format
### [YYYY-MM-DD] — [What Changed]
**Triggered by:** [Safwaan feedback / coach observation]
**What changed:** [exactly what was modified]
**Impact:** [what this should improve]

---

### 2026-06-05 — Pattern recall probe moved to after first attempt
**Triggered by:** Safwaan feedback — probing recall before the attempt signals the pattern and removes the discovery step
**What changed:** CLAUDE.md updated — check pattern-index.md at session start but don't probe recall until after his first attempt, or if he doesn't independently connect the dots
**Impact:** Cold problem-solving is preserved; recall is still tested but without giving away the approach

### 2026-06-05 — Added Solution Walkthrough to all learnings.md files
**Triggered by:** Safwaan feedback — notes were too dry, wanted conversational explanations
**What changed:** Added Solution Walkthrough section to all existing learnings.md files. Added to CLAUDE.md wrap-up protocol as mandatory for all future problems.
**Impact:** Notes now explain the *why* in plain language, not just the *what*

### 2026-06-05 — Restructured repo around NeetCode 150 curriculum
**Triggered by:** Safwaan decision to follow NeetCode roadmap strictly
**What changed:** Created CURRICULUM.md, TRACKER.md, moved notes to topic folders, rewrote CLAUDE.md, added phase deadlines
**Impact:** Single source of truth for progress, full 150-problem roadmap visible

### 2026-06-05 — Added accountability system
**Triggered by:** Safwaan request for external accountability (laid off, needs interview-ready fast)
**What changed:** Daily morning agent (9am IST), EOD report agent (10pm IST), daily-log.md at wrap-up, phase deadlines in TRACKER.md
**Impact:** Daily push notifications on pace, automatic tracking of progress

### 2026-07-05 — Visualiser step engines are now debugger-style line-by-line
**Triggered by:** Safwaan feedback on the LC 200 visualiser — steps skipped lines and jumped back up the recursion without explanation
**What changed:** LC 200 visualiser rebuilt (explicit CALL/BACK steps for every recursive call and return, every guard check shown pass or fail, Play button for auto-stepping). CLAUDE.md Visualiser System section updated to make this the standard for all future visualisers.
**Impact:** Step sequences can be read literally like a debugger — no inferred control flow, which is where the confusion came from
