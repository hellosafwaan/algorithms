# DSA Master Tracker

Last updated: 2026-07-06 (Max Area of Island)

## Pace
**Target:** 2 problems/day · 6 days/week · 12/week
**Start date:** 2026-06-01
**Target completion:** 2026-08-22 (~12 weeks)

---

## Summary
| Metric | Count |
|--------|-------|
| Total problems | 173 |
| ✅ Complete | 52 |
| ⚠️ Needs revisit | 1 |
| ⏳ Not started | 120 |

---

## Phase Overview
| # | Phase | Problems | Done | Target Date | Status |
|---|-------|----------|------|-------------|--------|
| 1 | Arrays & Hashing | 12 | 10 | 2026-06-05 | 🔄 In Progress |
| 2 | Two Pointers | 10 | 10 | 2026-06-02 | ✅ Complete |
| 3 | Sliding Window | 7 | 2 | 2026-06-08 | 🔄 In Progress |
| 4 | Stack | 7 | 0 | 2026-06-12 | ⏳ |
| 5 | Binary Search | 7 | 0 | 2026-06-16 | ⏳ |
| 6 | Linked List | 11 | 0 | 2026-06-22 | ⏳ |
| 7 | 1D Dynamic Programming | 12 | 0 | 2026-06-29 | ⏳ |
| 8 | 2D Dynamic Programming | 11 | 0 | 2026-07-05 | ⏳ |
| 9 | Trees | 15 | 5 | 2026-07-14 | 🔄 In Progress |
| 10 | Tries | 3 | 0 | 2026-07-16 | ⏳ |
| 11 | Heap / Priority Queue | 7 | 0 | 2026-07-20 | ⏳ |
| 12 | Backtracking | 9 | 0 | 2026-07-25 | ⏳ |
| 13 | Graphs | 15 | 6 | 2026-08-01 | 🔄 In Progress |
| 14 | Advanced Graphs | 6 | 0 | 2026-08-05 | ⏳ |
| 15 | Greedy | 8 | 0 | 2026-08-09 | ⏳ |
| 16 | Intervals | 6 | 0 | 2026-08-13 | ⏳ |
| 17 | Math & Geometry | 8 | 0 | 2026-08-17 | ⏳ |
| 18 | Bit Manipulation | 7 | 2 | 2026-08-22 | 🔄 In Progress |

---

