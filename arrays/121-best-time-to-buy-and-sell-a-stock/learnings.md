Session: [021 — 2026-06-13](../../safwaan/sessions/021_2026-06-13_best-time-to-buy-and-sell-stock.md)

## How It Felt

Brute force was straightforward. The optimal was conceptually clear but wouldn't translate to code until I traced through the example step by step — the abstraction alone wasn't enough to unlock the loop structure.

## Key Insight

Scan left to right. Track the cheapest price seen so far. At each day, compute profit if you sell today: `currentPrice - minPrice`. Keep the best you've seen. You never need to look ahead — you're always selling *today* against the best *past* price. By the time the loop ends, you've considered every valid buy/sell pair.

## Solution Walkthrough

So the core question is: what's the most profit you can make with one buy and one sell, in order?

The brute force answer: for every possible buy day, scan every day after it and find the best sell price. O(n²) — works, but does too much repeated scanning.

The key observation: you don't need to recompute from scratch on each buy day. As you scan forward, the cheapest price you've ever seen is always available as `minPrice`. If today's price is even cheaper, update `minPrice` — you'd rather buy today. If not, check whether selling today beats your best profit so far.

That's it. `minPrice` is updated greedily (always prefer the cheaper buy). `maxProfit` is updated whenever `currentPrice - minPrice` beats the best you've seen. Two running variables, one pass.

Why does this work? Because the optimal buy must come before the optimal sell. As you scan left to right, `minPrice` always holds the cheapest day you could have bought on *up to this point*. So at each day, `currentPrice - minPrice` is genuinely the best profit you could make if you had to sell today. You just keep the best of those across all days.

One edge case: if prices are strictly decreasing, `currentPrice - minPrice` is always 0 (you just updated `minPrice` to today's price). `maxProfit` stays at 0. That's correct — you'd choose not to trade.

## Pattern Introduced

**Running minimum with single pass.** This is the simplest flavor of sliding window thinking: instead of a true window, you just carry a running "best seen so far" variable (here, the minimum price) and combine it with the current value at each step. No window to explicitly resize — just two variables and one pass.

## Watch Out For

- Don't reach for `if/else` to compute a max or min — use `Math.max()` / `Math.min()`. It's the same logic, less noise.
- The brute force handles the decreasing-prices edge case naturally with `Math.max(0, ...)` — if the max selling price you find is still below the buy price, the profit is negative, so clamp to 0.
- The last day has no valid sell day after it — in brute force, the inner loop doesn't run, so `maxSellingPrice` stays at -1. You need the `i !== n-1` guard (or just clamp the profit to 0).

## Template

```js
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        const currentPrice = prices[i];
        if (currentPrice < minPrice) minPrice = currentPrice;
        const currentProfit = currentPrice - minPrice;
        if (currentProfit > maxProfit) maxProfit = currentProfit;
    }
    return maxProfit;
}
```

Or with `Math.max` / `Math.min`:

```js
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
```

## Trace Through

```
prices = [7, 1, 5, 3, 6, 4]
minPrice = Infinity, maxProfit = 0

i=0  price=7  7 < ∞ → minPrice=7   profit=7-7=0    0 > 0? no
i=1  price=1  1 < 7 → minPrice=1   profit=1-1=0    0 > 0? no
i=2  price=5  5 < 1? no            profit=5-1=4    4 > 0? yes → maxProfit=4
i=3  price=3  3 < 1? no            profit=3-1=2    2 > 4? no
i=4  price=6  6 < 1? no            profit=6-1=5    5 > 4? yes → maxProfit=5
i=5  price=4  4 < 1? no            profit=4-1=3    3 > 5? no

return 5 ✓  (buy day 1 at price 1, sell day 4 at price 6)
```

## Complexity

**Time: O(n)** — single pass through the array. Each element is visited once.

**Space: O(1)** — just two variables, no extra storage regardless of input size.

Compare to brute force: O(n²) time (inner scan for each buy day), O(n) space (the `maxProfits` array). The single-pass solution eliminates both the inner scan and the intermediate array.

## Submissions

- [80th percentile — accepted](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/submissions/2031922772) — 2026-06-13

## Open Questions

- None outstanding for this problem.
