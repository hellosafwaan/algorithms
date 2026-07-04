const shortestPath = (edges, nodeA, nodeB) => {
    const graph = buildGraph(edges);
    const queue = [[nodeA, 0]];
    const visisted = new Set([nodeA]);
    while(queue.length > 0) {
        const [currentNode, currentDistance] = queue.shift();
        if(currentNode === nodeB) return currentDistance;
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i++) {
            if(!visisted.has(neighbors[i])){
                queue.push([neighbors[i], currentDistance + 1]);
                visisted.add(neighbors[i]);
            }
        } 
    }
    return -1;
};

function buildGraph(edges) {
    const graph = {}
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        if(!(a in graph)) graph[a] = [];
        if(!(b in graph)) graph[b] = [];
        graph[a].push(b);
        graph[b].push(a);
    }
    return graph
}


module.exports = {
  shortestPath,
};
