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

### 23. Prefers if/else over Math.max() / Math.min() — self-identified
- **Seen in:** LC 121 (2026-06-13)
- **What happened:** Wrote `if (profitMade < 0) maxProfits[i] = 0; else maxProfits[i] = profitMade` and `if (currentProfit > maxProfit) maxProfit = currentProfit` instead of reaching for `Math.max()`
- **How it was caught:** He self-identified this mid-session: "I always make this mistake — I don't use Math.max(), I use if conditions."
- **Fix:** When the logic is "keep the larger of two values" or "keep the smaller of two values," reach for `Math.max()` / `Math.min()` first.
- **Status:** Self-aware. Prompt: "is there a built-in that does exactly this?"

---

### 22. Falsy-zero trap on plain objects — not pre-empted yet
- **Seen in:** LC 217 (2026-06-07)
- **What happened:** Used `if(seen[currentElement])` on a plain object — returns `undefined` (falsy) for unseen keys, but also evaluates to falsy for `seen[0]` even after adding `0`. Misses zero as a duplicate.
- **How it was caught:** One prompt ("what does `seen[currentElement]` evaluate to when `currentElement` is `0`?") — caught immediately.
- **Fix:** Use `num in seen`, `seen[num] !== undefined`, or switch to Set (`has()` has no falsy trap).
- **Status:** Catches when prompted, doesn't pre-empt yet. Watch for this in future HashMap problems.

---

### 28. `for...in` vs `for...of` — knowledge gap, not reasoning gap
- **Seen in:** LC 128 (2026-06-15)
- **What happened:** Used `for (const elem in seen)` on a Set — gives nothing useful. `for...in` iterates object keys; Sets have no keys.
- **Fix:** `for...of` for values (arrays, Sets, Maps, strings). `for...in` for plain object keys.
- **Status:** Explicitly flagged as a gap. Needs deliberate drilling.

---

### 27. Cycle detection insight needs a nudge — "loop forever = repeated value" not automatic
- **Seen in:** LC 202 (2026-06-15)
- **What happened:** Recognised that the loop could run forever and needed to return `false`. But couldn't bridge "runs forever" → "must revisit a state" independently. Needed the question: "unhappy numbers loop forever — how do you detect a loop?"
- **Once nudged:** Immediately reached for the Set solution — "if I find the same element again." Correctly avoided `.includes()` on grounds of O(n), switched to Set unprompted.
- **Status:** One-question gap. General pattern to drill: any time a function might cycle, the detection tool is a Set of seen states.

---

### 29. Assumed bitwise operators require explicit binary conversion
- **Seen in:** LC 191 (2026-06-16)
- **What happened:** Believed `n` needed to be converted from decimal to binary before `&`/`>>` could be applied — didn't know JS integers are already stored in binary and bitwise operators read that representation directly.
- **How it was caught:** Needed a direct explanation; once given, immediately understood and applied `n & 1` correctly.
- **Status:** Knowledge gap, not reasoning gap. Probe at next bit manipulation problem (LC 338, 190, or 268) to confirm it doesn't resurface.

### 30. Missing reassignment on shift operator
- **Seen in:** LC 191 (2026-06-16)
- **What happened:** Wrote `n >>> 1;` as a standalone statement — computes the shifted value but discards it, so `n` never changes.
- **How it was caught:** Self-caught the moment asked what that line actually does to `n`.
- **Status:** Self-corrected immediately — good sign, consistent with his pattern of catching bugs once prompted with the right question.

### 31. Log-based complexity reasoning — self-identified weak spot
- **Seen in:** LC 191 (2026-06-16)
- **What happened:** Correctly derived O(log n) reasoning for the halving loop, but when asked to connect that to the fixed-32-bit-width O(1) framing, said outright: "I'm actually bad at computing time complexities when it's log based... please walk me through."
- **How it was caught:** Self-disclosed. Needed a full from-scratch walkthrough (log₂ as "exponent to reach n", concrete example with 32, then connecting to the bit-width cap).
- **Status:** Explicitly flagged by him as a recurring gap, not specific to this problem. Probe cold at the next log-based / divide-and-conquer problem (binary search, etc.).

---

