# Session: Squares of a Sorted Array (LC 977) — 2026-06-04

## What He Attempted

Naive first: square every element, push to new array, sort with `.sort((a, b) => a - b)`. Correct approach, clean implementation. Missed the `.sort()` initially (low sleep day) but caught it immediately when asked what the output was supposed to be.

Optimized: two pointers from both ends, filling output array backwards. Needed a nudge to identify that the largest squares are always at the ends. Once there, derived the full algorithm independently.

## Where He Got Stuck

1. Didn't immediately see that largest squares are always at the ends — needed the question "which elements have the largest squares?" with a concrete example.
2. Tried to add two elements per iteration (one from each end) — caught it himself when given `[-6, -5, -1, 2, 4]` and traced through what the output would look like.
3. Loop condition `left < right` — missed the odd-length array edge case. Needed an example to see it. Changed to `left <= right` independently once the case was explained.

## Mistakes Made

- Forgot to sort in the naive solution (low sleep — not a pattern)
- Tried to place two elements per iteration — caught himself via tracing
- `left < right` instead of `left <= right` — needed example, fixed immediately
- `let left = 0; right = nums.length - 1` — `right` declared without `let`/`const` (implicit global) — not caught this session, worth flagging

## Key Insight

The largest squares are always at one of the two ends of a sorted array — never in the middle. Negatives squared can be larger than positives, so you can't just square in place. Compare both ends, place the largest at the back of the output, move that pointer in. One element per iteration — the second largest might still come from the same end.

## Complexity Reached

Naive — Time: O(n log n) — Space: O(n)
Optimized — Time: O(n) — Space: O(n)

## Coach Notes for Next Session

- Probe: can he identify the two-pointer pattern cold on a new problem?
- `const` vs `let` on pointer variables — still recurring quietly
- Implicit global variable (`right` without declaration keyword) — didn't catch it this session
- His complexity reasoning is improving — reasoned through O(n) by thinking about pointer movement, not loop syntax. That's the right mental model.
