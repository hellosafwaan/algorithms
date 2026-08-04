# Session: Find All Anagrams in a String — 2026-08-04

## What He Attempted

Fifth sliding-window problem today, immediately connected unprompted to the one right before it: "this was basically the previous problem that we did, that is, permutation in a string... except this one checks for all the anagrams... and wants us to return the starting indices."

Adapted LC 567's solution directly — same window-and-Map mechanism, extended to push every matching index into an `answer` array instead of returning `true` on the first match. First paste had the real logic sitting inside a leftover function still named `checkInclusion` (from the LC 567 copy-paste source), while the actually-required `findAnagrams` was left as an empty stub:

```js
function findAnagrams(s, p) {
    // empty — logic never moved here
};

function checkInclusion(s, p) {
    // ...full working logic here, under the wrong name...
}
```

Self-fixed once asked which function LeetCode actually calls. Final code (verified correct):

```js
function findAnagrams(s, p) {
    const k = p.length;
    const windowMap = new Map();
    for (let i = 0; i < k; i++) {
        const elem = s[i];
        if(windowMap.has(elem)) windowMap.set(elem, windowMap.get(elem) + 1);
        else windowMap.set(elem, 1);
    }
    const pMap = new Map();
    for (let i = 0; i < k; i++) {
        const elem = p[i];
        if(pMap.has(elem)) pMap.set(elem, pMap.get(elem) + 1);
        else pMap.set(elem, 1);
    }
    const answer = []
    if(isSameMap(windowMap, pMap)) answer.push(0)
    for(let i = 0; i < s.length - k; i++) {
        const startElement = s[i];
        windowMap.set(startElement, windowMap.get(startElement) - 1)
        if(windowMap.get(startElement) === 0) windowMap.delete(startElement)
        const endElement = s[i + k];
        if(windowMap.has(endElement)) windowMap.set(endElement, windowMap.get(endElement) + 1);
        else windowMap.set(endElement, 1);
        if(isSameMap(windowMap, pMap)) answer.push(i + 1)
    }
    return answer
}

function isSameMap(mapA, mapB){
    if (mapA.size !== mapB.size) return false;
    for(let key of mapB.keys()) {
        if(mapA.get(key) !== mapB.get(key)) return false
    }
    return true;
}
```

## Where He Got Stuck

The bug wasn't in the sliding-window logic at all — it was purely a copy-paste artifact. He'd adapted LC 567's code, filling out the real logic, but never renamed/relocated it into `findAnagrams`, the actual function LeetCode calls for this problem. `findAnagrams` was left as the empty starter stub. Asked directly which function is actually called and what it currently does — self-identified it in one step: "findAnagrams is empty, I forgot to move the logic there."

No repeat of the implicit-global bug from LC 567 — `isSameMap`'s `for(let key of ...)` was already correctly declared, carried over from the fix made one problem earlier.

## Mistakes Made

- Copy-paste-and-adapt left the real logic under the source problem's function name (`checkInclusion`) instead of the new problem's required name (`findAnagrams`) — new bug shape, first occurrence (patterns.md #76). Self-caught in one guided question, not proactively before asking for help.

## Key Insight

His own words: same mechanism as LC 567 (window + frequency Map, slide, compare), except this collects every matching start index into an array instead of stopping at the first match — the initial-window match pushes index `0`, and every subsequent match during the slide pushes `i + 1` (the new window's start after the shift).

## Complexity Reached

O(N) time, O(K) space (K = `p.length`) — same reasoning as LC 567, correctly stated without needing correction this time.

## Coach Notes for Next Session

- New bug shape logged (patterns.md #76): when adapting a previous solution as a starting point, check that the function *name* matches what's actually required, not just that the logic is correct. Worth a quick check next time he reuses code from an earlier problem.
- Fifth sliding-window problem in one day (643, 1343, 1456, 567, 438) — biggest single-day volume in this phase. The unprompted-connection streak is now unbroken across the last four problems (1343→643, 1456→prior two, 567→fundamentals with a naming slip, 438→567 cleanly). Worth checking if this still holds on a problem that ISN'T adjacent to something just solved.
- No complexity-labeling slip this time (first correct-on-first-try instance after 4 same-shape slips) — worth watching whether this holds on the next genuinely new problem, or was specific to this being an immediate repeat of LC 567's complexity.
