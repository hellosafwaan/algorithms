Session: [034_2026-06-24_minimum-size-subarray-sum](../../safwaan/sessions/034_2026-06-24_minimum-size-subarray-sum.md)

## How It Felt

Struggled. Knew sliding window was right immediately, but getting the structure correct took 5+ iterations. The core issue — that `nums[end]` has to enter the window unconditionally — didn't click until the scaffold was given explicitly. Once it did, the code came out clean on the first try.

## Key Insight

Every element must enter the window before you decide what to do with it. The add is **never** conditional — you always expand right first, then check if it's time to shrink. If you make the add conditional on the current sum, you start skipping elements, and the window stops representing a contiguous subarray.

## Solution Walkthrough

So the problem is: find the shortest contiguous subarray whose sum is `>= target`. 

The brute force is O(n²) — for every start index, walk right until you hit the target. We can do better.

The insight is that this is a variable sliding window. The window expands to the right one element at a time, and shrinks from the left whenever the sum is valid. Why does this work? Because all elements are positive — adding an element always increases the sum, removing one always decreases it. That monotonicity is what makes the two-pointer movement deterministic.

The structure is simple:

```
for each right index:
    add nums[right] to the window (always)
    while the window sum >= target:
        record this window length (it's valid — try to minimize it)
        remove nums[left] from the window
        advance left
```

Two things to get right:

**1. The add is unconditional.** Every iteration of the outer loop, `nums[end]` enters the window. No if/else — you never skip an element. If you make the add conditional ("only add if sum < target"), you'll end up skipping elements and the window stops being contiguous.

**2. Record inside the while loop, before shrinking.** When `currentSum >= target`, that window is valid — record its length. Then shrink and check again. If you record after the while loop exits, the window is already invalid (sum < target) and the length you record is wrong.

The final edge case: if no subarray ever hits the target, `subArrayLen` stays at `Infinity`. Return `0` in that case.

## Pattern Introduced

**Sliding Window — Variable Size (minimize)**

Same expand/shrink structure as LC 3, but flipped: instead of tracking the longest window that stays valid, you track the shortest window that becomes valid.

- LC 3: shrink when invalid → maximize
- LC 209: shrink while valid → minimize

## Watch Out For

- **The add must be unconditional.** Don't wrap it in `if (currentSum < target)`. Every element enters the window every iteration.
- **Record inside the while, not after.** After the while exits, sum < target — invalid window.
- **`>= target`, not `=== target`.** A sum of 8 with target 7 is a valid answer.
- **Return 0, not Infinity** when no subarray qualifies.

## Template

```javascript
function minSubArrayLen(target, nums) {
    let start = 0;
    let currentSum = 0;
    let minLen = Infinity;

    for (let end = 0; end < nums.length; end++) {
        currentSum += nums[end];                        // always expand
        while (currentSum >= target) {                  // shrink while valid
            minLen = Math.min(minLen, end - start + 1); // record
            currentSum -= nums[start];                  // shrink
            start++;
        }
    }

    return minLen === Infinity ? 0 : minLen;
}
```

## Trace Through

`target = 7, nums = [2,3,1,2,4,3]`

| end | nums[end] | currentSum | start | while fires? | minLen |
|-----|-----------|------------|-------|--------------|--------|
| 0   | 2         | 2          | 0     | no           | ∞      |
| 1   | 3         | 5          | 0     | no           | ∞      |
| 2   | 1         | 6          | 0     | no           | ∞      |
| 3   | 2         | 8          | 0     | yes → record 4, sum=6, start=1 | 4 |
| 4   | 4         | 10         | 1     | yes → record 4, sum=7, start=2; yes → record 3, sum=6, start=3 | 3 |
| 5   | 3         | 9          | 3     | yes → record 3, sum=7, start=4; yes → record 2, sum=3, start=5 | 2 |

Return 2. ✓

## Complexity

