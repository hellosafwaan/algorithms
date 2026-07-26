# Session: Search in Rotated Sorted Array II (LC 81) — 2026-07-26

## What He Attempted

Same-session follow-up to LC 33. Watched Striver's video for the reasoning behind the duplicates case, then implemented it as a small addition on top of the already-working LC 33 solution — one new guard clause for when `nums[left] === nums[mid] === nums[right]`.

## Where He Got Stuck

Nowhere — self-described as "a smaller edit," clean and correct on arrival.

## Mistakes Made

None in the code. At wrap-up, one minor complexity-labeling slip: described the degraded worst case as "n/2" rather than "O(n)" — the underlying reasoning (shrinking one from each end instead of halving) was correct, just the Big-O label was imprecise. Corrected in the moment.

## Key Insight

Duplicates break the one signal LC 33's algorithm depends on — comparing `nums[left]` to `nums[mid]` to find the sorted half. When all three (`left`, `mid`, `right`) are equal, that comparison is uninformative, since the rotation point could be hiding on either side. The fix: shrink both ends by one and try again, rather than trying to reason about direction. This trades the O(log n) guarantee for O(n) worst case.

## Complexity Reached

Time: O(n) worst case (all-duplicate arrays), O(log n) best/average. Space: O(1).

## Coach Notes for Next Session

- Continues the positive-engagement pattern from LC 33 in the very same session — unprompted own-words explanation, correct core reasoning about *why* the degenerate case is ambiguous and why shrinking both ends is the safe fix.
- Only correction needed was Big-O labeling precision ("n/2" vs "O(n)") — worth a light general reminder that dropping constants is part of stating Big-O correctly, but not a deep gap; the reasoning itself was sound.
- Revisit queue not raised, per the standing 2026-07-16 instruction.
