Session: [053_2026-07-07_merge-intervals.md](../../safwaan/sessions/053_2026-07-07_merge-intervals.md)

## How It Felt
Faster than Insert Interval — a lot of the core reasoning (sort, then classify overlap vs. no-overlap, merge via min/max) transferred cleanly from the previous session. Two strong transfer moments: correctly re-deriving that `a <= d` is always true once sorted (so `b >= c` is the only real check, same loop-invariant idea as last time), and self-connecting the missing-final-push bug to the *identical* bug from Insert Interval without being told it was the same shape. Energy dropped noticeably once the conversation moved into the "cleaner code" refactor — shorter answers, asked directly to be shown the code rather than deriving it. Closed with a genuine reflective question about *why* the cleaner approach didn't occur to him first, which led to a real insight about noticing redundant state.

## Key Insight
The array isn't guaranteed sorted, so sort by start first. Once sorted, two adjacent intervals `[a,b]` and `[c,d]` always have `a <= c`, which means the general overlap condition's `a <= d` clause is always true — the only clause that actually matters is `b >= c`. When they overlap, the merged start is always `a` (already guaranteed smallest by the sort) and the merged end is `Math.max(b, d)`. Track a running `currentInterval`, absorbing overlaps into it, and push it to `result` the moment a genuine gap appears — plus once more after the loop ends, since the very last `currentInterval` never triggers an in-loop push.

## Solution Walkthrough

**Solution 1 — separate `currentInterval` variable.**
1. Sort `intervals` by start (`a[0] - b[0]`) — the input has no ordering guarantee, unlike Insert Interval.
2. Seed `currentInterval = intervals[0]`, then walk the rest of the array starting at index 1.
3. At each step, compare `currentInterval` to `nextInterval`. Because the array is sorted, `currentInterval[0] <= nextInterval[0]` is always true — the only comparison that matters is `currentInterval[1] < nextInterval[0]` (no overlap, genuine gap) vs. not (overlap or touching).
4. No gap → push `currentInterval` to `result`, then replace it with `nextInterval` (start fresh).
5. Gap → merge: `currentInterval[1] = Math.max(currentInterval[1], nextInterval[1])`. The start never needs updating — sorted order already guarantees `currentInterval[0]` is the smaller one.
6. After the loop, `currentInterval` holds whatever it was last set to — but it was never pushed inside the loop (pushing only happens on the "gap" branch, and there's no interval left to trigger that after the last one). One explicit `result.push(currentInterval)` after the loop catches it. This is the exact same shape as the Insert Interval bug — something that grows across iterations but is never pushed inside the loop needs an explicit trailing push.

One boundary detail: the "no overlap" check must be **strict** `<`, not `<=`. Touching intervals (e.g. `[1,4]` and `[4,5]`) are considered overlapping by this problem's definition and must merge into `[1,5]` — using `<=` would incorrectly treat them as separate.

**Solution 2 — no separate variable, mutate `result`'s last element.**
The realization: `currentInterval` and "the last interval already sitting in `result`" are the same fact, tracked in two places. Drop the separate variable:
```js
for (const interval of intervals) {
    const last = result[result.length - 1];
    if (!last || last[1] < interval[0]) {
        result.push(interval);
    } else {
        last[1] = Math.max(last[1], interval[1]);
    }
}
```
`!last` handles the very first interval the same way as every other case (nothing special-cased), and there's no final push needed — whatever's being built is already sitting inside `result`, mutated in place via `last[1] = ...`.

## Pattern Introduced
No new pattern — this is the second application of **Intervals — Classify-and-Merge Single Pass** from Insert Interval, minus the "insert a specific new interval" framing. New structural piece: sorting first, since this problem's input isn't pre-sorted. And a second instance of "prune a redundant check once you know what an earlier step already guarantees" (previously a loop-invariant on a condition, this time a loop-invariant on which side of `min`/`max` is dead) plus a new one — noticing that two variables track the same fact and collapsing them into one.

## Watch Out For
- The array isn't guaranteed sorted — always check this assumption before writing "walk left to right" logic on interval problems.
- The "no overlap" check must be strict `<`, not `<=` — touching intervals (`[1,4]`/`[4,5]`) merge in this problem's definition.
- A separate `else if` whose condition is the exact negation of the `if` it follows is dead weight — just use `else`.
- Anything accumulated across a loop but only pushed on a specific branch condition needs an explicit trailing push after the loop, unless you restructure to mutate the result array's own last element directly instead of a separate variable.

## Template
```js
// Separate variable, explicit final push
function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [];
    let currentInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        const nextInterval = intervals[i];
        if (currentInterval[1] < nextInterval[0]) {
            result.push(currentInterval);
            currentInterval = nextInterval;
        } else {
            currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
        }
    }
    result.push(currentInterval);
    return result;
}

// No separate variable — mutate result's last element directly
function mergeInPlace(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [];
    for (const interval of intervals) {
        const last = result[result.length - 1];
        if (!last || last[1] < interval[0]) {
            result.push(interval);
        } else {
            last[1] = Math.max(last[1], interval[1]);
        }
    }
    return result;
}
```

## Trace Through
`intervals = [[1,3],[2,6],[8,10],[15,18]]` (already sorted):
- `currentInterval = [1,3]`.
- `i=1`, `[2,6]`: `3 < 2`? No → merge: `currentInterval = [1,6]`.
- `i=2`, `[8,10]`: `6 < 8`? Yes → push `[1,6]`, `currentInterval = [8,10]`.
- `i=3`, `[15,18]`: `10 < 15`? Yes → push `[8,10]`, `currentInterval = [15,18]`.
- Loop ends. Push `[15,18]`.
- Result: `[[1,6],[8,10],[15,18]]`. Correct.

## Complexity
**Time: O(n log n)** — dominated by the sort; the single pass afterward is O(n), which the sort's O(n log n) absorbs.
**Space: O(n)** — `result` scales with the input size; worst case (no merges at all) holds all `n` original intervals.

## Submissions
- https://leetcode.com/problems/merge-intervals/ — Accepted, 172/172 test cases, 31ms runtime (6.82nd percentile), 65.59MB memory (36.27th percentile). Submitted 2026-07-07 18:10.

## Open Questions
- The runtime percentile (6.82nd) is notably low for an O(n log n) solution — worth checking next time whether a stray `console.log` or some other overhead was left in during timing, or if it's just LeetCode runtime variance.
- Does the "two variables tracking the same fact" noticing-redundant-state habit generalize as a review-time check, the way the loop-invariant check did? Probe at the next problem with any kind of running/accumulator variable.
