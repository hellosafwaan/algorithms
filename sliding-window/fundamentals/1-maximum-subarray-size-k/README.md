# maxSubarraySumSizeK

**Problem Statement**

Write a function, `maxSubarraySumSizeK`, that takes in an array of numbers and a window size `k`. The function should return the maximum sum achievable by any contiguous subarray of exactly length `k`.

```js
maxSubarraySumSizeK([2, 1, 5, 1, 3, 2], 3); // -> 9   ([5, 1, 3])
maxSubarraySumSizeK([1, 1, 1, 1, 1], 2);    // -> 2
maxSubarraySumSizeK([-1, -2, -3], 1);       // -> -1
```

**Approach**

This is the foundational fixed-size sliding window problem — every other fixed-window problem in this module builds on the shape introduced here.

*Naive (`maxSubarraySumSizeKNaive`):* for every possible starting index `i`, sum the `k` elements from `i` to `i + k - 1` with an inner loop, and track the max. This recomputes the sum from scratch for every window, even though consecutive windows overlap in `k - 1` elements.

*Optimized (`maxSubarraySumSizeK`):* avoid the recomputation by maintaining a running sum:
1. Sum the first `k` elements once, up front — this is the initial window.
2. Slide the window one step at a time: subtract the element leaving the window (`nums[i]`) and add the element entering it (`nums[i + k]`).
3. Compare against the running max after each slide.

**Why this works:** each slide is a constant-time update instead of a full re-sum, because the new window and the old window share `k - 1` elements — only the boundary changes.

**Complexity**

Let `N` = length of `nums`.

- Naive: for each of `N - k + 1` starting positions, an inner loop sums `k` elements — **O(N·k)** time, O(1) space.
- Optimized: one O(k) pass to build the initial sum, then O(1) work per remaining window — **O(N)** time, O(1) space.

**Implementation:** [`index.js`](index.js)