### 32. Confused rotate with reverse
- **Seen in:** LC 190 — Reverse Bits (2026-06-16)
- **What happened:** First instinct was to repeatedly shift/rotate the whole number, believing enough rotations would produce the reversed bit order.
- **How it was caught:** Asked to trace rotating `1100` right 4 times (its own bit-width) — landed back at the original value, exposing that rotation cycles back rather than mirroring.
- **Status:** Corrected via one concrete trace. Once shown the mirror relationship (bit at position `i` → position `(n-1-i)`), redirected cleanly to the mask-and-build approach.

### 33. OR-then-shift vs shift-then-OR ordering bug
- **Seen in:** LC 190 (2026-06-16)
- **What happened:** When building `result` bit by bit, initially proposed OR-ing the new bit in first, then left-shifting — which re-shifts the bit just added on every iteration, pushing it further left than intended each time.
- **How it was caught:** Needed a full iteration-by-iteration trace table (two orderings, same input `1010`) — verbal explanation alone hadn't landed. Explicitly confirmed this approach worked ("reason like this, remember to do this more often").
- **Status:** Corrected with the trace table. Generalizes: when building up a value bit-by-bit, make room first (shift), then fill (OR) — never the reverse.

### 34. Tried OR-then-right-shift on `result` (loses bits entirely)
- **Seen in:** LC 190 (2026-06-16)
- **What happened:** After the left-shift-then-OR pattern was settled, asked whether OR-ing first and then *right*-shifting `result` would also work. Right-shifting immediately after placing a bit at position 0 pushes that exact bit off the edge and discards it.
- **How it was caught:** Trace table with `n = 1010` showed `result` collapsing to `0` — every bit placed got destroyed on the very next operation.
- **Status:** Resolved via trace. Useful confirmation that he was actively testing alternative orderings rather than passively accepting the first answer — good instinct, even though this particular alternative didn't pan out.

### 35. `while(n !== 0)` terminates before all 32 bit positions are processed
- **Seen in:** LC 190 (2026-06-16)
- **What happened:** Used a `while(n !== 0)` loop (correct for LC 191, which only needs to *count* bits) to also drive the *building* of `result`. But once `n`'s remaining bits are all `0`, the loop stops — even though `result` still needs more left-shifts to push earlier bits into their final positions. Traced with `n = 1`: loop ran once, `result = 1`, but the bit (originally at position 0) needs to end up at position 31, requiring 31 more shifts that never happened.
- **How it was caught:** Asked to trace `n = 1` specifically and check whether the single bit landed in the position the earlier mirror-relationship discussion (`position 0 → position 31`) predicted. Self-identified "the loop stops too early."
- **Fix:** Use a `for (let i = 0; i < 32; i++)` loop — fixed iteration count, independent of when `n` happens to hit `0`.
- **Status:** Important distinction from LC 191: counting bits only cares about bits that exist (early exit is fine), but building a positionally-correct result needs every position visited regardless of `n`'s value. Watch for this distinction recurring on LC 268 (Missing Number) or similar fixed-width problems.

### 36. `n >> 1` vs `n >>> 1` — didn't know the difference, risk of infinite loop
- **Seen in:** LC 190 (2026-06-16)
- **What happened:** Wrote `n = n >> 1` (signed right shift) instead of `n = n >>> 1` (unsigned). For an `n` whose leftmost bit is `1` (read as negative in 32-bit signed form), `>>` sign-extends — fills new slots with `1`s instead of `0`s — so `n` would never reach `0` and the loop would run forever.
- **How it was caught:** Direct explanation needed — genuine knowledge gap, not a reasoning gap. Once explained, correctly identified `>>>` as the right choice ("we don't have to preserve the sign").
- **Status:** Knowledge gap, closed with one explanation. Connects to pattern #29 (LC 191) — this is the same `>>>`-vs-`>>` fact resurfacing in a new context (shifting `n` down vs. the earlier no-conversion-needed fact). Reinforces that `>>>` should be the default for raw bit-pattern manipulation unless sign explicitly matters.

### 39. Anagram instinct misapplied to word-level problems
- **Seen in:** LC 30 (2026-06-25)
- **What happened:** Joined all words and built a character frequency map — treating the problem identically to LC 242 (Valid Anagram). Didn't account for word boundaries at all.
- **Root cause:** The surface pattern ("find all occurrences of a permutation of a set of things") looks identical to anagram problems. But here the "things" are whole words, not characters, and word boundaries must be preserved.
- **Fix:** Key question to ask: what is the atomic unit of comparison? Characters → character frequency. Words (all same length) → word frequency + slice by `wordLen`.
- **Status:** Conceptual error, corrected via counterexample. LC 567 (Permutation in String) IS a character-frequency problem — watch whether he distinguishes the two cold.

