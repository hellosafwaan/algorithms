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
 * @param {number} targetSum
 * @return {boolean}
 */

// Left-Sided-Iterative-DFS
function hasPathSum(root, targetSum) {
    if(root === null) return false;
    const stack = [[root, root.val]];
    while(stack.length > 0) {
        const [currentNode, currentSum] = stack.pop()
        if(currentNode.left === null && currentNode.right === null) {
            if(currentSum === targetSum) return true;
        }
        if(currentNode.right !== null) stack.push([currentNode.right, currentSum + currentNode.right.val])
        if(currentNode.left !== null) stack.push([currentNode.left, currentSum + currentNode.left.val])
    }
    return false;
};

function hasPathSum(root, targetSum) {
    if (root === null) return false;
    
}