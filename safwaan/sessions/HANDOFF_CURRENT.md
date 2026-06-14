# Handoff — Interview Prep Sprint (Day 1 of 5, second problem)

## Context

Safwaan has an interview on **Friday 2026-06-19**. Today (Sun 2026-06-14) he completed two problems: Valid Anagram (LC 242) and Group Anagrams (LC 49).

## What Was Just Completed

**Group Anagrams (LC 49)** — needed guidance on the key insight. First instinct was pairwise O(n²) using Valid Anagram as a helper. After a few questions, landed on: sort each string's characters, use as HashMap key, push originals into the array at that key. Return `Object.values(map)`.

One bug: swapped if/else branches (caught with one prompt). Complexity arrived at correctly after prompting (O(n·k log k)).

45th percentile runtime — expected for the sort-based approach.

## Remaining Sprint Plan

| # | Problem | Status |
|---|---------|--------|
| 1 | Valid Anagram (LC 242) | ✅ Done today |
| 2 | Group Anagrams (LC 49) | ✅ Done today |
| 3 | Longest Substring Without Repeating Characters (LC 3) | Next |
| 4 | Josephus Problem | — |

## Next Session — Start Here

**LC 3 — Longest Substring Without Repeating Characters.** Cold attempt immediately.

This is proper sliding window. Different shape from LC 121 (which was just "running min + single pass"). Here the window actually resizes — you expand right when the new character is unseen, shrink from the left when it's a duplicate.

Key things to watch:
- He'll probably reach for a Set or HashMap correctly — the question is whether he knows HOW to shrink the window
- The naive O(n²) is: for each left pointer, scan right until you hit a duplicate. Let him write this first.
- The optimal insight: instead of restarting the window from the left, track WHERE each character was last seen (HashMap char → index), and jump the left pointer directly to lastSeen[char] + 1
- Watch for off-by-one on the left pointer jump (should be `lastSeen[char] + 1`, not `lastSeen[char]`)
- Also watch for: updating lastSeen for a character that's outside the current window — this is a subtle bug where an old position causes the left pointer to jump backwards

## Safwaan's Current State

**What he knows:**
- HashMap for character tracking — solid
- Sorted string as key (just learned today)
- Running min / single pass (LC 121)

**Gaps to watch:**
- Doesn't instinctively find canonical keys for grouping — needed the sorted-key insight given
- Abstract-to-code bridge on new patterns: needs a concrete trace of what variables look like after each step

## Coach Notes

- Move fast this week. Interview is Friday.
- If he gets the naive solution for LC 3, push directly to: "what if you could jump the left pointer instead of incrementing it one step at a time?"
- LC 42 two-pointer redo: still deferred to after the interview.
