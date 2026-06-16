# Bit Manipulation Cheat Sheet

---

## 1. Fundamentals

### What is a bit?
A **bit** is the smallest unit of information in a computer — a single switch that is either **on (1)** or **off (0)**.

### Why binary?
Computers are built from transistors — tiny electronic switches. A switch can only be in two states: on or off. So everything is represented in base 2 (binary).

### How many values can n bits represent?
**n bits → 2ⁿ combinations**

| Bits | Combinations |
|------|-------------|
| 1    | 2           |
| 4    | 16          |
| 8    | 256         |
| 32   | ~4 billion  |

---

## 2. Binary ↔ Decimal Conversion

### Binary → Decimal
Each position is a power of 2. Multiply each bit by its power and sum.

```
1 1 0 1
│ │ │ └── 1 × 2⁰ = 1
│ │ └──── 0 × 2¹ = 0
│ └────── 1 × 2² = 4
└──────── 1 × 2³ = 8
                 = 13
```

### Decimal → Binary
1. Find the largest power of 2 that fits
2. Subtract it, mark that position as 1
3. Repeat with the remainder until 0

```
22 → 16 fits (2⁴) → remainder 6
 6 →  4 fits (2²) → remainder 2
 2 →  2 fits (2¹) → remainder 0

Position:  4  3  2  1  0
Bit:       1  0  1  1  0   → 10110
```

### Powers of 2 reference
```
2⁰  = 1
2¹  = 2
2²  = 4
2³  = 8
2⁴  = 16
2⁵  = 32
2⁶  = 64
2⁷  = 128
2⁸  = 256
2¹⁰ = 1024
```

### Key pattern
**n bits all set to 1 = 2ⁿ - 1**
```
1111     = 15  = 2⁴ - 1
11111111 = 255 = 2⁸ - 1
```

---

## 3. The 6 Bitwise Operators

### AND `&`
**Rule:** Both bits must be 1 → result is 1

| a | b | a & b |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   0   |
| 1 | 0 |   0   |
| 1 | 1 |   1   |

```
5 & 3 → 101
        011
        ---
        001  = 1
```

**Use:** Masking — keep certain bits, wipe others.

---

### OR `|`
**Rule:** Either bit is 1 → result is 1

| a | b | a \| b |
|---|---|--------|
| 0 | 0 |   0    |
| 0 | 1 |   1    |
| 1 | 0 |   1    |
| 1 | 1 |   1    |

```
5 | 3 → 101
        011
        ---
        111  = 7
```

**Use:** Combining/merging bits — turning specific bits on.

---

### XOR `^`
**Rule:** Bits are *different* → result is 1

| a | b | a ^ b |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   1   |
| 1 | 0 |   1   |
| 1 | 1 |   0   |

```
5 ^ 3 → 101
        011
        ---
        110  = 6
```

**Use:** Detecting differences, cancelling duplicates.

---

### NOT `~`
**Rule:** Flips every bit (unary — takes one operand)

| bit | ~bit |
|-----|------|
|  0  |   1  |
|  1  |   0  |

```
~101 = 010
```

