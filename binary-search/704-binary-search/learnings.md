Session: [059_2026-07-14](../../safwaan/sessions/059_2026-07-14_binary-search-basics.md)

## How It Felt

Video-assisted (Alvin's course) — solved after watching the walkthrough, not attempted cold.

## Key Insight

Binary search cuts the search space in half every step by comparing the target against the midpoint and discarding the half that can't contain it. The two pointers `low`/`high` define the current boundary; the loop keeps running until they cross (`low <= high`), which is the signal that the entire remaining space has been checked.

## Solution Walkthrough

So the setup is two pointers: `low` starts at index 0, `high` starts at the last index. Together they define the current window of the array still worth searching.

Every iteration, find the midpoint — `Math.floor((low + high) / 2)`, rounding down matters because `low + high` can be odd. Then compare `target` to `nums[mid]`:
- If `target` is bigger than `nums[mid]`, it can't be anywhere at or to the left of `mid` (sorted ascending) — so move `low` to `mid + 1`, searching the right half.
- If `target` is smaller, move `high` to `mid - 1`, searching the left half.
- If neither — they're equal — you found it, return `mid`.

The loop condition is `low <= high`, not `low < high`. That inclusive `<=` matters: when `low` and `high` point at the same single remaining element, that element still needs to be checked before giving up.

If the loop ends without ever returning, `low` has crossed past `high` — meaning every possible position has been ruled out. Return `-1`.

```js
function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    while(low <= high) {
        const mid = Math.floor((low + high)/ 2);
        if(target > nums[mid]) low = mid + 1;
        else if (target < nums[mid]) high = mid - 1;
        else return mid;
    }
    return -1;
}
```

## Pattern Introduced

Binary Search — classic two-pointer halving search on a sorted array. Foundation for [Search Insert Position](../35-search-insert-position/learnings.md) and [Sqrt(x)](../69-sqrtx/learnings.md), which both reuse this exact loop shape with a different final return.

## Watch Out For

- `Math.floor` on the midpoint — without it, odd sums produce a float index.
- `low <= high`, not `low < high` — the `<=` is what lets a single-element window still get checked.
- `low = mid + 1` / `high = mid - 1`, never `low = mid` / `high = mid` — reusing `mid` itself in the new boundary risks an infinite loop when the window is down to 2 elements.

## Template

```js
function binarySearch(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (target > nums[mid]) low = mid + 1;
        else if (target < nums[mid]) high = mid - 1;
        else return mid;
    }
    return -1;
}
```

## Trace Through

`nums = [-1, 0, 3, 5, 9, 12]`, `target = 9`.

- `low=0, high=5` → `mid=2` → `nums[2]=3` → `9 > 3` → `low=3`
- `low=3, high=5` → `mid=4` → `nums[4]=9` → match → return `4`

Not-found case, `target = 2`:
- `low=0, high=5` → `mid=2` → `nums[2]=3` → `2 < 3` → `high=1`
- `low=0, high=1` → `mid=0` → `nums[0]=-1` → `2 > -1` → `low=1`
- `low=1, high=1` → `mid=1` → `nums[1]=0` → `2 > 0` → `low=2`
- `low=2 > high=1` → loop exits → return `-1`

## Complexity

Time: O(log n) — every iteration discards half of the remaining search space, so the number of iterations to shrink `n` elements down to 0 or 1 is log₂(n).
Space: O(1) — only `low`, `high`, `mid` are tracked, regardless of input size.

## Submissions

https://leetcode.com/problems/binary-search/submissions/2067137989

## Open Questions

- Does the "return `high`, not -1" variant (Search Insert Position) land as an own-words explanation cold, or does it still need to be given? Declined to walk through it at this session's wrap-up.
