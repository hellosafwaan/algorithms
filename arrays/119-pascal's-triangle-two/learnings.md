# Learnings — Pascal's Triangle II (LeetCode 119)

## Key Insight
Updating an array left-to-right overwrites values you still need. Iterating right-to-left reads the old value before overwriting it — so you can update in-place safely.

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
| Approach | Time | Space |
|----------|------|-------|
| Naive (full triangle) | O(n²) | O(n²) |
| Optimised (in-place) | O(n²) | O(n) |

## Open Questions
- None
