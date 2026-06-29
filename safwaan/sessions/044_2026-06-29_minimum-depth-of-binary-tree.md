# Session: Minimum Depth of Binary Tree — 2026-06-29

## What He Attempted

```js
function minDepth(root) {
    if (root === null) return 0;
    const leftMinHeight = minDepth(root.left);
    const rightMinHeight = minDepth(root.right);
    minHeight = Math.min(leftMinHeight, rightMinHeight);
    return 1 + minHeight;
};
```

Correctly identified the recursive structure and base case. Applied `Math.min` to get the smaller subtree depth — but didn't account for the case where one child is null.

## Where He Got Stuck

Identified himself that something was wrong ("I'm doing something wrong here"). Traced `[1, 2]` (left-only tree) and worked through it: left returns 1, right returns 0, `Math.min(1, 0) = 0`, returns `1 + 0 = 1`. Correctly diagnosed: "Math.min breaks because 0 doesn't mean depth zero — it means no child." Needed a nudge on how to translate that diagnosis into code.

## Mistakes Made

None that weren't self-caught. Self-identified the bug before being asked, diagnosed the root cause correctly, then just needed to put it into code.

## Key Insight

`Math.min` gives the wrong answer when one subtree is missing because it interprets the `0` from a null child as a valid depth-zero path, when it actually means "no child here." If one side is 0, use the other side. If both are 0, you're at a leaf — returning `1 + 0` is correct.

## Complexity Reached

Time: O(n) — every node visited once.
Space: O(h) — call stack depth = tree height. O(log n) balanced, O(n) skewed.

## Coach Notes for Next Session

- Clean session. Minimal hints. Self-diagnosis was strong.
- Start next session with a cold redo from the revisit queue — severely overdue.
- Next tree problem: LC 572 (Subtree of Another Tree) — cold probe for sentinel pattern.
- Two-output pattern (LC 543 / LC 124) probe still open.
