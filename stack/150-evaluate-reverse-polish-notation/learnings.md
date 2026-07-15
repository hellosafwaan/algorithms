Session: [066_2026-07-15_evaluate-reverse-polish-notation.md](../../safwaan/sessions/066_2026-07-15_evaluate-reverse-polish-notation.md)

## How It Felt
Pretty easy — near one-shot, aside from the division truncation bug. Self-attributed the speed to prior exposure to the idea (seen it years back, already comfortable with the RPN formula shape), not just luck.

## Key Insight
In Reverse Polish Notation, operands come before their operator — so `A + B` in normal notation is written `A B +` in RPN. That ordering is exactly what makes a stack the right tool: push operands as you see them, and the moment you hit an operator, the two values you need are sitting right at the top of the stack, in the right order to apply the operation.

## Solution Walkthrough
In his own words (lightly cleaned up):

In reverse polish notation, the operands are put first, and then the operator comes after. So the RPN for `A + B` would be written as `A B +`. What we do is iterate over the given list of tokens. For every token: if it's *not* an operator, we just push it onto the stack — it's an operand, nothing more to do yet. Once we come across an operator, we pop the two most recent values off the stack — the right operand and the left operand — and apply whichever operation the token represents (`+`, `-`, `*`, or `/`), then push the result back onto the stack. By the time we've gone through every token, there's exactly one value left on the stack — the final answer.

**The one subtlety:** pop order matters. Since the stack was built by pushing the left operand first and the right operand second, popping gives you the right operand *first*, then the left operand. So `rightOperand = stack.pop()` and `leftOperand = stack.pop()`, and the operation is applied as `leftOperand OP rightOperand` — getting this backwards would silently produce wrong answers for non-commutative operators (`-` and `/`), even though `+` and `*` would still happen to work.

**The bug:** division needs to truncate toward zero, not just round down. `Math.floor(leftOperand / rightOperand)` is wrong whenever the division result is negative — e.g. `7 / -3 = -2.333...`, and the problem wants `-2` (truncate), but `Math.floor(-2.333)` gives `-3` (rounds toward negative infinity instead). The fix is `Math.trunc()`, which just chops the decimal off regardless of sign — exactly "truncate toward zero." (A tempting but wrong alternative: `Math.round`, which rounds to the *nearest* integer, not toward zero — e.g. `Math.round(2.75)` gives `3`, not `2`.)

## Pattern Introduced
**Postfix Expression Evaluation via Stack** — new pattern, first appearance.

## Watch Out For
- Pop order: right operand first, then left operand — matters for `-` and `/`, not just `+`/`*`.
- `Math.floor` vs `Math.trunc` vs `Math.round` for integer division: only `Math.trunc` truncates toward zero regardless of sign. `Math.floor` always rounds down (wrong for negative results); `Math.round` rounds to nearest (wrong in general, not just for negatives).
- `operators.includes(token)` works here because operator tokens are always exactly one character and operand tokens are never single characters that coincide with an operator symbol — this is a substring check, not exact match, so it's a bit fragile in general but fine for this problem's constraints.

## Template
```js
function evalRPN(tokens) {
    const operators = '+-*/';
    const stack = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (operators.includes(token)) {
            const rightOperand = stack.pop();
            const leftOperand = stack.pop();
            if (token === '+') stack.push(leftOperand + rightOperand);
            if (token === '-') stack.push(leftOperand - rightOperand);
            if (token === '*') stack.push(leftOperand * rightOperand);
            if (token === '/') stack.push(Math.trunc(leftOperand / rightOperand));
        } else {
            stack.push(Number(token));
        }
    }
    return stack[0];
}
```

## Trace Through
`tokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]`
- Push `10`, `6`, `9`, `3` → stack: `[10, 6, 9, 3]`
- `+` → pop `3` (right), pop `9` (left) → `9 + 3 = 12` → stack: `[10, 6, 12]`
- Push `-11` → stack: `[10, 6, 12, -11]`
- `*` → pop `-11` (right), pop `12` (left) → `12 * -11 = -132` → stack: `[10, 6, -132]`
- `/` → pop `-132` (right), pop `6` (left) → `6 / -132 = -0.0454...` → `Math.trunc` → `0` → stack: `[10, 0]`
- `*` → pop `0` (right), pop `10` (left) → `10 * 0 = 0` → stack: `[0]`
- Push `17` → stack: `[0, 17]`
- `+` → pop `17`, pop `0` → `0 + 17 = 17` → stack: `[17]`
- Push `5` → stack: `[17, 5]`
- `+` → pop `5`, pop `17` → `17 + 5 = 22` → stack: `[22]`
- Final answer: `22`

## Complexity
Time: O(n) — one pass through the tokens; each stack push/pop and arithmetic operation is O(1).
Space: O(n) — worst case (many operands before any operator), the stack can hold up to roughly half the tokens.

## Submissions
https://leetcode.com/problems/evaluate-reverse-polish-notation/submissions/2068989855

## Open Questions
Does `Math.trunc` vs `Math.floor` vs `Math.round` land cold on the next problem requiring integer division with possible negative operands? (patterns.md #70)
