/**
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * The solution below is the naive approach
 */


// Naive Solution
 function setZeroes(matrix) {
    const m = matrix.length
    const n = matrix[0].length
    const zeroIndexes = []

    // First Pass to find out which elements in the matrix are 0 
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j] === 0) {
                zeroIndexes.push([i, j])
            }
        }
    }

    // Second Pass to replace
    for (let k = 0; k < zeroIndexes.length; k++) {
        const matrixElementIndex = zeroIndexes[k];
        const row = matrixElementIndex[0];
        const column = matrixElementIndex[1];

        // Making the row 0 first -> which means that making all the columns in that particular row 0
        for(let j = 0; j <  n; j++) {
            matrix[row][j] = 0;
        }

        // Makething the column 0 -> which means that all the rows in that particular column should be 0; 
        for(let i = 0; i < m; i++) {
            matrix[i][column] = 0;
        }

    }

}

// Little better solution
function setZeroes2(matrix) {
    const m = matrix.length
    const n = matrix[0].length
    const rows = new Set()
    const columns = new Set()

    // First pass to identify the rows and colums that needs to be zeroed.
    for(let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j] === 0) {
                rows.add(i)
                columns.add(j)
            }
        }
    }

    // Second pass to actually update identified rows and columns with the zero value.
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rows.has(i)) matrix[i][j] = 0;
            if (columns.has(j)) matrix[i][j] = 0;
        }
    }
}