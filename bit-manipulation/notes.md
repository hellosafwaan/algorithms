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
