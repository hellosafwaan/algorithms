Session: [076_2026-08-04_find-all-anagrams-in-a-string](../../safwaan/sessions/076_2026-08-04_find-all-anagrams-in-a-string.md)

## How It Felt

Easy — basically the same as Permutation in String, solved one problem earlier.

## Key Insight

Same window-and-Map mechanism as LC 567, just changing what happens on a match: instead of returning `true` immediately, collect every matching start index into a result array and keep scanning to the end.

## Solution Walkthrough

The question: find every starting index in `s` where a substring of length `p.length` is an anagram of `p`.

This is LC 567 (Permutation in String) with one change — LC 567 only needed to know *whether* an anagram exists anywhere; this one needs *every* index where one starts. The window mechanism doesn't change at all:

1. Build `pMap`, the frequency count of every character in `p`.
2. Build `windowMap` from the first `k` characters of `s` (`k = p.length`), and compare it to `pMap` right away. If they already match, push `0` — the window starting at index 0 is a hit.
3. Slide one character at a time: decrement the outgoing character's count in `windowMap` (deleting the key at 0, same as before), increment the incoming character's count.
4. Compare `windowMap` to `pMap` again after each slide. On a match, push `i + 1` — since removing `s[i]` and adding `s[i+k]` moves the window's start forward by exactly one, from `i` to `i + 1`.
5. Return the full `answer` array at the end, instead of stopping at the first hit.

The bug that actually showed up here wasn't in any of this — it was a copy-paste artifact. The starting point was LC 567's code, and the real logic got filled in and correctly adapted, but it stayed under the old function name (`checkInclusion`) instead of moving into `findAnagrams`, which is what this problem's signature actually requires. LeetCode calls `findAnagrams`, found it empty, and returned nothing — completely unrelated to whether the sliding-window logic itself was right (it was, verified against 10,000 random tests once relocated).

## Pattern Introduced

**Sliding Window — Fixed Size, exact-frequency Map match (multi-result)**

Identical to LC 567's pattern, generalized from "does any window match" (return boolean) to "which windows match" (collect indices). The window mechanism, the Map maintenance, and the `isSameMap` check are all unchanged — only the "on match" action differs (push an index instead of returning).

## Watch Out For

- **When adapting a previous solution as a starting point, check the function name matches what's actually required** — not just that the logic inside is correct. Easy to fill out real logic under a leftover name from the source problem and never notice the actual required function is still an empty stub.
- Same reminders as LC 567: delete a Map key at count 0, check both `size` and per-key values in the comparison, always declare loop variables with `let`/`const`.
- **New window's start index after a slide is `i + 1`**, not `i` — the slide at loop index `i` removes `s[i]` and adds `s[i+k]`, which shifts the window from starting at `i` to starting at `i+1`.

## Template

```javascript
function findAnagrams(s, p) {
    const k = p.length;
    const pMap = new Map();
    for (let i = 0; i < k; i++) {
        pMap.set(p[i], (pMap.get(p[i]) || 0) + 1);
    }

    const windowMap = new Map();
    for (let i = 0; i < k; i++) {
        windowMap.set(s[i], (windowMap.get(s[i]) || 0) + 1);
    }

    const answer = [];
    if (isSameMap(windowMap, pMap)) answer.push(0);

    for (let i = 0; i < s.length - k; i++) {
        const startChar = s[i];
        windowMap.set(startChar, windowMap.get(startChar) - 1);
        if (windowMap.get(startChar) === 0) windowMap.delete(startChar);

        const endChar = s[i + k];
        windowMap.set(endChar, (windowMap.get(endChar) || 0) + 1);

        if (isSameMap(windowMap, pMap)) answer.push(i + 1);
    }
    return answer;
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

`s = 'cbaebabacd', p = 'abc'`

`pMap = {a:1, b:1, c:1}`. `k = 3`.

| step | window | windowMap | match? | answer |
|------|--------|-----------|--------|--------|
| seed (s[0..2]) | "cba" | {c:1,b:1,a:1} | yes | [0] |
| i=0: -'c', +s[3]='e' | "bae" | {b:1,a:1,e:1} | no | [0] |
| i=1: -'b', +s[4]='b' | "aeb" | {a:1,e:1,b:1} | no | [0] |
| i=2: -'a', +s[5]='a' | "eba" | {e:1,b:1,a:1} | no | [0] |
| i=3: -'e', +s[6]='b' | "bab" | {b:2,a:1} | no (size 2 ≠ 3) | [0] |
| i=4: -'b', +s[7]='a' | "aba" | {a:2,b:1} | no | [0] |
| i=5: -'a', +s[8]='c' | "bac" | {b:1,a:1,c:1} | yes | [0, 6] |

Return `[0, 6]`. ✓ (matches LC 438's example)

## Complexity

**Time: O(N).** One O(k) pass each to build `pMap` and seed `windowMap`, then O(N-k) slide steps with O(1) map updates and an O(k)-bounded comparison each.

**Space: O(K).** Both maps hold at most `k` distinct characters; the output array isn't counted separately in most conventions since it's the required return value.

## Alternative Approaches

Same as LC 567: a fixed 26-element counter array instead of a `Map` (alphabet is lowercase English letters), or a running `matches` counter that only re-checks the single character that just changed on each slide instead of comparing the whole map — turns each comparison from O(26) into O(1).

## Submissions

- [Accepted](https://leetcode.com/problems/find-all-anagrams-in-a-string/submissions/2093468123) — 2026-08-04 (after moving the logic into the correctly-named function)

## Open Questions

- Does the "check the function name matches what's required" habit (patterns.md #76) get applied proactively next time a solution is adapted from a prior problem, or does it need to be asked again?
- Does the unprompted-connection streak (four problems in a row now) hold on a sliding-window problem that isn't immediately adjacent to one just solved?
