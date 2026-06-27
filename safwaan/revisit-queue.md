# Revisit Queue

Problems to redo cold — no looking at previous solutions. The goal is to confirm the pattern is retained, not just that you solved it once.

**Rule:** A problem moves to "Done" only when you can solve it cold without hints, in one attempt, with correct complexity analysis.

---

## Pending

| Problem | Pattern | First Solved | Revisit After | Status |
|---------|---------|-------------|---------------|--------|
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
