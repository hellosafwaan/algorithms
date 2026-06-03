# LC 125 — Valid Palindrome

## Key Insight
Two pointers from both ends. Skip non-alphanumeric on each side, compare what's left. Move inward until they cross.

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
