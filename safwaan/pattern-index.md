# Pattern Index

When starting a new problem, check here first. Find the pattern, recall what you know, then attempt.

---

## Two Pointers

**Core idea:** Use two indices to avoid a nested loop. Works when the array has a property (sorted, structure) that makes pointer movement deterministic.

**When to reach for it:** Sorted array, searching for a pair, comparing from both ends, partitioning.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 167 — Two Sum II | Converge from both ends | Sorted guarantee makes moves deterministic — too big → move right in, too small → move left in |
| LC 977 — Squares of a Sorted Array | Both ends, fill output backwards | Largest squares always at the ends — compare, place largest at right of output, move that pointer in |
| LC 125 — Valid Palindrome | Converge, skip non-alphanumeric | Compare chars from both ends, skip non-alphanumeric with charCodeAt |
| LC 11 — Container With Most Water | Converge from both ends, greedy move | Move the shorter pointer — keeping shorter fixed and moving taller inward can only decrease area |
| LC 15 — 3Sum | Two pointers *inside a loop* (k-sum reduction) | Sort, fix one element, two-pointer the rest for `-nums[i]`. Sorting also makes duplicates adjacent → skip in place, no Set |
| LC 88 — Merge Sorted Array | Fill backwards, three pointers | Start both pointers at last real element of each array, fill nums1 from m+n-1 backwards. Loop while nums2Pointer >= 0 only |
| LC 27 — Remove Element | Read/Write (same direction) | p2 reads every element, p1 only advances on a write. Return p1. Also: swap-to-back variant — p1 left, swappableIndex right, break when they cross |
| LC 26 — Remove Duplicates from Sorted Array | Read/Write (same direction) | Same shape as LC 27. p2 reads every element; p1 writes when nums[p2] !== nums[p1]. Return p1 + 1. Sorted array guarantees duplicates are adjacent. |
| LC 80 — Remove Duplicates from Sorted Array II | Read/Write with look-back | Same shape as LC 26. Skip when nums[p1-1] === val && nums[p1-2] === val (already wrote 2 copies). Bootstrap: always write when p1 < 2. Return p1. |
| LC 42 — Trapping Rain Water | Two pointers with running max | Process the bottleneck side (smaller running max). `leftMax <= rightMax` → process left, else process right. Update max then accumulate. |

---

## Running Min / Single Pass (Sliding Window intro)

**Core idea:** Carry a running "best seen so far" variable as you scan left to right. At each step, combine it with the current value to compute a candidate answer. No explicit window to resize — just two variables and one pass.

**When to reach for it:** Maximize or minimize a value that depends on a pair where order matters (must buy before sell). Also the entry point for sliding window thinking.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 121 — Best Time to Buy and Sell Stock | Running minimum | Track cheapest price seen so far; profit at each day = current - minPrice; keep best |

---

## Hash Set — Consecutive Sequence Detection

**Core idea:** Build a Set for O(1) lookup. Only start counting from elements where `n - 1` is NOT in the Set (sequence starts). Walk forward with a while loop, counting until the chain breaks.

**Why O(n):** The outer loop visits every element once. The inner while loop's total steps across ALL sequences is also at most n — each element is stepped through by the while at most once. Two passes total = O(n).

**When to reach for it:** "Longest consecutive sequence," any problem asking for runs in an unsorted array without sorting.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 128 — Longest Consecutive Sequence | Sequence start filter + walk forward | Only count from `n-1 not in Set`; inner while amortizes to O(n) total |

---

## Hash Set — Membership Tracking

**Core idea:** When you only need to know whether something was seen (no value to store alongside it), use a Set. `has()` is O(1) and works cleanly on any value — no falsy-zero trap, no string key conversion.

**When to reach for it:** "Does this element appear more than once?", "Have I seen this before?", any membership-only check.

**Set vs HashMap:** Use Set when you track existence only. Use HashMap when you also need to store something (complement, count, index).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 217 — Contains Duplicate | Membership tracking | Add each element to Set; `has()` before `add()`. No falsy-zero edge case. |
| LC 219 — Contains Duplicate II | Sliding window Set (fixed size k) | Maintain a window of at most k elements. Shrink when `r - l > k` by deleting `nums[l]` and incrementing `l`. Check membership before adding. O(k) space. |
| LC 202 — Happy Number | Cycle detection | Track every intermediate sum in a Set. First repeat = you're in a cycle → return false. If you reach 1 → return true. |

