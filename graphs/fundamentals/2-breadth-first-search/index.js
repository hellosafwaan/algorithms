const graph = {
  a: ['c', 'b'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: []
};


function breadthFirstPrint(graph, source) {
  const queue = [source];
  while(queue.length > 0) {
    const currentNode = queue.shift();
    console.log(currentNode);
    const neighbors = graph[currentNode];
    for(let i = 0; i < neighbors.length; i++) {
      queue.push(neighbors[i]);
    }
  }
}