# maxOnesWithSingleFlip

**Problem Statement**

Write a function, `maxOnesWithSingleFlip`, that takes in a binary string `s` (characters `'0'` and `'1'` only). The function should return the length of the longest run of `1`s achievable by flipping at most one `'0'` to a `'1'`.

```js
maxOnesWithSingleFlip('1001'); // -> 2
maxOnesWithSingleFlip('0');    // -> 1
maxOnesWithSingleFlip('111');  // -> 3   (no flip needed)
```

**Approach**

The classic "at most one zero allowed in the window" variant of the variable-window pattern. Instead of a frequency map, the window state is a single boolean, `zeroUsed`, tracking whether the one allowed flip has already been "spent" on a zero currently inside the window.

1. Expand: for every character, if it's a `'0'`, that's a candidate to spend the flip on.
2. If the incoming character is `'0'` and the flip is already spent (`zeroUsed` is `true`), shrink from the left until the *previous* zero exits the window — at that point `zeroUsed` resets to `false`, freeing up the flip for the new zero.
3. Whether or not a shrink happened, if the incoming character was `'0'`, mark `zeroUsed = true` — it's now the zero occupying the window's one allowed flip.
4. Measure the window size on every iteration (not just after a shrink) and track the max, since a run of pure `1`s needs no flip and is still a valid candidate.

**Why shrink until the old zero specifically leaves** (not just any one step): the window's validity here isn't about window size or a numeric threshold — it's "does the window contain at most one zero." Shrinking one step isn't guaranteed to remove the zero that's causing the violation, so the `while (zeroUsed) { if (s[start] === '0') zeroUsed = false; start++; }` loop keeps stepping `start` forward specifically until it steps *past* the offending zero.

**Complexity**

Let `N` = length of `s`.

- `start` and `end` each advance at most `N` times total — **O(N)** time, O(1) space.

**Implementation:** [`index.js`](index.js)
