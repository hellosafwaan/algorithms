Session: [079_2026-08-05_minimum-operations-to-reduce-x-to-zero](../../safwaan/sessions/079_2026-08-05_minimum-operations-to-reduce-x-to-zero.md)

## How It Felt

The wording of the problem was different from anything solved before, and that took time to get past — "without your help, I would not have been able to solve that" (referring specifically to the reframing, not the implementation, which was self-driven once the reframing was in place).

## Key Insight

Operations only ever remove elements from the two ends, never the middle. So whatever's left after any sequence of operations is always one contiguous chunk. That single fact converts a "remove from both ends" problem into a completely standard sliding-window problem: minimizing removed operations is the same as maximizing the length of the kept middle chunk, and that chunk's sum is forced to be `totalSum - x` (since `removedSum + remainingSum = totalSum`, and `removedSum` must equal `x`).

## Solution Walkthrough

The problem sounds like it's about removing things from two ends — that doesn't look like sliding window at all on first read. The move that unlocks it: think about what's *left*, not what's *removed*.

Since every operation removes either the current leftmost or rightmost element, after any sequence of operations, the elements still in the array form one unbroken chunk in the middle. There's no way to end up with gaps — you can only eat away at the two ends.

That means: `totalSum = removedSum + remainingSum`. The goal is `removedSum = x`, which forces `remainingSum = totalSum - x`. And since minimizing the number of removed elements is the actual goal, that's the same as maximizing the length of the remaining middle chunk.

So the real problem is: **find the longest contiguous subarray of `nums` whose sum equals exactly `totalSum - x`.** Once you have that longest length, `L`, the answer is `nums.length - L` (everything not in that middle chunk had to be removed). If no such subarray exists, return `-1`.

From there it's the exact same variable-window shape used all week:

```
target = totalSum - x
for each end:
    add nums[end] to windowSum unconditionally
    while windowSum > target:
        remove nums[start], start++
    if windowSum === target:
        record end - start + 1, keep the max
```

Because all `nums[i] >= 1` (per the constraints), `windowSum` only ever increases as the window expands and only ever decreases as it shrinks — that monotonicity is what makes the shrink-while-over-target loop valid, same as every other variable-window problem this week.

Two edge cases fall out naturally without special-casing: if `x > totalSum`, then `target` is negative, and since all elements are positive, no window can ever sum to a negative target, so `longestSubArrayLen` stays `-1` and the function correctly returns `-1`. If `target === 0`, the "longest subarray summing to 0" is the empty subarray (length 0, valid at the very start before any element is added) — meaning every element had to be removed, and `nums.length - 0` is correctly the whole array.

## Pattern Introduced

**Sliding Window — Variable Size, complement reframing**

The window pattern itself isn't new — it's the standard expand/shrink-while-over/check-equal shape from `fundamentals/7-longest-subarry-sum` and the LC 209 redo. What's new is recognizing when a problem *disguised* as something else (remove-from-ends, minimize deletions, stay within a budget) is actually asking for the complement: the best contiguous chunk to keep. The tell: operations that only ever touch the two ends of a sequence always leave one contiguous remainder.

## Watch Out For

- **The reframing is the hard part, not the window mechanics.** If a problem talks about removing/discarding elements from the ends of an array or string, check whether "what's left" forms a contiguous chunk — if so, the problem is really about that chunk, not the removal process.
- **Don't leave a placeholder `return` from an earlier incomplete draft.** A leftover `return -1` that never references the computed result is easy to miss once the surrounding logic looks finished.
- Same monotonicity requirement as every other variable-window problem here: only holds because all elements are positive (per constraints) — negative numbers would break the shrink-while-over-target loop's validity, same as the LC 560 discussion earlier this week.

## Template

```javascript
function minOperations(nums, x) {
    let totalSum = 0;
    for (let i = 0; i < nums.length; i++) {
        totalSum += nums[i];
    }

    const target = totalSum - x;
    let longestSubArrayLen = -1;
    let start = 0;
    let windowSum = 0;

    for (let end = 0; end < nums.length; end++) {
        windowSum += nums[end];

        while (windowSum > target) {
            windowSum -= nums[start];
            start++;
        }

        if (windowSum === target) {
            longestSubArrayLen = Math.max(longestSubArrayLen, end - start + 1);
        }
    }

    return longestSubArrayLen === -1 ? -1 : nums.length - longestSubArrayLen;
}
```

## Trace Through

`nums = [1,1,4,2,3], x = 5`. `totalSum = 11`, `target = 6`.

| end | nums[end] | windowSum | shrink? | === target? | longestSubArrayLen |
|-----|-----------|-----------|---------|-------------|---------------------|
| 0 | 1 | 1 | no | no | -1 |
| 1 | 1 | 2 | no | no | -1 |
| 2 | 4 | 6 | no | yes → len 3 | 3 |
| 3 | 2 | 8 | yes: -1→7, -1→6, start=2 | yes → len 2 | 3 |
| 4 | 3 | 9 | yes: -4→5, start=3 | no (5 ≠ 6) | 3 |

`longestSubArrayLen = 3`, so answer = `5 - 3 = 2`. ✓ (matches LC 1658's example — remove the last two elements, `[2,3]`)

## Complexity

**Time: O(n).** Two linear passes — one to compute `totalSum`, one for the sliding window (bounded by `n` since `start` and `end` each only move forward).

**Space: O(1).** Just a handful of running variables.

## Alternative Approaches

**Prefix sum + HashMap.** Build running prefix sums and, for each `end`, check whether `prefix[end] - target` has appeared before as an earlier prefix sum (storing the earliest index it appeared at, to maximize the kept length). This is the same prefix-sum-as-hashmap-key idea as LC 560, and unlike the sliding window here, it would still work if `nums` could contain negative numbers (this problem's constraints guarantee positive values, so the window approach is simpler and sufficient, but the HashMap version generalizes further). Not implemented this session.

## Submissions

- [Accepted](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/submissions/2094502553) — 2026-08-05

## Open Questions

- Does the "check whether removing from the ends leaves a contiguous remainder" reframing trick get applied on the next problem that's disguised the same way, without needing the four-question walkthrough again?
- Would he reach for the prefix-sum + HashMap alternative unprompted if this problem's constraints allowed negative numbers, given the LC 560 discussion earlier this week?
