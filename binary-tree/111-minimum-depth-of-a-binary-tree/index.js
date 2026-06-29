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


function minDepth(root) {
    if (root === null) return 0;
    const leftMinHeight = minDepth(root.left);
    const rightMinHeight = minDepth(root.right);
    if(leftMinHeight === 0) return  1 + rightMinHeight
    if(rightMinHeight === 0) return 1 + leftMinHeight
    minHeight = Math.min(leftMinHeight, rightMinHeight);
    return 1 + minHeight;
};

// Another solution
function minDepth(root) {
    if (root === null) return 0;
    if (!root.left) return 1 + minDepth(root.right);
    if (!root.right) return 1 + minDepth(root.left);
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};