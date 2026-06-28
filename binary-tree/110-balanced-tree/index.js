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

// Intial Thinking One - Wrong
function isBalanced(root) {
    if(root === null) return true;
    function dfs(node, isBalanced) {
        if(node === null) return [0, true];
        const [leftHeight, isLeftBalanced] = dfs(node.left, isBalanced);
        const [rightHeight, isRightBalanced] = dfs(node.right,isBalanced );
        if(leftHeight - rightHeight > 1) return false;
        return 1 + Math.max(leftHeight,rightHeight);      
    }
    dfs(node, true);
};

// Initial Thinking Two - Wrong
function isBalanced(root) {
    if(root === null) return true;
    function dfs(node) {
        if(node === null) return 0;
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);
        if(leftHeight - rightHeight > 1) return false;
        return 1 + Math.max(leftHeight, rightHeight)
    }    
};


// Sentinel approach
function isBalanced(root) {
    if(root === null) return true;
    function dfs(node) {
        if(node === null) return 0;
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);
        if(leftHeight === -1 || rightHeight === -1) return -1
        if(Math.abs(leftHeight - rightHeight) > 1) return -1;
        return 1 + Math.max(leftHeight, rightHeight);
    }
    if(dfs(root) === -1) return false;
    else return true;    
}


// Closure Variable approach
function isBalanced(root) {
    let balanced = true;
    function dfs(node) {
        if(node === null) return 0;
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);
        if(leftHeight === undefined || rightHeight === undefined) return;
        if(Math.abs(leftHeight - rightHeight) > 1) {
            balanced = false;
            return;
        }
        return 1 + Math.max(leftHeight, rightHeight);
    }
    dfs(root);
    return balanced;
}