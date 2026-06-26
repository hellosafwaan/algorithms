# Linked List — Notes

## The Data Structure

A linked list is a chain of nodes. Each node holds a value and a pointer to the next node. The list ends when `next` is `null`.

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

You only ever hold a reference to the **head** (first node). There's no index — you can't jump to position 3, you have to walk there.

---

## The Two Traversal Templates

Every linked list problem starts with one of these two shapes.

### Iterative

```js
let current = head;
while (current !== null) {
  // do something with current.val
  current = current.next;
}
```

### Recursive

```js
function traverse(head) {
  if (head === null) return; // base case: fell off the end
  // do something with head.val
  traverse(head.next);       // recursive case: one step forward
}
```

Same logic — the call stack just does the "advancing" for you.

---

## When to Use a Helper Function

When recursion needs to carry extra state that the caller shouldn't have to supply, add a helper with an extra parameter.

| Situation | Helper needed? |
|-----------|---------------|
| Value flows back up through return (sum, find) | No |
| Accumulating into a shared array | Yes |
| Carrying a counter or index | Yes |

---

## Key Patterns

| Problem | Key Shape |
|---------|-----------|
| [Print all values](fundamentals/1-print-all-values/learnings.md) | Core traversal template |
| [Return all values](fundamentals/2-return-all-values-in-a-list/learnings.md) | Helper pattern — pass array as parameter |
| [Sum](fundamentals/3-sum-linked-list/learnings.md) | Value flows back up: `head.val + sumList(head.next)` |
| [Find element](fundamentals/4-find-element-in-linked-list/learnings.md) | Two base cases: `null → false`, match → `true` |
| [Get node at index](fundamentals/5-get-node-value/learnings.md) | Helper pattern — carry `currentIndex` as parameter |

---

## Time & Space

All traversals: **O(n) time** — every node visited once.

| Approach | Space |
|----------|-------|
| Iterative | O(1) — just pointer variables |
| Recursive | O(n) — one call frame per node |

For very long lists, prefer iterative — recursive has hidden O(n) space cost and risks stack overflow.
