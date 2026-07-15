# decompressBraces

**Problem Statement**

Write a function, `decompressBraces`, that takes in a compressed string as an argument. The string uses a format where a single-digit number (1–9) precedes a `{...}` group, meaning the contents of that group should be repeated that many times. Groups may be nested. The function should return the fully decompressed string.

**Examples**

- `"2{r}3{tu}"` → `"rrtututu"`
- `"3{2{y}o}2{k}j"` (nested group) → decompress the inner group first (`"yy"` + `"o"` → `"yyo"`), then the outer group repeats that whole segment.

**Approach**

Like [`3-befitting-brackets`](../3-befitting-brackets), this uses a stack to track pending work — but instead of just checking for balance, we use the stack to actually *build* the decompressed segments as we go, innermost group first.

1. Push regular characters and digits onto the stack as we encounter them, left to right. Digits get pushed as actual numbers (via `Number(char)`), not characters — this is what lets us later distinguish "a digit is on top of the stack" from "a letter is on top of the stack."
2. Opening braces `{` are ignored entirely — they carry no information we need to store.
3. When we hit a closing brace `}`, we've reached the end of a group and need to decompress it:
   - Pop from the stack repeatedly, prepending each popped character to a `segment` string (`segment = popped + segment`, not `segment += popped`) — since the stack pops in reverse order, prepending is what restores the original left-to-right order.
   - Keep popping until the top of the stack is a `number` (checked via `typeof`) rather than a string — that number is the repeat count for this group.
   - Pop that number off, call `repeat(segment, num)` to build the repeated string, and push the **result** back onto the stack as a single string.
4. Because a completed group gets pushed back onto the stack as one string, a nested outer group just treats it like any other popped character when its own `}` is processed — nesting resolves naturally without any special-case code.
5. After the loop, `stack.join('')` concatenates everything left on the stack, in order, into the final decompressed string.

A small helper, `repeat(str, n)`, builds the repeated string by concatenating `str` onto a `result` accumulator `n` times in a plain `for` loop (no built-in `String.prototype.repeat` used here).

**Why numbers are pushed as actual numbers, not characters:** the `typeof stack[top] !== 'number'` check is what tells the popping loop when to stop. If digits were pushed as strings, they'd be indistinguishable from letters and the loop would have no way to know a group boundary was reached.

**Complexity**

Let `S` = number of regular (non-brace, non-digit) characters, `M` = number of brace groups.

- Checking whether a character is a digit (`numberChars.includes(char)`) is effectively O(1), since `numberChars` is always a fixed 9-character string.
- Every character is pushed/popped a bounded number of times as groups resolve, but the real cost comes from **output size**: since each group can repeat its contents up to 9 times, and groups can nest `M` levels deep, the final decompressed string can be as long as `9^M * S` in the worst case (e.g. `9{9{9{9{z}}}}`).
- Building that output (via `repeat` and the final `join`) costs time proportional to its length.

Overall: **O(9^M × S) time and space** — exponential in the nesting depth `M`, which is expected here since the problem itself demands generating exponentially long output in the worst case.

**Implementation:** [`index.js`](index.js)
