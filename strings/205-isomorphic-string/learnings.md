# LC 205 — Isomorphic Strings

Session: [026_2026-06-15_isomorphic-strings](../../safwaan/sessions/026_2026-06-15_isomorphic-strings.md)

## How It Felt

Pretty confusing at first. The bidirectional insight came early — "if e maps to a, then a maps to e." But the one-map approach seemed natural and it took a while to understand why it breaks. The namespace collision thing wasn't obvious until tracing "paper"/"title" character by character. Once the two-map structure clicked, the code came together, and seeing the clean two-line version at the end made it feel obvious in hindsight.

## Key Insight

A character in `s` and the same character in `t` are in different namespaces. `'e'` appearing in `s` and `'e'` appearing in `t` are unrelated — they just happen to be the same letter. One map conflates them. Two maps keeps the s-side and t-side claims separate.

The clean pattern once you have two maps: **check for conflict first, then set unconditionally.** Setting the same value twice is harmless.

## Solution Walkthrough

So the problem is asking: can you replace every character in `s` with some character to get `t`? The key constraint is that the replacement must be consistent (every `'e'` maps to the same thing) and one-to-one (no two different characters in `s` can map to the same character in `t`).

The one-to-one constraint is bidirectional. If `e→l` in s→t, then `l→e` must hold in t→s. If `r` then tries to map to `l`, we need to catch that `l` is already taken.

Why can't you do this with one map? Say you store both `e→l` and `l→e` in a single map. Now when `r` tries to map to `e` (a different scenario), you check `map.has('e')` — and you find the s-side entry `e→l`. But that's not a conflict! `'e'` as a t-side target hasn't been claimed by anyone. The single map can't distinguish between "e is an s-side key I already processed" and "e is a t-side character someone already claimed."

So: two maps. `sToT` tracks what each s-character maps to. `tToS` tracks what each t-character maps to. At each position:

1. If `s[i]` is already in `sToT`, its mapped value must equal `t[i]`. If not — conflict, return false.
2. If `t[i]` is already in `tToS`, its mapped value must equal `s[i]`. If not — conflict, return false.
3. Otherwise, record both mappings.

The clean version collapses the if/else into one line per map:

```js
if (sToT.has(sc) && sToT.get(sc) !== tc) return false;
if (tToS.has(tc) && tToS.get(tc) !== sc) return false;
sToT.set(sc, tc);
tToS.set(tc, sc);
```

Setting the same value again when there's no conflict is harmless, so you don't need an explicit `continue` — just check, then always set.

## Pattern Introduced

**Hash Map — Bijection (Two Maps)**

When you need a consistent one-to-one mapping between two sets, use two maps — one per direction. A single map collapses both namespaces and causes false collisions when a letter appears on both sides.

## Watch Out For

- **One map is not enough.** The instinct to store both directions in one map is natural but wrong. s-side keys and t-side keys can be the same letter — they collide.
- **Check before set, in the right order.** You must check `tToS.has(tc)` before `tToS.set(tc, sc)`, otherwise you may overwrite an existing mapping.
- **The comparison in tToS check is `=== sc`, not `=== tc`.** Easy to flip — you're checking "does the t-character already map back to the right s-character?"

## Template

```js
function isIsomorphic(s, t) {
    const sToT = new Map();
    const tToS = new Map();

    for (let i = 0; i < s.length; i++) {
        const sc = s[i], tc = t[i];
        if (sToT.has(sc) && sToT.get(sc) !== tc) return false;
        if (tToS.has(tc) && tToS.get(tc) !== sc) return false;
        sToT.set(sc, tc);
        tToS.set(tc, sc);
    }

    return true;
}
```

## Trace Through

`s = "paper"`, `t = "title"`

| i | sc | tc | sToT | tToS | result |
|---|----|----|------|------|--------|
| 0 | p  | t  | {p→t} | {t→p} | continue |
| 1 | a  | i  | {p→t, a→i} | {t→p, i→a} | continue |
| 2 | p  | t  | sToT.get('p')==='t' ✅ | tToS.get('t')==='p' ✅ | continue |
| 3 | e  | l  | {p→t, a→i, e→l} | {t→p, i→a, l→e} | continue |
| 4 | r  | e  | r not in sToT | e not in tToS ✅ | set r→e, e→r |

`s = "badc"`, `t = "baba"`

| i | sc | tc | check |
|---|----|----|-------|
| 0 | b  | b  | new → set b→b, b→b |
| 1 | a  | a  | new → set a→a, a→a |
| 2 | d  | b  | d new in sToT; tToS.get('b')==='b', but sc is 'd' → conflict → return false ✅ |

## Complexity

**Time: O(n)** — one pass through both strings, all map operations are O(1).

**Space: O(1)** — the problem says "any valid ASCII character." ASCII has 128 characters (or 256 for extended). Either way, the maps are bounded by a fixed constant, not by the input length `n`. So space is O(1), not O(n).

## Submissions

- [Accepted — 90th percentile](https://leetcode.com/problems/isomorphic-strings/submissions/2033211894) — 2026-06-15

## Open Questions

- Can you solve this without a Map — using plain objects? What changes?
- Word Pattern (LC 290) is the same bijection shape but maps words to characters — same two-map approach applies.
