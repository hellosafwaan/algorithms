# DSA Learning OS — Claude Code Setup Prompt
# Paste this into Claude Code to initialize the full system.

---

## Context

I'm building a complete DSA learning system to go from beginner to interview-ready in 3 months.
Curriculum: NeetCode 150 — 18 topics, 150 problems, in the order below.
Language: JavaScript / TypeScript.

Current status:
- Arrays & Hashing: ✅ Complete
- Two Pointers: ✅ Finishing up
- All other phases: ⏳ Not started

---

## Folder Structure to Create

```
dsa-learning/
├── CLAUDE.md
├── CURRICULUM.md
├── TRACKER.md
│
├── safwaan/
│   ├── identity.md
│   ├── progress.md
│   ├── patterns.md
│   └── sessions/
│       └── [YYYY-MM-DD]_[topic].md
│
├── topics/
│   ├── 01-arrays-hashing/
│   │   ├── notes.md
│   │   └── problems/
│   ├── 02-two-pointers/
│   │   ├── notes.md
│   │   └── problems/
│   ├── 03-sliding-window/
│   │   ├── notes.md
│   │   └── problems/
│   ├── 04-stack/
│   ├── 05-binary-search/
│   ├── 06-linked-list/
│   ├── 07-1d-dynamic-programming/
│   ├── 08-2d-dynamic-programming/
│   ├── 09-trees/
│   ├── 10-tries/
│   ├── 11-heap-priority-queue/
│   ├── 12-backtracking/
│   ├── 13-graphs/
│   ├── 14-advanced-graphs/
│   ├── 15-greedy/
│   ├── 16-intervals/
│   ├── 17-math-geometry/
│   └── 18-bit-manipulation/
│
└── handoffs/
    └── HANDOFF_[NEXT_PROBLEM].md
```

---

## File 1: `CURRICULUM.md`

Build this file as the full 3-month roadmap. For each topic use this exact format:

```markdown
## Phase N — [Topic Name]
**Why this order:** [1-2 sentences on dependency / why now]
**Interview weight:** 🔴 Very High / 🟡 High / 🟢 Medium
**Problems:** N total (E: x / M: y / H: z)
**Estimated time:** N days

| # | Problem | Difficulty | LeetCode | Pattern |
|---|---------|------------|----------|---------|
| 1 | Problem Name | Easy | [LC #N](https://leetcode.com/problems/slug/) | Pattern Name |
```

Build CURRICULUM.md with ALL 18 phases using this exact problem list:

