const largestComponent = (graph) => {
    const visited = new Set()
    let largest = 0;
    for(let node in graph) {
        const componentSize = explore(graph, node, visited)
        largest = Math.max(largest, componentSize);
    }
    return largest;
};

function explore(graph, node, visited){
    if(visited.has(node)) return 0;
    visited.add(node)
    let size = 1
    const neighbors = graph[node];
    for (let i = 0; i < neighbors.length; i++) {
        size += explore(graph, neighbors[i], visited)
    }
    return size;
}

module.exports = {
  largestComponent,
};
