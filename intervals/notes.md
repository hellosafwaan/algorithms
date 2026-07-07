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
