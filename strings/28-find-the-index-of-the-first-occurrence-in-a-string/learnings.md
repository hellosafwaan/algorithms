# LC 28 — Find the Index of the First Occurrence in a String

Session: [057_2026-07-13](../../safwaan/sessions/057_2026-07-13_strstr.md)

## How It Felt

Felt easy — straightforward brute force, no bugs, no struggle.

## Key Insight

For each possible starting index in `haystack`, check if `needle` matches starting there, character by character. Bail out early on the first mismatch. If you get all the way through `needle` without a mismatch, you've found it — return the starting index.

## Solution Walkthrough

The outer loop picks every valid starting index `i` in `haystack` — valid meaning there's still enough room left for `needle` to fit, which is why it stops at `haystack.length + 1 - needle.length` rather than `haystack.length`.

The inner loop walks `needle` character by character, comparing `haystack[i + j]` to `needle[j]`. The moment there's a mismatch, `break` — no point checking the rest, this starting index is dead. If the inner loop reaches its last index (`j === needle.length - 1`) without ever breaking, every character matched, so return `i`.

One edge case worth tracing: what if `needle` is longer than `haystack`? Then `haystack.length + 1 - needle.length` is negative, and `i < (negative number)` is false immediately — the outer loop just never runs, and the function safely falls through to `return -1`. No crash, no special-case check needed.

The empty-needle case is handled by the guard at the top — LeetCode's contract says an empty `needle` should return `0`.

## Pattern Introduced

**String Matching — Brute Force.** For each starting position, compare byte by byte, bail on mismatch. Distinct from the sliding-window family (LC 3, LC 209, LC 30) because there's no window state carried forward between positions — it's a fresh comparison from scratch at every `i`. This is what makes it O(m·n): the wasted work of re-comparing prefixes that were already known to match on a previous (failed) attempt.

## Watch Out For

Nothing that tripped him up this session — clean first-pass solve.

## Template

```js
var strStr = function(haystack, needle) {
    if (needle.length === 0) return 0;
    for (let i = 0; i < haystack.length + 1 - needle.length; i++) {
        for (let j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) break;
            if (j === needle.length - 1) return i;
        }
    }
    return -1;
};
```

## Trace Through

`haystack = "a"`, `needle = "ab"`: outer bound is `1 + 1 - 2 = 0`, so `i < 0` is false from the start — loop never runs, falls through to `return -1`.

## Complexity

**Time: O(m·n)** where `m = haystack.length`, `n = needle.length`. Worst case, every one of the `m` starting positions requires comparing up to `n` characters before a mismatch or a full match (e.g. `haystack = "aaaa...a"`, `needle = "aaab"` — every position matches all but the last character before failing).

**Space: O(1)** — no extra data structures, just the two loop indices.

## Submissions

https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/submissions/2066517827

## Open Questions

- **KMP not yet built.** Introduced conceptually this session (LPS array = longest proper prefix that's also a suffix of `needle`; on mismatch at `needle[j]`, jump `j` to `lps[j-1]` instead of restarting at `0`, and `i` in `haystack` never moves backward — giving O(m+n)). Deferred to a future session — build the `lps` array first, then the O(m+n) scan.
