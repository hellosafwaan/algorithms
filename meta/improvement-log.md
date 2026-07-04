# Improvement Log

Raw observations from sessions. Written when Safwaan gives feedback mid-session or when something clearly didn't work. Newest first.

If an observation has been actioned, it's marked ✅ with a note on what changed.

---

### 2026-06-05 — Pattern recall probe disrupts cold problem-solving
**Observed:** The session-start protocol prompts Safwaan to recall a prior pattern before he's seen the problem. This signals the approach before he's had a chance to identify it himself — the exact thing the protocol was meant to build.
**Safwaan's words:** "Identifying the pattern myself is an important part of the task. That process is getting disrupted."
**Action:** ✅ Updated CLAUDE.md — let him attempt cold first. Probe recall only if he doesn't connect to a prior pattern after his first attempt.

### 2026-06-06 — Session timing not tracked
**Observed:** No mechanism to track when a session started, paused, or ended. This makes it impossible to log accurate time-on-problem in the daily log (currently estimated or left blank).
**Safwaan's request:** Add session timing tracking — start time, pause, resume, end — so the coach has accurate data.
**Status:** 🔲 Not actioned — needs a design decision on where/how to track (browser timestamp? manual command? hook?)

### 2026-06-06 — Pattern name revealed when adding problem to curriculum
**Observed:** When adding LC 26 to TRACKER.md and CURRICULUM.md, the pattern column was written as "Two Pointers (read/write)" — directly telling Safwaan the intended approach before he attempted the problem.
**Safwaan's words:** "You are giving away the hint that it's a read-write pointer problem. You should not do that."
**Action:** ✅ Corrected in this session — changed pattern column to "Two Pointers" (generic). Going forward: when adding a new problem to the curriculum mid-session, write the pattern column generically until the session is complete.

### 2026-06-16 — Concrete trace tables resolve operator confusion fast
**Observed:** During Reverse Bits (LC 190), Safwaan got stuck on the OR-then-shift vs shift-then-OR ordering bug. A plain verbal explanation didn't land; switching to a concrete bit-by-bit trace table (iteration, lastBit, result after each op, n after) for both the wrong and correct order made it click immediately. He also struggled with abstract "what does left shift do" until given a worked example with actual binary digits (`0101 << 1 → 1010`) tied to a real-world analogy (multiply by 10 in decimal).
**Safwaan's words:** "This is what you should, reason like this, remember to do this more often."
**Action:** ✅ Updated CLAUDE.md Expertise Calibration — when he's stuck on a bit/index-precision detail, default to a concrete trace table (iteration-by-iteration values) rather than verbal explanation alone.

### 2026-07-05 — Visualiser step engine must be debugger-faithful
**Observed:** First version of the LC 200 visualiser snapshotted only "interesting" lines (guards that fired, marks, returns) and silently jumped back up the recursion when calls returned. Safwaan flagged it as confusing — "it should go line by line... it's going back up sometimes so it's confusing." He reads the step sequence literally, like a debugger; skipped lines and unexplained jumps read as wrongness.
**Safwaan's words:** "The explanation and the code-execution is not that correct — it should go line by line... it's going back up sometimes so it's confusing."
**Action:** ✅ Rebuilt the step engine debugger-style: every executed guard gets a step (pass or fail), every recursive call gets an explicit CALL step at the call line, every return gets a BACK step in the caller stating what returned and what runs next. Added a Play button for the longer runs this produces. CLAUDE.md Visualiser System updated.

<!-- New entries added here -->
