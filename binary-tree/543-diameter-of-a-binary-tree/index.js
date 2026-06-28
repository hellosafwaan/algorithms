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
function diameterOfBinaryTree(root) {
    let best = 0;
    function dfs(node) {
        if(node === null) return 0;
        const left = dfs(node.left);
        const right = dfs(node.right);
        best = Math.max(best, left + right);
        return 1 + Math.max(left,right);
    }
    dfs(root);
    return best;
};