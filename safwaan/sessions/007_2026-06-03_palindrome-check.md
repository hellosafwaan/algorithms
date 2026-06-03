# Session: Valid Palindrome (LC 125) — 2026-06-03

## What He Attempted
Two-pointer approach: left and right pointers moving inward, skip non-alphanumeric, compare characters. Built up incrementally — started with a basic version, added lowercase, added skip logic, fixed if→while bug, fixed bounds guard.

## Where He Got Stuck
- Didn't know how to check alphanumeric — asked about manual array of symbols first, then asked for the built-in approach
- Used `if` instead of `while` for skipping — needed prompting to see why one skip wasn't enough
- Bounds check: wrote `left <= s.length - 1` before the regex, which still accesses `s[left]` out of bounds — needed to swap condition order to `left < right &&` first

## Mistakes Made
- `if` instead of `while` for skipping non-alphanumeric (classic — only skips one at a time)
- Bounds condition in wrong order — regex evaluated before the guard

## Key Insight
The two inner `while` loops need `left < right` as the first condition, not last — short-circuit evaluation means the regex never runs when pointers have crossed.

## Complexity Reached
Time: O(n) — Space: O(1)

## Runtime
466ms — beats only 5.04%. Cause: regex is expensive per character. Fix: `charCodeAt()` comparison instead.

## Coach Notes for Next Session
- Revisit with charCodeAt optimization — let him figure out why regex is slow first, then introduce charCodeAt
- Deferred: recursive version of palindrome check (Safwaan's choice — wants to internalize two-pointer iteratively first)
- Regex gap noted — cover when it naturally comes up again
