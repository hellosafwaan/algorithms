/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

// ============================================================
// Solution 1 — Single pass, boolean flag for one-time insert
// ============================================================
// Three cases per interval: strictly before newInterval (push as-is),
// overlapping (merge into newInterval, push nothing), or strictly
// after (push newInterval exactly once via the flag, then push
// current). The flag exists because newInterval can only be safely
// pushed the FIRST time an "after" interval is seen — pushing it on
// every subsequent "after" interval would duplicate it.
function insert(intervals, newInterval) {
    const result = [];
    let newIntervalAdded = false;
    const n = intervals.length;
    for (let i = 0; i < n; i++) {
        const current = intervals[i];
        if (current[1] < newInterval[0]) {
            result.push(current);
        } else if (current[0] > newInterval[1]) {
            if (!newIntervalAdded) {
                result.push(newInterval);
                newIntervalAdded = true;
            }
            result.push(current);
        } else {
            newInterval[0] = Math.min(newInterval[0], current[0]);
            newInterval[1] = Math.max(newInterval[1], current[1]);
        }
    }
    // newInterval is after every existing interval (or intervals is empty) —
    // never triggered the "after" branch above, so it hasn't been pushed yet.
    if (!newIntervalAdded) result.push(newInterval);
    return result;
}

// ============================================================
// Solution 2 — Three while loops on a shared index (no flag)
// ============================================================
// Same three cases, but as three sequential phases sharing one index
// `i` instead of one loop with a flag. newInterval is pushed exactly
// once, right between phase 1 and phase 3, by construction — no flag
// needed. The merge loop's condition only checks `current[0] <=
// newInterval[1]` (not the full overlap condition) because phase 1
// already guarantees `current[1] >= newInterval[0]` by the time it
// stops — checking that half again would always be true.
function insertThreePass(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;

    // 1. everything strictly before newInterval
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // 2. everything overlapping — merge into newInterval
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    // 3. everything strictly after
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}
