# Binary Search

## Problem

Write a function, `binarySearch`, that takes in a sorted array of numbers and a target. The function should return the index where the target can be found within the array. If the target is not found in the array, then return `-1`.

You may assume that the input array contains unique numbers sorted in increasing order.

Your function must implement the binary search algorithm.

### Examples

```
Input: nums = [-9, -4, 1, 5, 6, 18, 55, 62, 81, 99], target = 6
Output: 4

Input: nums = [1, 2, 4, 6, 8, 9, 12, 15], target = 5
Output: -1
```

## Approach

Brute force is a linear scan — check every element until you find a match, O(n). Since the array is sorted, we can do better: **binary search**, O(log n).

Keep two pointers, `low` and `high`, marking the boundaries of the region of the array still worth searching. `low` starts at index 0, `high` starts at the last index. Each step:

1. Compute the midpoint: `mid = Math.floor((low + high) / 2)`. Always round down — `low + high` can be odd.
2. Compare `target` to `nums[mid]`:
   - `target > nums[mid]` → the target must be to the right (array is sorted ascending) → `low = mid + 1`.
   - `target < nums[mid]` → the target must be to the left → `high = mid - 1`.
   - Otherwise, `target === nums[mid]` → found it, return `mid`.
3. Repeat while `low <= high`. The `<=` matters — when `low` and `high` point at the same single remaining element, that element still needs to be checked.

If the loop exits without returning, `low` has crossed past `high` — the entire array has been ruled out. Return `-1`.

Each step throws away half of the remaining search space, which is exactly what makes this logarithmic: starting from `n` elements, you can only halve `n` about log₂(n) times before you're down to a single element.

## Solution

```js
function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (target > nums[mid]) low = mid + 1;
        else if (target < nums[mid]) high = mid - 1;
        else return mid;
    }
    return -1;
}
```

## Complexity

**Time:** O(log n) — every iteration discards half of the remaining search space.
**Space:** O(1) — only `low`, `high`, and `mid` are tracked, regardless of array size.
