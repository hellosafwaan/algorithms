# LC 110 — Balanced Binary Tree

Session: [043_2026-06-29_balanced-binary-tree](../../safwaan/sessions/043_2026-06-29_balanced-binary-tree.md)

## How It Felt

Moderate. The structure came quickly (DFS, check at every node), but mixing return types (number for height, boolean for unbalanced) created confusion. Once the sentinel contract was named, the rest wrote itself. Voluntarily tried the closure approach afterward — clean extra rep.

## Key Insight

You can't return two different types from one function without causing problems downstream. The fix: return `-1` as a **sentinel** — a special number that means "unbalanced." Everything stays a number. Callers just check for `-1` first.

## Solution Walkthrough

The fundamental property of a balanced tree: at every single node, the height difference between left and right subtrees is at most 1. Not just the root — *every* node.

So the question becomes: can you check this for every node without visiting each node multiple times?

Yes — by writing a `dfs` that does double duty. For each node it visits, it needs to:
1. Know the height of the left subtree
2. Know the height of the right subtree
3. Check if the difference is more than 1
4. Report back to its parent

The problem is step 4. The parent needs a height (a number), but you also want to signal "something below is broken" — and that's a different kind of information.

The solution: **sentinel value**. Make `-1` mean "unbalanced." It's a number, so the types don't mix. Any caller that receives `-1` knows the tree is already broken and propagates it up immediately without doing any more work.

The full `dfs` contract:
- Returns the height of the subtree if balanced
- Returns `-1` if anything in the subtree is unbalanced

Three checks in order:
```js
// 1. Propagate -1 up — if a child is already broken, we're broken
if (leftHeight === -1 || rightHeight === -1) return -1;

// 2. Check balance at this node
if (Math.abs(leftHeight - rightHeight) > 1) return -1;

// 3. Return actual height to parent
return 1 + Math.max(leftHeight, rightHeight);
```

Note: `Math.abs` handles both directions. `left - right > 1` alone misses the case where right is taller.

Height formula: `1 + Math.max(left, right)` — the tallest path down from this node. It's `max`, not `left + right`. Adding both arms gives the total path length *through* this node, which is the diameter (LC 543), not the height.

The outer function:
```js
if (dfs(root) === -1) return false;
return true;
```

## Pattern Introduced

**Sentinel value** — smuggling a flag into a return that has a fixed type. `-1` means "something failed below." Propagate it up immediately.

See also: LC 543 used a closure variable for a similar "two outputs" problem. Both patterns solve the same tension (one function, multiple kinds of information to communicate) in different ways. Sentinel keeps everything in the return. Closure uses a side-effect.

## Watch Out For

- `Math.abs` on the difference — checking only `left - right > 1` misses when right is taller
- Height = `1 + Math.max(left, right)`, not `1 + left + right` (that's diameter)
- Propagate `-1` *before* the balance check — if a child returned `-1`, skip the Math.abs check entirely

## Template

```js
function isBalanced(root) {
    if (root === null) return true;
    function dfs(node) {
        if (node === null) return 0;
        const left = dfs(node.left);
        const right = dfs(node.right);
        if (left === -1 || right === -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
    return dfs(root) !== -1;
}
```

## Trace Through

```
Tree:     3
         / \
        9  20
           / \
          15   7

dfs(9)  → left=0, right=0, |0-0|=0 ✓, return 1
dfs(15) → left=0, right=0, return 1
dfs(7)  → left=0, right=0, return 1
dfs(20) → left=1, right=1, |1-1|=0 ✓, return 2
dfs(3)  → left=1, right=2, |1-2|=1 ✓, return 3
outer   → 3 !== -1 → true
```

Unbalanced case:
```
Tree:     1
         /
        2
       /
      3

dfs(3) → return 1
dfs(2) → left=1, right=0, |1-0|=1 ✓, return 2
dfs(1) → left=2, right=0, |2-0|=2 > 1 → return -1
outer  → -1 → false
```

## Complexity

**Time: O(n)** — every node visited exactly once. Each `dfs` call does O(1) work.

**Space: O(h)** — the call stack holds one path from root to the current node. For a balanced tree, h = O(log n). For a skewed tree (linked list shape), h = O(n).

## Submissions

- 2026-06-29: 83rd percentile runtime, 88th percentile memory — https://leetcode.com/problems/balanced-binary-tree/submissions/2049275311

## Open Questions

- How would you solve this iteratively? (Would need a stack and two passes — one to compute heights bottom-up, one to check balance. More complex than the recursive version.)
- LC 124 (Binary Tree Maximum Path Sum) uses the same closure-variable pattern as LC 543 but is harder — the "path" can go through any node, and path values can be negative.
