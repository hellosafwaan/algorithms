Session: [054_2026-07-10_meeting-rooms.md](../../safwaan/sessions/054_2026-07-10_meeting-rooms.md)

## How It Felt
Fastest, cleanest Intervals session yet — wrote a correct solution on the first attempt with no conceptual struggle at all. The only bug was mechanical (a `const` variable reassigned inside the loop, a recurring habit from earlier sessions), caught and fixed in one exchange. Complexity and the touching-interval edge case were both reasoned correctly without a scaffold. Two rounds of self-driven code cleanup followed, including independently spotting dead code via a trace and independently proposing a further simplification. Didn't answer the closing reflection questions directly — asked the coach to synthesize them from the conversation instead.

## Key Insight
Sort the intervals by start time first (no ordering guarantee in the input). Once sorted, a single pass only needs to compare each interval to the one immediately before it — if the current interval's start is earlier than the previous interval's end, they overlap and attending both is impossible. Touching intervals (`[5,10]` followed by `[10,15]`) are fine, since the check is strict `<`, not `<=` — the person is free at exactly 10:00.

## Solution Walkthrough

1. Sort `intervals` by start time (`a[0] - b[0]`) — needed because, unlike some Intervals problems, this input has no sorted guarantee.
2. Walk the array starting at index 1, comparing `intervals[i]` (current) against `intervals[i-1]` (the one right before it).
3. If `intervals[i][0] < intervals[i-1][1]` — the current meeting starts before the previous one ends — that's a genuine overlap, so return `false` immediately.
4. If the loop finishes without ever finding an overlap, every meeting fits without conflict — return `true`.

First-draft version tracked the "previous interval" in a separate `current` variable, updated to `next` at the end of each iteration:
```js
function canAttendMeetings(intervals) {
    if (intervals.length <= 1) return true;
    intervals.sort((a, b) => a[0] - b[0]);
    let current = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i];
        if (next[0] < current[1]) return false;
        current = next;
    }
    return true;
}
```
This works, but two things about it are redundant once you look closely:
- The early guard `if (intervals.length <= 1) return true` doesn't actually do anything the rest of the function doesn't already handle. If `intervals.length` is 0 or 1, the loop condition `i < intervals.length` (starting at `i=1`) is false immediately, so the function falls straight through to the final `return true` anyway.
- `current` and `next` are just `intervals[i-1]` and `intervals[i]` under different names. Since you already have `i` as an index into the sorted array, there's no need for either variable — you can compare directly.

Collapsing both simplifications gives the final version:
```js
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}
```

## Pattern Introduced
Third application of **Intervals — Classify-and-Merge Single Pass** (after LC 57, LC 56), stripped down to its simplest form: no merging or inserting, just a yes/no overlap check between sorted adjacent intervals. Confirms the "sort first, then only ever need to compare a interval to its immediate neighbor" reasoning generalizes to problems that don't need to build a result array at all.

## Watch Out For
- Same as LC 56: input isn't guaranteed sorted — sort by start before scanning.
- Strict `<` for the overlap check, not `<=` — touching intervals (`end == nextStart`) are allowed.
- An early-return guard for a length-0/1 edge case is often unnecessary if the main loop naturally does nothing (and thus falls through to the right answer) when the array is that short. Check what the loop actually does before assuming you need a special case.
- `const` on a variable that gets reassigned inside a loop — recurring bug (5th+ time across sessions). Worth a quick self-check on every loop variable before running the code: "does this get reassigned anywhere below?"

## Template
```js
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}
```

## Trace Through
`intervals = [[0,30],[5,10],[15,20]]`:
- Sorted: already in order by start.
- `i=1`, `[5,10]` vs `[0,30]`: `5 < 30`? Yes → return `false`. Correct (the 0-30 meeting overlaps everything).

`intervals = [[7,10],[2,4]]`:
- Sorted: `[[2,4],[7,10]]`.
- `i=1`, `[7,10]` vs `[2,4]`: `7 < 4`? No.
- Loop ends. Return `true`. Correct.

`intervals = [[5,10],[10,15]]` (touching, edge case):
- Sorted: already in order.
- `i=1`, `[10,15]` vs `[5,10]`: `10 < 10`? No.
- Return `true`. Correct — back-to-back meetings are attendable.

## Complexity
**Time: O(n log n)** — the sort dominates; the single pass afterward is O(n), absorbed by the sort's O(n log n).
**Space: O(1)** — no extra data structures beyond the sort itself (in-place comparisons via index, no result array needed since this is a yes/no check, not a construction).

## Submissions
Premium problem — no LeetCode submission link available. Verified correct via manual trace against all three standard test cases (overlap, no-overlap, touching) above.

## Open Questions
- Does the dead-code-detection instinct (spotting the length<=1 guard was unnecessary via a trace) show up unprompted on a future problem, or did it need the nudge to look for it this time?
- Does the recurring `const`-reassignment bug ever get caught before running the code, rather than after being asked about it?
