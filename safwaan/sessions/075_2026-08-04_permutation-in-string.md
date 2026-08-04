# Session: Permutation in String — 2026-08-04

## What He Attempted

Fourth sliding-window problem today, and the first real curriculum problem (LC 121, 3, 424, 567, 76, 239 are the Phase 3 curriculum list — the other three today were bonus). Brought a complete Map-based solution unprompted:

```js
function checkInclusion(s1, s2) {
    const k = s1.length;
    const windowMap = new Map();
    for (let i = 0; i < k; i++) {
        const elem = s2[i];
        if(windowMap.has(elem)) windowMap.set(elem, windowMap.get(elem) + 1);
        else windowMap.set(elem, 1);
    }
    const s1Map = new Map();
    for (let i = 0; i < k; i++) {
        const elem = s1[i];
        if(s1Map.has(elem)) s1Map.set(elem, s1Map.get(elem) + 1);
        else s1Map.set(elem, 1);
    }
    if(isSameMap(windowMap, s1Map)) return true;
    for(let i = 0; i < s2.length - k; i++) {
        const startElement = s2[i];
        windowMap.set(startElement, windowMap.get(startElement) - 1)
        if(windowMap.get(startElement) === 0) windowMap.delete(startElement)
        const endElement = s2[i + k];
        if(windowMap.has(endElement)) windowMap.set(endElement, windowMap.get(endElement) + 1);
        else windowMap.set(endElement, 1);
        if(isSameMap(windowMap, s1Map)) return true
    }
    return false
}
function isSameMap(mapA, mapB){
    if (mapA.size !== mapB.size) return false;
    for(key of mapB.keys()) {           // bug: missing let/const
        if(mapA.get(key) !== mapB.get(key)) return false
    }
    return true;
}
```

## Where He Got Stuck

Asked "where am I going wrong" but couldn't point at a specific failing case. Ran the code against 20,000 randomized test cases compared to a brute-force sorted-substring reference and found zero mismatches — the algorithm itself was correct from the start, including the slide loop bound (`s2.length - k`, correctly applied without repeating the LC 1343 off-by-one). What he'd actually run into was flagged directly rather than left for him to rediscover: `isSameMap`'s `for(key of mapB.keys())` is missing `let`/`const` on `key`, an implicit global — the same recurring bug shape as LC 167/977/349, now a fourth occurrence. It happened not to cause a visible failure here (works fine in non-strict mode), which is likely why it "seemed" broken/uncertain to him without actually producing a wrong answer anywhere.

## Mistakes Made

- `isSameMap`: `for(key of mapB.keys())` missing `let`/`const` — implicit global, 4th occurrence of this exact bug shape (patterns.md #10). Self-fixed once pointed at the specific line.
- Pasted the general LeetCode submissions list URL instead of a specific submission link — corrected on request.

## Key Insight

His own words: this came from the sliding-window fundamentals anagram problems — the deciding factor for Set vs. Map is whether the input has duplicate characters. No duplicates → a Set (membership only) is enough. Duplicates present → need exact frequency counts, which means a Map. He named `has-substring-anagram` (the Set-based fundamentals problem, #4) as the connection, but the actual structural match by mechanism is `count-substring-anagrams` (the Map-based one, #5) — his `isSameMap`/`windowMap` setup is nearly identical in shape to that problem's `isEqualFrequencyInMap`/`windowMap`. The reasoning itself (Set vs Map, gated on duplicates) was exactly right; just attached to the neighboring fundamentals problem's name.

## Complexity Reached

Not explicitly re-derived this session (same O(N) time / O(1)-ish space — bounded alphabet — shape as the other fixed-window Map problems already covered today).

## Coach Notes for Next Session

- The implicit-global bug (patterns.md #10) is now 4 occurrences across a 2-month span, still never self-caught before being flagged, and this time it was inside a *helper function*, not the main solution body — worth noting the bug isn't tied to a specific coding context either. A pre-submission checklist item is probably the right intervention at this point, not another verbal reminder.
- Minor labeling slip worth a light correction next time it comes up: he named `has-substring-anagram` (Set-based, fundamentals #4) as the transfer source for LC 567, but the actual mechanism match is `count-substring-anagrams` (Map-based, fundamentals #5) — the underlying reasoning (Set vs Map based on duplicates) was completely correct, this is just a small mislabel of which specific fundamentals file it maps to.
- Good instinct on show: before assuming a bug existed, verification via large-scale random testing against a brute-force reference found nothing wrong with the actual algorithm — the perceived "bug" turned out to be a red herring, and the real (silent) issue was found by review, not by his own testing. Worth noting for calibration: his "something's wrong" instinct fired on this problem without a concrete failing case to back it up.
