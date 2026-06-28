Session: [041_2026-06-28_count-complete-tree-nodes](../../safwaan/sessions/041_2026-06-28_count-complete-tree-nodes.md)

## How It Felt

Three O(n) approaches came instantly — iterative DFS, recursive, BFS all written cold. The optimal was harder: understanding what the complete tree property *enables* wasn't obvious. Needed guidance to get there.

## Key Insight

A perfect binary tree has leftmost height = rightmost height (measured from the same root). When that's true, you don't need to count — you compute: `2^h - 1`. When it's not true, recurse on both subtrees. Each subtree is also complete, so the shortcut fires at multiple levels as you go deeper.

The crucial detail: "left height" means going left at every node. "Right height" means going right at every node. Both starting from the same root. If they're equal, the tree is perfect.

## Solution Walkthrough

So the naive solution is dead simple: just traverse every node and count. DFS, BFS, recursive — all O(n) and all correct. The O(n) approach misses the opportunity that a complete binary tree gives you.

What does "complete" mean? Every level is fully filled except possibly the last, and the last level is filled from left to right. A perfect binary tree is a special case of complete where even the last level is full.

Here's the insight: from any node in a complete binary tree, if you follow the leftmost path and the rightmost path and they hit the same depth, you're standing at the root of a perfect subtree. Perfect subtree with height h has exactly `2^h - 1` nodes. Done — no need to recurse into it.

If the depths differ, you can't use the shortcut for this node. So you fall back: count 1 (this node), then recurse into both subtrees. Each subtree is also complete (the complete tree property is inherited), so the shortcut will fire at some level below.

The key trick: `left = root; while(left) { leftHeight++; left = left.left; }` — this measures depth going left-only. Same for right. Two while loops, both starting from the same `root`.

```js
function countNodes(root) {
    let leftHeight = 0, rightHeight = 0;
    let left = root, right = root;
    while(left) { leftHeight++; left = left.left; }
    while(right) { rightHeight++; right = right.right; }
    if(leftHeight === rightHeight) return 2**leftHeight - 1;
    else return 1 + countNodes(root.left) + countNodes(root.right);
};
```

What about `root === null`? When root is null, both while loops never run — `leftHeight === rightHeight === 0`. So `2**0 - 1 = 0`. That's correct. No explicit null check needed.

## Pattern Introduced

**Complete Binary Tree Shortcut** — when a subtree is perfect (left height = right height, measured from same root), return `2^h - 1` without traversing. Falls back to standard DFS otherwise. O(log²n) because: recursion goes O(log n) deep, each level does O(log n) height measurement work.

## Watch Out For

- `^` is XOR in JavaScript. Exponentiation is `**`. `2^h` computes XOR, `2**h` computes the power.
- Both height measurements start from the **same root**, not from the left child and right child respectively.
- The shortcut fires on subtrees, not just the root. When you're not at a perfect subtree, you recurse — and the shortcut may fire for `root.left` or `root.right` independently.

## Template

```js
function countNodes(root) {
    let leftHeight = 0, rightHeight = 0;
    let left = root, right = root;
    while(left) { leftHeight++; left = left.left; }
    while(right) { rightHeight++; right = right.right; }
    if(leftHeight === rightHeight) return 2**leftHeight - 1;
    return 1 + countNodes(root.left) + countNodes(root.right);
};
```

## Trace Through

For a 6-node complete tree (perfect top 2 levels, one node on last level):

Root: leftHeight = 3 (going left), rightHeight = 2 (going right). Not equal → recurse.
- Left subtree (3 nodes, perfect): leftHeight = 2, rightHeight = 2 → returns 2**2 - 1 = 3 ✓
- Right subtree (2 nodes, last level partial): leftHeight = 2, rightHeight = 1 → recurse.
  - Left child (1 node): leftHeight = 1, rightHeight = 1 → returns 1 ✓
  - Right child (null): returns 0.
  - 1 + 1 + 0 = 2 ✓

Total: 1 + 3 + 2 = 6 ✓

## Complexity

**O(n) approaches:** Time O(n) — visit every node once. Space O(h) = O(log n) for balanced, O(n) for skewed.

**Optimal O(log²n):** At each level of recursion, we do O(log n) work (measuring heights). The recursion tree has O(log n) levels because at every branching, one subtree is perfect and resolved in O(1) (via the formula) — only the other subtree recurses. So total work = O(log n) levels × O(log n) work each = O(log²n).

Why height = O(log n)? A complete binary tree with n nodes has ≈ n/2 leaves at the bottom level. Total nodes n ≈ 2^h (filling level by level doubles). So h ≈ log₂(n).

## Submissions

- Optimal O(log²n) — 100th percentile — [submission](https://leetcode.com/problems/count-complete-tree-nodes/submissions/2048644915)
- Naive O(n) recursive — 100th percentile — [submission](https://leetcode.com/problems/count-complete-tree-nodes/submissions/2048725892)

## Open Questions

- BFS path sum (LC 112) — not implemented, discussed only
- Can you trace what happens when the shortcut fires at the root of a 7-node (perfect) tree?
