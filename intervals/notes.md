# Intervals — Patterns & Templates

## Insert Interval (LeetCode 57)

**Pattern:** Classify-and-merge single pass

**Core idea:** Given a sorted, non-overlapping interval array and one new interval to insert, walk the array once and classify each existing interval relative to the new one into exactly one of three buckets:
1. Strictly before (`current[1] < newInterval[0]`) — unaffected, push as-is.
2. Overlapping (`current[0] <= newInterval[1] && current[1] >= newInterval[0]`) — grow `newInterval` via `min` of starts / `max` of ends, push nothing.
3. Strictly after (`current[0] > newInterval[1]`) — `newInterval` is done growing; push it, then push everything remaining as-is.

**The one-time-push problem:** `newInterval` must be pushed exactly once, at the transition from "overlapping" to "after" — not on every subsequent "after" interval. Two ways to guarantee this:
- **Flag-gated:** a boolean (`newIntervalAdded`) that gates the push, checked before every attempt. Needs a post-loop fallback push in case `newInterval` never triggers the "after" case (it's last, or the array is empty).
- **Structural (three-phase loops):** split into three sequential `while` loops sharing one index — push-before, merge-overlapping, push-after. `newInterval` is pushed exactly once by construction, between phase 2 and phase 3 — no flag, no post-loop fallback needed.

**Loop invariant detail:** in the three-phase version, phase 2's merge condition only needs to check `current[0] <= newInterval[1]` (not the full overlap condition) — phase 1's exit condition already guarantees `current[1] >= newInterval[0]` is true for whatever interval phase 2 starts at.

**Template:**
```js
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;
    while (i < n && intervals[i][1] < newInterval[0]) { result.push(intervals[i]); i++; }
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    while (i < n) { result.push(intervals[i]); i++; }
    return result;
}
```

## Meeting Rooms (LeetCode 252)

**Pattern:** Classify-and-merge single pass, reduced to a yes/no overlap check

**Core idea:** Sort by start (no ordering guarantee). Once sorted, a single pass only ever needs to compare each interval to the one immediately before it — if `intervals[i][0] < intervals[i-1][1]`, the current meeting starts before the previous one ends, which is a genuine overlap. Touching intervals (`end === nextStart`) are fine, since the check is strict `<`.

**Simplification:** no separate `current`/`next` variables needed — index directly into the sorted array (`intervals[i]` vs `intervals[i-1]`). Also no length-0/1 guard needed — the loop (`i` starting at 1) naturally does nothing and falls through to `return true` when the array is that short.

**Template:**
```js
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}
```

## Interval List Intersections (LeetCode 986, bonus)

**Pattern:** Two Pointers — two independent sorted lists (new sub-shape, distinct from single-list Intervals problems above)

**Core idea:** Two pointers, one per list (`i` for `firstList`, `j` for `secondList`), both already internally sorted and non-overlapping. At each step, check overlap via the general two-interval condition `e1 >= s2 && e2 >= s1`; if true, push `[Math.max(s1, s2), Math.min(e1, e2)]`. Then advance whichever pointer's interval has the **smaller end** — that interval is "exhausted" (it can't reach any further, and everything remaining in the other list only starts later), while the interval with the larger end might still overlap the next interval in the list just advanced past.

**When to reach for it:** Comparing two separate sorted interval lists against each other, as opposed to merging/scanning within one list (contrast with LC 57/56/252) or merging two arrays into one output stream (contrast with LC 88).

**Template:**
```js
function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;
    while (i < firstList.length && j < secondList.length) {
        const [s1, e1] = firstList[i];
        const [s2, e2] = secondList[j];
        if (e1 >= s2 && e2 >= s1) {
            result.push([Math.max(s1, s2), Math.min(e1, e2)]);
        }
        if (e1 < e2) i++;
        else j++;
    }
    return result;
}
```

## Count Days Without Meetings (LeetCode 3169, bonus)

**Pattern:** Classify-and-merge (same as LC 57/56/252), followed by a gap-summation pass

**Core idea:** Merge overlapping meetings into a clean, sorted, non-overlapping list — identical to Merge Intervals (sort by start, merge in place via `min`/`max`, `else`-push a new entry when there's no overlap). Then walk the merged list and sum free days: before the first meeting (`result[0][0] - 1`), between each consecutive pair (`next[0] - current[1] - 1` — the `-1` matters, since adjacent-but-non-overlapping meetings share no free day between them), and after the last meeting (`days - result[last][1]`).

**When to reach for it:** Any "count the days/units NOT covered by a set of possibly-overlapping ranges" problem — merge first, then measure the complement.

**Template:**
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
