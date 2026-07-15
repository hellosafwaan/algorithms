# Stack — Phase 4 Notes

## Core Shape — Push/Pop Reversal

Use a stack to reverse a subset of characters within a string without disturbing the rest.

```js
const stack = [];
for (const char of str) {
  if (isTarget(char)) stack.push(char);
}
const result = [];
for (const char of str) {
  if (isTarget(char)) result.push(stack.pop());
  else result.push(char);
}
return result.join('');
```

**Why it works:** a stack is LIFO — the last target character seen on the first pass is the first one popped on the second pass, which is exactly the reversal you need. No manual index math.

## Core Shape — Balanced/Matching Brackets

Use a stack to track pending opens. Push what you'd need to see next to close correctly (the *closer*, not the opener) — that turns the match check into a direct equality against the top of the stack.

```js
const pairs = { '(': ')', '[': ']', '{': '}' };
const stack = [];
for (const char of str) {
  if (char in pairs) stack.push(pairs[char]);
  else {
    if (stack.length > 0 && stack[stack.length - 1] === char) stack.pop();
    else return false;
  }
}
return stack.length === 0;
```

**Watch out for:** checking the stack is non-empty *before* comparing its top — an empty stack on a closer means there's nothing to match, and indexing `stack[-1]` won't throw in JS, it just silently returns `undefined`.

## Core Shape — Score/Value Accumulation via Stack

When nested structure needs to accumulate a *value* (not just a boolean or characters), seed the stack with an initial accumulator (often `0`) and update the top of the stack instead of pushing/popping raw characters.

```js
const stack = [0];
for (const char of str) {
  if (char === '[') stack.push(0);
  else {
    const popped = stack.pop();
    stack[stack.length - 1] += (popped === 0) ? 1 : popped * 2;
  }
}
return stack[0];
```

Each stack slot represents "score accumulated so far at this nesting depth." Folding a finished level's result into the level below on close is what makes nested and adjacent cases fall out of the same code path.

## Core Shape — Nested Group Decompression (Marker-Based, Multi-Digit)

Generalized version of the fundamentals `4-decompress-braces` shape: instead of relying on `typeof` to tell a pushed number apart from a pushed character (which only works for single-digit counts), use an explicit marker character (`[`) to bound the segment, then pop a *run* of digit characters to build a possibly-multi-digit count.

```js
const stack = [];
for (const char of s) {
  if (char !== ']') stack.push(char);
  else {
    let segment = '';
    while (stack[stack.length - 1] !== '[') segment = stack.pop() + segment;
    stack.pop(); // discard '['
    let num = '';
    while (stack.length && stack[stack.length - 1] >= '0' && stack[stack.length - 1] <= '9') {
      num = stack.pop() + num;
    }
    stack.push(segment.repeat(num));
  }
}
return stack.join('');
```

**Why the marker matters here:** with multi-digit counts, digits are pushed onto the stack one character at a time (`'1'`, then `'2'` for `12[a]`) — `typeof` can't distinguish "a digit character" from "a letter character" the way it could distinguish a JS number from a string in the fundamentals version. Popping while the top is numerically a digit (`'0'`–`'9'` string comparison) handles the multi-digit case correctly.

## Watch Out For

- `for (char of str)` without `let`/`const` creates an implicit global — always declare the loop variable.
- Prepend, don't append, when reconstructing a segment by popping (`segment = popped + segment`, not `segment += popped`) — popping happens in reverse order.
- `stack[stack.length - 1]` is the standard way to peek the top without removing it — no built-in `.peek()` in JS arrays.
- `.repeat(numString)` works fine with a numeric *string* — JS coerces it automatically, no explicit `Number()` conversion needed.

## Problems

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| [1-reverse-some-chars](fundamentals/1-reverse-some-chars/README.md) | Push/Pop Reversal | Push targets on pass 1, pop them back (reversed) on pass 2 |
| [2-paired-parenthesis](fundamentals/2-paired-parenthesis/README.md) | Running count (no stack object needed) | Single counter suffices with only one bracket type; negative count = invalid |
| [3-befitting-brackets](fundamentals/3-befitting-brackets/README.md) | Matching brackets, multiple types | Push the expected *closer*, not the opener — direct equality check against stack top |
| [4-decompress-braces](fundamentals/4-decompress-braces/README.md) | Nested group expansion | Push digits as numbers (not strings) to distinguish them from characters via `typeof`; pop-until-number to gather a segment, repeat, push back as one unit — nesting resolves naturally |
| [5-nesting-score](fundamentals/5-nesting-score/README.md) | Score accumulation | Stack of running scores per nesting depth; fold child's score into parent's on close (`+1` if direct match, `*2` if nested) |
| [345-reverse-vowels-of-a-string](345-reverse-vowels-of-a-string/learnings.md) *(bonus, real LC problem)* | Push/Pop Reversal | Direct cold transfer of the `1-reverse-some-chars` pattern — vowels are the target character set |
| [20-valid-parenthesis](20-valid-parenthesis/learnings.md) *(curriculum #1, real LC problem)* | Matching brackets, multiple types — 2 solutions | Direct cold transfer of the `3-befitting-brackets` pattern. Two equivalent implementations: push the expected closer (Approach 1, matches fundamentals), or push the opener and reverse-lookup what it needs to match (Approach 2) — same logic, mirrored lookup direction. |
| [394-decode-string](394-decode-string/learnings.md) *(bonus, Medium, real LC problem)* | Nested group decompression, marker-based, multi-digit | Direct cold transfer of the `4-decompress-braces` pattern, generalized to `[]` brackets and multi-digit counts via a `[` marker instead of a `typeof number` check. Third confirmed fundamentals→real-problem transfer in the same session, first at Medium difficulty. 100th percentile runtime. |
| [856-score-of-parentheses](856-score-of-parentheses/learnings.md) *(bonus, Medium, real LC problem)* | Score accumulation, exact match | Direct cold transfer of the `5-nesting-score` pattern — unlike LC 394, needed zero adaptation, exact same algorithm. Fourth and final confirmed fundamentals→real-problem transfer in the same session — now a settled instinct. |
