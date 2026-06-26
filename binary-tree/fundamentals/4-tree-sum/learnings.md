# Tree Sum

## Key Insight

Summing all nodes in a tree is the first problem where you see all three traversal approaches side by side — recursive DFS, iterative DFS, and iterative BFS — and they all work. The recursive version is the most natural. The critical rule for iterative: **add the value when you pop/dequeue, not when you push children.**

---

## Solutions

### Recursive DFS (cleanest)

```js
function treeSum(root) {
  if (root === null) return 0;
  return root.value + treeSum(root.left) + treeSum(root.right);
}
```

Base case: `null → 0` (no contribution). Each node returns its value plus whatever both subtrees sum to. The call stack accumulates everything on the way back up.

### Iterative DFS (Stack)

```js
const treeSum = (root) => {
  if (root === null) return 0;
  const stack = [root];
  let sum = 0;
  while (stack.length > 0) {
    const currentNode = stack.pop();
    sum += currentNode.value;            // ← add on pop
    if (currentNode.right) stack.push(currentNode.right);
    if (currentNode.left) stack.push(currentNode.left);
  }
  return sum;
};
```

Pop a node, add its value, push its children. Repeat.

### Iterative BFS (Queue)

```js
function treeSum(root) {
  if (root === null) return 0;
  const queue = [root];
  let sum = 0;
  while (queue.length > 0) {
    const currentNode = queue.shift();
    sum += currentNode.value;            // ← add on dequeue
    if (currentNode.left !== null) queue.push(currentNode.left);
    if (currentNode.right !== null) queue.push(currentNode.right);
  }
  return sum;                            // ← don't forget this
}
```

Same shape as BFS traversal — just accumulate instead of collecting into an array.

---

## Trace Through

```
Tree:      1
          / \
         2   3
        / \
       4   5
Expected sum: 15
```

**Recursive DFS:**
```
treeSum(1)
  = 1 + treeSum(2)                    + treeSum(3)
          = 2 + treeSum(4) + treeSum(5)    = 3 + treeSum(null) + treeSum(null)
                  = 4 + 0 + 0                   = 3 + 0 + 0
                  = 4                            = 3
                         = 5 + 0 + 0
                         = 5
          = 2 + 4 + 5 = 11
  = 1 + 11 + 3 = 15
```

**Iterative DFS (Stack):**
```
stack: [1],    sum = 0
pop 1  →  sum = 1   →  push 3, push 2  →  stack: [3, 2]
pop 2  →  sum = 3   →  push 5, push 4  →  stack: [3, 5, 4]
pop 4  →  sum = 7   →  no children     →  stack: [3, 5]
pop 5  →  sum = 12  →  no children     →  stack: [3]
pop 3  →  sum = 15  →  no children     →  stack: []
return 15
```

**Iterative BFS (Queue):**
```
queue: [1],    sum = 0
dequeue 1  →  sum = 1   →  enqueue 2, 3  →  queue: [2, 3]
dequeue 2  →  sum = 3   →  enqueue 4, 5  →  queue: [3, 4, 5]
dequeue 3  →  sum = 6   →  no children   →  queue: [4, 5]
dequeue 4  →  sum = 10  →  no children   →  queue: [5]
dequeue 5  →  sum = 15  →  no children   →  queue: []
return 15
```

---

## The Anti-Pattern — Adding on Push (and Why It Breaks)

This is the mistake made in the original iterative DFS. Instead of adding a node's value when it's popped, the value was added at the moment the child was pushed:

```js
// WRONG — adds value on push
while (stack.length > 0) {
  const currentNode = stack.pop();
  if (currentNode.left) {
    stack.push(currentNode.left);
    sum += currentNode.left.value; // add when pushing child
  }
  if (currentNode.right) {
    stack.push(currentNode.right);
    sum += currentNode.right.value; // add when pushing child
  }
}
```

This breaks in two ways:

**1. The root is never counted.** The root enters the stack as the starting value — it's never pushed as a child, so its value is never added. To paper over this, you'd have to initialise `sum = root.value` before the loop, which is now a special case that doesn't match the rest of the logic.

**2. The code doubles up.** You're writing push-and-add logic twice (once for left, once for right) instead of a single clean line at the top of the loop. Any time you're repeating the same pattern for left and right, that's a sign the processing belongs at the pop step, not the push step.

The same anti-pattern appears in BFS with `queue.shift()` — same fix, same reasoning.

**The rule:** Every node that enters the queue/stack will eventually leave it. Process (add the value) when it leaves — not when it arrives. That way you never need a special case for the root.

---

## Watch Out For

- **Process on pop/dequeue, not on push/enqueue.** Consistent rule: the node's value is handled when it leaves the structure, not when it enters. Every node leaves exactly once, so you never double-count or miss anything.
- **The root has no parent.** Any approach that adds values "when pushed as a child" will silently miss the root. That's the tell that you're using the anti-pattern.
- **Always `return` the accumulator** at the end of iterative functions. Easy to forget after adding a loop.

---

## Complexity

- **Time: O(n)** — every node visited once across all three approaches
- **Space:**
  - Recursive DFS: O(h) call stack
  - Iterative DFS: O(h) stack
  - Iterative BFS: O(w) queue
  - Where h = height, w = max width. Balanced tree: h = O(log n). Worst case: O(n).
