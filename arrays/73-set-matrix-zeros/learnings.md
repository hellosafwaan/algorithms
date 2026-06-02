# 73. Set Matrix Zeroes

## Problem
Given an m x n matrix, if any element is 0, set its entire row and column to 0. Do it in-place.

---

## Approach 1 — Naive (store all zero positions)

Collect every `[i, j]` position where the value is 0 in a `zeroIndexes` array. Then loop through that array and zero out the corresponding row and column.

**Why it's flawed:** If you zero out rows/columns immediately while scanning, new zeros corrupt the original data — you can't tell an original zero from one you wrote. Storing positions first solves this.

**Time:** O(m × n × (m + n)) — for each zero found (up to m×n), you do O(m+n) work  
**Space:** O(m × n) — worst case every element is 0

---

## Approach 2 — Better (two Sets)

Instead of storing every `[i, j]` pair, store just which rows and which columns need zeroing in two Sets. Second pass: for every cell, if its row or column is in the sets, set it to 0.

**Key insight:** You don't need the exact position of each zero — just which rows and columns are affected.

**Time:** O(m × n)  
**Space:** O(m + n)

---

## Approach 3 — Optimal (O(1) space)

Use the first row and first column of the matrix itself as markers instead of external Sets.

**Steps:**
1. Check if the first row or first column originally contain any zeros — save this in `firstRowHasZero` and `firstColumnHasZero` booleans
2. Scan the rest of the matrix (from i=1, j=1). If `matrix[i][j] === 0`, mark `matrix[i][0] = 0` and `matrix[0][j] = 0`
3. Use those markers to zero out the rest of the matrix (again from i=1, j=1)
4. Finally, use the booleans to zero out the first row and column if needed

**Why save the booleans first:** The first row/column get used as markers, so their values get overwritten. You need to know their original state before you touch them.

**Why handle the first row/column last:** If you zero them out earlier, you corrupt your own markers.

**Time:** O(m × n)  
**Space:** O(1)

---

## Mistakes Made
- Used `matrix[m][n]` instead of `matrix[i][j]` in the loop condition — `m` and `n` are the dimensions, not the current index
- Used `===` (comparison) instead of `=` (assignment) when writing markers
- Initial complexity estimate for time was O(n²) — missed that the second pass outer loop runs up to m×n times, making it O(m×n×(m+n))
- Initial complexity estimate for space was O(n) — missed that worst case stores m×n pairs

---

## Key Insights
- Two-pass pattern: collect information first, modify second — avoids corrupting data mid-scan
- You can reduce space by storing less: instead of exact positions, just row/column membership
- You can eliminate extra space entirely by borrowing part of the matrix itself as storage — but you must save the state of those cells before using them as markers
- `matrix[0][0]` is ambiguous — it sits at the intersection of the first row and first column, so two separate booleans are needed to handle that corner case
