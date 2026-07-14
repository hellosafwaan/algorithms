Session: [059_2026-07-14](../../safwaan/sessions/059_2026-07-14_binary-search-basics.md)

## How It Felt

Video-assisted (Alvin's course) — solved after watching the walkthrough, not attempted cold.

## Key Insight

Same binary search shape as LC 704, but instead of returning `-1` on a miss, return `start` — the final position of the `start` pointer tells you exactly where the target would need to be inserted to keep the array sorted.

## Solution Walkthrough

Identical setup to classic binary search: `start` at 0, `end` at the last index, loop while `start <= end`, compute `mid`, compare `target` to `nums[mid]`, narrow the window based on which side the target must be on.

The twist is what happens when the target genuinely isn't in the array. The loop naturally exits once `start` crosses past `end`. At that exact moment, `start` has been pushed forward every time the target was found to be bigger than the current midpoint — which means `start` has stopped at the first position where an element is not smaller than the target. That's precisely the index the target should be inserted at to keep the array in sorted order.

Concretely: every time you go right (`start = mid + 1`), you're saying "the target is bigger than everything up to and including `mid`, so it belongs somewhere after `mid`." Every time you go left (`end = mid - 1`), you're saying "the target is smaller than `nums[mid]`, so `mid` is a valid candidate insertion point, maybe among others further left." When the pointers finally cross, `start` has settled exactly one past the last element smaller than the target, and `end` has settled exactly at the last element still smaller — so `start` is the answer.

```js
function searchInsert(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    while(start <= end) {
        const mid = Math.floor((start + end) / 2);
        if(target > nums[mid]) start = mid + 1;
        else if(target < nums[mid]) end = mid - 1;
        else return mid;
    }
    return start;
}
```

## Pattern Introduced

Binary Search — "found position, or the position it belongs at" variant. Return `start`/`low` when you want to round *up* to the next valid slot; contrast with [Sqrt(x)](../69-sqrtx/learnings.md), which rounds *down* by returning `high` instead.

## Watch Out For

- The only structural change from LC 704 is the final `return start` instead of `return -1` — everything else in the loop is identical.
- Easy to mix up returning `start` vs `end` here. `start` is correct because it's the pointer that only ever moves forward past elements smaller than `target`.

## Template

```js
function searchInsert(nums, target) {
    let start = 0, end = nums.length - 1;
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (target > nums[mid]) start = mid + 1;
        else if (target < nums[mid]) end = mid - 1;
        else return mid;
    }
    return start;
}
```

## Trace Through

`nums = [1, 3, 5, 6]`, `target = 2` (not present, belongs at index 1).

- `start=0, end=3` → `mid=1` → `nums[1]=3` → `2 < 3` → `end=0`
- `start=0, end=0` → `mid=0` → `nums[0]=1` → `2 > 1` → `start=1`
- `start=1 > end=0` → loop exits → return `start = 1` ✓ (`[1, 2, 3, 5, 6]` is where 2 would sit)

## Complexity

Time: O(log n) — same halving search as classic binary search.
Space: O(1) — only `start`, `end`, `mid`.

## Submissions

https://leetcode.com/problems/search-insert-position/submissions/2067144040

## Open Questions

- Can the "return `start` for round-up, return `high` for round-down" distinction be stated cold on a future binary-search-on-answer problem (e.g. Koko Eating Bananas, LC 875)?
