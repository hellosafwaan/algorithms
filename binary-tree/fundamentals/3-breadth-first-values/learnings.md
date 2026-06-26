# Breadth-First Values

## Key Insight

BFS visits nodes level by level, left to right. It requires a **queue** (FIFO) — you process nodes in the order you discover them, and you discover them left-to-right per level. A stack would give you DFS, not BFS.

---

## Solution

### Iterative (Queue)

```js
function breadthFirstValues(root) {
  if (root === null) return [];
  const queue = [root];
  const result = [];
  while (queue.length > 0) {
    const currentNode = queue.shift(); // dequeue from front
    result.push(currentNode.value);
    if (currentNode.left !== null) queue.push(currentNode.left);
    if (currentNode.right !== null) queue.push(currentNode.right);
  }
  return result;
}
```

Start with the root in the queue. Each iteration: dequeue the front node, record it, enqueue its children (left before right). Children of level N are always enqueued before any node of level N+1 is dequeued.

### Recursive?

Not practical. BFS needs FIFO ordering, but the call stack is LIFO — the same data structure as a DFS stack. You could thread a queue through the recursive calls manually, but that's just the iterative approach written with extra overhead. Use the iterative version.

---

## Trace Through

```
Tree:      a
          / \
         b   c
        / \
       d   e
```

- queue: [a] → dequeue a → result: [a] → enqueue b, c → queue: [b, c]
- dequeue b → result: [a, b] → enqueue d, e → queue: [c, d, e]
- dequeue c → result: [a, b, c] → no children → queue: [d, e]
- dequeue d → result: [a, b, c, d] → no children → queue: [e]
- dequeue e → result: [a, b, c, d, e]

Result: `['a', 'b', 'c', 'd', 'e']` — level by level ✓

---

## Watch Out For

- `queue.shift()` is **O(n)** — it removes the first element and re-indexes the entire array. Fine for interviews. For production or large inputs, use a proper queue with a head pointer instead.
- Push children **left before right** — FIFO preserves that order, so left is processed before right within each level.

---

## DFS vs BFS at a Glance

| | DFS | BFS |
|---|---|---|
| Order | Deep first (one branch at a time) | Wide first (level by level) |
| Data structure | Stack (LIFO) | Queue (FIFO) |
| JS tool | `push` / `pop` | `push` / `shift` |
| Recursive? | Yes — naturally | No — not practical |

---

## Complexity

- **Time: O(n)** — every node visited once
- **Space: O(w)** — w = max width of the tree (queue holds one full level at a time). Worst case O(n) at the bottom level of a complete tree.
