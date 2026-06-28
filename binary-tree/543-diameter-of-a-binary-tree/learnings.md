# LC 543 — Diameter of Binary Tree

Session: [042_2026-06-28_diameter-of-binary-tree](../../safwaan/sessions/042_2026-06-28_diameter-of-binary-tree.md)

## How It Felt

Struggled to get started. The explanation phase was confusing — needed repeated traces before the two-variable distinction clicked (what to return vs what to track). Once it clicked, the code came quickly. Submitted at 87th percentile. Needed a visualizer to fully solidify understanding.

## Key Insight

The function does two things at every node:
- **Tracks**: `left + right` = the longest path that goes through this node (both arms combined). This is the diameter candidate. Update `best`.
- **Returns**: `1 + max(left, right)` = the longest single arm downward. This is what the parent needs to compute its own arms.

These are different. Don't confuse them.

## Solution Walkthrough

So the thing about diameter is it's asking for the longest path between *any* two nodes — and that path doesn't have to pass through root. The key realization: for any node, the longest path through it equals its left depth + right depth. So if we compute depth at every node and check `left + right`, we'll find it somewhere.

Why post-order (bottom-up)? Because to know a node's depth, you need to know both children's depths first. That means you compute children before parents — that's post-order.

The `best` variable lives outside `dfs` as a closure. Every call to `dfs` can update it. At the end, `best` holds the largest `left + right` ever seen across the entire tree.

The return value is different: `1 + Math.max(left, right)`. The parent doesn't want "how long is the path through you" — it wants "how far down can I reach through you." That's the longest single arm, plus 1 for the edge connecting parent to this node.

Base case: `null` returns `0`. A null child contributes 0 edges. This handles leaves naturally — a leaf's children both return 0, so `left + right = 0` (no path through a leaf), and it returns `1 + 0 = 1` to its parent (one edge down to this leaf).

```js
function diameterOfBinaryTree(root) {
    let best = 0;
    function dfs(node) {
        if (node === null) return 0;
        const left = dfs(node.left);
        const right = dfs(node.right);
        best = Math.max(best, left + right);   // candidate diameter at this node
        return 1 + Math.max(left, right);       // longest single arm to parent
    }
    dfs(root);
    return best;
}
```

## Pattern Introduced

**DFS Post-order with closure variable** — when you need to track a global best while also returning a different value up the call stack. The closure variable lets `dfs` have two "outputs": the return value (for the parent) and the side effect on `best` (for the final answer).

This pattern recurs: LC 124 (Binary Tree Maximum Path Sum) is the same shape, harder version.

## Watch Out For

- Don't return `left + right` to the parent — that's the diameter at this node, not the depth. Parent needs `1 + Math.max(left, right)`.
- The base case is `!node` (null), not `!node.left && !node.right` (leaf). You'll pass null into `dfs` when recursing on a child that doesn't exist — the null check needs to handle that.

## Template

```js
function diameterOfBinaryTree(root) {
    let best = 0;
    function dfs(node) {
        if (!node) return 0;
        const left = dfs(node.left);
        const right = dfs(node.right);
        best = Math.max(best, left + right);
        return 1 + Math.max(left, right);
    }
    dfs(root);
    return best;
}
```

## Trace Through

```
      1
     / \
    2   3
   / \
  4   5
```

- dfs(4): left=0, right=0 → best=max(0,0)=0 → return 1
- dfs(5): left=0, right=0 → best=max(0,0)=0 → return 1
- dfs(2): left=1, right=1 → best=max(0,2)=2 → return 2
- dfs(3): left=0, right=0 → best=max(2,0)=2 → return 1
- dfs(1): left=2, right=1 → best=max(2,3)=3 → return 3

Answer: 3

## Complexity

**Time: O(n)** — every node is visited exactly once. Each `dfs` call does O(1) work.

**Space: O(h)** — call stack depth = tree height. Balanced tree: O(log n). Skewed tree: O(n).

## Submissions

- https://leetcode.com/problems/diameter-of-binary-tree/submissions/2049090589 — 1ms, 87th percentile

## Open Questions

- LC 124 (Binary Tree Maximum Path Sum) is the harder version of this exact pattern. How does the return value change when path values can be negative?
