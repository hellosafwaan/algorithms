# Strings — Notes

## Patterns

### Character Frequency (Hash Map)

**When to reach for it:** Any problem asking "do two strings have the same characters?" or "how many times does each character appear?"

**Two-map variant:** One map per string, compare them. Safe to iterate one map only if lengths are equal (length check provides symmetry guarantee).

**One-map variant:** Increment for string A, decrement for string B. All keys must be 0. Must iterate all keys — not just characters from one string.

**Space is O(1)** when input is constrained to lowercase English letters (26-char alphabet, not O(n)).

| Problem | Variant | Key Watch-out |
|---------|---------|---------------|
| LC 242 — Valid Anagram | Two-map or one-map | One-map: iterate `Object.keys()`, not just `s` |
| LC 49 — Group Anagrams | Sorted string as key | Sort chars of each string → `split("").sort().join("")`; push original into map; return `Object.values()` |
| LC 383 — Ransom Note | Increment/decrement | Count ransomNote, decrement with magazine. `counts.get(char) ?? 0` avoids has/else boilerplate. Early exit variant: track `remaining` counter. |

**Sorted string as key:** When grouping strings by character composition, sort each string's characters and use the result as the HashMap key. All anagrams share the same sorted form. This avoids pairwise O(n²) comparison.

---

### Sliding Window — Variable Size

**When to reach for it:** Longest/shortest substring satisfying some constraint (no repeats, at most k distinct chars, etc.)

**Shape:** `left` and `i` mark the window. `i` always moves right. `left` only moves right when window is invalid.

**HashMap flavor (O(1) shrink):** Store `char → last seen index`. On duplicate: `left = Math.max(left, map[char] + 1)`. Always update `map[char] = i` after the check. Window size: `i - left + 1`.

**Set flavor (while-loop shrink):** On duplicate, `while (set.has(char)) { set.delete(s[left]); left++; }` then add char. Also O(n) overall but more iterations.

**Critical rule:** `Math.max(left, ...)` — left never goes backwards. A char seen before the current window can drag left back without it.

| Problem | Key Insight |
|---------|-------------|
| LC 3 — Longest Substring Without Repeating Characters | HashMap char → last index; jump left directly; `Math.max(left, map[char]+1)` |

---

### Two Pointers on Strings

**When to reach for it:** Comparing characters from both ends, skipping non-alphanumeric characters.

| Problem | Key Insight |
|---------|-------------|
| LC 125 — Valid Palindrome | `left < right` guard must come before the regex/charCodeAt check — short-circuit prevents out-of-bounds |
