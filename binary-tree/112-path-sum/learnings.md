# Path Sum (LC 112)

Session: [040_2026-06-28](../../safwaan/sessions/040_2026-06-28_path-sum.md)

## How It Felt

Iterative came completely cold — direct transfer from max-root-to-leaf-path-sum. Recursive needed the "subtract as you go down" insight.

## Key Insight

Two mental models, same problem:
- **Iterative:** accumulate the sum on the way down, check at the leaf
- **Recursive:** subtract on the way down, check at the leaf when the remainder equals the leaf's value

## Solution Walkthrough

**The problem:** does any root-to-leaf path sum to `targetSum`?

---

### Iterative DFS (stack — accumulate up)

Same pattern as max-root-to-leaf-path-sum: push `[node, currentSum]` pairs so each branch carries its own running total independently. Check at leaf nodes only — that's when a complete root-to-leaf path is finished.

```js
function hasPathSum(root, targetSum) {
    if (!root) return false;
    const stack = [[root, root.val]];
    while (stack.length > 0) {
        const [node, sum] = stack.pop();
        if (!node.left && !node.right) {
            if (sum === targetSum) return true;
        }
        if (node.right) stack.push([node.right, sum + node.right.val]);
        if (node.left)  stack.push([node.left,  sum + node.left.val]);
    }
    return false;
}
```

Why push pairs? Because once you push both children, two different paths diverge — they can't share one `currentSum` variable. Each pair carries its own independent accumulated total.

---

### Recursive (subtract as you go down)

Instead of accumulating a sum, subtract each node's value from `targetSum` as you recurse. By the time you reach a leaf, `targetSum` has been reduced by every node on the path from root to here. If it equals the leaf's value, the entire path sums to the original target.

```js
function hasPathSum(root, targetSum) {
    if (root === null) return false;
    if (!root.left && !root.right) return targetSum === root.val;
    return hasPathSum(root.left,  targetSum - root.val)
        || hasPathSum(root.right, targetSum - root.val);
}
```

Walk through the logic:
- `root === null` → went past a leaf (or empty tree). No path. Return false.
- Leaf node → check if `targetSum === root.val`. If the path summed correctly, `targetSum` has been reduced by every ancestor, so it should equal exactly the leaf's value.
- Otherwise → subtract `root.val` from `targetSum` and recurse into both children. Return true if either side finds a path (`||`).

**Why `||` not `&&`?** You only need ONE valid path — not both sides. If the left path works, you're done.

**Trace through:**
```
Tree:         5           targetSum = 22
             / \
            4   8
           /   / \
          11  13   4
         / \        \
        7   2        1

hasPathSum(5, 22) → recurse with 22-5=17
  hasPathSum(4, 17) → recurse with 17-4=13
    hasPathSum(11, 13) → recurse with 13-11=2
      hasPathSum(7, 2) → leaf, 2 ≠ 7 → false
      hasPathSum(2, 2) → leaf, 2 === 2 → TRUE ✓
    left returned true → return true immediately
  left returned true → return true immediately
return true ✓
```

Path: 5 → 4 → 11 → 2 = 22 ✓

---

### BFS (queue — accumulate, not implemented this session)

Same as iterative DFS but use a queue (`shift`) instead of a stack (`pop`). Processes nodes level by level instead of depth-first. Same result.

```js
function hasPathSum(root, targetSum) {
    if (!root) return false;
    const queue = [[root, root.val]];
    while (queue.length > 0) {
        const [node, sum] = queue.shift();
        if (!node.left && !node.right && sum === targetSum) return true;
        if (node.left)  queue.push([node.left,  sum + node.left.val]);
        if (node.right) queue.push([node.right, sum + node.right.val]);
    }
    return false;
}
```

---

## Three Approaches Compared

| Approach | Structure | Order | Sum direction |
|----------|-----------|-------|---------------|
| Iterative DFS | Stack — `[node, sum]` pairs | Depth-first | Accumulate downward |
| Recursive | Call stack | Depth-first | Subtract downward |
| BFS | Queue — `[node, sum]` pairs | Level-by-level | Accumulate downward |

All three: O(n) time, O(h) space. Recursive is cleanest for interviews.

## Watch Out For

- **Check at leaves only** — not at every node. A path must go all the way from root to a leaf.
- **Push pairs in iterative** — a single shared sum variable breaks when branches diverge.
- **`||` not `&&`** in recursive — you need one valid path, not both.

## Complexity

**Time: O(n)** — every node visited once in the worst case (no matching path).

**Space: O(h)** — call stack or explicit stack depth equals tree height.
- Balanced: O(log n)
- Skewed: O(n)

## Submissions

- Iterative: https://leetcode.com/problems/path-sum/submissions/2048168163 — 6ms, 4.98th percentile
- Recursive: https://leetcode.com/problems/path-sum/submissions/2048204441 — 0ms, 100th percentile

## Open Questions

- BFS variant not implemented this session — try it cold next time.
