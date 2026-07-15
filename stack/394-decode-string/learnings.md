Session: [063_2026-07-15_decode-string.md](../../safwaan/sessions/063_2026-07-15_decode-string.md)

## How It Felt
Pretty straightforward — same stack pattern as `decompressBraces` from the stack fundamentals module.

## Key Insight
This is the `decompressBraces` pattern from fundamentals, generalized two ways: `[`/`]` instead of `{`/`}`, and repeat counts can be more than one digit (fundamentals assumed single digits 1-9 only). Same core idea though — a single stack, pop-until-marker to gather a segment, repeat it, push the result back as one unit.

## Solution Walkthrough
The function takes a compressed string `s` (e.g. `"3[a]2[bc]"`) and needs to return the fully decoded string (`"aaabcbc"`).

Set up one `stack` (a plain array) and a `numbers` string for digit lookup (unused directly in the final logic, but kept from the fundamentals version).

Walk through `s` one character at a time. For every character that **isn't** a closing bracket `]`, just push it straight onto the stack — this covers letters, digits, and opening brackets `[` alike, no special handling needed on the way in.

The real work happens when a `]` shows up, meaning a group just closed and needs to be decoded:

1. **Gather the segment.** Pop characters off the stack one at a time, prepending each to a `segment` string (`segment = popped + segment`, not appended — since popping happens in reverse order, prepending restores the original left-to-right order), until the top of the stack is `[`. That `[` marks the start of this group's contents.
2. **Consume the `[`.** Pop it off — it's done its job, it's not part of the output.
3. **Gather the number.** Now the top of the stack holds the repeat count's digits (possibly more than one, e.g. `12[a]`). Keep popping while the top of the stack is a digit character (checked via `stack[stack.length-1] >= '0' && <= '9'`), prepending each to a `num` string the same way as the segment, until a non-digit (or empty stack) is hit.
4. **Expand and push back.** `segment.repeat(num)` builds the repeated string (JS coerces the numeric string `num` to a number automatically for `.repeat()`), and that single resulting string gets pushed back onto the stack as one unit.

Because the fully-expanded segment goes back on the stack as a single string, a group nested inside another group just gets treated like any other stack item when the *outer* group's `]` is processed later — nesting resolves itself with no special-case code, innermost group first.

Once the whole string has been scanned, whatever's left on the stack (there's no more `]` to trigger decoding) is exactly the fully decoded pieces in order — `stack.join('')` concatenates them into the final answer.

**Note:** there's a leftover `repeat(str, n)` helper function defined below `decodeString` that's never actually called — this solution uses the built-in `segment.repeat(num)` directly instead. It's dead code carried over from the fundamentals version, where a custom helper was needed.

## Pattern Introduced
Not new — direct reuse and generalization of the Nested Group Decompression pattern from `stack/fundamentals/4-decompress-braces`.

## Watch Out For
- `num` ends up as a string (built by prepending popped digit characters), not a number — but `.repeat()` coerces it automatically, so no explicit `Number(num)` conversion is needed.
- The unused `repeat` helper function — dead code, safe to delete if cleaning this up later.
- Multi-digit counts require popping digits in a loop, not just popping one character — a single-digit assumption (like the fundamentals version had) would break on inputs like `10[a]`.

## Template
```js
function decodeString(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const elem = s[i];
    if (elem !== ']') stack.push(elem);
    else {
      let segment = '';
      while (stack[stack.length - 1] !== '[') {
        segment = stack.pop() + segment;
      }
      stack.pop(); // discard the '['
      let num = '';
      while (stack.length && stack[stack.length - 1] >= '0' && stack[stack.length - 1] <= '9') {
        num = stack.pop() + num;
      }
      stack.push(segment.repeat(num));
    }
  }
  return stack.join('');
}
```

## Trace Through
`s = "3[a2[c]]"`
- `3`, `[`, `a` → pushed as-is → stack: `['3','[','a']`
- `2`, `[`, `c` → pushed as-is → stack: `['3','[','a','2','[','c']`
- `]` (first, closes the inner `2[c]` group):
  - Pop until `[`: pop `c` → segment=`"c"` → top is now `[` → stop
  - Pop the `[`
  - Pop digits: top is `2` → pop → num=`"2"` → next top is `a`, not a digit → stop
  - Push `"c".repeat(2)` = `"cc"` → stack: `['3','[','a','cc']`
- `]` (second, closes the outer `3[...]` group):
  - Pop until `[`: pop `"cc"` → segment=`"cc"`; pop `a` → segment=`"acc"` → top is now `[` → stop
  - Pop the `[`
  - Pop digits: top is `3` → pop → num=`"3"` → stack now empty → stop
  - Push `"acc".repeat(3)` = `"accaccacc"` → stack: `['accaccacc']`
- End of string → `stack.join('')` = `"accaccacc"`

## Complexity
Time: O(n) amortized in terms of stack operations — every character is pushed once and popped at most once as groups resolve. The dominant cost in the worst case is actually the **output size**: repeat counts can compound through nesting (e.g. `2[2[2[a]]]`), so the decoded string — and therefore the total work to build and push it — can be exponential in the nesting depth in the worst case. Same reasoning as `decompressBraces`.
Space: O(n) for the stack, plus the size of the final decoded output.

## Submissions
https://leetcode.com/problems/decode-string/submissions/2068442172
Accepted — 34/34 testcases. Runtime 0ms (beats 100.00%), Memory 52.11MB (beats 97.38%).

## Open Questions
Alternative approaches discussed but not yet implemented — deferred to a future session:
- **Recursive descent**, no explicit stack: track an index pointer, recurse into a group's contents on `[`, return the decoded segment plus where parsing stopped, multiply by the count, and continue.
- **Two parallel stacks** (a `countStack` and a `stringStack`, plus running `currentString`/`currentNum` variables): push both onto their respective stacks on `[`, reset the running variables, and on `]` pop one of each and combine — avoids searching backward through a single mixed stack for markers.
