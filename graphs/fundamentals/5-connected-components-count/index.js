const connectedComponentsCount = (graph) => {
  const visited = new Set()
  let count = 0;
  for(let node in graph) {
    if(explore(graph, node, visited) === true) {
      count++
    }
  }
  return count;
};

function explore(graph, node, visited) {
  if(visited.has(String(node))) return false;
  visited.add(String(node));
  const neighbours = graph[node];
  for(let i = 0; i < neighbours.length; i++) {
    explore(graph, neighbours[i], visited);
  }
  return true;
}

module.exports = {
  connectedComponentsCount,
};
