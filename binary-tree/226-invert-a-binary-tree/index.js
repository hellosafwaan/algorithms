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
 * @return {TreeNode}
 */

// Pre-Order-DFS
function invertTree(root) {
    if (root === null) return null;
    const tempLeft = root.left;
    root.left = root.right;
    root.right = tempLeft;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};

//Post-Order-DFS
function invertTree(root) {
    if (root === null) return null;
    invertTree(root.left);
    invertTree(root.right);
    const tempLeft = root.left;
    root.left = root.right;
    root.right = tempLeft;
    return root;
}

//Iterative-DFS

function invertTree(root) {
    if (!root) return null;
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        [node.left, node.right] = [node.right, node.left];
        if (node.left)  stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return root;
}

//Level-Order-BFS
function invertTree(root) {
    if (!root) return null;
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        [node.left, node.right] = [node.right, node.left];
        if (node.left)  queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return root;
}