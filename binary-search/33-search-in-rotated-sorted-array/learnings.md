Session: [070_2026-07-26](../../safwaan/sessions/070_2026-07-26_search-in-rotated-sorted-array.md)

## How It Felt

Learned the approach from a video (Striver's notes, disclosed honestly and unprompted). But unlike the recent video-assisted sessions, both bugs in the code brought to the session were found and fixed entirely through his own tracing, guided by narrow questions rather than direct answers — and the wrap-up explanation was given in his own words without being asked twice.

## Key Insight

A rotated sorted array always has at least one half (relative to `mid`) that's still fully sorted, even though the whole array isn't. Binary search still works — the extra step is figuring out *which* half is sorted, then checking whether the target falls inside that sorted half's range before deciding which direction to search.

## Solution Walkthrough

So the array is sorted, but the problem rotates it at some pivot — this is a variation of the same binary search shape from the fundamentals, not a totally new algorithm.

Same setup: `left = 0`, `right = nums.length - 1`, loop while `left <= right`, compute `mid`.

The twist: since the whole array isn't sorted anymore, comparing `target` to `nums[mid]` alone doesn't tell you which direction to search. But here's the guarantee that makes binary search still work — splitting a rotated sorted array at any `mid` always leaves at least one of the two halves fully sorted (the rotation point can only live in one of them).

So each iteration:
1. Figure out which half is sorted by comparing `nums[left]` to `nums[mid]`. If `nums[left] <= nums[mid]`, the left half (`left` to `mid`) is sorted. Otherwise, the right half (`mid` to `right`) is sorted.
2. Once you know which half is sorted, check whether `target` actually falls within that sorted half's range (`nums[left] <= target <= nums[mid]` for the left case, `nums[mid] <= target <= nums[right]` for the right case).
3. If the target is in that sorted range, search inside it. If not, it must be in the *other* half — search there instead.

```js
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        if (target === nums[mid]) return mid;
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
    return -1;
}
```

Two real bugs surfaced and were fixed through tracing during the session:

**Bug 1 — operator precedence in the `mid` formula.** First draft was `left + Math.floor((right - left / 2))`. JavaScript evaluates `/` before `-`, so this computes `right - (left / 2)`, not `(right - left) / 2` — wildly wrong for any window where `left` isn't 0. Traced with `nums = [4,5,6,7,0,1,2]`, `left=0, right=6`: intended `mid=3`, actual buggy result `mid=6`. Fixed by adding parentheses: `Math.floor((right - left) / 2)`.

**Bug 2 — `<` instead of `<=` when checking which half is sorted.** First draft used `nums[left] < nums[mid]`. This breaks specifically when `left === mid` (a two-element window, e.g. `left=0, right=1, mid=0`) — `nums[left] < nums[mid]` compares a value to itself, which is always false, so the code falls into the `else` branch assuming the *right* half is sorted. But when `mid === left`, it's the left half (trivially, just one element) that's guaranteed sorted — the `else` branch's assumption is wrong. Traced with `nums = [3,1]`, `target = 1`: caught that `nums[left] < nums[mid]` was comparing `nums[0]` to `nums[0]`, always false, sending the search down the wrong branch and returning `-1` for a target that exists. Fixed by switching to `<=`, which correctly treats the single-element case as "left is sorted."

## Pattern Introduced

Binary Search — Rotated Array (sorted-half detection). New pattern: instead of asking "is the target bigger or smaller than `mid`," first ask "which half is sorted," then "is the target inside that sorted half's range."

## Watch Out For

- Parenthesize the numerator explicitly in `Math.floor((right - left) / 2)` — don't rely on reading `right - left / 2` correctly at a glance; JS operator precedence will silently do the wrong thing.
- Use `<=` (not `<`) when comparing `nums[left]` to `nums[mid]` to determine the sorted half — the two-element window where `left === mid` is the case that exposes a strict `<`.

## Template

```js
function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
```

## Trace Through

`nums = [4,5,6,7,0,1,2]`, `target = 0`.

- `left=0, right=6` → `mid=3` → `nums[3]=7 ≠ 0`. `nums[0]=4 <= nums[3]=7` → left sorted. Is `4 <= 0 <= 7`? No → `left = 4`.
- `left=4, right=6` → `mid=5` → `nums[5]=1 ≠ 0`. `nums[4]=0 <= nums[5]=1` → left sorted. Is `0 <= 0 <= 1`? Yes → `right = 4`.
- `left=4, right=4` → `mid=4` → `nums[4]=0 === target` → return `4` ✓

`nums=[3,1]`, `target=1` (the case that exposed Bug 2):
- `left=0, right=1` → `mid=0` → `nums[0]=3 ≠ 1`. `nums[0]=3 <= nums[0]=3` → true (equal counts as sorted) → left "sorted" (trivially, single element). Is `3 <= 1 <= 3`? No → `left = 1`.
- `left=1, right=1` → `mid=1` → `nums[1]=1 === target` → return `1` ✓

## Complexity

Time: O(log n) — still a binary search; each step halves the search space regardless of the rotation.
Space: O(1) — only `left`, `right`, `mid`.

## Submissions

https://leetcode.com/problems/search-in-rotated-sorted-array/submissions/2081839421 — Accepted, 196/196, 0ms runtime (100th percentile).

## Open Questions

- Does the "check `<=` not `<` at the mid-equals-left boundary" lesson transfer cold to [Find Minimum in Rotated Sorted Array](../../TRACKER.md) (LC 153), which uses the same sorted-half detection idea?
