# Tree Min Value

## Key Insight

Find the minimum value in a tree. The iterative version tracks a running minimum as you traverse. The recursive version is cleaner — return `Infinity` for null nodes so they never win a `Math.min` comparison, and let the minimum bubble up through return values naturally. Same pattern as recursive tree sum.

---

## Solutions

### Iterative DFS (Stack)

```js
function treeMinValue(root) {
  let minValue = Infinity;
  const stack = [root];
  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (currentNode.val < minValue) minValue = currentNode.val;
    if (currentNode.left) stack.push(currentNode.left);
    if (currentNode.right) stack.push(currentNode.right);
  }
  return minValue;
}
```

Start with `Infinity` so any real value beats it. Update on every pop. Guard before pushing children.

### Recursive DFS (cleanest)

```js
function treeMinValue(root) {
  if (root === null) return Infinity;
  const leftMin = treeMinValue(root.left);
  const rightMin = treeMinValue(root.right);
  return Math.min(root.val, leftMin, rightMin);
}
```

Base case returns `Infinity` — a null node can never be the minimum, so it never interferes with `Math.min`. Each node returns the smallest value among itself, its left subtree, and its right subtree. The overall minimum bubbles up to the root call.

No helper needed, no parameter to carry — the same shape as recursive tree sum.

### Iterative BFS (Queue)

```js
function treeMinValue(root) {
  const queue = [root];
  let minValue = Infinity;
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode.val < minValue) minValue = currentNode.val;
    if (currentNode.left !== null) queue.push(currentNode.left);
    if (currentNode.right !== null) queue.push(currentNode.right);
  }
  return minValue;
}
```

Same shape as iterative DFS — just swap stack for queue. Order of traversal is different but the result is the same since you're checking every node either way.

---

## Mistakes Made

**1. Typo in function name across calls:**
```js
return findMindValue(root, minValue); // 'Mind' not 'Min'
```
Throws `ReferenceError` at runtime. Worth double-checking function names match exactly when using a helper.

**2. Missing `root.val` in the final `Math.min`:**
```js
// WRONG — current node itself might be the minimum
minValue = Math.min(leftMinValue, rightMinValue);
```
Only compared the two subtrees, skipped the current node's value. Fix: `Math.min(minValue, leftMin, rightMin)` — or in the clean version, `Math.min(root.val, leftMin, rightMin)`.

**3. Missing `return` on the last line of the helper:**
Computed the result but never returned it — function returned `undefined`.

---

## Trace Through

```
Tree:      5
          / \
         3   8
        / \
       1   4
Expected: 1
```

**Iterative DFS:**
```
stack: [5],  minValue = Infinity
pop 5  →  5 < Infinity  →  minValue = 5  →  push 8, push 3  →  stack: [8, 3]
pop 3  →  3 < 5         →  minValue = 3  →  push 4, push 1  →  stack: [8, 4, 1]
pop 1  →  1 < 3         →  minValue = 1  →  no children     →  stack: [8, 4]
pop 4  →  4 > 1         →  no change     →  no children     →  stack: [8]
pop 8  →  8 > 1         →  no change     →  no children     →  stack: []
return 1
```

**Recursive DFS:**
```
treeMinValue(5)
  leftMin  = treeMinValue(3)
    leftMin  = treeMinValue(1)
      leftMin  = treeMinValue(null)  →  Infinity
      rightMin = treeMinValue(null)  →  Infinity
      return Math.min(1, Infinity, Infinity)  →  1
    rightMin = treeMinValue(4)
      leftMin  = treeMinValue(null)  →  Infinity
      rightMin = treeMinValue(null)  →  Infinity
      return Math.min(4, Infinity, Infinity)  →  4
    return Math.min(3, 1, 4)  →  1
  rightMin = treeMinValue(8)
    leftMin  = treeMinValue(null)  →  Infinity
    rightMin = treeMinValue(null)  →  Infinity
    return Math.min(8, Infinity, Infinity)  →  8
  return Math.min(5, 1, 8)  →  1
```

---

## Complexity

All three approaches visit every node exactly once — you can't skip any node because the minimum could be anywhere.

**Time: O(n) for all three**

No shortcuts possible. Even if you find a very small number early, you can't know it's the global minimum without checking the rest of the tree.

**Space:**

| Approach | Space | Reasoning |
|----------|-------|-----------|
| Iterative DFS | O(h) | Stack holds at most one root-to-leaf path at a time. Balanced tree: O(log n). Skewed tree (all nodes on one side): O(n). |
| Recursive DFS | O(h) | Call stack depth equals the height of the tree — one frame per level. Same bounds as iterative DFS. |
| Iterative BFS | O(w) | Queue holds one full level at a time. w = max width of the tree. For a complete binary tree the bottom level has ~n/2 nodes, so worst case O(n). For a skewed tree, w = 1, so O(1). |

BFS uses more space than DFS on wide, shallow trees. DFS uses more space on tall, narrow trees. For most balanced trees, DFS is the safer choice on space.
