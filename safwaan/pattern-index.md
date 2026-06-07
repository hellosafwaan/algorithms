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

---

## Hash Set — Membership Tracking

**Core idea:** When you only need to know whether something was seen (no value to store alongside it), use a Set. `has()` is O(1) and works cleanly on any value — no falsy-zero trap, no string key conversion.

**When to reach for it:** "Does this element appear more than once?", "Have I seen this before?", any membership-only check.

**Set vs HashMap:** Use Set when you track existence only. Use HashMap when you also need to store something (complement, count, index).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 217 — Contains Duplicate | Membership tracking | Add each element to Set; `has()` before `add()`. No falsy-zero edge case. |

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
