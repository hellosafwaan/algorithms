# Session: Invert Binary Tree (LC 226) — 2026-06-27

## What He Attempted

Pre-order recursive — swap first, then recurse:

```js
function invertTree(root) {
    if (root === null) return null;
    const tempLeft = root.left;
    root.left = root.right;
    root.right = tempLeft;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};
```

## Where He Got Stuck

- Knew the swap logic immediately — swap children, then recurse into both subtrees
- Got stuck on what to return — didn't know if `return root` was right or if recursion needed to return something meaningful
- Self-identified that recursive returns are a gap he wants to address in a dedicated session

## Mistakes Made

- None in the core logic — swap was right, recursion was right
- `return root` uncertainty: understood it intellectually once explained (returning the modified root so the caller gets the tree back) but flagged it as a deeper gap

## Key Insight

Process the current node (swap), then recurse down. This is pre-order traversal — current → left → right. Post-order also works (recurse first, swap on the way back up). So does iterative DFS and BFS. All four approaches produce the same result.

## Complexity Reached

Time: O(n) — Space: O(h)

## Submissions

https://leetcode.com/problems/invert-binary-tree/submissions/2047640794 — 0ms, 100th percentile

## Coach Notes for Next Session

- Recursive returns is a flagged gap — he wants a dedicated session on how return values travel upward through the call stack. Already logged in carry-forward.
- He independently asked about traversal order (pre vs post) and whether the same problem could be solved differently — good pattern: question the approach, not just accept the first solution.
- Next: LC 543 — Diameter of Binary Tree
