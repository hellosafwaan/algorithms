# nestingScore

**Problem Statement**

Write a function, `nestingScore`, that takes in a string of brackets as an argument. The function should return the score of the string according to the following rules:

- `[]` is worth 1 point
- `XY` is worth `X + Y` points, where `X`, `Y` are substrings of well-formed brackets
- `[S]` is worth `S * 2` points, where `S` is a substring of well-formed brackets

For example: `[[][][]]` is equivalent to `(1 + 1 + 1) * 2 = 6`.

You may assume that the input only contains well-formed square brackets.

```js
nestingScore("[]");                       // -> 1
nestingScore("[][][]");                   // -> 3
nestingScore("[[]]");                     // -> 2
nestingScore("[[][]]");                   // -> 4
nestingScore("[[][][]]");                 // -> 6
nestingScore("[[][]][]");                 // -> 5
nestingScore("[][[][]][[]]");             // -> 7
nestingScore("[[[[[[[][]]]]]]][]");       // -> 129
nestingScore("");                         // -> 0
```

**Approach**

Same family as the other bracket problems in this module, but instead of tracking balance or replaying characters, the stack here directly accumulates a running **score** at each nesting level.

1. Initialize the stack with a single `0` already on it. This represents the score of "nothing seen yet" — and it's also what makes the final return trivial, since the whole string's score ends up sitting at `stack[0]`.
2. Iterate through the string left to right.
3. On an opening bracket `[`, push a fresh `0` onto the stack. This starts a new, empty "score so far" for whatever is about to be nested inside this bracket.
4. On a closing bracket, pop the top of the stack:
   - If the popped value is `0`, this was a direct `[]` match with nothing nested inside — add `1` to whatever is now the new top of the stack (the enclosing level's score).
   - If the popped value is non-zero, it means a nested substring's score just closed out — double it (`popped * 2`, the nesting rule) and add that to the new top of the stack.
5. After the loop, `stack[0]` holds the final accumulated score for the whole string.

**Why this works:** each stack slot represents "the score accumulated so far at this nesting depth." Pushing `0` on `[` opens a fresh accumulator for that depth; popping and folding the result into the level below on a closer is exactly the `X + Y` (adjacent, same level) and `S * 2` (nested, one level up) rules falling out of simple addition — the two rules never need to be handled with different logic, since a "direct match" is just the special case where the popped accumulator happens to be `0`.

**Complexity**

Let `N` = length of the string.

- Single pass through the string: **O(N)** time. Each push/pop and the index-based top-of-stack update are all O(1).
- The stack can grow up to depth `N` in the worst case (fully nested brackets, e.g. `[[[[...]]]]`): **O(N)** space.

Overall: **O(N) time, O(N) space.**

**Implementation:** [`index.js`](index.js)
