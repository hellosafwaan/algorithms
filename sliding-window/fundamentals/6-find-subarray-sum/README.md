# findSubarraySum

**Problem Statement**

Write a function, `findSubarraySum`, that takes in an array of non-negative numbers and a `targetSum`. The function should return the `[start, end]` (inclusive) indices of the first contiguous subarray whose elements sum to `targetSum`, scanning from the left.

```js
findSubarraySum([1, 2, 3, 7, 5], 12); // -> [1, 3]   (2 + 3 + 7 = 12)
findSubarraySum([1, 2, 3], 100);      // -> undefined (no matching subarray)
```

**Approach**

This is the first *variable-size* window in this module — unlike the fixed-`k` problems above, the window here grows and shrinks based on its sum, not a fixed length. This only works because the array is non-negative: adding an element can only increase the sum, so shrinking from the left is a safe, monotonic way to bring an over-target sum back down.

1. Expand the window by moving `end` forward and adding `nums[end]` to `windowSum` — unconditionally, every step.
2. While the window has overshot (`windowSum > targetSum`), shrink from the left: subtract `nums[start]` and advance `start`. This keeps the window's sum as small as possible without going under target.
3. After shrinking, check if `windowSum === targetSum` — if so, this is the answer, return `[start, end]` immediately.

**Why check *after* the while loop, not inside it:** the while loop's job is only to fix an overshoot; the equality check happens once the window is back to a valid (non-overshooting) state, whether that took zero shrinks or several.

**Complexity**

Let `N` = length of `nums`.

- `start` and `end` each move forward at most `N` times total across the whole run (never backward) — **O(N)** time.
- O(1) space — just the two pointers and a running sum.

**Implementation:** [`index.js`](index.js)
