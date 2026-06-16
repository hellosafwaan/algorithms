# Bit Manipulation — Notes

See [bit_manipulation_cheat_sheet.md](bit_manipulation_cheat_sheet.md) for the full reference (operators, conversions, common tricks).

## Patterns Introduced

### XOR Self-Cancellation
`a ^ a = 0`, `a ^ 0 = a`, XOR is commutative and associative.

**When to reach for it:** Every element appears exactly twice except one — XOR the whole array, duplicates cancel, the single survivor remains.

| Problem | Key Insight |
|---------|-------------|
| LC 136 — Single Number | XOR entire array into one accumulator; pairs cancel via `a^a=0`, survivor passes through via `a^0=a` |

### Mask & Shift (Bit-by-bit inspection)
`n & 1` reads the last bit. `n = n >>> 1` advances to the next bit. Loop while `n !== 0`.

**When to reach for it:** Any problem that needs to inspect or count every bit of an integer individually.

**Key fact:** No decimal-to-binary conversion step is ever needed — integers are already stored in binary; bitwise operators act on that representation directly.

| Problem | Key Insight |
|---------|-------------|
| LC 191 — Number of 1 Bits | `n & 1` isolates last bit, `n = n >>> 1` shifts next bit into place, count while `n !== 0`. For 32-bit integers, the loop is capped at 32 iterations → O(1), not O(log n) |
| LC 190 — Reverse Bits | Build variant: shift `result` left *then* OR in `n & 1` (never the reverse order — that re-shifts the bit you just placed). Use a fixed `for (i = 0; i < 32; i++)` loop, not `while(n !== 0)` — building a positionally-correct result needs every position visited, even after `n`'s remaining bits hit 0. `n = n >>> 1` (not `>>`) avoids sign-extension turning the loop infinite. |

**Building vs counting:** When the loop only needs to *count or inspect* bits (LC 191), `while(n !== 0)` is fine — early exit is correct once nothing's left to read. When the loop also *positions* bits into a result of fixed width (LC 190), use a fixed-count loop (`for`) instead — the result may need more shifts than `n` has remaining nonzero bits.
