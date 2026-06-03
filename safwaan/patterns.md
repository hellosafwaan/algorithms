# Safwaan — Patterns & Observations

This file tracks recurring patterns in how Safwaan thinks, makes mistakes, and learns. Updated after every session.

---

## Mistake Patterns

### 1. Missing return on recursive call
- **Seen in:** Sum 1 to N (Session 1)
- **What happened:** Wrote `fibonacci(n-1) + fibonacci(n-2)` without returning it
- **How it was caught:** Guided question — "what does your function return?"
- **Status:** Hasn't recurred since

### 2. Wrong base case value
- **Seen in:** Sum 1 to N (Session 1), Fibonacci (Session 1)
- **What happened:** Returned wrong value at base case (off-by-one on index)
- **How it was caught:** Tracing through a concrete small example
- **Status:** Improved — now checks by tracing before submitting

### 3. Cache falsy check
- **Seen in:** Fibonacci memoization (Session 1)
- **What happened:** Used `if(cache[n])` which fails when cached value is 0
- **How it was caught:** **He caught it himself** during implementation
- **Status:** Internalized — unlikely to recur

### 4. Skipping complexity analysis
- **Seen in:** Reverse String (Session 2)
- **What happened:** Completed the solution and documentation without complexity analysis until explicitly asked
- **How it was caught:** He flagged it himself after the session and asked for it to always be included
- **Status:** Self-aware about this now — still probe for it

### 5. Wrong function name in recursive call
- **Seen in:** Reverse String (Session 2)
- **What happened:** Called the wrong function name inside the recursive case
- **How it was caught:** He caught it himself when tests failed
- **Status:** Caught independently — good sign

---

## Breakthrough Moments

### DP Core Insight — Session 1
Safwaan independently articulated: *"Store and reuse values instead of recomputing."* This came after seeing the Fibonacci call tree. He wasn't told this — he saw it. This is the foundation everything in DP builds on.

### Real-world skepticism — Session 2
After completing recursive string reversal, he unprompted pointed out it's O(n²) and impractical. Shows he's thinking beyond "does it work" to "should you use this." Strong interview instinct.

### Self-correction pattern
Across sessions, Safwaan consistently finds his own bugs when asked the right question rather than being told what's wrong. This is a strong signal — he has the debugging instinct, just needs the prompt to activate it.

---

## What's Solid

- Base case identification — reliable now
- Tracing through concrete examples — does this naturally
- Questioning practicality of solutions — strong instinct
- Self-correcting when guided — very consistent

## What's Still Developing

- Proactively analyzing complexity without being prompted
- Edge case enumeration before coding
- Connecting new problems to previously learned patterns independently
- Distinguishing sequential loops from nested loops when reasoning about complexity
- Regex — hasn't used it in a long time, treated as a black box; cover charCodeAt as the practical alternative

---

### 7. Off-by-one on inner loop start index
- **Seen in:** Pascal's Triangle II (2026-06-03)
- **What happened:** Started inner loop at `row.length - 1` instead of `row.length - 2` — updated the newly pushed `1` when it should never change
- **How it was caught:** Traced through `rowIndex = 3`, saw `[1, 2]` at i=1 instead of `[1, 1]` — found it himself
- **Status:** Caught via tracing — the trace-to-find-bugs habit is solid

---

### 8. Time complexity on sequential loops mistaken for nested
- **Seen in:** Next Permutation (2026-06-03)
- **What happened:** Called the solution O(n²) because there were two loops, but they run sequentially (outer breaks after finding pivot), not nested for full n×n
- **How it was caught:** Asked him to think about what the worst case actually looks like — needed the explanation given
- **Status:** Understood once explained — probe again next time there are multiple loops

---

### 6. Array assignment vs element assignment confusion
- **Seen in:** Pascal's Triangle (2026-06-03)
- **What happened:** Wrote `triangle[i] = [1]` for both the first and last element of each row — overwrites the whole row on the last step
- **How it was caught:** Asked to trace through i=3, j=3 — he identified the issue himself after one targeted question
- **Status:** Caught independently once prompted — watch for this in future 2D problems
