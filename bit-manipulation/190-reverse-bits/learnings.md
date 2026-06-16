Session: [033_2026-06-16_reverse-bits.md](../../safwaan/sessions/033_2026-06-16_reverse-bits.md)

## How It Felt
This one needed real debugging — the first two bit-manipulation bonuses (LC 136, LC 191) went smoothly, but this one surfaced several genuine misunderstandings in a row. Based on the conversation: confidence dipped mid-session ("oh shit" when realizing the sign-bit issue), but recovered well — by the end, he was independently pushing back on a fix ("why are we doing unsigned operations, our input is signed?") and correctly read the actual LeetCode constraints to figure out why that fix wasn't strictly necessary here. He explicitly said the trace-table explanations were exactly what he needed ("this is what you should, reason like this, remember to do this more often") — so the struggle was productive, not frustrating.

## Key Insight
Reversing bits means **mirroring positions**, not rotating. If a number has bits at positions `0, 1, 2, 3`, after reversal the bit at position `0` ends up at position `3`, position `1` ends up at position `2`, and so on — position `i` goes to position `(n-1-i)`. This is fundamentally different from a rotate/shift, which just cycles the same bits around and returns to the original value after a full rotation (this was the very first wrong idea, corrected by tracing `1100` rotated right 4 times and seeing it land back on `1100`).

Once that distinction was clear, the building approach falls out naturally: walk through `n`'s bits one at a time (last bit first), and place each one into a separate `result` value — but build `result` so that the *first* bit you read (originally at position 0 of `n`) ends up *last* (at the high end) of `result`, and the *last* bit you read ends up first. That's exactly what happens if you **shift `result` left before OR-ing in each new bit**: the earliest bit gets shifted the most times (ending up furthest left), and the latest bit gets shifted the least (staying near the right). Shift-then-OR naturally produces the mirrored order; OR-then-shift does not (it adds one extra unwanted shift to every bit, every time).

## Solution Walkthrough
So the problem gives you a 32-bit integer and asks you to reverse the order of its bits.

The approach has four moving parts, and getting the *order* of two of them right is the entire crux of the problem:

```javascript
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        const lastBit = n & 1;        // 1. read the last bit of n
        result = result << 1;          // 2. make room in result
        result = result | lastBit;     // 3. drop the bit into that room
        n = n >>> 1;                   // 4. advance n to its next bit
    }
    return result;
}
```

**Why `n & 1`?** Same masking trick from Number of 1 Bits — AND with `1` wipes every bit except the last one, so whatever survives is exactly the last bit of `n`.

**Why `result << 1` before the OR, not after?** This is the part that took the longest to get right, and it's worth walking through carefully because the wrong order *looks* almost identical.

Think of `result` as a number you're constructing one bit at a time, starting from `0`. Every time you shift `result` left, you open up a brand-new empty slot (`0`) at the rightmost position, and every bit already in `result` slides one position further left. If you then OR in the new bit, it drops cleanly into that empty slot — and crucially, it will get shifted left again on *every subsequent* iteration (which is exactly what should happen, because more bits are still coming and this one needs to keep moving toward its final, mirrored position).

If instead you OR the bit in *first* and shift *after*, that bit gets an extra shift it shouldn't — it moves on the very iteration it was placed, in addition to every iteration after. Concretely, with `n` representing bits `1010` (decimal 10), expected reverse is `0101` (decimal 5):

**Wrong order (OR then shift):**

| Iter | lastBit | result after OR | result after shift | n after |
|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 0101 |
| 2 | 1 | 1 | 10 | 0010 |
| 3 | 0 | 10 | 100 | 0001 |
| 4 | 1 | 101 | 1010 | 0 |

Final `result = 1010` (10) — wrong.

**Correct order (shift then OR):**

| Iter | result after shift | lastBit | result after OR | n after |
|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 0101 |
| 2 | 0 | 1 | 1 | 0010 |
| 3 | 10 | 0 | 10 | 0001 |
| 4 | 100 | 1 | 101 | 0 |

Final `result = 0101` (5) — correct.

There was a third idea worth mentioning even though it doesn't work: what if you OR the bit in at the rightmost position and then *right*-shift `result` instead of left-shifting? Tracing that shows the bit you just placed gets immediately pushed off the edge and discarded — `result` collapses to `0` every time. Right-shifting `result` destroys information; you only ever want to grow `result` by shifting it left.

**Why a `for` loop with exactly 32 iterations, instead of `while(n !== 0)`?** This is a subtle but important difference from Number of 1 Bits. In that problem, you only cared about bits that actually exist in `n` — once `n` hits `0`, there's nothing left to count, so stopping early is correct. But here, you're not just reading `n`'s bits — you're also *positioning* them in `result`, and `result` needs exactly 32 shifts total to push the earliest-read bit all the way to its final mirrored position, regardless of whether `n` itself still has nonzero bits left.

Concrete proof: take `n = 1` (binary `...0001`, just one bit set, at position 0). With `while(n !== 0)`: iteration 1 reads `lastBit = 1`, sets `result = 1`, then `n = n >>> 1 = 0` — and the loop stops immediately because `n` is now `0`. But that single bit started at position 0, so after a full 32-bit reversal it should end up at position 31 (the leftmost bit), making `result` equal to `2^31`, not `1`. The `while` loop stopped 31 shifts too early. Switching to `for (let i = 0; i < 32; i++)` fixes this — the loop always runs the full 32 times no matter what `n`'s value does in the meantime.

