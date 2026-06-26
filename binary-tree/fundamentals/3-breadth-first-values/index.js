// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

// This is the iterative solution
function breadthFirstValues(root) {
    if (root === null) return [];
    const queue = [root];
    const result = [];
    while(queue.length > 0) {
        const currentNode = queue.shift();
        result.push(currentNode.val);
        if(currentNode.left !== null) queue.push(currentNode.left);
        if(currentNode.right !== null) queue.push(currentNode.right);
    }
    return result;
}

/**
 * I don't think it's possible to write a 
 * recursive solution for travesing a binary tree
 * breadth first way.
 */
module.exports = {
  breadthFirstValues,
};
