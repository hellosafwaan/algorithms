# Session: Balanced Binary Tree (LC 110) — 2026-06-29

## What He Attempted

```js
function isBalanced(root) {
    if(root === null) return true;
    function dfs(node) {
        if(node === null) return 0;
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);
        if(leftHeight - rightHeight > 1) return false;
        return 1 + leftHeight + rightHeight;
    }    
};
```

First attempt mixed return types (number for height, boolean `false` for unbalanced). Also: height formula wrong (`left + right` instead of `max(left, right)`), imbalance check one-directional only, never called `dfs(root)` from the outer function.

## Where He Got Stuck

Articulated the confusion himself: "I'm confused on how to work with two different data types on recursion — one is to count the height, another is return and check for balanced." Once the sentinel contract was explained (`-1` means unbalanced, everything stays a number), he wrote correct code immediately.

## Mistakes Made

- Mixed return types (`false` + number) — needed sentinel concept explained
- Height = `1 + left + right` instead of `1 + Math.max(left, right)` — caught with one question
- Imbalance check only checked `left - right > 1`, not the other direction — caught himself after prompt
- Used `dfs(node)` (undefined variable) instead of `dfs(root)` — caught himself

## Key Insight

The sentinel pattern: return `-1` instead of mixing types. `dfs` contract = returns height if subtree is balanced, returns `-1` if anything below is unbalanced. Callers check for `-1` first and propagate it up immediately. Everything stays a number.

He also voluntarily tried the closure approach afterward — good initiative.

## Complexity Reached

Time: O(n) — every node visited once.
Space: O(h) — call stack depth equals tree height.

## Coach Notes for Next Session

- Sentinel pattern is new vocabulary — added to vocabulary.md. May resurface on LC 124 (Max Path Sum).
- Two-output pattern probe (diameter): he knew the direction ("best is for current node, return for parent") but couldn't explain *why* they're different values without a direct answer. The "branching path can't continue" explanation was needed. Not fully cold yet.
- Closure approach he tried: used `undefined` check instead of `-1`. Works but is fragile. Showed him the cleaner version (no type checking at all — just let `dfs` always return height, closure `balanced` already set). He understood.
- Cold redo queue is severely overdue. Hold him to it next session.
