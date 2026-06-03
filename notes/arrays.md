# Arrays — Patterns & Templates

## Pascal's Triangle (LeetCode 118)

**Pattern:** 2D array construction, row-by-row

**Core relationship:**
```
triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
```

**Edge cases:**
- `j === 0` → first element, always 1, initialises the row
- `j === i` → last element, always 1, sets one cell (row already exists)

**Template:**
```js
function generate(numRows) {
    const triangle = []
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 0) {
                triangle[i] = [1]
            } else if (j === i) {
                triangle[i][j] = 1
            } else {
                triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
            }
        }
    }
    return triangle
}
```

**Complexity:**
| | Time | Space |
|--|------|-------|
| Approach | O(n²) | O(n²) |

**Why O(n²):** Total cells = 1 + 2 + ... + n = n(n+1)/2

**Watch out for:** `triangle[i] = [1]` resets the whole row. Use `triangle[i][j] = 1` to set a single cell when the row already exists.

---

## Pascal's Triangle II (LeetCode 119)

**Pattern:** In-place row update with right-to-left iteration

**Core idea:** Maintain a single array. Each iteration: push `1` to grow the row, then update middle values right-to-left.

**Why right-to-left:** Updating left-to-right overwrites values still needed for subsequent calculations. Right-to-left reads the old value before overwriting it.

**Template:**
```js
function getRow(rowIndex) {
    const row = []
    for (let i = 0; i <= rowIndex; i++) {
        row.push(1)
        for (let j = row.length - 2; j >= 1; j--) {
            row[j] = row[j] + row[j - 1]
        }
    }
    return row
}
```

**Complexity:**
| | Time | Space |
|--|------|-------|
| Naive (full triangle) | O(n²) | O(n²) |
| Optimised (in-place) | O(n²) | O(n) |

**Watch out for:**
- Start inner loop at `row.length - 2`, not `row.length - 1` — the last element (just pushed) is always `1` and must not be updated
- This right-to-left in-place pattern recurs in: 0/1 Knapsack, Edit Distance, Coin Change
