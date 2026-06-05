Session: [010_2026-06-04_squares-of-a-sorted-array.md](../../safwaan/sessions/010_2026-06-04_squares-of-a-sorted-array.md)

# LC 977 — Squares of a Sorted Array

## How It Felt

Didn't immediately see the key insight — that the largest squares are always at the ends. That's where I got stuck. Once that clicked, the two-pointer approach made sense. The tricky part was realizing you can only place one element per iteration, not two. I made that mistake and caught it by tracing through a concrete example. The loop condition (`<=` not `<`) was another thing I missed — needed an example to see that odd-length arrays leave the middle element unprocessed.

## Key Insight

The array is sorted, so the largest squared values are always at the ends — either the leftmost (most negative) or the rightmost (most positive). Compare both ends, place the larger square at the back of the output array, move that pointer inward. Repeat.

You can only place one element per iteration because the second largest might still come from the same end — you have to compare again.

In his words: *"The left side and the right side will always have the highest values. You compare them, add the highest at the end of the result array, and then work backwards — not forwards."*

## Solution Walkthrough

The problem is simple to state: given a sorted array (which may contain negative numbers), return an array of the squares of each element, also sorted. The naive solution is just square everything and sort — O(n log n). The optimized solution is O(n), and it comes from noticing one thing about the input.

**The key observation**

The input array is already sorted, but it can have negative numbers. When you square a negative number, it becomes positive — and a very negative number produces a very large square. So the squared values aren't in order anymore when there are negatives. For example, `[-4, -1, 0, 3, 5]` squared is `[16, 1, 0, 9, 25]` — completely out of order.

But here's what IS true: the largest squared values are always at the ends of the original array. The leftmost element is the most negative (largest absolute value on the left), and the rightmost element is the most positive (largest absolute value on the right). Both ends are candidates for the largest square. Everything in the middle has a smaller absolute value, so a smaller square.

So instead of sorting after squaring, we can build the output array from the back — always placing the largest remaining square first.

**Setting up**

```js
const n = nums.length;
const squared = [];
let currentIndex = n - 1;
let left = 0;
let right = n - 1;
```

`left` starts at the leftmost element, `right` at the rightmost. `currentIndex` starts at the last position of the output array — we're filling it from right to left (largest to smallest).

**The while loop**

```js
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
```

Every iteration: square both ends, compare them, place the larger one at `currentIndex`, decrement `currentIndex`, and move the pointer that produced the larger value inward.

**Why you only place one element per iteration**

This is the mistake I made first. After placing the left square, I tried to also place the right square in the same iteration. But that's wrong — the next largest might still come from the left side.

Take `[-5, -4, 1, 2]`. Squares: `[25, 16, 1, 4]`. Left = -5, right = 2. Left squared is 25, right squared is 4. So we place 25 and move `left` inward to -4. Now left = -4, right = 2. Left squared is 16, right squared is 4. The next largest is still from the left side — 16. If we had placed right (4) in the same iteration as left (25), we'd have placed 4 before 16, which is wrong. You have to compare again after each placement — you never know which side wins next.

**Why `left <= right`, not `left < right`**

When the array has an odd length, the two pointers will eventually both land on the same middle element. At that point `left === right`. If the condition is `left < right`, this iteration is skipped — the middle element never gets placed, and the first slot of the output array stays empty. Using `<=` catches this final element.

You can see this in the trace for `[-1, 2, 3]` — iteration 3 has `left = 0, right = 0`, both pointing at `-1`. Without `<=`, that element is dropped.

**Why fill backwards, not forwards?**

Because we know the largest value and we're placing it in its final position. If we tried to fill forwards (smallest first), we'd need to find the smallest square at each step, which is harder — the smallest is somewhere in the middle of the original array, not at a predictable location. Filling backwards is the natural fit because the largest is always at one of the two ends.

**The naive approach and why it's slower**

Square everything, then call `.sort((a, b) => a - b)`. This works and it's completely valid code. The cost is the sort — O(n log n). The two-pointer approach is O(n) because each pointer moves inward exactly once, and every element gets placed exactly once. You visit each element a constant number of times.

---

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
