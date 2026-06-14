# Session: Valid Anagram (LC #242) — 2026-06-14

## What He Attempted

Immediately reached for HashMap. Proposed two maps (one per string), storing character counts. Got the population logic right on the first try. Added a length check early after recognising the different-length edge case. Wrote a correct comparison loop over `s`.

Then rewrote it with a single map: increment for `s`, decrement for `t`, check all values are 0.

## Where He Got Stuck

**Bug 1 (one-map):** Copy-paste error — wrote `else occurence[currSChar] = 1` inside the `t` branch. I pointed to the line; he spotted it immediately.

**Bug 2 (one-map):** The `else` for `t` set to `1` instead of `-1`. I asked him to trace `s="ab", t="ba"` — he saw `occurrence={a:0, b:2}` and got it.

**Bug 3 (one-map):** Comparison loop only iterated over `s`. He argued it was fine, same as the two-map solution. Trace `s="aa", t="bb"` exposed it — `occurrence={a:0, b:-2}`, loop checks `a` and `a`, returns `true` incorrectly. He then switched to iterating `Object.keys(occurrence)`.

## Mistakes Made

- Copy-paste variable name in `t` branch (`currSChar` instead of `currTChar`) — caught when pointed to the line
- Wrong initial value for unseen `t` characters (`1` instead of `-1`) — caught after tracing `s="ab", t="ba"`
- Comparison loop over `s` only — argued it was correct, caught after tracing `s="aa", t="bb"`

## Key Insight

The two-map comparison loop over `s` works because the length check guarantees symmetry — any character in `t` that isn't in `s` would show up as a count mismatch somewhere. The one-map approach breaks this because `t`-only characters accumulate negative counts that never get checked if you only walk `s`. You need to iterate all keys.

## Complexity Reached

Time: O(n) — one pass to build, one pass to compare  
Space: O(1) — bounded by 26 lowercase characters regardless of input length

## Coach Notes for Next Session

- He had no hesitation reaching for HashMap — good
- The one-map increment/decrement idea clicked fast once I suggested "what if you increment for one string and decrement for the other?"
- The comparison loop bug was genuinely subtle — he needed a trace to see it, not just a question. That's fine.
- No carry-forward from this problem. Clean session.
- Next: Group Anagrams (LC 49)
