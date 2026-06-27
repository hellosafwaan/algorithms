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
function maxDepth(root) {
    if(root === null) return 0;
    const stack = [[root, 1]];
    let max = -Infinity;
    while(stack.length > 0) {
        const [currentNode, currentMaxHeight] = stack.pop()
        if(currentNode.left === null && currentNode.right === null) {
            max = Math.max(max, currentMaxHeight);
        }
        if(currentNode.left !== null) stack.push([currentNode.left, currentMaxHeight + 1]);
        if(currentNode.right !== null) stack.push([currentNode.right, currentMaxHeight + 1]);

    }
    return max;
};

function maxDepth(root) {
    if(root === null) return 0;
    // if(root.left === null && root.right === null) return 1;
    const leftHeight = maxDepth(root.left);
    const rightHeight = maxDepth(root.right);
    const max = Math.max(leftHeight, rightHeight);
    return 1 + max;
};