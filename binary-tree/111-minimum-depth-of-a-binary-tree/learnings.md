Session: [044_2026-06-29](../../safwaan/sessions/044_2026-06-29_minimum-depth-of-binary-tree.md)

## How It Felt

Clean. Identified the bug before being asked, diagnosed the root cause correctly ("I have to account only non-zero values"), just needed a nudge to translate that diagnosis into code. Compact problem that tests whether you understand what a null return value *means* in a recursive DFS.

## Key Insight

`Math.min` doesn't work naively here because a null child returns `0`, and `Math.min(anything, 0) = 0`. The problem is that `0` doesn't mean "depth zero" — it means "there is no child." You can't measure depth down a path that doesn't exist.

**The rule:** if one side returns 0 (no child), ignore it and use the other side. Only take `Math.min` when both sides are real.

## Solution Walkthrough

So the structure is the same as Max Depth — post-order DFS, ask both subtrees, combine, return up. The twist is in how you combine.

For Max Depth, `Math.max(left, right) + 1` is safe: a null child returns 0, and `max(something, 0)` correctly picks the real subtree.

For Min Depth, `Math.min(left, right) + 1` breaks: a null child returns 0, and `min(something, 0) = 0`, as if you found a depth-0 path to a "leaf" that doesn't exist.

The fix — handle the asymmetry explicitly:

```js
function minDepth(root) {
    if (root === null) return 0;
    const leftMinHeight = minDepth(root.left);
    const rightMinHeight = minDepth(root.right);
    if (leftMinHeight === 0) return 1 + rightMinHeight;
    if (rightMinHeight === 0) return 1 + leftMinHeight;
    return 1 + Math.min(leftMinHeight, rightMinHeight);
}
```

- `root === null` → 0 (no node, no depth)
- Left is 0 (no left child) → must go right
- Right is 0 (no right child) → must go left
- Both non-zero → take the shorter one
- Both zero (leaf node) → first `if` fires, returns `1 + 0 = 1` ✓

A slightly more compact version avoids the zero-check and uses the null check directly:

```js
if (!root.left) return 1 + minDepth(root.right);
if (!root.right) return 1 + minDepth(root.left);
return 1 + Math.min(minDepth(root.left), minDepth(root.right));
```

Same logic — if one side is null, skip it entirely and recurse down the other. If both exist, take the min. The explicit-zero version is more readable if you want to see why it works.

## Pattern Introduced

DFS Recursive — null-child-aware minimum. Variation on standard post-order depth accumulation. The asymmetry between Max and Min Depth is the core interview trap.

## Watch Out For

- `Math.min` without null-child handling — this is the entire problem
- Confusing with Max Depth — `Math.max` works fine there because null→0 + max is harmless; `Math.min` doesn't
- Leaf node case: both children null → both return 0 → first `if` fires → returns 1 ✓ (correct: leaf depth is 1)

## Template

```js
function minDepth(root) {
    if (root === null) return 0;
    const left = minDepth(root.left);
    const right = minDepth(root.right);
    if (left === 0) return 1 + right;
    if (right === 0) return 1 + left;
    return 1 + Math.min(left, right);
}
```

## Trace Through

```
    1
   /
  2
```

- `minDepth(2)`: left=0, right=0 → left===0 fires → return 1+0=1
- `minDepth(1)`: left=1, right=0 → right===0 fires → return 1+1=2 ✓

Without the fix: `Math.min(1, 0) = 0` → returns 1. Wrong — the shortest path to a *leaf* is depth 2.

## Complexity

**Time: O(n)** — every node visited once.

**Space: O(h)** — call stack depth equals tree height. O(log n) for a balanced tree, O(n) for a skewed tree.

## Submissions

- https://leetcode.com/problems/minimum-depth-of-binary-tree/submissions/2049828556 — 43rd percentile, 6ms

## Open Questions

- How would you solve this iteratively using a queue (BFS)? BFS would actually be more efficient in practice — it can short-circuit as soon as it finds the first leaf, without traversing the whole tree.
