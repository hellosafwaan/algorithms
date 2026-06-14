Session: [023_2026-06-14_group-anagrams](../../safwaan/sessions/023_2026-06-14_group-anagrams.md)

## How It Felt

Pretty easy once the key insight clicked — but that insight didn't come naturally. The sorted-key idea had to be given. Once it landed, the code followed fast with only one swapped if/else bug. The execution side felt clean; the insight side felt like a gap.

## Key Insight

All anagrams have the same characters, just reordered. If you sort the characters of "eat", "tea", and "ate" you get "aet" every time. So use the sorted string as a HashMap key. Every string that belongs to the same anagram group will map to the same key.

You don't need to compare strings against each other. You don't need a visited set. You just need one pass and a good key.

## Solution Walkthrough

So — the question is just: how do you group things that share a property? You use that property as the HashMap key.

For anagrams, the shared property is character composition. The cleanest way to express character composition as a string is to sort the characters. "eat" → "aet". "tea" → "aet". Same key, same group.

Walk through `strs` once. For each string, compute the sorted key. If that key doesn't exist in the map yet, create it with `[currentString]` as the value. If it does exist, push `currentString` onto the existing array.

At the end, you want the groups, not the keys. So return `Object.values(anagrams)`.

```js
function groupAnagrams(strs) {
    const anagrams = {};
    for (let i = 0; i < strs.length; i++) {
        const key = strs[i].split("").sort().join("");
        if (anagrams[key] !== undefined) {
            anagrams[key].push(strs[i]);
        } else {
            anagrams[key] = [strs[i]];
        }
    }
    return Object.values(anagrams);
}
```

Watch out for the if/else direction: the `!== undefined` branch is for keys that ALREADY EXIST (push). The else is for NEW keys (create). Easy to swap these.

## Pattern Introduced

**Hash Map — sorted string as canonical key**

When you need to group strings by character composition, sort each string's characters and use that as the key. All anagrams collapse to the same sorted form.

This is a specific flavor of the broader "Hash Map for grouping" pattern. The question is always: what property do the things in the same group share? That property becomes the key.

## Watch Out For

- **Swapping if/else**: the "key exists" branch pushes; the "key doesn't exist" branch creates. Don't flip them.
- **First instinct is pairwise O(n²)**: compare each string against every other using isAnagram(). Works, but gets messy when grouping (need a visited set, nested loops). The sorted-key approach is O(n·k log k) and much cleaner.
- **Don't forget `Object.values()`**: the result format is an array of arrays, not the map object itself.

## Template

```js
function groupAnagrams(strs) {
    const map = {};
    for (const str of strs) {
        const key = str.split("").sort().join("");
        if (map[key] !== undefined) {
            map[key].push(str);
        } else {
            map[key] = [str];
        }
    }
    return Object.values(map);
}
```

## Trace Through

Input: `["eat","tea","tan","ate","nat","bat"]`

| str | key | map |
|-----|-----|-----|
| "eat" | "aet" | `{ aet: ["eat"] }` |
| "tea" | "aet" | `{ aet: ["eat","tea"] }` |
| "tan" | "ant" | `{ aet: ["eat","tea"], ant: ["tan"] }` |
| "ate" | "aet" | `{ aet: ["eat","tea","ate"], ant: ["tan"] }` |
| "nat" | "ant" | `{ aet: [...], ant: ["tan","nat"] }` |
| "bat" | "abt" | `{ aet: [...], ant: [...], abt: ["bat"] }` |

`Object.values(map)` → `[["eat","tea","ate"],["tan","nat"],["bat"]]`

## Complexity

**Time: O(n·k log k)**  
n = number of strings. For each string, sorting k characters takes O(k log k). Total: n × O(k log k).

Why not O(n log n)? You're not sorting the strings — you're sorting the *characters inside* each string. The sort happens k times (one per character), not n times (one per string).

**Space: O(n·k)**  
The map stores every original string. Total characters stored = sum of all string lengths = n·k in the worst case.

## Submissions

- [2026-06-14 — Accepted, 45th percentile](https://leetcode.com/problems/group-anagrams/submissions/2032754927)

## Open Questions

- Can you do O(n·k) instead of O(n·k log k)? Yes — use a frequency array as the key (26-element count array, serialized to a string like `"1#0#0#1#..."`). Avoids the sort. In practice for this problem (strings ≤ 100 chars) the difference is negligible.
