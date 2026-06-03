# Session: Pascal's Triangle II (LeetCode 119) — 2026-06-03

## What He Attempted

Naive solution first — built the full triangle, returned the last row. Correct immediately, recognised it was a direct modification of 118.

For the optimised solution, arrived at the right-to-left idea independently after one nudge about the overwrite problem. Needed the three steps spelled out explicitly (push 1, iterate right-to-left from `row.length - 2` down to 1, update in-place).

## Where He Got Stuck

1. Knew left-to-right caused overwrites but couldn't see how to solve it.
2. Started inner loop at `row.length - 1` instead of `row.length - 2` — caught via tracing.

## Mistakes Made

- Inner loop started at `row.length - 1`, updating the newly pushed `1` — wrong.
- **How caught:** Asked to trace `rowIndex = 3`. He found it himself at i=1, saw `[1, 2]` instead of `[1, 1]`.

## Key Insight

Right-to-left iteration avoids the overwrite problem. The newly pushed `1` at the end should never be touched — start at `row.length - 2`.

## Complexity Reached

- Naive: Time O(n²), Space O(n²)
- Optimised: Time O(n²), Space O(n)

## Coach Notes for Next Session

- Right-to-left in-place update is a new pattern — flag it when it appears again (knapsack, edit distance)
- Tracing is slow but he uses it effectively — don't rush him past it
- Complexity analysis: he named both complexities without being asked this session — improving
- Session was split across two days (2 AM on a train), still shipped it
