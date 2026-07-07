/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// ============================================================
// Solution 1 — Track a separate currentInterval, push at the end
// ============================================================
// Sort by start first — the input isn't guaranteed ordered. Once
// sorted, a[0] <= c[0] is always true for adjacent pair [a,b]/[c,d],
// so the only real overlap check left is b >= c. currentInterval
// absorbs merges via Math.max on the end; the moment a genuine gap
// appears, it gets pushed and replaced. The final currentInterval
// never triggers a push inside the loop, so it needs one explicit
// push after — same shape as the Insert Interval post-loop push.
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

// ============================================================
// Solution 2 — No separate variable; mutate result's last element
// ============================================================
// The insight: currentInterval and "the last interval already in
// result" are the same piece of information tracked twice. Drop the
// separate variable — check/mutate result[result.length - 1]
// directly. This also removes the need for a final push: whatever is
// last in `result` is already there, growing in place.
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
