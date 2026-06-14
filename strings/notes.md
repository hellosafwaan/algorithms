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

---

### Two Pointers on Strings

**When to reach for it:** Comparing characters from both ends, skipping non-alphanumeric characters.

| Problem | Key Insight |
|---------|-------------|
| LC 125 — Valid Palindrome | `left < right` guard must come before the regex/charCodeAt check — short-circuit prevents out-of-bounds |
