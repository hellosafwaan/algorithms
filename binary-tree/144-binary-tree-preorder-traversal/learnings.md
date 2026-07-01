Session: [045_2026-07-01](../../safwaan/sessions/045_2026-07-01_binary-tree-traversals.md)

## How It Felt

Clean, self-directed solve — brought a working, 100th-percentile-runtime solution to the session for logging.

## Key Insight

This is the same DFS shape as Max Depth / Same Tree / Invert Binary Tree: null check, recurse both children, combine, return up. The only thing that makes it "preorder" is putting `root.val` *first* in the returned array, before the recursive results from left and right.

## Solution Walkthrough

So the base case is the usual one for tree recursion — if `root` is `null`, there's nothing to visit, return an empty array.

Otherwise, ask the left subtree for its full preorder list, ask the right subtree for its full preorder list, and then combine them. The combine step is where "preorder" actually lives: the current node's value goes first, then whatever the left subtree produced, then whatever the right subtree produced.

```js
var preorderTraversal = function(root) {
    if (root === null) return [];
    const left = preorderTraversal(root.left);
    const right = preorderTraversal(root.right);
    return [root.val, ...left, ...right];
};
```

Because each recursive call already returns a fully-ordered preorder list for its subtree, spreading `left` and `right` after `root.val` naturally nests correctly at every level — you don't have to think about the whole tree at once, just "root, then my left subtree's answer, then my right subtree's answer."

## Pattern Introduced

DFS — Traversal Order (root-left-right). First of three traversal-order variants; see [94](../94-binary-tree-inorder-traversal/learnings.md) and [145](../145-binary-tree-postorder-traversal/learnings.md) for the other two.

## Watch Out For

- Don't confuse this with BFS/level-order traversal — this is still depth-first, just outputting values in a specific order.
- The array spread (`...left`, `...right`) rebuilds a new array at every level of recursion — correct, but costs extra allocations; an accumulator-array + iterative approach avoids this if performance matters.

## Template

```js
function preorder(root) {
    if (root === null) return [];
    return [root.val, ...preorder(root.left), ...preorder(root.right)];
}
```

## Trace Through

Tree: `1` with right child `2`, which has left child `3` (LeetCode's classic example `[1,null,2,3]`).

- `preorder(1)`: left = `preorder(null)` = `[]`. right = `preorder(2)`.
  - `preorder(2)`: left = `preorder(3)`.
    - `preorder(3)`: left = `[]`, right = `[]` → returns `[3]`
  - right = `preorder(null)` = `[]` → returns `[2, 3]`
- `preorder(1)` returns `[1, 2, 3]` ✓

## Complexity

Time: O(n) — every node is visited exactly once, and the work at each node (aside from the recursive calls) is O(1) plus the cost of spreading two arrays.
Space: O(n) — the recursion stack is O(h) (tree height), but the array concatenation at each level also touches every element, and the final output array itself is O(n).

## Submissions

https://leetcode.com/submissions/detail/2050058943/ — 100th percentile runtime

## Open Questions

- Can he explain cold why moving `root.val`'s position is the *only* change needed across all three traversal orders? Not verbally confirmed this session.
