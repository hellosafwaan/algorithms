# Count of Target in a Sorted Array

## Problem

Write a function that takes in a sorted array of numbers and a target as arguments. The function should return the number of times the target element appears in the array.

Your solution should have a time complexity of O(log n).

### Examples

```
Input: nums = [1, 2, 2, 2, 3, 3, 3, 3, 3, 8, 8, 8, 8, 8, 8, 12], target = 8
Output: 6

Input: nums = [1, 3, 3, 5, 6, 7], target = 4
Output: 0

Input: nums = [1, 2, 4, 4, 4, 8], target = 4
Output: 1
```

## Approach

A linear scan counting matches works but is O(n). To hit O(log n), reuse the leftmost-index trick from the previous problem — plus its mirror image, a rightmost-index search (identical, except once a match is found you push `left = mid + 1` instead of `right = mid - 1`, so it keeps searching right instead of left).

Once you have both the leftmost and rightmost index of the target, every position between them (inclusive) must also be the target — the array is sorted, so all copies of a value are contiguous. The count is just `rightIndex - leftIndex + 1` (the `+1` because both endpoints are inclusive).

Edge case: if the target doesn't appear at all, both helper searches return `-1`. Check `rightIndex === -1` (equivalent to checking `leftIndex`, since they're always both `-1` or both valid together) and return `0` directly — otherwise the formula would silently produce the wrong answer (`-1 - (-1) + 1 = 1`) instead of `0`.

Running two O(log n) searches back to back is still O(log n) overall — two logarithms sum to a constant multiple of one logarithm, which is the same complexity class.

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
      right = mid - 1;
      leftMost = mid;
    }
  }
  return leftMost;
};

const findRightMostIndex = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let rightMost = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (target < nums[mid]) right = mid - 1;
    else if (target > nums[mid]) left = mid + 1;
    else {
      left = mid + 1;   // keep searching right even after a match
      rightMost = mid;
    }
  }
  return rightMost;
};

const countInSortedArray = (nums, target) => {
  const rightIndex = findRightMostIndex(nums, target);
  const leftIndex = findLeftmostIndex(nums, target);
  if (rightIndex === -1) {
    return 0;
  } else {
    return rightIndex - leftIndex + 1;
  }
};

module.exports = {
  countInSortedArray,
};
```

## Complexity

**Time:** O(log n) — two independent O(log n) binary searches (leftmost, rightmost) run back to back; `log n + log n` is still O(log n).
**Space:** O(1) — each helper search only tracks a handful of index variables.
