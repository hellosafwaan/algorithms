Session: [064_2026-07-15_score-of-parentheses.md](../../safwaan/sessions/064_2026-07-15_score-of-parentheses.md)

## How It Felt
Easy — exact same pattern as `nestingScore` from the stack fundamentals module.

## Key Insight
This isn't just a similar pattern to `nestingScore` — it's the same algorithm, unchanged. Seed a stack with `0`, push another `0` every time an opening bracket shows up (a fresh "score so far" for that nesting level), and on a closing bracket, pop the top and fold it into the level below: `+1` if what was popped is `0` (a direct match, `()`), or double it (`popped * 2`) if it's nonzero (a nested group just resolved). By the end, `stack[0]` holds the total score.

## Solution Walkthrough
`scoreOfParentheses` takes a balanced parentheses string `s` and returns its score under these rules: `()` is worth 1, `AB` (concatenation) is worth `A + B`, and `(A)` (nesting) is worth `2 * A`.

Start the stack with a single `0` already on it — this represents "score accumulated so far" at the outermost level, and conveniently means the final answer is just whatever ends up in `stack[0]`.

Walk through the string one character at a time:
- On `(`, push a fresh `0` onto the stack. This opens a new, empty accumulator for whatever ends up nested inside this bracket.
- On `)`, pop the top of the stack:
  - If the popped value is `0`, this was a direct `()` match with nothing inside — add `1` to the new top of the stack (the level this bracket belongs to).
  - If the popped value is nonzero, a nested substring's score just finished — double it and add *that* to the new top of the stack.

After the whole string is processed, `stack[0]` holds the final score.

**Why it works:** each stack slot represents the accumulated score at one nesting depth. A closing bracket always folds its level's result into the level directly below it, and the two scoring rules (`+1` for a direct match, `×2` for nesting) fall out of the same fold step — the code doesn't need to branch on "is this adjacency or nesting," since a `0` naturally means "nothing was nested here."

## Pattern Introduced
Not new — exact, unmodified reuse of the Score Accumulation via Stack pattern from `stack/fundamentals/5-nesting-score`. Unlike LC 394 (which needed generalizing `decompressBraces` for multi-digit counts), this transferred with zero changes.

## Watch Out For
Nothing new surfaced — clean, direct transfer.

## Template
```js
var scoreOfParentheses = function(s) {
  const stack = [0];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === '(') stack.push(0);
    else {
      const popped = stack.pop();
      if (popped === 0) stack[stack.length - 1] += 1;
      else stack[stack.length - 1] += popped * 2;
    }
  }
  return stack[0];
};
```

## Trace Through
`s = "(()(()))"`
- `(` → push 0 → stack: `[0, 0]`
- `(` → push 0 → stack: `[0, 0, 0]`
- `)` → pop 0 (direct match) → top += 1 → stack: `[0, 1]`
- `(` → push 0 → stack: `[0, 1, 0]`
- `(` → push 0 → stack: `[0, 1, 0, 0]`
- `)` → pop 0 (direct match) → top += 1 → stack: `[0, 1, 1]`
- `)` → pop 1 (nonzero, nested) → top += 1*2=2 → stack: `[0, 3]`
- `)` → pop 3 (nonzero, nested) → top += 3*2=6 → stack: `[6]`
- End → return `stack[0]` = `6`

## Complexity
Time: O(n) — one pass through the string; push/pop and the top-of-stack update are all O(1).
Space: O(n) — the stack can grow to depth n in the worst case, e.g. a fully nested string like `"((((()))))"`.

## Submissions
https://leetcode.com/problems/score-of-parentheses/submissions/2068899342

## Open Questions
None outstanding for this problem.
