# Max Root to Leaf Path Sum

## Key Insight

**Iterative:** A single `currentSum` variable breaks when the stack branches — two different paths can't share one number. The fix is to push the accumulated path sum *alongside* each node as a pair `[node, pathSum]`, so each branch carries its own independent sum.

**Recursive:** Return `-Infinity` for null so null nodes never win a `Math.max`. At a leaf, return `root.val`. Otherwise, pick the better subtree and add the current node's value on the way back up.

---

## Solutions

### Iterative DFS (Stack — pairs)

```js
function maxPathSum(root) {
  let max = -Infinity;
  const stack = [[root, root.val]];
  while (stack.length > 0) {
    const [currentNode, currentSum] = stack.pop();
    if (!currentNode.left && !currentNode.right) {
      max = Math.max(max, currentSum);
    }
    if (currentNode.left) stack.push([currentNode.left, currentSum + currentNode.left.val]);
    if (currentNode.right) stack.push([currentNode.right, currentSum + currentNode.right.val]);
  }
  return max;
}
```

Each stack entry is `[node, pathSumToThisNode]`. When pushing a child, compute its path sum right there: `currentSum + child.val`. The two branches never share state — each carries its own accumulated sum independently. Update max only at leaf nodes (no children), since that's when a root-to-leaf path is complete.

### Recursive DFS (cleanest)

```js
function maxPathSum(root) {
  if (root === null) return -Infinity;
  if (root.left === null && root.right === null) return root.val;
  const leftMax = maxPathSum(root.left);
  const rightMax = maxPathSum(root.right);
  return Math.max(leftMax, rightMax) + root.val;
}
```

- `null` → `-Infinity` — a null branch can never be the answer, so it never wins `Math.max`
- Leaf → `root.val` — base case for a complete path
- Otherwise → take the better subtree's max, add the current node's value on the way back up

The leaf check isn't strictly necessary (a leaf's two null children both return `-Infinity`, so `Math.max(-Infinity, -Infinity) + root.val` still gives `root.val`) — but it makes the intent explicit and short-circuits earlier.

---

## How the Iterative Thinking Evolved

You correctly identified the two variables needed (running max, actual max) and that the leaf node is when to update the actual max. The backtracking idea — subtract the current node's value after hitting a leaf — was also the right instinct. But it only works one level back.

Here's where it broke down:

**Attempt 1 & 3 — treating missing children as leaf conditions:**
```js
if (currentNode.left === null) {
  max = Math.max(currentSum, max);
  currentSum = 0;
}
```
This fires whenever *either* child is missing — not just at a true leaf. A node with only a right child would trigger this wrongly.

**Attempt 2 — updating max at every node:**
```js
max = Math.max(max, currentSum);
currentSum = 0;
```
This counts partial paths (root to any node) as candidates, not just root-to-leaf paths.

**Attempt 4 (closest) — correct leaf detection, backtrack by subtracting leaf value:**
```js
if (currentNode.left === null && currentNode.right === null) {
  max = Math.max(currentSum, max);
  currentSum -= currentNode.val;
}
```
Leaf detection is right. But subtracting only the leaf's value doesn't work when the stack switches branches — after backtracking one level, the next node popped might be on a completely different branch with a totally different path history. You'd need to subtract the entire path back to the fork, but the stack has no record of that.

**The key insight you were missing:** a single variable can't represent two different paths simultaneously. Once you push both children onto the stack, you have two diverging paths — but `currentSum` is one number. The solution is to stop sharing it: give each stack entry its own sum by pushing pairs `[node, sum]`.

---

## Trace Through

```
Tree:      5
          / \
         3   8
        /
       1
Paths: 5→3→1 = 9, 5→8 = 13
Expected: 13
```

**Iterative DFS:**
```
stack: [[5, 5]]
pop [5, 5]   →  not leaf  →  push [8, 13], push [3, 8]  →  stack: [[8,13],[3,8]]
pop [3, 8]   →  not leaf  →  push [1, 9]                →  stack: [[8,13],[1,9]]
pop [1, 9]   →  leaf      →  max = 9
pop [8, 13]  →  leaf      →  max = 13
return 13  ✓
```

**Recursive DFS:**
```
maxPathSum(5)
  leftMax  = maxPathSum(3)
    leftMax  = maxPathSum(1)
      → leaf → return 1
    rightMax = maxPathSum(null)  →  -Infinity
    return Math.max(1, -Infinity) + 3  →  4
  rightMax = maxPathSum(8)
    → leaf → return 8
  return Math.max(4, 8) + 5  →  13
```

---

## Mistakes Made

**1. Single `&` instead of `&&` in leaf check:**
```js
if (root.left === null & root.right === null) // bitwise AND — wrong
```
Use `&&` for logical AND.

**2. Null base case returning an object:**
```js
return { val: -Infinity, left: null, right: null }
```
`Math.max` on objects gives `NaN`. Return just `-Infinity`.

**3. Backtracking with a single variable in iterative DFS:**
Subtracting the leaf's value only undoes one step. When the stack switches to a different branch, `currentSum` still has the wrong value from the previous path. There's no way to know how far back to backtrack — the stack doesn't store that information.

---

## Complexity

**Time: O(n)** — every node visited exactly once across both approaches. No shortcuts — you must visit every leaf to find the max path.

**Space:**

| Approach | Space | Reasoning |
|----------|-------|-----------|
| Iterative DFS | O(h) | Stack holds at most one root-to-leaf path worth of pairs. h = tree height. |
| Recursive DFS | O(h) | Call stack depth equals the height of the tree. |

Balanced tree: O(log n). Skewed tree: O(n).
