/**
 * @param {number[][]} intervals
 * @return {number}
 */

function eraseOverlapIntervals(intervals) {
    const n = intervals.length;
    const count = 0;
    for(let i = 1; i < n; i++) {
        const current = intervals[i - 1];
        const next = intervals[i];
        if(current[1] >= next[0]) count++
    }
    return count;
};