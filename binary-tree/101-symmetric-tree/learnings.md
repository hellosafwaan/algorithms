# Symmetric Tree (LC 101)

Session: [039_2026-06-27](../../safwaan/sessions/039_2026-06-27_symmetric-tree.md)

## How It Felt

Needed the concept explained visually first. Once the mirror pairing clicked, the code came together through guided questions.

## Key Insight

A tree is symmetric if the left and right subtrees are mirrors of each other. To check if two nodes mirror, you cross-compare their children: outside pair (`left.left ↔ right.right`) and inside pair (`left.right ↔ right.left`).

## Same Tree vs Symmetric Tree — The One Difference

These two problems share almost identical structure. The only difference is which children you pair when recursing:

| | Same Tree | Symmetric Tree |
|--|-----------|----------------|
| **Goal** | Are two trees identical? | Is one tree a mirror of itself? |
| **Entry call** | `dfs(p, q)` — two separate trees | `dfs(root.left, root.right)` — two halves of one tree |
| **Recurse left** | `dfs(p.left, q.left)` | `dfs(left.left, right.right)` — outside pair |
| **Recurse right** | `dfs(p.right, q.right)` | `dfs(left.right, right.left)` — inside pair |
| **Base cases** | Identical | Identical |

Same Tree pairs left-with-left and right-with-right (identical structure). Symmetric Tree pairs left.left with right.right and left.right with right.left (mirror structure). One line change in the recursion.

## Solution Walkthrough

**Why cross-compare?** Mirror means the left side of the left subtree should equal the right side of the right subtree — they're at the same distance from the axis of symmetry but on opposite ends. Pairing same-side (left.left ↔ right.left) would check for identical structure, not mirror structure.

**Recursive DFS:**

```js
function isSymmetric(root) {
    function dfs(left, right) {
        if (!left && !right) return true;   // both null = agree
        if (!left || !right) return false;  // one null = mismatch
        if (left.val !== right.val) return false;
        const isOutsideSame = dfs(left.left,  right.right); // outside pair
        const isInsideSame  = dfs(left.right, right.left);  // inside pair
        return isOutsideSame && isInsideSame;
    }
    return dfs(root.left, root.right);
}
```

**Iterative BFS (queue):**

Push pairs onto the queue. Always dequeue two nodes together and check them as a pair. Push the next pairs in the same cross order.

```js
function isSymmetric(root) {
    const queue = [root.left, root.right];
    while (queue.length > 0) {
        const left  = queue.shift();
        const right = queue.shift();
        if (!left && !right) continue;
        if (!left || !right) return false;
        if (left.val !== right.val) return false;
        queue.push(left.left,  right.right); // outside pair
        queue.push(left.right, right.left);  // inside pair
    }
    return true;
}
```

**Iterative DFS (stack):**

Same as BFS but `pop` instead of `shift`. Stack gives LIFO order (DFS), queue gives FIFO (BFS). Both work — the pairing rule is the same.

```js
function isSymmetric(root) {
    const stack = [root.left, root.right];
    while (stack.length > 0) {
        const right = stack.pop();
        const left  = stack.pop();
        if (!left && !right) continue;
        if (!left || !right) return false;
        if (left.val !== right.val) return false;
        stack.push(left.left,  right.right);
        stack.push(left.right, right.left);
    }
    return true;
}
```

For interviews, recursive DFS is cleanest. Know the iterative versions exist.

## Watch Out For

**Don't pair same-side** — `dfs(left.left, right.left)` checks identical, not mirror. You want `left.left ↔ right.right` and `left.right ↔ right.left`.

**Entry point** — call `dfs(root.left, root.right)`, not `dfs(root, root)`. You're comparing the two halves, not the root against itself.

## Trace Through

```
Tree:    1
        / \
       2   2
      / \ / \
     3  4 4  3

dfs(2, 2) → values match
  dfs(3, 3) → outside pair → values match
    dfs(null, null) → true
    dfs(null, null) → true
    return true
  dfs(4, 4) → inside pair → values match
    dfs(null, null) → true
    dfs(null, null) → true
    return true
  return true && true → true ✓

Not symmetric case:
Tree:    1
        / \
       2   2
        \   \
         3   3

dfs(2, 2) → values match
  dfs(null, 3) → one null → false ✗  ← caught immediately
```

## Complexity

**Time: O(n)** — every node visited once. Each node is part of exactly one pair check.

**Space: O(h)** — call stack depth = tree height. Balanced: O(log n). Skewed: O(n).
BFS space = O(w) — max width of the tree (queue holds one level of pairs).

## Submissions

https://leetcode.com/problems/symmetric-tree/submissions/2047913603 — 0ms, 100th percentile

## Open Questions

- None.
