# Recursion — Reference Notes

## The Universal Pattern

Every recursive function has exactly three parts:

```
function solve(n) {
  // 1. Base case — most fundamental subproblem, no computation needed
  if (n === BASE) return BASE_VALUE

  // 2. Recursive case — reduce by exactly one step
  // 3. Progress guaranteed — every call moves toward the base case
  return WORK + solve(SMALLER_N)
}
```

## Patterns Learned

### Division-Based Recursion
**When:** Input is a number, reduce by dividing (digits, binary)
**Progress mechanism:** `n / 10` or `n / 2`
**Example:** Count digits in a number

```javascript
function countDigits(n) {
  n = Math.abs(Math.floor(n))
  if (n < 10) return 1
  return 1 + countDigits(Math.floor(n / 10))
}
// Time: O(log n) | Space: O(log n)
```

### Index-Based Recursion
**When:** Input is a string or array, traverse by index
**Progress mechanism:** `index + 1`
**Example:** Reverse a string

```javascript
function reverseString(str, index = 0) {
  if (index === str.length - 1) return str[index]
  return reverseString(str, index + 1) + str[index]
}
// Time: O(n²) — string concatenation cost | Space: O(n)
```

**Important:** String concatenation is O(n) each time. Even without slice(), index-based string recursion is O(n²).

### Two-Pointer Recursion
**When:** Comparing elements from both ends (palindromes, matching)
**Progress mechanism:** `left + 1`, `right - 1`
**Key feature:** Early termination — return false immediately on mismatch

```javascript
function isPalindrome(s, left = 0, right = s.length - 1) {
  if (left >= right) return true          // base case: pointers crossed
  if (s[left] !== s[right]) return false  // early termination
  return isPalindrome(s, left + 1, right - 1)
}
// Time: O(n) | Space: O(n)
```

## Common Mistakes

| Mistake | Example | Fix |
|---------|---------|-----|
| Missing return on recursive call | `fibonacci(n-1) + fibonacci(n-2)` | `return fibonacci(n-1) + fibonacci(n-2)` |
| Wrong base case value | `if(n===1) return 0` for factorial | Trace through the smallest case manually |
| Infinite recursion | Progress not guaranteed | Ask: does every call get closer to base case? |
| Wrong base case condition | `n===1` vs `n===0` | Check: what's the simplest input that needs no computation? |

## Complexity Patterns

| Pattern | Time | Space |
|---------|------|-------|
| Division-based (digits) | O(log n) | O(log n) |
| Index-based (string/array) | O(n²) due to concatenation | O(n) |
| Two-pointer | O(n) | O(n) |
| Tree traversal | O(n) | O(h) height |
