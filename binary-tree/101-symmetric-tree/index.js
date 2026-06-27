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
 * @return {boolean}
 */
function isSymmetric(root) {
    function dfs(left, right) {
        if(left === null && right === null) return true; // This means the tree should be symmetric and we at the end of the left and the right node.
        if(left === null || right === null) return false; // This means the tree is unsymmetric
        if(left.val !== right.val) return false;
        const isOutsideSame = dfs(left.left, right.right);
        const isInsideSame = dfs(left.right, right.left);
        return isOutsideSame && isInsideSame
    }
    return dfs(root.left, root.right)
};