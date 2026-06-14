# Session: Isomorphic Strings — 2026-06-15

## What He Attempted

First attempt: single map storing both `s[i]→t[i]` and `t[i]→s[i]`. Correct conceptual instinct (bidirectional mapping) but wrong data structure shape — s-side and t-side keys shared the same namespace.

Second attempt: two separate maps (`sMapping`, `tMapping`) with conflict checks. Got there with some guidance on the order of operations and variable name fixes.

Final: shown the clean two-line conflict-check pattern — `if (map.has(key) && map.get(key) !== val) return false; map.set(key, val)` — and recognised immediately why it's cleaner.

## Where He Got Stuck

The one-map approach produced a false negative on "paper"/"title". When `s[4]='r'` tried to map to `t[4]='e'`, the map found `'e'` as an existing key — but that was the s-side entry `e→l`, not a t-side conflict. He needed to be walked through why `'e'` in s and `'e'` in t are different namespaces.

Also had the `map.set` before `map.has` ordering bug in the else branch, and used `map` (old variable name) after renaming to `sMapping`/`tMapping`.

## Mistakes Made

- **One-map namespace collision**: stored s-side keys and t-side keys in the same map — letter collision across sides produced false negatives
- **map.set before map.has**: set `currentSChar→currentTChar` before checking if `currentTChar` was already claimed — needed to flip the order
- **Wrong comparison in tMapping check**: wrote `tMapping.get(currentTChar) === currentTChar` instead of `=== currentSChar`
- **Stale variable name**: used `map.set` after renaming variables to `sMapping`/`tMapping`

## Key Insight

Two strings are isomorphic if and only if the character mapping is one-to-one in both directions. A single map can't enforce this because s-side keys and t-side keys share the same namespace — a letter can appear in both strings at different positions and collide incorrectly. Two separate maps keep the namespaces clean. The clean pattern: check for conflict first, then set unconditionally (setting the same value twice is harmless).

## Complexity Reached

Time: O(n) — one pass through both strings  
Space: O(1) — maps bounded by ASCII character set (~128 keys), not n

## Coach Notes for Next Session

- **Next problem:** Word Pattern (LC 290) — same bijection shape, but mapping words to characters. Should be fast if the pattern landed.
- **Probe cold:** Can he write the clean two-line version (check-then-set) without scaffolding?
- **Probe cold:** Why does one map fail? Can he construct the counterexample himself?
- He was confused that `'e'` in s and `'e'` in t are different things — letter identity vs. string membership. The "paper"/"title" trace was necessary to make it concrete.
