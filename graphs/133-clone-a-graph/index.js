
// Definition for a _Node.
function _Node(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
 };

/**
 * @param {_Node} node
 * @return {_Node}
 */


// Recursive DFS
function cloneGraph(node) {
    if (node === null) return null;
    const clonedNodes = new Map();
    return clone(node, clonedNodes);

}

function clone(node, clonedNodes) {
    if(clonedNodes.has(node)) return clonedNodes.get(node)
    /**
     * Create a clone node first with an empty neighbours;
     */
    const clonedNode = new _Node(node.val, [] );
    clonedNodes.set(node, clonedNode);
    const clonedNeighbours = [];
    for (const neighbor of node.neighbors) {
        clonedNeighbours.push(clone(neighbor, clonedNodes))
    }
    clonedNode.neighbors = clonedNeighbours;
    return clonedNode;
}

// Iterative BFS
function cloneGraph(node) {
    if (node === null) return null;

    const clonedNodes = new Map();
    clonedNodes.set(node, new _Node(node.val, []));
    const queue = [node];

    while (queue.length > 0) {
        const current = queue.shift();
        for (const neighbor of current.neighbors) {
            if (!clonedNodes.has(neighbor)) {
                clonedNodes.set(neighbor, new _Node(neighbor.val, []));
                queue.push(neighbor);
            }
            clonedNodes.get(current).neighbors.push(clonedNodes.get(neighbor));
        }
    }

    return clonedNodes.get(node);
}
// Iterative DFS
function cloneGraph(node) {
    if (node === null) return null;

    const clonedNodes = new Map();
    clonedNodes.set(node, new _Node(node.val, []));
    const stack = [node];

    while (stack.length > 0) {
        const current = stack.pop();
        for (const neighbor of current.neighbors) {
            if (!clonedNodes.has(neighbor)) {
                clonedNodes.set(neighbor, new _Node(neighbor.val, []));
                stack.push(neighbor);
            }
            clonedNodes.get(current).neighbors.push(clonedNodes.get(neighbor));
        }
    }

    return clonedNodes.get(node);
}