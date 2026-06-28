/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

//Iterative-DFS
function countNodes(root) {
    if(root === null) return 0;
    const stack = [root];
    let nodesCount = 0;
    while(stack.length > 0){
        const currentNode = stack.pop();
        nodesCount++
        if(currentNode.left) stack.push(currentNode.left);
        if(currentNode.right) stack.push(currentNode.right);
    }
    return nodesCount;
};

//Recursive-DFS
function countNodes(root) {
    if(root === null) return 0;
    const leftNodesCount = countNodes(root.left);
    const rightNodesCount = countNodes(root.right);
    return 1  + leftNodesCount + rightNodesCount;
}

//Iterative-BFS
function countNodes(root) {
    if(root === null) return 0;
    const queue = [root];
    let nodesCount = 0;
    while(queue.length > 0) {
        const currentNode = queue.shift();
        nodesCount++
        if(currentNode.left !== null) queue.push(currentNode.left);
        if(currentNode.right !== null) queue.push(currentNode.right);
    }
    return nodesCount;
}

function countNodes(root) {
    let leftHeight = 0, rightHeight = 0;
    let left = root, right = root;
    while(left) {
        leftHeight++;
        left = left.left;
    }
    while(right) {
        rightHeight++
        right = right.right
    }
    if(leftHeight === rightHeight) return 2**leftHeight - 1
    else return 1 + countNodes(root.left) + countNodes(root.right);
}