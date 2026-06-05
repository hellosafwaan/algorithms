Session: [013_2026-06-05_merge-sorted-array.md](../../safwaan/sessions/013_2026-06-05_merge-sorted-array.md)

# LC 88 — Merge Sorted Array

## How It Felt

Confusing at the start — the problem says `m` is the number of elements in `nums1`, but `nums1` has length `m+n`. That contradiction threw me off for a while. Once I understood the zeros were just placeholders (pre-allocated space for the merge result), the rest came quickly. I immediately connected to the LC 977 "fill backwards" pattern and the three-pointer setup felt natural. Code had a few careless bugs but I caught all of them tracing through.

## Key Insight

You can merge in-place by filling from the right. Both arrays are sorted, so the largest values are at the ends. Use three pointers: `nums1Pointer` at the last real element of `nums1`, `nums2Pointer` at the last element of `nums2`, and `currentIndex` at the very end of `nums1` (`m+n-1`). Compare, place the larger value at `currentIndex`, move the pointer that gave you that value inward. Repeat until `nums2` is exhausted.

The critical insight: `currentIndex` always stays ahead of `nums1Pointer`. You can never overwrite a `nums1` value before you've placed it elsewhere.

## Solution Walkthrough

The problem gives you two sorted arrays. `nums1` is pre-sized to `m+n` — the first `m` slots hold real values, the last `n` slots are zeros (placeholders). Your job is to fill all `m+n` slots with the merged sorted result, in-place.

**Why not fill from the front?**

If you start from the left and try to merge normally, you'd have to shift elements right to make room each time you insert from `nums2`. That's O(n) work per insertion, O(n²) overall. The zeros at the end are the hint — they're the space you can write into without disturbing anything.

**The setup**

```js
let nums1Pointer = m - 1      // last real element of nums1
let nums2Pointer = n - 1      // last element of nums2
let currentIndex = m + n - 1  // last slot to fill
```

Start at the back of both arrays. You know the largest element overall must be either `nums1[m-1]` or `nums2[n-1]` — compare them, put the winner at `nums1[m+n-1]`, move that pointer inward.

**The loop**

```js
while (nums2Pointer >= 0) {
    const nums1PointerValue = nums1[nums1Pointer]
    const nums2PointerValue = nums2[nums2Pointer]

    if (nums1PointerValue >= nums2PointerValue) {
        nums1[currentIndex] = nums1PointerValue
        currentIndex--
        nums1Pointer--
    } else {
        nums1[currentIndex] = nums2PointerValue
        currentIndex--
        nums2Pointer--
    }
}
```

Each iteration: compare both current values, place the larger one, decrement `currentIndex`, move the pointer that "won."

**Why only loop while `nums2Pointer >= 0`?**

If `nums2` is exhausted, every element from `nums2` has been placed. Whatever's still in `nums1` is already in the right place — it's already sorted, already in `nums1`, nothing to move. But if `nums1` is exhausted first (`nums1Pointer < 0`), there may still be elements in `nums2` that need copying. That asymmetry is why `nums2Pointer >= 0` is the only condition that matters.

In JavaScript, `nums1[-1]` returns `undefined`, and `undefined >= anything` is `false` — so the else branch fires and copies the remaining `nums2` elements automatically, even without an explicit bounds check on `nums1Pointer`.

**Why you never overwrite a value you still need**

At any point: `currentIndex - nums1Pointer = n - nums2_elements_placed`. Since `nums2_elements_placed ≤ n`, this difference is always ≥ 0. `currentIndex` always stays at or ahead of `nums1Pointer`. You write into a slot only after you've already moved its original value (or the slot was a zero placeholder).

**Compared to the O(n) space version**

If you had two clean arrays (no placeholder zeros), you'd create a new result array, run the same two-pointer logic left-to-right, and push the smaller element each time. Same O(m+n) time, but O(m+n) space. The placeholder zeros are what make in-place possible — they give you room to write without allocating anything new.

---

## The O(m+n) Space Version

