Session: [060_2026-07-15](../../safwaan/sessions/060_2026-07-15_find-first-and-last-position.md)

## How It Felt

"Pretty easy" — knew the approach from the fundamentals video before starting, so this was directly composing the leftmost-index and rightmost-index helpers built earlier rather than deriving anything new. Declined to answer the own-words explanation question himself this session, asked for it to be written explicitly in the notes instead.

## Key Insight

This problem is exactly [Count in Sorted Array](../fundamentals/5-count-of-target/README.md) with the return value changed — instead of computing a count from the leftmost/rightmost indices, just return the pair `[leftIndex, rightIndex]` directly.

## Solution Walkthrough

So the array is sorted, and the target can appear multiple times — we need the first (leftmost) and last (rightmost) index it occupies, or `[-1, -1]` if it's not there at all.

This is a direct reuse of two helper searches already built in the fundamentals work:

- `findLeftmostIndex` — normal binary search, except when `nums[mid] === target`, don't return immediately. Record `mid` as the best candidate so far, then keep searching left (`right = mid - 1`) in case an earlier copy exists further left.
- `findRightMostIndex` — the mirror image: on a match, record `mid` and keep searching right (`left = mid + 1`) in case a later copy exists further right.

Once both indices are found, they bound every occurrence of `target` — the array is sorted, so all copies are contiguous, and `leftIndex`/`rightIndex` are the first and last positions of that contiguous run.

**Why checking only `rightIndex === -1` is enough to detect "not found," instead of checking both:** both helper searches run the exact same binary search logic against the exact same array and target — the only difference between them is which direction they keep searching after a match (left vs right). If the target doesn't exist anywhere in the array, *neither* search will ever hit the match branch at all, so both `leftMost` and `rightMost` stay at their initialized `-1`. There's no scenario where one search finds the target and the other doesn't — they're searching for the same thing in the same array, just biased toward opposite ends of the same run of matches. So checking either one alone is a complete and sufficient existence check; checking both would just be re-testing the same fact twice.

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
      left = mid + 1;
      rightMost = mid;
    }
  }
  return rightMost;
};

function searchRange(nums, target) {
    const rightIndex = findRightMostIndex(nums, target);
    const leftIndex = findLeftmostIndex(nums, target);
    if (rightIndex === -1) {
        return [-1, -1];
    } else {
        return [leftIndex, rightIndex];
    }
}
```

## Pattern Introduced

No new pattern — direct application of [Binary Search — Leftmost/Rightmost Boundary](../fundamentals/4-left-most-index/README.md) (search past a match instead of stopping) to a LeetCode problem, composing two already-built helpers instead of writing new search logic.

## Watch Out For

- Two full O(log n) searches run back to back here — still O(log n) overall, but it's tempting to think it needs to be a single combined search. Two independent, simple searches is the cleaner and equally efficient choice.
- The existence check only needs one of the two helper results (`rightIndex === -1`), not both — see the walkthrough above for why that's not a shortcut that risks missing a case.

## Template

Reuses the exact template from [Count in Sorted Array](../fundamentals/5-count-of-target/README.md) — same two helpers, different combining step (`[leftIndex, rightIndex]` instead of `rightIndex - leftIndex + 1`).

## Trace Through

`nums = [5, 7, 7, 8, 8, 10]`, `target = 8`.

`findLeftmostIndex`:
- `left=0, right=5` → `mid=2` → `nums[2]=7` → `8 > 7` → `left=3`
- `left=3, right=5` → `mid=4` → `nums[4]=8` → match → `leftMost=4`, `right=3`
- `left=3, right=3` → `mid=3` → `nums[3]=8` → match → `leftMost=3`, `right=2`
- `left=3 > right=2` → exit → returns `3`

`findRightMostIndex`:
- `left=0, right=5` → `mid=2` → `nums[2]=7` → `8 > 7` → `left=3`
- `left=3, right=5` → `mid=4` → `nums[4]=8` → match → `rightMost=4`, `left=5`
- `left=5, right=5` → `mid=5` → `nums[5]=10` → `8 < 10` → `right=4`
- `left=5 > right=4` → exit → returns `4`

`searchRange` returns `[3, 4]` ✓ (target 8 not present, `target = 6` example: both helpers never hit the match branch, both return `-1`, `rightIndex === -1` → `[-1, -1]`.)

## Complexity

Time: O(log n) — two independent binary searches, each O(log n); the sum is still O(log n) (constant multiple of one logarithm).
Space: O(1) — each helper only tracks `left`, `right`, `mid`, and one running best-index variable.

## Submissions

https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/submissions/2067778088

## Open Questions

- Can he articulate the "only one existence check needed, not two" reasoning cold on a future problem with a similar dual-helper shape, without it being written out for him?
