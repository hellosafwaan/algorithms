# Session: Group Anagrams (LC 49) — 2026-06-14

## What He Attempted

First approach: use Valid Anagram as a helper and do pairwise comparison. Fix one element at index 0, scan the rest for matches, mark visited with a Set, repeat for index 1 (searching index 2 onwards), etc. O(n²).

After redirected to think about what anagrams share, second approach: sort each string, use sorted string as HashMap key, push the original into the array at that key. Return `Object.values(map)`.

## Where He Got Stuck

Didn't independently land on the sorted-key insight. Got as far as "they're all lowercase" when asked what anagrams have in common. Needed the direct hint: "what do eat, tea, ate look like if you sort their characters?" — clicked immediately.

Also needed `split("").sort().join("")` given — didn't reach for it independently.

## Mistakes Made

- if/else branches swapped — was creating a new array in the "already exists" branch and pushing in the "doesn't exist" branch. Caught when pointed to the branches.

## Key Insight

Sort each string's characters → identical for all anagrams. Use that as the HashMap key. The value is an array of original strings that share that sorted form. One pass through `strs`, `Object.values()` at the end. Done.

## Complexity Reached

Time: O(n·k log k) — n strings, each sorted in O(k log k) where k is string length  
Space: O(n·k) — storing all strings in the map

## Coach Notes for Next Session

- Sorted string as key is the canonical pattern for "group by character signature" — he'll need to recall this cold. Worth checking if he can name the pattern at the start of next session that involves anagram grouping.
- First instinct was still O(n²) pairwise — didn't immediately think to find a shared canonical form. This is the abstract-to-key gap: knows HashMap, knows he needs to group, but doesn't immediately see WHAT to use as the key.
- Once insight was given, execution was fast and clean. Only one bug (swapped branches), caught with one prompt.
- Next: LC 3 — Longest Substring Without Repeating Characters (Sliding Window). This is real sliding window territory, different shape from LC 121.
