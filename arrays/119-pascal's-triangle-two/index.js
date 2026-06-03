/**
 * @param {number} rowIndex
 * @return {number[]}
 */

// function getRow(rowIndex) {
// 	const row = []
// 	for (let i = 0; i <= rowIndex; i++) {
// 		for (let j = 0; j <= i; j++) {
// 			if (j === 0) {
// 				triangle[i] = [1]
// 			} else if (j === i) {
// 				triangle[i][j] = 1
// 			} else {
// 				triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
// 			}
// 		}
// 	}
// 	return triangle[rowIndex]
// };


function getRow(rowIndex) {
	const row = []
	for (let i = 0; i <= rowIndex; i++) {
		row.push(1)
		for (let j = row.length - 2; j >= 1; j--) {
			row[j] = row[j] + row[j - 1]
		}
	}
	return row;
};

/**
 * Good. Now trace through it with rowIndex = 3. Walk me through what row looks like after each outer loop iteration.
 * 
 * row = []
 * i = 0
 *   row = [1]
 *   j = -1;
 *     -1 >= 1 false, inner loop never executes for i = 0
 * 
 * row [1]
 * i = 1
 *   row = [1,1]
 * 	 j = 0;
 *     0 >= 1 inner loop never executes for i = 0
 * 
 * 
 * row [1,1]
 * i = 2
 *   row = [1, 1, 1]
 * 
 * 	 j = 1;
 *     1 >= 1 true, inner looop executes
 *     row[1] = row[1] + row[0] -> row[1] = 1 + 1 -> row[1] = 3
 *     updated row -> row = [1,2,1]   	
 *     iteration ends
 * 
 *   j = 0;
 *     0 >= 1 false
 *     inner loop ends
 * 
 * row = [1,2,1]
 * i = 3
 *   row = [1,2,1,1]
 * 
 *   j = 2;
 *     2 >= 1 true, inner loop starts
 *     row[2] = row[2] + row[1] = 1 + 3 = 3 -> row[2] = 3
 *     state of row -> row = [1,2,3,1]
 *     iteration ends
 *   j = 1;
 *     1 >= 1 true, inner looop executes
 *     row[1] = row[1] + row[0] -> row[1] = 1 + 2 -> row[1] = 3
 *     state of row -> row = [1, 3, 3, 1]
 *     iteration ends
 * 
 *   j = 0;
 *     0 >= 1 false
 *     inner loop ends
 *
 * outer loop ends
 * 
 * returns
 */

