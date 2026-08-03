# longestSubarraySum

**Problem Statement**

Write a function, `longestSubarraySum`, that takes in an array of non-negative numbers and a `targetSum`. The function should return the length of the *longest* contiguous subarray whose elements sum to exactly `targetSum`, or `-1` if no such subarray exists.

```js
longestSubarraySum([1, 2, 1, 1, 1], 3); // -> 3   ([1, 1, 1] at indices 2-4)
longestSubarraySum([5, 6, 7], 1);       // -> -1  (no subarray sums to 1)
```

**Approach**

Builds on [`6-find-subarray-sum`](../6-find-subarray-sum) — same non-negative-array assumption, same "expand unconditionally, shrink while over target" loop shape — but instead of returning on the first match, it keeps scanning and tracks the best (longest) match seen.

1. Expand: add `nums[end]` to `windowSum` every step.
2. Shrink while `windowSum > targetSum` — same as before, this keeps the window as wide as possible without overshooting.
3. After shrinking, if `windowSum === targetSum`, this window is a candidate: compute `end - start + 1` and keep the max.
4. If no window ever matched, `longestWindowSize` stays `0`, which signals "not found" — return `-1` in that case instead of the found length.

**Why this still finds the *longest* match without exploring every window:** because the shrink-while-over loop only removes elements when strictly necessary, `start` is always as far left as it can be for the current `end` while staying non-overshooting. That means for every `end`, the window `[start, end]` is the longest possible non-overshooting window ending there — so checking it once per `end` is enough to guarantee the true longest match isn't missed.

**Complexity**

Let `N` = length of `nums`.

- Same two-pointer bound as `findSubarraySum`: `start` and `end` each advance at most `N` times total — **O(N)** time, O(1) space.

**Implementation:** [`index.js`](index.js)
