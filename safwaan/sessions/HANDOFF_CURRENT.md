# Handoff — Interview Prep Sprint (Day 1 of 5, four problems done)

## Context

Safwaan has an interview on **Friday 2026-06-19**. Today (Sun 2026-06-14) he completed four problems: Valid Anagram (LC 242), Group Anagrams (LC 49), Longest Substring Without Repeating Characters (LC 3), and Ransom Note (LC 383).

**Sprint pivot:** LC 424 and Josephus Problem are now deferred. Safwaan wants to work through the LeetCode Hashmap study plan problem set to solidify the pattern before the interview.

## What Was Just Completed

**LC 383 — Ransom Note**

Fastest, cleanest solve in a while. First attempt, no hints, worked. He asked good conceptual questions (what is a ransom note, what does splice do, charCodeAt explanation) but the coding itself was frictionless. Explored five variations: his original Map solution, cleaned-up Map, early-exit with `remaining` counter, charCodeAt array, and naive splice approach.

New toolkit additions:
- `splice(idx, 1)` — removes 1 element at index from an array (arrays only, not strings)
- `charCodeAt(0) - 97` — maps 'a'→0, 'b'→1, ..., 'z'→25
- `?? 0` vs `|| 0` — `??` only falls back on undefined/null; `||` treats 0 as falsy

## Remaining Sprint Plan

| # | Problem | Status |
|---|---------|--------|
| 1 | Valid Anagram (LC 242) | ✅ Done today |
| 2 | Group Anagrams (LC 49) | ✅ Done today |
| 3 | Longest Substring Without Repeating Characters (LC 3) | ✅ Done today |
| 4 | Ransom Note (LC 383) | ✅ Done today |
| 5 | Isomorphic Strings (LC 205) | Next |
| 6 | Word Pattern (LC 290) | — |
| 7 | Happy Number (LC 202) | — |
| 8 | Contains Duplicate II (LC 219) | — |
| 9 | Longest Consecutive Sequence (LC 128) | — |

LC 424, Josephus deferred to after interview.
LC 3 cold redo still planned for Wednesday 2026-06-18.

## Next Session — Start Here

**Start with Isomorphic Strings (LC 205).** Cold attempt. This is a two-map bijection problem — different shape from frequency counting. He'll likely reach for frequency counting first; let him try before redirecting.

Key things to watch:
- Does he realize frequency counts alone aren't enough? (e.g., "egg" and "add" are isomorphic, but "badc" and "baba" are not — frequencies match but the mapping doesn't)
- The key insight is bidirectional mapping: s→t AND t→s must both be consistent

## Safwaan's Current State

**What he knows:**
- HashMap frequency counting — increment/decrement pattern solid
- `?? 0` shorthand for Map.get with default
- `splice(idx, 1)` for array element removal
- `charCodeAt(0) - 97` for letter → index mapping
- Sliding window: expand right always, shrink left on invalid window
- `Math.max(left, map[char]+1)` guard — given in LC 3, probe cold at LC 424 (when we return to it)

**Gaps to watch:**
- `Math.max` guard in sliding window — not yet confirmed solid cold
- Abstract-to-code bridge on new pattern shapes — may need variable trace

## Coach Notes

- Move fast this week. Interview is Friday.
- LC 42 two-pointer redo: still deferred to after the interview.
- LC 3 revisit: scheduled for 2026-06-18 (Wednesday).
- Ransom Note was the easiest problem in the sprint so far — don't expect that pace to continue on Isomorphic Strings.
