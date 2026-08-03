# countSubstringAtMostKDistinct

**Problem Statement**

Write a function, `countSubstringAtMostKDistinct`, that takes in a string `s` and a number `k`. The function should return the count of substrings of `s` that contain at most `k` distinct characters.

```js
countSubstringAtMostKDistinct('abc', 2); // -> 5   (a, b, c, ab, bc)
countSubstringAtMostKDistinct('aaa', 1); // -> 6   (every substring of 'aaa' has 1 distinct char)
```

**Approach**

Combines the two techniques already introduced: the distinct-character-count window from [`9-longest-two-char-substring`](../9-longest-two-char-substring) (generalized from a fixed "2" to any `k`), and the "count every valid subarray ending here" closing move from [`11-count-subarray-product`](../11-count-subarray-product).

1. Expand: add `s[end]` to the frequency `Map`, `counter`.
2. Shrink while `counter.size > k` — removing from the left, deleting a key once its count hits 0, until at most `k` distinct characters remain.
3. Add `end - start + 1` to `count`. This works for the same reason it did in problem 11: since the window `[start..end]` already satisfies "at most `k` distinct," every shorter suffix of it ending at `end` — `[start+1..end]`, `[start+2..end]`, etc. — can only have the *same or fewer* distinct characters, so all of them are valid too, and this one expression counts them all at once.

**Complexity**

Let `N` = length of `s`.

- `start` and `end` each advance at most `N` times total — **O(N)** time.
- The `counter` map holds at most `k + 1` entries at any point — **O(k)** space.

**Implementation:** [`index.js`](index.js)
