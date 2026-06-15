# LC 202 — Happy Number

Session: [029_2026-06-15_happy-number](../../safwaan/sessions/029_2026-06-15_happy-number.md)

---

## How It Felt

Confusing at first — got a working solution but it was messy. Struggled with Set API (no `.push`, no indexing), and couldn't think of a clean loop structure upfront. Once the digit-extraction trick (`% 10` / `Math.floor`) landed, it clicked fast. The clean final version felt much more readable than the first attempt.

---

## Key Insight

**Cycle detection = repeated value.** If a process loops forever, it must eventually land on a number it's already seen. Track every intermediate result in a Set. The moment you see a repeat, you know you're in a cycle — return `false`. If you reach 1, return `true`.

**Extracting digits without strings:** `n % 10` gives the last digit. `Math.floor(n / 10)` removes it. Repeat while `n > 0`. This is faster than `String()` conversion because it avoids allocating a string object on every iteration.

---

## Solution Walkthrough

### Solution 1 — String conversion (first attempt, 21st percentile)

So the first attempt worked, but was messy. The core idea was right: keep a running sum, check for cycles. But the execution had issues worth understanding.

The digit iteration used `String()` conversion and then a for loop over characters. This works — `String(82)` gives `"82"`, and you can index into it with `[0]` and `[1]`. But the bug that appeared was `=` instead of `+=` in the accumulator — the sum was being reset to the last digit's square, not accumulated. Caught once you looked at the line.

The bigger structural issue: the array approach (keeping all seen values in an array) was the right instinct, but using `.includes()` to check membership is O(n) per check. Fine for this problem since the Set is bounded anyway, but it's a red flag in general.

```js
function isHappy(n) {
    const valuesToBeSquared = [n];
    let currentSquaredValue = n;
    while (currentSquaredValue !== 1) {
        const currentNumberToBeSquared = String(valuesToBeSquared[valuesToBeSquared.length - 1]);
        let runningSquaredSum = 0;
        for (let i = 0; i < currentNumberToBeSquared.length; i++) {
            runningSquaredSum += Number(currentNumberToBeSquared[i]) * Number(currentNumberToBeSquared[i]);
        }
        if (valuesToBeSquared.includes(runningSquaredSum)) return false;
        valuesToBeSquared.push(runningSquaredSum);
        currentSquaredValue = runningSquaredSum;
    }
    return true;
}
```

Submitted — **accepted, 21st percentile (3ms).** Correct but slow due to String allocation on every step.

---

### Solution 2 — Helper function with `% 10` / `Math.floor` (second submission, 100th percentile)

The upgrade: extract digits using pure maths instead of string conversion, and use a Set instead of an array for O(1) membership checks.

**`sumOfSquares` helper:**
```js
function sumOfSquares(n) {
    let squaredSum = 0;
    while (n > 0) {
        const digit = n % 10;        // last digit
        squaredSum += digit * digit;
        n = Math.floor(n / 10);      // chop last digit
    }
    return squaredSum;
}
```

`123 % 10` → `3`. `Math.floor(123 / 10)` → `12`. Next: `12 % 10` → `2`, `Math.floor(12 / 10)` → `1`. Next: `1 % 10` → `1`, `Math.floor(1 / 10)` → `0`. Loop ends.

The main function: add `n` to Set upfront, compute next value, check before adding.

```js
function isHappy(n) {
    function sumOfSquares(n) {
        let squaredSum = 0;
        while (n > 0) {
            const digit = n % 10;
            squaredSum += digit * digit;
            n = Math.floor(n / 10);
        }
        return squaredSum;
    }

    const numbersToBeSquared = new Set([n]);
    let currentNumberToBeSquared = n;
    while (currentNumberToBeSquared !== 1) {
        const number = sumOfSquares(currentNumberToBeSquared);
        if (numbersToBeSquared.has(number)) return false;
        numbersToBeSquared.add(number);
        currentNumberToBeSquared = number;
    }
    return true;
}
```

Submitted — **accepted, 100th percentile (0ms).**

