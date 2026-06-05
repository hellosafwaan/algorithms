# LC 125 — Valid Palindrome

## Key Insight
Two pointers from both ends. Skip non-alphanumeric on each side, compare what's left. Move inward until they cross.

## Solution Walkthrough

So a palindrome reads the same forwards and backwards — "racecar", "madam". The problem throws in a wrinkle: the input is a sentence with spaces, punctuation, and mixed casing. "A man, a plan, a canal: Panama" should be valid. So before we even check if it's a palindrome, we need to filter out everything that isn't a letter or digit, and treat uppercase and lowercase as the same.

**The approach**

Two pointers, one at each end, converging inward. At each step, compare the characters they're pointing at. If they match, move both inward. If they don't, it's not a palindrome — return false immediately. If the pointers cross without a mismatch, it's a palindrome.

The added complexity here is skipping non-alphanumeric characters. Spaces, commas, colons — ignore all of them. So before each comparison, we need to advance each pointer past any junk characters until we're pointing at something real.

**Walking through the code**

```js
s = s.toLowerCase();
```

First, lowercase the whole string. This lets us compare letters without worrying about case — `'A'` and `'a'` both become `'a'`.

```js
let left = 0, right = s.length - 1;
while (left < right) {
```

Standard two-pointer setup. We stop when the pointers meet or cross — at that point every character has been compared and nothing failed.

```js
    while (left < right && !/^[a-z0-9]$/.test(s[left])) left++;
    while (left < right && !/^[a-z0-9]$/.test(s[right])) right--;
```

These inner `while` loops skip non-alphanumeric characters. The regex `^[a-z0-9]$` matches a single lowercase letter or digit — if the current character doesn't match, advance the pointer.

Two things to notice here. First, we use `while`, not `if`. There might be several non-alphanumeric characters in a row — `", :"` for example. A single `if` would only skip one of them and then try to compare a space or comma. The `while` keeps going until it hits something real.

Second, the bounds check `left < right` comes first in both inner loops. This is short-circuit evaluation — if `left < right` is false, JavaScript doesn't even evaluate the regex. If you put the regex first, you'd be calling `.test()` on `s[left]` when `left` might equal `right` or even be out of bounds. The order of conditions isn't cosmetic, it's a correctness guard.

```js
    if (s[left] !== s[right]) return false;
    left++; right--;
```

After skipping, compare. If they don't match, we're done — not a palindrome. If they do, move both pointers inward and continue.

**Why regex is slow (5th percentile)**

Regex seems clean but it's expensive. Every call to `.test()` compiles a pattern, runs a matching engine, and returns a result. We're calling it on potentially every character in the string — twice per character (once for `left`, once for `right`). For a long string, that's a lot of overhead.

The `charCodeAt` approach avoids all of that. Instead of pattern matching, you just check if the character code falls in a known range:

```js
function isAlphanumeric(c) {
    const code = c.charCodeAt(0);
    return (code >= 48 && code <= 57)    // '0'–'9'
        || (code >= 97 && code <= 122);  // 'a'–'z'
}
```

Three integer comparisons versus a full regex engine. Same logical result, massively lower constant factor. Same O(n) complexity on paper, but the real-world difference is huge — this is why Big-O doesn't tell the whole story.

**Complexity**

Time: O(n) — each pointer starts at one end and only moves inward. Together they traverse the string at most once. Every character is visited at most once.

Space: O(1) — no extra data structures. Just two pointer variables. The `.toLowerCase()` call does create a new string (O(n) space), but that can be avoided by doing case comparison inline with `charCodeAt` — another reason the optimized version is better.

---

## Pattern
Two-pointer with inner skip loops. The skip loops need `left < right` as the first condition — short-circuit means no out-of-bounds access.

## Template
```js
s = s.toLowerCase();
let left = 0, right = s.length - 1;
while (left < right) {
    while (left < right && !/^[a-z0-9]$/.test(s[left])) left++;
    while (left < right && !/^[a-z0-9]$/.test(s[right])) right--;
    if (s[left] !== s[right]) return false;
    left++; right--;
}
return true;
```

## Watch Out For
- `if` instead of `while` for skipping — only skips one non-alphanumeric, fails on consecutive ones
- Bounds check order matters — guard (`left < right`) must come before the regex, not after
- Regex is slow — 5th percentile runtime. Revisit with `charCodeAt()` for real performance

## charCodeAt Optimization (TODO)
Instead of regex, check character codes directly:
```js
function isAlphanumeric(c) {
    const code = c.charCodeAt(0);
    return (code >= 48 && code <= 57) || (code >= 97 && code <= 122);
}
```
Lowercase first, then check. Much faster.

## Complexity
Time: O(n) — Space: O(1)

## Open Questions
- Recursive version: same logic, use call stack instead of outer while loop
- Why is charCodeAt faster than regex?
