# Handoff — Interview Prep Sprint (Day 2 of 5, five problems done)

## Context

Safwaan has an interview on **Friday 2026-06-19**. Today (Mon 2026-06-15) he completed Isomorphic Strings (LC 205).

## What Was Just Completed

**LC 205 — Isomorphic Strings**

A bijection problem — new pattern shape. First instinct was to use a single map for both directions, which is correct conceptually but collapses s-side and t-side into the same namespace. Took a trace through "paper"/"title" to make the collision concrete. Two-map solution came together after that with a few ordering/naming fixes. Finished with the clean two-line check-then-set pattern.

Key additions:
- **Two-map bijection pattern**: `sToT` and `tToS` keep namespaces separate
- **Check-then-set**: `if (map.has(k) && map.get(k) !== v) return false; map.set(k, v)` — cleaner than if/else chains

## Remaining Sprint Plan

| # | Problem | Status |
|---|---------|--------|
| 1 | Valid Anagram (LC 242) | ✅ Done |
| 2 | Group Anagrams (LC 49) | ✅ Done |
| 3 | Longest Substring Without Repeating Characters (LC 3) | ✅ Done |
| 4 | Ransom Note (LC 383) | ✅ Done |
| 5 | Isomorphic Strings (LC 205) | ✅ Done today |
| 6 | Word Pattern (LC 290) | Next |
| 7 | Happy Number (LC 202) | — |
| 8 | Contains Duplicate II (LC 219) | — |
| 9 | Longest Consecutive Sequence (LC 128) | — |

LC 424, Josephus deferred to after interview.
LC 3 cold redo still planned for Wednesday 2026-06-18.

## Next Session — Start Here

**Start with Word Pattern (LC 290).** Cold attempt. This is the same bijection shape as LC 205 — mapping words (not characters) to characters. The two-map pattern applies directly.

Key things to watch:
- Does he reach for two maps unprompted, or does he start with one again?
- Does he split the pattern string and word string correctly to iterate them in parallel?
- The pattern is a string of characters (`'a','b'`), the words are an array — he'll need to split one or both.

## Safwaan's Current State

**What he knows:**
- Hash Map frequency counting — solid
- Two-map bijection — just introduced; not yet cold-proof
- Clean check-then-set pattern — just shown, probe cold
- Sliding window expand/shrink logic — solid conceptually

**Gaps to watch:**
- `Math.max` guard in sliding window — not yet confirmed cold
- One-map vs two-map reasoning — probe cold at Word Pattern

## Coach Notes

- Move fast. Interview is Friday.
- LC 3 revisit: scheduled for 2026-06-18 (Wednesday).
- LC 42 two-pointer redo: deferred to after interview.
- Isomorphic Strings took longer than expected (~45 min) — the namespace collision concept wasn't intuitive. Word Pattern will confirm if it landed.
