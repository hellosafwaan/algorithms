# Tree Includes

## Key Insight

Search for a target value anywhere in the tree. Return `true` if found, `false` if not. Works with any traversal — DFS or BFS — because you're checking every node regardless of order. The recursive version uses `||` to combine both subtree results: if left finds it, done; if not, try right.

---

## Solutions

### Iterative DFS (Stack)

```js
function treeIncludes(root, target) {
  if (root === null) return false;
  const stack = [root];
  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (currentNode.val === target) return true;
    if (currentNode.left) stack.push(currentNode.left);
    if (currentNode.right) stack.push(currentNode.right);
  }
  return false;
}
```

Check the node when it's popped. Return `true` immediately on a match. Guard before pushing children — never push `null` onto the stack.

### Recursive DFS

```js
function treeIncludes(root, target) {
  if (root === null) return false;
  if (root.val === target) return true;
  return treeIncludes(root.left, target) || treeIncludes(root.right, target);
}
```

Two base cases: null (not found) and match (found). The `||` tries left first — if left returns `true`, JS short-circuits and never evaluates the right call. If left returns `false`, right gets a chance.

### Iterative BFS (Queue)

```js
function treeIncludes(root, target) {
  if (root === null) return false;
  const queue = [root];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode.val === target) return true;
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  return false;
}
```

Same shape as the DFS iterative — just swap stack for queue (`pop` → `shift`). BFS finds the target faster if it's near the top of the tree; DFS is faster if it's near a leaf.

---

## Mistakes Made

**1. Pushing null onto the stack:**
```js
// WRONG
stack.push(currentNode.left);  // pushes null for leaf nodes
stack.push(currentNode.right);
```
Next iteration pops `null` as `currentNode` — then `currentNode.val` throws. Fix: always guard with `if (currentNode.left)` before pushing.

**2. Guarding recursive calls with null checks:**
```js
// WRONG
if (root.left !== null) return treeIncludes(root.left, target);
if (root.right !== null) return treeIncludes(root.right, target);
```
Two problems: if left exists, you `return` its result immediately — the right side is never reached even if left returns `false`. And if left is null, the guard skips the line entirely, falls through, and the function returns `undefined`. The base case `if (root === null) return false` already handles null — let the recursive call hit it naturally. No need to guard.

**3. Missing `return` on the recursive case:**
```js
// WRONG
treeIncludes(root.left, target) || treeIncludes(root.right, target);
```
Computes the result but discards it. Function returns `undefined`. Fix: `return treeIncludes(root.left, target) || treeIncludes(root.right, target)`.

---

## Trace Through

```
Tree:      a
          / \
         b   c
        / \
       d   e

target = 'e'
```

**Iterative DFS:**
```
stack: [a]
pop a  →  a !== 'e'  →  push c, push b  →  stack: [c, b]
pop b  →  b !== 'e'  →  push e, push d  →  stack: [c, e, d]
pop d  →  d !== 'e'  →  no children     →  stack: [c, e]
pop e  →  e === 'e'  →  return true
```

**Recursive DFS:**
```
treeIncludes(a, 'e')
  a !== 'e'  →  treeIncludes(b, 'e') || treeIncludes(c, 'e')
    treeIncludes(b, 'e')
      b !== 'e'  →  treeIncludes(d, 'e') || treeIncludes(e, 'e')
        treeIncludes(d, 'e')
          d !== 'e'  →  treeIncludes(null, 'e') || treeIncludes(null, 'e')
            false || false  →  false
        treeIncludes(e, 'e')
          e === 'e'  →  return true
        false || true  →  true
      ← return true
    ← true  (|| short-circuits, treeIncludes(c) never called)
  ← return true
```

**Iterative BFS:**
```
queue: [a]
dequeue a  →  a !== 'e'  →  enqueue b, c  →  queue: [b, c]
dequeue b  →  b !== 'e'  →  enqueue d, e  →  queue: [c, d, e]
dequeue c  →  c !== 'e'  →  no children   →  queue: [d, e]
dequeue d  →  d !== 'e'  →  no children   →  queue: [e]
dequeue e  →  e === 'e'  →  return true
```

---

## Complexity

- **Time: O(n)** — worst case visits every node (target not found)
- **Space:**
  - Iterative DFS: O(h) — stack holds one path
  - Recursive DFS: O(h) — call stack depth
  - Iterative BFS: O(w) — queue holds one level
