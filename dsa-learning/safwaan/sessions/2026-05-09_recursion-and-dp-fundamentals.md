# Session: Recursion & DP Fundamentals — 2026-05-09

## Problems Covered
1. Sum 1 to N
2. Factorial
3. Power of 2
4. Fibonacci (naive → memoized)

## What He Attempted

Started with a prerequisites assessment (call stacks, return values, scope) — passed comfortably. Then moved into Sum 1 to N.

**Sum 1 to N — 3 attempts:**
- Attempt 1: Missing return statement on recursive call
- Attempt 2: Wrong recursive relationship
- Attempt 3: Correct — `return n + sumToN(n-1)` with base case `n === 0 return 0`

**Factorial and Power of 2:** First attempt success on both. Pattern recognition was kicking in.

**Fibonacci — key session:**
- Made base case indexing error (`n===1, n===2` instead of `n===0, n===1`)
- After call tree visualization, independently articulated: *"Store and reuse values instead of recomputing"*
- Implemented memoization correctly
- Independently caught the `if(cache[n])` falsy bug — changed to `if(n in cache)`
- Ran performance tests: fib(35) 55ms → 0.033ms, fib(50) 60s → 0.037ms

## Key Insight

The call tree visualization made overlapping subproblems obvious. Once he saw fib(2) being calculated twice and fib(1) three times, the cache idea was self-evident. He didn't need to be told — he saw it.

## Complexity Reached

Fibonacci naive: O(2^n) time, O(n) space
Fibonacci memoized: O(n) time, O(n) space

## Coach Notes for Next Session

- Complexity analysis wasn't included until the end — probe for it earlier
- Cache check bug was self-caught — reinforce this confidence
- Ready for index-based recursion (strings/arrays)
