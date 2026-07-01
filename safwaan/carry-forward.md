# Carry Forward — Open Questions

Questions to probe at the start of the next session that uses the same pattern.

| Question | Pattern | Problem | Status |
| Can he explain cold why moving `root.val`'s position in the return array is the only thing that changes across pre/in/postorder? (Not asked directly this session — he confirmed "all good" but didn't walk through the reasoning.) | DFS — Traversal Order | 144, 94, 145 | open — probe at next traversal-adjacent problem (e.g. LC 105 Construct Tree from Preorder/Inorder) |
| At LC 543, `dfs` has two outputs: a return value for the parent and a side-effect on `best`. Can he explain cold what each one is computing and why they're different? | Trees — DFS + closure | 543 | partial — 2026-06-29: knew direction (best=current node, return=parent) but not the why (branching path can't continue). Needed direct answer. Probe again at LC 124. |
| Sentinel pattern cold — at LC 110, can he write the `-1` sentinel contract for `dfs` without being told the pattern name? | Trees — DFS sentinel | 110 | open — concept explained this session, not yet demonstrated cold |
| `^` vs `**` in JavaScript — `^` is XOR, `**` is exponentiation. Can he recall this cold before writing power calculations in trees? | JS toolkit | 222 | open — used `^` for exponentiation this session, corrected when caught |
| Complete tree shortcut: can he state cold what "measure all-left and all-right from same root" tells you, and why equal heights → perfect? | Trees — complete tree | 222 | open — needed guided questions to arrive at this |
| **Recursive returns** — how does a return value travel upward through the call stack? When do you return a value vs return nothing (void/undefined)? He self-identified this as a gap during LC 226. Wants a dedicated session on this. | Recursion fundamentals | 226 | open — explicitly requested by Safwaan 2026-06-27 |
| `for...in` vs `for...of` — can he state the rule cold? `for...of` for values (arrays, Sets, Maps, strings); `for...in` for plain object keys. | JS Toolkit | 128 | open — used `for...in` on a Set; explicitly flagged as a gap |
| LC 567 (Permutation in String) IS a character-frequency problem. Can he distinguish it from LC 30 cold — what's the structural difference? (LC 30 = words all same length, word-level unit; LC 567 = characters, anagram-style) | Sliding Window — pattern recognition | 30 | open — anagram instinct misapplied at LC 30; interesting test whether he correctly identifies LC 567 as character-based |
| Map comparison cold — can he write `isMapsEqual` without help? `for...of` on a Map gives `[key, value]` pairs. Size check first, then iterate. | JS Toolkit | 30 | open — had to give him the helper directly this session |
| Fixed vs variable window — can he state the difference cold? Fixed = window never resizes (slide and rebuild); variable = expand right always, shrink left while invalid. | Sliding Window — window type | 3, 209, 30 | open — got confused trying to pre-initialize the window at LC 30 |
| Cycle detection cold: given a transformation that might loop, does he reach for "track seen states in a Set" without a nudge? | Hash Set — Cycle Detection | 202 | open — needed one nudge at LC 202: "how do you detect a loop?" |
| Can he write the clean two-line bijection pattern cold (`if has && get !== val → false; set unconditionally`)? | Hash Map — Bijection | 205, 290 | open — check-then-set structure correct; `.set(key, value)` argument order slipped at LC 290 |
| Can he explain cold why one map fails on isomorphic strings — construct the counterexample himself? | Hash Map — Bijection | 205 | answered 2026-06-15 — gave the counterexample unprompted: "A maps to dog, B maps to dog — one way true, other direction false" |
| `left = Math.max(left, map[char] + 1)` — can he state this rule cold and explain why `Math.max` is needed? | Sliding Window | 3 | open |
| "Add unconditionally, shrink while valid" — can he state the expand/shrink structure cold without the scaffold? Probe at LC 424: "what's the first thing you do every iteration?" | Sliding Window | 209 | open — needed explicit scaffold this session |
| `Math.min()` for tracking minimum — used `if (len < min)` instead of `Math.min(min, len)`. Does he reach for the built-in first? | JS toolkit / pattern #23 | 209 | open |
| Window size formula `i - left + 1` — does he remember the `+1` and why? | Sliding Window | 3 | open |
| Set vs HashMap for sliding window — when does index tracking make HashMap the right choice? | Sliding Window / data structure choice | 3, 219 | answered 2026-06-15 — LC 219: Set is O(k) space and avoids storing indices entirely; HashMap stores value→last index and checks distance directly; both O(n) time, Set wins on space |
| Two-pointer LC 42 hard redo — can he derive `leftMax <= rightMax` cold, build the full solution without hints? Target was 2026-06-13 — OVERDUE, do this at next session start | Two pointers — running max | 42 | open — overdue |
| `Math.max()` / `Math.min()` habit — does he reach for the built-in first, or still write if/else? Self-identified as a recurring issue (LC 121, 2026-06-13) | JS toolkit | 121 | open |
| Why does comparing current heights (`height[left] < height[right]`) sometimes fail, while comparing running maxes (`leftMax <= rightMax`) always works? | Two pointers — bottleneck reasoning | 42 | open |
| "Set for membership, HashMap for key-value" — can he state this rule cold and apply it without prompting? | Hash Set vs HashMap | 217 | open |
| Falsy-zero trap: `if(obj[key])` misses `0` — does he pre-empt this next time, or only catch it when prompted? | HashMap edge case | 217 | open |
| Can you implement Pow(x, n) iteratively using the binary representation of n? | Exponentiation by Squaring | 50 | open |
| `Math.floor(n/2)` vs `n >> 1` — same for non-negative integers. When would you use bit shifting in an interview? | JS / Bit Manipulation | 50 | open |
| Boyer-Moore without a majority guarantee — how would you verify the candidate? | Boyer-Moore | 169 | open |
| Boyer-Moore generalisation: find element appearing > n/3 times — how many candidates do you need? | Boyer-Moore | 169 | open |
| JS object iteration — `for...in`, `Object.keys()`, `Object.entries()` — drill these cold | Toolkit / JS | 169 | open |
| Does the "numbers are already binary, no conversion needed" misconception resurface on the next bit manipulation problem? | Toolkit / Bit Manipulation | 191 | answered 2026-06-16 — did not resurface at LC 190, applied `n & 1` correctly without hesitation |
| Log-based complexity reasoning — self-identified weak spot ("I'm bad at computing time complexities when it's log based"). Can he derive O(log n) cold on the next divide-and-conquer / binary search problem? | Complexity analysis | 191, 50 | open — needed full walkthrough this session |
| `>>` vs `>>>` — can he state cold which one sign-extends and pick the right one before writing code, rather than needing a direct explanation? | Toolkit / Bit Manipulation | 190 | open — explained directly this session at LC 190; first appearance of this specific gap (separate from the "no conversion needed" fact) |
| Counting loop (`while(n!==0)`) vs building loop (fixed `for`) — does he reach for the right loop shape cold when a problem needs bits positioned, not just inspected? | Bit Manipulation — loop shape | 190 | open — needed a trace of `n=1` to see the early-termination bug this session |
| Shift-then-OR vs OR-then-shift when building a bit-by-bit result — does the correct order stick without re-deriving via trace table next time? | Bit Manipulation — build order | 190 | open — needed two trace tables (wrong order, right order) this session, confirmed it clicked |
| Constraint-reading habit — he independently noticed LC 190's actual constraints (`n` even) made `>>> 0` unnecessary here. Does he proactively check problem constraints before assuming the general-case approach on future problems? | Problem-reading habit | 190 | open — strong moment this session, worth reinforcing |
|----------|---------|---------|--------|
| Where else does right-to-left in-place update appear? | Right-to-left update | 119 | open |
| What's the formula for total cells in an n-row triangle? | 2D construction | 118 | open — said n(n-1)/2, correct is n(n+1)/2 |
| Redo Next Permutation fresh — can he derive the descending suffix observation independently? | Pivot + two-pointer | 31 | open — explicit plan agreed with Safwaan |
| Two loops in a solution — are they sequential or nested? How does that change complexity? | Complexity analysis | 31 | open — mistook O(n) for O(n²) this session |
| Regex basics in JavaScript — what it is, how to use it | Regex / string matching | 125 | open — hasn't used regex in a long time, treated it as a black box today |
| LC 125 runtime is 5th percentile — why is regex slow? Rewrite with charCodeAt | Performance / string matching | 125 | open — explicit plan to revisit |
| Recursive version of palindrome check | Two-pointer recursion | 125 | open — deferred by Safwaan, wants to internalize iterative first |
| Why can't two pointers be used on LC 1 (unsorted)? What property does the array need for two pointers to work, and why does sorting first not count as a valid fix here? | Two-pointer prerequisites | 1 | answered — sorted guarantee makes pointer moves deterministic; unsorted = guessing |
| Two-pointer pattern recognition — can he identify cold? | Two pointers | 167, 977, 11 | answered — reached for two pointers AND the "fix one + two-sum the rest" decomposition cold on 3Sum (2026-06-04) |
| Pointer movement justification — can he prove cold why you move the shorter pointer? | Two pointers | 11 | answered — proved it cold at the start of 2026-06-04 session, full chain, no hints |
| Explain the 3Sum optimized solution in his own words, cold | Two pointers / k-sum | 15 | answered 2026-06-05 — clean unprompted explanation |
| Why is `if (nums[i] > 0) break` valid in 3Sum? | Two pointers / sorted-array reasoning | 15 | answered 2026-06-05 — derived correctly: sorted ascending, all elements right are larger, triplet sum must be positive |
| Does he recall why a Set won't dedupe arrays (reference vs value equality)? Probe `Set`/`Map`/`Array.from` cold | Toolkit / JS collections | 15 | answered 2026-06-05 — reference equality explained correctly; broader toolkit review still open |
| Before closing a loop, does he ask "could there be more?" | Subproblem completeness | 15 | open — stopped at first match 3× in one session |
| Does he approach in-place array problems per-element rather than per-group? (LC 80: reached for occurrence tracking + write-on-transition) | Read/write shape recognition | 80 | open — probe on next in-place array problem |
| k-generalization: "allow at most k duplicates" → skip when nums[p2] === nums[p1 - k]. Does k=1 reduce to LC 26? | Read/write generalization | 80 | open |
| Why can the fill pointer never overwrite a value still needed? (gap starts at n, shrinks only when nums2 is consumed, hits 0 exactly when loop ends) | Two pointers — fill backwards | 88 | explained 2026-06-06 — probe cold on or after 2026-06-08 |
| When would you reach for the swap approach vs the read/write approach in an interview? | Two pointers — read/write vs swap | 27 | open — he noticed the difference but hasn't articulated the decision rule |
| When tracing a bug, use the smallest input that can expose it — did he apply this himself? | Debugging heuristic | 27 | open — heuristic taught 2026-06-06, probe next time he needs to trace |
| Write the naive push+sort solution for LC 88 | Two pointers — fill backwards | 88 | open — deferred this session |
| While loop condition `<` vs `<=` — can he identify the edge case without an example? | Two pointers | 977 | open — needed example this session |
| Implicit global variable (`right` without declaration keyword) — does he catch it? | JS fundamentals | 977 | open — not caught this session |
