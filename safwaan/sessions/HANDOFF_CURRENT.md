# Handoff — Interview Prep Sprint (Day 1 of 5, third problem done)

## Context

Safwaan has an interview on **Friday 2026-06-19**. Today (Sun 2026-06-14) he completed three problems: Valid Anagram (LC 242), Group Anagrams (LC 49), and Longest Substring Without Repeating Characters (LC 3).

## What Was Just Completed

**LC 3 — Longest Substring Without Repeating Characters**

First proper sliding window problem. Started with a naive subString approach (O(n²)) — direction was right but reset logic discarded valid characters. Debugged to a working naive, then moved to the HashMap optimal with guidance.

Key things that needed guidance:
- The "window" concept needed a concrete visual trace before the code structure clicked
- `left = Math.max(left, map[char] + 1)` — the `Math.max` guard was given (not derived)
- Pulled a Set solution from online mid-session — redirected

He correctly reasoned afterward why HashMap > Set for this problem (index tracking vs membership only).

Wants to redo this problem cold within the week.

## Remaining Sprint Plan

| # | Problem | Status |
|---|---------|--------|
| 1 | Valid Anagram (LC 242) | ✅ Done today |
| 2 | Group Anagrams (LC 49) | ✅ Done today |
| 3 | Longest Substring Without Repeating Characters (LC 3) | ✅ Done today |
| 4 | Longest Repeating Character Replacement (LC 424) | Next |
| 5 | Josephus Problem | — |

## Next Session — Start Here

**Start directly with LC 424.** Cold redo of LC 3 is planned for Wednesday 2026-06-18 — not this session.

**LC 424 — Longest Repeating Character Replacement.** This is a different shape of sliding window. The constraint isn't "no repeats" but "window length minus count of most frequent char ≤ k." That's a harder window validity check. Let him attempt cold.

Key things to watch for LC 424:
- Will he remember the `left = Math.max(left, ...)` guard?
- The validity check `(windowSize - maxFreq) > k` is non-obvious — let him struggle with it
- He'll need a frequency map for the window, not just a last-seen map

## Safwaan's Current State

**What he knows:**
- Sliding window: expand right always, shrink left on invalid window
- HashMap char → last index for O(1) left jump
- Window size = `i - left + 1`
- `Math.max(left, map[char]+1)` guard — given, not yet confirmed solid

**Gaps to watch:**
- `Math.max` guard — probe cold
- Abstract-to-code bridge still thin on new pattern shapes — may need variable trace to unlock LC 424

## Coach Notes

- Move fast this week. Interview is Friday.
- LC 42 two-pointer redo: still deferred to after the interview.
- LC 3 revisit: scheduled for 2026-06-21 in revisit queue, but Safwaan wants it sooner — check at session start.
