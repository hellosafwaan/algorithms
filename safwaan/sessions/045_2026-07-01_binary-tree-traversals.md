# Session: Binary Tree Preorder/Inorder/Postorder Traversal — 2026-07-01

## What He Attempted

Safwaan solved all three traversals (LC 144 Preorder, LC 145 Postorder, LC 94 Inorder) independently, outside of a coached session, and brought working, accepted submissions (all 100th percentile runtime) to this session purely for logging/wrap-up. No live coaching occurred on these three.

## Where He Got Stuck

Nowhere reported. Asked directly how it felt and whether there were any mistakes — response was "It went all good."

## Mistakes Made

None reported.

## Key Insight

All three share the exact same recursive shape as the DFS depth/path problems already solved this phase (LC 104, 100, 226): null check → recurse left → recurse right → combine → return up. The only variable across all three is *where* `root.val` sits relative to `left` and `right` in the returned array:

- Preorder: `[root.val, ...left, ...right]`
- Inorder: `[...left, root.val, ...right]`
- Postorder: `[...left, ...right, root.val]`

## Complexity Reached

Time: O(n) — every node visited once.
Space: O(n) — recursion stack (O(h) call stack, but the concatenated result arrays also cost O(n) total across all recursive combines) plus O(n) output array.

## Coach Notes for Next Session

- These were self-solved, not coached — no mistake data to log, no hint count.
- Open carry-forward: he didn't explain the pre/in/post distinction in his own words this session (just confirmed "all good"). Worth a cold verbal check next time a traversal-adjacent problem comes up (LC 105 — Construct Tree from Preorder and Inorder is a natural spot).
- Confirms the base DFS combine pattern (established LC 104/100/226) is generalizing well to new output shapes without needing to be re-taught.
