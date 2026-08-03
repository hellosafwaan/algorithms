# hasSubstringAnagram

**Problem Statement**

Write a function, `hasSubstringAnagram`, that takes in two strings, `s` and `anagram`. The function should return a boolean indicating whether `s` contains any substring that is an anagram of `anagram` (i.e. a rearrangement using exactly the same characters).

```js
hasSubstringAnagram('eidbaooo', 'ab'); // -> true   ('ba' at index 3)
hasSubstringAnagram('eidboaoo', 'ab'); // -> false
```

**Approach**

This is a fixed-size window (size `k = anagram.length`) again, but the "what does the window look like" question is now about character composition, not sum or product — so the window state is a `Set` of the characters currently inside it.

1. Build `anagramSet`, the set of unique characters in `anagram`.
2. Build `windowSet` from the first `k` characters of `s`, and compare it to `anagramSet` immediately.
3. Slide the window one character at a time: delete the outgoing character, add the incoming one.
4. After each slide, compare `windowSet` to `anagramSet` again — a match means the current window is an anagram.

**Why a `Set` and not a frequency `Map`:** this check only cares about *which* characters are present, not how many of each — a `Set` comparison (same size, same members) is sufficient. (Counting exact frequency is the harder version, handled in [`5-count-substring-anagrams`](../5-count-substring-anagrams).)

**Complexity**

Let `N` = length of `s`, `K` = length of `anagram`.

- The window itself is O(K) to build, and each `equalSet` comparison is O(K) (iterating `setA`'s members and checking membership in `setB`).
- There are `N - K + 1` windows, each triggering one O(K) comparison — **O(N·K)** time.
- Space: the two sets hold at most `K` characters each — **O(K)** space.

**Implementation:** [`index.js`](index.js)
