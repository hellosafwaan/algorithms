# Session: Reverse a String — 2026-05-09

## Problem
Recursively reverse a string. No loops.

## What He Attempted

Correctly identified the recursive relationship: last character goes first, then reverse the remainder. Implemented naive version using `slice()` first.

Then optimized with an index parameter to avoid creating new strings on each call.

## Mistakes Made

1. **Wrong function name in recursive call** — caught himself when tests failed, fixed independently
2. **Empty string edge case caused infinite recursion** in index-based version — caught via tracing

## Key Insight

Both versions are still O(n²) due to string concatenation — not because of slice. He pointed this out unprompted and then went further: *"Reversing a string does no good using recursion cos it's O(n²)."* Correct. Claude confirmed it.

## Complexity

Both versions: O(n²) time (string concatenation), O(n) space (call stack)

## What He Flagged

After the session, he noticed complexity analysis had been omitted and asked for it to always be included before documentation. Good self-advocacy.

## Coach Notes for Next Session

- Two-pointer recursion is next (Palindrome Check)
- He's ready — he understands index-based traversal and early termination will come naturally
- Probe: "when do you know for sure it's NOT a palindrome?" to get him to early termination
