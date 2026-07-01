Session: [045_2026-07-01](../../safwaan/sessions/045_2026-07-01_binary-tree-traversals.md)

## How It Felt

Clean, self-directed solve — brought a working, 100th-percentile-runtime solution to the session for logging.

## Key Insight

Same DFS shape as [Preorder](../144-binary-tree-preorder-traversal/learnings.md) — null check, recurse both children, combine, return up. "Inorder" just means `root.val` sits *between* the left and right subtree results.

## Solution Walkthrough

Base case is unchanged: `null` → nothing to visit, return `[]`.

The combine step places `root.val` in the middle: first everything the left subtree produced (in its own inorder), then the current node's value, then everything the right subtree produced (in its own inorder).

```js
var inorderTraversal = function(root) {
    if (root === null) return [];
    const left = inorderTraversal(root.left);
    const right = inorderTraversal(root.right);
    return [...left, root.val, ...right];
};
```

Worth noting: for a binary *search* tree specifically, inorder traversal produces values in sorted order — that's the reason this particular ordering shows up so often in BST problems (e.g. LC 230 Kth Smallest, LC 98 Validate BST). For a general binary tree (as here), it's just "left subtree, then self, then right subtree" with no sorted guarantee.

## Pattern Introduced

DFS — Traversal Order (left-root-right). See [144](../144-binary-tree-preorder-traversal/learnings.md) and [145](../145-binary-tree-postorder-traversal/learnings.md) for the other two orderings.

## Watch Out For

- Don't assume inorder always means "sorted" — that's only true for BSTs, not arbitrary binary trees.
- Same array-spread cost as the other two traversals — fine for LeetCode constraints, but an iterative accumulator avoids the repeated array allocation.

## Template

```js
function inorder(root) {
    if (root === null) return [];
    return [...inorder(root.left), root.val, ...inorder(root.right)];
}
```

## Trace Through

Tree: `1` with right child `2`, which has left child `3` (`[1,null,2,3]`).

- `inorder(1)`: left = `inorder(null)` = `[]`.
  - `inorder(2)`: left = `inorder(3)` = `[3]` (since 3 is a leaf: left=[], right=[] → `[3]`). right = `inorder(null)` = `[]` → returns `[3, 2]`
- `inorder(1)` returns `[1, 3, 2]` ✓ (matches LeetCode's expected output for this example)

## Complexity

Time: O(n) — every node visited exactly once.
Space: O(n) — O(h) recursion stack plus O(n) for the accumulated output array built via spreads at each level.

## Submissions

https://leetcode.com/submissions/detail/2050062922/ — 100th percentile runtime

## Open Questions

- Can he explain cold why this becomes "sorted order" specifically for BSTs and not general trees? Worth surfacing when BST problems (LC 98, 230) come up.
