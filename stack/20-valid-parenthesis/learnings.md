Session: [062_2026-07-15_valid-parentheses.md](../../safwaan/sessions/062_2026-07-15_valid-parentheses.md)

## How It Felt
Easy, no bugs.

## Key Insight
This is exactly the same pattern as `befittingBrackets` from the stack fundamentals module — push the *closer* you'd expect to see next, and when a closer actually shows up, check it against the top of the stack.

## Solution Walkthrough

### Approach 1 — push the expected closer
So what we do is iterate over the string, which contains the parentheses. Whenever we encounter an opening bracket, we push the counterpart (closing) bracket to the stack — not the opener itself, the bracket we'd expect to see later to close it. Whenever we encounter a closing-type character, we check whether the top of the stack is actually that same closing bracket, because that's what we pushed when we saw the matching opener. If it is, we pop it — that's a valid match. If it's not (either the top doesn't match, or the stack is empty), it's a mismatch, so we return false immediately.

The final condition is to check whether there's a dangling bracket left over — something that was opened but never properly closed. If the stack still has items in it after the whole string has been processed, that's also invalid, so we only return true if the stack is empty at the end.

### Approach 2 — push the opener, look up what it needs to match
A second solution that flips the direction of the lookup map. This time `brackets` maps *closer → opener* (`{ ')': '(', '}': '{', ']': '[' }`), and on an opening character (checked via `'([{'.includes(elem)`), we push the opener **itself** onto the stack, not a translated value.

When a closing character shows up, we look up what opener it requires (`brackets[elem]`) and compare *that* to the top of the stack. Same match-or-fail logic as Approach 1 — pop on a match, return `false` if the stack is empty or the top doesn't equal the required opener. Same final `stack.length === 0` check at the end.

Functionally identical to Approach 1 — the only difference is which side of the pair gets pushed (opener vs. closer) and which direction the lookup table translates.

## Pattern Introduced
Not new — direct reuse of the Stack — Matching Brackets pattern from `stack/fundamentals/3-befitting-brackets`.

## Watch Out For
Checking `stack.length > 0` before comparing the top — an empty stack on a closer means there's nothing to match, and skipping that check would let `stack[stack.length - 1]` silently be `undefined` instead of properly failing.

## Template

**Approach 1 (push closer):**
```js
const brackets = { '(': ')', '{': '}', '[': ']' };
const stack = [];
for (let i = 0; i < s.length; i++) {
  const elem = s[i];
  if (elem in brackets) stack.push(brackets[elem]);
  else {
    if (stack.length > 0 && stack[stack.length - 1] === elem) stack.pop();
    else return false;
  }
}
return stack.length === 0;
```

**Approach 2 (push opener):**
```js
const brackets = { ')': '(', '}': '{', ']': '[' };
const stack = [];
for (let i = 0; i < s.length; i++) {
  const elem = s[i];
  if ('([{'.includes(elem)) stack.push(elem);
  else {
    if (stack.length > 0 && stack[stack.length - 1] === brackets[elem]) stack.pop();
    else return false;
  }
}
return stack.length === 0;
```

## Trace Through
`s = "([)]"`
- `(` → opener → push `)` → stack: `[')']`
- `[` → opener → push `]` → stack: `[')', ']']`
- `)` → closer → top of stack is `]`, doesn't match `)` → return `false` immediately (correctly invalid — brackets cross instead of nesting properly)

`s = "()[]{}"`
- `(` → push `)` → `[')']`
- `)` → top matches → pop → `[]`
- `[` → push `]` → `[']']`
- `]` → top matches → pop → `[]`
- `{` → push `}` → `['}']`
- `}` → top matches → pop → `[]`
- End of string, stack is empty → return `true`

## Complexity
Time: O(n) — single pass through the string; the `in` check, push, pop, and length check are all O(1) since the `brackets` object has a fixed 3 keys.
Space: O(n) — worst case, a string of all openers, the stack grows to length n.

## Submissions
https://leetcode.com/problems/valid-parentheses/submissions/2068342468

## Open Questions
None outstanding for this problem.
