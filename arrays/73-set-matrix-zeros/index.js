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

// Optimised Solution.
function setZeroes3(matrix) {
    const m = matrix.length
    const n = matrix[0].length
    let firstRowHasZero = false, firstColumnHasZero = false;


    // Save whether the first row/column originally contain a zero, before we overwrite them with markers
    for (let i = 0; i < m; i++) {
        if(matrix[i][0] === 0) firstColumnHasZero = true
    }

    for (let i = 0; i < n; i++) {
        if(matrix[0][i] === 0) firstRowHasZero = true
    }

    // Scan the inner matrix (excluding row 0 and col 0). For each zero found,
    // mark its row and column using the first column and first row as a marker board.
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if(matrix[i][j] === 0) {
                matrix[i][0] = 0 // mark row i for zeroing
                matrix[0][j] = 0 // mark column j for zeroing
            }
        }
    }

    // Use the markers to zero out the inner matrix
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if(matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0
        }
    }

    // Handle the first row and first column last — using the booleans we saved at the start
    if(firstRowHasZero) {
        for (let i = 0; i < n; i++) {
            matrix[0][i] = 0;
        }
    }

    if(firstColumnHasZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
}