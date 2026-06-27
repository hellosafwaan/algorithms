# Session: Symmetric Tree (LC 101) — 2026-06-27

## What He Attempted

Needed explanation of what symmetric means first, then built the solution incrementally with guided questions.

```js
function isSymmetric(root) {
    function dfs(left, right) {
        if(left === null && right === null) return true;
        if(left === null || right === null) return false;
        if(left.val !== right.val) return false;
        const isOutsideSame = dfs(left.left, right.right);
        const isInsideSame = dfs(left.right, right.left);
        return isOutsideSame && isInsideSame;
    }
    return dfs(root.left, root.right);
};
```

## Where He Got Stuck

- Didn't know what symmetric meant — explained with a visual example
- Needed prompting to articulate which children pair with which (outside ↔ outside, inside ↔ inside)
- Once the pairing was clear, wrote the recursive calls correctly without further help

## Mistakes Made

None in the final code — arrived at the correct solution through guided questioning.

## Key Insight

Mirror means cross-compare: `left.left ↔ right.right` (outside pair) and `left.right ↔ right.left` (inside pair). This is the only difference from Same Tree.

## Complexity Reached

Time: O(n) — Space: O(h)

## Submissions

https://leetcode.com/problems/symmetric-tree/submissions/2047913603 — 0ms, 100th percentile

## Coach Notes for Next Session

- He independently asked how many other ways to solve it — good habit.
- Asked what the algorithms are called — BFS/DFS terminology is now on his radar.
- The Same Tree → Symmetric Tree connection is worth reinforcing cold next time.
- Next: LC 543 — Diameter of Binary Tree
