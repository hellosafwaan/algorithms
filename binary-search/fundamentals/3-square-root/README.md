# Square Root

## Problem

Write a function that takes in a nonnegative integer `x` as input. The function should return the square root of `x` rounded down to the nearest integer.

You may not use built-in methods like `Math.sqrt` or `Math.pow` that trivialize this problem.

Your solution should have a time complexity of O(log n).

### Examples

```
Input: x = 16
Output: 4     // 4 * 4 = 16, exact

Input: x = 83
Output: 9     // 9 * 9 = 81 <= 83 < 100 = 10 * 10

Input: x = 15
Output: 3     // floor(sqrt(15)) ≈ floor(3.87) = 3
```

## Approach

There's no array to search here, but binary search doesn't actually require one — it just requires a monotonic condition over a range of candidate answers. Squares of increasing non-negative integers are themselves increasing, so we can binary search over the range `[0, x]`, treating each candidate integer as a "midpoint" and comparing its square to `x`.

Set `left = 0`, `right = x` (the true root is always `<= x` for `x >= 1`). Each step:

1. `mid = Math.floor((left + right) / 2)`.
2. Compare `mid * mid` to `x`:
   - `mid * mid > x` → `mid` is too big → `right = mid - 1`.
   - `mid * mid < x` → `mid` is too small → `left = mid + 1`.
   - Equal → `x` is a perfect square, return `mid`.

When `x` isn't a perfect square, the loop exits (`left` crosses `right`) without ever hitting the equal case. At that moment, `right` is sitting on the *largest* integer whose square is still `<= x` — exactly the floor of the square root. `left` has been pushed one step further, onto the first integer whose square overshoots `x`. Since we want the answer rounded down, return `right`, not `left`.

(Contrast with [Binary Search Index](../2-binary-search-index/README.md), which returns `low`/`start` to round *up* — same crossed-pointer moment, opposite pointer, because that problem wants the next-largest valid slot instead of the largest-still-valid one.)

## Solution

```js
function mySqrt(x) {
    let left = 0;
    let right = x;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (mid * mid > x) right = mid - 1;
        else if (mid * mid < x) left = mid + 1;
        else return mid;
    }
    return right;
}
```

## Complexity

**Time:** O(log n) — same halving search, over the range `[0, x]` instead of an array.
**Space:** O(1) — only `left`, `right`, and `mid`.
