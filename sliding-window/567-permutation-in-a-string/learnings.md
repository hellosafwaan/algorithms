Session: [075_2026-08-04_permutation-in-string](../../safwaan/sessions/075_2026-08-04_permutation-in-string.md)

## How It Felt

Easy — came from one of the fundamentals anagram problems (the difference being that problem's strings had no duplicate characters, while these do).

## Key Insight

The deciding factor for Set vs. Map on an "is this window an anagram of X" problem is whether duplicate characters are possible. No duplicates → a Set (membership only) is enough to check composition. Duplicates present → membership alone isn't enough, you need exact counts, which means a Map.

## Solution Walkthrough

So the question is: does `s2` contain any contiguous substring that's a permutation (an anagram) of `s1`? Since a permutation just rearranges the same characters, this is really asking "does any window of `s2` have exactly the same character *frequencies* as `s1`?"

That's a fixed-size window again — size `s1.length` — and the window's state is a frequency `Map`, same shape as the fixed-window Set/Map anagram matching from the fundamentals module:

1. Build `s1Map`, the frequency count of every character in `s1`.
2. Build `windowMap` from the first `k` characters of `s2` (`k = s1.length`), and compare it to `s1Map` right away — if they already match, `s1`'s permutation is right at the start.
3. Slide one character at a time through the rest of `s2`: decrement the outgoing character's count in `windowMap` (deleting the key entirely once it hits 0, so `windowMap.size` stays accurate), increment the incoming character's count.
4. Compare `windowMap` to `s1Map` again after every slide — the moment they match, a permutation of `s1` has been found, so return `true` immediately.
5. If the loop finishes with no match, return `false`.

The comparison itself (`isSameMap`) checks two things: same number of distinct characters (`size`), and for every character in `s1Map`, the same count in `windowMap`. Both have to hold — same size alone isn't enough (two maps could have the same number of distinct keys but different characters or different counts).

One thing that came up while debugging: it's easy to *feel* like something's wrong without a concrete failing case. Running the code against a large batch of randomized inputs, compared against a brute-force "sort both and compare" reference, turned up zero mismatches — the algorithm was correct the whole time. The actual issue was a silent one: `isSameMap`'s `for (key of mapB.keys())` was missing `let`/`const` on `key`, creating an implicit global variable. It happened to work anyway (JS doesn't crash on this outside strict mode), which is exactly why it didn't show up as a wrong answer — but it's still a bug worth catching by inspection, not just by testing.

## Pattern Introduced

**Sliding Window — Fixed Size, exact-frequency Map match**

Same fixed-window slide shape as `fundamentals/5-count-substring-anagrams` (Map-based, handles duplicates) — not `fundamentals/4-has-substring-anagram` (Set-based, membership only, no duplicate handling). The reasoning that connects them: duplicates in the input rule out a Set and require a Map.

## Watch Out For

- **Always declare loop variables with `let`/`const`.** `for (key of map.keys())` without a keyword creates an implicit global — it can work by accident (especially in a helper function, away from the main solution body) without ever being caught by testing, since it doesn't produce a wrong answer, just bad scope hygiene. This is a recurring bug shape (patterns.md #10) — check every `for...of`/`for...in` loop's variable declaration before running the code, not after.
- **Delete a key at count 0**, don't leave it — a stale zero-count entry breaks the `map.size` comparison in `isSameMap`.
- **Size check first, then values.** Two maps with the same `.size` can still differ in which keys or counts they hold — both checks are necessary.

## Template

```javascript
function checkInclusion(s1, s2) {
    const k = s1.length;
    const s1Map = new Map();
    for (let i = 0; i < k; i++) {
        s1Map.set(s1[i], (s1Map.get(s1[i]) || 0) + 1);
    }

    const windowMap = new Map();
    for (let i = 0; i < k; i++) {
        windowMap.set(s2[i], (windowMap.get(s2[i]) || 0) + 1);
    }
    if (isSameMap(windowMap, s1Map)) return true;

    for (let i = 0; i < s2.length - k; i++) {
        const startChar = s2[i];
        windowMap.set(startChar, windowMap.get(startChar) - 1);
        if (windowMap.get(startChar) === 0) windowMap.delete(startChar);

        const endChar = s2[i + k];
        windowMap.set(endChar, (windowMap.get(endChar) || 0) + 1);

        if (isSameMap(windowMap, s1Map)) return true;
    }
    return false;
}

function isSameMap(mapA, mapB) {
    if (mapA.size !== mapB.size) return false;
    for (const key of mapB.keys()) {
        if (mapA.get(key) !== mapB.get(key)) return false;
    }
    return true;
}
```

## Trace Through

`s1 = 'ab', s2 = 'eidbaooo'`

`s1Map = {a:1, b:1}`. `k = 2`.

| step | window | windowMap | match? |
|------|--------|-----------|--------|
| seed (s2[0..1]) | "ei" | {e:1, i:1} | no |
| i=0: -'e', +s2[2]='d' | "id" | {i:1, d:1} | no |
| i=1: -'i', +s2[3]='b' | "db" | {d:1, b:1} | no |
| i=2: -'d', +s2[4]='a' | "ba" | {b:1, a:1} | **yes** |

Return `true` at `i=2` (window `"ba"`, an anagram of `"ab"`). ✓

## Complexity

**Time: O(N).** One O(k) pass to build `s1Map`, one O(k) pass to seed `windowMap`, then O(N-k) slide steps, each doing O(1) map updates plus an O(k) `isSameMap` comparison in the worst case (bounded by the alphabet/`k`, not `N`) — overall O(N) dominated by the single pass through `s2`.

**Space: O(k)** (or O(1) if the alphabet is considered fixed, e.g. lowercase English letters) — both maps hold at most `k` distinct characters.

## Alternative Approaches

Not explored this session, but two are worth knowing: (1) a **fixed-size array of 26 counters** instead of a `Map`, since the alphabet is lowercase English letters only — avoids Map overhead and makes the frequency comparison a fixed 26-element array `every`/loop instead of a size-then-keys check; (2) tracking a single **`matches` counter** (how many of the 26 characters currently have equal counts between the two frequency arrays) instead of comparing the full maps on every slide — only re-check the specific character that just changed, turning each comparison from O(26) into O(1).

## Submissions

- [Accepted](https://leetcode.com/problems/permutation-in-string/submissions/2093442649) — 2026-08-04 (after fixing the implicit-global bug)

## Open Questions

- Does the implicit-global-variable bug (patterns.md #10, now 4 occurrences) get self-caught before running code on the next problem, especially inside a helper function rather than the main solution body?
- Does he correctly re-identify `count-substring-anagrams` (not `has-substring-anagram`) as the fundamentals match if asked again cold?
