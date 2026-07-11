Session: [056_2026-07-12_count-days-without-meetings.md](../../safwaan/sessions/056_2026-07-12_count-days-without-meetings.md)

## How It Felt
Video-assisted (disclosed at the end of the session). Brought code with three real bugs — a silent syntax error, a structural push-placement bug, and a missing `-1` in the gap formula. Debugged through all three across the session: the syntax error was given directly on request, the push-placement bug was found via a guided trace, and the `-1` fix was added independently, unprompted — a genuine correctness catch. Declined the closing own-words explanation and ended the session before it could be worked through further.

## Key Insight
Two-phase approach: first merge all overlapping meetings into a clean, sorted, non-overlapping list (same classify-and-merge idea as Merge Intervals). Then walk that clean list and sum three kinds of gaps: before the first meeting, between each pair of consecutive merged meetings, and after the last meeting. The gap between two adjacent (but not overlapping) intervals needs a `-1` — the formula `next[0] - current[1]` counts one day too many, since it doesn't account for the fact that `current[1]` itself is not a free day.

## Solution Walkthrough

**Phase 1 — merge overlapping meetings:**
1. Sort `meetings` by start time.
2. Seed `result` with the first meeting.
3. For each subsequent meeting, compare it to the last interval in `result`. If it overlaps (`next[0] <= current[1]`), grow the last interval in place via `min` of starts / `max` of ends — same merge formula as Merge Intervals. If it doesn't overlap, push it as a new, separate entry.

The two bugs that showed up here were both about this merge step:
- `result.push[next]` (bracket notation, not a function call) silently did nothing at all — no meeting other than the seed ever entered `result`, whether merged or not.
- Once that syntax was fixed to `result.push(next)`, it was still placed *unconditionally* after the `if` block rather than inside an `else`. That meant every overlap case would merge into the last entry *and then also* push `next` as a spurious duplicate, corrupting `result` with overlapping leftover fragments (e.g. `[[1,7],[3,7]]` instead of just `[[1,7]]`). The fix: move the push into an explicit `else` branch, matching the classify-and-merge shape from Merge Intervals — merge replaces, it doesn't also push.

**Phase 2 — sum the gaps:**
1. Between each pair of consecutive merged intervals: `next[0] - current[1] - 1`. The `-1` matters — without it, two meetings that are adjacent but don't actually overlap (like `[1,3]` and `[4,6]`) would be counted as having a free day between them, when days 3 and 4 are both meeting days with nothing in between. This fix was found and added independently, without being prompted.
2. Before the first meeting: `result[0][0] - 1` — the count of free days from day 1 up to (but not including) the first meeting's start.
3. After the last meeting: `days - result[result.length - 1][1]` — the count of free days from the last meeting's end (exclusive) to the final day.

## Pattern Introduced
No new pattern at the algorithm level — this is a direct extension of the classify-and-merge Intervals pattern (LC 57/56/252), followed by a gap-summation pass over the cleaned-up list. The new piece is the off-by-one careful handling in the gap formula (`-1`), which doesn't show up in the earlier Intervals problems since none of them needed to count *days between* intervals.

## Watch Out For
- `.push[x]` is not a method call — it's bracket-indexing into the function object itself. Silently does nothing, no error. If a push/pop/method call seems to have no effect, check the parentheses first.
- In a classify-and-merge loop, the "push a new entry" branch must be an `else`, not a separate unconditional statement after the `if` — otherwise the merge case also pushes a spurious duplicate.
- When counting days/gaps *between* two boundary values (as opposed to checking overlap), remember the `-1`: the number of integers strictly between `a` and `b` is `b - a - 1`, not `b - a`.

## Template
```js
function countDays(days, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);
    const result = [meetings[0]];
    for (let i = 1; i < meetings.length; i++) {
        const current = result[result.length - 1];
        const next = meetings[i];
        if (next[0] <= current[1]) {
            current[0] = Math.min(current[0], next[0]);
            current[1] = Math.max(current[1], next[1]);
        } else {
            result.push(next);
        }
    }

    let gap = 0;
    for (let i = 1; i < result.length; i++) {
        gap += result[i][0] - result[i - 1][1] - 1;
    }
    gap += result[0][0] - 1;
    gap += days - result[result.length - 1][1];
    return gap;
}
```

## Trace Through
`days = 10`, `meetings = [[5,7],[1,3],[9,10]]`:
- Sorted: `[[1,3],[5,7],[9,10]]`. No overlaps anywhere, so `result` ends up identical: `[[1,3],[5,7],[9,10]]`.
- Gap loop: `[1,3]`→`[5,7]`: `5-3-1=1`. `[5,7]`→`[9,10]`: `9-7-1=1`. Running total: `2`.
- Before first: `1-1=0`. After last: `10-10=0`.
- Total: `2`. (Free days: 4 and 8.) Correct.

## Complexity
**Time: O(n log n)** — dominated by the sort; both passes afterward (merge, gap-sum) are O(n).
**Space: O(n)** — `result` can hold up to `n` intervals in the worst case where no meetings overlap at all.

## Submissions
- https://leetcode.com/problems/count-days-without-meetings/submissions/2064228024 — Accepted, 578/578 test cases, 69ms runtime (69.57th percentile), 83.82MB memory (73.91st percentile).

## Open Questions
- Was the independent `-1` fix deliberate reasoning about the off-by-one, or something noticed while mentally testing an example? Session ended before this could be asked.
- Does the own-words explanation land when asked at the redo — this is unresolved from this session (declined at wrap-up).
