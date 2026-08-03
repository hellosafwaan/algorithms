# countSubstringAnagrams

**Problem Statement**

Write a function, `countSubstringAnagrams`, that takes in two strings, `s` and `anagram`. The function should return the count of substrings of `s` that are anagrams of `anagram`.

```js
countSubstringAnagrams('cbaebabacd', 'abc'); // -> 2   ('cba' at index 0, 'bac' at index 6)
```

**Approach**

Builds directly on [`4-has-substring-anagram`](../4-has-substring-anagram) — same fixed-size window sliding over `s` — but a `Set` isn't enough anymore. `Set` only tells you *which* characters are present; two windows can share the same characters but different counts (e.g. `"aab"` vs `"abb"` both have the set `{a, b}` but aren't anagrams of each other). So the window state upgrades from a `Set` to a `Map` tracking exact frequency per character.

1. Build `anagramMap`, the frequency count of every character in `anagram`.
2. Build `windowMap` from the first `k` characters of `s`; compare it to `anagramMap` and increment `count` if it's an exact frequency match.
3. Slide one character at a time: decrement the outgoing character's count (deleting the key entirely once it hits 0, so map size stays an accurate signal of distinct characters present), increment the incoming character's count.
4. After each slide, compare frequencies again and increment `count` on a match.

**Why delete a key at count 0 instead of leaving it at 0:** without deleting, `windowMap.size` would count characters that used to be in the window but no longer are, breaking the `size` check inside `isEqualFrequencyInMap` — a stale `0` entry would make two maps look different in size even when their actual contents match.

**Complexity**

Let `N` = length of `s`, `K` = length of `anagram`.

- Building the initial `windowMap` and `anagramMap` is O(K) each.
- Each slide is O(1) (one delete/set on each map).
- Each `isEqualFrequencyInMap` comparison iterates `anagramMap`, which has at most O(K) entries — O(K) per check, and there are `N - K + 1` windows.
- Overall: **O(N·K)** time (dominated by the per-window comparisons), **O(K)** space for the two maps.

**Implementation:** [`index.js`](index.js)