### 38. "Add unconditionally" structure not intuitive on sliding window minimize problems
- **Seen in:** LC 209 (2026-06-24)
- **What happened:** Made the add conditional on current sum (`if currentSum < target → add`). This skips elements when the window is already large enough, breaking contiguity. Took 5+ iterations and an explicit scaffold to fix.
- **Root cause:** Mental model was "if sum is already too big, skip adding" — didn't see that every element must enter the window before you decide to shrink.
- **Fix:** The add is always unconditional. Expand right every iteration. Shrink while valid. No if/else on the add.
- **Status:** Needed scaffold explicitly. Probe cold at LC 424: "what's the first thing you do every iteration of the outer loop?"

### 37. Asked "why force unsigned if input is signed?" — surfaced a real distinction worth noting
- **Seen in:** LC 190 (2026-06-16)
- **What happened:** Pushed back on using `>>> 0` before returning, since the problem labels the input a "32-bit signed integer." Good instinct to question rather than blindly apply a fix.
- **Resolution:** Distinguished between the *declared type* of the input/output (signed int, a language/problem-statement label) and what the algorithm actually *does* with the bits (treats them as a positionless pattern to rearrange, not a quantity). The `>>> 0` doesn't "add" sign meaning — it strips an unwanted negative interpretation that JS would otherwise apply by default.
- **Bonus:** Independently noticed the actual LeetCode (Top Interview 150 variant) constraints differ from the classic version — `0 <= n <= 2^31 - 2` and `n is even`. Correctly reasoned (with one guiding question) that since `n` is even, bit 0 of `n` is always `0`, which lands at bit 31 (the sign bit) of `result` after a full reversal — meaning `result` is guaranteed non-negative without needing `>>> 0` at all, for this specific constrained version.
- **Status:** Strong moment — questioned an instruction instead of accepting it, and reasoned through the constraint-driven exception correctly with minimal prompting.

---

### 40. Two-output function confusion — return value vs closure side-effect
- **Seen in:** LC 543 (2026-06-28)
- **What happened:** When a `dfs` function needs to both return a value to the parent AND update a global best, Safwaan kept conflating the two. Wrote `return 1 + left + right` (the full path) instead of `1 + max(left, right)` (the single arm). Needed repeated explanation + a scaffold before the distinction landed.
- **Root cause:** New pattern — "one function, two outputs." He's seen functions that return one thing. The idea that `best = ...` and `return ...` can be computing different things in the same function wasn't intuitive.
- **Fix:** At every node, ask: "what does my parent need?" (single arm = `1 + max(left, right)`) vs "what am I tracking globally?" (full path = `left + right`). These are different.
- **Status:** Visualizer built to reinforce. Probe cold at LC 124 (Max Path Sum) — same pattern, harder variant.

---

### 41. Reads sequential recursive calls as a BFS layer
- **Seen in:** LC 200 (2026-07-05)
- **What happened:** Looking at four recursive calls written in a row (`explore(up); explore(down); explore(left); explore(right)`), concluded the algorithm was breadth-first — "we chose a node and then we chose all the surrounding nodes." Pushed back confidently on it being called DFS.
- **Root cause:** Reading code textually rather than tracing execution. The four calls *look* like visiting a layer, but the first call runs to completion (floods everything reachable) before the second one starts.
- **How it was caught:** Call-stack trace table — showed the stack 4 deep at `explore(0,1)` (a neighbour-of-a-neighbour-of-a-neighbour) while `explore(0,0)`'s left/right probes hadn't run yet. Clicked immediately: "This is actually Depth First Search. I got it."
- **Fix:** Stack → depth-first. Queue → breadth-first. Sequential calls ≠ a layer; recursion depth hides inside the first call.
- **Status:** Corrected via trace (consistent with his trace-tables-over-verbal-explanation preference). Probe cold at LC 102 (Level Order Traversal, real BFS) and LC 695 (Max Area of Island, same DFS shape): "which one is this, and what data structure tells you?"

