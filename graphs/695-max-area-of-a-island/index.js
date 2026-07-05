/**
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland(grid) {
    let maxArea = 0;
    const visited = new Set();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if(grid[i][j] === 1) {
                const area = computeArea(grid, i, j, visited);
                maxArea = Math.max(area, maxArea);
            }
        }
    }
    return maxArea;
};

function computeArea(grid, i, j, visited) {
    const rowInbounds = i >= 0 && i < grid.length
    const columnInbounds = j >= 0 && j < grid[0].length

    if(!rowInbounds || !columnInbounds) return 0;
    if(grid[i][j] === 0) return 0;
    const pos = `${i},${j}`
    if(visited.has(pos)) return 0;
    visited.add(pos);
    let area = 1;
    area += computeArea(grid, i - 1, j, visited);
    area += computeArea(grid, i + 1, j, visited);
    area += computeArea(grid, i, j - 1, visited);
    area += computeArea(grid, i, j + 1, visited);
    return area;
}

/**
 * -------------------------------------------IN-PLACE-SOLUTION-WITHOUT-VISITED-SET--------------------------------------------------------------------------
 */

function maxAreaOfIsland(grid) {
    let maxArea = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                maxArea = Math.max(maxArea, computeArea(grid, i, j));
            }
        }
    }
    return maxArea;
}

function computeArea(grid, i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) return 0;
    if (grid[i][j] === 0) return 0;  // covers BOTH "always was water" AND "already counted"
    grid[i][j] = 0;                  // mutate — this cell is now permanently "handled"
    let area = 1;
    area += computeArea(grid, i - 1, j);
    area += computeArea(grid, i + 1, j);
    area += computeArea(grid, i, j - 1);
    area += computeArea(grid, i, j + 1);
    return area;
}