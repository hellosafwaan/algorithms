# LC 30 — Substring with Concatenation of All Words

Session: [035_2026-06-25](../../safwaan/sessions/035_2026-06-25_substring-with-concatenation-of-all-words.md)

## How It Felt

Tricky start — the anagram instinct kicked in hard and sent me down the character frequency path. Once the word-boundaries issue was shown with a counterexample, the right approach became clear. The two-loop structure and substring formula needed visual tracing to click. Guided solve — got there, but not clean.

## Key Insight

The atomic unit is **words**, not characters. All words are the same length (`wordLen`), so any valid window in `s` must decompose cleanly into `words.length` consecutive chunks of exactly `wordLen` each. Build a frequency map of the target words, then slide a fixed-size window across `s`, extract those chunks, build a second frequency map, and compare.

Character frequency fails because it ignores word boundaries — `"adbc"` has the same characters as `"abcd"` but can't be split into `["ab", "cd"]`.

## Solution Walkthrough

So the first thing to do is build `wordFreq` — a `word → count` map from the `words` array. This handles duplicate words (e.g., `["foo", "foo"]`).

The window size is fixed: `k = words.length * wordLen`. Every valid window is exactly this wide. Unlike LC 3 or LC 209, this window never grows or shrinks — you just slide it one position at a time from `i = 0` to `i = s.length - k` (inclusive — the last valid start is exactly `s.length - k`).

Inside the outer loop, clear `windowFreq` and run an inner loop `j` from `0` to `words.length - 1`. At each `j`, you extract the j-th word of the current window:

```
start = i + j * wordLen
end   = start + wordLen
word  = s.substring(start, end)
```

Why `i + j * wordLen`? Because words are packed contiguously inside the window. The first word starts at `i`, the second at `i + wordLen`, the third at `i + 2 * wordLen`, and so on. This is the formula that replaces the naive "check every possible permutation" approach.

Add each extracted word to `windowFreq`. After the inner loop, compare `wordFreq` and `windowFreq`. They match if they have the same size and every key in one appears with the same count in the other. If they match, push `i` to the result.

One subtlety: `wordFreq === windowFreq` compares object references — always false for two separate Maps. You need to iterate and compare entry by entry.

## Pattern Introduced

**Fixed-size sliding window + word frequency comparison.** Different from variable-size sliding window (LC 3, 209) — the window never resizes, there's no shrink condition, and the comparison unit is words not characters.

## Watch Out For

- **Anagram instinct** — this looks like an anagram problem but isn't. Character frequency misses word boundaries. The unit is always words.
- **`s.substring(start, end)`** — second argument is the *end index* (exclusive), not the length. Use `start + wordLen` not just `wordLen`.
- **Inner loop position** — `i + j * wordLen`, not `j * wordLen`. Easy to drop the `i` and build the wrong window.
- **Map comparison** — `===` compares references. Always compare entry by entry.
- **Off-by-one on outer loop** — last valid start is `s.length - k`, so the condition is `i <= s.length - k` (or `i < s.length - k + 1`).
- **Optimized approach exists** — O(n × L) by sliding within `wordLen` offset groups instead of rebuilding from scratch. Worth knowing; not needed for acceptance.

## Template

```js
function isMapsEqual(a, b) {
    if (a.size !== b.size) return false;
    for (let [key, val] of a) {
        if (b.get(key) !== val) return false;
    }
    return true;
}

function findSubstring(s, words) {
    const wordLen = words[0].length;
    const k = words.length * wordLen;
    const result = [];

    const wordFreq = new Map();
    for (const w of words) {
        wordFreq.set(w, (wordFreq.get(w) ?? 0) + 1);
    }

    const windowFreq = new Map();
    for (let i = 0; i <= s.length - k; i++) {
        windowFreq.clear();
        for (let j = 0; j < words.length; j++) {
            const start = i + j * wordLen;
            const word = s.substring(start, start + wordLen);
            windowFreq.set(word, (windowFreq.get(word) ?? 0) + 1);
        }
        if (isMapsEqual(wordFreq, windowFreq)) result.push(i);
    }

    return result;
}
```

## Trace Through

`s = "barfoothefoobarman"`, `words = ["foo", "bar"]`, `wordLen = 3`, `k = 6`

`wordFreq = { foo: 1, bar: 1 }`

`i = 0`:
- j=0: `s[0..3]` = `"bar"` → windowFreq: `{bar: 1}`
- j=1: `s[3..6]` = `"foo"` → windowFreq: `{bar: 1, foo: 1}`
- matches wordFreq → push 0 ✓

`i = 9`:
- j=0: `s[9..12]` = `"foo"` → windowFreq: `{foo: 1}`
- j=1: `s[12..15]` = `"bar"` → windowFreq: `{foo: 1, bar: 1}`
- matches wordFreq → push 9 ✓

Result: `[0, 9]`

## Complexity

**Time: O(n × m × L)** — outer loop is O(n) iterations. Each iteration: O(m) inner steps, each doing O(L) work for `substring`. Plus O(m) for `isMapsEqual`. Total: O(n × m × L). Since `k = m × L`, this is also written O(n × k).

**Space: O(m)** — `wordFreq` and `windowFreq` each hold at most `m` entries. Result array is O(n) worst case.

Better approach (O(n × L)) exists: instead of rebuilding from scratch at every `i`, slide within each of the `wordLen` possible starting offsets, advancing the window by `wordLen` each step (add one new word on the right, remove one old word on the left).

## Submissions

- 2026-06-25: Accepted, 1296ms, 41st percentile — [submission](https://leetcode.com/submissions/detail/2045056322/)

## Open Questions

- The optimized O(n × L) approach — slide within `wordLen` offset groups. How does the add-one/remove-one logic work there?
- LC 567 (Permutation in String) IS a character-frequency problem. Can you distinguish it from LC 30 cold — what's the structural difference?
