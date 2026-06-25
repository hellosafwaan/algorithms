# Session: Substring with Concatenation of All Words (LC 30) — 2026-06-25

## What He Attempted

Started by joining all words into a concatenated string and building a character frequency map — treating it identically to the anagram pattern (LC 242). Two maps, both tracking individual characters. Loop then compared character frequencies of fixed-length windows in `s`. No words-level logic at all.

## Where He Got Stuck

**Main conceptual block:** The character frequency approach falls apart when word boundaries matter. A concrete counterexample unlocked it: `words = ["ab", "cd"]` — `"abcd"` and `"adbc"` have the same character frequencies but only `"abcd"` splits into valid words. Once he saw this, "the atomic unit is words, not characters" landed immediately.

**Loop structure:** Needed significant scaffolding on the two-loop shape — outer loop slides the window start, inner loop extracts one word per step. The substring formula `s.substring(i + j * wordLen, i + j * wordLen + wordLen)` required a visual trace to click.

**Map comparison:** Didn't know how to compare two Maps — `wordFreq === windowFreq` compares references. Gave him the `isMapsEqual` helper directly.

## Mistakes Made

1. Character frequency instead of word frequency — anagram instinct misapplied (main conceptual error)
2. `words[i]` — used loop variable outside its scope when computing window size
3. `words[1]` instead of `words[0].length` — word itself vs its length
4. Copied `words` into `windowFreq` instead of building it from `s` (duplicated wordFreq)
5. `j += 2` — incremented by 2 (word length?) instead of 1
6. `s.subString(j, wordLen)` — wrong index (should include `i`), wrong second arg (end not length)
7. `wordFreq === windowFreq` — reference comparison on Maps
8. `s.subString` — wrong capitalization (JS is case-sensitive)
9. `i < s.length - k` — off by one, missed the last valid start position

## Key Insight

The unit of comparison is words, not characters. All words are the same length, so you can extract them by slicing `wordLen`-sized chunks at positions `i + j * wordLen`. Two frequency maps — one built from `words`, one built from the current window — compared entry by entry.

## Complexity Reached

Time: O(n × m × L) where n = s.length, m = words.length, L = wordLen. Space: O(m).

## Coach Notes for Next Session

- **Anagram instinct is sticky** — this is the third form of "treat this as a character frequency problem" after LC 242 and LC 49. He will likely reach for it again on LC 567 (Permutation in String), which IS actually a character-frequency problem. Interesting test: does he distinguish the two correctly cold?
- **Map comparison gap** — he had no idea how to compare two Maps. Worth drilling: `for...of` on a Map gives `[key, value]` pairs. Separate carry-forward item.
- **Fixed vs variable window** — he got confused trying to initialize a window before the loop. Important distinction to probe cold: LC 3/209 = variable size (expand/shrink), LC 30 = fixed size (slide, rebuild each time).
- **Optimized approach (O(n × L))** flagged as "worth knowing" — slide within `wordLen` offset groups. Don't introduce yet.
- Revisit queue is still overdue on many items. Start next session with a cold redo.
