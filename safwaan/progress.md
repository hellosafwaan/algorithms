# Safwaan — Progress

## Current Phase
**Phase 13 — Graphs (started 2026-07-05 with LC 200; graph fundamentals self-studied beforehand). Phase 9 — Trees still open (5/15 curriculum problems done, next: LC 572).**
Phase 2 complete as of 2026-06-09 (LC #42 done)
Returning from ~1 week break (SQL + interview prep). Interview was 2026-06-19.
⚠️ LC 42 two-pointer redo still deferred
⚠️ Multiple revisit-queue items overdue (LC 1, 125, 167, 31, 15, 977, 11, 88, 26, 27, 80) — probe one at next session start
Next up: LC 424 (Longest Repeating Character Replacement) — first Phase 3 curriculum problem not yet done. Also: cold redo from revisit queue is significantly overdue — must start next session with one.

For full curriculum and problem status → [TRACKER.md](../TRACKER.md)

---

## Recently Completed
- Surrounded Regions (LC #130) — 2026-07-05 — Phase 13, Graph DFS — Region Decision (walk full region via flood fill, decide safe/captured after, flip in a second pass). Self-derived almost entirely through Socratic tracing — strong contrast to LC 200 earlier the same day. Only two direct answers given (bounds-check direction fix, `r`/`c` typo), both after he explicitly asked. Also built and iterated a comparison visualiser against the border-first flood variant (Solution B); flagged himself that Solution B needs more understanding — open item.
- Number of Islands (LC #200) — 2026-07-05 — Phase 13 (first graphs problem), Graph DFS — Flood Fill on grid + visited Set. **Video-assisted solve** (learned approach from a video, flagged this himself — honest). Declined to explain solution in own words at wrap-up → recognized, not yet owned; short-fuse cold redo scheduled 2026-07-19. Key conceptual moment: believed 4 sequential recursive calls = BFS ("visiting all surrounding nodes"); corrected via call-stack trace table — first call runs to completion before second starts. Stack → DFS, queue → BFS.
- Binary Tree Preorder/Inorder/Postorder Traversal (LC #144, #94, #145) — 2026-07-01 — Phase 9 bonus (self-solved, brought pre-written solutions to session for wrap-up), DFS — Traversal Order, all three 100th percentile runtime, clean solves
- Minimum Depth of Binary Tree (LC #111) — 2026-06-29 — Phase 9 bonus, DFS null-child-aware minimum, 43rd percentile, self-diagnosed the Math.min null-child bug
- Balanced Binary Tree (LC #110) — 2026-06-29 — Phase 9, DFS + sentinel (-1) for early exit, 83rd percentile, needed sentinel concept explained; independently attempted closure variant after
- Diameter of Binary Tree (LC #543) — 2026-06-28 — Phase 9, DFS post-order + closure variable, 87th percentile, struggled with two-output distinction (return vs best update), unlocked via scaffold + visualizer
- Count Complete Tree Nodes (LC #222) — 2026-06-28 — Phase 9 bonus, O(n)×3 cold + O(log²n) guided, 100th percentile optimal
- Path Sum (LC #112) — 2026-06-28 — Phase 9 bonus, iterative DFS cold + recursive guided, 100th percentile recursive
- Symmetric Tree (LC #101) — 2026-06-27 — Phase 9 bonus, DFS recursive, 100th percentile, mirror pairing concept explained from scratch
- Invert Binary Tree (LC #226) — 2026-06-27 — Phase 9, DFS pre-order, 100th percentile, clean solve, traversal order discussion
- Same Tree (LC #100) — 2026-06-27 — Phase 9, DFS recursive lockstep, 100th percentile, base case reasoning unlocked via concrete trace
- Maximum Depth of Binary Tree (LC #104) — 2026-06-27 — Phase 9, DFS (iterative pairs + recursive), 100th percentile recursive, clean transfer from fundamentals
- Substring with Concatenation of All Words (LC #30) — 2026-06-25 — Phase 3 bonus, Sliding Window Fixed Size + word frequency map comparison, 41st percentile, guided solve — anagram instinct misapplied at start
- Minimum Size Subarray Sum (LC #209) — 2026-06-24 — Phase 3 bonus, Sliding Window Variable Size (minimize), 67th percentile, struggled with "add unconditionally" structure
- Reverse Bits (LC #190) — 2026-06-16 — Phase 18, Mask & Shift (build variant — shift `result` left then OR in bit, 32-iteration `for` loop, `>>>` for the consuming shift), 63rd percentile runtime, multiple guided bugs worked through (OR-before-shift order, `while(n!==0)` terminating too early, `n >> 1` vs `n >>> 1` sign-extension risk)
- Number of 1 Bits (LC #191) — 2026-06-16 — Phase 18, Mask & Shift (`n & 1` + `n = n >>> 1`), 100th percentile runtime, one toolkit misconception corrected (no decimal→binary conversion needed) plus one self-caught bug (missing shift assignment)
- Single Number (LC #136) — 2026-06-16 — Phase 18 (bonus pull-forward), XOR self-cancellation, 72nd percentile, clean first-attempt solve, no hints needed
- Longest Consecutive Sequence (LC #128) — 2026-06-15 — Phase 1 #9, Hash Set + sequence-start filter, 84th percentile (unclean) / clean rewrite
- Happy Number (LC #202) — 2026-06-15 — Phase 17 bonus, cycle detection (Hash Set) + digit extraction via `% 10` / `Math.floor`, 100th percentile
- Contains Duplicate II (LC #219) — 2026-06-15 — Hashmap sprint bonus, sliding window (Set) + HashMap (last seen index), 82nd percentile
- Word Pattern (LC #290) — 2026-06-15 — Hashmap sprint bonus, bijection (two maps), 100th percentile
- Isomorphic Strings (LC #205) — 2026-06-15 — Hashmap sprint bonus, bijection (two maps), 90th percentile
- Ransom Note (LC #383) — 2026-06-14 — Hashmap sprint bonus, frequency counting (increment/decrement), clean first-attempt solve
- Longest Substring Without Repeating Characters (LC #3) — 2026-06-14 — 27th percentile, Sliding Window (HashMap + left pointer), Phase 3
- Group Anagrams (LC #49) — 2026-06-14 — 45th percentile, sorted string as HashMap key, Phase 1 cleanup
- Valid Anagram (LC #242) — 2026-06-14 — two submissions (two-map + one-map), Phase 1 cleanup
- Best Time to Buy and Sell Stock (LC #121) — 2026-06-13 — 80th percentile, Running Min / Single Pass (Phase 3 start)
- Trapping Rain Water (LC #42) — 2026-06-09 — 100th percentile (two-pointer), Phase 2 final
- Contains Duplicate (LC #217) — 2026-06-07 — 65th percentile, Hash Set (Phase 1 cleanup)
- Pow(x, n) (LC #50) — 2026-06-07 — 100th percentile, Exponentiation by Squaring (detour into Phase 17)
- Majority Element (LC #169) — 2026-06-07 — 100th percentile, Boyer-Moore Voting (bonus problem, not NeetCode 150)
- Remove Duplicates from Sorted Array II (LC #80) — 2026-06-06 — 46th percentile, read/write with look-back
- Remove Duplicates from Sorted Array (LC #26) — 2026-06-06 — 100th percentile, read/write pointer
- Remove Element (LC #27) — 2026-06-06 — 100th percentile, swap + read/write pointer approaches
- Merge Sorted Array (LC #88) — 2026-06-05 — 100th percentile, two pointers fill backwards
- 3Sum (LC #15) — 2026-06-04 — 67th percentile, two pointers + k-sum reduction
- Container With Most Water (LC #11) — 2026-06-04
- Squares of a Sorted Array (LC #977) — 2026-06-04
- Two Sum II (LC #167) — 2026-06-03 — 100th percentile
- Valid Palindrome (LC #125) — 2026-06-03 — 5th percentile (charCodeAt rewrite pending)

---

## Concepts Mastered
- [x] Hash map / complement lookup
- [x] Two pointers — converging (sorted guarantee)
- [x] Two pointers — both ends, fill backwards
- [x] Two pointers — greedy move (Container With Most Water)
- [x] Two pointers inside a loop (k-sum reduction)
- [x] Right-to-left in-place update (Pascal's Triangle II)
- [x] Recursion: base case + recursive case + guaranteed progress
- [x] Memoization (top-down DP) — cache parameter, check, store
- [x] Cache correctness: `if(n in cache)` not `if(cache[n])`
- [ ] Two-pointer recursion with early termination
- [ ] Bottom-up DP (tabulation)
- [ ] Sliding Window (in progress — LC 121, LC 3 done)
- [ ] Stack / Monotonic Stack

---

## Phase 1 — Arrays & Hashing
3 problems need a redo (done before repo was set up, no solution on file):
- Contains Duplicate (LC #217)
- Valid Anagram (LC #242)
- Group Anagrams (LC #49)

These will be revisited when we loop back to Phase 1 cleanup.