---

## Math — Digit Extraction via Modulo

**Core idea:** Extract digits from an integer using `% 10` (last digit) and `Math.floor(n / 10)` (remove last digit). Faster than `String()` conversion — no string allocation.

**Template:**
```js
while (n > 0) {
    const digit = n % 10;       // last digit
    // use digit
    n = Math.floor(n / 10);     // chop it off
}
```

**When to reach for it:** Any problem where you need to process individual digits of a number (happy number, digit sum, reverse integer, etc.)

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 202 — Happy Number | Sum of squares of digits | `n % 10` → last digit; `Math.floor(n / 10)` → chop; loop while `n > 0` |

---

## Hash Map — Last Seen Index

**Core idea:** Store `value → last seen index`. When you encounter the same value again, the most recent index gives the smallest possible gap — if it's still too far, no earlier occurrence can help.

**When to reach for it:** "Have I seen this value within the last k positions?" — you need to know *when* not just *if*.

**Space note:** O(n) worst case — stores every element ever seen, not just the current window. Use the Set approach (above) when you want O(k).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 219 — Contains Duplicate II | Last seen index | `seen.set(nums[i], i)` always — even after a hit, update to keep the most recent index for future checks. |

---

## Hash Map — Bijection (Two Maps)

**Core idea:** When you need a consistent one-to-one mapping between two sets, use two maps — one per direction. A single map collapses both namespaces and produces false collisions when a letter appears on both sides.

**Pattern:** Check for conflict, then set unconditionally. Setting the same value twice is harmless.

**When to reach for it:** "Are these two strings isomorphic?", "Does this word pattern match?", any problem requiring a bijective mapping between two sequences.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 205 — Isomorphic Strings | Two-map bijection | `sToT` and `tToS` keep namespaces separate; check conflict, then set unconditionally |
| LC 290 — Word Pattern | Two-map bijection (words, not chars) | Same shape as LC 205 — split `s` first; pattern char ↔ word; check both maps, set both |

---

## Hash Map — Character Frequency

**Core idea:** Build a frequency map (character → count) to compare string composition.

**When to reach for it:** "Do these strings have the same characters?", frequency comparisons, grouping by character signature.

**Two-map variant:** One map per string, compare them. Safe to iterate only one map if lengths are equal — length check provides symmetry guarantee.

