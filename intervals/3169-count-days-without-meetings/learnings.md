Session: [056_2026-07-12_count-days-without-meetings.md](../../safwaan/sessions/056_2026-07-12_count-days-without-meetings.md)

## How It Felt
Video-assisted (disclosed at the end of the session). Brought code with three real bugs — a silent syntax error, a structural push-placement bug, and a missing `-1` in the gap formula. Debugged through all three across the session: the syntax error was given directly on request, the push-placement bug was found via a guided trace, and the `-1` fix was added independently, unprompted — a genuine correctness catch. Declined the closing own-words explanation and ended the session before it could be worked through further.

**Follow-up (same problem, later):** Added two more approaches from the same video series — the occupied-days complement (Approach 2) and a single-pass O(1)-extra-space version that never materializes a merged-intervals array (Approach 3). Also video-assisted, disclosed upfront this time.

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

**Approach 2 — measure occupied days instead of gaps directly.**
Same Phase 1 merge as Approach 1. Instead of walking `result` and summing the space *between* intervals, sum the space *covered by* each interval (`interval[1] - interval[0] + 1`, inclusive on both ends), then subtract that total from `days`. This is the complement of Approach 1: free days = total days − occupied days. It trades away the `-1` off-by-one entirely (no gap arithmetic to get wrong), at the cost of a second full pass over `result` to total the occupied days, plus the subtraction at the end.

Trace on `days=10`, `meetings=[[5,7],[1,3],[9,10]]`: merged `result = [[1,3],[5,7],[9,10]]`. Occupied = `(3-1+1) + (7-5+1) + (10-9+1) = 3+3+2 = 8`. Free = `10-8 = 2`. Same answer as Approach 1, reached by measuring the opposite thing.

**Approach 3 — single pass, no `result` array at all.**
The realization here: neither of the first two approaches actually needs the *list* of merged intervals — they only ever need to know where coverage currently ends. So skip building `result` entirely. Sort by start, then track one scalar, `maxEnd` — the rightmost point covered by every meeting merged so far. On each subsequent meeting:
- If `nextStart > maxEnd`, the new meeting starts strictly after current coverage ends — that gap (`nextStart - maxEnd - 1`) is real free time, so add it.
- If `nextStart <= maxEnd`, the new meeting overlaps or touches existing coverage — no gap, nothing to add.
- Either way, extend coverage: `maxEnd = Math.max(maxEnd, nextEnd)`.

This merges intervals *implicitly* — `maxEnd` always represents "the end of the current merged block," without ever storing the block itself. After the loop, add the two boundary terms exactly as before, just against `maxEnd` (a number) instead of `result[result.length-1][1]` (an array lookup): days before the first meeting, and days after `maxEnd`.

Trace on the same input: sorted `[[1,3],[5,7],[9,10]]`. `maxEnd=3`. `i=1`: `nextStart=5 > 3` → `gap += 5-3-1 = 1`; `maxEnd = max(3,7) = 7`. `i=2`: `nextStart=9 > 7` → `gap += 9-7-1 = 1` (total `2`); `maxEnd = max(7,10) = 10`. Boundary terms: `+meetings[0][0]-1 = 0`, `+days-maxEnd = 0`. Total: `2`. Same answer, no array ever built.

## Pattern Introduced
No new pattern at the algorithm level for Approach 1 — a direct extension of the classify-and-merge Intervals pattern (LC 57/56/252), followed by a gap-summation pass over the cleaned-up list. The new piece is the off-by-one careful handling in the gap formula (`-1`), which doesn't show up in the earlier Intervals problems since none of them needed to count *days between* intervals.

Approach 3 introduces a genuinely useful generalization: **when a classify-and-merge problem only needs the final boundary of each merged run (not the full interval), you don't need to build the merged array at all** — track the running boundary (`maxEnd`) as a scalar and fold the measurement into the same pass. This is the same insight as collapsing `currentInterval` into `result`'s last element (LC 56, Solution 2) taken one step further: not just "don't duplicate state," but "don't materialize a whole structure you're only going to read once."

