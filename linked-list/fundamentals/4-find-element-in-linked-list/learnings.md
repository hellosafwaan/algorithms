# Find Element in Linked List

## Problem

Write a function that takes in the head of a linked list and a target value. The function should return `true` if the target value exists anywhere in the list, and `false` if it does not.

---

## Key Insight

First pattern where there are **two base cases** in the recursive version: one for "fell off the end without finding it" and one for "found it here." The recursive case passes the result up — whatever `.next` returns is what you return.

---

## Solutions

### Iterative

```js
function linkedListFind(head, target) {
  let current = head;
  while (current !== null) {
    if (current.val === target) return true;
    current = current.next;
  }
  return false;
}
```

Return `true` immediately on a match. Return `false` after the loop — only reached if nothing matched.

### Recursive

```js
function linkedListFind(head, target) {
  if (head === null) return false;
  if (head.val === target) return true;
  return linkedListFind(head.next, target);
}
```

Two base cases before the recursive call. The result propagates back up unchanged — if any frame returns `true`, every frame above it returns `true`.

---

## Trace Through

List: `A → B → C → null`

**Iterative — target found (`'C'`):**
```
current = A  →  A !== 'C'  →  current = B
current = B  →  B !== 'C'  →  current = C
current = C  →  C === 'C'  →  return true
```

**Iterative — target not found (`'Z'`):**
```
current = A  →  A !== 'Z'  →  current = B
current = B  →  B !== 'Z'  →  current = C
current = C  →  C !== 'Z'  →  current = null
current = null  →  exit loop  →  return false
```

**Recursive — target found (`'C'`):**
```
find(A, 'C')  →  A !== null, A !== 'C'  →  return find(B, 'C')
  find(B, 'C')  →  B !== null, B !== 'C'  →  return find(C, 'C')
    find(C, 'C')  →  C !== null, C === 'C'  →  return true
  ← return true
← return true
```

**Recursive — target not found (`'Z'`):**
```
find(A, 'Z')  →  A !== null, A !== 'Z'  →  return find(B, 'Z')
  find(B, 'Z')  →  B !== null, B !== 'Z'  →  return find(C, 'Z')
    find(C, 'Z')  →  C !== null, C !== 'Z'  →  return find(null, 'Z')
      find(null, 'Z')  →  null  →  return false    ← base case
    ← return false
  ← return false
← return false
```

---

## Watch Out For

- The original code had `return;` (no value) for the null base case — this returns `undefined`, which is falsy. It works here because `false` and `undefined` are both falsy, but write `return false` explicitly. Callers that check `=== false` would get unexpected results otherwise.
- Order matters: check `null` first, then check the value. If you check value first on a `null` node, `head.val` throws.

---

## Complexity

- **Time: O(n)** — worst case visits every node
- **Space: O(1)** iterative, **O(n)** recursive
