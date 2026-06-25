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

// Build a list manually
const a = new Node('A');
const b = new Node('B');
a.next = b;
// A -> B -> null
```

You only ever hold a reference to the **head** (first node). Everything else is accessed by following `.next` pointers. There's no index — you can't jump to position 3, you have to walk there.

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

Start at head. Do work. Advance. Stop when you fall off the end (`null`).

### Recursive

```js
function traverse(head) {
  if (head === null) return; // base case: fell off the end
  // do something with head.val
  traverse(head.next);       // recursive case: one step forward
}
```

Same logic — the call stack just does the "advancing" for you. The base case (`null`) is the same termination condition as `current !== null` in the iterative version.

---

## Fundamentals Problems

### 1. Print All Values

**Iterative:** Walk with `current`, `console.log` each `.val`.

**Recursive:** Log at the current node, recurse on `.next`. Base case: `null → return`.

```js
function printLinkedList(head) {
  if (head === null) return;
  console.log(head.val);
  printLinkedList(head.next);
}
```

---

### 2. Return All Values in a List

**Iterative:** Push `.val` into an array as you walk. Return the array.

**Recursive:** Can't return an accumulated array cleanly in the recursive call itself — use a **helper function** that carries the array as a parameter.

```js
function linkedListValues(head) {
  const result = [];
  fillResult(head, result);
  return result;
}

function fillResult(node, result) {
  if (node === null) return;
  result.push(node.val);
  fillResult(node.next, result);
}
```

The helper pattern (`fillResult`) is the standard way to carry extra state through a recursion when you can't return it up the call chain cleanly.

---

### 3. Sum Linked List

**Iterative:** Accumulate into a `sum` variable. Return after the loop.

**Recursive:** Base case is `null → 0` (empty list contributes nothing). Recursive case: `head.val + sumList(head.next)`. The call stack computes partial sums on the way back up.

```js
function sumList(head) {
  if (head === null) return 0;
  return head.val + sumList(head.next);
}
```

This is the cleanest recursive linked list pattern — value flows back up through return values, no helper needed.

---

### 4. Find Element in Linked List

**Iterative:** Check `.val === target` on each node. Return `true` immediately on match. Return `false` after the loop.

**Recursive:** Two base cases:
- `head === null` → target not found → return `false` (or `undefined`, which is falsy — but be explicit)
- `head.val === target` → found → return `true`

Recursive case: return the result of searching `.next`.

```js
function linkedListFind(head, target) {
  if (head === null) return false;
  if (head.val === target) return true;
  return linkedListFind(head.next, target);
}
```

> **Watch out:** `return;` with no value returns `undefined`, which is falsy. It works here because `false` and `undefined` are both falsy — but write `return false` explicitly. It's clearer and avoids surprising callers that check `=== false`.

---

### 5. Get Node Value at Index

**Iterative:** Walk with both `currentNode` and `currentIndex`. When index matches, return `.val`. Return `null` if you fall off the end (out-of-bounds).

**Recursive:** You can't track the index inside a single parameter — use a helper that carries `currentIndex` alongside the node.

```js
function getNodeValue(head, index) {
  return findValueAtIndex(head, 0, index);
}

function findValueAtIndex(node, currentIndex, targetIndex) {
  if (node === null) return null;           // out of bounds
  if (currentIndex === targetIndex) return node.val;
  return findValueAtIndex(node.next, currentIndex + 1, targetIndex);
}
```

Same helper pattern as problem 2 — any time recursion needs to carry extra state, add a parameter to the helper.

---

## Key Patterns Across All 5

| Situation | Approach |
|-----------|----------|
| Just traversing / accumulating | Iterative — cleaner, no risk of call stack overflow on long lists |
| Return value flows back up (sum, find) | Recursive with `return` — elegant, no helper needed |
| Need to carry extra state (array, index) | Recursive with a helper function |
| Need `null` as a meaningful "not found" return | Explicit `return null` — don't rely on implicit `undefined` |

---

## Time & Space

All 5 problems: **O(n) time** — every node is visited once.

- Iterative: **O(1) space** — just pointer variables, no call stack.
- Recursive: **O(n) space** — one stack frame per node. For very long lists, iterative is safer.

The recursive `sumList` / `linkedListFind` patterns are elegant but come with a hidden O(n) space cost that the iterative version avoids.
