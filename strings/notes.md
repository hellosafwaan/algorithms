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

### Bijection — Two Maps

**When to reach for it:** "Are these two strings isomorphic?", "Does this word pattern match?" — any problem requiring a consistent one-to-one mapping between two sequences.

**Why not one map?** A single map collapses both namespaces. The same letter can appear as an s-side key *and* a t-side target — a false has-check fires on the s-side entry when you're trying to check the t-side.

**Pattern:** Check for conflict in both maps, then set both unconditionally. Setting the same key→value pair twice is harmless.

```js
if (sToT.has(sc) && sToT.get(sc) !== tc) return false;
if (tToS.has(tc) && tToS.get(tc) !== sc) return false;
sToT.set(sc, tc);
tToS.set(tc, sc);
```

| Problem | Key Insight |
|---------|-------------|
| LC 205 — Isomorphic Strings | `sToT` and `tToS` keep namespaces separate; check conflict then set |
| LC 290 — Word Pattern | Same shape — split `s` into words first; pattern char ↔ word; length check at top |

---

### Cycle Detection via Hash Set

**When to reach for it:** A transformation function that might loop forever. Any time you're stuck asking "is this process going to terminate?"

**Key insight:** If a process loops forever, it must eventually revisit a state. Track every intermediate state in a Set. First repeat = you're in a cycle.

**Pattern:**
```js
const seen = new Set();
while (n !== targetState) {
    if (seen.has(n)) return false;  // cycle detected
    seen.add(n);
    n = transform(n);
}
return true;
```

**Space:** O(1) for Happy Number specifically — the Set is bounded by ~243 (max sum of squares for any 3-digit number = 3×81). After one or two steps, any number collapses below 243.

| Problem | Key Insight |
|---------|-------------|
| LC 202 — Happy Number | Track intermediate sums in Set; first repeat → cycle → false; reach 1 → true |

---

### Math — Digit Extraction via Modulo

**When to reach for it:** Need to process individual digits of an integer. Faster and cleaner than `String()` conversion.

```js
while (n > 0) {
    const digit = n % 10;       // last digit (e.g. 123 % 10 = 3)
    // use digit
    n = Math.floor(n / 10);     // chop last digit (e.g. Math.floor(123/10) = 12)
}
```

Loop terminates when `n === 0` (all digits consumed).

| Problem | Key Insight |
|---------|-------------|
| LC 202 — Happy Number | `% 10` extracts last digit; `Math.floor(n / 10)` removes it; loop while `n > 0` |

---

### Two Pointers on Strings

**When to reach for it:** Comparing characters from both ends, skipping non-alphanumeric characters.

| Problem | Key Insight |
|---------|-------------|
| LC 125 — Valid Palindrome | `left < right` guard must come before the regex/charCodeAt check — short-circuit prevents out-of-bounds |

---

### String Matching — Brute Force

**When to reach for it:** Find the first index where one string appears as a contiguous substring of another.

**Shape:** Outer loop over every valid starting index `i` in `haystack` (bounded by `haystack.length + 1 - needle.length`, so a `needle` longer than `haystack` makes the bound negative and the loop safely never runs). Inner loop compares `needle` char by char from that start; `break` on mismatch, return `i` on a full match.

**Weakness:** No state carries between attempts at different `i` — every restart re-compares from scratch, giving O(m·n). KMP (Knuth-Morris-Pratt) fixes this with a precomputed LPS array (longest proper prefix that's also a suffix of `needle`) so a mismatch at `needle[j]` jumps `j` to `lps[j-1]` instead of restarting at 0, and `i` in `haystack` never moves backward — O(m+n).

| Problem | Key Insight |
|---------|-------------|
| LC 28 — Find the Index of the First Occurrence in a String | Brute force clean first-pass solve. KMP optimization introduced conceptually, not yet implemented — open item. |
