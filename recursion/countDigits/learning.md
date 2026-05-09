# Count Digits in a Number - Complete Learning

## Problem Statement

Write a **recursive function** that counts how many digits are in a given integer.

**Function Signature:**
```javascript
function countDigits(number: int): int
```

**Examples:**
```
countDigits(123) = 3      // "123" has 3 digits
countDigits(9) = 1        // "9" has 1 digit
countDigits(0) = 1        // "0" has 1 digit
countDigits(456789) = 6   // "456789" has 6 digits
countDigits(-42) = 2      // "-42" has 2 digits (treat negative as positive)
```

**Constraints:**
- Use **recursion** (no loops, no string conversion)
- Input: An integer (can be positive, negative, or zero)
- Output: The count of digits

---

## Part 1: Discovering the Solution

### Initial Thinking Process

**Question posed:** "Do I have to divide by some number?"

**Your exploration:**
- Started by recognizing division as a way to break down a number
- Identified dividing by 10 as the key operation
- Walked through `1000` example:
  - `1000 / 10 = 100` (1 digit counted)
  - `100 / 10 = 10` (2 digits counted)
  - `10 / 10 = 1` (3 digits counted)
  - `1 / 10 = 0.1` (stop here)

**Base case discovery:**
- Initial thought: "return 0 when n < 1"
- Testing revealed this didn't handle `0` correctly (problem says 0 has 1 digit)
- Refined to: "return 1 when n < 10"
- This elegantly covers both single digits (1-9) and zero

**Recursive relationship:**
- Discovered: `f(n) = 1 + f(n/10)`
- Meaning: Each digit counts as 1, plus however many digits remain after dividing by 10

### Key Insight
**Division-based recursion is different from addition-based recursion** (like Climbing Stairs). Instead of adding previous results, we're dividing the input smaller each time.

---

## Part 2: The Final Solution

```javascript
function countDigits(number) {
    // Handle negative numbers and decimals
    const n = Math.abs(Math.floor(number))
    
    // Base case: single digit (0-9) has 1 digit
    if (n < 10) return 1
    
    // Recursive case: divide by 10, count remaining digits, add 1
    return 1 + countDigits(Math.floor(n / 10))
}
```

### Why This Works

1. **`Math.abs(Math.floor(number))`**: Converts input to positive integer
   - Handles negative numbers (e.g., -42 → 42)
   - Handles decimals (e.g., 12.7 → 12)

2. **Base case `if (n < 10) return 1`**:
   - Single digits (0-9) all have exactly 1 digit
   - When you can't divide anymore, you've counted all digits

3. **Recursive case `return 1 + countDigits(Math.floor(n / 10))`**:
   - Count the current digit (the 1)
   - Plus all remaining digits (the recursive call)
   - `Math.floor()` ensures we get integer division in JavaScript

---

## Part 3: How It Works - Step-by-Step Trace

### Example: `countDigits(123)`

```
Call Stack Visualization:

countDigits(123)
  │ n = 123
  │ 123 < 10? NO
  │ return 1 + countDigits(12)
  │
  └─→ countDigits(12)
       │ n = 12
       │ 12 < 10? NO
       │ return 1 + countDigits(1)
       │
       └─→ countDigits(1)
            │ n = 1
            │ 1 < 10? YES ← BASE CASE
            │ return 1
            │
       ← returns 1
  │
  │ = 1 + 1 = 2
  │
← returns 2
│
= 1 + 2 = 3 ← FINAL ANSWER
```

### Execution Trace with Values

```
countDigits(123)
  = 1 + countDigits(12)
  = 1 + (1 + countDigits(1))
  = 1 + (1 + 1)
  = 3 ✓
```

### Another Example: `countDigits(456789)`

```
countDigits(456789)
  = 1 + countDigits(45678)
  = 1 + (1 + countDigits(4567))
  = 1 + (1 + (1 + countDigits(456)))
  = 1 + (1 + (1 + (1 + countDigits(45))))
  = 1 + (1 + (1 + (1 + (1 + countDigits(4)))))
  = 1 + (1 + (1 + (1 + (1 + 1))))
  = 6 ✓
```

### Test Results

```javascript
console.log(countDigits(0))       // 1 ✓
console.log(countDigits(9))       // 1 ✓
console.log(countDigits(123))     // 3 ✓
console.log(countDigits(456789))  // 6 ✓
console.log(countDigits(-42))     // 2 ✓
```

---

## Part 4: Complexity Analysis

### Time Complexity: **O(log₁₀ n)**

