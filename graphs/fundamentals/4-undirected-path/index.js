const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
};

function buildGraph(edges) {
    const graph = {};
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        if(!(a in graph)) graph[a] = [];
        if(!(b in graph)) graph[b] = [];
        graph[a].push(b);
        graph[b].push(a);
    }
    return graph;
}

function hasPath(graph, src, dst, visited) {
  if(src === dst) return true;
  if(visited.has(src)) return false;
  visited.add(src);
  const neighbours = graph[src];
  for(let i = 0; i < neighbours.length; i++) {
    if(hasPath(graph, neighbours[i], dst, visited) === true) {
      return true;
    }
  }
  return false;
}

module.exports = {
  undirectedPath,
};
