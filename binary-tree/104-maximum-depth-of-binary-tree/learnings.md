# Maximum Depth of Binary Tree (LC 104)

Session: [036_2026-06-27](../../safwaan/sessions/036_2026-06-27_maximum-depth-of-binary-tree.md)

## How It Felt

Clean transfer from fundamentals problem 7 (max-root-to-leaf-path-sum). Knew both approaches going in, no false starts.

## Key Insight

The depth problem is the path-sum problem with counting instead of adding. Bundle `[node, currentDepth]` pairs in the iterative version so each branch carries its own depth independently. Recursive version: ask each subtree for its depth, take the max, add 1.

## Solution Walkthrough

**Iterative DFS:**

So the core problem with tracking a single depth variable is the same as tracking a single `currentSum` — once the stack branches, two different paths can't share one number. The fix is the same: push pairs `[node, depth]` so each entry carries its own accumulated depth.

Start with `[[root, 1]]`. On each pop, if it's a leaf, update max. When pushing children, pass `currentDepth + 1`. That's it — the two subtrees never interfere.

```js
function maxDepth(root) {
    if (root === null) return 0;
    const stack = [[root, 1]];
    let max = -Infinity;
    while (stack.length > 0) {
        const [node, depth] = stack.pop();
        if (!node.left && !node.right) max = Math.max(max, depth);
        if (node.left) stack.push([node.left, depth + 1]);
        if (node.right) stack.push([node.right, depth + 1]);
    }
    return max;
}
```

**Recursive DFS:**

Ask the left subtree for its max depth. Ask the right subtree for its max depth. Take whichever is bigger and add 1 for the current node. Base case: null returns 0 (a null branch contributes no depth).

The leaf check (`if (!root.left && !root.right) return 1`) isn't needed — a leaf's two null children both return 0, so `Math.max(0, 0) + 1 = 1` automatically. But it doesn't hurt.

```js
function maxDepth(root) {
    if (root === null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

## Pattern Introduced

DFS — accumulate a value top-down (iterative) or bottom-up (recursive). Same skeleton as max-root-to-leaf-path-sum.

## Watch Out For

- Iterative: don't use a single shared variable for depth — push pairs.
- Recursive: the leaf check is optional. `null → 0` is sufficient.

## Template

```js
// Recursive skeleton for any "aggregate over tree" problem
function solve(root) {
    if (root === null) return BASE_CASE;
    const left = solve(root.left);
    const right = solve(root.right);
    return COMBINE(left, right, root.val);
}
```

## Trace Through

```
Tree:    3
        / \
       9  20
         /  \
        15   7

Recursive:
solve(3)
  left  = solve(9)  → solve(null)=0, solve(null)=0 → max(0,0)+1 = 1
  right = solve(20) → solve(15)=1, solve(7)=1 → max(1,1)+1 = 2
  → max(1, 2) + 1 = 3 ✓
```

## Complexity

**Time: O(n)** — every node visited exactly once. No shortcut possible — you must reach every leaf.

**Space: O(h)** — both approaches use O(h) space (call stack or explicit stack). 
- Balanced tree: h = O(log n)
- Skewed tree (like a linked list): h = O(n)

## Submissions

- Iterative: https://leetcode.com/problems/maximum-depth-of-binary-tree/submissions/2047402777 — 3ms, 9.78th percentile
- Recursive: https://leetcode.com/problems/maximum-depth-of-binary-tree/submissions/2047403441 — 0ms, 100th percentile

## Open Questions

- None.
