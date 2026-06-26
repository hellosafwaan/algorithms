# Get Node Value at Index

## Key Insight

First problem where you need to **carry extra state through recursion** — the current index — alongside the node. Same situation as problem 2 (return all values), but instead of mutating an array, you pass the index as a parameter to a helper. Returns `null` for out-of-bounds (index past the end of the list).

---

## Solutions

### Iterative

```js
function getNodeValue(head, index) {
  let currentIndex = 0;
  let currentNode = head;
  while (currentNode !== null) {
    if (currentIndex === index) return currentNode.val;
    currentNode = currentNode.next;
    currentIndex++;
  }
  return null;
}
```

Walk and count simultaneously. Return immediately when index matches. Return `null` if you exhaust the list.

### Recursive (helper pattern)

```js
function getNodeValue(head, index) {
  return findValueAtIndex(head, 0, index);
}

function findValueAtIndex(node, currentIndex, targetIndex) {
  if (node === null) return null;
  if (currentIndex === targetIndex) return node.val;
  return findValueAtIndex(node.next, currentIndex + 1, targetIndex);
}
```

The helper carries `currentIndex` forward on each call. Two base cases: out of bounds (`null`) and found (`currentIndex === targetIndex`). The found result propagates back up unchanged.

---

## Trace Through

List: `A → B → C → null`, target index = 2

**Iterative:**
```
currentIndex = 0, currentNode = A
  0 !== 2  →  currentNode = B, currentIndex = 1
  1 !== 2  →  currentNode = C, currentIndex = 2
  2 === 2  →  return 'C'
```

**Recursive:**
```
getNodeValue(A, 2)  →  findValueAtIndex(A, 0, 2)
  A !== null, 0 !== 2  →  findValueAtIndex(B, 1, 2)
    B !== null, 1 !== 2  →  findValueAtIndex(C, 2, 2)
      C !== null, 2 === 2  →  return 'C'    ← found
    ← return 'C'
  ← return 'C'
```

**Recursive — out of bounds (index = 5):**
```
findValueAtIndex(A, 0, 5)
  findValueAtIndex(B, 1, 5)
    findValueAtIndex(C, 2, 5)
      findValueAtIndex(null, 3, 5)
        null  →  return null    ← base case, fell off the end
      ← return null
    ← return null
  ← return null
```

---

## Watch Out For

- `currentIndex++` in the iterative version must happen *after* you advance the node pointer — both need to stay in sync.
- The recursive helper increments the index in the argument: `currentIndex + 1`. There's no mutation — a new value is passed into each call.

---

## When Helper Functions Are Needed

Use a helper when the recursive version needs extra parameters that the caller shouldn't have to supply. The outer function has the clean signature; the helper does the actual work with the extra state.

| Problem | Needs helper? | Why |
|---------|--------------|-----|
| Sum linked list | No | Return value flows up cleanly |
| Find element | No | Return value flows up cleanly |
| Return all values | Yes | Accumulating into a shared array |
| Get node at index | Yes | Carrying a counter |

---

## Complexity

- **Time: O(n)** — worst case visits every node
- **Space: O(1)** iterative, **O(n)** recursive
