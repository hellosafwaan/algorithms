# Handoff — Interview Prep Sprint (Day 1 of 5)

## Context

Safwaan has an interview on **Friday 2026-06-19**. Role is **backend-first, then fullstack**. Today (Sun 2026-06-14) was Day 1 of the sprint. Valid Anagram (LC 242) is done.

## What Was Just Completed

**Valid Anagram (LC 242)** — clean session. Two solutions: two-map and one-map. Key bugs were all in the one-map approach:
1. Copy-paste variable name in `t` branch — caught when pointed to the line
2. Else-branch initial value for `t` was `1` instead of `-1` — caught after tracing `s="ab", t="ba"`
3. Comparison loop only iterated `s` — caught after tracing `s="aa", t="bb"` (negative counts on `b` were never checked)

He had no hesitation reaching for HashMap. One-map increment/decrement insight clicked fast when suggested. The comparison-loop bug was the most interesting — needed a counter-example, not just a question.

## Remaining Sprint Plan

| # | Problem | Status |
|---|---------|--------|
| 1 | Valid Anagram (LC 242) | ✅ Done today |
| 2 | Group Anagrams (LC 49) | Next |
| 3 | Longest Substring Without Repeating Characters (LC 3) | — |
| 4 | Josephus Problem | — |

## Next Session — Start Here

**Group Anagrams (LC 49).** Cold attempt immediately. No preamble.

Key things to watch on Group Anagrams:
- He'll reach for HashMap correctly — the question is what key he uses
- Probe: "what makes two strings belong to the same group?"
- He may not immediately think to sort the characters as the key — let him work toward it
- The sorted string as a key is the main insight; frequency array as key is the O(n·k) alternative (don't need to go there unless he asks)

## Safwaan's Current State

**What he knows:**
- HashMap for frequency counting — solid
- One-map increment/decrement pattern — just learned, hasn't internalized yet
- Length check as the first guard — instinctive

**What's fragile:**
- One-map comparison must use `Object.keys()` — just learned today, needs reinforcement
- Will he reach for `Object.values().every()` or write the loop? Either is fine — just watch for the "iterate s" mistake

## Coach Notes

- Move fast this week. If he's got the pattern, move on.
- LC 42 two-pointer redo: deferred to after the interview.
- After the sprint, return to normal curriculum: LC 3 (Sliding Window).
- Day plan: Sun (DSA) → Mon (SQL) → Tue (System Design) → Wed (SQL) → Thu (DSA light review)
