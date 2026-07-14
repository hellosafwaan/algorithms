# Binary Search Index (Insert Position)

## Problem

Write a function that takes in a sorted array of numbers and a target. The function should return the index where the target can be found within the array. If the target is not found in the array, then return the index where it should appear in the sorted order.

You may assume that the input array contains unique numbers sorted in increasing order.

Your solution should have a runtime of O(log n).

### Examples

```
Input: nums = [1, 5, 8, 12, 15, 18, 23, 27, 33, 36, 42, 68], target = 68
Output: 11

Input: nums = [1, 5, 8, 12, 15, 18, 23, 27, 33, 36, 42, 68], target = 25
Output: 4   // 25 isn't present, but belongs between 23 and 27
```

## Approach

This is a variation of the classic binary search. Set it up identically — `start` at 0, `end` at the last index, halve the search space each step comparing `target` to `nums[mid]`.

The difference is what happens when the target is never found. Instead of returning `-1`, we want the index it *would* occupy in sorted order.

Watch what `start` does across the whole search: it only ever advances via `start = mid + 1`, which happens exactly when `target > nums[mid]` — i.e. every time `start` moves, it's stepping past a value the target is strictly bigger than. By the time the loop exits (`start` has crossed past `end`), `start` is sitting at the first position holding a value that is *not* smaller than the target. That's precisely the correct insertion point.

So the only change from classic binary search is the final line: instead of `return -1`, `return start`.

## Solution

```js
const binarySearchIndex = (nums, target) => {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (target < nums[mid]) end = mid - 1;
    else if (target > nums[mid]) start = mid + 1;
    else return mid;
  }
  return start;
};

module.exports = {
  binarySearchIndex,
};
```

## Complexity

**Time:** O(log n) — same halving search as classic binary search.
**Space:** O(1) — only `start`, `end`, and `mid`.
