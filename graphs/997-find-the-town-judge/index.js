/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
function findJudge(n, trust) {
    const inDegreeCount = {};
    const outDegreeCount = {};
    for (const edge of trust) {
        const [a, b] = edge;
        if(!(b in inDegreeCount)) {
            inDegreeCount[b] = 1;
        } else {
            inDegreeCount[b]++;
        }

        if(!(a in outDegreeCount)) {
            outDegreeCount[a] = 1;
        } else {
            outDegreeCount[a]++;
        }
    }
    for (let i = 1; i <= n; i++) {
        if ((inDegreeCount[i] ?? 0) === n - 1 && (outDegreeCount[i] ?? 0) === 0) return i;
    }
    return -1
};