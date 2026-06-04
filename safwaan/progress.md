# Safwaan — Progress Tracker

## Current Phase: Recursion Mastery → Dynamic Programming

---

## Completed

### Arrays (Foundation)
| Topic | Pattern | Status |
|-------|---------|--------|
| Most Common Elements | Top K / Heap | ✅ |
| Most Common Elements | Bucket Sort | ✅ |
| Product Except Self | Prefix/Suffix Precomputation | ✅ |
| Pascal's Triangle | 2D array construction / row-by-row DP | ✅ |
| Pascal's Triangle II | In-place row update, right-to-left iteration | ✅ |
| Next Permutation | Pivot + swap + two-pointer reverse | ⚠️ Guided walkthrough — revisit after palindrome check |
| Two Sum (LC 1) | Hash map / complement lookup | ✅ 85th percentile runtime |
| Two Sum II (LC 167) | Two pointers | ✅ 100th percentile runtime |
| Squares of a Sorted Array (LC 977) | Two pointers (both ends, fill backwards) | ✅ |
| Container With Most Water (LC 11) | Two pointers (converge, greedy move shorter) | ✅ |

### Recursion & DP
| Problem | Pattern | Status | Notes |
|---------|---------|--------|-------|
| Sum 1 to N | Basic recursion | ✅ | 3 attempts to mastery |
| Factorial | Basic recursion | ✅ | First attempt success |
| Power of 2 | Basic recursion | ✅ | First attempt success |
| Fibonacci (naive) | Recursion + call tree analysis | ✅ | Revealed overlapping subproblems |
| Fibonacci (memoized) | Top-down DP / Memoization | ✅ | 1.6M× speedup demonstrated |
| Count Digits | Division-based recursion | ✅ | |
| Reverse a String | Index-based recursion | ✅ | |
| Palindrome Check | Two-pointer iteration (LC 125) | ⚠️ Solved but slow (5th percentile runtime) — revisit with charCodeAt optimization | |
| Problem 4 (TBD) | TBD | ⏳ | Final recursion mastery problem |
| Climbing Stairs | DP reinforcement | ⏳ | First DP problem after recursion phase |
| House Robber | 0/1 optimization DP | ⏳ | |
| Coin Change | Choice DP | ⏳ | |

---

## Concepts Mastered

- [x] Call stacks and function scope
- [x] Base cases and recursive relationships
- [x] Index-based vs division-based recursion
- [x] Overlapping subproblems (call tree visualization)
- [x] Memoization (top-down DP) — cache parameter, check, store
- [x] Cache correctness: `if(n in cache)` vs `if(cache[n])`
- [ ] Two-pointer recursion with early termination (in progress)
- [ ] Bottom-up DP (tabulation)
- [ ] 2D DP problems

---

## Documents Created

- `recursion_sum_learning.md`
- `recursion_factorial_learning.md`
- `recursion_powerof2_learning.md`
- `fibonacci_overlapping_subproblems.md`
- `dp_memoization_speedup.md`
- `dynamic_programming_cheat_sheet.md`
- `count_digits_learning.md`
- `reverse_string_learning.md`
