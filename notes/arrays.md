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

---

## Next Permutation (LeetCode 31)

**Pattern:** Pivot finding + swap + two-pointer reverse

**Core observation:** The suffix to the right of the pivot is always descending — meaning all permutations for that prefix are exhausted. The pivot is the rightmost element that can still go higher.

**Algorithm:**
1. Scan right to left — find pivot: rightmost `i` where `nums[i] < nums[i+1]`
2. Scan right to left — find swap candidate: rightmost `j` where `nums[j] > nums[i]`
3. Swap `nums[i]` and `nums[j]`
4. Reverse the subarray from `i+1` to end (it's descending, reversing makes it ascending)

**Edge case:** If no pivot found (fully descending array), reverse the whole array.

**Template:**
```js
var nextPermutation = function(nums) {
    const n = nums.length
    let pivotFound = false
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivotFound = true
            for (let j = n - 1; j > i; j--) {
                if (nums[j] > nums[i]) {
                    const temp = nums[i]
                    nums[i] = nums[j]
                    nums[j] = temp
                    break
                }
            }
            let left = i + 1, right = n - 1
            while (left < right) {
                const temp = nums[left]
                nums[left] = nums[right]
                nums[right] = temp
                left++
                right--
            }
            break
        }
    }
    if (!pivotFound) {
        let left = 0, right = n - 1
        while (left < right) {
            const temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
            left++
            right--
        }
    }
}
```

**Complexity:**
| | Time | Space |
|--|------|-------|
| Approach | O(n) | O(1) |

**Why O(n) not O(n²):** The outer and inner loops don't both run n times together — the outer loop breaks as soon as it finds the pivot. All three passes (outer loop, inner loop, reverse) are sequential, each O(n) in the worst case.

**Watch out for:**
- Loop starts at `n-2`, not `n-1` — accessing `nums[i+1]` would be out of bounds at `n-1`
- `break` after the swap in the inner loop — you only want the rightmost candidate
- `break` after the reverse in the outer loop — you only process one pivot
- Flag needed to distinguish "pivot found" from "no pivot" for the edge case