### 42. Video-assisted solve, declined own-words explanation — recognition vs ownership
- **Seen in:** LC 200 (2026-07-05)
- **What happened:** Solved via a video walkthrough (flagged this honestly, unprompted — good). At wrap-up, declined to explain the solution in his own words ("you can just explain it to yourself"). Counting-mechanism answer was directionally right but imprecise until sharpened.
- **Why it matters:** First time he's skipped the own-words explanation. Video → working code → "felt easy" is the classic recognition trap; the explanation step is the ownership test, and it was skipped exactly on the problem where it mattered most.
- **Status:** Cold redo scheduled on a short fuse (2026-07-19, ~2 weeks). At the redo, require the verbal walkthrough *before* coding. Watch whether video-solves recur and whether the explanation-skip becomes a habit on them.

---

## Breakthrough Moments

### DFS vs BFS distinction landed via call-stack trace — LC 200 (2026-07-05)
Started graphs with a genuine misconception (sequential recursive calls = BFS), stated it as confident pushback rather than a question — which is his best learning mode. One call-stack trace table later, he got the real distinction: the traversal order is determined by the data structure holding pending work (call stack = DFS, queue = BFS), not by how the code reads. This is the load-bearing fact for the whole graphs phase, and it arrived through his own wrong-but-articulated model being contradicted by a trace.

### Clean transfer of DFS combine pattern to traversal order — LC 144/94/145 (2026-07-01)
Solved all three traversal problems (preorder, inorder, postorder) independently outside a coaching session, all 100th percentile runtime, no reported mistakes. All three use the identical recursive shape (`if root===null return []`, recurse both children, combine) — the only change across all three is *where* `root.val` sits in the returned array. This confirms the DFS "ask subtrees, combine, return up" pattern (established at LC 104/100/226) has generalized cleanly to a new output shape (ordering, not accumulation). Self-directed — no hints needed, brought working solutions to session for logging only.

### Cross-session knowledge transfer — Single Number (LC 136, 2026-06-16)
Built a bit manipulation cheat sheet ahead of time, then applied XOR self-cancellation (`a^a=0`, `a^0=a`, commutative/associative) cold with zero hints — explained the why before writing code, then traced the result correctly on `[4,1,2,1,2]`. First session this sprint with zero mistakes and zero hints. Confirms that when foundational knowledge is solid going in, execution is clean — supports investing in toolkit/concept review before new patterns (echoes the toolkit recall gap noted elsewhere).

### DP Core Insight — Session 1
Safwaan independently articulated: *"Store and reuse values instead of recomputing."* This came after seeing the Fibonacci call tree. He wasn't told this — he saw it. This is the foundation everything in DP builds on.

### Real-world skepticism — Session 2
After completing recursive string reversal, he unprompted pointed out it's O(n²) and impractical. Shows he's thinking beyond "does it work" to "should you use this." Strong interview instinct.

### Self-correction pattern
Across sessions, Safwaan consistently finds his own bugs when asked the right question rather than being told what's wrong. This is a strong signal — he has the debugging instinct, just needs the prompt to activate it.

### Prefix max derived cold — LC 42 (2026-06-09)
After identifying the O(n²) bottleneck himself, he independently derived and built the prefix max approach — two precomputation passes, one accumulation pass — without any hints. Clean code, no bugs. This is exactly the kind of transfer you want to see: saw the bottleneck, knew what to precompute, knew how to do it.

### HashMap/Set pattern recognition solidifying — LC 217 (2026-06-07)
On Contains Duplicate, skipped brute force entirely and reached for HashMap directly — no prompting. Then independently identified that Set is cleaner than HashMap for membership-only problems: "when working with a duplicate problem, the Set solution should come first." This is a meaningful shift — he was previously going to nested loops by default.

### Independent optimal-split reasoning — Pow(x, n) (2026-06-07)
After the exponentiation by squaring concept was introduced, Safwaan independently formulated `x^n = x^i * x^j where i+j=n` and reasoned that i=j=n/2 is the optimal split — because it's the only choice where both subproblems are identical, so you compute one and reuse it. Any other split gives two different subproblems. He arrived at *why* n/2 is right, not just *that* it is.

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
- **Abstract-to-code bridge on new patterns** — needs a concrete variable trace before the loop structure clicks; gave window visualization before LC 3 optimal unlocked

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

### 24. Left pointer jumping backwards in sliding window
- **Seen in:** LC 3 (2026-06-14)
- **What happened:** Wrote `left = map[char] + 1` — when the duplicate was seen before the current window, this jumps left backwards, expanding the window to include characters already excluded.
- **Fix:** Always `left = Math.max(left, map[char] + 1)`. Left only moves forward.
- **Status:** Needed to be given. Probe cold at next sliding window problem.