**Why?**
- We divide by 10 in each recursive call
- For a number with `d` digits, we make `d` recursive calls
- A number `n` has approximately `log₁₀(n)` digits
- Therefore: **Time = O(log₁₀ n) = O(log n)**

**Examples:**
- `countDigits(10)` → 2 calls (10 → 1 → base)
- `countDigits(100)` → 3 calls (100 → 10 → 1 → base)
- `countDigits(1000)` → 4 calls (1000 → 100 → 10 → 1 → base)

**Formula:** For input `n`, number of calls = `⌊log₁₀(n)⌋ + 1`

### Space Complexity: **O(log₁₀ n)**

**Why?**
- Each recursive call adds a new frame to the call stack
- Maximum call stack depth = number of digits = `log₁₀(n)`
- No additional data structures used (just the call stack)
- Therefore: **Space = O(log n)**

**Visual:**
```
For countDigits(123):
Call Stack Depth = 3

Frame 3: countDigits(1)      ← deepest
Frame 2: countDigits(12)
Frame 1: countDigits(123)    ← shallowest

Max depth = 3 = number of digits in 123
```

---

## Part 5: Key Insights

### About Different Recursive Structures

**This problem taught us that recursion adapts to the problem:**
- **Climbing Stairs** (addition-based): `f(n) = f(n-1) + f(n-2)`
  - Subtracts 1 or 2 from input
  - Linear progression down to base case
  
- **Count Digits** (division-based): `f(n) = 1 + f(n/10)`
  - Divides by 10 instead of subtracting
  - Exponentially faster decrease toward base case
  - Different recursive structure, but same pattern: base case + recursive relationship

### What Changes in Each Call

For `countDigits(123)`:
- Call 1: n = 123, work with 3 digits
- Call 2: n = 12, work with 2 digits
- Call 3: n = 1, work with 1 digit
- Base case: reached, return 1

**Each call removes one digit from the right by dividing by 10.**

### Base Case Logic

The base case `if (n < 10) return 1` is elegant because:
- It covers all single digits: 0, 1, 2, ..., 9
- No special case needed for 0
- Simple and clean

---

## Part 6: Mistakes Made & Fixes

### Mistake 1: Wrong Base Case Return Value
**What I did:** `if (n < 1) return 0`
**Problem:** This returned 0 for the number 0, but 0 has 1 digit
**Fix:** Changed to `if (n < 10) return 1` — the problem statement says 0 has 1 digit

**Learning:** Always verify base case against problem constraints.

### Mistake 2: Tracing Errors
**What I did:** Lost track of which step returned what value when building back up
```
Step 1 → Step 2 → Step 3 → return 1
Back to Step 2 → return 2
Back to Step 1 → return 3
```
Got confused about which values combined where.

**Fix:** Drew out the call stack clearly and traced bottom-up from the base case
```
countDigits(1) = 1
countDigits(12) = 1 + 1 = 2
countDigits(123) = 1 + 2 = 3
```

**Learning:** When tracing recursive calls, always work bottom-up from the base case. Build the stack clearly.

### Mistake 3: Duplicate Base Cases
**What I did:** Had both `if (n === 0) return 1` and `if (n < 10) return 1`
**Problem:** Redundant — 0 is already covered by `n < 10`
**Fix:** Removed the first condition, kept only `if (n < 10) return 1`

**Learning:** Think about whether conditions overlap. Simplify where possible.

---

## Part 7: Pattern Connection

### How This Relates to Previous Problems

**Climbing Stairs Pattern (Additive Recursion):**
```javascript
// Subtract by 1
function climbStairs(n) {
    if (n < 2) return 1
    return climbStairs(n-1) + climbStairs(n-2)
}
```

**Count Digits Pattern (Multiplicative/Divisive Recursion):**
```javascript
// Divide by 10
function countDigits(n) {
    if (n < 10) return 1
    return 1 + countDigits(Math.floor(n/10))
}
```

**Key Difference:**
- Climbing Stairs subtracts (linear decrease): n → n-1 → n-2 → ... → 1
- Count Digits divides (exponential decrease): n → n/10 → n/100 → ... → <10

**Similarity:**
- Both have clear base cases
- Both have clear recursive relationships
- Both follow the universal recursion pattern: base case + recursive progress

### Recursive Pattern Template

```javascript
function solve(n) {
    // 1. BASE CASE: When do I stop?
    if (/* condition showing n is small enough */) {
        return /* simple answer */
    }
    
    // 2. RECURSIVE CASE: How do I make progress?
    return /* combine current work + recursive call on smaller input */
}
```

This template works for:
- ✓ Linear recursion (Climbing Stairs, Fibonacci)
- ✓ Divisive recursion (Count Digits)
- ✓ String/Array recursion (coming next)
- ✓ Divide-and-conquer recursion (coming next)

