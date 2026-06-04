Session: [010_2026-06-04_squares-of-a-sorted-array.md](../../safwaan/sessions/010_2026-06-04_squares-of-a-sorted-array.md)

# LC 977 — Squares of a Sorted Array

## How It Felt

Didn't immediately see the key insight — that the largest squares are always at the ends. That's where I got stuck. Once that clicked, the two-pointer approach made sense. The tricky part was realizing you can only place one element per iteration, not two. I made that mistake and caught it by tracing through a concrete example. The loop condition (`<=` not `<`) was another thing I missed — needed an example to see that odd-length arrays leave the middle element unprocessed.

## Key Insight

The array is sorted, so the largest squared values are always at the ends — either the leftmost (most negative) or the rightmost (most positive). Compare both ends, place the larger square at the back of the output array, move that pointer inward. Repeat.

You can only place one element per iteration because the second largest might still come from the same end — you have to compare again.

In his words: *"The left side and the right side will always have the highest values. You compare them, add the highest at the end of the result array, and then work backwards — not forwards."*

## Pattern

Two pointers — both ends, fill output backwards.

Different from sum-style two pointers (converging toward a target). Here there's no target — you're just always grabbing the largest remaining element.

## Watch Out For

- `left < right` misses the middle element on odd-length arrays — use `left <= right`
- Don't place two elements per iteration — the second largest might come from the same side
- `let` not `const` for pointer variables — you need to increment/decrement them
- `.sort()` default is lexicographic — always pass `(a, b) => a - b` for numbers

## Template

```js
function sortedSquares(nums) {
    const n = nums.length;
    const squared = [];
    let currentIndex = n - 1;
    let left = 0;
    let right = n - 1;

    while (left <= right) {
        const leftSquared = nums[left] * nums[left];
        const rightSquared = nums[right] * nums[right];
        if (leftSquared > rightSquared) {
            squared[currentIndex] = leftSquared;
            currentIndex--;
            left++;
        } else {
            squared[currentIndex] = rightSquared;
            currentIndex--;
            right--;
        }
    }

    return squared;
}
```

## Trace Through

Input: `[-1, 2, 3]`

```
n = 3, squared = [], currentIndex = 2, left = 0, right = 2

Iteration 1: left <= right => 0 <= 2 => true
  leftSquared  = nums[0] * nums[0] = -1 * -1 = 1
  rightSquared = nums[2] * nums[2] =  3 *  3 = 9
  1 > 9 => false → squared[2] = 9, currentIndex = 1, right = 1

Iteration 2: left <= right => 0 <= 1 => true
  leftSquared  = nums[0] * nums[0] = -1 * -1 = 1
  rightSquared = nums[1] * nums[1] =  2 *  2 = 4
  1 > 4 => false → squared[1] = 4, currentIndex = 0, right = 0

Iteration 3: left <= right => 0 <= 0 => true
  leftSquared  = nums[0] * nums[0] = -1 * -1 = 1
  rightSquared = nums[0] * nums[0] = -1 * -1 = 1
  1 > 1 => false → squared[0] = 1, currentIndex = -1, right = -1

Result: [1, 4, 9] ✓
```

This is why `left <= right` matters — iteration 3 only runs because of the `=`. Without it, the middle element (-1, squared: 1) never gets placed.

## Complexity

- Naive: Time O(n log n), Space O(n)
- Optimized: Time O(n), Space O(n)

## Submissions

- Naive: https://leetcode.com/problems/squares-of-a-sorted-array/submissions/2021973697/
- Optimized: https://leetcode.com/problems/squares-of-a-sorted-array/submissions/2022208330/

## Open Questions

- Can you solve this in O(1) space? No clean way — you need the output array.
