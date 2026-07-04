const minimumIsland = (grid) => {
  const visited = new Set()
  let minSize = Infinity;
  for(let r=0; r < grid.length; r += 1) {
    for(let c = 0; c < grid[0].length; c += 1) {
      const size = explore(grid, r, c, visited)
      if(size > 0) minSize = Math.min(size, minSize);
    }
  }
  return minSize;
};

function explore(grid, r, c, visited) {
  const rowInbounds = 0 <= r && r < grid.length;
  const columnInbounds = 0 <= c && c < grid[0].length;
  if(!rowInbounds || !columnInbounds) return 0;
  if(grid[r][c] === 'W') return 0;
  
  const pos = r + ',' + c;
  if(visited.has(pos)) return 0;
  visited.add(pos);
  let size = 1;
  size += explore(grid, r -1, c, visited);
  size += explore(grid, r + 1, c, visited);
  size += explore(grid, r, c - 1, visited);
  size += explore(grid, r, c + 1, visited);
  return size;
}

module.exports = {
  minimumIsland,
};
