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

---

## Hash Map / Complement Lookup

**Core idea:** Store what you've seen so you can check for a complement in O(1) instead of searching.

**When to reach for it:** Find a pair that satisfies a condition, unsorted array.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 1 — Two Sum | Complement lookup | For each number, check if target - num is already in the map |

---

## Prefix / Suffix Precomputation

**Core idea:** Precompute running products/sums from both directions to answer queries in O(1).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| Product Except Self | Left pass + right pass | Build left products forward, multiply by right products backward |

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