---

### Solution 3 — Cleaner variable naming and structure (reference version)

Same logic as Solution 2, but with shorter names and a slightly cleaner loop shape. The key difference: start with an empty Set and check before adding — this way the Set only ever holds values you've committed to processing, and the check-before-add ordering reads naturally.

```js
function isHappy(n) {
    function sumOfSquares(n) {
        let sum = 0;
        while (n > 0) {
            const digit = n % 10;
            sum += digit * digit;
            n = Math.floor(n / 10);
        }
        return sum;
    }

    const seen = new Set();
    while (n !== 1) {
        if (seen.has(n)) return false;
        seen.add(n);
        n = sumOfSquares(n);
    }
    return true;
}
```

Notice how starting with an empty Set and checking `n` before transforming it makes the flow more natural: "have I seen this before? No → add it → transform it → repeat." Everything lives in one variable `n` — no separate `currentNumberToBeSquared`.

---

## Pattern Introduced

**Cycle Detection via Hash Set** — when a transformation function might loop forever, track every intermediate state in a Set. First repeat = you're in a cycle. Works for any deterministic function where the state space is bounded.

**Digit Extraction via Modulo** — to iterate over the digits of an integer without converting to a string:
```js
while (n > 0) {
    const digit = n % 10;       // last digit
    // do something with digit
    n = Math.floor(n / 10);     // remove last digit
}
```

---

## Watch Out For

- `new Set(n)` where `n` is a number — this **throws**. `new Set` takes an iterable. Use `new Set([n])` to initialise with one value, or `new Set()` to start empty.
- Sets have no `.push()` — use `.add()`. Sets have no `.length` — use `.size`. Sets have no index access.
- `=` vs `+=` inside an accumulation loop — the sum resets to the last value instead of accumulating.

---

## Template

```js
function isHappy(n) {
    function sumOfSquares(n) {
        let sum = 0;
        while (n > 0) {
            const digit = n % 10;
            sum += digit * digit;
            n = Math.floor(n / 10);
        }
        return sum;
    }

    const seen = new Set();
    while (n !== 1) {
        if (seen.has(n)) return false;
        seen.add(n);
        n = sumOfSquares(n);
    }
    return true;
}
```

---

## Trace Through

`n = 19`:
- seen: {} → check 19, not seen → add 19 → sumOfSquares(19) = 1²+9² = 1+81 = 82 → n=82
- seen: {19} → check 82, not seen → add 82 → sumOfSquares(82) = 64+4 = 68 → n=68
- seen: {19,82} → check 68 → add → 36+64 = 100 → n=100
- seen: {19,82,68} → check 100 → add → 1+0+0 = 1 → n=1
- while condition: n===1 → exit → return true ✓

`n = 2`:
- 2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 → **4 already in seen → return false** ✓

---

## Complexity

- **Time: O(log n)** — the first call to `sumOfSquares` processes log₁₀(n) digits. After one or two iterations, any number collapses to ≤243 (worst case: 3 nines = 3×81 = 243). All subsequent calls are O(1). Total: O(log n) for the first step, O(1) per step after, bounded constant number of total steps.
- **Space: O(1)** — the Set is bounded by ~243 entries. All non-happy numbers cycle through a fixed set of values below 243. Regardless of n, the Set never grows beyond a constant size.

If you use Floyd's Cycle Detection (fast/slow pointers) instead of a Set, space drops to O(1) with no Set at all — but the logic is more complex. The Set approach is the standard interview answer.

---

## Submissions

- Solution 1 (String conversion): https://leetcode.com/problems/happy-number/submissions/2033792978
- Solution 2 (% 10 / Math.floor): https://leetcode.com/problems/happy-number/submissions/2033922749

---

## Open Questions

- Floyd's Cycle Detection (fast/slow pointers): same O(log n) time, O(1) space without a Set. Fast pointer calls `sumOfSquares` twice per step. When fast===slow, you're in a cycle. When fast===1, it's happy. Worth understanding as a follow-up.
