# Stack Fundamentals

Stacks have mostly shown up so far as the implicit mechanism behind DFS reversal (trees, graphs). This section is about practicing stack problems that *aren't* about depth-first traversal, to round out the data structure — including the classic bracket-matching interview problem.

---

## reverseSomeChars

**Problem Statement**

Write a function, `reverseSomeChars`, that takes in a string and an array of characters. The function should return the string with the order of the given target characters reversed, leaving all other characters in place.

**Example**

```
input:  str = "skateboard", chars = ["a", "e", "i", "o", "u"]
```

Only the target characters (`a`, `e`, `o`, `a`) get their order reversed — everything else stays where it is.

**Approach**

A stack is a natural fit because of its LIFO order — it lets you replay the target characters in reverse without extra index bookkeeping.

1. Convert `chars` into a `Set` for O(1) membership checks.
2. First pass over the string: whenever the current character is a target, push it onto the `stack`. (Non-targets are ignored in this pass.) After this pass, the stack holds every target character in original left-to-right order, with the *last* target character on top.
3. Second pass over the string: whenever the current character is a target, pop from the stack and append that to the result. Since the stack is LIFO, popping yields the target characters in reverse order automatically. Non-target characters are just appended as-is.
4. Join the result array into a string.

**Why it works:** the stack naturally reverses order for you — no manual index math, no explicit reversal step.

**Complexity**

Let `N` = length of the string, `M` = number of target characters.

- Building the `Set` from `chars`: O(M) time, O(M) space.
- First pass over the string: O(N) time (constant-time membership check + push per character).
- Second pass over the string: O(N) time (constant-time pop per target character).
- Joining the result: O(N).

Total: **O(N + M) time, O(N + M) space** — the set costs O(M), the stack and result both scale up to O(N).

**Implementation:** [`index.js`](index.js)
