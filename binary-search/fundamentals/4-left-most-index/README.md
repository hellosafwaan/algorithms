# Find the Leftmost Index

## Problem

Write a function that takes in a sorted array of numbers and a target as arguments. The function should return the leftmost index where the target can be found in the array. If the target does not exist in the array, then return `-1`.

Your solution should have a time complexity of O(log n).

### Examples

```
Input: nums = [1, 2, 2, 2, 3, 3, 3, 3, 3, 8, 8, 8, 8, 8], target = 3
Output: 4

Input: nums = [1, 2, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 13, 13], target = 8
Output: 5

Input: nums = [1, 2, 4, 6], target = 5
Output: -1
```

## Approach

A linear scan finds the first occurrence trivially, but not in O(log n). Since the array is sorted, binary search still applies — with one twist: normally you'd stop the instant you find a match, but here a match isn't necessarily the *leftmost* one. There could be more copies of the target further to the left.

So: run binary search as usual, but when `nums[mid] === target`, don't return immediately. Record `mid` as the best leftmost candidate seen so far, then **keep searching left** anyway — treat it like the target was "too big" and shrink `right` to `mid - 1`. If another match turns up further left, it overwrites the recorded candidate (further left is always better). Eventually `left` and `right` cross, and whatever was last recorded is the true leftmost index. If the target was never found at all, the recorded value stays at its initial `-1`.

## Solution

```js
const findLeftmostIndex = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let leftMost = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (target < nums[mid]) right = mid - 1;
    else if (target > nums[mid]) left = mid + 1;
    else {
      right = mid - 1;   // keep searching left even after a match
      leftMost = mid;
    }
  }
  return leftMost;
};
```

## Complexity

**Time:** O(log n) — identical shape to classic binary search; the extra bookkeeping (`leftMost`) is O(1) work per step.
**Space:** O(1) — `left`, `right`, `mid`, `leftMost`.
