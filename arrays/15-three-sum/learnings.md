Session: [012_2026-06-04_three-sum](../../safwaan/sessions/012_2026-06-04_three-sum.md)

---

## How It Felt

The first version of the optimized solution worked but beat only 5% of submissions. The outer for loop and two-pointer logic were ~90% correct. Where I slipped: once I found a triplet, I stopped iterating and moved `i` forward — I didn't keep searching for other pairs that hit the target for the same `i`. Then I was confused whether to move the pointers inward or outward after a match. Turns out you just keep moving inward — I've never seen a case where an inward pointer suddenly goes outward. I was overthinking a settled rule. I also forgot to reset the triplet between matches. And the final speedup — dropping the Set entirely and skipping duplicates in place — I understood the *what* but had to be shown the *why*, and then struggled with the skip logic.

---

## Key Insight

Sort the array first. Then fix one element `nums[i]` and run a **two-pointer search on the rest** for a pair summing to `-nums[i]`. That turns the inner two loops of the brute force into a single linear two-pointer pass — O(n³) becomes O(n²).

The payoff of sorting isn't just the two-pointer move. Because the array is sorted, **duplicate values sit next to each other**, so duplicate triplets can be skipped *in place* — no Set, no string conversion, no dedup pass. Skip a repeated `i` with `continue`; after a match, walk `left`/`right` past their repeats with a `while`.

> _In my own words (2026-06-05):_ You need to find three elements that sum to zero. Brute force is three nested loops — O(n³). The insight is that you can fix one element with the outer for loop, then run a two-pointer on the remaining subarray to find the pair that sums to the negative of that element — effectively a 2-sum. Two pointers collapse one level of looping, so you get O(n²). For this to work, the array must be sorted. Sorting also means duplicates are adjacent, so you can skip them in place: skip a repeated `i` with `continue`, and after a match skip repeated `left`/`right` values with a `while`. No Set needed — the Set approach is also O(n²) but the constant factor kills it (1212ms vs 35ms).

---

## Solution Walkthrough

So the first thing we do is sort the array. Sorting does two things for us, and both are important. The first reason is that two pointers only work on sorted arrays — if the array isn't sorted, moving a pointer inward tells you nothing useful about whether the sum is going up or down. The second reason is sneakier: once the array is sorted, duplicate values end up sitting right next to each other. That's going to let us skip duplicates for free later, without a Set or any extra data structure.

Now we loop through the array with index `i`. This is the "fix one element" step. For every `i`, we're saying: I've picked `nums[i]` as the first element of my triplet — can I find two more numbers somewhere to the right of `i` that bring the total to zero? The target for those two numbers is `-nums[i]`. That's literally a two-sum problem on a sorted subarray, which we know how to solve with two pointers.

**The first early exit: `if (nums[i] > 0) break`**

Right at the top of the loop, before we do anything else, we check if `nums[i]` is positive. If it is, we `break` — not `continue`, but `break` out of the entire outer loop. Here's why: the array is sorted in ascending order. `nums[i]` is the smallest of our three numbers. If even the smallest one is already positive, there's no way the three of them can sum to zero — they'd all be positive. And crucially, every `i` that comes after this one is also going to be positive (sorted array, remember), so there's no point checking any of them either. We're done. This single line can save the loop from running through a huge chunk of the array.

**The second early exit: `if (i > 0 && nums[i] === nums[i - 1]) continue`**

This is the outer-loop dedup. If the current `nums[i]` is the same as the previous one, we've already found all the triplets that start with this value. Running the two-pointer again with the exact same fixed element would just give us identical triplets — duplicates. So we skip it with `continue`.

Note the guard `i > 0` — we can't check `nums[i - 1]` when `i` is 0 because there's no previous element. That would be an out-of-bounds read.

**Setting up the two pointers**

For each `i` that passes both checks, we set `left = i + 1` and `right = n - 1`. These are the two pointers that will search the remaining subarray. We compute `target = -nums[i]` — this is what `nums[left] + nums[right]` needs to equal.

**The while loop: converging the pointers**

`left` starts just right of `i`, `right` starts at the end. They move toward each other. On each step:

- If `nums[left] + nums[right] > target` — the sum is too big. We need a smaller number, and the only way to get that in a sorted array is to move `right` one step left (`right--`). Moving `left` right would only make things bigger.
- If the sum is too small — move `left` right (`left++`) to get a larger number.
- If the sum equals `target` — we found a valid triplet. Push it to the result.

**What happens after a match**

This is where my early version went wrong. After pushing the triplet, I used to just move on — either `break` or let the outer loop increment `i`. But there can be multiple valid pairs for the same `i`. So after a match, we move both pointers inward: `left++` and `right--`. Then we keep the while loop going and check for more pairs.

But wait — we might land on a duplicate value. If the new `nums[left]` is the same as the one we just used, we'd push an identical triplet. So after moving both pointers in, we run two more while loops:

```
while (left < right && nums[left] === nums[left - 1]) left++
while (left < right && nums[right] === nums[right + 1]) right--
```

The first one says: if the value I just moved `left` onto is the same as the value I just used (which is now at `left - 1`), skip it. Keep moving until we're on a fresh value. The second does the same for `right` — the value we just used is now at `right + 1`, so we skip while the current `right` matches it.

We use `while` here, not `if`. There could be three or four identical values in a row — a single `if` would only skip one of them and we'd still get duplicates.

The `left < right` guard inside both while loops is important too — without it, the pointers could cross each other while we're skipping, and we'd end up in a broken state.

**Why no Set?**

The first working version used a `Set<string>` to deduplicate results — converting each triplet to a string like `"-2,0,2"` before inserting. It worked, but it was 35× slower (1212ms vs 35ms). The Big-O is the same — O(n²) either way — but every match was doing string concatenation, a Set insertion, and at the end a full conversion back to arrays. The in-place dedup approach does none of that. Same asymptotic complexity, massively different constant factor.

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

_(All answered 2026-06-05)_
- ~~Explain the optimized solution in my own words, cold~~ — done cold, unprompted.
- ~~Why is `if (nums[i] > 0) break` valid~~ — sorted ascending, so every element right of `i` is larger; minimum possible triplet sum is positive; no need to continue.
- ~~Why does a Set treat two equal-value arrays as distinct~~ — reference equality; two arrays with the same contents are different objects in memory.
