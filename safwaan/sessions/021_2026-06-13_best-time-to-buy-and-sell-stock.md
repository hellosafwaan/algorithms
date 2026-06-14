# Session: Best Time to Buy and Sell Stock (LC #121) — 2026-06-13

## What He Attempted

Brute force first: iterated over every buy day `i`, then scanned the subarray `i+1..n-1` to find the max selling price, stored per-day max profits in an array, then scanned that array for the overall max. O(n²) time, O(n) space. Structurally correct.

Optimal: couldn't code it independently after understanding the concept ("track running min, compute profit at each step"). Needed a full step-by-step trace of `[7,1,5,3,6,4]` before the code structure clicked. Once he saw the trace, wrote it cleanly in one go.

## Where He Got Stuck

Conceptually understood "track cheapest price seen so far, compute profit at each day" but couldn't translate that into a loop. The abstraction wasn't enough — the concrete trace of what `minPrice` and `maxProfit` look like after each iteration was what unlocked it.

## Mistakes Made

1. **Last-day edge case on brute force** — `maxSellingPrice = -1` but inner loop doesn't run for `i = n-1`, so `maxSellingPrice - buyingPrice` would be `-1 - prices[n-1]` (large negative). Fixed with an `i !== n-1` guard; then also added `Math.max(0, ...)` for the decreasing-prices case.
2. **Corrupting `maxSellingPrice` to fix the decreasing case** — tried `else if (currentSellingPrice < maxSellingPrice) maxSellingPrice = 0` inside the inner loop. This destroyed the tracked max every time a lower price appeared. The right fix was clamping the *profit*, not the selling price.
3. **`Math.max()` not reached for first** — used `if/else` blocks instead of `Math.max(0, ...)`. Self-identified this as a recurring habit mid-session and asked to have it logged.

## Key Insight

Scan left to right. Track the cheapest price seen so far. At each day, profit if you sell today = `currentPrice - minPrice`. Keep the best. You never need to look forward — you're always selling *today* against the best *past* price.

## Complexity Reached

Time: O(n) — Space: O(1)

## Coach Notes for Next Session

- LC 42 two-pointer redo is overdue (target was 2026-06-13 — missed it). Open the next session with this cold redo before anything new.
- Safwaan mentioned an interview coming up soon and wants to prioritize harder/pattern-heavy problems. Discuss what "soon" means and adjust pacing if needed.
- The trace walkthrough was essential here — he couldn't bridge abstract understanding to code without it. Watch for this on the next sliding window problem: does he try to code from abstract first, or does he trace from the start?
- `Math.max()` / `Math.min()` habit: he self-identified it. Prompt "is there a built-in for this?" next time he writes a comparison-then-assign block.
