Session: [022_2026-06-14_valid-anagram](../../safwaan/sessions/022_2026-06-14_valid-anagram.md)

## How It Felt

Pretty easy once I knew what an anagram was (same characters, same counts, rearranged order). HashMap came to mind immediately. Two approaches: two maps and one map. The one-map approach had a subtle bug in the comparison step — only realized it after tracing a counter-example.

## Key Insight

**Two-map:** Build one frequency map per string, then compare them key-by-key. Safe to iterate only over `s` because the length check guarantees symmetry — any character in `t` with a different count will show up as a mismatch when you check `sMap[char] !== tMap[char]`.

**One-map:** Increment for `s`, decrement for `t`. If all counts balance to 0, they're anagrams. But here you **cannot** iterate over `s` in the comparison — characters that appear only in `t` get negative counts that never get checked. You must iterate `Object.keys(occurrence)`.

## Solution Walkthrough

The core question is: do both strings have exactly the same characters at exactly the same frequencies?

**Two-map approach:**

So you build one HashMap for each string — character → count. For each position `i`, you increment `sMap[s[i]]` and `tMap[t[i]]` (you can do both strings in one loop since they're the same length after the early return). Then you walk `s` and compare: if `sMap[s[i]] !== tMap[s[i]]` at any point, they differ.

Why is it safe to only iterate `s` here? Because you did a length check first. If the strings have the same length, then any character in `t` that isn't in `s` must be "replacing" something — meaning some `s` character has a higher count in `sMap` than `tMap`, which will be caught when you check that character.

**One-map approach:**

One map, where the invariant is: "if this map perfectly balances to all-zeros, the strings are anagrams." You increment for `s` characters and decrement for `t` characters. If a character appears twice in `s` and twice in `t`, it ends at 0. If it appears three times in `s` and twice in `t`, it ends at 1.

The subtle part: what if `t` has a character that `s` doesn't? Say `s="aa"`, `t="bb"`. The map becomes `{a: 0, b: -2}`. If you only walk `s` in the final check, you check `a` and `a` — both 0 — and return `true`. Wrong.

That's why you have to iterate `Object.keys(occurrence)` — all keys, not just the ones from `s`.

## Pattern Introduced

Hash Map — character frequency counting. Two variants:
- Two maps → compare them
- One map → increment/decrement → all keys must be 0

[[hash-map-complement-lookup]] is the related pattern for pair-finding; this is the frequency-counting variant.

## Watch Out For

- **One-map comparison must use `Object.keys()`** — iterating over `s` misses characters that only appear in `t` (they have negative counts that never get checked)
- **Initial value for `t` in one-map is `-1`, not `1`** — you're starting from 0 and subtracting
- **Space is O(1), not O(n)** — bounded by 26 lowercase letters regardless of input length. Say this in an interview.

## Template

```js
// Two-map
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const sMap = {}, tMap = {};
    for (let i = 0; i < s.length; i++) {
        sMap[s[i]] = (sMap[s[i]] ?? 0) + 1;
        tMap[t[i]] = (tMap[t[i]] ?? 0) + 1;
    }
    for (const char of Object.keys(sMap)) {
        if (sMap[char] !== tMap[char]) return false;
    }
    return true;
}

// One-map
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const map = {};
    for (let i = 0; i < s.length; i++) {
        map[s[i]] = (map[s[i]] ?? 0) + 1;
        map[t[i]] = (map[t[i]] ?? 0) - 1;
    }
    return Object.values(map).every(v => v === 0);
}
```

## Trace Through

`s = "listen"`, `t = "silent"`

After the loop (one-map):
- `l: 0, i: 0, s: 0, t: 0, e: 0, n: 0`

All zero → `true`. ✓

Counter-example that breaks iterating `s` only:
`s = "aa"`, `t = "bb"`
- Map after loop: `{a: 0, b: -2}`
- Iterating `s`: checks `a` (0) and `a` (0) → returns `true`. Wrong.
- Iterating `Object.keys`: checks `a` (0) and `b` (-2) → returns `false`. Correct.

## Complexity

**Time: O(n)** — one pass to build the map(s), one pass to compare. Two sequential loops, not nested. n = length of either string (same after the early return).

**Space: O(1)** — the map can have at most 26 keys (lowercase English letters only). Doesn't grow with n.

## Submissions

- Two-map: https://leetcode.com/problems/valid-anagram/submissions/2032690410
- One-map: https://leetcode.com/problems/valid-anagram/submissions/2032690683

## Open Questions

None.