If the problem gave you two clean arrays — `nums1` of length `m` and `nums2` of length `n`, no placeholders — you wouldn't be able to merge in-place. You'd create a new result array and fill it from the right using the same two-pointer logic.

```js
function merge(nums1, nums2) {
    const m = nums1.length
    const n = nums2.length
    const result = new Array(m + n)
    let p1 = m - 1
    let p2 = n - 1
    let ci = m + n - 1

    while (p1 >= 0 || p2 >= 0) {
        const v1 = p1 >= 0 ? nums1[p1] : -Infinity
        const v2 = p2 >= 0 ? nums2[p2] : -Infinity
        if (v1 >= v2) {
            result[ci--] = v1
            p1--
        } else {
            result[ci--] = v2
            p2--
        }
    }

    return result
}
```

The loop condition changes: now you need **both** pointers to be exhausted, not just one. Neither array is already "in position" — every element needs to be placed. Same O(m+n) time, but O(m+n) space for the result array.

The in-place version is only possible because `nums1` is pre-sized to `m+n`. The placeholder zeros are literally the memory you'd otherwise allocate for `result`.

---

## Pattern

Two pointers — fill backwards. Same shape as LC 977 (Squares of a Sorted Array): know where the largest values are, fill from the right so you always write into safe space.

## Watch Out For

- Loop condition is `nums2Pointer >= 0` only — not both pointers
- `nums2[nums2Pointer]` not `nums1[nums2Pointer]` — easy typo
- Assign the **value** at the pointer, not the pointer index itself
- The placeholder zeros in `nums1` are not data — only the first `m` elements matter

## Template

```js
function merge(nums1, m, nums2, n) {
    let nums1Pointer = m - 1
    let nums2Pointer = n - 1
    let currentIndex = m + n - 1

    while (nums2Pointer >= 0) {
        const nums1PointerValue = nums1[nums1Pointer]
        const nums2PointerValue = nums2[nums2Pointer]

        if (nums1PointerValue >= nums2PointerValue) {
            nums1[currentIndex] = nums1PointerValue
            currentIndex--
            nums1Pointer--
        } else {
            nums1[currentIndex] = nums2PointerValue
            currentIndex--
            nums2Pointer--
        }
    }
}
```

## Trace Through

Input: `nums1 = [1, 2, 3, 0, 0, 0]`, `m = 3`, `nums2 = [2, 5, 6]`, `n = 3`

```
Initial: p1=2, p2=2, ci=5

Iter 1: nums1[2]=3 vs nums2[2]=6 → 6 wins → nums1[5]=6, ci=4, p2=1
  nums1 = [1, 2, 3, 0, 0, 6]

Iter 2: nums1[2]=3 vs nums2[1]=5 → 5 wins → nums1[4]=5, ci=3, p2=0
  nums1 = [1, 2, 3, 0, 5, 6]

Iter 3: nums1[2]=3 vs nums2[0]=2 → 3 wins → nums1[3]=3, ci=2, p1=1
  nums1 = [1, 2, 3, 3, 5, 6]

Iter 4: nums1[1]=2 vs nums2[0]=2 → tie → 2 placed → nums1[2]=2, ci=1, p1=0
  nums1 = [1, 2, 2, 3, 5, 6]

Iter 5: nums1[0]=1 vs nums2[0]=2 → 2 wins → nums1[1]=2, ci=0, p2=-1
  nums1 = [1, 2, 2, 3, 5, 6]

p2 = -1 → loop exits. nums1[0]=1 was already in place.

Result: [1, 2, 2, 3, 5, 6] ✓
```

## Complexity

- Time: O(m+n) — each pointer moves at most `m` or `n` steps; every element is placed exactly once
- Space: O(1) — no extra data structures; writing into pre-allocated slots in `nums1`

## Submissions

- https://leetcode.com/problems/merge-sorted-array/submissions/2023410509/ — 100th percentile runtime

## Open Questions

- Why can the fill pointer never overwrite a value still needed? (Revisit cold — understand the `currentIndex >= nums1Pointer` invariant without looking at the explanation above)
- What does the naive push+sort solution look like? (Deferred this session)
