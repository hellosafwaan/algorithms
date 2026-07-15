# Session: Evaluate Reverse Polish Notation — 2026-07-15

## What He Attempted
Phase 4 curriculum #3. Wrote a near-complete solution independently: iterate tokens, push operands onto a stack, and on an operator token pop the two most recent values (right operand popped first, then left operand — correct order for RPN semantics) and push the result of applying the operator back onto the stack.

## Where He Got Stuck
Integer division. Original code used `Math.floor(leftOperand / rightOperand)`. This is wrong whenever the result is negative — `Math.floor` rounds toward negative infinity, but the problem requires truncation toward zero. Concretely: `7 / -3` = `-2.333...`; the problem wants `-2` (truncated), but `Math.floor(-2.333)` gives `-3`.

## Mistakes Made
1. `Math.floor` instead of the correct truncation-toward-zero behavior — self-identified once traced on `-2.333`.
2. First guess at a fix was `Math.round` — also wrong in general (rounds to nearest, not toward zero; e.g. `Math.round(2.75)` → `3`, not `2`). Asked directly for the fix after this second guess didn't land; given `Math.trunc`.

## Key Insight
RPN evaluation: iterate token by token. Numbers get pushed onto a stack as-is. Operators pop the two most recently pushed values — the *first* pop is the right-hand operand (it was pushed most recently, i.e. it appears second/closer to the operator in the original "a b op" ordering), the *second* pop is the left-hand operand — apply `left OP right`, and push the single result back onto the stack. By the end, the stack holds exactly one value: the final answer.

For division specifically: `Math.trunc()` truncates toward zero regardless of sign, which is exactly what integer division in this problem requires — unlike `Math.floor` (always rounds down) or `Math.round` (rounds to nearest, not toward zero).

## Complexity Reached
Time: O(n) — one pass through tokens, all stack operations O(1).
Space: O(n) — worst case, stack holds up to n/2 + 1 operands before any operator resolves them.

## Coach Notes for Next Session
- New toolkit gap logged (patterns.md #70): `Math.trunc` vs `Math.floor` vs `Math.round` for truncation-toward-zero on negative division. Probe cold on the next problem needing integer division with possible negative operands.
- Correctly self-attributed the near-one-shot speed to prior exposure ("saw this years back, built the formulas for [RPN] anyways") rather than overconfidence — an honestly calibrated self-assessment, worth noting as a positive pattern in itself.
- Revisit-queue status unchanged — not raised this problem either, now six problems deep into today's session with zero mention.
