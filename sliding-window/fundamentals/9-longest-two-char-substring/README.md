# longestTwoCharSubstring

**Problem Statement**

Write a function, `longestTwoCharSubstring`, that takes in a string `s`. The function should return the length of the longest substring of `s` that contains at most 2 distinct characters. If no substring contains exactly 2 distinct characters, return `0`.

```js
longestTwoCharSubstring('eceba'); // -> 3   ('ece')
longestTwoCharSubstring('ccaabbb'); // -> 5   ('aabbb')
```

**Approach**

Generalizes [`8-longest-unique-substring`](../8-longest-unique-substring) from "at most 1 distinct character" to "at most 2 distinct characters." The frequency tracker upgrades from a plain object to a `Map`, and the validity check switches from "does this one character now repeat" to "how many distinct keys does the whole map have."

1. Expand: add `s[end]` to the frequency `Map`, incrementing its count (or seeding it at 1 if new).
2. While `counter.size > 2` (more than 2 distinct characters currently in the window), shrink from the left — decrement the leaving character's count, and delete its key entirely once the count hits 0, so `counter.size` accurately reflects distinct characters still present.
3. Only measure the window size when `counter.size === 2` exactly — a window with only 1 distinct character is valid but not what's being maximized here (a longer 2-distinct window will always be found elsewhere, or none exists).

**Why `counter.size` instead of checking each character's count individually** (like problem 8 did): here, *any* new character can push the window over the limit, not just the one just added — so the validity signal has to be about the map's overall shape (`size`), not a single character's count.

**Complexity**

Let `N` = length of `s`.

- `start` and `end` each advance at most `N` times total — **O(N)** time.
- The `counter` map holds at most 3 entries at any point (2 valid + 1 that just triggered the shrink) — **O(1)** space.

**Implementation:** [`index.js`](index.js)
