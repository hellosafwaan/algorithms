# Session: Maximum Depth of Binary Tree (LC 104) — 2026-06-27

## What He Attempted

Both iterative and recursive from the start — directly transferred patterns from max-root-to-leaf-path-sum (fundamentals problem 7). No false starts.

```js
// Iterative
function maxDepth(root) {
    if(root === null) return 0;
    const stack = [[root, 1]];
    let max = -Infinity;
    while(stack.length > 0) {
        const [currentNode, currentMaxHeight] = stack.pop()
        if(currentNode.left === null && currentNode.right === null) {
            max = Math.max(max, currentMaxHeight);
        }
        if(currentNode.left !== null) stack.push([currentNode.left, currentMaxHeight + 1]);
        if(currentNode.right !== null) stack.push([currentNode.right, currentMaxHeight + 1]);
    }
    return max;
};

// Recursive
function maxDepth(root) {
    if(root === null) return 0;
    if(root.left === null && root.right === null) return 1;
    const leftHeight = maxDepth(root.left);
    const rightHeight = maxDepth(root.right);
    const max = Math.max(leftHeight, rightHeight);
    return 1 + max;
};
```

## Where He Got Stuck

Nowhere — clean cold solve on both approaches.

## Mistakes Made

None. The redundant leaf check in the recursive version (line 3) was noted — not wrong, just unnecessary since `null` base case handles it.

## Key Insight

Pattern transfer from max-root-to-leaf-path-sum: bundle depth alongside each node as a pair `[node, depth]` in the iterative version. Recursive version: ask each subtree for its max depth, take the bigger one, add 1 for the current node.

## Complexity Reached

**Time: O(n)** — both approaches visit every node once.

**Space: O(h)** — both approaches. h = height. O(log n) balanced, O(n) skewed.

## Submissions

- Iterative: https://leetcode.com/problems/maximum-depth-of-binary-tree/submissions/2047402777 — 3ms, 9.78th percentile
- Recursive: https://leetcode.com/problems/maximum-depth-of-binary-tree/submissions/2047403441 — 0ms, 100th percentile

## Coach Notes for Next Session

- Pattern transfer is working well — he connected this directly to fundamentals problem 7 without prompting.
- Introduced balanced vs skewed tree concept during complexity discussion — he hadn't heard these terms before. Worth reinforcing when BST problems come up.
- Focus this week: finish Linked List + Binary Tree by Saturday/Sunday. Skip revisit queue for now (deferred to next month).
- Next problem: LC 100 (Same Tree) — already has an untracked folder for it.
