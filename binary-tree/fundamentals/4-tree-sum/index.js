// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

// Iterative-Depth-First
const treeSum = (root) => {
    if (root === null) return 0;
    const stack = [root];
    let sum = 0;
    while(stack.length > 0) {
        const currentNode = stack.pop()
        sum += currentNode.val
        if(currentNode.left) {
            stack.push(currentNode.left);
        }
        if(currentNode.right) {
            stack.push(currentNode.right);
        }

    }
    return sum;
};

// Recursive-Depth-First
function treeSum(root) {
    if(root === null) return 0;
    const leftSum = treeSum(root.left);
    const rightSum = treeSum(root.right);
    return root.val + leftSum + rightSum;
}

// Iterative-Breadth-First

function treeSum(root) {
    if(root === null) return 0;
    const queue = [root];
    let sum = 0;
    while(queue.length > 0) {
        const currentNode = queue.shift();
        sum += currentNode.val;
        if(currentNode.left !== null) queue.push(currentNode.left);
        if(currentNode.right !== null) queue.push(currentNode.right);
    }
    return sum; 
}

module.exports = {
  treeSum,
};
