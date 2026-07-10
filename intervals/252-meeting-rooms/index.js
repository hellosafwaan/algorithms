// Solution 1
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let current = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i];
        if(next[0] < current[1]) return false;
        current = next;  
    }
    return true;
}

function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if(intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}

// function overlaps(interval1, interval2) {
//     const [s1, e1] = interval1;
//     const [s2, e2] = interval2;
//     return s1 <= e2 && s2 <= e1
// }