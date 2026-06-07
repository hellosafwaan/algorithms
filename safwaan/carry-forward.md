# Carry Forward — Open Questions

Questions to probe at the start of the next session that uses the same pattern.

| Question | Pattern | Problem | Status |
| Can you implement Pow(x, n) iteratively using the binary representation of n? | Exponentiation by Squaring | 50 | open |
| `Math.floor(n/2)` vs `n >> 1` — same for non-negative integers. When would you use bit shifting in an interview? | JS / Bit Manipulation | 50 | open |
| Boyer-Moore without a majority guarantee — how would you verify the candidate? | Boyer-Moore | 169 | open |
| Boyer-Moore generalisation: find element appearing > n/3 times — how many candidates do you need? | Boyer-Moore | 169 | open |
| JS object iteration — `for...in`, `Object.keys()`, `Object.entries()` — drill these cold | Toolkit / JS | 169 | open |
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
