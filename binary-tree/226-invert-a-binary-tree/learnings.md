# Invert Binary Tree (LC 226)

Session: [038_2026-06-27](../../safwaan/sessions/038_2026-06-27_invert-binary-tree.md)

## How It Felt

Logic came quickly — swap was obvious, recursion structure was clear. The only friction was uncertainty around `return root`.

## Key Insight

To invert a binary tree, swap the left and right children at the current node, then do the same for every node below. Recursion handles the "every node below" part automatically.

## Solution Walkthrough

**The core idea is simple:** at every node, swap its left and right children. Do that recursively for the entire tree and you're done.

**Why does this work?** Inverting a tree means mirroring it — the left subtree becomes the right subtree and vice versa, at every level. If you swap at the root, then swap at each child, then swap at each grandchild, by the time you reach the leaves, every node has been mirrored.

**Pre-order (process → recurse):**
```js
function invertTree(root) {
    if (root === null) return null;
    // swap first
    const tempLeft = root.left;
    root.left = root.right;
    root.right = tempLeft;
    // then recurse into the (now swapped) children
    invertTree(root.left);
    invertTree(root.right);
    return root;
}
```

You swap the current node's children, then recurse into each subtree to swap their children, and so on all the way down. The tree is modified in place as you go.

**Why `return root`?** The tree is already modified in place by the time you return — you're not passing the modified tree up through return values. You return `root` simply so the top-level caller gets the root node back (LeetCode expects it). The recursive calls don't use the return value at all.

**Post-order (recurse → process) — also valid:**
```js
function invertTree(root) {
    if (root === null) return null;
    invertTree(root.left);
    invertTree(root.right);
    // swap after subtrees are done
    const tempLeft = root.left;
    root.left = root.right;
    root.right = tempLeft;
    return root;
}
```

Recurse all the way to the leaves first, then swap on the way back up. Same final result.

**Iterative DFS (explicit stack):**
```js
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
```

**BFS (queue, level by level):**
```js
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
```

All four produce the same result. Recursive pre-order is cleanest for interviews.

## Traversal Orders

| Order | When you process the node | Pattern |
|-------|--------------------------|---------|
| Pre-order | Before recursing | current → left → right |
| Post-order | After recursing | left → right → current |
| In-order | Between recursions | left → current → right |
| BFS | Level by level | queue, not stack |

For this problem, pre-order and post-order both work. In-order would also work here (though unusual). BFS works too.

## Watch Out For

**Don't return the recursive call results** — `invertTree(root.left)` returns a node but you don't need to use it. The swap happens in place. Just call it for the side effect.

**The `return root` at the end** is for the top-level caller only. It's not how the recursive calls communicate — they modify the tree in place and the parent already holds references to the children.

## Pattern Introduced

DFS — pre-order (process current, then recurse into children). Contrast with post-order (recurse first, process on the way back up).

## Trace Through

```
Tree:      4
          / \
         2   7
        / \ / \
       1  3 6  9

Pre-order execution:
invertTree(4) → swap(2↔7) → tree: 4[7,2]
  invertTree(7) → swap(6↔9) → node 7: [9,6]
    invertTree(9) → swap(null↔null) → leaf, no change
    invertTree(6) → swap(null↔null) → leaf, no change
  invertTree(2) → swap(1↔3) → node 2: [3,1]
    invertTree(3) → leaf
    invertTree(1) → leaf

Result:    4
          / \
         7   2
        / \ / \
       9  6 3  1  ✓
```

## Complexity

**Time: O(n)** — every node visited exactly once. No node is skipped — you must swap every node's children.

**Space: O(h)** — call stack depth equals tree height.
- Balanced: O(log n)
- Skewed: O(n)
- BFS space is O(w) — max width of the tree — worst case O(n) at the bottom level.

## Submissions

https://leetcode.com/problems/invert-binary-tree/submissions/2047640794 — 0ms, 100th percentile

## Open Questions

- Recursive returns: how do return values travel up the call stack? When do you use the return value vs just call for the side effect? — flagged for a dedicated session.
