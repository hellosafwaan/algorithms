# Handoff — Post Remove Duplicates from Sorted Array (LC 26)

## What Was Just Completed

**Remove Duplicates from Sorted Array (LC 26)** — 2026-06-06

Quick session. Safwaan initially reached for a swap/move-to-end approach (pattern-matching from LC 27's swap variant) before recognising it doesn't apply here — no fixed end to target. Pivoted to read/write after guided questions isolated each pointer's job. Derived the write condition himself: p1 writes when nums[p2] !== nums[p1]. One const reassignment bug flagged by question, not self-caught. Submitted 100th percentile.

## Safwaan's Current State

**Solid:**
- Read/write pointer pattern — now applied on two consecutive problems (LC 27, LC 26)
- Complexity — called O(n) time O(1) space unprompted with correct reasoning
- Self-correcting approach mid-session when he hit a dead end

**Gaps still open:**
1. **Closes subproblem at first success** — not triggered this session
2. **Index-detail precision** — not triggered this session
3. **Toolkit/library recall** — not triggered this session
4. **currentIndex >= nums1Pointer invariant from LC 88** — deferred three times now (2026-06-05, 2026-06-06 ×2); probe before Trapping Rain Water
5. **Swap vs read/write decision rule** — when do you reach for each in an interview? Still open.
6. **const reassignment habit** — flagged when asked, not self-caught before running
7. **Debugging heuristic (smallest input)** — taught 2026-06-06, not yet applied cold

## Suggested Next Problem

**Trapping Rain Water (LC 42)** — Phase 2 final problem. Hard. Two converging pointers with nuanced movement reasoning.

Before starting: probe the `currentIndex >= nums1Pointer` invariant from LC 88. Third attempt — don't let it defer again.

## Coach Notes

- The swap instinct from LC 27 carried over immediately. That's good pattern memory, but watch that he learns to quickly evaluate whether the approach fits before committing to it.
- const reassignment is a quiet recurring habit (seen in LC 167, LC 977, and now LC 26). Not causing test failures because LeetCode environments sometimes tolerate it, or he catches it before running. Worth a short note next time it comes up.
- LC 26 and LC 27 are now both fresh. The read/write shape should be solid. Next interesting test is whether he reaches for it cold in Sliding Window.
