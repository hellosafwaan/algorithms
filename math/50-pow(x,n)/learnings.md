Session: [018_2026-06-07_pow-x-n](../../safwaan/sessions/018_2026-06-07_pow-x-n.md)

## How It Felt

New territory. I was able to get a correct brute-force iterative and recursive solution, but I couldn't figure out how to make it efficient. I exhausted my toolbox — I knew iterative, I knew recursion, and neither was fast enough. The exponentiation by squaring idea was completely new to me. Once it was explained I understood it quickly, but I couldn't have derived it on my own. The float issue with `n/2` on odd numbers was a bit of a "how did I miss that" moment — felt obvious in hindsight. Overall it felt guided for the optimization part.

## Key Insight

`x^n = x^i * x^j`, where i + j = n.

i and j can be anything — (9,1), (8,2), (4,6). But if you pick i=j=n/2, you only have to compute one subproblem, because both halves are identical. Any other split gives you two *different* subproblems. Halving is the only split that lets you reuse.

That's the whole idea: compute `x^(n/2)` once, store it, square it. Instead of multiplying `x` one step at a time (O(n)), you halve the exponent each call (O(log n)).

For odd n: you can't split evenly, so pull out one extra `x` — `x * x^(n/2) * x^(n/2)` — and floor the division.

Handle negative `n` once at the top: `if (n < 0) return 1 / myPow(x, -n)`. Then the rest of the function only ever sees positive `n`.

## Solution Walkthrough

So, the key observation is that `x^n = x^(n/2) * x^(n/2)`. Instead of walking down from `n` to `0` one step at a time, you walk down by halving. That's why it's O(log n) — the same reason binary search is O(log n). Each recursive call cuts the problem in half.

There are two cases depending on whether `n` is even or odd:
- **Even:** `x^n = x^(n/2) * x^(n/2)`. Compute the half once, square it.
- **Odd:** `x^n = x * x^(n/2) * x^(n/2)`. Same thing, just multiply one extra `x` on top.

Why `Math.floor(n/2)`? Because in JavaScript, `5 / 2 = 2.5`, not `2`. If you pass `2.5` into the recursion, `n` never reaches `0` exactly — it keeps halving forever: `2.5 → 1.25 → 0.625 → ...`. You get a stack overflow (or Infinity in the browser). Always floor when halving in recursion.

Why handle negative `n` at the top? You could handle it inside the recursion (`(1/x) * myPow(x, n+1)`), but that's O(n) again — you're stepping up by 1 each time. The clean way: flip `n` positive and wrap the whole result in `1 / ...`. One guard, two lines, done.

Why store `powerOfHalfed` in a variable? If you write `myPow(x, n/2) * myPow(x, n/2)`, you're making two separate recursive calls — the entire sub-tree gets computed twice. That turns O(log n) back into O(n). Store it once, use it twice.

```js
function myPow(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / myPow(x, -n);
    const half = myPow(x, Math.floor(n / 2));
    if (n % 2 === 0) return half * half;
    else return x * half * half;
}
```

## Pattern Introduced

**Exponentiation by Squaring** — also called Fast Exponentiation, a specific instance of Divide and Conquer.

**Core idea:** Instead of reducing the problem by 1 each step, reduce by half. `x^n → x^(n/2)`. Costs O(log n) calls instead of O(n).

**When to reach for it:** Any time you're computing a power and `n` can be large. Also: this shape (compute half, combine) is the same shape as merge sort, binary search, and other divide-and-conquer algorithms.

**Always remember:** `Math.floor(n/2)` — never raw `n/2` in recursion.

## Watch Out For

- **`n/2` without Math.floor** — gives a float for odd `n`, causes infinite recursion. Always `Math.floor(n/2)`.
- **Double-calling the recursive case** — `myPow(x, n/2) * myPow(x, n/2)` computes the sub-tree twice. Store in a variable.
- **Handling negative `n` inside the recursion** — `(1/x) * myPow(x, n+1)` is O(n) again. Handle it once at the top.
- **Variable scope** — if you declare `half` inside an `if/else` block, it's not accessible outside. Declare before the conditional.

## Template

```js
function myPow(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / myPow(x, -n);          // handle negative once
    const half = myPow(x, Math.floor(n / 2));      // floor — never float
    if (n % 2 === 0) return half * half;            // even
    else return x * half * half;                    // odd: one extra x
}
```

## Trace Through

`myPow(2, 10)`:
- n=10, even → half = myPow(2, 5)
  - n=5, odd → half = myPow(2, 2)
    - n=2, even → half = myPow(2, 1)
      - n=1, odd → half = myPow(2, 0)
        - n=0 → return 1
      - return 2 * 1 * 1 = 2
    - return 2 * 2 = 4
  - return 2 * 4 * 4 = 32
- return 32 * 32 = 1024 ✓

5 recursive calls to compute `2^10`. Brute force would be 10.

`myPow(2, -3)`:
- n < 0 → return 1 / myPow(2, 3)
  - myPow(2, 3): half = myPow(2, 1) → 2; return 2 * 2 * 2 = 8
- return 1/8 = 0.125 ✓

## Complexity

**Time: O(log n)** — the recursion halves `n` each call. `n → n/2 → n/4 → ...` reaches 0 in log₂(n) steps.

**Space: O(log n)** — the call stack is log n deep. Not O(1) like an iterative solution, but perfectly acceptable.

Compare to brute force O(n) time — for n = 2^31 ≈ 2 billion, that's the difference between ~31 operations and ~2 billion.

## Submissions

- https://leetcode.com/problems/powx-n/submissions/2025288652 — Accepted, 100th percentile runtime, 66th percentile memory

## Open Questions

- Can you implement this iteratively (no call stack)? Hint: think about the binary representation of n.
- `Math.floor(n/2)` vs `n >> 1` (right bit shift) — same result for non-negative integers. Would you use this in an interview?