---

## Part 8: When to Use This Pattern

### Count Digits Pattern Applies When:
- ✓ You need to process each digit/element one at a time
- ✓ The input naturally divides (numbers ÷ 10, arrays → subarrays, strings → substrings)
- ✓ You can't/shouldn't use loops
- ✓ The work at each level is simple (just count 1)

### Real-World Examples:
1. **Digit sum** — add each digit instead of counting
2. **Reverse a number** — build reversed number digit by digit
3. **Find maximum digit** — compare each digit
4. **Check if palindrome** — compare digits from both ends

### When NOT to Use:
- ✗ If you can convert to string and use `.length`
- ✗ If performance is critical for very large numbers (logarithmic is good, but string conversion might be faster in practice)
- ✗ If the recursion depth becomes a concern (though log₁₀(n) is very shallow even for huge numbers)

---

## Part 9: Interview Tips

### How to Explain This Solution

1. **Start with the insight:** "I'll divide by 10 each time to remove one digit"
2. **Identify base case:** "When the number is less than 10, it's a single digit"
3. **State recursive relationship:** "Count 1 for current digit, plus count remaining digits"
4. **Code it:** Write clean, simple code
5. **Trace example:** Walk through with 123
6. **Analyze complexity:** O(log n) time and space

### Common Interview Follow-ups

**Q: Can you optimize this?**
A: "This is already optimal for recursion. If we dropped the recursion requirement, we could use `.toString().length` in O(1) time, but the problem asks for recursion."

**Q: What about very large numbers?**
A: "JavaScript handles large numbers fine with BigInt. The recursion depth is logarithmic, so even a 1-million-digit number is only ~7 recursive calls."

**Q: Why divide by 10 instead of subtract 1?**
A: "Division is more efficient (log n calls vs n calls), and it's more natural for digit-based problems. Subtraction would be O(n) time."

**Q: Can you do this iteratively?**
A: "Yes, with a while loop counting divisions by 10, but the problem asks for recursion."

---

## Part 10: Complete Solution Reference

### Final, Production-Ready Code

```javascript
function countDigits(number) {
    // Convert to positive integer (handle negatives and decimals)
    const n = Math.abs(Math.floor(number))
    
    // Base case: single digit numbers (0-9) have 1 digit
    if (n < 10) return 1
    
    // Recursive case: count current digit + count remaining digits
    return 1 + countDigits(Math.floor(n / 10))
}

// Test cases
console.assert(countDigits(0) === 1, "Failed: 0 should have 1 digit")
console.assert(countDigits(9) === 1, "Failed: 9 should have 1 digit")
console.assert(countDigits(10) === 2, "Failed: 10 should have 2 digits")
console.assert(countDigits(123) === 3, "Failed: 123 should have 3 digits")
console.assert(countDigits(456789) === 6, "Failed: 456789 should have 6 digits")
console.assert(countDigits(-42) === 2, "Failed: -42 should have 2 digits")

console.log("All tests passed! ✓")
```

---

## Summary

### What You Learned

1. **Division-based recursion** works differently from addition-based
2. **Base case logic** must consider all edge cases (like 0)
3. **Call stack tracing** is essential for understanding recursion
4. **Logarithmic time complexity** from dividing by 10 each time
5. **Pattern recognition** — this is the second distinct recursive pattern

### Key Takeaway

> **Recursion adapts to the problem structure. Count Digits teaches us that not all recursion is linear subtraction — division-based recursion is faster and applies to many digit/array/string problems.**

### Next Steps

You now understand:
- ✓ Linear recursion (Climbing Stairs)
- ✓ Division-based recursion (Count Digits)

**Coming next:**
- [ ] Problem 2: Reverse a String (string/array recursion with indices)
- [ ] Problem 3: Binary Search (divide-and-conquer with multiple recursive calls)
- [ ] Problem 4: Palindrome Check (two-pointer recursion with constraints)

After these 4 problems, you'll have strong recursion intuition across multiple patterns.

---

## Quick Reference

| Aspect | Details |
|--------|---------|
| **Pattern** | Division-based recursion |
| **Time Complexity** | O(log n) |
| **Space Complexity** | O(log n) |
| **Base Case** | `if (n < 10) return 1` |
| **Recursive Case** | `return 1 + countDigits(Math.floor(n / 10))` |
| **Key Operation** | Divide by 10 |
| **When to Use** | Digit-by-digit processing without loops |
| **Real Speedup vs Loop** | Negligible (recursion overhead might make loop faster) |
| **Interview Value** | Shows understanding of different recursive patterns |