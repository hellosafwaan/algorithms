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
