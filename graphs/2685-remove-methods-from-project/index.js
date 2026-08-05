/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
function remainingMethods(n, k, invocations) {
    const graph = buildGraph(invocations);
    const suspiciousNodes = dfs(k, graph);

    const result = [];
    for(let i = 0; i < n; i++) result.push(i);

    for(let i = 0; i < invocations.length; i++) {
        const [a, b] = invocations[i];
        // a is outside suspicious, b is inside suspicious -> violation, can't remove anything
        if(!suspiciousNodes.has(a) && suspiciousNodes.has(b)) return result;
    }

    // no violation found -> safe to remove; keep everything NOT suspicious
    return result.filter((node) => !suspiciousNodes.has(node));
};

function dfs(source, graph) {
  const stack = [source];
  const visited = new Set()
  while(stack.length > 0) {
    const currentNode = stack.pop();
    if(visited.has(currentNode)) continue;   // skip if already processed -- breaks cycles
    visited.add(currentNode);
    const neighbors = graph[currentNode] || [];  // safety net for nodes with zero edges at all
    for(let i = 0; i < neighbors.length; i++) {
      stack.push(neighbors[i])
    };
  }
  return visited;   // everything reachable from source, i.e. the suspicious set
}

function buildGraph(edges) {
    const graph = {}
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        if(!(a in graph)) graph[a] = [];
        if(!(b in graph)) graph[b] = [];  // ensures every node has an entry, even "leaf" nodes
        graph[a].push(b);                  // directed: only a -> b, not b -> a
    }
    return graph
}
