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

### Independent k-sum decomposition — 3Sum (2026-06-04)
Without prompting, he saw that the two-pointer optimization meant "fix one element, run a two-sum on the rest." That's *the* core insight of 3Sum and the bridge from "two pointers on an array" to "two pointers as a subroutine." He also independently flagged that a single `if` won't drain consecutive duplicates — a `while` is needed — *before* it was raised. And he correctly self-diagnosed that he was overthinking the pointer direction ("an inward pointer never suddenly goes outward"). The problem-solving *shape* is becoming interview-grade; the gaps now are detail-precision and library recall, not approach.

---

## What's Solid

- Base case identification — reliable now
- Tracing through concrete examples — does this naturally
- Questioning practicality of solutions — strong instinct
- Self-correcting when guided — very consistent

### 13. Pointer movement justification — reasoning gap (not code bug)
- **Seen in:** LC 11 (2026-06-04)
- **What happened:** Knew intuitively to move the shorter pointer but couldn't fully prove why discarding the taller pointer's position is safe without guided questioning
- **How it was caught:** Socratic chain — "max possible height if you keep shorter fixed?" → "what happens to width?" → "so what happens to area?" — he concluded from there
- **Status:** Gets there when guided — probe cold next session

---

## What's Still Developing

- Proactively analyzing complexity without being prompted — *improving; led on it unprompted in 3Sum (called O(n³) and O(n²) himself)*
- Edge case enumeration before coding
- Connecting new problems to previously learned patterns independently — *improving; reached for two pointers + k-sum decomposition cold in 3Sum*
- Distinguishing sequential loops from nested loops when reasoning about complexity
- Regex — hasn't used it in a long time, treated as a black box; cover charCodeAt as the practical alternative
- **Subproblem completeness** — tends to stop at the first valid answer; must learn to ask "could there be more?" before closing a loop
- **Index-detail precision** — `+1/-1` neighbor math is unreliable in his head but solid when he traces
- **Toolkit/library recall** — `Set`, `Map`, `Array.from`, reference vs value equality not yet at his fingertips

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

### 9. Typo in variable name inside return statement
- **Seen in:** Two Sum (LC 1, 2026-06-03)
- **What happened:** Wrote `num[i]` instead of `nums[i]` inside the return statement — caught himself during trace
- **How it was caught:** Asked to trace through a concrete example — spotted it himself
- **Status:** Self-caught via tracing — consistent pattern

---

### 10. const on mutable pointer variables
- **Seen in:** Two Sum II (LC 167, 2026-06-03), LC 977 (2026-06-04)
- **What happened:** Declared `left` and `right` as `const` — can't decrement/increment them. In 977, also declared `right` without any keyword (implicit global).
- **How it was caught:** Reminded to look at variable declarations
- **Status:** Recurring quietly — keep watching

### 11. Adding two elements per iteration in two-pointer fill
- **Seen in:** LC 977 (2026-06-04)
- **What happened:** Tried to place one element from each end per iteration — missed that the second largest might come from the same end
- **How it was caught:** He traced through `[-6, -5, -1, 2, 4]` himself and saw the output order was wrong
- **Status:** Caught via tracing — the habit is solid

### 12. Off-by-one on while loop condition (< vs <=)
- **Seen in:** LC 977 (2026-06-04)
- **What happened:** Used `left < right` — misses the middle element on odd-length arrays
- **How it was caught:** Needed a concrete example to see it
- **Status:** Fixed once shown — probe on next two-pointer problem

---

### 6. Array assignment vs element assignment confusion
- **Seen in:** Pascal's Triangle (2026-06-03)
- **What happened:** Wrote `triangle[i] = [1]` for both the first and last element of each row — overwrites the whole row on the last step
- **How it was caught:** Asked to trace through i=3, j=3 — he identified the issue himself after one targeted question
- **Status:** Caught independently once prompted — watch for this in future 2D problems

---

### 14. Closes a subproblem at first success ("found one → done")
- **Seen in:** 3Sum (LC 15, 2026-06-04) — appeared THREE times in one session
- **What happened:** (a) Saw the no-duplicates requirement up front but didn't build for it. (b) `break`'d after the first matching pair instead of finding all pairs for a fixed `i`. (c) Forgot more matches could come, so didn't reset the triplet between them.
- **Root cause:** Mentally marks a subproblem complete after the first answer, when the task is "find *all*."
- **How it was caught:** Tracing `[-2,0,1,1,2]` exposed the missing `[-2,1,1]`.
- **Status:** Unifying meta-pattern across the session. Probe: before closing a loop, does he ask "could there be more?"

### 15. Index-detail precision flips under abstract reasoning
- **Seen in:** 3Sum (LC 15, 2026-06-04)
- **What happened:** Duplicate-skip neighbor check — `nums[right - 1]` vs `nums[right + 1]`. Reasoned the sign wrong in his head every round; **got it right the moment he traced** ("I'm comparing the same element, I need the next one").
- **Status:** Tracing is trustworthy, abstract index reasoning is not (yet). Push him to trace fiddly `+1/-1` decisions rather than reason them.

### 16. Toolkit / library exposure gap (knowledge, not reasoning)
- **Seen in:** 3Sum (LC 15, 2026-06-04)
- **What happened:** `Set` didn't occur to him for dedup; didn't know a Set won't dedupe arrays (reference equality); string-conversion workaround had to be given; `Array.from` forgotten.
- **Status:** Cheapest gap to close — it's recall, not thinking. Recommended a deliberate review of `Set`/`Map`/`Array.from`/reference-vs-value equality. Probe cold next session.

### 17. Tracing with inputs that are too large
- **Seen in:** LC 27 (2026-06-06)
- **What happened:** Traced `[3, 2, 2, 3]` (length 4, 2 targets) to find a termination bug — took ~40 minutes. The same bug would have been exposed by `[3, 3, 2]` or `[3, 2]` in a fraction of the time.
- **Root cause:** Reaches for the first given example rather than shrinking the input to the minimum that reproduces the issue.
- **How it was caught:** After finishing the trace, was told the heuristic: use the smallest input that can expose the bug.
- **Status:** Heuristic taught — probe next time he needs to trace a bug.
