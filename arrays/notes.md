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

---

## Merge Sorted Array (LeetCode 88)

**Pattern:** Two pointers — fill backwards (three pointers)

**Core idea:** Pre-allocate the result space in-place. Start both pointers at the last real element of each array, fill from the right using a third `currentIndex` pointer. The fill pointer always stays ahead of `nums1Pointer` — you never overwrite a value before it's been placed.

**Loop condition:** `while (nums2Pointer >= 0)` only. If `nums2` is exhausted, remaining `nums1` elements are already sorted and in position. If `nums1` is exhausted first, `nums1[-1]` returns `undefined` in JS, which fails the `>=` check, so the else branch keeps copying `nums2` elements automatically.

**Template:**
```js
function merge(nums1, m, nums2, n) {
    let p1 = m - 1
    let p2 = n - 1
    let ci = m + n - 1

    while (p2 >= 0) {
        if (nums1[p1] >= nums2[p2]) {
            nums1[ci--] = nums1[p1--]
        } else {
            nums1[ci--] = nums2[p2--]
        }
    }
}
```

**Complexity:**
| | Time | Space |
|--|------|-------|
| In-place | O(m+n) | O(1) |
| New array | O(m+n) | O(m+n) |

**Same shape as:** LC 977 (Squares of Sorted Array) — fill largest first, backwards into pre-allocated space.

---

## Remove Element (LeetCode 27)

**Pattern:** Two pointers — same direction (read/write), or converging (swap to back)

## Remove Duplicates from Sorted Array (LeetCode 26)

**Pattern:** Two pointers — read/write (same direction)

**Same shape as LC 27.** p2 reads every element; p1 only advances on a write. Write condition: `nums[p2] !== nums[p1]`. Return `p1 + 1`.

**Why the sorted property matters:** Duplicates are always adjacent — so you never need to search backward. A single left-to-right pass is enough.

```js
let p1 = 0, p2 = 0;
while (p2 < nums.length) {
    if (nums[p2] !== nums[p1]) {
        p1++;
        nums[p1] = nums[p2];
    }
    p2++;
}
return p1 + 1;
```

**Complexity:** O(n) time, O(1) space

---

### Read/Write (simpler — default to this)

**Core idea:** One pointer reads every element; the other only advances when you write a valid element to it. The write pointer's final position equals the number of valid elements.

**Why overwriting is safe:** The write pointer can never get ahead of the read pointer, so by the time you write to position `p1`, the read pointer has already read it and moved on.

```js
let p1 = 0;
for (let p2 = 0; p2 < nums.length; p2++) {
    if (nums[p2] !== target) {
        nums[p1++] = nums[p2];
    }
}
return p1;
```

### Swap to Back (fewer writes — use when writes are expensive)

**Core idea:** p1 scans left for targets; swappableIndex scans right for valid elements. When they meet, swap target out. Stop when the pointers cross.

**Termination:** `swappableIndex <= p1` — not `swappableIndex === 0`. Pointers crossing mid-array is the signal to stop.

**Return value:** `p1`, not `n - swaps`. p1 is the exact count of valid elements in the first p1 positions.

```js
let p1 = 0, swappableIndex = nums.length - 1;
while (p1 <= swappableIndex) {
    if (nums[p1] === target) {
        while (nums[swappableIndex] === target && swappableIndex > 0) swappableIndex--;
        if (swappableIndex <= p1) break;
        [nums[p1], nums[swappableIndex]] = [nums[swappableIndex], nums[p1]];
    }
    p1++;
}
return p1;
```

**Complexity (both):**
| | Time | Space |
|--|------|-------|
| Read/Write | O(n) | O(1) |
| Swap to back | O(n) | O(1) |

---

## Remove Duplicates from Sorted Array II (LeetCode 80)

**Pattern:** Two pointers — read/write with look-back condition

**Generalizes LC 26.** Same read/write shape, but write condition checks two positions back.

