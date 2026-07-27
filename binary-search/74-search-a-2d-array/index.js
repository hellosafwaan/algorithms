/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

 // Approach 1
function searchMatrix(matrix, target) {
    const rowIndex = findTheRowIndex(matrix, target);
    if(rowIndex === -1) return false;
    else return binarySearchRow(matrix, target, rowIndex);
};

function findTheRowIndex(matrix, target) {
    let left = 0;
    let right = matrix.length - 1;
    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if(target >= matrix[mid][0] && target <= matrix[mid][matrix[0].length - 1]) {
            return mid;
        } else if(target < matrix[mid][0]) {
            right = mid  - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

function binarySearchRow(matrix, target, row) {
    let left = 0;
    let right = matrix[0].length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if(target < matrix[row][mid]) right = mid - 1;
        else if(target > matrix[row][mid]) left = mid + 1;
        else return true;
    }
    return false;
}

// Approach 2 - Single Binary Search
function searchMatrix(matrix, target) {
    const n = matrix.length;
    const m = matrix[0].length;
    let left = 0;
    let right = n * m - 1
    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2)
        const row = Math.floor(mid / m);
        const col = mid % m;
        if(matrix[row][col] === target) return true;
        else if (matrix[row][col] < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}