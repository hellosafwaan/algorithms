# Session: Remove Duplicates from Sorted Array II (LC 80) — 2026-06-06

## What He Attempted

First attempt: a group-based approach. Tracked `totalOccurrenceOfValue` for each run of equal elements, wrote the new value only when transitioning to a new group, and adjusted `p1` based on whether there were 2+ duplicates. Reset the counter on each transition.

Second attempt: read/write pointer. `p1 < 2` → always write. `p1 >= 2` → skip when `nums[p1-1] === valueAtP2 && nums[p1-2] === valueAtP2`. Return `p1`.

## Where He Got Stuck

The group-based approach had a fundamental flaw: it only writes a value when transitioning to the next group, so the last element of each group is always missed. For [1,1,1,2,2,3]: after processing the 2s, the second 2 was never written because the transition to 3 triggered a p1++ instead of first writing the second copy. Each patch made the logic more complex without fixing the root cause. After tracing, Safwaan accepted this and scrapped the approach.

The pivot: told to think per-element ("write or skip?") rather than per-group. That unlocked the read/write shape from LC 26.

## Mistakes Made

1. **Group thinking** — approached the problem by tracking occurrence counts and writing on group transitions. This is a fundamentally different (and wrong) shape for this problem class. Required significant time to diagnose and abandon.
2. **Tried to patch a broken approach** — added conditions on top of conditions instead of recognising the approach was misaligned. Eventually accepted it with coaching.
3. **Return value confusion** — initially said `p1 + 1`, then reasoned it through correctly and self-corrected to `p1`.

## Key Insight

Don't think in groups. Ask one question per element: should I write this or skip it? Skip when `nums[p1-1]` and `nums[p1-2]` are both equal to the current value — that means you've already written two copies. Otherwise write. For `p1 < 2`, always write blind (can't have exceeded 2 duplicates yet).

## Complexity Reached

Time: O(n) — single pass  
Space: O(1) — in-place

## Coach Notes for Next Session

- "Group thinking" is now a named pattern to watch for. If he reaches for occurrence counting on an in-place array problem, ask: "can you think about this one element at a time?"
- The `p1 < 2` bootstrap condition was his own observation — good instinct.
- Return value (`p1` vs `p1 + 1`) was reasoned correctly once prompted to trace. No bug.
- The LC 88 invariant was finally explained this session (after 3 deferrals). Probe on 2026-06-08.
- Next: Trapping Rain Water (LC 42) — Phase 2 final problem. Hard.
