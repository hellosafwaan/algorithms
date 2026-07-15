Session: [061_2026-07-15_reverse-vowels-of-a-string.md](../../safwaan/sessions/061_2026-07-15_reverse-vowels-of-a-string.md)

## How It Felt
Pretty easy — same stack pattern from `reverseSomeChars` (stack fundamentals), no bugs.

## Key Insight
So this is really the exact same idea as `reverseSomeChars`, just with vowels as the target characters instead of a custom array. First you go through the whole string once and whenever you find a vowel, you push it onto the stack. Then you go through the string a second time, and every time you hit a vowel again, you pop from the stack instead — since a stack is last-in-first-out, the last vowel you saw comes out first, which is exactly the swap you need (first vowel gets the last vowel's value, and so on). Non-vowel characters just get carried over as-is on the second pass. You just keep swapping as you pop and add until you've walked the whole string.

## Solution Walkthrough
The function takes a string `s` and needs to return it with the vowels reversed in place — everything else stays exactly where it is.

First, set up a `vowels` string (`'aeiouAEIOU'`, covering both cases) and an empty `stack`.

**First pass:** walk through every character of `s`. If the character is a vowel (`vowels.includes(char)`), push it onto the stack. Consonants get ignored entirely in this pass. By the end, the stack holds every vowel from the string in original left-to-right order, with the *last* vowel sitting on top.

**Second pass:** walk through `s` again, building a `result` array. For each character: if it's a vowel, pop from the stack and push that popped value into `result` instead of the original character. Since the stack is LIFO, the first pop gives you the *last* vowel in the string — which is exactly what should replace the *first* vowel position. Every subsequent vowel position keeps pulling the next-most-recent vowel off the stack, walking backward through the original vowel order automatically. If the character isn't a vowel, just push it into `result` unchanged.

Finally, `result.join('')` turns the array back into a string and that's the answer.

**Why a stack and not, say, two pointers:** two pointers (one from each end, swap on vowel-vowel match) also works and is actually the more common solution for this exact problem — but since this came right after building the stack fundamentals module, reaching for the stack pattern was the natural connection to make, and it works just as correctly.

## Pattern Introduced
Not new — direct reuse of the Stack — Push/Pop Reversal pattern from `stack/fundamentals/1-reverse-some-chars`.

## Watch Out For
Nothing new surfaced this problem — clean, bug-free solve.

## Template
```js
const targetChars = new Set(chars); // or a string with .includes()
const stack = [];
for (const char of str) {
  if (targetChars.has(char)) stack.push(char);
}
const result = [];
for (const char of str) {
  if (targetChars.has(char)) result.push(stack.pop());
  else result.push(char);
}
return result.join('');
```

## Trace Through
`s = "leetcode"`
- First pass, vowels found in order: `e`, `e`, `o`, `e` → stack (top to bottom as pushed): `[e, e, o, e]`, top is the last `e`.
- Second pass:
  - `l` → not a vowel → `result = ['l']`
  - `e` → vowel → pop → `e` (the last one pushed) → `result = ['l','e']`
  - `e` → vowel → pop → `o` → `result = ['l','e','o']`
  - `t` → not a vowel → `result = ['l','e','o','t']`
  - `c` → not a vowel → `result = [...,'c']`
  - `o` → vowel → pop → `e` → `result = [...,'e']`
  - `d` → not a vowel → `result = [...,'d']`
  - `e` → vowel → pop → `e` (the first one pushed) → `result = [...,'e']`
- Final: `"leotcede"`

## Complexity
Time: O(n) — two separate passes over the string, each O(n), plus O(n) for the final join. No nesting, so it's linear overall, not quadratic.
Space: O(n) — worst case (a string of all vowels), the stack holds up to n characters, and the `result` array is always length n.

## Submissions
https://leetcode.com/problems/reverse-vowels-of-a-string/submissions/2068193426

## Open Questions
None outstanding for this problem.
