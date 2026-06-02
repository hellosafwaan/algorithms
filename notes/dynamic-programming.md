# Dynamic Programming — Reference Notes

## What Is DP

DP solves problems with **overlapping subproblems** by storing results instead of recomputing them.

Three requirements:
1. **Overlapping subproblems** — same subproblems calculated multiple times
2. **Optimal substructure** — solution can be built from solutions to subproblems
3. **Naive recursion is too slow** — exponential without caching

## The Memoization Recipe (Top-Down DP)

Take any recursive solution and add 3 lines:

```javascript
function fib(n, cache = {}) {        // 1. Add cache parameter
  if (n in cache) return cache[n]    // 2. Check cache before computing
  if (n <= 1) return n
  cache[n] = fib(n-1, cache) + fib(n-2, cache)  // 3. Store result
  return cache[n]
}
```

**Critical:** Use `if(n in cache)` not `if(cache[n])` — cached value of 0 is falsy.

## Real Performance Impact

| Input | Naive (O(2^n)) | Memoized (O(n)) |
|-------|----------------|-----------------|
| fib(35) | ~55ms | ~0.033ms |
| fib(50) | ~60 seconds | ~0.037ms |

**1.6 million times faster** for fib(50).

## Why It Works — Call Tree

Naive fib(5) recalculates fib(2) twice, fib(1) three times:
```
                    fib(5)
                /          \
           fib(4)          fib(3)
          /     \          /    \
       fib(3) fib(2)    fib(2) fib(1)
       ...
```

Memoized: each value calculated exactly once. O(n) calls instead of O(2^n).

## Complexity

| Approach | Time | Space |
|----------|------|-------|
| Naive recursion | O(2^n) | O(n) stack |
| Memoization | O(n) | O(n) cache + O(n) stack |

## Patterns

### Linear Sequence (Fibonacci-type)
`f(n) = f(n-1) + f(n-2)`
Problems: Fibonacci, Climbing Stairs

### 0/1 Choice
`f(n) = max(include, exclude)`
Problems: House Robber, 0/1 Knapsack

### Coin Change
`f(amount) = min over all coins of 1 + f(amount - coin)`
Problems: Coin Change, Minimum Jumps

## Coming Up

- [ ] Bottom-up DP (tabulation) — iterative, no call stack
- [ ] 2D DP — grid problems, string matching
