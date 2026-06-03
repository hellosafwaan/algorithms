# Learnings — Pascal's Triangle (LeetCode 118)

## Key Insight
Creating a new array in the parent (`triangle[i] = [1]`) is a completely different operation from setting one element (`triangle[i][j] = 1`). The first wipes the row. The second updates a single cell.

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
Time: O(n²) — total cells = n(n+1)/2
Space: O(n²) — storing the full triangle

## Open Questions
- None
