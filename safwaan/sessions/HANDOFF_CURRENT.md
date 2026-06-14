# Handoff — Post Best Time to Buy and Sell Stock (LC 121)

## What Was Just Completed

**Best Time to Buy and Sell Stock (LC #121)** — 2026-06-13 — Phase 3 first problem, 80th percentile

Built both solutions:
1. Brute force O(n²)/O(n) — independently, with good structure and correct edge case handling after prompting
2. Optimal O(n)/O(1) — needed a full step-by-step trace before code structure clicked; then wrote it cleanly

**Phase 3 (Sliding Window) has started.**

## Safwaan's Current State

**Solid:**
- Brute force derivation — independent, clean, correctly handled edge cases after one question
- Complexity analysis — called O(n²) and O(n) correctly without prompting
- Running the trace correctly once the structure was shown — executed all 6 iterations without error
- Clamping profit to 0 (no-trade case) — understood once the decreasing-prices edge case was surfaced

**Gaps:**
1. **Abstract-to-code bridge is thin** — understood "track running min, compute profit" conceptually but couldn't start the loop. Needed a concrete trace before code unlocked. Watch for this on LC 3.
2. **`Math.max()` / `Math.min()` not reached for first** — uses if/else instead. Self-identified. Prompt: "is there a built-in for this?"
3. **LC 42 two-pointer redo is overdue** — target was 2026-06-13. Start next session with this cold redo before any new material.

## Suggested Next Steps

**Before new material: LC 42 two-pointer cold redo.** Key question: can he derive `leftMax <= rightMax` condition independently?

**New problem: Longest Substring Without Repeating Characters (LC #3)** — Phase 3 second problem, true sliding window. This is where the explicit window pattern shows up.

Safwaan mentioned an interview coming up soon and wants to focus on harder/pattern-heavy problems. Before starting LC 3, ask how soon the interview is and adjust pacing if needed.

## Coach Notes

- The trace walkthrough was the key unlock here. The conceptual understanding was there; the code structure wasn't. This is a different kind of stuck than not understanding the problem — he needed to see the variables evolve to know where to put the code.
- He spiraled when asked to explain the solution in one sentence — went into a 5-minute walk-through that lost the thread. This is the opposite of what's needed for interviews. Practice the one-liner. "Scan left to right, track running minimum, compute profit at each step, keep the best."
- Interview coming up — unknown timeline. Prioritize higher-value patterns over completeness if timeline is tight.
- Note: 4 days elapsed between the session start (where he got the brute force) and returning to finish. That gap explains why the optimal felt harder — he'd lost momentum.
