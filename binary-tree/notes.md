# Binary Tree — Notes

## The Data Structure

A binary tree node has a value and two child pointers: `left` and `right`. Both start as `null`.

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

You hold a reference to the **root**. Everything else is reached by following `.left` / `.right`. Unlike a linked list, trees branch — so traversal order is a meaningful choice.

---

## DFS vs BFS — The Core Choice

| | DFS | BFS |
|---|---|---|
| **Goes** | Deep before wide (one branch at a time) | Wide before deep (level by level) |
| **Data structure** | Stack (LIFO) | Queue (FIFO) |
| **Iterative tool** | `push` / `pop` | `push` / `shift` |
| **Recursive?** | Yes — call stack IS a stack | Not practical — call stack is LIFO, BFS needs FIFO |

---

## Key Patterns

| Problem | Key Shape |
|---------|-----------|
| [Depth-first values](fundamentals/2-depth-first-values/learnings.md) | Stack — push right before left so left is popped first |
| [Breadth-first values](fundamentals/3-breadth-first-values/learnings.md) | Queue — push left before right, dequeue with `shift` |
| [Tree sum](fundamentals/4-tree-sum/learnings.md) | Add on pop/dequeue, not on push. All three traversals work. |

---

## Critical Rule for Iterative Accumulation

**Add a node's value when you pop/dequeue it — not when you push it as a child.**

If you add on push, the root is never counted (it was never pushed as a child).

---

## Time & Space

All traversals: **O(n) time** — every node visited once.

| Approach | Space |
|----------|-------|
| Iterative DFS | O(h) — h = tree height (stack holds one path) |
| Recursive DFS | O(h) — same, but it's the call stack |
| BFS | O(w) — w = max width (queue holds one level) |

Balanced tree: h = O(log n). Skewed tree: h = O(n). BFS worst case: O(n) at the bottom level.

> **`shift` caveat:** `Array.shift()` is O(n) — it re-indexes the whole array. Fine for interviews. For production use a proper queue with a head pointer.


---

## DFS Post-order with Closure Variable

**When you need two outputs from one function:** a return value for the parent AND a global best tracked across all calls.

```js
let best = 0;
function dfs(node) {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    best = Math.max(best, left + right);   // ← side-effect: global tracker
    return 1 + Math.max(left, right);       // ← return value: for parent only
}
```

**The two things are different:**
- `left + right` = longest path through this node (diameter candidate) → update `best`
- `1 + max(left, right)` = longest single arm downward → return to parent

Seen in: LC 543 (Diameter), LC 124 (Max Path Sum — harder variant).
