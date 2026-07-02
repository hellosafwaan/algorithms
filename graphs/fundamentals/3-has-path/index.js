// Note that this problem is easy because the graph is not acylic

// Iterative Solution
const hasPath = (graph, src, dst) => {
    const stack = [src];
    const hasPath = false;
    while(stack.length > 0) {
        const currentNode = stack.pop();
        if(currentNode === dst) return true;
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i++)  {
            stack.push(neighbors[i]);
        }
    }
    return hasPath;
};

// Recursive Solution - DFS
function hasPath(graph, src, dst) {
    if(src === dst) return true 
    const neighbors = graph[src];
    for (let i = 0; i < neighbors.length; i++) {
        if(hasPath(graph, neighbors[i], dst) === true) return true;
    }
    return false;
}


// BFS
function hasPath(graph, src, dst) {
  const queue = [src];
  while(queue.length > 0) {
    const currentNode = queue.shift();
    if(currentNode == dst) return true;
    const neighbors = graph[currentNode];
    for(let i = 0; i < neighbors.length; i++) {
      queue.push(neighbors[i]);
    }
  }
  return false;
}
