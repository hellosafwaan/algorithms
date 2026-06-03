/**
 * @param {number} rowIndex
 * @return {number[]}
 */

function getRow(rowIndex) {
	const row = []
	for (let i = 0; i <= rowIndex; i++) {
		for (let j = 0; j <= i; j++) {
			if (j === 0) {
				triangle[i] = [1]
			} else if (j === i) {
				triangle[i][j] = 1
			} else {
				triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
			}
		}
	}
	return triangle[rowIndex]
};