## Phase 1 — Arrays & Hashing ⚠️
> Notes: [arrays/notes.md](arrays/notes.md)

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Two Sum | Easy | [#1](https://leetcode.com/problems/two-sum/) | Hash Map | ✅ | 2026-06-03 | [→](arrays/1-two-sum/learnings.md) |
| 2 | Contains Duplicate | Easy | [#217](https://leetcode.com/problems/contains-duplicate/) | Hash Set | ✅ | 2026-06-07 | [→](arrays/217-duplicate-elements/learnings.md) |
| 3 | Valid Anagram | Easy | [#242](https://leetcode.com/problems/valid-anagram/) | Hash Map — character frequency | ✅ | 2026-06-14 | [→](strings/242-anagram/learnings.md) |
| 4 | Group Anagrams | Medium | [#49](https://leetcode.com/problems/group-anagrams/) | Hash Map — sorted string as key | ✅ | 2026-06-14 | [→](strings/49-group-anagrams/learnings.md) |
| 5 | Top K Frequent Elements | Medium | [#347](https://leetcode.com/problems/top-k-frequent-elements/) | Heap / Bucket Sort | ✅ | pre-repo | — |
| 6 | Product of Array Except Self | Medium | [#238](https://leetcode.com/problems/product-of-array-except-self/) | Prefix / Suffix | ✅ | pre-repo | — |
| 7 | Valid Sudoku | Medium | [#36](https://leetcode.com/problems/valid-sudoku/) | Hash Set | ⏳ | — | — |
| 8 | Encode and Decode Strings | Medium | [#271](https://leetcode.com/problems/encode-and-decode-strings/) | String Encoding | ⏳ | — | — |
| 9 | Longest Consecutive Sequence | Medium | [#128](https://leetcode.com/problems/longest-consecutive-sequence/) | Hash Set — Sequence Start Filter | ✅ | 2026-06-15 | [→](arrays/128-longest-consecutive-sequence/learnings.md) |
| — | Ransom Note *(bonus — Hashmap sprint)* | Easy | [#383](https://leetcode.com/problems/ransom-note/) | Hash Map — frequency counting | ✅ | 2026-06-14 | [→](strings/383-ransom-note/learnings.md) |
| — | Isomorphic Strings *(bonus — Hashmap sprint)* | Easy | [#205](https://leetcode.com/problems/isomorphic-strings/) | Hash Map — Bijection (Two Maps) | ✅ | 2026-06-15 | [→](strings/205-isomorphic-string/learnings.md) |
| — | Word Pattern *(bonus — Hashmap sprint)* | Easy | [#290](https://leetcode.com/problems/word-pattern/) | Hash Map — Bijection (Two Maps) | ✅ | 2026-06-15 | [→](strings/290-word-pattern/learnings.md) |
| — | Contains Duplicate II *(bonus — Hashmap sprint)* | Easy | [#219](https://leetcode.com/problems/contains-duplicate-ii/) | Hash Set — Sliding Window / Hash Map — Last Seen Index | ✅ | 2026-06-15 | [→](arrays/219-contains-duplicate/learnings.md) |
| — | Pascal's Triangle *(bonus)* | Easy | [#118](https://leetcode.com/problems/pascals-triangle/) | 2D Array Construction | ✅ | 2026-06-03 | [→](arrays/118-pascal's-triangle/learnings.md) |
| — | Pascal's Triangle II *(bonus)* | Easy | [#119](https://leetcode.com/problems/pascals-triangle-ii/) | Right-to-left In-place Update | ✅ | 2026-06-03 | [→](arrays/119-pascal's-triangle-two/learnings.md) |

## Phase 2 — Two Pointers 🔄
> Notes: [arrays/notes.md](arrays/notes.md)

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Valid Palindrome | Easy | [#125](https://leetcode.com/problems/valid-palindrome/) | Two Pointers | ⚠️ Slow (5th pct) | 2026-06-03 | [→](strings/125-valid-palindrome/learnings.md) |
| 2 | Two Sum II | Medium | [#167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Two Pointers | ✅ 100th pct | 2026-06-03 | [→](arrays/two-sum-ii/learnings.md) |
| 3 | 3Sum | Medium | [#15](https://leetcode.com/problems/3sum/) | Two Pointers in Loop | ✅ 67th pct | 2026-06-04 | [→](arrays/15-three-sum/learnings.md) |
| 4 | Container With Most Water | Medium | [#11](https://leetcode.com/problems/container-with-most-water/) | Two Pointers | ✅ | 2026-06-04 | [→](arrays/11-container-with-most-water/learnings.md) |
| 5 | Merge Sorted Array | Easy | [#88](https://leetcode.com/problems/merge-sorted-array/) | Two Pointers (fill backwards) | ✅ 100th pct | 2026-06-05 | [→](arrays/88-merge-sorted-array/learnings.md) |
| 6 | Remove Element | Easy | [#27](https://leetcode.com/problems/remove-element/) | Two Pointers (read/write + swap) | ✅ 100th pct | 2026-06-06 | [→](arrays/27-remove-element/learnings.md) |
| 7 | Remove Duplicates from Sorted Array | Easy | [#26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Two Pointers | ✅ 100th pct | 2026-06-06 | [→](arrays/26-remove-duplicate-elements-in-a-sorted-array/learnings.md) |
| 8 | Remove Duplicates from Sorted Array II | Medium | [#80](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) | Two Pointers (read/write, look-back) | ✅ 46th pct | 2026-06-06 | [→](arrays/80-remove-duplicates-from-a-sorted-array/learnings.md) |
| 9 | Trapping Rain Water | Hard | [#42](https://leetcode.com/problems/trapping-rain-water/) | Prefix Max / Two Pointers | ✅ 100th pct | 2026-06-09 | [→](arrays/42-trapping-rain-water/learnings.md) |
| — | Next Permutation *(bonus)* | Medium | [#31](https://leetcode.com/problems/next-permutation/) | Pivot + Swap + Two-pointer Reverse | ✅ | 2026-06-03 | [→](arrays/31-next-permutation/learnings.md) |

## Phase 3 — Sliding Window ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Best Time to Buy and Sell Stock | Easy | [#121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Running Min / Single Pass | ✅ 80th pct | 2026-06-13 | [→](arrays/121-best-time-to-buy-and-sell-a-stock/learnings.md) |
| 2 | Longest Substring Without Repeating Characters | Medium | [#3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Sliding Window — HashMap + left pointer | ✅ 27th pct | 2026-06-14 | [→](strings/3-longest-substring-without-repeating-characters/learnings.md) |
| 3 | Longest Repeating Character Replacement | Medium | [#424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Sliding Window | ⏳ | — | — |
| 4 | Permutation in String | Medium | [#567](https://leetcode.com/problems/permutation-in-string/) | Sliding Window | ⏳ | — | — |
| 5 | Minimum Window Substring | Hard | [#76](https://leetcode.com/problems/minimum-window-substring/) | Sliding Window | ⏳ | — | — |
| 6 | Sliding Window Maximum | Hard | [#239](https://leetcode.com/problems/sliding-window-maximum/) | Sliding Window + Deque | ⏳ | — | — |
| — | Minimum Size Subarray Sum *(bonus)* | Medium | [#209](https://leetcode.com/problems/minimum-size-subarray-sum/) | Sliding Window — Variable Size (minimize) | ✅ 67th pct | 2026-06-24 | [→](sliding-window/209-minimum-size-subarray/learnings.md) |
| — | Substring with Concatenation of All Words *(bonus)* | Hard | [#30](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) | Sliding Window — Fixed Size, word frequency | ✅ 41st pct | 2026-06-25 | [→](sliding-window/30-substring-with-concatenation-of-all-words/learnings.md) |

## Phase 4 — Stack ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Valid Parentheses | Easy | [#20](https://leetcode.com/problems/valid-parentheses/) | Stack | ⏳ | — | — |
| 2 | Min Stack | Medium | [#155](https://leetcode.com/problems/min-stack/) | Stack | ⏳ | — | — |
| 3 | Evaluate Reverse Polish Notation | Medium | [#150](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Stack | ⏳ | — | — |
| 4 | Generate Parentheses | Medium | [#22](https://leetcode.com/problems/generate-parentheses/) | Backtracking / Stack | ⏳ | — | — |
| 5 | Daily Temperatures | Medium | [#739](https://leetcode.com/problems/daily-temperatures/) | Monotonic Stack | ⏳ | — | — |
| 6 | Car Fleet | Medium | [#853](https://leetcode.com/problems/car-fleet/) | Monotonic Stack | ⏳ | — | — |
| 7 | Largest Rectangle in Histogram | Hard | [#84](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Monotonic Stack | ⏳ | — | — |

## Phase 5 — Binary Search ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Binary Search | Easy | [#704](https://leetcode.com/problems/binary-search/) | Binary Search | ⏳ | — | — |
| 2 | Search a 2D Matrix | Medium | [#74](https://leetcode.com/problems/search-a-2d-matrix/) | Binary Search | ⏳ | — | — |
| 3 | Koko Eating Bananas | Medium | [#875](https://leetcode.com/problems/koko-eating-bananas/) | Binary Search on Answer | ⏳ | — | — |
| 4 | Find Minimum in Rotated Sorted Array | Medium | [#153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Binary Search | ⏳ | — | — |
| 5 | Search in Rotated Sorted Array | Medium | [#33](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Binary Search | ⏳ | — | — |
| 6 | Time Based Key-Value Store | Medium | [#981](https://leetcode.com/problems/time-based-key-value-store/) | Binary Search | ⏳ | — | — |
| 7 | Median of Two Sorted Arrays | Hard | [#4](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Binary Search | ⏳ | — | — |

## Phase 6 — Linked List ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Reverse Linked List | Easy | [#206](https://leetcode.com/problems/reverse-linked-list/) | Linked List | ⏳ | — | — |
| 2 | Merge Two Sorted Lists | Easy | [#21](https://leetcode.com/problems/merge-two-sorted-lists/) | Linked List | ⏳ | — | — |
| 3 | Linked List Cycle | Easy | [#141](https://leetcode.com/problems/linked-list-cycle/) | Fast / Slow Pointers | ⏳ | — | — |
| 4 | Reorder List | Medium | [#143](https://leetcode.com/problems/reorder-list/) | Linked List | ⏳ | — | — |
| 5 | Remove Nth Node From End | Medium | [#19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) | Two Pointers | ⏳ | — | — |
| 6 | Copy List with Random Pointer | Medium | [#138](https://leetcode.com/problems/copy-list-with-random-pointer/) | Hash Map | ⏳ | — | — |
| 7 | Add Two Numbers | Medium | [#2](https://leetcode.com/problems/add-two-numbers/) | Linked List | ⏳ | — | — |
| 8 | Find the Duplicate Number | Medium | [#287](https://leetcode.com/problems/find-the-duplicate-number/) | Fast / Slow Pointers | ⏳ | — | — |
| 9 | LRU Cache | Medium | [#146](https://leetcode.com/problems/lru-cache/) | Hash Map + DLL | ⏳ | — | — |
| 10 | Merge K Sorted Lists | Hard | [#23](https://leetcode.com/problems/merge-k-sorted-lists/) | Heap | ⏳ | — | — |
| 11 | Reverse Nodes in K-Group | Hard | [#25](https://leetcode.com/problems/reverse-nodes-in-k-group/) | Linked List | ⏳ | — | — |

## Phase 7 — 1D Dynamic Programming ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Climbing Stairs | Easy | [#70](https://leetcode.com/problems/climbing-stairs/) | DP — Linear Sequence | ⏳ | — | — |
| 2 | Min Cost Climbing Stairs | Easy | [#746](https://leetcode.com/problems/min-cost-climbing-stairs/) | DP — Linear Sequence | ⏳ | — | — |
| 3 | House Robber | Medium | [#198](https://leetcode.com/problems/house-robber/) | DP — 0/1 Choice | ⏳ | — | — |
| 4 | House Robber II | Medium | [#213](https://leetcode.com/problems/house-robber-ii/) | DP — 0/1 Choice | ⏳ | — | — |
| 5 | Longest Palindromic Substring | Medium | [#5](https://leetcode.com/problems/longest-palindromic-substring/) | DP | ⏳ | — | — |
| 6 | Palindromic Substrings | Medium | [#647](https://leetcode.com/problems/palindromic-substrings/) | DP | ⏳ | — | — |
| 7 | Decode Ways | Medium | [#91](https://leetcode.com/problems/decode-ways/) | DP | ⏳ | — | — |
| 8 | Coin Change | Medium | [#322](https://leetcode.com/problems/coin-change/) | DP — Choice | ⏳ | — | — |
| 9 | Maximum Product Subarray | Medium | [#152](https://leetcode.com/problems/maximum-product-subarray/) | DP | ⏳ | — | — |
| 10 | Word Break | Medium | [#139](https://leetcode.com/problems/word-break/) | DP | ⏳ | — | — |
| 11 | Longest Increasing Subsequence | Medium | [#300](https://leetcode.com/problems/longest-increasing-subsequence/) | DP | ⏳ | — | — |
| 12 | Partition Equal Subset Sum | Medium | [#416](https://leetcode.com/problems/partition-equal-subset-sum/) | DP — 0/1 Knapsack | ⏳ | — | — |

## Phase 8 — 2D Dynamic Programming ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Unique Paths | Medium | [#62](https://leetcode.com/problems/unique-paths/) | 2D DP | ⏳ | — | — |
| 2 | Longest Common Subsequence | Medium | [#1143](https://leetcode.com/problems/longest-common-subsequence/) | 2D DP | ⏳ | — | — |
| 3 | Best Time to Buy/Sell with Cooldown | Medium | [#309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | 2D DP | ⏳ | — | — |
| 4 | Coin Change II | Medium | [#518](https://leetcode.com/problems/coin-change-ii/) | 2D DP | ⏳ | — | — |
| 5 | Target Sum | Medium | [#494](https://leetcode.com/problems/target-sum/) | 2D DP | ⏳ | — | — |
| 6 | Interleaving String | Medium | [#97](https://leetcode.com/problems/interleaving-string/) | 2D DP | ⏳ | — | — |
| 7 | Edit Distance | Medium | [#72](https://leetcode.com/problems/edit-distance/) | 2D DP | ⏳ | — | — |
| 8 | Longest Increasing Path in Matrix | Hard | [#329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) | 2D DP + DFS | ⏳ | — | — |
| 9 | Distinct Subsequences | Hard | [#115](https://leetcode.com/problems/distinct-subsequences/) | 2D DP | ⏳ | — | — |
| 10 | Burst Balloons | Hard | [#312](https://leetcode.com/problems/burst-balloons/) | 2D DP | ⏳ | — | — |
| 11 | Regular Expression Matching | Hard | [#10](https://leetcode.com/problems/regular-expression-matching/) | 2D DP | ⏳ | — | — |

## Phase 9 — Trees ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Invert Binary Tree | Easy | [#226](https://leetcode.com/problems/invert-binary-tree/) | DFS | ✅ | 2026-06-27 | [learnings](binary-tree/226-invert-a-binary-tree/learnings.md) |
| 2 | Max Depth of Binary Tree | Easy | [#104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | DFS | ✅ | 2026-06-27 | [learnings](binary-tree/104-maximum-depth-of-binary-tree/learnings.md) |
| 3 | Diameter of Binary Tree | Easy | [#543](https://leetcode.com/problems/diameter-of-binary-tree/) | DFS — Post-order, closure variable | ✅ | 2026-06-28 | [learnings](binary-tree/543-diameter-of-a-binary-tree/learnings.md) |
| 4 | Balanced Binary Tree | Easy | [#110](https://leetcode.com/problems/balanced-binary-tree/) | DFS — Sentinel (-1) for early termination | ✅ | 2026-06-29 | [learnings](binary-tree/110-balanced-tree/learnings.md) |
| 5 | Same Tree | Easy | [#100](https://leetcode.com/problems/same-tree/) | DFS | ✅ | 2026-06-27 | [learnings](binary-tree/100-same-tree/learnings.md) |
| 6 | Subtree of Another Tree | Easy | [#572](https://leetcode.com/problems/subtree-of-another-tree/) | DFS | ⏳ | — | — |
| 7 | LCA of BST | Medium | [#235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | BST | ⏳ | — | — |
| 8 | Binary Tree Level Order Traversal | Medium | [#102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | BFS | ⏳ | — | — |
| 9 | Binary Tree Right Side View | Medium | [#199](https://leetcode.com/problems/binary-tree-right-side-view/) | BFS | ⏳ | — | — |
| 10 | Count Good Nodes in Binary Tree | Medium | [#1448](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) | DFS | ⏳ | — | — |
| 11 | Validate Binary Search Tree | Medium | [#98](https://leetcode.com/problems/validate-binary-search-tree/) | BST | ⏳ | — | — |
| 12 | Kth Smallest Element in BST | Medium | [#230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | BST | ⏳ | — | — |
| 13 | Construct Tree from Preorder and Inorder | Medium | [#105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | DFS | ⏳ | — | — |
| 14 | Binary Tree Maximum Path Sum | Hard | [#124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | DFS | ⏳ | — | — |
| 15 | Serialize and Deserialize Binary Tree | Hard | [#297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | BFS / DFS | ⏳ | — | — |
| *(bonus)* | Symmetric Tree | Easy | [#101](https://leetcode.com/problems/symmetric-tree/) | DFS | ✅ | 2026-06-27 | [learnings](binary-tree/101-symmetric-tree/learnings.md) |
| *(bonus)* | Path Sum | Easy | [#112](https://leetcode.com/problems/path-sum/) | DFS | ✅ | 2026-06-28 | [learnings](binary-tree/112-path-sum/learnings.md) |
| *(bonus)* | Count Complete Tree Nodes | Medium | [#222](https://leetcode.com/problems/count-complete-tree-nodes/) | DFS — Complete Tree Shortcut (O(log²n)) | ✅ | 2026-06-28 | [learnings](binary-tree/222-count-complete-tree-nodes/learnings.md) |
| *(bonus)* | Minimum Depth of Binary Tree | Easy | [#111](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | DFS — Null-child-aware minimum | ✅ | 2026-06-29 | [learnings](binary-tree/111-minimum-depth-of-a-binary-tree/learnings.md) |
| *(bonus)* | Binary Tree Preorder Traversal | Easy | [#144](https://leetcode.com/problems/binary-tree-preorder-traversal/) | DFS — Traversal Order (root-left-right) | ✅ 100th pct | 2026-07-01 | [learnings](binary-tree/144-binary-tree-preorder-traversal/learnings.md) |
| *(bonus)* | Binary Tree Inorder Traversal | Easy | [#94](https://leetcode.com/problems/binary-tree-inorder-traversal/) | DFS — Traversal Order (left-root-right) | ✅ 100th pct | 2026-07-01 | [learnings](binary-tree/94-binary-tree-inorder-traversal/learnings.md) |
| *(bonus)* | Binary Tree Postorder Traversal | Easy | [#145](https://leetcode.com/problems/binary-tree-postorder-traversal/) | DFS — Traversal Order (left-right-root) | ✅ 100th pct | 2026-07-01 | [learnings](binary-tree/145-binary-tree-postorder-traversal/learnings.md) |

## Phase 10 — Tries ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Implement Trie | Medium | [#208](https://leetcode.com/problems/implement-trie-prefix-tree/) | Trie | ⏳ | — | — |
| 2 | Design Add and Search Words | Medium | [#211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Trie | ⏳ | — | — |
| 3 | Word Search II | Hard | [#212](https://leetcode.com/problems/word-search-ii/) | Trie + Backtracking | ⏳ | — | — |

## Phase 11 — Heap / Priority Queue ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Kth Largest Element in a Stream | Easy | [#703](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Heap | ⏳ | — | — |
| 2 | Last Stone Weight | Easy | [#1046](https://leetcode.com/problems/last-stone-weight/) | Heap | ⏳ | — | — |
| 3 | K Closest Points to Origin | Medium | [#973](https://leetcode.com/problems/k-closest-points-to-origin/) | Heap | ⏳ | — | — |
| 4 | Kth Largest Element in an Array | Medium | [#215](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Heap | ⏳ | — | — |
| 5 | Task Scheduler | Medium | [#621](https://leetcode.com/problems/task-scheduler/) | Heap / Greedy | ⏳ | — | — |
| 6 | Design Twitter | Medium | [#355](https://leetcode.com/problems/design-twitter/) | Heap | ⏳ | — | — |
| 7 | Find Median from Data Stream | Hard | [#295](https://leetcode.com/problems/find-median-from-data-stream/) | Two Heaps | ⏳ | — | — |

## Phase 12 — Backtracking ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Subsets | Medium | [#78](https://leetcode.com/problems/subsets/) | Backtracking | ⏳ | — | — |
| 2 | Combination Sum | Medium | [#39](https://leetcode.com/problems/combination-sum/) | Backtracking | ⏳ | — | — |
| 3 | Permutations | Medium | [#46](https://leetcode.com/problems/permutations/) | Backtracking | ⏳ | — | — |
| 4 | Subsets II | Medium | [#90](https://leetcode.com/problems/subsets-ii/) | Backtracking | ⏳ | — | — |
| 5 | Combination Sum II | Medium | [#40](https://leetcode.com/problems/combination-sum-ii/) | Backtracking | ⏳ | — | — |
| 6 | Word Search | Medium | [#79](https://leetcode.com/problems/word-search/) | Backtracking | ⏳ | — | — |
| 7 | Palindrome Partitioning | Medium | [#131](https://leetcode.com/problems/palindrome-partitioning/) | Backtracking | ⏳ | — | — |
| 8 | Letter Combinations of Phone Number | Medium | [#17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Backtracking | ⏳ | — | — |
| 9 | N-Queens | Hard | [#51](https://leetcode.com/problems/n-queens/) | Backtracking | ⏳ | — | — |

## Phase 13 — Graphs ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Number of Islands | Medium | [#200](https://leetcode.com/problems/number-of-islands/) | DFS — Flood Fill (grid) | ✅ | 2026-07-05 | [→](graphs/200-number-of-islands/learnings.md) |
| 2 | Clone Graph | Medium | [#133](https://leetcode.com/problems/clone-graph/) | Graph Traversal — Clone-and-Reuse via Map | ✅ | 2026-07-05 | [→](graphs/133-clone-a-graph/learnings.md) |
| 3 | Max Area of Island | Medium | [#695](https://leetcode.com/problems/max-area-of-island/) | DFS — Flood Fill (accumulate area) | ✅ | 2026-07-06 | [→](graphs/695-max-area-of-island/learnings.md) |
| 4 | Pacific Atlantic Water Flow | Medium | [#417](https://leetcode.com/problems/pacific-atlantic-water-flow/) | BFS / DFS | ⏳ | — | — |
| 5 | Surrounded Regions | Medium | [#130](https://leetcode.com/problems/surrounded-regions/) | DFS — Region Decision (walk full region, decide after) | ✅ | 2026-07-05 | [→](graphs/130-surronded-regions/learnings.md) |
| 6 | Rotting Oranges | Medium | [#994](https://leetcode.com/problems/rotting-oranges/) | BFS | ⏳ | — | — |
| 7 | Walls and Gates | Medium | [#286](https://leetcode.com/problems/walls-and-gates/) | BFS | ⏳ | — | — |
| 8 | Course Schedule | Medium | [#207](https://leetcode.com/problems/course-schedule/) | Topological Sort | ⏳ | — | — |
| 9 | Course Schedule II | Medium | [#210](https://leetcode.com/problems/course-schedule-ii/) | Topological Sort | ⏳ | — | — |
| 10 | Redundant Connection | Medium | [#684](https://leetcode.com/problems/redundant-connection/) | Union Find | ⏳ | — | — |
| 11 | Number of Connected Components | Medium | [#323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) | Union Find | ⏳ | — | — |
| 12 | Graph Valid Tree | Medium | [#261](https://leetcode.com/problems/graph-valid-tree/) | Union Find | ⏳ | — | — |
| 13 | Word Ladder | Hard | [#127](https://leetcode.com/problems/word-ladder/) | BFS | ⏳ | — | — |
| *(bonus)* | Find the Town Judge | Easy | [#997](https://leetcode.com/problems/find-the-town-judge/) | Graph — In-degree / Out-degree Counting | ✅ | 2026-07-05 | [→](graphs/997-find-the-town-judge/learnings.md) |
| *(bonus)* | Evaluate Division | Medium | [#399](https://leetcode.com/problems/evaluate-division/) | Weighted Graph DFS | ✅ | 2026-07-05 | [→](graphs/399-evaluate-division/learnings.md) |

## Phase 14 — Advanced Graphs ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Min Cost to Connect All Points | Medium | [#1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Prim's / Kruskal's | ⏳ | — | — |
| 2 | Cheapest Flights Within K Stops | Medium | [#787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Bellman-Ford | ⏳ | — | — |
| 3 | Reconstruct Itinerary | Hard | [#332](https://leetcode.com/problems/reconstruct-itinerary/) | Eulerian Path | ⏳ | — | — |
| 4 | Swim in Rising Water | Hard | [#778](https://leetcode.com/problems/swim-in-rising-water/) | Dijkstra | ⏳ | — | — |
| 5 | Alien Dictionary | Hard | [#269](https://leetcode.com/problems/alien-dictionary/) | Topological Sort | ⏳ | — | — |
| 6 | Network Delay Time | Medium | [#743](https://leetcode.com/problems/network-delay-time/) | Dijkstra | ⏳ | — | — |

## Phase 15 — Greedy ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Maximum Subarray | Medium | [#53](https://leetcode.com/problems/maximum-subarray/) | Kadane's Algorithm | ⏳ | — | — |
| 2 | Jump Game | Medium | [#55](https://leetcode.com/problems/jump-game/) | Greedy | ⏳ | — | — |
| 3 | Jump Game II | Medium | [#45](https://leetcode.com/problems/jump-game-ii/) | Greedy | ⏳ | — | — |
| 4 | Gas Station | Medium | [#134](https://leetcode.com/problems/gas-station/) | Greedy | ⏳ | — | — |
| 5 | Hand of Straights | Medium | [#846](https://leetcode.com/problems/hand-of-straights/) | Greedy | ⏳ | — | — |
| 6 | Merge Triplets to Form Target | Medium | [#1899](https://leetcode.com/problems/merge-triplets-to-form-target-triplet/) | Greedy | ⏳ | — | — |
| 7 | Partition Labels | Medium | [#763](https://leetcode.com/problems/partition-labels/) | Greedy | ⏳ | — | — |
| 8 | Valid Parenthesis String | Medium | [#678](https://leetcode.com/problems/valid-parenthesis-string/) | Greedy | ⏳ | — | — |

## Phase 16 — Intervals ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Meeting Rooms | Easy | [#252](https://leetcode.com/problems/meeting-rooms/) | Intervals | ⏳ | — | — |
| 2 | Insert Interval | Medium | [#57](https://leetcode.com/problems/insert-interval/) | Intervals | ⏳ | — | — |
| 3 | Merge Intervals | Medium | [#56](https://leetcode.com/problems/merge-intervals/) | Intervals | ⏳ | — | — |
| 4 | Non-Overlapping Intervals | Medium | [#435](https://leetcode.com/problems/non-overlapping-intervals/) | Greedy | ⏳ | — | — |
| 5 | Meeting Rooms II | Medium | [#253](https://leetcode.com/problems/meeting-rooms-ii/) | Heap | ⏳ | — | — |
| 6 | Minimum Interval to Include Each Query | Hard | [#2402](https://leetcode.com/problems/minimum-interval-to-include-each-query/) | Heap | ⏳ | — | — |

## Phase 17 — Math & Geometry ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Happy Number | Easy | [#202](https://leetcode.com/problems/happy-number/) | Hash Set — Cycle Detection / Digit Extraction via Modulo | ✅ | 2026-06-15 | [→](strings/202-happy-number/learnings.md) |
| 2 | Plus One | Easy | [#66](https://leetcode.com/problems/plus-one/) | Math | ⏳ | — | — |
| 3 | Rotate Image | Medium | [#48](https://leetcode.com/problems/rotate-image/) | Matrix | ⏳ | — | — |
| 4 | Spiral Matrix | Medium | [#54](https://leetcode.com/problems/spiral-matrix/) | Matrix | ⏳ | — | — |
| 5 | Set Matrix Zeroes | Medium | [#73](https://leetcode.com/problems/set-matrix-zeroes/) | Matrix | ⏳ | — | — |
| 6 | Pow(x, n) | Medium | [#50](https://leetcode.com/problems/powx-n/) | Exponentiation by Squaring | ✅ | 2026-06-07 | [→](math/50-pow(x,n)/learnings.md) |
| — | Majority Element *(bonus — Top Interview 150)* | Easy | [#169](https://leetcode.com/problems/majority-element/) | Hash Map counting / Boyer-Moore Voting | ✅ 100th pct | 2026-06-07 | [→](arrays/169-majority-element/learnings.md) |
| 7 | Multiply Strings | Medium | [#43](https://leetcode.com/problems/multiply-strings/) | Math | ⏳ | — | — |
| 8 | Detect Squares | Medium | [#587](https://leetcode.com/problems/detect-squares/) | Math | ⏳ | — | — |

## Phase 18 — Bit Manipulation ⏳

| # | Problem | Difficulty | LC | Pattern | Status | Solved | Learnings |
|---|---------|------------|----|---------|--------|--------|-----------|
| 1 | Single Number | Easy | [#136](https://leetcode.com/problems/single-number/) | Bit Manipulation — XOR Cancellation | ✅ 72nd pct | 2026-06-16 | [→](bit-manipulation/136-single-number/learnings.md) |
| 2 | Number of 1 Bits | Easy | [#191](https://leetcode.com/problems/number-of-1-bits/) | Bit Manipulation — Mask & Shift | ✅ 100th pct | 2026-06-16 | [→](bit-manipulation/191-number-of-1-bits/learnings.md) |
| 3 | Counting Bits | Easy | [#338](https://leetcode.com/problems/counting-bits/) | Bit Manipulation | ⏳ | — | — |
| 4 | Reverse Bits | Easy | [#190](https://leetcode.com/problems/reverse-bits/) | Bit Manipulation — Mask & Shift | ✅ 63rd pct | 2026-06-16 | [→](bit-manipulation/190-reverse-bits/learnings.md) |
| 5 | Missing Number | Easy | [#268](https://leetcode.com/problems/missing-number/) | Bit Manipulation | ⏳ | — | — |
| 6 | Sum of Two Integers | Medium | [#371](https://leetcode.com/problems/sum-of-two-integers/) | Bit Manipulation | ⏳ | — | — |
| 7 | Reverse Integer | Medium | [#7](https://leetcode.com/problems/reverse-integer/) | Math | ⏳ | — | — |
