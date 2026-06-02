/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows) {
    const triangle= []
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 0) {
                triangle[i] = [1]
            } else if (j === i) {
                triangle[i][j] = 1
            } else {
                triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
            }
        }
    }
    return triangle
};
