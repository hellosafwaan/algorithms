const graph = {
  a: ['c', 'b'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: []
};

// Iterative Solution
function depthFirstPrint(graph, source) {
  const stack = [source];
  while(stack.length > 0) {
    const currentNode = stack.pop();
    console.log(currentNode);
    const neighbors = graph[currentNode];
    
    for(let i = 0; i < neighbors.length; i++) {
      stack.push(neighbors[i])
    };
  }
}

/**
 * Recursive Solution
 * Note that the base case is really a scenario where we don't have do run the recursive solution; 
 * Here we achieve it because of adjancency list will have an empty array, so the loop stops
 */
function depthFirstPrint(graph, source) {
  console.log(source);
  const neighbors = graph[source];  
  for(let i = 0; i < neighbors.length; i++) {
    depthFirstPrint(graph, neighbors[i]);
  }
}