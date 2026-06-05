# Learnings — Pascal's Triangle II (LeetCode 119)

## Key Insight
Updating an array left-to-right overwrites values you still need. Iterating right-to-left reads the old value before overwriting it — so you can update in-place safely.

## Solution Walkthrough

The problem: given a row index, return just that row of Pascal's Triangle — not the whole triangle. The constraint is O(n) space, which means you can't build all the rows and return the last one.

**What Pascal's Triangle looks like**

```
Row 0:    [1]
Row 1:   [1, 1]
Row 2:  [1, 2, 1]
Row 3: [1, 3, 3, 1]
```

Every row starts and ends with 1. Each middle value is the sum of the two values directly above it — the element at the same position and the one to its left in the previous row.

**The naive approach**

Build the entire triangle row by row, return the last row. This works but uses O(n²) space — you're storing every row. The problem asks for O(n).

**The key insight: update in-place**

What if you reused a single array and updated it row by row? You start with `[1]` and keep transforming it until you reach the target row.

The problem is: to compute `row[j] = row[j] + row[j-1]`, you need the old value of `row[j]` (from the previous row). If you update left to right, by the time you compute `row[j]`, you've already overwritten `row[j-1]` with its new value — the old value is gone. Your computation is wrong.

Take row 2 → row 3. Row 2 is `[1, 2, 1]`. Push a 1 to get `[1, 2, 1, 1]`. Now update:
- Left to right: `row[1] = row[1] + row[0] = 2 + 1 = 3` → array is now `[1, 3, 1, 1]`. Then `row[2] = row[2] + row[1] = 1 + 3 = 4` — wrong, should be `1 + 2 = 3`. We used the already-updated `row[1]` instead of the old one.
- Right to left: `row[2] = row[2] + row[1] = 1 + 2 = 3` → array is `[1, 2, 3, 1]`. Then `row[1] = row[1] + row[0] = 2 + 1 = 3` → `[1, 3, 3, 1]`. Correct. When we update `row[j]`, `row[j-1]` hasn't been touched yet — it still holds its old value.

Right-to-left update reads the old value before it gets overwritten. That's the whole trick.

**Walking through the code**

```js
const row = []
for (let i = 0; i <= rowIndex; i++) {
    row.push(1)
    for (let j = row.length - 2; j >= 1; j--) {
        row[j] = row[j] + row[j - 1]
    }
}
return row
```

The outer loop runs once per row, from row 0 up to the target row. Each iteration:

1. Push a `1` — this is always the new last element of the row (rows always end in 1).
2. Update middle values right to left, starting at `row.length - 2`. We skip the last element (`row.length - 1`) because we just pushed it as a `1` and it should stay `1`. We stop at index 1 — index 0 is always `1` (rows always start with 1) and never needs updating.

Let's trace row 0 → row 3 step by step:

- `i=0`: push 1 → `[1]`. Inner loop doesn't run (no middle elements).
- `i=1`: push 1 → `[1, 1]`. Inner loop: `j` starts at 0, which is not `>= 1`, so it doesn't run.
- `i=2`: push 1 → `[1, 1, 1]`. Inner loop: `j=1` → `row[1] = row[1] + row[0] = 1 + 1 = 2` → `[1, 2, 1]`.
- `i=3`: push 1 → `[1, 2, 1, 1]`. Inner loop: `j=2` → `row[2] = 1 + 2 = 3` → `[1, 2, 3, 1]`. `j=1` → `row[1] = 2 + 1 = 3` → `[1, 3, 3, 1]`. Done.

**Why this matters beyond Pascal's Triangle**

The right-to-left in-place update pattern shows up in several DP problems — 0/1 Knapsack, Coin Change, Edit Distance. The reason is the same every time: you need the previous row's values while computing the current row's values, and updating right-to-left lets you use one array instead of two.

---

## Pattern Introduced
**Right-to-left in-place update** — grow the array by one, then update middle values from right to left.

This pattern recurs in: 0/1 Knapsack, Edit Distance, Coin Change.

## Watch Out For
- Start the inner loop at `row.length - 2`, not `row.length - 1`. The last element (just pushed) is always `1` and must never be updated.
- Push the `1` **before** the inner loop, not after.

## Template
```js
const row = []
for (let i = 0; i <= rowIndex; i++) {
    row.push(1)                              // grow the row
    for (let j = row.length - 2; j >= 1; j--) {
        row[j] = row[j] + row[j - 1]        // update right-to-left
    }
}
return row
```

## Complexity

**Naive (full triangle)**
Time: O(n²) — you build every row from 0 to n, and each row i has i+1 elements to compute. Total work: 1 + 2 + 3 + ... + n = n(n+1)/2 = O(n²).
Space: O(n²) — you store all rows simultaneously.

**Optimised (in-place)**
Time: O(n²) — same number of additions as the naive approach. You still compute every value in every row up to the target; you just don't keep old rows around. The time doesn't change, only the space.
Space: O(n) — you maintain a single array that grows to length n+1 (the target row). No other rows are stored.

## Open Questions
- None