**Time: O(n).** Each element is added to `currentSum` exactly once (when `end` reaches it) and removed at most once (when `start` passes it). The while loop's total iterations across the entire run is bounded by `n`. Two passes through `n` elements = O(n).

**Space: O(1).** Three variables — no extra data structures.

The problem mentions O(n log n) as a target, which is the binary search approach (prefix sum array + binary search for each start index). The sliding window beats it.

## Cold Redo — 2026-08-04

Attempted cold, past the revisit-queue date (was due 2026-07-15). Did not come back clean — two real bugs surfaced, the second of which needed the direct answer given after getting stuck.

**First attempt brought:**

```js
function minSubArrayLen(target, nums) {
    let minWindowLength = Infinity;
    let currentWindowSum = 0;
    let start = 0;
    for(let end = 0; end < nums.length; end++) {
        currentWindowSum += nums[end];
        while(currentWindowSum > target) {
            currentWindowSum -= nums[start];   // bug 1: start never incremented
        }
        if(currentWindowSum === target) {      // bug 2: exact match only, checked after the shrink
            minWindowLength = Math.min(minWindowLength, end - start + 1);
        }
    }
    return minWindowLength === Infinity ? 0 : minWindowLength;
};
```

**Bug 1 — `start` never advanced inside the `while` loop.** Every shrink subtracted `nums[start]` without moving `start` forward, so the "window" being tracked and the actual sum being computed drifted out of sync — same element removed repeatedly instead of the window sliding. Self-caught in one question ("does `start` ever change inside that loop?").

**Bug 2 — validity checked after the shrink instead of during it.** This is the exact mistake this file's own "Watch Out For" section already warns about ("Record inside the while, not after") — forgotten on the cold redo despite being documented. Concretely: the `while(currentWindowSum > target)` loop can only ever exit with `currentWindowSum <= target`, so checking `=== target` (or even `>= target`, tried as an intermediate fix) right after the loop can only ever match the exact-equality case — it can never catch a window that was valid (`sum >= target`) partway through the shrink but then got shrunk past that point before anything checked it. Concrete failing case: `target=11, nums=[1,2,3,4,5]` — the valid window `[3,4,5]` (sum 12) exists mid-shrink but was never recorded, since the shrink kept going (`12 > 11` is still true) until sum dropped to 9, and `9 === 11` (or `9 >= 11`) is false. Correct answer is `3`; the buggy version returned `0`.

Got stuck on *why* moving the `>=` check outside the loop didn't fix bug 2 — needed the direct fix given (move the recording line to the top of the `while` body, and flip the condition to `while (currentWindowSum >= target)`), then verified it against the failing case and a broad random stress test before it clicked.

**Own-words explanation, given after the fix landed:** "We start with both pointers at the zeroth index... we accumulate the current window sum... for every window size we increase, we check whether the current window sum is meeting the condition (greater than or equal to target)... once a window meets the condition, we find its length and compute the minimum, then shrink the window from the left, incrementing `start`... the shrinking needs to happen continuously — as long as the condition is still met, keep shrinking and computing the minimum length. The previous solution wasn't shrinking iteratively like that, which is where the mistake was."

**Status:** Not a clean cold pass — two bugs, one needing the direct answer. Given a fresh revisit date rather than moved to "Done" (see `safwaan/revisit-queue.md`).

## Submissions

- [Accepted — 3ms, beats 67.65%](https://leetcode.com/problems/minimum-size-subarray-sum/submissions/2044208823) — 2026-06-24 (original solve)
- [Accepted](https://leetcode.com/problems/minimum-size-subarray-sum/submissions/2093654869) — 2026-08-04 (cold redo, after fixing both bugs above)

## Open Questions

- Can you apply this template cold to LC 424 (Longest Repeating Character Replacement)? The shrink condition is different but the expand-always structure is the same.
- Does "record inside the while loop, before shrinking" stick on a third attempt, given it was explicitly documented in this very file's "Watch Out For" section and still didn't surface on the 2026-08-04 cold redo? Worth a genuinely cold retry rather than another guided walkthrough next time.
