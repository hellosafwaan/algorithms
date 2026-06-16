Session: [032_2026-06-16_number-of-1-bits.md](../../safwaan/sessions/032_2026-06-16_number-of-1-bits.md)

## How It Felt
A little confusing at the start, but clicked quickly. The confusion was about *where* the bitwise operations could act — not about the algorithm itself.

## Key Insight
In Safwaan's words: "I usually think that the left-side parameter and the right-side parameter both should be bits in base two format. I did not know that JavaScript was okay with me having the left side as decimal... internally any number is in the decimal format, so... we can use the AND operator safely with 1."

So the actual unlock was realizing there's no conversion step at all. A number like `13` and its binary form `1101` aren't two different things you convert between — they're the same value stored the same way. The bitwise operators just read that existing binary representation directly, whether you wrote the number as `13` or `0b1101` in your source code.

Once that clicked, the rest was just: AND with 1 to read the last bit, right shift to bring the next bit into position, repeat until there's nothing left.

## Solution Walkthrough
So the problem asks: given an integer, how many bits in its binary form are `1`?

The move is to repeatedly peel off the last bit and check it, then shift the whole number right so the next bit becomes "the last bit" for the next check.

```javascript
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        const lastBit = n & 1;
        if (lastBit === 1) count++;
        n = n >>> 1;
    }
    return count;
}
```

Why `n & 1`? AND only outputs `1` when *both* bits are `1`. Since `1` in binary is `...0001`, ANDing with it wipes out every bit except the last one — whatever the last bit of `n` was, that's what survives. That's exactly the "masking" use case from the cheat sheet: keep one bit, wipe the rest.

Why `n = n >>> 1`? Right shift slides every bit one position to the right, dropping the bit that falls off the end. So the second-to-last bit becomes the new last bit. The first version of this code forgot the assignment (`n >>> 1;` with no `n =`) — that computes the shifted value and throws it away, so `n` never changes and the loop runs forever (well, until something else broke). The fix is just remembering that `>>>` doesn't mutate `n` in place — you have to reassign it yourself.

Why `!== 0` as the loop condition? Once every bit has been shifted out, `n` becomes `0`, and there's nothing left to check.

Traced on `n = 13` (`1101`):
- `13 & 1 = 1` → count = 1 → `n = 13 >>> 1 = 6` (`110`)
- `6 & 1 = 0` → count = 1 → `n = 6 >>> 1 = 3` (`11`)
- `3 & 1 = 1` → count = 2 → `n = 3 >>> 1 = 1` (`1`)
- `1 & 1 = 1` → count = 3 → `n = 1 >>> 1 = 0`
- `n === 0` → loop ends, return `3` ✓ (`1101` has three `1`s)

## Pattern Introduced
Bit Manipulation — Mask & Shift: use `n & 1` to read the last bit of a number, `n = n >>> 1` to advance to the next bit, loop until `n === 0`. This is the base template for any problem that needs to inspect every bit of an integer one at a time.

## Watch Out For
- There is no decimal-to-binary conversion step. JS integers are already binary under the hood — `&`, `|`, `^`, `<<`, `>>` all operate on that representation directly, regardless of how the number looks in your source code.
- `n >>> 1` on its own does nothing to `n` — it returns the shifted value but doesn't mutate the variable. Must write `n = n >>> 1`.
- Used `>>>` (unsigned right shift) rather than `>>` — for this problem `n` is always non-negative so it doesn't matter here, but `>>>` is the safer default when working with raw bit patterns since it never sign-extends.

## Template
```javascript
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        const lastBit = n & 1;
        if (lastBit === 1) count++;
        n = n >>> 1;
    }
    return count;
}
```

## Trace Through
See walkthrough above — `n = 13` (`1101`) → `3`.

## Complexity
**Time: O(32) → O(1)** — the loop runs once per bit, halving `n` each time (`log₂(n)` iterations in general). But since `n` is a fixed-width 32-bit integer, the maximum possible number of iterations is capped at 32 regardless of the value of `n` — so the general O(log n) collapses into a constant O(1) here specifically because the input size itself is bounded.
**Space: O(1)** — one counter variable, no structure that scales with input.

## Submissions
[https://leetcode.com/problems/number-of-1-bits/submissions/2035275546](https://leetcode.com/problems/number-of-1-bits/submissions/2035275546) — Accepted, 0ms runtime (beats 100%), 55.56MB memory (beats 16.87%), 2026-06-16.

## Open Questions
- Log-based complexity reasoning is a self-identified weak spot ("I'm actually bad at computing time complexities when it's log based") — probe cold on the next log-based problem (e.g. binary search, divide-and-conquer).
