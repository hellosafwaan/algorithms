Session: [024_2026-06-14_longest-substring-without-repeating-characters](../../safwaan/sessions/024_2026-06-14_longest-substring-without-repeating-characters.md)

## How It Felt

Confusing at first — the "window" concept was new and took a while to click. The naive approach came naturally but had a sneaky bug (resetting the whole window instead of trimming). The HashMap approach needed a visual trace before the code structure made sense. Wants to revisit within the week.

## Key Insight

A sliding window is just two indices marking the start and end of a valid substring. You expand from the right on every step, and shrink from the left only when you hit a duplicate. With a HashMap storing each character's last seen index, you can jump `left` directly to `map[char] + 1` instead of inching it forward — O(1) per step, O(n) total.

The critical guard: `left = Math.max(left, map[char] + 1)`. Without `Math.max`, left can jump backwards when a character was seen before the current window started — turning a valid window into an invalid one.

## Solution Walkthrough

**Naive — O(n²) time, O(n) space**

So the first instinct is: maintain a running substring. If the current character is already in it, trim the substring to remove everything up to and including the first occurrence, then append the new character. Track the max length as you go.

```js
function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let subString = "";
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (subString.includes(char)) {
            const dupIndex = subString.indexOf(char);
            subString = subString.slice(dupIndex + 1);
            subString += char;
        } else {
            subString += char;
        }
        maxLength = Math.max(maxLength, subString.length);
    }
    return maxLength;
}
```

The bug that's easy to make: resetting `subString = ""` when you find a duplicate. That throws away everything — including characters between the first occurrence and the duplicate that were perfectly fine. Instead, slice up to and including the first occurrence (`dupIndex + 1`), keep the rest.

Why is this O(n²)? `includes()` and `indexOf()` both scan the substring on every character. In the worst case (all unique characters), the substring grows to length n, so each scan is O(n) → O(n²) total.

---

**Optimal — O(n) time, O(n) space**

The naive is slow because `indexOf` has to scan. What if you already knew where the duplicate was? Store it in a HashMap: `char → last seen index`.

Then when you hit a duplicate, you can jump `left` directly to `map[char] + 1` in O(1).

```js
function lengthOfLongestSubstring(s) {
    const map = {};
    let left = 0;
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        let currentWindowSize;
        if (map[char] === undefined) {
            map[char] = i;
            currentWindowSize = (i - left) + 1;
        } else {
            left = Math.max(left, map[char] + 1);
            map[char] = i;
            currentWindowSize = (i - left) + 1;
        }
        maxLength = Math.max(maxLength, currentWindowSize);
    }
    return maxLength;
}
```

Walk through what happens at each character:
- If you haven't seen it → add to map, window grows, update max
- If you have seen it → jump left to `map[char] + 1` (just past the first occurrence), update char's index in map to the current position, recompute window size

The `Math.max(left, map[char] + 1)` is essential. Say the map has `{a: 0}` and left is at 3 (because of a previous shrink). If you see `'a'` again, `map['a'] + 1 = 1` — but left is already at 3. Without `Math.max`, left jumps back to 1, and your window suddenly includes characters you already excluded. With `Math.max`, left stays at 3.

**Window size formula:** `i - left + 1`. The `+1` is because both ends are inclusive. Indices left=2, i=4 gives elements 2, 3, 4 — that's 3 elements, and `4 - 2 + 1 = 3`.

## Pattern Introduced

**Sliding Window (variable size)** — expand right on every step, shrink left only when the window becomes invalid. HashMap stores `char → last seen index` for O(1) left-pointer jumps.

Different from LC 121 (Running Min / Single Pass) where the window doesn't actually resize — that's just a running variable. Here the window genuinely grows and shrinks.

**Set alternative:** A Set-based approach is also valid. Instead of jumping left directly, you inch it forward with a `while` loop until the duplicate is removed. Both are O(n) overall (left only moves forward), but the HashMap approach does fewer operations.

## Watch Out For

1. **Reset instead of trim** — `subString = ""` throws away valid chars. Slice from `dupIndex + 1` instead.
2. **`left` jumping backwards** — always `left = Math.max(left, map[char] + 1)`, not just `map[char] + 1`.
3. **`currentWindowSize` computed before `left` updates** — compute it after updating left, not before.
4. **`const` on `left` and `maxLength`** — they get reassigned, use `let`.
5. **Window size formula** — `i - left + 1`, not `i - left`. The `+1` because both ends inclusive.

## Template

```js
function lengthOfLongestSubstring(s) {
    const map = {};
    let left = 0;
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (map[char] !== undefined) {
            left = Math.max(left, map[char] + 1);
        }
        map[char] = i;
        maxLength = Math.max(maxLength, i - left + 1);
    }
    return maxLength;
}
```

Note: this collapsed version always updates `map[char] = i` and always updates `maxLength` — no if/else needed. The `left` jump only happens when the char was seen before.

## Trace Through

Input: `"abba"`

```
i=0 'a': new, map={a:0}, left=0, size=1, max=1
i=1 'b': new, map={a:0,b:1}, left=0, size=2, max=2
i=2 'b': seen at 1, left=max(0,2)=2, map={a:0,b:2}, size=1, max=2
i=3 'a': seen at 0, left=max(2,1)=2 ← stays at 2!, map={a:3,b:2}, size=2, max=2
```

Returns 2. Correct. The `Math.max` at i=3 is what saves it — `map['a']+1=1` but left is already 2.

## Complexity

**Naive:** O(n²) time — `includes()` and `indexOf()` scan up to n chars per iteration. O(n) space for the substring.

**Optimal:** O(n) time — `i` visits each character once; `left` only moves forward (can't total more than n moves). O(n) space for the map (bounded by alphabet size — O(26) = O(1) for lowercase letters, O(n) for arbitrary chars).

## Submissions

- Naive: [submission](https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/2032886622) — 27th percentile
- Optimized: [submission](https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/2032886622) — 27th percentile

## Open Questions

- Can you do this with a Set instead? What does the while-loop shrink look like? When is Set cleaner vs HashMap?
- What changes when the window constraint is "at most k distinct characters" instead of "no repeats"?
