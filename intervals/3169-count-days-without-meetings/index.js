function countDays(days, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);
    const result = [meetings[0]];
    for (let i = 1; i < meetings.length; i++) {
        const current = result[result.length - 1];
        const next = meetings[i];
        if(next[0] <= current[1]) {
            result[result.length - 1][0] = Math.min(current[0], next[0])
            result[result.length - 1][1] = Math.max(current[1], next[1])
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
    // Adding the starting values 
    gap += result[0][0] - 1
    // Addint the ending values
    gap +=  days - result[result.length - 1][1] 
    return  gap;
}