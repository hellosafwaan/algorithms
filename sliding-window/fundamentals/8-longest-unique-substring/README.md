# longestUniqueSubstring

**Problem Statement**

Write a function, `longestUniqueSubstring`, that takes in a string `s`. The function should return the length of the longest substring of `s` that contains no repeating characters.

```js
longestUniqueSubstring('abcabcbb'); // -> 3   ('abc')
longestUniqueSubstring('bbbbb');    // -> 1   ('b')
longestUniqueSubstring('');         // -> 0
```

**Approach**

Same variable-size "expand then shrink-while-invalid" shape as the sum problems, but the window's *validity condition* is now "no character appears more than once" instead of a numeric bound — tracked with a frequency object, `window`.

1. Expand: add `s[end]` to the window's frequency count.
2. The window becomes invalid exactly when the character just added now has a count `> 1` (a duplicate). While that's true, shrink from the left — decrementing the leaving character's count — until the duplicate is resolved.
3. After the (possible) shrink, the window `[start, end]` is guaranteed unique — measure its size and keep the max.

**Why checking `window[currentChar] > 1` is enough** (rather than checking the whole window): only the character that was *just added* can have caused a new duplicate — every other character's count was already valid before this step. So shrinking until that one specific character's count drops back to 1 is sufficient to restore validity.

**Complexity**

Let `N` = length of `s`.

- `start` and `end` each advance at most `N` times total — **O(N)** time.
- The `window` frequency object holds at most one entry per distinct character — **O(min(N, alphabet size))** space.

**Implementation:** [`index.js`](index.js)
