Session: [027_2026-06-15_word-pattern](../../safwaan/sessions/027_2026-06-15_word-pattern.md)

## How It Felt

Pretty easy — came straight off LC 205 (Isomorphic Strings), so the shape was familiar. The only real difference was converting a space-separated string into an array to iterate in parallel with the pattern. Solved in two attempts.

## Key Insight

Word Pattern is Isomorphic Strings with words instead of characters. The bijection requirement is identical — pattern char ↔ word must be a consistent one-to-one mapping in both directions. The only implementation difference: `s` comes in as a space-separated string, so you split it first.

## Solution Walkthrough

So the problem gives you a pattern like `"abba"` and a string like `"dog cat cat dog"`. You need to check if the pattern and the words correspond to each other in a one-to-one way — `a` always means `dog`, `b` always means `cat`, and crucially, no two different pattern chars can map to the same word.

Why both directions? Because one direction alone isn't enough. If you only check pattern → word, you'd pass `"ab"` with `"dog dog"` — `a → dog`, `b → dog` looks fine from left to right. But `dog` is being claimed by two different letters, which breaks the pattern. You need the reverse check: `dog` must map back to exactly one pattern char.

Start by splitting `s` into words: `s = s.split(" ")`. Now you can index both with `i`. Then check that the lengths match — if `pattern.length !== words.length`, it's automatically false. A 4-char pattern against 3 words can't match.

The loop is the same check-then-set pattern from LC 205. For each `i`:

```js
const pChar = pattern[i];
const sWord = s[i];

if (patternMap.has(pChar) && patternMap.get(pChar) !== sWord) return false;
if (sMap.has(sWord) && sMap.get(sWord) !== pChar) return false;

patternMap.set(pChar, sWord);
sMap.set(sWord, pChar);
```

The `has(key) && get(key) !== value` check means: "I've seen this key before, and it was mapped to something *different* — conflict." If there's no prior mapping, we skip the conflict check and just set it. Setting the same key→value pair twice is harmless — no branch needed.

Watch the `.set()` argument order: it's always `(key, value)`. `patternMap` maps pattern char to word, so `patternMap.set(pChar, sWord)`. `sMap` maps word back to pattern char, so `sMap.set(sWord, pChar)`.

## Pattern Introduced

Hash Map — Bijection (Two Maps). See also: [[lc205-isomorphic-strings]]

Same pattern, different input type. The only structural difference from LC 205 is `s.split(" ")`.

## Watch Out For

- **`.set(key, value)` argument order** — patternMap maps pChar → sWord, so `patternMap.set(pChar, sWord)`. Getting the key and value swapped is the one easy slip here.
- **Length check at the top** — if the pattern and word array have different lengths, return false immediately before the loop.
- **Split before indexing** — `s` comes in as a string, `pattern` comes in as a string. You can index `pattern[i]` directly (strings are indexable), but you need `s.split(" ")` before you can index individual words.

## Template

```js
function wordPattern(pattern, s) {
    s = s.split(" ");
    if (pattern.length !== s.length) return false;

    const patternMap = new Map(); // char → word
    const sMap = new Map();       // word → char

    for (let i = 0; i < pattern.length; i++) {
        const pChar = pattern[i];
        const sWord = s[i];

        if (patternMap.has(pChar) && patternMap.get(pChar) !== sWord) return false;
        if (sMap.has(sWord) && sMap.get(sWord) !== pChar) return false;

        patternMap.set(pChar, sWord);
        sMap.set(sWord, pChar);
    }

    return true;
}
```

## Trace Through

Pattern: `"abba"` | Words: `["dog","cat","cat","dog"]`

| i | pChar | sWord | patternMap | sMap | result |
|---|-------|-------|------------|------|--------|
| 0 | a | dog | — | — | set a→dog, dog→a |
| 1 | b | cat | a→dog | dog→a | set b→cat, cat→b |
| 2 | b | cat | a→dog, b→cat | dog→a, cat→b | b→cat matches ✓, cat→b matches ✓ |
| 3 | a | dog | a→dog, b→cat | dog→a, cat→b | a→dog matches ✓, dog→a matches ✓ |

Return `true`.

Failure case — `"abba"` with `["dog","dog","dog","dog"]`:

| i | pChar | sWord | check |
|---|-------|-------|-------|
| 0 | a | dog | set a→dog, dog→a |
| 1 | b | dog | sMap.get("dog") = "a" ≠ "b" → **return false** |

## Complexity

**Time: O(n)** — one pass through n characters/words. Each `has`, `get`, `set` on a Map is O(1). Total: O(n).

**Space: O(n)** — two maps, each storing at most n entries (one per pattern char / one per unique word).

## Submissions

- [2026-06-15 — Accepted, 100th percentile runtime](https://leetcode.com/problems/word-pattern/submissions/2033236813)

## Open Questions

- Can you do this with a single Map if you namespace the keys yourself (e.g. prefix with "p:" or "s:")? Why might that be worse in practice?