> ⚠️ **Gotcha (JS, Python, Java):** Due to signed integer representation (two's complement), `~n = -(n+1)`.
> `~5 = -6`, not what you'd expect from visual bit-flipping.

---

### Left Shift `<<`
**Rule:** Shift all bits left by k positions, fill right with 0s.

```
5 = 101
5 << 1 → 1010 = 10
```

**Effect:** Multiply by 2ᵏ
```
n << 1 = n × 2
n << 2 = n × 4
n << k = n × 2ᵏ
```

---

### Right Shift `>>`
**Rule:** Shift all bits right by k positions, drop the rightmost bits.

```
5 = 101
5 >> 1 → 010 = 2
```

**Effect:** Divide by 2ᵏ (floored — integer division)
```
n >> 1 = n ÷ 2  (floor)
n >> 2 = n ÷ 4  (floor)
n >> k = n ÷ 2ᵏ (floor)
```

> Note: `5 >> 1 = 2` because 5 ÷ 2 = 2.5, floored to 2.

---

## 4. XOR Magic Properties

These come up constantly in interview problems.

| Property | Formula | Why |
|----------|---------|-----|
| Self-cancellation | `a ^ a = 0` | Identical bits always differ → always 0 |
| Identity | `a ^ 0 = a` | XOR with 0 changes nothing |
| Commutative | `a ^ b = b ^ a` | Order doesn't matter |
| Associative | `(a ^ b) ^ c = a ^ (b ^ c)` | Grouping doesn't matter, reorder freely |

**Key insight:** Because XOR is commutative and associative, you can reorder terms freely:
```
3 ^ 5 ^ 3
= 3 ^ 3 ^ 5    ← reorder
= 0 ^ 5        ← self-cancellation
= 5            ← identity
```

---

## 5. Common Tricks & Patterns

### Check if a number is odd or even
```javascript
n & 1 === 0   // even — last bit is 0
n & 1 === 1   // odd  — last bit is 1
```
Why it works: even numbers end in 0 in binary, odd numbers end in 1.

---

### Check if the k-th bit is set
```javascript
n & (1 << k)  // non-zero means the k-th bit is 1
              // k=0 is the rightmost (least significant) bit
```

Example — check bit 2 of 13 (1101):
```
1 << 2 = 100
1101 & 100 = 100  → non-zero, bit is set ✓
```

---

### Find the single non-duplicate (LC 136)
Given an array where every number appears twice except one:
```javascript
// JavaScript
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```
```python
# Python
def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```
```java
// Java
public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}
```
Why it works: pairs cancel via `a ^ a = 0`, lone number survives via `a ^ 0 = a`.

---

### Fast multiply / divide by power of 2
```javascript
n << 1   // n × 2
n << 2   // n × 4
n << k   // n × 2ᵏ
1 << k   // 2ᵏ  (useful for building masks)

n >> 1   // n ÷ 2  (floor)
n >> k   // n ÷ 2ᵏ (floor)
```

---

## 6. Language Syntax Reference

| Operator | JavaScript | Python | Java |
|----------|-----------|--------|------|
| AND | `a & b` | `a & b` | `a & b` |
| OR | `a \| b` | `a \| b` | `a \| b` |
| XOR | `a ^ b` | `a ^ b` | `a ^ b` |
| NOT | `~a` → `-(a+1)` | `~a` → `-(a+1)` | `~a` → `-(a+1)` |
| Left shift | `a << b` | `a << b` | `a << b` |
| Right shift | `a >> b` | `a >> b` | `a >> b` |
| Unsigned right shift | `a >>> b` | n/a | `a >>> b` |
| Binary literal | `0b1010` | `0b1010` | `0b1010` (Java 7+) |
| To binary string | `n.toString(2)` | `bin(n)` | `Integer.toBinaryString(n)` |
| Count set bits | manual loop | `bin(n).count('1')` | `Integer.bitCount(n)` |

---

## 7. Quick Reference Card

```
OPERATOR   SYMBOL   RULE                        USE CASE
AND          &      both 1 → 1                  masking, check bits
OR           |      either 1 → 1                combining bits, set bits
XOR          ^      different → 1               cancel duplicates, toggle
NOT          ~      flip all bits               invert (watch -(n+1) gotcha)
Left shift   <<     shift left, pad 0s          multiply by 2ᵏ
Right shift  >>     shift right, drop bits      divide by 2ᵏ (floored)

XOR MAGIC:
  a ^ a = 0    (self-cancellation)
  a ^ 0 = a    (identity)

CONVERSIONS:
  binary → decimal:  expand as powers of 2, sum up
  decimal → binary:  largest power that fits, subtract, repeat

GOTCHA:
  ~n = -(n+1) in JS, Python, Java (two's complement signed integers)
```

---

*Built during NeetCode 150 interview prep — bit manipulation fundamentals session.*
