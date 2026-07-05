# DSA Curriculum — NeetCode 150

Language: JavaScript / TypeScript
Goal: Interview-ready in 3 months
Total: 18 phases, 154 problems + 19 bonus problems = 173 total (LC #383, #205, #290, #219, #118, #119, #31, #169, #209, #30, #111, #144, #94, #145, #997, #399 are bonus)

---

## Phase 1 — Arrays & Hashing
**Why this order:** Foundation of all DSA. Hash maps and sets are the most common tools in interview problems.
**Interview weight:** 🔴 Very High
**Problems:** 9 total (E: 3 / M: 6 / H: 0)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Two Sum | Easy | [LC #1](https://leetcode.com/problems/two-sum/) | Hash Map |
| 2 | Contains Duplicate | Easy | [LC #217](https://leetcode.com/problems/contains-duplicate/) | Hash Set |
| 3 | Valid Anagram | Easy | [LC #242](https://leetcode.com/problems/valid-anagram/) | Hash Map |
| 4 | Group Anagrams | Medium | [LC #49](https://leetcode.com/problems/group-anagrams/) | Hash Map |
| 5 | Top K Frequent Elements | Medium | [LC #347](https://leetcode.com/problems/top-k-frequent-elements/) | Heap / Bucket Sort |
| 6 | Product of Array Except Self | Medium | [LC #238](https://leetcode.com/problems/product-of-array-except-self/) | Prefix / Suffix |
| 7 | Valid Sudoku | Medium | [LC #36](https://leetcode.com/problems/valid-sudoku/) | Hash Set |
| 8 | Encode and Decode Strings | Medium | [LC #271](https://leetcode.com/problems/encode-and-decode-strings/) | String Encoding |
| 9 | Longest Consecutive Sequence | Medium | [LC #128](https://leetcode.com/problems/longest-consecutive-sequence/) | Hash Set |
| — | Ransom Note *(bonus — Hashmap sprint)* | Easy | [LC #383](https://leetcode.com/problems/ransom-note/) | Hash Map — frequency counting |
| — | Isomorphic Strings *(bonus — Hashmap sprint)* | Easy | [LC #205](https://leetcode.com/problems/isomorphic-strings/) | Hash Map — Bijection |
| — | Word Pattern *(bonus — Hashmap sprint)* | Easy | [LC #290](https://leetcode.com/problems/word-pattern/) | Hash Map — Bijection |
| — | Contains Duplicate II *(bonus — Hashmap sprint)* | Easy | [LC #219](https://leetcode.com/problems/contains-duplicate-ii/) | Hash Set — Sliding Window / Hash Map |
| — | Pascal's Triangle *(bonus)* | Easy | [LC #118](https://leetcode.com/problems/pascals-triangle/) | 2D Array Construction |
| — | Pascal's Triangle II *(bonus)* | Easy | [LC #119](https://leetcode.com/problems/pascals-triangle-ii/) | Right-to-left In-place Update |

---

## Phase 2 — Two Pointers
**Why this order:** Builds directly on arrays. Eliminates one dimension of looping — the first major optimization technique.
**Interview weight:** 🔴 Very High
**Problems:** 9 total (E: 4 / M: 4 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Valid Palindrome | Easy | [LC #125](https://leetcode.com/problems/valid-palindrome/) | Two Pointers |
| 2 | Two Sum II | Medium | [LC #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Two Pointers |
| 3 | 3Sum | Medium | [LC #15](https://leetcode.com/problems/3sum/) | Two Pointers in Loop |
| 4 | Container With Most Water | Medium | [LC #11](https://leetcode.com/problems/container-with-most-water/) | Two Pointers |
| 5 | Merge Sorted Array | Easy | [LC #88](https://leetcode.com/problems/merge-sorted-array/) | Two Pointers (fill backwards) |
| 6 | Remove Element | Easy | [LC #27](https://leetcode.com/problems/remove-element/) | Two Pointers (read/write + swap) |
| 7 | Remove Duplicates from Sorted Array | Easy | [LC #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Two Pointers |
| 8 | Remove Duplicates from Sorted Array II | Medium | [LC #80](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) | Two Pointers (read/write, look-back) |
| 9 | Trapping Rain Water | Hard | [LC #42](https://leetcode.com/problems/trapping-rain-water/) | Two Pointers |
| — | Next Permutation *(bonus)* | Medium | [LC #31](https://leetcode.com/problems/next-permutation/) | Pivot + Swap + Two-pointer Reverse |

---

## Phase 3 — Sliding Window
**Why this order:** Natural extension of two pointers — a window with dynamic boundaries. Same linear-time principle, new problem class.
**Interview weight:** 🔴 Very High
**Problems:** 6 total (E: 1 / M: 3 / H: 2)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Best Time to Buy and Sell Stock | Easy | [LC #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Sliding Window |
| 2 | Longest Substring Without Repeating Characters | Medium | [LC #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Sliding Window |
| 3 | Longest Repeating Character Replacement | Medium | [LC #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Sliding Window |
| 4 | Permutation in String | Medium | [LC #567](https://leetcode.com/problems/permutation-in-string/) | Sliding Window |
| 5 | Minimum Window Substring | Hard | [LC #76](https://leetcode.com/problems/minimum-window-substring/) | Sliding Window |
| 6 | Sliding Window Maximum | Hard | [LC #239](https://leetcode.com/problems/sliding-window-maximum/) | Sliding Window + Deque |
| — | Minimum Size Subarray Sum *(bonus)* | Medium | [LC #209](https://leetcode.com/problems/minimum-size-subarray-sum/) | Sliding Window — Variable Size (minimize) |
| — | Substring with Concatenation of All Words *(bonus)* | Hard | [LC #30](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) | Sliding Window — Fixed Size, word frequency |

---

## Phase 4 — Stack
**Why this order:** LIFO structure unlocks monotonic stack problems — a common interview pattern that's hard to see without the right mental model.
**Interview weight:** 🟡 High
**Problems:** 7 total (E: 1 / M: 5 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Valid Parentheses | Easy | [LC #20](https://leetcode.com/problems/valid-parentheses/) | Stack |
| 2 | Min Stack | Medium | [LC #155](https://leetcode.com/problems/min-stack/) | Stack |
| 3 | Evaluate Reverse Polish Notation | Medium | [LC #150](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Stack |
| 4 | Generate Parentheses | Medium | [LC #22](https://leetcode.com/problems/generate-parentheses/) | Backtracking / Stack |
| 5 | Daily Temperatures | Medium | [LC #739](https://leetcode.com/problems/daily-temperatures/) | Monotonic Stack |
| 6 | Car Fleet | Medium | [LC #853](https://leetcode.com/problems/car-fleet/) | Monotonic Stack |
| 7 | Largest Rectangle in Histogram | Hard | [LC #84](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Monotonic Stack |

---

## Phase 5 — Binary Search
**Why this order:** Requires sorted input — builds on the sorted-array intuition developed in Two Pointers. O(log n) thinking is a key interview skill.
**Interview weight:** 🔴 Very High
**Problems:** 7 total (E: 1 / M: 5 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Binary Search | Easy | [LC #704](https://leetcode.com/problems/binary-search/) | Binary Search |
| 2 | Search a 2D Matrix | Medium | [LC #74](https://leetcode.com/problems/search-a-2d-matrix/) | Binary Search |
| 3 | Koko Eating Bananas | Medium | [LC #875](https://leetcode.com/problems/koko-eating-bananas/) | Binary Search on Answer |
| 4 | Find Minimum in Rotated Sorted Array | Medium | [LC #153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Binary Search |
| 5 | Search in Rotated Sorted Array | Medium | [LC #33](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Binary Search |
| 6 | Time Based Key-Value Store | Medium | [LC #981](https://leetcode.com/problems/time-based-key-value-store/) | Binary Search |
| 7 | Median of Two Sorted Arrays | Hard | [LC #4](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Binary Search |

---

## Phase 6 — Linked List
**Why this order:** Pointer manipulation prerequisite for trees. Fast/slow pointer technique bridges into cycle detection and tree problems.
**Interview weight:** 🟡 High
**Problems:** 11 total (E: 3 / M: 6 / H: 2)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Reverse Linked List | Easy | [LC #206](https://leetcode.com/problems/reverse-linked-list/) | Linked List |
| 2 | Merge Two Sorted Lists | Easy | [LC #21](https://leetcode.com/problems/merge-two-sorted-lists/) | Linked List |
| 3 | Linked List Cycle | Easy | [LC #141](https://leetcode.com/problems/linked-list-cycle/) | Fast / Slow Pointers |
| 4 | Reorder List | Medium | [LC #143](https://leetcode.com/problems/reorder-list/) | Linked List |
| 5 | Remove Nth Node From End | Medium | [LC #19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) | Two Pointers |
| 6 | Copy List with Random Pointer | Medium | [LC #138](https://leetcode.com/problems/copy-list-with-random-pointer/) | Hash Map |
| 7 | Add Two Numbers | Medium | [LC #2](https://leetcode.com/problems/add-two-numbers/) | Linked List |
| 8 | Find the Duplicate Number | Medium | [LC #287](https://leetcode.com/problems/find-the-duplicate-number/) | Fast / Slow Pointers |
| 9 | LRU Cache | Medium | [LC #146](https://leetcode.com/problems/lru-cache/) | Hash Map + DLL |
| 10 | Merge K Sorted Lists | Hard | [LC #23](https://leetcode.com/problems/merge-k-sorted-lists/) | Heap |
| 11 | Reverse Nodes in K-Group | Hard | [LC #25](https://leetcode.com/problems/reverse-nodes-in-k-group/) | Linked List |

---

## Phase 7 — 1D Dynamic Programming
**Why this order:** Recursion foundation already built. 1D DP is the direct extension — same subproblem thinking, now with tabulation.
**Interview weight:** 🔴 Very High
**Problems:** 12 total (E: 2 / M: 10 / H: 0)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Climbing Stairs | Easy | [LC #70](https://leetcode.com/problems/climbing-stairs/) | DP — Linear Sequence |
| 2 | Min Cost Climbing Stairs | Easy | [LC #746](https://leetcode.com/problems/min-cost-climbing-stairs/) | DP — Linear Sequence |
| 3 | House Robber | Medium | [LC #198](https://leetcode.com/problems/house-robber/) | DP — 0/1 Choice |
| 4 | House Robber II | Medium | [LC #213](https://leetcode.com/problems/house-robber-ii/) | DP — 0/1 Choice |
| 5 | Longest Palindromic Substring | Medium | [LC #5](https://leetcode.com/problems/longest-palindromic-substring/) | DP |
| 6 | Palindromic Substrings | Medium | [LC #647](https://leetcode.com/problems/palindromic-substrings/) | DP |
| 7 | Decode Ways | Medium | [LC #91](https://leetcode.com/problems/decode-ways/) | DP |
| 8 | Coin Change | Medium | [LC #322](https://leetcode.com/problems/coin-change/) | DP — Choice |
| 9 | Maximum Product Subarray | Medium | [LC #152](https://leetcode.com/problems/maximum-product-subarray/) | DP |
| 10 | Word Break | Medium | [LC #139](https://leetcode.com/problems/word-break/) | DP |
| 11 | Longest Increasing Subsequence | Medium | [LC #300](https://leetcode.com/problems/longest-increasing-subsequence/) | DP |
| 12 | Partition Equal Subset Sum | Medium | [LC #416](https://leetcode.com/problems/partition-equal-subset-sum/) | DP — 0/1 Knapsack |

---

## Phase 8 — 2D Dynamic Programming
**Why this order:** Direct extension of 1D DP. Same principles applied to grids and string pairs.
**Interview weight:** 🟡 High
**Problems:** 11 total (E: 0 / M: 8 / H: 3)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Unique Paths | Medium | [LC #62](https://leetcode.com/problems/unique-paths/) | 2D DP |
| 2 | Longest Common Subsequence | Medium | [LC #1143](https://leetcode.com/problems/longest-common-subsequence/) | 2D DP |
| 3 | Best Time to Buy/Sell with Cooldown | Medium | [LC #309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | 2D DP |
| 4 | Coin Change II | Medium | [LC #518](https://leetcode.com/problems/coin-change-ii/) | 2D DP |
| 5 | Target Sum | Medium | [LC #494](https://leetcode.com/problems/target-sum/) | 2D DP |
| 6 | Interleaving String | Medium | [LC #97](https://leetcode.com/problems/interleaving-string/) | 2D DP |
| 7 | Edit Distance | Medium | [LC #72](https://leetcode.com/problems/edit-distance/) | 2D DP |
| 8 | Longest Increasing Path in Matrix | Hard | [LC #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) | 2D DP + DFS |
| 9 | Distinct Subsequences | Hard | [LC #115](https://leetcode.com/problems/distinct-subsequences/) | 2D DP |
| 10 | Burst Balloons | Hard | [LC #312](https://leetcode.com/problems/burst-balloons/) | 2D DP |
| 11 | Regular Expression Matching | Hard | [LC #10](https://leetcode.com/problems/regular-expression-matching/) | 2D DP |

---

## Phase 9 — Trees
**Why this order:** Linked list pointer work is the prerequisite. Trees are the most common interview topic at senior levels.
**Interview weight:** 🔴 Very High
**Problems:** 15 total (E: 5 / M: 8 / H: 2)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Invert Binary Tree | Easy | [LC #226](https://leetcode.com/problems/invert-binary-tree/) | DFS |
| 2 | Max Depth of Binary Tree | Easy | [LC #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | DFS |
| 3 | Diameter of Binary Tree | Easy | [LC #543](https://leetcode.com/problems/diameter-of-binary-tree/) | DFS |
| 4 | Balanced Binary Tree | Easy | [LC #110](https://leetcode.com/problems/balanced-binary-tree/) | DFS |
| 5 | Same Tree | Easy | [LC #100](https://leetcode.com/problems/same-tree/) | DFS |
| 6 | Subtree of Another Tree | Easy | [LC #572](https://leetcode.com/problems/subtree-of-another-tree/) | DFS |
| 7 | LCA of BST | Medium | [LC #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | BST |
| 8 | Binary Tree Level Order Traversal | Medium | [LC #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | BFS |
| 9 | Binary Tree Right Side View | Medium | [LC #199](https://leetcode.com/problems/binary-tree-right-side-view/) | BFS |
| 10 | Count Good Nodes in Binary Tree | Medium | [LC #1448](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) | DFS |
| 11 | Validate Binary Search Tree | Medium | [LC #98](https://leetcode.com/problems/validate-binary-search-tree/) | BST |
| 12 | Kth Smallest Element in BST | Medium | [LC #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | BST |
| 13 | Construct Tree from Preorder and Inorder | Medium | [LC #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | DFS |
| 14 | Binary Tree Maximum Path Sum | Hard | [LC #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | DFS |
| 15 | Serialize and Deserialize Binary Tree | Hard | [LC #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | BFS / DFS |
| — | Minimum Depth of Binary Tree *(bonus)* | Easy | [LC #111](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | DFS — Null-child-aware minimum |
| — | Binary Tree Preorder Traversal *(bonus)* | Easy | [LC #144](https://leetcode.com/problems/binary-tree-preorder-traversal/) | DFS — Traversal Order |
| — | Binary Tree Inorder Traversal *(bonus)* | Easy | [LC #94](https://leetcode.com/problems/binary-tree-inorder-traversal/) | DFS — Traversal Order |
| — | Binary Tree Postorder Traversal *(bonus)* | Easy | [LC #145](https://leetcode.com/problems/binary-tree-postorder-traversal/) | DFS — Traversal Order |

---

## Phase 10 — Tries
**Why this order:** Tree variant with character-based branching. Short phase, high return on string-matching problems.
**Interview weight:** 🟢 Medium
**Problems:** 3 total (E: 0 / M: 2 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Implement Trie | Medium | [LC #208](https://leetcode.com/problems/implement-trie-prefix-tree/) | Trie |
| 2 | Design Add and Search Words | Medium | [LC #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Trie |
| 3 | Word Search II | Hard | [LC #212](https://leetcode.com/problems/word-search-ii/) | Trie + Backtracking |

---

## Phase 11 — Heap / Priority Queue
**Why this order:** Required for several graph algorithms (Dijkstra, Prim's) coming next. Also unlocks a whole class of "top K" problems.
**Interview weight:** 🟡 High
**Problems:** 7 total (E: 2 / M: 4 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Kth Largest Element in a Stream | Easy | [LC #703](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Heap |
| 2 | Last Stone Weight | Easy | [LC #1046](https://leetcode.com/problems/last-stone-weight/) | Heap |
| 3 | K Closest Points to Origin | Medium | [LC #973](https://leetcode.com/problems/k-closest-points-to-origin/) | Heap |
| 4 | Kth Largest Element in an Array | Medium | [LC #215](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Heap |
| 5 | Task Scheduler | Medium | [LC #621](https://leetcode.com/problems/task-scheduler/) | Heap / Greedy |
| 6 | Design Twitter | Medium | [LC #355](https://leetcode.com/problems/design-twitter/) | Heap |
| 7 | Find Median from Data Stream | Hard | [LC #295](https://leetcode.com/problems/find-median-from-data-stream/) | Two Heaps |

---

## Phase 12 — Backtracking
**Why this order:** Tree traversal + recursion foundation make backtracking natural. Systematic exploration of a decision tree.
**Interview weight:** 🟡 High
**Problems:** 9 total (E: 0 / M: 8 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Subsets | Medium | [LC #78](https://leetcode.com/problems/subsets/) | Backtracking |
| 2 | Combination Sum | Medium | [LC #39](https://leetcode.com/problems/combination-sum/) | Backtracking |
| 3 | Permutations | Medium | [LC #46](https://leetcode.com/problems/permutations/) | Backtracking |
| 4 | Subsets II | Medium | [LC #90](https://leetcode.com/problems/subsets-ii/) | Backtracking |
| 5 | Combination Sum II | Medium | [LC #40](https://leetcode.com/problems/combination-sum-ii/) | Backtracking |
| 6 | Word Search | Medium | [LC #79](https://leetcode.com/problems/word-search/) | Backtracking |
| 7 | Palindrome Partitioning | Medium | [LC #131](https://leetcode.com/problems/palindrome-partitioning/) | Backtracking |
| 8 | Letter Combinations of Phone Number | Medium | [LC #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Backtracking |
| 9 | N-Queens | Hard | [LC #51](https://leetcode.com/problems/n-queens/) | Backtracking |

---

## Phase 13 — Graphs
**Why this order:** Trees are a special case of graphs. BFS/DFS already internalized — now applied to general graphs with cycles.
**Interview weight:** 🔴 Very High
**Problems:** 13 total (E: 0 / M: 12 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Number of Islands | Medium | [LC #200](https://leetcode.com/problems/number-of-islands/) | BFS / DFS |
| 2 | Clone Graph | Medium | [LC #133](https://leetcode.com/problems/clone-graph/) | DFS |
| 3 | Max Area of Island | Medium | [LC #695](https://leetcode.com/problems/max-area-of-island/) | DFS |
| 4 | Pacific Atlantic Water Flow | Medium | [LC #417](https://leetcode.com/problems/pacific-atlantic-water-flow/) | BFS / DFS |
| 5 | Surrounded Regions | Medium | [LC #130](https://leetcode.com/problems/surrounded-regions/) | DFS |
| 6 | Rotting Oranges | Medium | [LC #994](https://leetcode.com/problems/rotting-oranges/) | BFS |
| 7 | Walls and Gates | Medium | [LC #286](https://leetcode.com/problems/walls-and-gates/) | BFS |
| 8 | Course Schedule | Medium | [LC #207](https://leetcode.com/problems/course-schedule/) | Topological Sort |
| 9 | Course Schedule II | Medium | [LC #210](https://leetcode.com/problems/course-schedule-ii/) | Topological Sort |
| 10 | Redundant Connection | Medium | [LC #684](https://leetcode.com/problems/redundant-connection/) | Union Find |
| 11 | Number of Connected Components | Medium | [LC #323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) | Union Find |
| 12 | Graph Valid Tree | Medium | [LC #261](https://leetcode.com/problems/graph-valid-tree/) | Union Find |
| 13 | Word Ladder | Hard | [LC #127](https://leetcode.com/problems/word-ladder/) | BFS |
| *(bonus)* | Find the Town Judge | Easy | [LC #997](https://leetcode.com/problems/find-the-town-judge/) | Graph |
| *(bonus)* | Evaluate Division | Medium | [LC #399](https://leetcode.com/problems/evaluate-division/) | Graph |

---

## Phase 14 — Advanced Graphs
**Why this order:** Heap prerequisite satisfied. Dijkstra, Bellman-Ford, and Eulerian paths require everything built so far.
**Interview weight:** 🟢 Medium
**Problems:** 6 total (E: 0 / M: 2 / H: 4)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Min Cost to Connect All Points | Medium | [LC #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Prim's / Kruskal's |
| 2 | Cheapest Flights Within K Stops | Medium | [LC #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Bellman-Ford |
| 3 | Reconstruct Itinerary | Hard | [LC #332](https://leetcode.com/problems/reconstruct-itinerary/) | Eulerian Path |
| 4 | Swim in Rising Water | Hard | [LC #778](https://leetcode.com/problems/swim-in-rising-water/) | Dijkstra |
| 5 | Alien Dictionary | Hard | [LC #269](https://leetcode.com/problems/alien-dictionary/) | Topological Sort |
| 6 | Network Delay Time | Medium | [LC #743](https://leetcode.com/problems/network-delay-time/) | Dijkstra |

---

## Phase 15 — Greedy
**Why this order:** Graph intuition makes greedy proofs easier to reason about. Local optimal → global optimal.
**Interview weight:** 🟡 High
**Problems:** 8 total (E: 0 / M: 8 / H: 0)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Maximum Subarray | Medium | [LC #53](https://leetcode.com/problems/maximum-subarray/) | Kadane's Algorithm |
| 2 | Jump Game | Medium | [LC #55](https://leetcode.com/problems/jump-game/) | Greedy |
| 3 | Jump Game II | Medium | [LC #45](https://leetcode.com/problems/jump-game-ii/) | Greedy |
| 4 | Gas Station | Medium | [LC #134](https://leetcode.com/problems/gas-station/) | Greedy |
| 5 | Hand of Straights | Medium | [LC #846](https://leetcode.com/problems/hand-of-straights/) | Greedy |
| 6 | Merge Triplets to Form Target | Medium | [LC #1899](https://leetcode.com/problems/merge-triplets-to-form-target-triplet/) | Greedy |
| 7 | Partition Labels | Medium | [LC #763](https://leetcode.com/problems/partition-labels/) | Greedy |
| 8 | Valid Parenthesis String | Medium | [LC #678](https://leetcode.com/problems/valid-parenthesis-string/) | Greedy |

---

## Phase 16 — Intervals
**Why this order:** Greedy logic applies directly to interval merging and scheduling problems.
**Interview weight:** 🟡 High
**Problems:** 6 total (E: 1 / M: 4 / H: 1)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Meeting Rooms | Easy | [LC #252](https://leetcode.com/problems/meeting-rooms/) | Intervals |
| 2 | Insert Interval | Medium | [LC #57](https://leetcode.com/problems/insert-interval/) | Intervals |
| 3 | Merge Intervals | Medium | [LC #56](https://leetcode.com/problems/merge-intervals/) | Intervals |
| 4 | Non-Overlapping Intervals | Medium | [LC #435](https://leetcode.com/problems/non-overlapping-intervals/) | Greedy |
| 5 | Meeting Rooms II | Medium | [LC #253](https://leetcode.com/problems/meeting-rooms-ii/) | Heap |
| 6 | Minimum Interval to Include Each Query | Hard | [LC #2402](https://leetcode.com/problems/minimum-interval-to-include-each-query/) | Heap |

---

## Phase 17 — Math & Geometry
**Why this order:** Standalone — matrix manipulation and number theory. Low prerequisite dependency.
**Interview weight:** 🟢 Medium
**Problems:** 8 total (E: 2 / M: 6 / H: 0)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Happy Number | Easy | [LC #202](https://leetcode.com/problems/happy-number/) | Math |
| 2 | Plus One | Easy | [LC #66](https://leetcode.com/problems/plus-one/) | Math |
| 3 | Rotate Image | Medium | [LC #48](https://leetcode.com/problems/rotate-image/) | Matrix |
| 4 | Spiral Matrix | Medium | [LC #54](https://leetcode.com/problems/spiral-matrix/) | Matrix |
| 5 | Set Matrix Zeroes | Medium | [LC #73](https://leetcode.com/problems/set-matrix-zeroes/) | Matrix |
| 6 | Pow(x, n) | Medium | [LC #50](https://leetcode.com/problems/powx-n/) | Math |
| — | Majority Element *(bonus — Top Interview 150)* | Easy | [LC #169](https://leetcode.com/problems/majority-element/) | Hash Map counting / Boyer-Moore Voting |
| 7 | Multiply Strings | Medium | [LC #43](https://leetcode.com/problems/multiply-strings/) | Math |
| 8 | Detect Squares | Medium | [LC #587](https://leetcode.com/problems/detect-squares/) | Math |

---

## Phase 18 — Bit Manipulation
**Why this order:** Final phase. Standalone topic, mostly easy problems. Good confidence boost to finish.
**Interview weight:** 🟢 Medium
**Problems:** 7 total (E: 5 / M: 2 / H: 0)

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Single Number | Easy | [LC #136](https://leetcode.com/problems/single-number/) | Bit Manipulation |
| 2 | Number of 1 Bits | Easy | [LC #191](https://leetcode.com/problems/number-of-1-bits/) | Bit Manipulation |
| 3 | Counting Bits | Easy | [LC #338](https://leetcode.com/problems/counting-bits/) | Bit Manipulation |
| 4 | Reverse Bits | Easy | [LC #190](https://leetcode.com/problems/reverse-bits/) | Bit Manipulation |
| 5 | Missing Number | Easy | [LC #268](https://leetcode.com/problems/missing-number/) | Bit Manipulation |
| 6 | Sum of Two Integers | Medium | [LC #371](https://leetcode.com/problems/sum-of-two-integers/) | Bit Manipulation |
| 7 | Reverse Integer | Medium | [LC #7](https://leetcode.com/problems/reverse-integer/) | Math |
