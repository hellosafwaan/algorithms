Session: [015_2026-06-06_remove-duplicates](../../safwaan/sessions/015_2026-06-06_remove-duplicates.md)

## How It Felt

Simple once the write condition clicked. The initial confusion was overthinking it — I started reaching for a swap/move-to-end approach before realising there's no fixed "end" to target. Once I anchored on what each pointer's job is, it fell into place fast.

## Key Insight

p2 reads every element, every step, no exceptions. p1 only advances when it needs to write — and it only writes when it finds a value different from what it's currently holding. After writing, p1 stays put until the next unique element shows up. Because the array is sorted, all duplicates are adjacent, so this always works: once p2 moves past the last duplicate of a value, the next element it sees is guaranteed to be new.

## Solution Walkthrough

So the problem is: given a sorted array, keep only the unique values in-place and return how many there are. The rest of the array doesn't matter.

The sorted property is the key — it means all copies of a value sit next to each other. You don't need to search the whole array to find duplicates. You just compare each element to the one before it.

Set p1 at 0 — this is the write pointer. It marks the boundary of your "unique" section. p2 starts at 0 as well — it's the read pointer, scanning every element.

Each iteration:
- If nums[p2] === nums[p1], that's a duplicate. Nothing to write. Just move p2 forward.
- If nums[p2] !== nums[p1], that's a new unique value. Advance p1 and write nums[p2] into nums[p1].

Why is it safe to overwrite? Because p1 can never get ahead of p2. They start at the same index, and p2 moves on every iteration while p1 only moves on writes. So by the time you write to position p1, p2 has already read whatever was there and moved on. You're never destroying a value you still need.

At the end, return p1 + 1. p1 is a 0-indexed position, so the count of unique elements is p1 + 1.

```js
function removeDuplicates(nums) {
    const n = nums.length;
    let p1 = 0;
    let p2 = 0;
    while (p2 <= n - 1) {
        if (nums[p1] === nums[p2]) {
            p2++;
        } else {
            p1++;
            nums[p1] = nums[p2];
            p2++;
        }
    }
    return p1 + 1;
}
```

## Pattern Introduced

Two pointers — read/write (same direction). Same pattern as LC 27 (Remove Element), different condition. In LC 27, you write when nums[p2] !== target. Here, you write when nums[p2] !== nums[p1]. The shape is identical.

## Watch Out For

- Don't use `const` for pointer variables — you're reassigning them every iteration.
- p1 stays put after writing — don't double-increment it. p2 always moves, p1 only moves on a write.
- Return `p1 + 1`, not `p1`. p1 is an index, not a count.

## Template

```js
let p1 = 0;
let p2 = 0;
while (p2 < nums.length) {
    if (nums[p2] !== nums[p1]) {
        p1++;
        nums[p1] = nums[p2];
    }
    p2++;
}
return p1 + 1;
```

## Trace Through

Input: `[1, 1, 2]`

| Iteration | p1 | p2 | nums[p1] | nums[p2] | Action |
|-----------|----|----|----------|----------|--------|
| 1 | 0 | 0 | 1 | 1 | equal → p2++ |
| 2 | 0 | 1 | 1 | 1 | equal → p2++ |
| 3 | 0 | 2 | 1 | 2 | not equal → p1=1, nums[1]=2, p2++ |
| 4 | — | 3 | — | — | p2 > n-1, exit |

Result: `[1, 2, 2]`, return 2 ✓

## Complexity

| | Time | Space |
|--|------|-------|
| Approach | O(n) | O(1) |

**Why O(n):** p2 visits every element exactly once. p1 does at most n writes. One pass total.  
**Why O(1):** In-place — no extra arrays or data structures. Only two pointer variables.

## Submissions

- 2026-06-06: Accepted — 100th percentile runtime — https://leetcode.com/problems/remove-duplicates-from-sorted-array/submissions/2024283455

## Open Questions

- None.
