// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }


// Left-Sided-Iterative-DFS
function treeIncludes(root, target) {
    if (root === null) return false;
    const stack = [root];
    while(stack.length > 0) {
        const currentNode = stack.pop()
        if(currentNode.val === target) return true;
        if(currentNode.left !== null) stack.push(currentNode.left);
        if(currentNode.right !== null) stack.push(currentNode.right);
    }
    return false;
};

// Left-Sided-Recursive-DFS
function treeIncludes(root, target) {
    if(root === null) return false;
    if(root.val === target) return true;
    return treeIncludes(root.left, target) || treeIncludes(root.right, target);
}

//Left-Sided-Iterative-BFS

function treeIncludes(root, target) {
    if (root === null) return false;
    const queue = [root];
    while(queue.length > 0) {
        const currentNode = queue.shift()
        if(currentNode.val === target) return true;
        if(currentNode.left) queue.push(currentNode.left);
        if(currentNode.right) queue.push(currentNode.right);
    }
    return false;
}

module.exports = {
  treeIncludes,
};
