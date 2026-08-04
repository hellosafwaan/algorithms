Session: [072_2026-08-04_maximum-average-subarray-i](../../safwaan/sessions/072_2026-08-04_maximum-average-subarray-i.md)

## How It Felt

Pretty smooth — connected it to the `maxSubarraySumSizeK` fundamentals problem right away.

## Key Insight

Finding the max average of a fixed-size window is just finding the max **sum** of a fixed-size window, with one division tacked on at the very end. You don't need to compute the average on every single slide — only the sum changes as the window moves, so divide by `k` exactly once, after the max sum has already been found.

## Solution Walkthrough

So the problem is: out of every contiguous subarray of length `k`, find the one with the highest average.

The naive way is the obvious one — nested loops. For every possible starting index `i`, walk `k` elements forward summing them up, divide by `k` to get that window's average, and keep whichever's biggest. That works, but every window shares `k - 1` elements with the window right before it, and this approach throws all of that away and recomputes from scratch every time.

The optimization is to notice that overlap and stop recomputing it:

1. Sum up the first `k` elements once — that's your starting window.
2. Slide the window one step at a time: subtract off the element that just fell out on the left, add in the element that just entered on the right. That's a running sum update, O(1) per step instead of O(k).
3. Keep a running max of that sum as you slide.
4. Only at the very end — after the whole array's been scanned — divide the max sum by `k` to get the max average.

That last point is the actual refinement over a first pass at the optimized version: it's tempting to compute `currentSum / k` on every single iteration just to compare averages, but since `k` is constant for the whole problem, the window with the biggest *sum* is guaranteed to also have the biggest *average*. So there's no reason to divide more than once.

## Pattern Introduced

**Sliding Window — Fixed Size (numeric slide)**

Exactly the same shape as `sliding-window/fundamentals/1-maximum-subarray-size-k` (`maxSubarraySumSizeK`) — seed the first window with one pass, then slide by subtract-and-add. The only thing LC 643 adds on top is a single division at the end to convert "max sum" into "max average."

## Watch Out For

- **Don't divide every iteration.** It's not wrong, just wasteful — `k` never changes, so the max-sum window and the max-average window are always the same window. Divide once, at the end.
- **The naive approach is O(N·k), not O(N²).** The outer loop runs `N - k + 1` times, the inner loop runs `k` times — multiply the *actual* bounds instead of reflexively calling any nested loop O(N²). It only becomes O(N²) in the special case where `k` scales with `N`.
- **Slide loop bound is `nums.length - k`, not `nums.length`.** The initial O(k) pass already consumes the first window; the slide loop only needs to run once for each remaining window.

## Template

```javascript
function findMaxAverage(nums, k) {
    let currentSum = 0;
    for (let i = 0; i < k; i++) {
        currentSum += nums[i];
    }
    let maxSum = currentSum;

    for (let i = 0; i < nums.length - k; i++) {
        currentSum -= nums[i];
        currentSum += nums[i + k];
        maxSum = Math.max(currentSum, maxSum);
    }

    return maxSum / k;
}
```

## Trace Through

`nums = [1, 12, -5, -6, 50, 3], k = 4`

| step | currentSum | maxSum |
|------|-----------|--------|
| seed (i=0..3: 1+12-5-6) | 2 | 2 |
| i=0: -nums[0](1) +nums[4](50) → 2-1+50 | 51 | 51 |
| i=1: -nums[1](12) +nums[5](3) → 51-12+3 | 42 | 51 |

Loop ends (`nums.length - k = 2`, so `i` runs 0 and 1 only). `maxSum = 51`, return `51 / 4 = 12.75`. ✓ (matches LC 643's example answer)

## Complexity

**Time: O(N).** One O(k) pass to seed the first window, then one O(N - k) pass to slide — both bounded by `N`, so the total is O(N). No recomputation of overlapping sums.

**Space: O(1).** Just a running sum and a running max — no extra arrays or maps.

The naive approach is O(N·k): `N - k + 1` starting positions, each requiring an O(k) inner sum. Only degrades to O(N²) if `k` grows proportionally with `N`.

## Alternative Approaches

**Prefix sum.** Build `prefix[i]` = sum of `nums[0..i-1]` in one O(N) pass, then any window's sum is `prefix[i+k] - prefix[i]` in O(1) — scan all starting positions and track the max. Same O(N) time overall, just a precomputed array instead of incremental slide/unslide. Not implemented this session — flagged 2026-08-04 during a discussion of LC 560, which genuinely needs prefix sum (sliding window can't handle its negative numbers), unlike this problem where it's an optional alternative, not a requirement.

## Submissions

- [Accepted](https://leetcode.com/problems/maximum-average-subarray-i/submissions/2086112510) — 2026-08-04

## Open Questions

- Does the "seed once, divide/transform only at the end" refinement (don't repeat a cheap-but-unnecessary operation on every slide) get applied unprompted on a future fixed-window problem, or was this a one-off noticing?
- Does the O(N·k) vs O(N²) precision stick cold the next time a nested loop's two bounds aren't both `N`? (Second occurrence of a Big-O labeling slip — see patterns.md #74.)