**Why `n = n >>> 1` and not `n = n >> 1`?** `>>` (signed right shift) preserves the sign bit — if the leftmost bit of `n` is `1` (meaning JS would read that bit pattern as a negative number), `>>` fills the new empty slots on the left with `1`s instead of `0`s. That means `n` would never reach `0`, and if you were still relying on `while(n !== 0)`, it would loop forever. `>>>` (unsigned right shift) always fills with `0`s regardless of sign, so `n` reliably approaches `0` and the bit pattern stays "clean" — no extra `1`s get introduced that weren't actually part of the original number.

**What about the return value — does `result` need `>>> 0` before returning?** In general, yes, and it's worth understanding why even though it turned out not to be strictly necessary for this exact version of the problem. JS bitwise operators work on 32-bit *signed* integers internally. If bit 31 (the leftmost bit, the sign bit) ends up set to `1` in `result`, JS will interpret that as a negative number — even though conceptually you just want the raw bit pattern, with no sign meaning attached. `result >>> 0` doesn't move any bits (shifting by `0` positions changes nothing) — but because `>>>` always treats its operand as unsigned, it forces JS to reinterpret the same bit pattern as a positive number. It's a no-op on the bits, but a fix on the *interpretation*.

That said, the version of this problem actually given (LeetCode's "Top Interview 150" variant) has tighter constraints than the classic version: `0 <= n <= 2^31 - 2`, and **`n` is even**. Since `n` is even, bit 0 of `n` is always `0` — and bit 0 of `n` ends up at bit 31 (the sign bit) of `result` after a full reversal. That means `result`'s sign bit is guaranteed to be `0` here, so `result` is always non-negative without needing `>>> 0` at all. For the general/classic version of Reverse Bits (no such constraint), `>>> 0` would be necessary.

## Pattern Introduced
Bit Manipulation — Mask & Shift (build variant): same `n & 1` extraction as Number of 1 Bits, but instead of just counting, you construct a second number bit by bit. The key additions over the "counting" variant:
- **Order matters when building:** shift the accumulator first (make room), then OR in the new bit (fill it) — never the reverse.
- **Loop count must be fixed (`for`, not `while(n !== 0)`)** whenever the loop's job includes *positioning* bits, not just *reading* them — because the accumulator may need more shifts than `n` has remaining nonzero bits.
- **`>>>` over `>>`** when consuming `n` bit-by-bit, to avoid sign-extension turning the loop into an infinite one.

## Watch Out For
- Don't confuse rotating/shifting a number with reversing its bits — they're different operations. Rotating cycles back to the start after enough steps; reversing mirrors each bit to its opposite position once.
- When building a result bit-by-bit: **shift first, then OR.** OR-then-shift re-shifts the bit you just placed on the same iteration, corrupting its position on every future iteration too.
- Don't try to fix "the bit got placed in the wrong spot" by right-shifting `result` instead — that discards bits rather than repositioning them.
- `while(n !== 0)` is only safe when you only care about bits that exist in `n`. If you're also positioning bits into a result that needs a fixed number of slots (like 32), use a `for` loop with a fixed count instead.
- `>>` sign-extends (fills with `1`s) if the leftmost bit is `1`; `>>>` always fills with `0`s. Default to `>>>` for raw bit-pattern work to avoid infinite loops or polluted bit patterns.
- `result >>> 0` before returning forces an unsigned interpretation without changing any bits — useful any time bit 31 of your result might legitimately end up `1`. Check the problem's actual constraints first; sometimes (like here, with "n is even") the constraint already guarantees this isn't an issue.

## Template
```javascript
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        const lastBit = n & 1;
        result = result << 1;
        result = result | lastBit;
        n = n >>> 1;
    }
    return result; // or `return result >>> 0;` for the unconstrained version
}
```

## Trace Through
`n = 1010` (decimal 10), expected `result = 0101` (decimal 5):

| Iter | lastBit | result after shift | result after OR | n after |
|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 0101 |
| 2 | 1 | 0 | 1 | 0010 |
| 3 | 0 | 10 | 10 | 0001 |
| 4 | 1 | 100 | 101 | 0 |
| 5–32 | 0 | (shifts only, no bits set) | 0101 followed by 28 zero-shifts | 0 |

Final `result` = `0101` followed by 28 more left-shifts = the full 32-bit reversed pattern.

## Complexity
**Time: O(32) → O(1)** — the loop always runs exactly 32 times, one per bit position, regardless of the value of `n`. Same reasoning as Number of 1 Bits: the input is a fixed-width 32-bit integer, so the "O(n)-shaped" loop collapses to a true constant.
**Space: O(1)** — one accumulator (`result`) and one loop counter, no structure that scales with input.

## Submissions
[https://leetcode.com/problems/reverse-bits/submissions/2035357963](https://leetcode.com/problems/reverse-bits/submissions/2035357963) — Accepted, 600/600 test cases, 46ms runtime (beats 63.65%), 54.26MB memory (beats 49.66%), 2026-06-16.

## Open Questions
- `>>` vs `>>>` is now a confirmed recurring toolkit gap (first touched indirectly at LC 191, now directly here) — probe cold at the next bit manipulation problem (LC 268 — Missing Number, or LC 338 — Counting Bits) to see if it's stuck yet.
- The "counting loop vs building loop" distinction (`while(n!==0)` vs fixed `for(32)`) is new — check whether this resurfaces or trips him up on a future fixed-width bit problem.
- Good instinct to watch and reinforce: he questioned the `>>> 0` fix ("why force unsigned if input is signed?") instead of applying it blindly, and then independently read the actual problem constraints to figure out why it wasn't needed here. Worth deliberately encouraging this constraint-reading habit on future problems.
