# Session: Longest Substring Without Repeating Characters (LC #3) — 2026-06-14

## What He Attempted

Started with a naive string-tracking approach: maintain a running `subString`, reset to `""` on duplicate, track `maxLength`. Direction was right but reset logic was wrong — threw away all characters when hitting a duplicate, including ones to the right of the first occurrence that were still valid.

After getting the naive to work (O(n²)), moved to the HashMap optimal. Struggled with the "window" concept — first time seeing proper sliding window. Once a visual trace was provided, coded it step by step but needed guidance on the `left = Math.max(left, ...)` guard.

Also reached for a Set solution from online mid-session — redirected.

## Where He Got Stuck

1. **Naive:** reset `subString = ""` instead of `subString.slice(dupIndex + 1)` — didn't see that chars between the first occurrence and the duplicate are still valid.
2. **Naive:** `maxLength` not updated in the else branch — last window missed.
3. **Optimal:** `currentWindowSize` computed before `left` was updated — stale value in the duplicate branch.
4. **Optimal:** `left = map[char] + 1` without `Math.max` — left pointer jumping backwards when the duplicate was outside the current window.
5. **Concept:** "window" needed a concrete visual trace before the code structure clicked.

## Mistakes Made

1. `const` on reassigned variables — recurring (3rd+ occurrence across sessions)
2. Reset window to `""` on duplicate — failed to preserve valid chars to the right of first occurrence
3. `maxLength` not updated in else branch — last window's length missed
4. `currentWindowSize` computed before `left` updated — stale in the else branch
5. `left = map[char] + 1` without `Math.max` — left can jump backwards when char was seen before current window
6. Pulled Set solution from online mid-session — redirected to derive the tradeoff himself

## Key Insight

A sliding window is two indices (`left` and `i`) that mark the current valid substring. When you hit a duplicate, don't reset — shrink from the left until the duplicate is gone. With a HashMap storing each char's last seen index, you can jump `left` directly to `map[char] + 1` in O(1). Always use `Math.max(left, map[char] + 1)` so left never goes backwards.

## Complexity Reached

Time: O(n) — `i` moves forward once; `left` only moves forward  
Space: O(n) — HashMap stores up to n entries (bounded by alphabet size in practice)

## Coach Notes for Next Session

- `left = Math.max(left, ...)` was given — probe this cold at start of next sliding window problem (LC 424)
- Safwaan wants to redo this problem within the week — consider a cold redo before LC 424
- Abstract-to-code bridge is still the main gap on new patterns — concrete variable trace after each step is what unlocked the code
- He correctly reasoned HashMap > Set for this problem after seeing the Set solution — that's a good sign
