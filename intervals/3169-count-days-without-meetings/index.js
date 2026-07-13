/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */

// ============================================================
// Approach 1 — Merge into a result array, then sum the gaps
// ============================================================
// Classic classify-and-merge (same shape as Merge Intervals): sort by
// start, merge overlapping meetings in place, push a new entry (via
// an `else`, not unconditionally) when there's a genuine break. Once
// merged, walk the clean list and add up every stretch of free days:
// before the first meeting, between each consecutive pair
// (`next[0] - current[1] - 1` — the -1 matters, since two meetings
// that are adjacent but not overlapping share zero free days between
// them), and after the last meeting.
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
        const current = result[i - 1];
        const next = result[i];
        gap += next[0] - current[1] - 1;
    }
    // Days before the first merged meeting starts.
    gap += result[0][0] - 1;
    // Days after the last merged meeting ends.
    gap += days - result[result.length - 1][1];
    return gap;
}

// ============================================================
// Approach 2 — Merge into a result array, then sum occupied days
// ============================================================
// Same merge step as Approach 1, but instead of measuring the gaps
// directly, measure what IS covered (`end - start + 1` per merged
// interval) and subtract the total from `days`. Free days = total
// days minus occupied days — the complement of Approach 1's
// direct-gap sum. Simpler arithmetic (no off-by-one `-1` to track),
// at the cost of a second full pass over `result` instead of folding
// the measurement into the merge itself.
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
        const interval = result[i];
        occupiedDays += interval[1] - interval[0] + 1;
    }
    return days - occupiedDays;
}

// ============================================================
// Approach 3 — Single pass, no result array (O(1) extra space)
// ============================================================
// Both approaches above build a `result` array to hold the merged
// intervals before measuring anything. That's unnecessary — the gap
// calculation only ever needs the running "coverage so far"
// (`maxEnd`), never the full list of merged intervals. Sort by start,
// then in one pass: whenever the next meeting starts strictly after
// the current coverage ends (`nextStart > maxEnd`), that difference
// IS a stretch of free days — add it directly. Whether or not there
// was a gap, extend coverage with `maxEnd = Math.max(maxEnd, nextEnd)`.
// This merges intervals implicitly, without ever storing them. Add
// the days before the first meeting and after the final `maxEnd`
// once, outside the loop — same boundary terms as the other two
// approaches, just computed against a scalar instead of an array.
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
    // Days before the first meeting starts.
    gap += meetings[0][0] - 1;
    // Days after the final coverage ends.
    gap += days - maxEnd;
    return gap;
}
