# Learnings — Pascal's Triangle (LeetCode 118)

## Key Insight
Creating a new array in the parent (`triangle[i] = [1]`) is a completely different operation from setting one element (`triangle[i][j] = 1`). The first wipes the row. The second updates a single cell.

## Solution Walkthrough

So we're asked to build Pascal's Triangle up to `numRows` rows and return the whole thing. Let's first make sure we're clear on what we're building:

```
[
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1]
]
```

Two things are always true. First and last element of every row is always `1`. Every middle element is the sum of the two elements directly above it — the one at the same column and the one to its left in the previous row: `triangle[i-1][j-1] + triangle[i-1][j]`.

**Building it row by row**

The structure is straightforward — two nested loops. Outer loop runs once per row. Inner loop fills each cell in that row. Row `i` has exactly `i+1` cells, so the inner loop runs from `j = 0` to `j = i`.

For each cell, one of three things is true:

- `j === 0` — first cell, always 1. This is also where we initialise the row: `triangle[i] = [1]`.
- `j === i` — last cell, always 1. Set it with `triangle[i][j] = 1`.
- Anything in between — compute from the previous row: `triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]`.

**The subtle bug: `triangle[i] = [1]` vs `triangle[i][j] = 1`**

These look almost identical but do completely different things — and mixing them up breaks everything.

`triangle[i] = [1]` replaces the entire row with a brand new array containing just one element. Everything you've already written into that row is gone.

`triangle[i][j] = 1` sets one specific cell. The rest of the row is untouched.

So when you're handling `j === 0` — the very first cell — you haven't built anything yet, so `triangle[i] = [1]` is correct. You're starting the row fresh.

But when you're handling `j === i` — the last cell — the row already has values in it from the middle cells you just computed. If you wrote `triangle[i] = [1]` there instead of `triangle[i][j] = 1`, you'd wipe the entire row and replace it with just `[1]`. Every row in your triangle would end up as `[1]`. The bug is silent — the code runs without errors, the output is just completely wrong.

**Tracing row 3**

Previous row (row 2): `[1, 2, 1]`

- `j=0`: initialise → `triangle[3] = [1]`
- `j=1`: middle → `triangle[2][0] + triangle[2][1] = 1 + 2 = 3` → row is `[1, 3]`
- `j=2`: middle → `triangle[2][1] + triangle[2][2] = 2 + 1 = 3` → row is `[1, 3, 3]`
- `j=3`: last cell → `triangle[3][3] = 1` → row is `[1, 3, 3, 1]` ✓

---

## Pattern Introduced
**2D array row-by-row construction** — build each row using values from the previous row.

```
triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
```

Edge cases: first and last element of every row are always `1`.

## Watch Out For
`triangle[i] = [1]` in the last-element branch resets the whole row you just built. Split the first-element case (initialise row) and last-element case (set one cell) into separate branches.

## Template
```js
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j <= i; j++) {
        if (j === 0) {
            triangle[i] = [1]          // initialise row
        } else if (j === i) {
            triangle[i][j] = 1         // set last cell
        } else {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
        }
    }
}
```

## Complexity

**Time: O(n²)**
Row 0 has 1 cell, row 1 has 2, row 2 has 3, and so on. Total cells = 1 + 2 + 3 + ... + n = n(n+1)/2. Each cell is computed in constant time. That's O(n²).

**Space: O(n²)**
We store the entire triangle — every row, every cell. Same count as above: n(n+1)/2 cells total. O(n²). Unlike Pascal's Triangle II, there's no way around this — the problem asks you to return the whole thing.

## Open Questions
- None
