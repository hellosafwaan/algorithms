# Carry Forward — Open Questions

Questions to probe at the start of the next session that uses the same pattern.

| Question | Pattern | Problem | Status |
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
| Explain the 3Sum optimized solution in his own words, cold | Two pointers / k-sum | 15 | open — deferred 2026-06-04 (was tired); ASK BEFORE he re-reads the learnings file |
| Why is `if (nums[i] > 0) break` valid in 3Sum? | Two pointers / sorted-array reasoning | 15 | open — it's in his saved solution but wasn't derived in session |
| Does he recall why a Set won't dedupe arrays (reference vs value equality)? Probe `Set`/`Map`/`Array.from` cold | Toolkit / JS collections | 15 | open — none of it surfaced this session; recommended a deliberate review |
| Before closing a loop, does he ask "could there be more?" | Subproblem completeness | 15 | open — stopped at first match 3× in one session |
| While loop condition `<` vs `<=` — can he identify the edge case without an example? | Two pointers | 977 | open — needed example this session |
| Implicit global variable (`right` without declaration keyword) — does he catch it? | JS fundamentals | 977 | open — not caught this session |
