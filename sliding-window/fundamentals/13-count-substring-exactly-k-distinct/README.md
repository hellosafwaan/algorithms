# countSubstringExactlyKDistinct

**Problem Statement**

Write a function, `countSubstringExactlyKDistinct`, that takes in a string `s` and a number `k`. The function should return the count of substrings of `s` that contain *exactly* `k` distinct characters.

```js
countSubstringExactlyKDistinct('abc', 2); // -> 2   (ab, bc)
countSubstringExactlyKDistinct('aaa', 2); // -> 0   (no substring of 'aaa' has 2 distinct chars)
```

**Approach**

Reuses [`countSubstringAtMostKDistinct`](../12-count-substring-atmost-k-distinct) as a subroutine rather than writing new window logic — "exactly `k`" is derived from "at most `k`" with a subtraction:

```
exactly(k) = atMost(k) - atMost(k - 1)
```

**Why this works:** `atMost(k)` counts every substring with `k` or fewer distinct characters; `atMost(k - 1)` counts every substring with `k - 1` or fewer. The only substrings counted in the first but not the second are exactly the ones with *precisely* `k` distinct characters — so subtracting removes everything except that exact-match set.

This is a common technique for "exactly N" counting problems in general: if directly tracking "exactly N" inside one sliding window is awkward (the window would need to handle both growing past `k` and shrinking below `k` as separate invalid states), it's often simpler to solve the easier "at most N" version twice and subtract.

**Complexity**

Let `N` = length of `s`.

- Two calls to `countSubstringAtMostKDistinct`, each O(N) time and O(k) space — the combination is still **O(N)** time, **O(k)** space, just with a constant factor of 2.

**Implementation:** [`index.js`](index.js)
