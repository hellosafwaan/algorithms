# Session: Single Number — 2026-06-16

## What He Attempted
```javascript
function singleNumber(nums) {
    const n = nums.length;
    let result = 0;
    for (let i = 0; i < n; i++) {
        result = result ^ nums[i]
    }
    return result
};
```
Correct on first attempt, no scaffolding needed.

## Where He Got Stuck
Nowhere. Had already built a bit manipulation cheat sheet (`bit-manipulation/bit_manipulation_cheat_sheet.md`) covering XOR properties and this exact problem before the session. Asked to explain the "why" before coding rather than copy the cheat sheet's solution — he did, then wrote the function independently.

## Mistakes Made
None.

## Key Insight
"Because of the XOR properties — a ^ a = 0 and 0 ^ b is b — and XOR is commutative, meaning the order of operations doesn't matter." Stated cold, unprompted detail on commutativity explaining why pairing order in the array doesn't matter.

## Complexity Reached
Time: O(n) — single pass. Space: O(1) — no auxiliary storage, just the accumulator.

## Coach Notes for Next Session
- Clean transfer from a self-built cheat sheet to cold execution — first zero-mistake, zero-hint session this sprint.
- Confirms pre-loading foundational concepts (here: bit operators) pays off immediately on application problems.
- This was a curriculum pull-forward (Phase 18, not yet reached in sequence) — intentional, justified by interview proximity and XOR's high interview frequency.
