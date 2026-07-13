# LC 1672 — Richest Customer Wealth

Session: [058_2026-07-14](../../../safwaan/sessions/058_2026-07-14_richest-customer-wealth.md)

## How It Felt

Felt easy — one pass, sum each row, track the max.

## Key Insight

Each row of `accounts` is one customer's bank balances. "Wealth" is just the sum of a row. So: sum every row, keep the largest sum seen. No need to store anything beyond the running max.

## Solution Walkthrough

For every customer (`row`), add up all their bank balances (`col`) into a local `sum`. Once that row's `sum` is complete, compare it against `maxWealth` seen so far and keep the larger one — that's exactly what `Math.max` is for here, no `if/else` needed. Move to the next row, reset `sum` to `0`, repeat. After every row's been summed once, `maxWealth` holds the answer.

## Pattern Introduced

**Matrix — Row Sum Tracking.** Nested loop over a 2D array where the inner loop reduces a row to a single number, and the outer loop tracks a running best (max/min/sum) across those per-row results. Simplest possible matrix traversal shape — no boundary conditions, no diagonal/spiral movement, just row-by-row reduction.

## Watch Out For

Nothing this session — clean, no bugs, no hints needed.

## Template

```js
function maximumWealth(accounts) {
  let maxWealth = 0;
  for (let row = 0; row < accounts.length; row++) {
    let sum = 0;
    for (let col = 0; col < accounts[row].length; col++) {
      sum += accounts[row][col];
    }
    maxWealth = Math.max(maxWealth, sum);
  }
  return maxWealth;
}
```

## Trace Through

`accounts = [[1,2,3],[3,2,1]]` — row 0: sum = 1+2+3 = 6, maxWealth = 6. Row 1: sum = 3+2+1 = 6, maxWealth stays 6. Returns 6.

## Complexity

**Time: O(rows × cols)** — every cell in the matrix is visited exactly once.
**Space: O(1)** — only `sum` and `maxWealth` are tracked, no extra structures.

## Submissions

https://leetcode.com/problems/richest-customer-wealth/submissions/2066550831

## Open Questions

None — straightforward solve.
