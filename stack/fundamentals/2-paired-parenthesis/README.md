# pairedParentheses

**Problem Statement**

Write a function, `pairedParentheses`, that takes in a string as an argument. The function should return a boolean indicating whether or not the string has well-formed parentheses.

You may assume the string contains only alphabetic characters, `'('`, or `')'`.

**Examples**

- `"a(b)c(d(e)f)g"` → `true` — every opener has a matching closer, correctly nested.
- `"(a(b)"` → `false` — an opener is never closed.
- `"a)b(c"` → `false` — a closer shows up with nothing open to match it.

**Approach**

No stack object is actually needed here — a single running `count` does the same job, since all we care about is *how many* opens are currently unmatched, not their identity.

1. Initialize `count = 0`.
2. Iterate through the string left to right, one character at a time.
3. At the **top of each iteration**, check `count < 0`. If it's already negative, a previous closing parenthesis showed up with nothing open to match it, so return `false` immediately.
4. Then look at the current character: `'('` increments `count`, `')'` decrements it. Alphabetic characters are ignored (`else if` skips them).
5. After the loop finishes, return whether `count === 0`. A leftover positive count means some openers were never closed.

**Note on this implementation vs. the walkthrough:** the video checks for a negative count *immediately* when a closing parenthesis is seen (before decrementing) and short-circuits right there. This version instead checks `count < 0` at the **start of the next iteration** (or, if the negative happens on the last character, catches it via the final `count === 0` check). Both are correct — the count can only go negative on a `)`, and this version just defers the check by one step. The trade-off: on a string like `")))"`, the video's version bails after the very first `)`, while this version keeps iterating until either the next char or the final return catches it — a difference in how quickly it short-circuits, not in correctness.

**Complexity**

Let `N` = length of the string.

- Single pass through the string: **O(N)** time.
- Only a constant number of variables (`count`, loop index): **O(1)** space.

**Implementation:** [`index.js`](index.js)