**One-map variant:** Increment for string A, decrement for string B. All keys must be 0. Must iterate `Object.keys()` — not just characters from one string (characters only in B accumulate negative values that won't be checked if you only walk A).

**Sorted-string key variant:** When grouping strings by character composition, sort each string's characters and use that as the key. All anagrams produce the same sorted form.

**Space note:** O(1) when input is lowercase English letters — the map is bounded by 26 keys, not n.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 242 — Valid Anagram | Two-map or one-map | One-map: iterate `Object.keys()`, not just `s`; else-branch for t is `-1` not `1` |
| LC 49 — Group Anagrams | Sorted string as key | Sort each string's chars → identical for all anagrams. Push original string into `map[sortedKey]`. Return `Object.values(map)`. |
| LC 383 — Ransom Note | Increment/decrement | Build count map for ransomNote, decrement with magazine. Any positive count = magazine short. `?? 0` to default missing keys. |

---

## Hash Map / Complement Lookup

**Core idea:** Store what you've seen so you can check for a complement in O(1) instead of searching.

**When to reach for it:** Find a pair that satisfies a condition, unsorted array.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 1 — Two Sum | Complement lookup | For each number, check if target - num is already in the map |
| LC 169 — Majority Element | Count map | Store occurrence counts; return first key above n/2 threshold. Remember: `for...in` keys are strings → `Number(key)` |

## Boyer-Moore Voting

**Core idea:** Track one candidate and one vote count. Matching element = +1, different element = -1. When count hits 0, adopt the current element as the new candidate. Majority element survives because it can't be fully cancelled.

**When to reach for it:** Find the element appearing more than n/2 times. Named algorithm — don't expect to derive cold.

**Prerequisite:** Majority element must be **guaranteed to exist**. Without that guarantee, add a second verification pass.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 169 — Majority Element | Single candidate vote | Candidate survives cancellation because majority > n/2 — more than all others combined |

---

## Exponentiation by Squaring (Divide and Conquer)

**Core idea:** Instead of reducing the exponent by 1 each step (O(n)), halve it each step (O(log n)). `x^n = x^(n/2) * x^(n/2)`. Store the half-result, square it. For odd n, multiply one extra `x`.

**When to reach for it:** Computing a power where n can be large. Any problem where you can reduce by half rather than by one.

**Always remember:** `Math.floor(n/2)` — raw `n/2` gives a float for odd n → infinite recursion. Handle negative n once at the top.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 50 — Pow(x, n) | Recursive halving | `x^n = x^(n/2) * x^(n/2)`; store half once; odd n adds one extra `x`; negative n → `1 / myPow(x, -n)` |

---

## Sliding Window (Variable Size)

**Core idea:** Two indices (`left` and `i`) mark the current valid window. Expand right on every step. Shrink left only when the window becomes invalid. Track the max size seen.

**When to reach for it:** Longest/shortest substring satisfying some constraint. "No repeating characters", "at most k distinct", "contains all characters of t."

**HashMap vs Set:** Use HashMap (`char → last seen index`) when you need to jump `left` directly — O(1) per shrink. Use Set when you're OK inching `left` forward with a while loop — also O(n) overall but more iterations.

**Critical guard:** `left = Math.max(left, map[char] + 1)` — left never goes backwards. Without `Math.max`, a character seen before the current window can drag left backwards.

**Window size:** `i - left + 1`. The `+1` because both ends are inclusive.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 3 — Longest Substring Without Repeating Characters | Variable window, HashMap — maximize | Store char → last index; jump left to `Math.max(left, map[char]+1)`; never reset to 0 |
| LC 209 — Minimum Size Subarray Sum | Variable window, sum — minimize | Add always; shrink while `sum >= target`; record inside while loop; return 0 if never hit |
| LC 30 — Substring with Concatenation of All Words | Fixed window, word frequency maps | Window = `words.length * wordLen`; slide by 1; inner loop extracts words via `s.substring(i + j*wordLen, i + j*wordLen + wordLen)`; compare two Maps entry by entry |

---

## Prefix / Suffix Precomputation

**Core idea:** Precompute running products/sums/maxes from both directions so each index can be answered in O(1) without scanning.

**When to reach for it:** Any problem where each index needs "the best value I've seen so far from the left" and/or "from the right."

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| Product Except Self | Left pass + right pass | Build left products forward, multiply by right products backward |
| LC 42 — Trapping Rain Water | Left max pass + right max pass | `leftMaxHeights[i]` = max seen strictly left of i; `rightMaxHeights[i]` = max seen strictly right of i. Push before updating (left pass); assign by index (right pass). |

---

## Top-Down DP (Memoization)

**Core idea:** Recursion + cache. Check cache before computing, store result after.

**Template:**
```js
function dp(n, cache = {}) {
    if (n in cache) return cache[n]
    if (/* base case */) return /* base value */
    cache[n] = dp(n - 1, cache) + dp(n - 2, cache) // or whatever
    return cache[n]
}
```

| Problem | Key Insight |
|---------|-------------|
| Fibonacci | Overlapping subproblems — same subproblems recomputed exponentially without cache |

---

## 2D Array Construction

| Problem | Key Insight |
|---------|-------------|
| LC 118 — Pascal's Triangle | Each row built from previous — row-by-row, element = sum of two above |
| LC 119 — Pascal's Triangle II | In-place update right-to-left to avoid overwriting values you still need |

---

## Pivot + Swap + Reverse (Next Permutation)

| Problem | Key Insight |
|---------|-------------|
| LC 31 — Next Permutation | Find descending suffix, swap pivot with smallest larger element in suffix, reverse suffix |

---

## XOR Self-Cancellation (Bit Manipulation)

**Core idea:** `a ^ a = 0` and `a ^ 0 = a`. XOR is commutative and associative, so order doesn't matter — XOR the whole array into one accumulator and every pair cancels itself out.

**When to reach for it:** Every element appears exactly twice except one (or a similar "all but one cancel" structure). Beats a HashMap/Set approach on space — O(1) instead of O(n).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 136 — Single Number | XOR entire array | Pairs cancel via `a^a=0`; lone survivor passes through via `a^0=a`; order-independent because XOR is commutative/associative |

---

## DFS — Accumulate a Value Over a Tree

**Core idea:** Two flavors. Iterative: push `[node, accumulatedValue]` pairs so each branch carries its own state. Recursive: ask both subtrees for their answer, combine with the current node, return up.

**When to reach for it:** Max/min depth, path sums, any problem where you need to accumulate something as you traverse a tree.

**Key insight:** A single shared variable breaks when the stack branches. Push pairs — each entry is self-contained.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 104 — Maximum Depth of Binary Tree | Iterative pairs + recursive post-order | Push `[node, depth]`; update max only at leaves. Recursive: `Math.max(left, right) + 1`. Null → 0. |
| LC 100 — Same Tree | Recursive lockstep comparison | Walk both trees simultaneously. Null+null → true (base case). One null → false. Values differ → false. Otherwise recurse both sides. |
| LC 226 — Invert Binary Tree | Pre-order DFS (process → recurse) | Swap children at current node, then recurse into both. Post-order, iterative DFS, and BFS all also work. |
| LC 101 — Symmetric Tree | DFS recursive — cross-compare pairs | `dfs(root.left, root.right)`. Outside: `dfs(l.left, r.right)`. Inside: `dfs(l.right, r.left)`. Base cases identical to Same Tree. |
| LC 112 — Path Sum | DFS iterative pairs + recursive subtract-down | Iterative: push `[node, sum]`, check at leaves. Recursive: pass `targetSum - root.val` down; at leaf check `targetSum === root.val`. Return `left \|\| right`. |
| LC 222 — Count Complete Tree Nodes | Complete tree shortcut (O(log²n)) | Measure leftmost height and rightmost height from same root. If equal → perfect subtree → `2**h - 1`. Else: `1 + recurse(left) + recurse(right)`. Shortcut fires at multiple levels. |
| LC 543 — Diameter of Binary Tree | DFS post-order + closure variable | Two outputs: `best = Math.max(best, left+right)` (global diameter candidate) and `return 1 + Math.max(left, right)` (single arm for parent). Closure variable is the key. |
| LC 110 — Balanced Binary Tree | DFS post-order + sentinel return | Return `-1` to signal "unbalanced" — keeps return type uniform. Propagate `-1` up immediately. Return `1 + Math.max(left, right)` when valid. |
| LC 111 — Minimum Depth of Binary Tree | DFS — null-child-aware minimum | `Math.min` breaks when one child is null (returns 0). If left===0, return `1+right`. If right===0, return `1+left`. Only take `Math.min` when both sides are real. |

---

## DFS — Traversal Order (Pre/In/Post)

**Core idea:** Same recursive shape as the accumulate-a-value DFS pattern above (`null → []`, recurse both children, combine, return up) — but here the combine step is building an *ordered list*, not a number. The only thing that changes between preorder/inorder/postorder is where `root.val` sits relative to `left` and `right` in the returned array.

**When to reach for it:** Any "return the X-order traversal" problem. Recognize it as a variant of the same base-case-plus-combine shape used for depth/path problems, not a new pattern from scratch.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 144 — Binary Tree Preorder Traversal | root-left-right | `[root.val, ...left, ...right]` |
| LC 94 — Binary Tree Inorder Traversal | left-root-right | `[...left, root.val, ...right]` |
| LC 145 — Binary Tree Postorder Traversal | left-right-root | `[...left, ...right, root.val]` |

---

## Graph DFS — Flood Fill (Grid)

**Core idea:** Treat the grid as a graph (cell = node, 4-directional neighbours = edges). Outer double loop offers every cell to a recursive helper; the helper guards itself at the top (bounds → invalid → visited), marks visited *before* recursing, then floods all 4 directions. It returns a signal ("did I discover new territory?") — exactly one cell per connected component can return true, so the outer loop counts components by counting true returns.

**When to reach for it:** Counting/measuring islands, regions, connected areas in a grid; any "flood everything reachable from here" requirement.

**Key facts:**
- Stack (recursion) → DFS; queue → BFS. Sequential recursive calls do NOT execute as a layer — the first runs to completion before the second starts.
- Visited Set keys must be primitives (`'r,c'` strings) — arrays fail on reference equality.
- Mark visited before recursing or neighbours re-enter each other forever.
- O(m·n) time despite the outer loop calling the helper on every cell — visited makes repeat calls O(1) bounces.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 200 — Number of Islands | Count components (boolean signal) | One `true` per island — the first cell the scan reaches is the only flood origin; all later cells of that island fail the visited check |
| LC 695 — Max Area of Island | Accumulate a value (size) instead of a boolean | `return 1 + sum of 4 recursive calls` instead of `true`/`false`. Confirmed cold transfer of the LC 200 pattern with zero re-teaching. Mutate-in-place variant drops the Set (77th→22nd percentile jump reversed, i.e. big win). |
| LC 130 — Surrounded Regions | Region decision (collect array, decide after, two-pass act) | Walk hands back every coordinate touched, not just a boolean. Verdict (safe/captured) only computable once the whole region is walked — never decide or stop early. Decide-then-act as two separate passes over the array. Alternative: border-first flood (flood only from border cells, board itself as visited-tracker via a placeholder marker, one final pass) — O(1) aux space instead of O(m·n). **Not yet self-owned — flag for follow-up.** |

---

## Graph — In-degree / Out-degree Counting

**Core idea:** When a special node is defined by its relationship to *every other* node in a directed graph, track in-degree and out-degree as two separate counters built in one pass over the edge list. A single adjacency list only captures one direction.

**Isolated-node trap:** loop over the known range (`1..n`), not over the keys of a map built from the edges — a node with zero edges won't be a key in any map. Default missing counts with `?? 0`.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 997 — Find the Town Judge | Two-sided directed-graph condition | Judge = out-degree 0 AND in-degree n-1 (checking only one side is the classic trap); loop 1..n, not map keys, so isolated people get checked; `?? 0` default before comparing |

---

## Graph Traversal — Clone-and-Reuse via Map

**Core idea:** Duplicating a graph (or any cyclic structure) requires a `Map` from original → clone, not a `Set` — you need to retrieve the specific clone object, not just know one exists. Register a node's clone the instant it's discovered, before recursing/enqueueing further — this is what breaks cycles.

**DFS vs BFS distinction, proven concretely:** an iterative BFS and iterative DFS solution can be identical code except for one line — `queue.shift()` (oldest first) vs `stack.pop()` (newest first). The traversal order comes entirely from which end of the pending-work list you pull from, not from recursion vs loops.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 133 — Clone Graph | Clone-and-reuse via Map, 3 traversal variants (recursive DFS, iterative BFS, iterative DFS) | Register clone before recursing/enqueueing (cycle-safety); Map for reference-keyed lookup; one-line diff between BFS/iterative-DFS proves the traversal-order rule |

---

## Weighted Graph DFS — Search-and-Accumulate with a Sentinel

**Core idea:** When searching for *any one* valid path and computing something along it (not just reachability), the DFS accumulates a running value and uses a sentinel (impossible as a real answer, e.g. `-1`) to mark "this branch dead-ended." Return **immediately** on success — don't keep looping, or a dead branch's placeholder can corrupt an already-found correct answer.

**Modeling tip:** equation-style inputs (`a op b = value`) often become **two** directed edges — the given relationship plus its inverse (division → reciprocal weight).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 399 — Evaluate Division | Weighted graph, search + accumulate product | 2 directed edges per equation (value + reciprocal); DFS multiplies weights; `-1` sentinel for dead ends; return immediately on success. Canonical alternative: Weighted Union-Find. |

---

## Bit Manipulation — Mask & Shift

**Core idea:** `n & 1` reads the last bit (AND with 1 wipes every other bit). `n = n >>> 1` shifts the next bit into the last position. Loop while `n !== 0`.

**Key fact:** No decimal→binary conversion is needed — integers are already stored in binary; bitwise operators read that representation directly regardless of how the number is written in source.

**When to reach for it:** Any problem requiring inspection of every bit of an integer (counting set bits, reversing bits, checking specific bit positions).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 191 — Number of 1 Bits | Count set bits | `n & 1` + `n = n >>> 1` in a loop until `n === 0`; for 32-bit ints, capped at 32 iterations → O(1), not O(log n) |
| LC 190 — Reverse Bits | Build a positioned result | Shift `result` left, *then* OR in `n & 1` (order matters — OR-then-shift corrupts position). Fixed `for(32)` loop, not `while(n!==0)` — building needs every position visited, not just nonzero ones. `n = n >>> 1` to avoid sign-extension. |
