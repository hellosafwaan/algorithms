# Depth-First Values

## Problem

Write a function that takes in the root of a binary tree and returns an array containing all values of the tree in depth-first order (preorder: root, left, right).

---

## Key Insight

DFS goes deep before wide — it follows one branch all the way to the bottom before backtracking. The standard order is **preorder**: root → left subtree → right subtree. A stack (LIFO) naturally produces this order because the last thing pushed is the first thing processed.

---

## Solutions

### Iterative (Stack)

```js
const depthFirstValues = (root) => {
  if (root === null) return [];
  const stack = [root];
  const result = [];
  while (stack.length > 0) {
    const currentNode = stack.pop();
    result.push(currentNode.value);
    if (currentNode.right) stack.push(currentNode.right); // right first
    if (currentNode.left) stack.push(currentNode.left);   // left on top → popped first
  }
  return result;
};
```

**Why push right before left?** Stack is LIFO. Push right, then push left — left sits on top and gets popped first. This gives left-before-right order, matching the recursive preorder result.

### Recursive

```js
function depthFirstValues(root) {
  if (root === null) return [];
  const leftValues = depthFirstValues(root.left);
  const rightValues = depthFirstValues(root.right);
  return [root.value, ...leftValues, ...rightValues];
}
```

Base case: `null → []`. Each call returns its subtree's values. The spread assembles root → left → right.

> **Space note:** The spread operator creates new arrays at every level — O(n²) worst case on a skewed tree. For large inputs, prefer a helper that pushes into a shared array. The spread version is fine for interviews.

---

## Trace Through

```
Tree:      a
          / \
         b   c
        / \
       d   e
```

**Iterative:**
- stack: [a] → pop a → result: [a] → push c, push b → stack: [c, b]
- pop b → result: [a, b] → push e, push d → stack: [c, e, d]
- pop d → result: [a, b, d] → no children → stack: [c, e]
- pop e → result: [a, b, d, e] → no children → stack: [c]
- pop c → result: [a, b, d, e, c]

Result: `['a', 'b', 'd', 'e', 'c']` ✓

**Recursive:**
```
depthFirstValues(a)
  leftValues  = depthFirstValues(b)
    leftValues  = depthFirstValues(d)
      leftValues  = depthFirstValues(null)  →  []
      rightValues = depthFirstValues(null)  →  []
      return ['d']
    rightValues = depthFirstValues(e)
      leftValues  = depthFirstValues(null)  →  []
      rightValues = depthFirstValues(null)  →  []
      return ['e']
    return ['b', 'd', 'e']
  rightValues = depthFirstValues(c)
    leftValues  = depthFirstValues(null)  →  []
    rightValues = depthFirstValues(null)  →  []
    return ['c']
  return ['a', 'b', 'd', 'e', 'c']
```

The left subtree call on `b` runs **completely** before `c` is even touched — that's what makes it depth-first.

---

## Watch Out For

- Iterative: push **right before left**, not the other way. Reversing the push order reverses the output.
- Recursive: the call on `root.left` runs to completion before `root.right` is even called — the call stack enforces DFS naturally.

---

## Complexity

- **Time: O(n)** — every node visited once
- **Space: O(h)** — h = height of tree (stack/call stack holds one path at a time). O(log n) balanced, O(n) worst case (skewed tree)