### Phase 1 — Arrays & Hashing (✅ Complete)
Problems: Two Sum (LC#1, Easy, Hash Map), Contains Duplicate (LC#217, Easy, Hash Set),
Valid Anagram (LC#242, Easy, Hash Map), Group Anagrams (LC#49, Medium, Hash Map),
Top K Frequent Elements (LC#347, Medium, Heap/Bucket Sort),
Product of Array Except Self (LC#238, Medium, Prefix/Suffix),
Valid Sudoku (LC#36, Medium, Hash Set), Encode and Decode Strings (LC#271, Medium, String),
Longest Consecutive Sequence (LC#128, Medium, Hash Set)

### Phase 2 — Two Pointers (✅ Finishing)
Problems: Valid Palindrome (LC#125, Easy, Two Pointers),
Two Sum II (LC#167, Medium, Two Pointers), 3Sum (LC#15, Medium, Two Pointers),
Container With Most Water (LC#11, Medium, Two Pointers),
Trapping Rain Water (LC#42, Hard, Two Pointers)

### Phase 3 — Sliding Window
Problems: Best Time to Buy and Sell Stock (LC#121, Easy, Sliding Window),
Longest Substring Without Repeating Characters (LC#3, Medium, Sliding Window),
Longest Repeating Character Replacement (LC#424, Medium, Sliding Window),
Permutation in String (LC#567, Medium, Sliding Window),
Minimum Window Substring (LC#76, Hard, Sliding Window),
Sliding Window Maximum (LC#239, Hard, Sliding Window)

### Phase 4 — Stack
Problems: Valid Parentheses (LC#20, Easy, Stack),
Min Stack (LC#155, Medium, Stack), Evaluate Reverse Polish Notation (LC#150, Medium, Stack),
Generate Parentheses (LC#22, Medium, Backtracking/Stack),
Daily Temperatures (LC#739, Medium, Monotonic Stack),
Car Fleet (LC#853, Medium, Monotonic Stack),
Largest Rectangle in Histogram (LC#84, Hard, Monotonic Stack)

### Phase 5 — Binary Search
Problems: Binary Search (LC#704, Easy, Binary Search),
Search a 2D Matrix (LC#74, Medium, Binary Search),
Koko Eating Bananas (LC#875, Medium, Binary Search),
Find Minimum in Rotated Sorted Array (LC#153, Medium, Binary Search),
Search in Rotated Sorted Array (LC#33, Medium, Binary Search),
Time Based Key-Value Store (LC#981, Medium, Binary Search),
Median of Two Sorted Arrays (LC#4, Hard, Binary Search)

### Phase 6 — Linked List
Problems: Reverse Linked List (LC#206, Easy, Linked List),
Merge Two Sorted Lists (LC#21, Easy, Linked List),
Reorder List (LC#143, Medium, Linked List),
Remove Nth Node From End of List (LC#19, Medium, Two Pointers),
Copy List with Random Pointer (LC#138, Medium, Hash Map),
Add Two Numbers (LC#2, Medium, Linked List),
Linked List Cycle (LC#141, Easy, Two Pointers),
Find the Duplicate Number (LC#287, Medium, Two Pointers),
LRU Cache (LC#146, Medium, Hash Map + DLL),
Merge K Sorted Lists (LC#23, Hard, Heap),
Reverse Nodes in K-Group (LC#25, Hard, Linked List)

### Phase 7 — 1D Dynamic Programming
Problems: Climbing Stairs (LC#70, Easy, DP),
Min Cost Climbing Stairs (LC#746, Easy, DP),
House Robber (LC#198, Medium, DP),
House Robber II (LC#213, Medium, DP),
Longest Palindromic Substring (LC#5, Medium, DP),
Palindromic Substrings (LC#647, Medium, DP),
Decode Ways (LC#91, Medium, DP),
Coin Change (LC#322, Medium, DP),
Maximum Product Subarray (LC#152, Medium, DP),
Word Break (LC#139, Medium, DP),
Longest Increasing Subsequence (LC#300, Medium, DP),
Partition Equal Subset Sum (LC#416, Medium, DP)

### Phase 8 — 2D Dynamic Programming
Problems: Unique Paths (LC#62, Medium, DP),
Longest Common Subsequence (LC#1143, Medium, DP),
Best Time to Buy and Sell Stock with Cooldown (LC#309, Medium, DP),
Coin Change II (LC#518, Medium, DP),
Target Sum (LC#494, Medium, DP),
Interleaving String (LC#97, Medium, DP),
Longest Increasing Path in Matrix (LC#329, Hard, DP),
Distinct Subsequences (LC#115, Hard, DP),
Edit Distance (LC#72, Medium, DP),
Burst Balloons (LC#312, Hard, DP),
Regular Expression Matching (LC#10, Hard, DP)

### Phase 9 — Trees
Problems: Invert Binary Tree (LC#226, Easy, BFS/DFS),
Max Depth of Binary Tree (LC#104, Easy, DFS),
Diameter of Binary Tree (LC#543, Easy, DFS),
Balanced Binary Tree (LC#110, Easy, DFS),
Same Tree (LC#100, Easy, DFS),
Subtree of Another Tree (LC#572, Easy, DFS),
LCA of BST (LC#235, Medium, BST),
Binary Tree Level Order Traversal (LC#102, Medium, BFS),
Binary Tree Right Side View (LC#199, Medium, BFS),
Count Good Nodes in Binary Tree (LC#1448, Medium, DFS),
Validate Binary Search Tree (LC#98, Medium, BST),
Kth Smallest Element in BST (LC#230, Medium, BST),
Construct Binary Tree from Preorder and Inorder (LC#105, Medium, DFS),
Binary Tree Maximum Path Sum (LC#124, Hard, DFS),
Serialize and Deserialize Binary Tree (LC#297, Hard, BFS/DFS)

### Phase 10 — Tries
Problems: Implement Trie (LC#208, Medium, Trie),
Design Add and Search Words (LC#211, Medium, Trie),
Word Search II (LC#212, Hard, Trie + Backtracking)

### Phase 11 — Heap / Priority Queue
Problems: Kth Largest Element in a Stream (LC#703, Easy, Heap),
Last Stone Weight (LC#1046, Easy, Heap),
K Closest Points to Origin (LC#973, Medium, Heap),
Kth Largest Element in an Array (LC#215, Medium, Heap),
Task Scheduler (LC#621, Medium, Heap/Greedy),
Design Twitter (LC#355, Medium, Heap),
Find Median from Data Stream (LC#295, Hard, Two Heaps)

### Phase 12 — Backtracking
Problems: Subsets (LC#78, Medium, Backtracking),
Combination Sum (LC#39, Medium, Backtracking),
Permutations (LC#46, Medium, Backtracking),
Subsets II (LC#90, Medium, Backtracking),
Combination Sum II (LC#40, Medium, Backtracking),
Word Search (LC#79, Medium, Backtracking),
Palindrome Partitioning (LC#131, Medium, Backtracking),
Letter Combinations of a Phone Number (LC#17, Medium, Backtracking),
N-Queens (LC#51, Hard, Backtracking)

### Phase 13 — Graphs
Problems: Number of Islands (LC#200, Medium, BFS/DFS),
Clone Graph (LC#133, Medium, DFS),
Max Area of Island (LC#695, Medium, DFS),
Pacific Atlantic Water Flow (LC#417, Medium, BFS/DFS),
Surrounded Regions (LC#130, Medium, DFS),
Rotting Oranges (LC#994, Medium, BFS),
Walls and Gates (LC#286, Medium, BFS),
Course Schedule (LC#207, Medium, Topological Sort),
Course Schedule II (LC#210, Medium, Topological Sort),
Redundant Connection (LC#684, Medium, Union Find),
Number of Connected Components (LC#323, Medium, Union Find),
Graph Valid Tree (LC#261, Medium, Union Find),
Word Ladder (LC#127, Hard, BFS)

### Phase 14 — Advanced Graphs
Problems: Reconstruct Itinerary (LC#332, Hard, Eulerian Path),
Min Cost to Connect All Points (LC#1584, Medium, Prim's/Kruskal's),
Network Delay Time (LC#743, Medium, Dijkstra),
Swim in Rising Water (LC#778, Hard, Dijkstra),
Alien Dictionary (LC#269, Hard, Topological Sort),
Cheapest Flights Within K Stops (LC#787, Medium, Bellman-Ford)

### Phase 15 — Greedy
Problems: Maximum Subarray (LC#53, Medium, Kadane's),
Jump Game (LC#55, Medium, Greedy),
Jump Game II (LC#45, Medium, Greedy),
Gas Station (LC#134, Medium, Greedy),
Hand of Straights (LC#846, Medium, Greedy),
Merge Triplets to Form Target (LC#1899, Medium, Greedy),
Partition Labels (LC#763, Medium, Greedy),
Valid Parenthesis String (LC#678, Medium, Greedy)

### Phase 16 — Intervals
Problems: Insert Interval (LC#57, Medium, Intervals),
Merge Intervals (LC#56, Medium, Intervals),
Non-Overlapping Intervals (LC#435, Medium, Greedy),
Meeting Rooms (LC#252, Easy, Intervals),
Meeting Rooms II (LC#253, Medium, Heap),
Minimum Interval to Include Each Query (LC#2402, Hard, Heap)

### Phase 17 — Math & Geometry
Problems: Rotate Image (LC#48, Medium, Matrix),
Spiral Matrix (LC#54, Medium, Matrix),
Set Matrix Zeroes (LC#73, Medium, Matrix),
Happy Number (LC#202, Easy, Math),
Plus One (LC#66, Easy, Math),
Pow(x, n) (LC#50, Medium, Math),
Multiply Strings (LC#43, Medium, Math),
Detect Squares (LC#587, Medium, Math)

### Phase 18 — Bit Manipulation
Problems: Single Number (LC#136, Easy, Bit),
Number of 1 Bits (LC#191, Easy, Bit),
Counting Bits (LC#338, Easy, Bit),
Reverse Bits (LC#190, Easy, Bit),
Missing Number (LC#268, Easy, Bit),
Sum of Two Integers (LC#371, Medium, Bit),
Reverse Integer (LC#7, Medium, Math)

---

## File 2: `TRACKER.md`

This is the single navigation file. Build it with this structure:

```markdown
# DSA Master Tracker

Last updated: [date]

## Summary
| Metric | Count |
|--------|-------|
| Total problems | 150 |
| ✅ Complete | 9 |
| 🔄 In Progress | 5 |
| ⏳ Not Started | 136 |

---

## Phase Overview
| # | Phase | Problems | Done | Status |
|---|-------|----------|------|--------|
| 1 | Arrays & Hashing | 9 | 9 | ✅ |
| 2 | Two Pointers | 5 | 4 | 🔄 |
| 3 | Sliding Window | 6 | 0 | ⏳ |
| 4 | Stack | 7 | 0 | ⏳ |
| 5 | Binary Search | 7 | 0 | ⏳ |
| 6 | Linked List | 11 | 0 | ⏳ |
| 7 | 1D Dynamic Programming | 12 | 0 | ⏳ |
| 8 | 2D Dynamic Programming | 11 | 0 | ⏳ |
| 9 | Trees | 15 | 0 | ⏳ |
| 10 | Tries | 3 | 0 | ⏳ |
| 11 | Heap / Priority Queue | 7 | 0 | ⏳ |
| 12 | Backtracking | 9 | 0 | ⏳ |
| 13 | Graphs | 13 | 0 | ⏳ |
| 14 | Advanced Graphs | 6 | 0 | ⏳ |
| 15 | Greedy | 8 | 0 | ⏳ |
| 16 | Intervals | 6 | 0 | ⏳ |
| 17 | Math & Geometry | 8 | 0 | ⏳ |
| 18 | Bit Manipulation | 7 | 0 | ⏳ |

---

## Phase 1 — Arrays & Hashing ✅
> Notes: [→ topics/01-arrays-hashing/notes.md]

| # | Problem | Difficulty | LC | Pattern | Status | File |
|---|---------|------------|----|---------|--------|------|
| 1 | Two Sum | Easy | [#1](https://leetcode.com/problems/two-sum/) | Hash Map | ✅ | [→](topics/01-arrays-hashing/problems/two-sum.md) |
| 2 | Contains Duplicate | Easy | [#217](https://leetcode.com/problems/contains-duplicate/) | Hash Set | ✅ | [→](topics/01-arrays-hashing/problems/contains-duplicate.md) |
| 3 | Valid Anagram | Easy | [#242](https://leetcode.com/problems/valid-anagram/) | Hash Map | ✅ | [→](topics/01-arrays-hashing/problems/valid-anagram.md) |
| 4 | Group Anagrams | Medium | [#49](https://leetcode.com/problems/group-anagrams/) | Hash Map | ✅ | [→](topics/01-arrays-hashing/problems/group-anagrams.md) |
| 5 | Top K Frequent Elements | Medium | [#347](https://leetcode.com/problems/top-k-frequent-elements/) | Heap/Bucket Sort | ✅ | [→](topics/01-arrays-hashing/problems/top-k-frequent-elements.md) |
| 6 | Product of Array Except Self | Medium | [#238](https://leetcode.com/problems/product-of-array-except-self/) | Prefix/Suffix | ✅ | [→](topics/01-arrays-hashing/problems/product-of-array-except-self.md) |
| 7 | Valid Sudoku | Medium | [#36](https://leetcode.com/problems/valid-sudoku/) | Hash Set | ✅ | [→](topics/01-arrays-hashing/problems/valid-sudoku.md) |
| 8 | Encode and Decode Strings | Medium | [#271](https://leetcode.com/problems/encode-and-decode-strings/) | String | ✅ | [→](topics/01-arrays-hashing/problems/encode-decode-strings.md) |
| 9 | Longest Consecutive Sequence | Medium | [#128](https://leetcode.com/problems/longest-consecutive-sequence/) | Hash Set | ✅ | [→](topics/01-arrays-hashing/problems/longest-consecutive-sequence.md) |

## Phase 2 — Two Pointers 🔄
> Notes: [→ topics/02-two-pointers/notes.md]

| # | Problem | Difficulty | LC | Pattern | Status | File |
|---|---------|------------|----|---------|--------|------|
| 1 | Valid Palindrome | Easy | [#125](https://leetcode.com/problems/valid-palindrome/) | Two Pointers | ✅ | [→](topics/02-two-pointers/problems/valid-palindrome.md) |
| 2 | Two Sum II | Medium | [#167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Two Pointers | ✅ | [→](topics/02-two-pointers/problems/two-sum-ii.md) |
| 3 | 3Sum | Medium | [#15](https://leetcode.com/problems/3sum/) | Two Pointers | ✅ | [→](topics/02-two-pointers/problems/3sum.md) |
| 4 | Container With Most Water | Medium | [#11](https://leetcode.com/problems/container-with-most-water/) | Two Pointers | ✅ | [→](topics/02-two-pointers/problems/container-with-most-water.md) |
| 5 | Trapping Rain Water | Hard | [#42](https://leetcode.com/problems/trapping-rain-water/) | Two Pointers | 🔄 | [→](topics/02-two-pointers/problems/trapping-rain-water.md) |

## Phase 3 — Sliding Window ⏳
> Notes: [→ topics/03-sliding-window/notes.md]

| # | Problem | Difficulty | LC | Pattern | Status | File |
|---|---------|------------|----|---------|--------|------|
| 1 | Best Time to Buy and Sell Stock | Easy | [#121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Sliding Window | ⏳ | [→](topics/03-sliding-window/problems/best-time-to-buy-sell-stock.md) |
| 2 | Longest Substring Without Repeating Chars | Medium | [#3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Sliding Window | ⏳ | [→](topics/03-sliding-window/problems/longest-substring-no-repeat.md) |
| 3 | Longest Repeating Character Replacement | Medium | [#424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Sliding Window | ⏳ | [→](topics/03-sliding-window/problems/longest-repeating-char-replacement.md) |
| 4 | Permutation in String | Medium | [#567](https://leetcode.com/problems/permutation-in-string/) | Sliding Window | ⏳ | [→](topics/03-sliding-window/problems/permutation-in-string.md) |
| 5 | Minimum Window Substring | Hard | [#76](https://leetcode.com/problems/minimum-window-substring/) | Sliding Window | ⏳ | [→](topics/03-sliding-window/problems/minimum-window-substring.md) |
| 6 | Sliding Window Maximum | Hard | [#239](https://leetcode.com/problems/sliding-window-maximum/) | Sliding Window | ⏳ | [→](topics/03-sliding-window/problems/sliding-window-maximum.md) |

[Continue this exact format for ALL 18 phases with every problem listed]
```

Important: Build the complete TRACKER.md with all 18 phases and all 150 problems fully listed — not truncated.

---

## File 3: Per-Problem File Format

Every `topics/[topic]/problems/[problem-name].md` must use this format:

```markdown
# [Problem Name]

| Field | Value |
|-------|-------|
| LeetCode | [LC #N](https://leetcode.com/problems/slug/) |
| Difficulty | Easy / Medium / Hard |
| Pattern | Pattern Name |
| Topic | Topic Name |
| Status | ✅ / 🔄 / ⏳ |
| Date Solved | YYYY-MM-DD |

---

## Problem Statement
[2–3 sentence description of what the problem asks]

**Example:**
Input: ...
Output: ...

---

## Intuition
[What's the key observation that makes this problem solvable? Before any code.]

---

## My First Attempt
[Actual first attempt — not cleaned up. What I tried and why.]

## What Went Wrong
[Specific mistake. What I thought vs what actually happened.]

---

## Solution

```javascript
/**
 * [One-line description of approach]
 * Time: O(?) | Space: O(?)
 */
function solveProblem(input) {
  // Step 1: [comment]
  // Step 2: [comment]
}
```

## Walkthrough
[Trace through the example step by step with the actual code]

---

## Complexity
| | Complexity | Reason |
|-|------------|--------|
| Time | O(?) | Because... |
| Space | O(?) | Because... |

---

## Pattern
**Name:** [e.g. Two Pointers / Sliding Window / Hash Map]
**When to use:** [1–2 sentence decision rule]
**Related problems:** [2–3 other problems using same pattern]

---

## Interview Notes
- Edge cases to mention upfront: ...
- What to say when you see this problem type: ...
- Common wrong approaches to avoid: ...
```

---

## File 4: Per-Topic Notes Format

Every `topics/[topic]/notes.md` must use this format:

```markdown
# [Topic] — Notes

## What Is This
[Definition in 2–3 sentences]

## Why It Matters
[Interview frequency. How often it appears and in what form.]

## Core Concepts

### Concept 1: [Name]
[Explanation with example]

### Concept 2: [Name]
[Explanation with example]

## Patterns

### Pattern: [Name]
**When to use:** [Decision rule — "use this when you see X"]
**Template:**
```javascript
// clean reusable template
```
**Complexity:** Time O(?) | Space O(?)
**Problems:** [list]

## Complexity Reference
| Operation | Complexity | Notes |
|-----------|------------|-------|

## Common Mistakes
[Specific to this topic — real traps, not generic warnings]

## Problems in This Topic
[Linked list of all problems in this topic]
```

---

## File 5: `CLAUDE.md`

Write this file with exactly this content:

```markdown
# DSA Learning — Claude Code Instructions

## Who I'm Coaching
Safwaan. Self-directed learner. 3-month interview deadline.
Curriculum: NeetCode 150 in order. Language: JavaScript/TypeScript.
Full learner profile: → safwaan/identity.md

## Current Position
- Arrays & Hashing: ✅ Complete
- Two Pointers: 🔄 Finishing (Trapping Rain Water remaining)
- Everything else: ⏳ Not started

## Expertise Level
Not a DSA beginner in thinking — a beginner in patterns. Treat like a junior dev
who thinks well but needs the right question, not the answer.

Strengths: catches own bugs when asked the right question, pushes back on impractical
solutions, strong metacognitive awareness, articulates insights in his own words.

Watch for: skips edge cases unless pushed, can skip complexity analysis,
occasionally pattern-matches without understanding the why.

## Core Coaching Rules
1. He thinks first — never give solution before he attempts
2. One guiding question at a time when stuck — never a list of hints
3. Direct answer only if he explicitly says "just tell me"
4. Naive solution always first, optimize second
5. One problem per session

## After Every Problem Session — Run These Automatically

**1. Update TRACKER.md**
Change problem status. Update the summary counts at the top.

**2. Update safwaan/progress.md**
Update phase status and completion percentage.

**3. Update safwaan/patterns.md**
Add any new mistake patterns, breakthroughs, or observations.

**4. Fill in the problem file**
Complete `topics/[topic]/problems/[problem].md` with:
- Final solution (his actual code, cleaned up with comments)
- Walkthrough with the example he traced
- Complexity analysis
- His key insight in his words

**5. Update topic notes**
Add any new patterns or concepts to `topics/[topic]/notes.md`.

**6. Create session record**
Create `safwaan/sessions/[YYYY-MM-DD]_[problem-name].md`:
  ## What He Attempted
  ## Where He Got Stuck
  ## Mistakes Made (who caught it — him or guided question)
  ## Key Insight (in his words)
  ## Complexity: Time O(?) | Space O(?)
  ## Coach Notes for Next Session

**7. Create handoff**
Create `handoffs/HANDOFF_[NEXT_PROBLEM].md` with next problem context.

**8. Update CLAUDE.md**
Update "Current Position" and expertise calibration if something new was observed.

## Git Rules
Never commit automatically. Always ask Safwaan to confirm message and branch.
Format: `git commit -m "session: [problem-name] [YYYY-MM-DD]"`

## Already Internalized — Never Re-explain
- Recursion: base case + recursive case + guaranteed progress
- DP insight: "store and reuse instead of recompute" — he said this himself
- Cache check: if(n in cache) not if(cache[n]) — he caught this himself
- Recursive string reversal is O(n²) and impractical — he raised this
```

---

## Populate These Files With Real Content

**Arrays & Hashing (✅ Complete) — fill all problem files fully:**
- Two Sum, Contains Duplicate, Valid Anagram, Group Anagrams: standard solutions
- Top K Frequent Elements: he learned both Heap and Bucket Sort approaches
- Product of Array Except Self: he learned Prefix/Suffix precomputation
- Valid Sudoku, Encode/Decode Strings, Longest Consecutive Sequence: standard solutions
- `topics/01-arrays-hashing/notes.md`: Hash Map, Hash Set, Prefix/Suffix patterns

**Two Pointers (🔄 In Progress) — fill completed problems, skeleton for Trapping Rain Water:**
- Valid Palindrome, Two Sum II, 3Sum, Container With Most Water: full solutions
- Trapping Rain Water: status 🔄, problem statement only

**All other topics:** skeleton files only — notes.md with structure, empty problem files with meta table only.

**safwaan/ files:** Populate identity.md, patterns.md, and progress.md with real content based on what I've told you. Session files for any completed sessions.

---

## Final Instructions

1. Create every file in the structure above
2. Build TRACKER.md and CURRICULUM.md completely — all 18 phases, all 150 problems, all LC links
3. List the full directory tree when done
4. CLAUDE.md is the persistent memory — read at start of every Claude Code session automatically
5. No placeholders anywhere — completed problems get real content, incomplete ones get skeletons