---

### 26. One-map namespace collision on bijection problems
- **Seen in:** LC 205 (2026-06-15)
- **What happened:** Stored both `s[i]→t[i]` and `t[i]→s[i]` in one map. When `s[4]='r'` tried to map to `t[4]='e'`, the has-check fired on the s-side entry `e→l` — a false conflict. The same letter appeared as both an s-side key and a t-side target.
- **Fix:** Two separate maps (`sToT`, `tToS`). Each map owns one namespace. Pattern: check for conflict first, then set unconditionally — setting the same value twice is harmless.
- **Status:** Needed explanation and trace to see it. Probe cold at Word Pattern (LC 290).

---

### 25. currentWindowSize computed before left updates
- **Seen in:** LC 3 (2026-06-14)
- **What happened:** Computed `currentWindowSize = i - left + 1` at the top of the loop, then updated `left` in the else branch. Value was stale — used old window bounds.
- **Fix:** Compute window size after updating left, not before.
- **Status:** Caught via tracing.

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

### 20. Exponentiation by squaring — new pattern, not in toolbox
- **Seen in:** Pow(x, n) (LC 50, 2026-06-07)
- **What happened:** Exhausted both iterative and recursive O(n) approaches. Correctly identified he had no more tools. Couldn't derive the halving idea independently.
- **Root cause:** Pattern genuinely new — he's never encountered divide-and-conquer on exponents before.
- **How it was caught:** Had to introduce the concept from scratch with a worked example.
- **Status:** Understood and implemented correctly after explanation. Schedule revisit in 3 weeks.

### 21. n/2 float issue in recursion
- **Seen in:** Pow(x, n) (LC 50, 2026-06-07)
- **What happened:** Used `n/2` without `Math.floor` — for odd `n`, this gives a float (e.g., `5/2 = 2.5`), which never reaches `n === 0`, causing infinite recursion / Infinity.
- **How it was caught:** Got Infinity for `myPow(2, 10)`. Asked "what does n/2 give you in JavaScript?" — immediately got it.
- **Status:** Fixed with one question. General rule: always `Math.floor` when halving in recursion.

### 19. JS object iteration not at fingertips
- **Seen in:** LC 169 (2026-06-07)
- **What happened:** Forgot `for...in` syntax for iterating over objects — had to look it up online. Also didn't immediately recall that `for...in` keys are always strings, not numbers.
- **How it was caught:** Prompted "what type does `key` have in a `for...in` loop?" — immediately caught the string issue
- **Status:** Knowledge gap, not reasoning. Part of the broader toolkit recall issue.

### 16. Toolkit / library exposure gap (knowledge, not reasoning)
- **Seen in:** 3Sum (LC 15, 2026-06-04)
- **What happened:** `Set` didn't occur to him for dedup; didn't know a Set won't dedupe arrays (reference equality); string-conversion workaround had to be given; `Array.from` forgotten.
- **Status:** Cheapest gap to close — it's recall, not thinking. Recommended a deliberate review of `Set`/`Map`/`Array.from`/reference-vs-value equality. Probe cold next session.

### 18. Group thinking on in-place array problems
- **Seen in:** LC 80 (2026-06-06)
- **What happened:** Approached by tracking occurrence count per group and writing on group transition. The approach writes values only when encountering a new value — so the last element of each group is always missed. Each patch attempt added complexity without fixing the root cause.
- **Root cause:** Thinks about consecutive runs as a unit rather than processing each element individually.
- **How it was caught:** Full trace showed the second `2` in `[1,1,1,2,2,3]` never got written. Eventually scrapped the approach.
- **Status:** Named and logged. Probe: if he reaches for occurrence counting on an in-place problem, ask "can you think about this one element at a time?"

### 17. Tracing with inputs that are too large
- **Seen in:** LC 27 (2026-06-06)
- **What happened:** Traced `[3, 2, 2, 3]` (length 4, 2 targets) to find a termination bug — took ~40 minutes. The same bug would have been exposed by `[3, 3, 2]` or `[3, 2]` in a fraction of the time.
- **Root cause:** Reaches for the first given example rather than shrinking the input to the minimum that reproduces the issue.
- **How it was caught:** After finishing the trace, was told the heuristic: use the smallest input that can expose the bug.
- **Status:** Heuristic taught — probe next time he needs to trace a bug.
