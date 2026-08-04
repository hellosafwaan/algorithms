# Session: Longest Substring Without Repeating Characters — Cold Redo — 2026-08-04

## What He Attempted

Unprompted, self-initiated cold redo of LC 3 (originally solved 2026-06-14, revisit queue due 2026-06-18 — over six weeks overdue). Started from a blank file, not the original solution, and opened already stuck:

```js
function lengthOfLongestSubstring(s) {
    const windowMap = new Map();
    let start  = 0;
    let longestStringLen = 0;
    let currentStringLen = 0;
    for (let end = 0; end < s.length; end++) {
        const currentElement = s[end];
        if(windowMap.has(currentElement)) {
            start++
        } else {
            window
        }
    }
}
```

## Where He Got Stuck

Rebuilt the whole thing piece by piece through guided questions, using a different technique than the original solve (frequency-count `Map` + `while`-shrink, rather than the last-seen-index jump from June) — the same shape used earlier the same day on LC 1343, LC 1456, and the fundamentals module's `longestUniqueSubstring`:

1. What should `windowMap` store? — landed correctly on a frequency count.
2. Add unconditionally, every iteration — got this right immediately.
3. First shrink-loop draft only decremented when `s[start] === currentElement` (the character that just caused the duplicate), not whatever character was actually leaving the window — traced `"abba"` and self-corrected to decrement `s[start]` generically.
4. Placed `return longestStringLen` *inside* the `for` loop — self-caught by running on `"abcabcbb"` and getting `1` instead of `3`, then moved the return outside.

Every fix came from his own reasoning after a guided question — no direct answer was given for any individual bug, unlike the LC 209 redo earlier in the same session.

## Mistakes Made

- Decremented only the character matching `currentElement` instead of the actual outgoing character (`s[start]`) — self-caught via a trace of `"abba"`.
- `return` statement placed inside the `for` loop, causing early termination after one iteration — self-caught by testing against a failing example.

## Key Insight

Rebuilt the general "expand-add, shrink-while-invalid, frequency Map" template from scratch and successfully applied it to a problem he'd previously solved with a different (jump-based) technique — good evidence the general template is more load-bearing than any one problem-specific trick. Self-assessed the new solution as "much better" than the old one; honestly, it isn't asymptotically faster (the old jump-based version does strictly less work — one `Math.max` jump vs. a character-by-character shrink), but it is more consistent with the template used everywhere else that day, and generalizes better to variants like "at most k distinct."

## Complexity Reached

O(n) time, O(min(n, alphabet size)) space — same as the original solve, not re-derived from scratch this session (discussion focused on the honest "is this actually better" comparison instead).

## Coach Notes for Next Session

- Interesting contrast within the same day: adapting *existing* code (LC 438 built directly from LC 567's solution) needed almost no scaffolding, while writing the *same underlying mechanism* from a blank file (this redo) needed several rounds of guided questions. Writing from scratch appears meaningfully harder for him than adapting nearby code, even when the mechanism itself was already used successfully earlier the same day — see patterns.md #78.
- Not moved to "Done" on the revisit queue — needed multiple guided questions throughout, even though no individual bug required a direct answer. Fresh fuse set.
- Second revisit-queue redo completed in the same session (after LC 209) — both self-initiated, neither raised by the coach, consistent with the standing "don't raise it, let him bring it up" instruction working as intended.
