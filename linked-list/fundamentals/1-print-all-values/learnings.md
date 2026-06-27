# Print All Values

## Problem

Write a function that takes in the head of a linked list and prints each value in the list, in order.

---

## Key Insight

The core traversal pattern for a linked list. Every linked list problem starts with this shape — walk from head to null, doing something at each node.

---

## Solutions

### Iterative

```js
function printLinkedList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next;
  }
}
```

Start at head, print, advance. Stop when you fall off the end.

### Recursive

```js
function printLinkedList(head) {
  if (head === null) return;
  console.log(head.val);
  printLinkedList(head.next);
}
```

Base case: `null` → stop. Print the current node's value, then recurse on `.next`.

---

## Trace Through

List: `A → B → C → null`

**Iterative:**
```
current = A  →  print A  →  current = B
current = B  →  print B  →  current = C
current = C  →  print C  →  current = null
current = null  →  exit loop
Output: A B C
```

**Recursive:**
```
printLinkedList(A)
  A !== null → print A → call printLinkedList(B)
    B !== null → print B → call printLinkedList(C)
      C !== null → print C → call printLinkedList(null)
        null → return          ← base case
      ← returns
    ← returns
  ← returns
Output: A B C
```

---

## Watch Out For

- The base case is `null`, not the last node. You're checking *after* you've moved past the last real node.
- Advancing with `current = current.next` must happen *after* you use `current` — not before.

---

## Complexity

- **Time: O(n)** — every node visited once
- **Space: O(1)** iterative, **O(n)** recursive (one call frame per node on the stack)
