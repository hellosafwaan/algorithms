# Bit Manipulation — Notes

See [bit_manipulation_cheat_sheet.md](bit_manipulation_cheat_sheet.md) for the full reference (operators, conversions, common tricks).

## Patterns Introduced

### XOR Self-Cancellation
`a ^ a = 0`, `a ^ 0 = a`, XOR is commutative and associative.

**When to reach for it:** Every element appears exactly twice except one — XOR the whole array, duplicates cancel, the single survivor remains.

| Problem | Key Insight |
|---------|-------------|
| LC 136 — Single Number | XOR entire array into one accumulator; pairs cancel via `a^a=0`, survivor passes through via `a^0=a` |