## Watch Out For
- `.push[x]` is not a method call — it's bracket-indexing into the function object itself. Silently does nothing, no error. If a push/pop/method call seems to have no effect, check the parentheses first.
- In a classify-and-merge loop, the "push a new entry" branch must be an `else`, not a separate unconditional statement after the `if` — otherwise the merge case also pushes a spurious duplicate.
- When counting days/gaps *between* two boundary values (as opposed to checking overlap), remember the `-1`: the number of integers strictly between `a` and `b` is `b - a - 1`, not `b - a`.
- Before reaching for a `result` array in a classify-and-merge problem, ask whether the *individual merged intervals* are actually needed later, or only their running boundary. If it's only the boundary (as here), Approach 3's scalar-tracking version is strictly better — same correctness, less space, one pass instead of two.

## Template
```js
// Approach 1 — merge into an array, then sum gaps directly
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

// Approach 2 — merge into an array, then sum occupied days (complement)
function countDaysViaOccupied(days, meetings) {
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

    let occupiedDays = 0;
    for (let i = 0; i < result.length; i++) {
        occupiedDays += result[i][1] - result[i][0] + 1;
    }
    return days - occupiedDays;
}

// Approach 3 — single pass, no result array (O(1) extra space)
function countDaysSinglePass(days, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);
    let maxEnd = meetings[0][1];
    let gap = 0;
    for (let i = 1; i < meetings.length; i++) {
        const [nextStart, nextEnd] = meetings[i];
        if (nextStart > maxEnd) {
            gap += nextStart - maxEnd - 1;
        }
        maxEnd = Math.max(maxEnd, nextEnd);
    }
    gap += meetings[0][0] - 1;
    gap += days - maxEnd;
    return gap;
}
```

## Trace Through
`days = 10`, `meetings = [[5,7],[1,3],[9,10]]`:
- **Approach 1:** Sorted: `[[1,3],[5,7],[9,10]]`. No overlaps, `result` is identical. Gap loop: `[1,3]`→`[5,7]`: `5-3-1=1`. `[5,7]`→`[9,10]`: `9-7-1=1`. Running total `2`. Before first: `1-1=0`. After last: `10-10=0`. Total: `2`.
- **Approach 2:** Same merged `result`. Occupied = `3+3+2=8`. `10-8=2`.
- **Approach 3:** `maxEnd=3` → `i=1`: `5>3`, `gap+=1`, `maxEnd=7` → `i=2`: `9>7`, `gap+=1` (total `2`), `maxEnd=10`. Boundaries add `0` and `0`. Total: `2`.

All three agree: free days are 4 and 8.

## Complexity
**Approach 1 & 2 — Time: O(n log n)** (sort dominates; the merge pass and the measurement pass are both O(n)). **Space: O(n)** — `result` can hold up to `n` intervals in the worst case where no meetings overlap at all.

**Approach 3 — Time: O(n log n)** (same sort), but only **one** O(n) pass instead of two. **Space: O(1)** extra (beyond the sort itself) — no `result` array, just a running `maxEnd` and `gap`. Strictly better than Approaches 1 and 2 on space, and marginally better on constant-factor time (one array pass instead of two), while being no harder to reason about once the "track the boundary, not the array" idea clicks.

## Submissions
- https://leetcode.com/problems/count-days-without-meetings/submissions/2064228024 — Accepted, 578/578 test cases, 69ms runtime (69.57th percentile), 83.82MB memory (73.91st percentile).

## Open Questions
- Was the independent `-1` fix deliberate reasoning about the off-by-one, or something noticed while mentally testing an example? Session ended before this could be asked.
- Does the own-words explanation land when asked at the redo — this is unresolved from this session (declined at wrap-up). At the redo, also check whether Approach 3's "track the boundary, not the array" idea can be explained cold, since it was video-assisted and not yet verbally tested.
- Can Approach 3 be derived starting from Approach 1 without re-watching the video — i.e. does the "you don't need `result`, just `maxEnd`" leap happen independently once Approach 1 is already understood?
