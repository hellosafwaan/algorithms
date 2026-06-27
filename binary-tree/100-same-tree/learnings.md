# Same Tree (LC 100)

Session: [037_2026-06-27](../../safwaan/sessions/037_2026-06-27_same-tree.md)

## How It Felt

Struggled with base cases and the short-circuit bug. Clicked once traced through a concrete example.

## Key Insight

Check the current nodes first — handle null, then handle mismatched values. If this node passes, recurse into both subtrees. Only return true when every position in both trees agrees.

## Solution Walkthrough

So the first instinct — flatten both trees to arrays and compare — fails because it loses structure. `[1, 2, 3]` can come from different tree shapes depending on which side the nodes are on. You need to compare position by position, not just values.

The recursive approach does exactly that. At each call you're asking: "are these two nodes the same?" Three checks:

**1. Both null → return true.**
Both trees have nothing at this position — whether it's the left child of some node, or the right child. This fires many times throughout the traversal, once per null position, not just once at the very end. Both null = both trees agree here. This is the base case — no further recursion needed.

**2. One null, one not → return false.**
One tree has a node, the other doesn't. Different structure. Done.

**3. Values don't match → return false.**
Same position, different values. Done.

If all three checks pass, you still can't return true yet — you've only verified this one node. You need to verify the entire left subtree and the entire right subtree too. So you recurse:

```js
const isLeftSame = isSameTree(p.left, q.left);
const isRightSame = isSameTree(p.right, q.right);
return isLeftSame && isRightSame;
```

Only when both come back true do you return true.

```js
function isSameTree(p, q) {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;
    const isLeftSame = isSameTree(p.left, q.left);
    const isRightSame = isSameTree(p.right, q.right);
    return isLeftSame && isRightSame;
}
```

## Pattern Introduced

Recursive DFS — compare two trees simultaneously by walking them in lockstep.

## Watch Out For

**The short-circuit bug:**
```js
if (p.val !== q.val) return false;
if (p.val === q.val) return true;  // BUG — never reaches the recursive calls
```
Values matching at the current node is not sufficient to return true. You must still verify the subtrees. Remove the early `return true` and let it fall through to the recursive calls.

**The null crash:**
Without null guards, `isSameTree(null, null)` crashes on `null.val`. Always handle null before accessing any property.

## How to Think About Base Cases

Ask: "what is the simplest input that needs no further recursion?"

For tree problems, that's always a null node — there's nothing to recurse into. Then ask: "what should I return for it?"

Here: two nulls = trees agree at this position → `true`. One null = trees differ → `false`.

This is the same pattern as LC 104 where `null → return 0`. The null case is always the base case for tree recursion.

## How to Derive Time & Space Complexity for Recursive DFS

**Time — count how many nodes you visit:**
Each node in both trees is visited exactly once. If the trees have n nodes total, that's O(n). There's no way to do better — you must check every node to confirm they match.

Rule: any recursive DFS that visits every node once = O(n) time.

**Space — count how deep the call stack goes:**
Each recursive call adds one frame to the call stack. The deepest the stack ever gets = the height of the tree, because you go down one branch at a time before backtracking.

- Balanced tree: height = log n → O(log n) space
- Skewed tree (every node has one child, like a linked list): height = n → O(n) space

Rule: recursive DFS space = O(h) where h = tree height.

You don't store the whole tree in memory at once — just the current path from root to the node you're at. That's why it's h, not n.

## Trace Through

```
Tree 1:    1        Tree 2:    1
          / \                 / \
         2   3               2   3

isSameTree(1, 1)  → values match → recurse
  isSameTree(2, 2)  → values match → recurse
    isSameTree(null, null)  → both null → true
    isSameTree(null, null)  → both null → true
    return true && true → true
  isSameTree(3, 3)  → values match → recurse
    isSameTree(null, null)  → true
    isSameTree(null, null)  → true
    return true && true → true
  return true && true → true ✓
```

Structure mismatch case:
```
Tree 1:    1        Tree 2:    1
          /                     \
         2                       2

isSameTree(1, 1)  → values match → recurse
  isSameTree(2, null)  → one null → false  ← caught immediately
  return false ✓
```

## Complexity

**Time: O(n)** — every node visited exactly once. Must visit all nodes to confirm match.

**Space: O(h)** — call stack depth = tree height.
- Balanced: O(log n)
- Skewed: O(n)

## Submissions

https://leetcode.com/problems/same-tree/submissions/2047594312 — 0ms, 100th percentile

## Open Questions

- None.
