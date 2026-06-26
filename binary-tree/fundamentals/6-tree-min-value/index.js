// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }


//Left-Sided-Iterative-DFS
function treeMinValue (root) {
    let minValue = Infinity;
    const stack = [root];
    while(stack.length > 0) {
        const currentNode = stack.pop();
        if(currentNode.val < minValue) minValue = currentNode.val;
        if(currentNode.left) stack.push(currentNode.left);
        if(currentNode.right) stack.push(currentNode.right);
    }
    return minValue;
}


// Left-Sided-Recursive-DFS
function treeMinValue (root) {
    let minValue = Infinity;
    return findMinValue(root, minValue);
}

function findMinValue(root, minValue) {
    if(root === null) return minValue;
    if(root.val < minValue) minValue = root.val;
    const leftMinValue = findMinValue(root.left, minValue);
    const rightMinValue = findMinValue(root.right, minValue);
    minValue = Math.min(minValue, leftMinValue, rightMinValue);
    return minValue
}

//Left-Sided-Recursive-DFS-Without-Helper-Function

function treeMinValue(root) {
    if(root === null) return Infinity;
    const leftMin = treeMinValue(root.left);
    const rightMin = treeMinValue(root.right);
    return Math.min(root.val, leftMin, rightMin);
}

// Left-Sided-Iterative-BFS
function treeMinValue(root) {
    const queue = [root];
    let minValue = Infinity;
    while(queue.length > 0) {
        const currentNode = queue.shift()
        if(currentNode.val < minValue) minValue = currentNode.val;
        if(currentNode.left !== null) queue.push(currentNode.left)
        if(currentNode.right !== null) queue.push(currentNode.right)
    }
    return minValue;
}