**Write condition:** Skip when `nums[p1 - 1] === val && nums[p1 - 2] === val` — you've already written 2 copies.  
**Bootstrap:** Always write when `p1 < 2` (can't have 2 copies yet).  
**Return:** `p1` (next-to-write position = count of valid elements).

**Watch out for:** The instinct to track occurrence counts per group and write on transition. This approach writes values only when you see the next group — so the last element of each group is always missed. Think per-element, not per-group.

**Generalization:** Allow at most k duplicates → skip when `nums[p2] === nums[p1 - k]`.

```js
function removeDuplicates(nums) {
    let p1 = 0, p2 = 0;
    while (p2 < nums.length) {
        const val = nums[p2];
        if (p1 < 2 || !(nums[p1 - 1] === val && nums[p1 - 2] === val)) {
            nums[p1++] = val;
        }
        p2++;
    }
    return p1;
}
```

**Complexity:** O(n) time, O(1) space

---

## Majority Element (LeetCode 169)

**Pattern:** HashMap counting OR Boyer-Moore Voting

**Threshold:** `> n/2` — JS float division handles odd and even automatically.

**HashMap approach** (O(n) time, O(n) space):
Count occurrences in one pass, find first key above threshold. Remember: `for...in` keys are strings → `Number(key)`.

**Boyer-Moore Voting** (O(n) time, O(1) space):
Track one candidate and one count. Match → increment. Mismatch → decrement. Count hits 0 → new candidate is current element. Works because majority > n/2: it survives all cancellations.

```js
let candidate = nums[0], count = 1
for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) count++
    else if (count > 0) count--
    else { candidate = nums[i]; count = 1 }
}
return candidate
```

**Prerequisite:** Majority element must be guaranteed to exist. Without guarantee, add a second verification pass.

---

## 3Sum (LeetCode 15)

**Pattern:** Two pointers *inside* a loop — k-sum reduction

**Core idea:** Sort the array. Fix one element `nums[i]`, then run a converging two-pointer search on the rest for a pair summing to `-nums[i]`. This reduces "find 3 numbers" to "fix 1, two-sum the other 2" — O(n³) → O(n²).

**Why sorting earns its keep twice:**
1. Two-pointer movement becomes deterministic (sum too big → `right--`, too small → `left++`).
2. Duplicate values become adjacent → duplicate triplets can be skipped **in place**, with no Set and no string-conversion dedup pass.

**Template:**
```js
function threeSum(nums) {
    nums.sort((a, b) => a - b)
    const n = nums.length
    const result = []
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) break                          // sorted: smallest positive → done
        if (i > 0 && nums[i] === nums[i - 1]) continue  // skip duplicate i
        let left = i + 1, right = n - 1
        const target = -nums[i]
        while (left < right) {
            const sum = nums[left] + nums[right]
            if (sum > target) right--
            else if (sum < target) left++
            else {
                result.push([nums[i], nums[left], nums[right]])
                left++; right--
                while (left < right && nums[left] === nums[left - 1]) left++
                while (left < right && nums[right] === nums[right + 1]) right--
            }
        }
    }
    return result
}
```

**Complexity:**
| | Time | Space |
|--|------|-------|
| Brute force (3 loops + Set) | O(n³) | O(n) |
| Two pointers, no Set | O(n²) | O(1) extra |

**Why O(n²):** Sort is O(n log n). Outer loop n times × inner two-pointer O(n) = O(n²), which dominates.

**Watch out for:**
- Don't `break`/stop at the first match — keep searching for more pairs for the same `i`; move *both* pointers inward.
- Skip duplicates with `while`, not `if` — consecutive equal values need draining.
- Neighbor direction after moving: `left` checks `left - 1`, `right` checks `right + 1`. (Trace it — easy to flip.)
- A Set + string dedup works but is slow (5th pct). Sorting makes dedup free.
- This shape generalizes: 4Sum = fix two elements, two-pointer the rest.
