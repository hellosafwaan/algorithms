Session: [071_2026-07-26](../../safwaan/sessions/071_2026-07-26_search-in-rotated-sorted-array-ii.md)

## How It Felt

"A smaller edit" — watched Striver's video for the reasoning, then implemented it as a small addition on top of the already-solved [LC 33](../33-search-in-rotated-sorted-array/learnings.md), rather than a from-scratch problem. Gave the own-words explanation unprompted and correctly, with one minor Big-O labeling slip (said "n/2" instead of "O(n)").

## Key Insight

Duplicates break the one guarantee the LC 33 algorithm depends on: that comparing `nums[left]` to `nums[mid]` reliably tells you which half is sorted. When `nums[left] === nums[mid] === nums[right]`, that comparison is uninformative — both halves could look "equal" while the actual rotation point is hidden inside either one. The fix isn't to search smarter here, it's to shrink the ambiguous edges by one from both sides and try again. This trades the O(log n) guarantee for O(n) worst case (e.g. an array of all-identical values), but it's the only sound way to make progress without risking skipping over the target.

## Solution Walkthrough

Everything is identical to LC 33 — same `left`/`right` pointers, same `mid` formula, same sorted-half detection and range check. The only new piece is one guard clause inserted right after the exact-match check.

Before doing any of the sorted-half logic, first check: is `nums[left]`, `nums[mid]`, and `nums[right]` all the same value? If so, there's no way to tell from that comparison alone which side is actually sorted — the rotation point could be hiding on either side of `mid`, invisible because both ends happen to match. In that specific situation, the safe move is to just shrink the window by one from each end (`left++`, `right--`) and `continue` to the next iteration, rather than trying to reason about direction at all.

This only needs to trigger in that narrow "everything looks equal" case — as soon as `nums[left]`, `nums[mid]`, `nums[right]` aren't all identical, the normal LC 33 logic works exactly as before.

```js
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        if (target === nums[mid]) return true;
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
            continue;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target <= nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] <= target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
}
```

## Pattern Introduced

Binary Search — Rotated Array with Duplicates. Same [sorted-half detection](../33-search-in-rotated-sorted-array/learnings.md) as LC 33, plus a degenerate-case guard: when `nums[left] === nums[mid] === nums[right]`, no comparison can determine the sorted half, so shrink both ends by one instead of halving.

## Watch Out For

- The guard must check all three (`left`, `mid`, `right`) equal — not just `left === mid` or `mid === right` alone — since either partial match alone is still informative in some cases.
- This is the one place in rotated-array binary search where the loop *doesn't* halve the search space — worst case (e.g. `[2,2,2,2,2,2,2]` searching for `3`) shrinks by exactly one from each end per iteration, giving O(n) instead of O(log n).

## Template

```js
function searchWithDuplicates(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return true;
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
            continue;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return false;
}
```

## Trace Through

`nums = [2,5,6,0,0,1,2]`, `target = 0` (no duplicates collision needed here — behaves exactly like LC 33):

- `left=0, right=6` → `mid=3` → `nums[3]=0 === target` → return `true` ✓

`nums = [1,0,1,1,1]`, `target = 0` (the degenerate case):

- `left=0, right=4` → `mid=2` → `nums[2]=1 ≠ 0`. `nums[0]=1, nums[2]=1, nums[4]=1` → all equal → `left=1, right=3`, continue.
- `left=1, right=3` → `mid=2` → `nums[2]=1 ≠ 0`. `nums[1]=0, nums[2]=1, nums[3]=1` → not all equal. `nums[left]=0 <= nums[mid]=1` → left sorted. Is `0 <= 0 <= 1`? Yes → `right = 1`.
- `left=1, right=1` → `mid=1` → `nums[1]=0 === target` → return `true` ✓

## Complexity

Time: **O(n) worst case** — when the array is full of duplicates (e.g. all identical values), the degenerate-case guard fires every iteration, shrinking the window by only one element from each side instead of halving it. Best/average case is still O(log n) when duplicates aren't adversarially placed.
Space: O(1) — only `left`, `right`, `mid`.

## Submissions

https://leetcode.com/problems/search-in-rotated-sorted-array-ii/submissions/2081861246

## Open Questions

- None outstanding — clean transfer from LC 33, correctly identified the new edge case and its complexity cost with only a minor Big-O labeling slip (said "n/2," meant "O(n)").
