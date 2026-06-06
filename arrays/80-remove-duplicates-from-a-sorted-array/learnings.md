# LC 80 — Remove Duplicates from Sorted Array II

Session: [016_2026-06-06_remove-duplicates-ii](../../safwaan/sessions/016_2026-06-06_remove-duplicates-ii.md)

## How It Felt

Started off overthinking it. Tried to track occurrence counts per group and write on transition — spent a long time debugging that before scrapping it. Once I switched to thinking per-element (write or skip each one), it clicked fast. The first two elements being a free write was my own observation, which felt good.

## Key Insight

Don't think in groups. For each element, ask one question: has this value already been written twice? If yes, skip. If no, write.

You know the answer just by looking back two positions in the written section. If `nums[p1 - 1]` and `nums[p1 - 2]` are both equal to the current value, you've already placed two copies — skip. Otherwise write.

Bootstrap: when `p1 < 2`, always write. You can't have exceeded 2 duplicates before you've written 2 elements.

## Solution Walkthrough

So this is a direct generalization of LC 26. The shape is identical — read/write pointers moving in the same direction — but the write condition changes from "never duplicate" to "never more than two."

The key question to answer: how do I know if I should write the current element?

In LC 26 you checked one position back: if the current value equals what's already at `p1`, skip it. Here you check two positions back: if the current value equals *both* `nums[p1 - 1]` and `nums[p1 - 2]`, you already have two copies — skip. If it matches only one, or neither, you're fine to write.

Why does checking `p1 - 1` and `p1 - 2` work? Because the array is sorted. Duplicates are always adjacent. If the last two written values are both the same as the incoming value, you've hit a third duplicate. If they're different from each other (e.g. [1, 2, ...]), the current value can't be a third duplicate of either.

The `p1 < 2` guard: in the first two iterations, `p1 - 2` would be at index -1 (doesn't exist). But more importantly, you can never be writing a third duplicate when you've written fewer than 2 elements total. So just write blindly for the first two.

The read pointer `p2` moves every iteration — it reads every element. The write pointer `p1` only moves when you write. Return `p1` at the end — it's pointing at the next empty slot, so it equals the count of valid elements.

## Pattern Introduced

**Read/Write with look-back condition.** Same shape as LC 26 but write condition checks further back. Generalizes to: "allow at most k duplicates" → skip when `nums[p2]` equals `nums[p1 - k]`.

## Watch Out For

- **Group thinking** — the instinct to count occurrences per run and write on transition. This approach only writes when you see a *new* value, so it always misses the last element of each group. Fight this instinct: think per-element, not per-group.
- **Return p1, not p1 + 1** — `p1` is the next-to-write position, which equals the number of written elements. LC 26 returned `p1 + 1` because `p1` pointed at the last-written position (different initialisation). Here `p1` starts at 0 and only advances on write, so it's already the count.
- **Bootstrap condition** — need `p1 < 2` check or the lookback goes out of bounds.

## Template

```js
function removeDuplicates(nums) {
    let p1 = 0;
    let p2 = 0;

    while (p2 < nums.length) {
        const val = nums[p2];
        if (p1 < 2 || !(nums[p1 - 1] === val && nums[p1 - 2] === val)) {
            nums[p1] = val;
            p1++;
        }
        p2++;
    }

    return p1;
}
```

## Trace Through

`nums = [1,1,1,2,2,3]`

```
p2=0: p1<2 → write 1 at 0. p1=1
p2=1: p1<2 → write 1 at 1. p1=2
p2=2: nums[1]=1, nums[0]=1, val=1 → both match → skip. p2=3
p2=3: nums[1]=1, nums[0]=1, val=2 → no match → write 2 at 2. p1=3
p2=4: nums[2]=2, nums[1]=1, val=2 → only one match → write 2 at 3. p1=4
p2=5: nums[3]=2, nums[2]=2, val=3 → no match → write 3 at 4. p1=5

Return 5. nums = [1,1,2,2,3,_] ✓
```

## Complexity

**Time: O(n)** — single pass, both pointers move left to right, total iterations = n.  
**Space: O(1)** — in-place modification, two pointer variables only.

## Submissions

- [2026-06-06 — Accepted, 46th percentile (runtime noise, algorithm is optimal)](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/submissions/2024550295)

## Open Questions

- The "allow at most k duplicates" generalization: write condition becomes `nums[p2] !== nums[p1 - k]`. Does this hold for k=1 (LC 26)?
