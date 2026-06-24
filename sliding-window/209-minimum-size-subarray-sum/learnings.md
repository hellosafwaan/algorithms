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

## Submissions

- [Accepted — 3ms, beats 67.65%](https://leetcode.com/problems/minimum-size-subarray-sum/submissions/2044208823) — 2026-06-24

## Open Questions

- Can you apply this template cold to LC 424 (Longest Repeating Character Replacement)? The shrink condition is different but the expand-always structure is the same.
