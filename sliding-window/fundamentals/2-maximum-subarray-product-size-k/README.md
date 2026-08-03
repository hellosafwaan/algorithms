# maxSubarrayProductSizeK

**Problem Statement**

Write a function, `maxSubarrayProductSizeK`, that takes in an array of numbers and a window size `k`. The function should return the maximum product achievable by any contiguous subarray of exactly length `k`.

```js
maxSubarrayProductSizeK([2, 3, -2, 4], 2); // -> 6   ([2, 3])
maxSubarrayProductSizeK([1, 2, 3], 3);     // -> 6
```

**Approach**

Same shape as [`1-maximum-subarray-size-k`](../1-maximum-subarray-size-k) — a fixed-size window sliding across the array — but swap the running operation from addition to multiplication.

*Naive:* recompute the product of each `k`-length window from scratch with an inner loop.

*Optimized:*
1. Multiply the first `k` elements together once, to seed `currentProduct`.
2. Slide the window: divide out the element leaving (`nums[i]`), multiply in the element entering (`nums[i + k]`).
3. Track the max after each slide.

**Why division is safe here:** because every element that leaves the window was itself multiplied in earlier, dividing it back out exactly undoes that step — as long as none of the elements are `0` (division by zero would break this, unlike the sum version which has no such restriction).

**Complexity**

Let `N` = length of `nums`.

- Naive: O(N·k) time, O(1) space — same reasoning as the sum version.
- Optimized: O(N) time, O(1) space — one O(k) seed pass, then O(1) per slide.

**Implementation:** [`index.js`](index.js)
