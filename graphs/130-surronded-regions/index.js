/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solve(board) {
    const visited = new Set();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const currentRegion = explore(board, i, j, visited, []);
            let isSurroundedRegion = true;
            if(currentRegion) {
                for (const element of currentRegion) {
                    const [r, c] = element;
                    if(r === 0 || r === board.length - 1 || c === 0 || c === board[0].length - 1) {
                        isSurroundedRegion = false;
                        break;
                    }
                }
                if(isSurroundedRegion) {
                    for (const element of currentRegion) {
                        const [r, c] = element;
                        board[r][c] = 'X'
                    }
                }
            }
        }
    }
};

function explore(board, i, j, visited, currentRegion) {
    const rowInbounds = 0 <= i && i < board.length;
    const colInbounds = 0 <= j && j < board[0].length;
    if (!rowInbounds || !colInbounds) return false;
    const pos = i + ',' + j;
    if(board[i][j] === 'X') return false;
    if(visited.has(pos)) return false;
    visited.add(pos);
    currentRegion.push([i,j])
    explore(board, i - 1, j, visited, currentRegion);
    explore(board, i + 1, j, visited, currentRegion);
    explore(board, i, j - 1, visited, currentRegion);
    explore(board, i, j + 1, visited, currentRegion);
    return currentRegion;
}