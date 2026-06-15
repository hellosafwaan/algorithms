# Session: Longest Consecutive Sequence (LC 128) — 2026-06-15

## What He Attempted

First attempted to build a Set for O(1) lookup — good instinct. Initially thought the problem was about subarrays (corrected: elements can be scattered). Understood that sorting would make it easy, and that the Set replaces sorting for lookup purposes.

Declared variables with `const` instead of `let` for mutable accumulators. Used `for...in` on the Set (wrong — gives nothing useful). Set those aside and focused on the algorithm.

For the sequence-start check, initially tried to walk backwards via a while loop (`seen.has(startingSequenceElement - 1)`) to find the start — valid logic, but overcomplicated. Needed one prompt to flip to the cleaner one-shot check: `!seen.has(elem - 1)`.

The while loop to count the sequence was mostly correct. Bugs:
1. Used `const` on `startingSequenceElement` then tried to reassign it inside the loop.
2. Tried `elem.get(startingSequenceElement + 1)` — confused `elem` (a number) with a Map; then tried `seen.get(startingSequenceElement + 1)` — confused Set with Map. Eventually reached `startingSequenceElement + 1` directly.
3. Forgot to reset `runningSequenceCount` between sequences.
4. Forgot to return `maxSequenceCount`.

Clean version produced after submission — replaced the explicit for loop with `new Set(nums)`, moved `count` and `curr` inside the `if` block to eliminate the manual reset.

## Where He Got Stuck

1. `n-1 not in Set` insight — tried walking backwards with a while loop instead of a one-shot check. Needed the trace: "when you land on 4, is 3 in the Set? Yes → skip it. When you land on 1, is 0 in the Set? No → this is a start."
2. Advancing `curr` inside the while loop — wrote `elem.get(...)` then `seen.get(...)` before landing on the direct assignment.

## Mistakes Made

- `const` on `maxSequenceCount` and `runningSequenceCount` (mutable — need `let`)
- `for...in` on a Set (gives nothing useful — should be `for...of`)
- `elem.get(...)` — `elem` is a number, not a Map or Set
- `seen.get(...)` — `seen` is a Set, not a Map; Sets have no `.get()`
- Forgot to advance `curr` (would have caused an infinite loop)
- Forgot to reset `runningSequenceCount` between sequences
- No `return maxSequenceCount` initially
- Declared `startingSequenceElement` outside the `if` block with `let` — not needed once scoped inside

## Key Insight

A number is a sequence start if and only if its left neighbour (`n - 1`) is NOT in the Set. Only start counting from those numbers. This means even though there are two nested loops, each element is visited at most twice total — the inner while only runs at sequence starts, so the total work across all sequences is O(n).

## Complexity Reached

Time: O(n) — each element is processed at most twice across all iterations  
Space: O(n) — the Set stores every element

## Coach Notes for Next Session

- **`for...in` vs `for...of`** — explicitly flagged as a gap. Needs deliberate drilling. Rule: `for...of` for values (arrays, Sets, Maps, strings), `for...in` for keys (plain objects). Worth a 5-minute targeted review.
- **Set API confusion** — tried `.get()` on both `elem` (a number) and `seen` (a Set). Set has `.has()`, `.add()`, `.delete()` — no `.get()`. Map has `.get()`, `.set()`, `.has()`. This is the same toolkit gap from 3Sum.
- **O(n) amortized reasoning** — explained and he got it immediately. This will recur in other "nested loops that aren't really nested" problems (e.g., monotonic stack).
- Interview is Friday 2026-06-19 — one day for consolidation/review.
- Wednesday: LC 3 cold redo still planned.
