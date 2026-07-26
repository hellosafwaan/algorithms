# Session: Search in Rotated Sorted Array (LC 33) — 2026-07-26

## What He Attempted

Brought a first-draft solution learned from a video (Striver's notes, disclosed honestly and unprompted). The overall shape — sorted-half detection, then range check — was already there, but two real bugs were present.

## Where He Got Stuck

Two separate bugs, both found and fixed through his own tracing under narrow guiding questions:

1. **Operator precedence in the `mid` formula.** `left + Math.floor((right - left / 2))` computes `right - (left/2)`, not `(right-left)/2`, due to JS evaluating `/` before `-`. Traced on `nums=[4,5,6,7,0,1,2]`, `left=0, right=6` — self-identified the wrong midpoint and added the missing parentheses.
2. **`<` instead of `<=`** when comparing `nums[left]` to `nums[mid]` to determine which half is sorted. Breaks specifically when `left === mid` (two-element window) — `nums[left] < nums[mid]` compares a value to itself, always false, sending the search into the wrong branch. Surfaced via a real LeetCode wrong-answer case (`nums=[3,1], target=1`), then self-diagnosed via trace that `nums[left]` and `nums[mid]` were the same index.

## Mistakes Made

The two bugs above. Both self-corrected via guided tracing — no direct fix given for either.

## Key Insight

Splitting a rotated sorted array at any `mid` always leaves at least one half fully sorted. Binary search still applies — the extra step is identifying which half is sorted, then checking whether the target falls in that half's range before choosing a direction.

## Complexity Reached

Time: O(log n) — still a binary search, rotation doesn't change the halving. Space: O(1).

## Coach Notes for Next Session

- **Clear positive counterpoint to the recent LC 704/35/69/34 declined-explanation pattern.** Video-assisted origin, disclosed honestly as always — but this time both bugs were worked through entirely via his own tracing (no answers given directly), and the wrap-up own-words explanation was produced unprompted, first try, no redirect to "write it in the notes." Reinforces that video-assisted origin alone doesn't predict disengagement (see also LC 155); what matters is whether he's asked to trace the actual bug in front of him.
- Two new bug patterns logged (patterns.md #72 operator precedence, #73 `<` vs `<=` at `left===mid`) — worth a quick cold check on LC 153 (Find Minimum in Rotated Sorted Array), which shares the sorted-half detection idea and is a natural next problem in this thread.
- Revisit queue not raised, per the standing 2026-07-16 instruction.
