# Two Sum II (LC 167) — Learnings

Session: [009_2026-06-03_two-sum-ii](../../safwaan/sessions/009_2026-06-03_two-sum-ii.md)

## Key Insight
Sorted array = deterministic pointer moves. Sum too big → move right pointer left. Sum too small → move left pointer right. This only works because sorted order guarantees the direction of change. On an unsorted array, you'd just be guessing.

We start with pointers at both ends. The sum of the two pointed values is either too big, too small, or equal to the target.

**Sum too big:** Moving the left pointer right would increase the sum — that's the wrong direction. So we move the right pointer left, which gives us a smaller value and brings the sum down.

**Sum too small:** Moving the right pointer left would decrease the sum — wrong direction again. So we move the left pointer right, which gives us a larger value and brings the sum up.

This works because the array is sorted in ascending order. Every move has a guaranteed effect on the sum.

## Pattern Introduced
**Two pointers** — start at both ends, converge inward based on a condition. Requires a sorted (or otherwise ordered) array to be valid.

## Watch Out For
- `const` for pointers — they need to be `let` since you're mutating them
- Multiple `if` checks vs `else if` — once a branch is taken, the others are wasted work. Use `else if`.
- Return 1-indexed result: `[left + 1, right + 1]`

## Template
```js
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum > target) {
            right--;
        } else if (sum < target) {
            left++;
        } else {
            return [left + 1, right + 1];
        }
    }
}
```

## Complexity
Time: O(n) — one pass through the array
Space: O(1) — no extra data structures

## Open Questions
- Can you identify two-pointer problems cold? Not yet — need more reps.
- Where else does this converging-pointer pattern apply? (3Sum, Container With Most Water)
