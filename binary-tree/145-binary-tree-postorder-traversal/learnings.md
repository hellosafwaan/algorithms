Session: [045_2026-07-01](../../safwaan/sessions/045_2026-07-01_binary-tree-traversals.md)

## How It Felt

Clean, self-directed solve — brought a working, 100th-percentile-runtime solution to the session for logging.

## Key Insight

Same DFS shape again — null check, recurse both children, combine, return up. "Postorder" means `root.val` goes *last*, after both subtrees are fully processed.

## Solution Walkthrough

Base case unchanged: `null` → `[]`.

Combine step: both subtrees' results first (left, then right), and only then the current node's own value.

```js
var postorderTraversal = function(root) {
    if (root === null) return [];
    const left = postorderTraversal(root.left);
    const right = postorderTraversal(root.right);
    return [...left, ...right, root.val];
};
```

This ordering is the natural one for problems where you need to fully process a node's children before the node itself makes sense to process — e.g. deleting a tree bottom-up, or computing a value (like diameter or height) that depends on both children's answers before the parent can combine them. It's the same underlying idea as the "ask subtrees, combine, return up" pattern from [LC 543](../543-diameter-of-a-binary-tree/learnings.md) and [LC 110](../110-balanced-tree/learnings.md) — those problems are doing postorder traversal implicitly, just combining into a number instead of a list.

## Pattern Introduced

DFS — Traversal Order (left-right-root). Last of the three traversal-order variants; see [144](../144-binary-tree-preorder-traversal/learnings.md) and [94](../94-binary-tree-inorder-traversal/learnings.md).

## Watch Out For

- This is conceptually the same shape used in Diameter/Balanced Tree — recognizing "I need both children's answers before I can compute mine" as postorder-shaped reasoning is the transferable insight, not just the traversal-output problems themselves.
- Same array-spread allocation cost as the other two.

## Template

```js
function postorder(root) {
    if (root === null) return [];
    return [...postorder(root.left), ...postorder(root.right), root.val];
}
```

## Trace Through

Tree: `1` with right child `2`, which has left child `3` (`[1,null,2,3]`).

- `postorder(1)`: left = `postorder(null)` = `[]`.
  - `postorder(2)`: left = `postorder(3)` = `[3]`. right = `postorder(null)` = `[]` → returns `[3, 2]`
- `postorder(1)` returns `[3, 2, 1]` ✓ (matches LeetCode's expected output)

## Complexity

Time: O(n) — every node visited exactly once.
Space: O(n) — O(h) recursion stack plus O(n) output array built from spreads at each level.

## Submissions

https://leetcode.com/submissions/detail/2050061177/ — 100th percentile runtime

## Open Questions

- Does he independently connect this to the "combine after both children respond" shape already used in Diameter/Balanced Tree/Count Complete Tree Nodes? Worth asking directly next tree session rather than assuming.
