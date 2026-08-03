# countSubarrayProduct

**Problem Statement**

Write a function, `countSubarrayProduct`, that takes in an array of positive numbers and a `targetProduct`. The function should return the count of contiguous subarrays whose product is strictly less than `targetProduct`.

```js
countSubarrayProduct([10, 5, 2, 6], 100); // -> 8
countSubarrayProduct([1, 2, 3], 0);       // -> 0   (product is never negative, so never < 0)
```

**Approach**

A variable-size window again, but this problem counts *every* valid subarray rather than measuring the longest or shortest one — which needs a different closing move.

1. Expand: multiply `nums[end]` into `windowProduct` unconditionally.
2. Shrink while the window is invalid (`windowProduct >= targetProduct`), dividing out `nums[start]` each step. The `start <= end` guard stops the window from shrinking past itself when even a single element already meets or exceeds `targetProduct`.
3. **The key move:** after shrinking to validity, add `end - start + 1` to `count` — not `1`. This single expression accounts for *every* valid subarray ending at `end`: `[start..end]`, `[start+1..end]`, ..., `[end..end]` — all of them have a product ≤ the product of `[start..end]` (since all elements are positive, dropping elements from the left can only shrink the product further), so all `end - start + 1` of them are automatically valid too.

**Why this only works for positive numbers:** the "every shorter subarray ending here is also valid" argument depends on the product only ever shrinking as elements are removed — a negative or zero element would break that monotonic relationship.

**Complexity**

Let `N` = length of `nums`.

- `start` and `end` each advance at most `N` times total — **O(N)** time, O(1) space.

**Implementation:** [`index.js`](index.js)
