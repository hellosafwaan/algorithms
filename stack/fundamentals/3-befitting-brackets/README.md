# befittingBrackets

**Problem Statement**

Write a function, `befittingBrackets`, that takes in a string as an argument. The function should return a boolean indicating whether or not the string contains correctly matched brackets.

You may assume the string contains only characters: `(` `)` `[` `]` `{` `}`

```js
befittingBrackets('(){}[](())'); // -> true
befittingBrackets('({[]})');     // -> true
befittingBrackets('[][}');       // -> false
befittingBrackets('{[]}({}');    // -> false
befittingBrackets('[]{}(}[]');   // -> false
befittingBrackets('[]{}()[]');   // -> true
befittingBrackets(']{}');        // -> false
befittingBrackets('');           // -> true
```

**Approach**

This builds directly on [`2-paired-parenthesis`](../2-paired-parenthesis) — same shape, but now there are three distinct bracket types, so a single counter isn't enough. We need to remember *which* type of bracket is currently open, and in what order, so a stack replaces the counter.

1. Define a `brackets` lookup object mapping each opening symbol to its corresponding closing symbol: `{ '(': ')', '[': ']', '{': '}' }`.
2. Iterate through the string left to right.
3. If the current character is a key in `brackets` (i.e. it's an opener), push its **matching closer** onto the stack — not the opener itself. This means the top of the stack always holds exactly what we'd need to see next to close correctly.
4. If the current character isn't an opener, it must be a closer. Check two things together: is the stack non-empty, *and* does the top of the stack equal the current character?
   - If both hold, it's a valid match — pop the stack.
   - If either fails (stack is empty, meaning a closer showed up with nothing open; or the top doesn't match, meaning the wrong bracket type is trying to close) — the string is invalid, return `false` immediately.
5. After the loop, the string is valid only if the stack is empty (`stack.length === 0`). Any leftover items mean there are unmatched openers.

**Why push the closer, not the opener:** it turns the check in step 4 into a direct equality (`stack top === current char`) instead of needing a second lookup to translate an opener into its expected closer at match time.

**Complexity**

Let `N` = length of the string.

- Single pass through the string: **O(N)** time. The `char in brackets` check, push, pop, and array-length checks are all O(1).
- The `brackets` object is a fixed size (3 keys), so it contributes no growth — O(1) space.
- The stack can grow up to `N` in the worst case (a string of all openers): **O(N)** space.

Overall: **O(N) time, O(N) space.**

**Implementation:** [`index.js`](index.js)
