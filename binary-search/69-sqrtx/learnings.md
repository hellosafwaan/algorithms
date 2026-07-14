Session: [059_2026-07-14](../../safwaan/sessions/059_2026-07-14_binary-search-basics.md)

## How It Felt

Video-assisted (Alvin's course) — solved after watching the walkthrough, not attempted cold.
## Key Insight

There's no literal array to search here — the "array" is conceptually every integer from `0` to `x`, and the thing being compared at each midpoint isn't `nums[mid]` but `mid * mid`. Binary search still applies because squares of increasing integers are themselves increasing (monotonic), which is the only property binary search actually needs. Since the answer must be *rounded down* when `x` isn't a perfect square, the final answer comes from `high`, not `low`.

## Solution Walkthrough

Set `left = 0` and `right = x` — the search space is every integer that could possibly be the square root of `x` (the true root is always `<= x` for `x >= 1`, and trivially `0` for `x = 0`).

Each iteration, compute `mid`, then compare `mid * mid` to `x` instead of comparing an array element:
- If `mid * mid > x`, `mid` is too big — the real root is smaller — move `right = mid - 1`.
- If `mid * mid < x`, `mid` is too small — move `left = mid + 1`.
- If they're equal, `x` is a perfect square and `mid` is exactly the answer — return it.

The interesting case is when `x` isn't a perfect square, so the loop never hits that exact-match branch and instead runs until `left` and `right` cross. At that point, `right` is sitting on the *largest* integer whose square is still `<= x` — which is exactly the floor of the square root. `left`, by contrast, has been pushed one step past that, onto the first integer whose square overshoots `x`. Since the problem wants the answer rounded down, `right` is the one to return.

```js
var mySqrt = function(x) {
    let left = 0;
    let right = x;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if(mid * mid > x) right = mid - 1;
        else if(mid * mid < x) left = mid + 1;
        else return mid;
    }
    return right;
};
```

## Pattern Introduced

Binary Search on Answer — searching over a conceptual range of candidate answers (not an actual input array), where the check at each midpoint is a computed condition (`mid * mid` vs `x`) rather than an array lookup. Same loop shape as classic binary search; the only two things that change are what gets compared and, here, returning `right` for a round-down instead of `-1` or `start`.

## Watch Out For

- No array exists — `right` starts at `x` itself, not `x - 1` or `nums.length - 1`. Don't reflexively subtract 1 out of habit from array-based binary search.
- Round-down (`right`) vs round-up (`start`, from Search Insert Position) — same crossed-pointer moment, opposite pointer returned, depending on which direction the problem wants you to round.
- `mid * mid` can overflow for very large `x` in other languages (not a practical concern in JS with normal LeetCode-sized inputs, but worth knowing as a general binary-search-on-answer gotcha).

## Template

```js
function sqrtFloor(x) {
    let left = 0, right = x;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (mid * mid > x) right = mid - 1;
        else if (mid * mid < x) left = mid + 1;
        else return mid;
    }
    return right; // rounded down
}
```

## Trace Through

`x = 15` (not a perfect square; floor of √15 ≈ 3.87 is 3).

- `left=0, right=15` → `mid=7` → `49 > 15` → `right=6`
- `left=0, right=6` → `mid=3` → `9 < 15` → `left=4`
- `left=4, right=6` → `mid=5` → `25 > 15` → `right=4`
- `left=4, right=4` → `mid=4` → `16 > 15` → `right=3`
- `left=4 > right=3` → loop exits → return `right = 3` ✓

## Complexity

Time: O(log x) — same halving search, over the range `[0, x]` instead of an array.
Space: O(1) — only `left`, `right`, `mid`.

## Submissions

https://leetcode.com/problems/sqrtx/submissions/2067233994

## Open Questions

- Given `mid * mid` was the comparison here, can he generalize to "binary search on the answer" problems where the check is a more complex computed condition (e.g. Koko Eating Bananas — check total hours to eat all piles at a given speed)?
- Declined to trace why `high`/`right` (not `low`) gives the rounded-down answer when asked directly this session — worth testing cold at the redo.
