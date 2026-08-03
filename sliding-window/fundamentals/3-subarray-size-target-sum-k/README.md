# subarrayTargetSumSizeK

**Problem Statement**

Write a function, `subarrayTargetSumSizeK`, that takes in an array of numbers, a `target` sum, and a window size `k`. The function should return the count of contiguous subarrays of exactly length `k` whose elements sum to `target`.

```js
subarrayTargetSumSizeK([2, 1, 5, 1, 3, 2], 8, 3); // -> 1   (only [2, 1, 5])
subarrayTargetSumSizeK([1, 1, 1, 1, 1], 2, 2);     // -> 4   (every window of size 2 sums to 2)
```

**Approach**

Same running-sum sliding technique as [`1-maximum-subarray-size-k`](../1-maximum-subarray-size-k), but instead of tracking a max, check each window's sum against `target` and count the matches:
1. Sum the first `k` elements to seed `currentSum`; if it already equals `target`, count it.
2. Slide one step at a time — subtract the outgoing element, add the incoming one.
3. After each slide, check equality against `target` and increment `count` if it matches.

**Complexity**

Let `N` = length of `nums`.

- One O(k) pass to seed the first window, then O(1) work per remaining window (`N - k` slides) — **O(N)** time, O(1) space.

**Implementation:** [`index.js`](index.js)
