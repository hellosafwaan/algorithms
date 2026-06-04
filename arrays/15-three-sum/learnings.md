Session: [012_2026-06-04_three-sum](../../safwaan/sessions/012_2026-06-04_three-sum.md)

---

## How It Felt

The first version of the optimized solution worked but beat only 5% of submissions. The outer for loop and two-pointer logic were ~90% correct. Where I slipped: once I found a triplet, I stopped iterating and moved `i` forward — I didn't keep searching for other pairs that hit the target for the same `i`. Then I was confused whether to move the pointers inward or outward after a match. Turns out you just keep moving inward — I've never seen a case where an inward pointer suddenly goes outward. I was overthinking a settled rule. I also forgot to reset the triplet between matches. And the final speedup — dropping the Set entirely and skipping duplicates in place — I understood the *what* but had to be shown the *why*, and then struggled with the skip logic.

---

## Key Insight

Sort the array first. Then fix one element `nums[i]` and run a **two-pointer search on the rest** for a pair summing to `-nums[i]`. That turns the inner two loops of the brute force into a single linear two-pointer pass — O(n³) becomes O(n²).

The payoff of sorting isn't just the two-pointer move. Because the array is sorted, **duplicate values sit next to each other**, so duplicate triplets can be skipped *in place* — no Set, no string conversion, no dedup pass. Skip a repeated `i` with `continue`; after a match, walk `left`/`right` past their repeats with a `while`.

> _Explanation in my own words — deferred (was tired). To be added next session before I re-read this file._

---

## Pattern Introduced

**Two pointers inside a loop (k-sum reduction)**

Fix one element, reduce the rest to a two-sum solved by converging pointers. This is the bridge from "two pointers on the whole array" to "two pointers as a *subroutine*." The same shape extends to 4Sum (fix two, two-pointer the rest).

```
sort
for each i:
    skip duplicate i
    left = i+1, right = n-1
    while left < right:
        sum too big  → right--
        sum too small → left++
        match → record, move BOTH in, skip duplicate left/right
```

---

## Watch Out For

- **Don't stop at the first match.** For a fixed `i` there can be several valid pairs. After recording, move *both* pointers inward and keep going — don't `break`.
- **Move inward, never outward.** Once a match is found, `left++` and `right--`. An inward pointer never needs to reverse.
- **Skip duplicates with `while`, not `if`.** Multiple equal values can sit in a row. A single `if` only skips one.
- **Neighbor direction:** after `left++`, the value you just used is at `left - 1` → skip if `nums[left] === nums[left - 1]`. After `right--`, the used value is at `right + 1` → skip if `nums[right] === nums[right + 1]`. (I flipped these in my head — trace it, don't reason it.)
- **Sort `nums` before the loop.** The whole approach depends on it.
- **No Set needed.** Sorting makes duplicates adjacent, so dedup is free. The Set + string-conversion version passes but is slow (5th percentile).

---

## Template

```js
function threeSum(nums) {
    nums.sort((a, b) => a - b)
    const n = nums.length
    const result = []

    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) break               // smallest is positive → no zero-sum triplet left
        if (i > 0 && nums[i] === nums[i - 1]) continue  // skip duplicate i

        let left = i + 1
        let right = n - 1
        const target = -nums[i]

        while (left < right) {
            const sum = nums[left] + nums[right]
            if (sum > target) {
                right--
            } else if (sum < target) {
                left++
            } else {
                result.push([nums[i], nums[left], nums[right]])
                left++
                right--
                while (left < right && nums[left] === nums[left - 1]) left++
                while (left < right && nums[right] === nums[right + 1]) right--
            }
        }
    }
    return result
}
```

`if (nums[i] > 0) break` is an extra early exit: the array is sorted, so once the fixed element is positive, the two larger elements can't sum back to zero. (Justify this to yourself — it's worth understanding, not memorizing.)

---

## Trace Through

Input (sorted): `[-2, 0, 1, 1, 2]`

**i = 0**, `nums[i] = -2`, target = `2`, left = 1, right = 4

| left | right | nums[left] | nums[right] | sum | vs target=2 | action |
|------|-------|-----------|-------------|-----|-------------|--------|
| 1 | 4 | 0 | 2 | 2 | == | record `[-2,0,2]`, both in → left=2, right=3 |
| 2 | 3 | 1 | 1 | 2 | == | record `[-2,1,1]`, both in → left=3, right=2 |
| 3 | 2 | — | — | — | left < right false | stop |

**i = 1**, `nums[i] = 0`, target = `0`, left = 2, right = 4

| left | right | nums[left] | nums[right] | sum | vs target=0 | action |
|------|-------|-----------|-------------|-----|-------------|--------|
| 2 | 4 | 1 | 2 | 3 | > | right-- → 3 |
| 2 | 3 | 1 | 1 | 2 | > | right-- → 2 |
| 2 | 2 | — | — | — | left < right false | stop |

**i = 2, 3, 4** — `nums[i] > 0` (1, 1, 2) → `break` on first.

Output: `[[-2, 0, 2], [-2, 1, 1]]` ✓

This is exactly the case my early version failed — it found `[-2,0,2]` and stopped, missing `[-2,1,1]`.

---

## Complexity

**Time: O(n²)**
Sorting is O(n log n). The outer loop runs n times; for each `i`, the two pointers together traverse the remaining array once — O(n). So the search is O(n) × O(n) = O(n²), which dominates the O(n log n) sort. Total O(n²).

**Space: O(1)** extra (ignoring the output array)
Only a fixed set of variables (`left`, `right`, `target`, `sum`) regardless of input size. No Set, no auxiliary structure. The output array isn't counted as extra space since it's the required result.

> The slow first version was O(n²) too — but the constant factor was killed by building strings and a Set on every match, plus `Array.from().map().split().map()` at the end. Same Big-O, very different real runtime (1212ms → 35ms).

---

## Submissions

| Solution | Result | Link |
|----------|--------|------|
| Optimized — two pointers, no Set | Accepted, 35ms (67th pct) | [Submission #2022539095](https://leetcode.com/problems/3sum/submissions/2022539095/) |
| Two pointers + Set dedup | Accepted, ~1212ms (5th pct) | same problem, earlier run |
| Brute force O(n³) + Set | TLE (311/316) | — |

---

## Open Questions

- Explain the optimized solution in my own words, cold (deferred from this session).
- Why is `if (nums[i] > 0) break` valid — can I justify it rather than just use it?
- Why does a Set treat two equal-value arrays as distinct? (reference vs value equality — review this.)
