# Revisit Queue

Problems to redo cold — no looking at previous solutions. The goal is to confirm the pattern is retained, not just that you solved it once.

**Rule:** A problem moves to "Done" only when you can solve it cold without hints, in one attempt, with correct complexity analysis.

---

## Pending

| Problem | Pattern | First Solved | Revisit After | Status |
|---------|---------|-------------|---------------|--------|
| LC 20 — Valid Parentheses | Stack — Matching Brackets | 2026-07-15 | 2026-08-05 — standard fuse. Clean, self-written, no-bug solve; correctly and independently connected to the `befitting-brackets` fundamentals pattern without prompting, plus a fully correct unprompted own-words explanation at wrap-up. At redo, check whether the connection to the fundamentals pattern still surfaces unprompted. | ⏳ |
| LC 345 — Reverse Vowels of a String | Stack — Push/Pop Reversal | 2026-07-15 | 2026-08-05 — standard fuse. Clean, self-written, no-bug solve; correctly and independently connected to the `reverse-some-chars` fundamentals pattern without prompting. At redo, check whether the connection to the fundamentals pattern still surfaces unprompted, and whether the two-pointer alternative (more common for this specific problem) can also be produced. | ⏳ |
| LC 34 — Find First and Last Position of Element in Sorted Array | Binary Search — Leftmost/Rightmost Boundary (composed) | 2026-07-15 | 2026-07-29 ⚡ short fuse — self-composed from already-built fundamentals helpers, but declined the own-words explanation of the single-existence-check reasoning (asked for it to be written into notes instead — softer variant of the pattern, see patterns.md #69). At redo, require the explanation verbally before coding. | ⏳ |
| LC 69 — Sqrt(x) | Binary Search on Answer — round down (`return high`) | 2026-07-14 | 2026-07-28 ⚡ short fuse — video-assisted, declined own-words explanation of round-down logic AND declined the LC-986-style trace-recovery attempt. At redo, require the own-words explanation before coding. | ⏳ |
| LC 35 — Search Insert Position | Binary Search — round up (`return low`) | 2026-07-14 | 2026-07-28 ⚡ short fuse — video-assisted, same declined-ownership session as LC 69. At redo, require the own-words explanation before coding. | ⏳ |
| LC 704 — Binary Search | Binary Search — classic | 2026-07-14 | 2026-07-28 ⚡ short fuse — video-assisted, bundled with LC 35/69 same session. Code itself was clean/correct; fuse matches the other two for consistency. | ⏳ |
| LC 1672 — Richest Customer Wealth | Matrix — Row Sum Tracking | 2026-07-14 | 2026-08-04 — standard fuse. Trivial, clean, no-bug solve. | ⏳ |
| LC 28 — Find the Index of the First Occurrence in a String | String Matching — Brute Force | 2026-07-13 | 2026-08-03 — standard fuse. Clean, self-written, no-bug solve; complexity and edge case reasoned correctly. At redo, also attempt the KMP optimization (introduced conceptually this session but not yet implemented) if time allows. | ⏳ |
| LC 3169 — Count Days Without Meetings | Intervals — Classify-and-Merge + gap-summation | 2026-07-12 | 2026-07-19 ⚡ short fuse — video-assisted, ownership check declined entirely at wrap-up ("don't ask me these questions today"), unlike LC 986 where it was recovered in-session. Real debugging work happened mid-session (structural bugs found via trace, `-1` fix added independently), but the "why" was never verbalized. At redo, require the own-words explanation of the merge + gap-sum approach BEFORE coding, same protocol as LC 200. | ⏳ |
| LC 986 — Interval List Intersections | Two Pointers — two independent sorted lists | 2026-07-11 | 2026-07-25 ⚡ shorter fuse — video-assisted origin. Ownership was recovered in-session via direct trace (not left unresolved like LC 200), but the underlying "why" was never self-generated from scratch. At redo, require the own-words explanation of the exhausted-pointer rule BEFORE coding, same protocol as the LC 200 redo. | ⏳ |
| LC 252 — Meeting Rooms | Intervals — Classify-and-Merge Single Pass (reduced, overlap check only) | 2026-07-10 | 2026-07-31 — standard fuse. Fastest, cleanest Intervals solve yet — correct on first attempt, only the recurring const/let bug needed a prompt. At redo, check whether the simplified direct-index form comes back without needing to write the `current`/`next` version first. | ⏳ |
| LC 57 — Insert Interval | Intervals — Classify-and-Merge Single Pass | 2026-07-07 | 2026-07-28 — standard fuse. Fully self-derived the three cases and merge formula; only the one-time-push mechanism was given directly. At redo, check whether both implementation shapes (flag-gated, three-phase) come back, not just one. | ⏳ |
| LC 56 — Merge Intervals | Intervals — Classify-and-Merge Single Pass (sort first) | 2026-07-07 | 2026-07-28 — standard fuse. Strong transfer session — self-connected the missing-final-push bug to the identical LC 57 bug, and re-derived the loop-invariant reasoning in a new form. At redo, check whether "check if sorted first" happens unprompted this time. | ⏳ |
| LC 200 — Number of Islands | Graph DFS — Flood Fill (grid) | 2026-07-05 | 2026-07-19 ⚡ short fuse — video-assisted solve, own-words explanation skipped; require verbal walkthrough before coding | ⏳ |
| LC 130 — Surrounded Regions | Graph DFS — Region Decision (walk full region, decide after) | 2026-07-05 | 2026-07-26 — standard fuse, fully self-derived. At redo, also re-attempt Solution B (border-first flood) from scratch — he flagged that one as not yet owned | ⏳ |
| LC 997 — Find the Town Judge | Graph — In-degree/Out-degree Counting | 2026-07-05 | 2026-07-19 — slightly shorter fuse; session ran late (3am, third problem of the day), several answers given directly under fatigue rather than derived | ⏳ |
| LC 133 — Clone Graph | Graph Traversal — Clone-and-Reuse via Map | 2026-07-05 | 2026-07-26 — standard fuse, mostly self-driven with only mechanical nudges. At redo, attempt all three variants (recursive DFS, iterative BFS, iterative DFS) cold, not just one | ⏳ |
| LC 399 — Evaluate Division | Weighted Graph DFS — search + accumulate with sentinel | 2026-07-05 | 2026-07-19 — shorter fuse; graph modeling was fully self-derived, but the core DFS combining logic (sentinel + return-on-success) was given directly after real struggle, so that specific mechanism needs a true cold retest | ⏳ |
| LC 695 — Max Area of Island | Graph DFS — Flood Fill (accumulate area) | 2026-07-06 | 2026-07-27 — standard fuse. This one already served as a successful cold-transfer test of LC 200; treat this redo as confirming durability over time, not as first-time verification | ⏳ |
| LC 145 — Binary Tree Postorder Traversal | DFS — Traversal Order (left-right-root) | 2026-07-01 | 2026-07-22 | ⏳ |
| LC 94 — Binary Tree Inorder Traversal | DFS — Traversal Order (left-root-right) | 2026-07-01 | 2026-07-22 | ⏳ |
| LC 144 — Binary Tree Preorder Traversal | DFS — Traversal Order (root-left-right) | 2026-07-01 | 2026-07-22 | ⏳ |
| LC 111 — Minimum Depth of Binary Tree | DFS — null-child-aware minimum | 2026-06-29 | 2026-07-20 | ⏳ |
| LC 110 — Balanced Binary Tree | DFS + sentinel (-1) for early exit | 2026-06-29 | 2026-07-20 | ⏳ |
| LC 543 — Diameter of Binary Tree | DFS post-order + closure variable (two-output pattern) | 2026-06-28 | 2026-07-19 | ⏳ |
| LC 222 — Count Complete Tree Nodes | Complete tree shortcut O(log²n) | 2026-06-28 | 2026-07-19 | ⏳ |
| LC 112 — Path Sum | DFS iterative pairs + recursive subtract-down | 2026-06-28 | 2026-07-19 | ⏳ |
| LC 101 — Symmetric Tree | DFS recursive — cross-compare pairs | 2026-06-27 | 2026-07-18 | ⏳ |
| LC 226 — Invert Binary Tree | DFS pre-order recursive | 2026-06-27 | 2026-07-18 | ⏳ |
| LC 100 — Same Tree | DFS recursive lockstep | 2026-06-27 | 2026-07-18 | ⏳ |
| LC 104 — Maximum Depth of Binary Tree | DFS (iterative pairs + recursive) | 2026-06-27 | 2026-07-18 | ⏳ |
| LC 30 — Substring with Concatenation of All Words | Sliding Window — Fixed Size, word frequency maps | 2026-06-25 | 2026-07-16 | ⏳ |
| LC 209 — Minimum Size Subarray Sum | Sliding Window — Variable Size (minimize) | 2026-06-24 | 2026-07-15 | ⏳ |
| LC 190 — Reverse Bits | Bit Manipulation — Mask & Shift (build variant) | 2026-06-16 | 2026-07-07 | ⏳ |
| LC 136 — Single Number | XOR Self-Cancellation | 2026-06-16 | 2026-07-07 | ⏳ |
| LC 191 — Number of 1 Bits | Bit Manipulation — Mask & Shift | 2026-06-16 | 2026-07-07 | ⏳ |
| LC 128 — Longest Consecutive Sequence | Hash Set — Sequence Start Filter + Amortized Walk | 2026-06-15 | 2026-07-06 | ⏳ |
| LC 202 — Happy Number | Hash Set — Cycle Detection / Digit Extraction via Modulo | 2026-06-15 | 2026-07-06 | ⏳ |
| LC 219 — Contains Duplicate II | Hash Set — Sliding Window (Fixed Size) / HashMap — Last Seen Index | 2026-06-15 | 2026-07-06 | ⏳ |
| LC 290 — Word Pattern | Hash Map — Bijection (Two Maps) | 2026-06-15 | 2026-07-06 | ⏳ |
| LC 205 — Isomorphic Strings | Hash Map — Bijection (Two Maps) | 2026-06-15 | 2026-07-06 | ⏳ |
| LC 383 — Ransom Note | Hash Map — frequency counting (increment/decrement) | 2026-06-14 | 2026-07-05 | ⏳ |
| LC 3 — Longest Substring Without Repeating Characters | Sliding Window — HashMap + left pointer | 2026-06-14 | 2026-06-18 (Wednesday — cold redo planned) | ⏳ |
| LC 49 — Group Anagrams | Hash Map — sorted string as key | 2026-06-14 | 2026-07-05 | ⏳ |
| LC 242 — Valid Anagram | Hash Map — character frequency (two-map + one-map) | 2026-06-14 | 2026-07-05 | ⏳ |
| LC 42 — Trapping Rain Water (two-pointer only) | Two pointers — running max / bottleneck processing | 2026-06-09 | after interview (2026-06-20+) | ⚠️ deferred |
| LC 121 — Best Time to Buy and Sell Stock | Running min / single pass | 2026-06-13 | 2026-07-04 | ⏳ |
| LC 217 — Contains Duplicate | Hash Set — membership tracking | 2026-06-07 | 2026-06-28 | ⏳ |
| LC 50 — Pow(x, n) | Exponentiation by Squaring | 2026-06-07 | 2026-06-28 | ⏳ |
| LC 169 — Majority Element | Boyer-Moore Voting | 2026-06-07 | 2026-06-28 | ⏳ |
| LC 80 — Remove Duplicates from Sorted Array II | Two pointers — read/write, look-back | 2026-06-06 | 2026-06-27 | ⏳ |
| LC 26 — Remove Duplicates from Sorted Array | Two pointers — read/write | 2026-06-06 | 2026-06-27 | ⏳ |
| LC 27 — Remove Element | Two pointers — read/write + swap | 2026-06-06 | 2026-06-27 | ⏳ |
| LC 88 — Merge Sorted Array | Two pointers — fill backwards | 2026-06-05 | 2026-06-26 | ⏳ |
| LC 15 — 3Sum | Two pointers inside a loop (k-sum reduction) | 2026-06-04 | 2026-06-25 | ⏳ |
| LC 977 — Squares of a Sorted Array | Two pointers (both ends, fill backwards) | 2026-06-04 | 2026-06-25 | ⏳ |
| LC 11 — Container With Most Water | Two pointers (converge, greedy move shorter) | 2026-06-04 | 2026-06-25 | ⏳ |
| LC 167 — Two Sum II | Two pointers (converge, sorted guarantee) | 2026-06-03 | 2026-06-24 | ⏳ |
| LC 125 — Valid Palindrome | Two pointers + charCodeAt rewrite | 2026-06-03 | 2026-06-24 | ⏳ |
| LC 1 — Two Sum | Hash map / complement lookup | 2026-06-03 | 2026-06-24 | ⏳ |
| LC 31 — Next Permutation | Pivot + swap + two-pointer reverse | 2026-06-03 | 2026-06-24 | ⏳ |
| Fibonacci (memoized) | Top-down DP / Memoization | — | — | ⏳ |

## Done

| Problem | Pattern | Re-solved On | Notes |
|---------|---------|-------------|-------|
| — | — | — | — |

---

## How to Use

At the start of a session, check if any problems are past their revisit date. Pick one, attempt it cold, then check against your `learnings.md` for that problem.
