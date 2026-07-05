/**
 * @param {number[][]} grid
 * @return {number}
 */

// ============================================================
// Solution 1 — Flood fill with a visited Set
// ============================================================
// Same self-guarding recursion shape as Number of Islands (bounds ->
// water -> visited -> mark -> recurse), except each call now
// accumulates an area total instead of returning a boolean.
function maxAreaOfIsland(grid) {
    let maxArea = 0;
    const visited = new Set();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                const area = computeArea(grid, i, j, visited);
                maxArea = Math.max(area, maxArea);
            }
        }
    }
    return maxArea;
}

function computeArea(grid, i, j, visited) {
    const rowInbounds = i >= 0 && i < grid.length;
    const columnInbounds = j >= 0 && j < grid[0].length;

    if (!rowInbounds || !columnInbounds) return 0;
    if (grid[i][j] === 0) return 0;
    const pos = `${i},${j}`;
    if (visited.has(pos)) return 0;
    visited.add(pos);

    let area = 1;
    area += computeArea(grid, i - 1, j, visited);
    area += computeArea(grid, i + 1, j, visited);
    area += computeArea(grid, i, j - 1, visited);
    area += computeArea(grid, i, j + 1, visited);
    return area;
}

// ============================================================
// Solution 2 — Flood fill mutating the grid in place
// ============================================================
// Same idea, but flip a counted land cell to 0 instead of tracking
// it in a Set. "This is water" and "I already counted this" become
// the same check, so no Set, no string-key construction, and O(1)
// auxiliary space instead of O(m*n). Trade-off: destroys the input
// grid, which not every interviewer will accept.
function maxAreaOfIslandMutating(grid) {
    let maxArea = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                maxArea = Math.max(maxArea, computeAreaMutating(grid, i, j));
            }
        }
    }
    return maxArea;
}

function computeAreaMutating(grid, i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) return 0;
    if (grid[i][j] === 0) return 0; // covers both "always water" and "already counted"
    grid[i][j] = 0; // mark this cell handled permanently

    let area = 1;
    area += computeAreaMutating(grid, i - 1, j);
    area += computeAreaMutating(grid, i + 1, j);
    area += computeAreaMutating(grid, i, j - 1);
    area += computeAreaMutating(grid, i, j + 1);
    return area;
}
