# Two Sum II (LC 167) — Learnings

Session: [009_2026-06-03_two-sum-ii](../../safwaan/sessions/009_2026-06-03_two-sum-ii.md)

## Key Insight
Sorted array = deterministic pointer moves. Sum too big → move right pointer left. Sum too small → move left pointer right. This only works because sorted order guarantees the direction of change. On an unsorted array, you'd just be guessing.

We start with pointers at both ends. The sum of the two pointed values is either too big, too small, or equal to the target.

**Sum too big:** Moving the left pointer right would increase the sum — that's the wrong direction. So we move the right pointer left, which gives us a smaller value and brings the sum down.

**Sum too small:** Moving the right pointer left would decrease the sum — wrong direction again. So we move the left pointer right, which gives us a larger value and brings the sum up.

This works because the array is sorted in ascending order. Every move has a guaranteed effect on the sum.

## Solution Walkthrough

The problem: given a sorted array and a target, find two numbers that sum to the target. Return their 1-indexed positions. Exactly one solution is guaranteed.

**Three ways to think about this problem**

The naive approach is two nested loops — check every pair. O(n²) time, O(1) space. Works, but ignores everything about the input.

The next instinct might be a hash map — same approach as Two Sum I. For each element, store it in the map, check if the complement exists. O(n) time, O(n) space. That also works, and it's faster than brute force. But here's the thing: Two Sum II is the same problem as Two Sum I, just with one extra guarantee — the array is already sorted. The hash map completely ignores that guarantee. You're paying O(n) space for a structure that does complement lookups, when the sorted order already gives you a way to do that with just two pointers and no extra memory.

Two pointers gives you O(n) time and O(1) space — strictly better than the hash map on space, same on time. The sorted guarantee is what makes it possible. This is the lesson: when input has structure (sorted, partitioned, monotonic), look for a way to exploit that structure before reaching for a hash map.

**The idea**

Start with one pointer at the far left and one at the far right. Compute the sum of the two values they point at. Three things can happen:

- Sum equals target — done, return the positions.
- Sum is too big — you need a smaller number. The left pointer is already at the smallest available value, so moving it right would only make things bigger. The only way to bring the sum down is to move the right pointer left, getting a smaller value from that end.
- Sum is too small — you need a bigger number. The right pointer is already at the largest available value, so moving it left would only make things smaller. Move the left pointer right to get a larger value.

Take `[2, 7, 11, 15]`, target = `9`. Left = 2, right = 15. Sum = 17, too big → move right to 11. Sum = 13, still too big → move right to 7. Sum = 9, match → return `[1, 2]`.

Every move either eliminates a value that can't be part of the answer, or finds the answer. That's why this works — you're never guessing, every pointer move is justified.

**Why this only works on a sorted array**

On an unsorted array, moving the right pointer left gives you some arbitrary value — it might be larger or smaller than what you just had. You have no idea what effect the move will have on the sum. You'd be guessing. The sorted guarantee is what makes pointer moves deterministic: moving left always decreases the value, moving right always increases it.

This is the fundamental property that all converging two-pointer solutions depend on. Without it, the approach falls apart.

**Walking through the code**

```js
let left = 0;
let right = numbers.length - 1;
```

Start at both ends — widest possible window.

```js
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
```

The `else if` matters — once you know the sum is too big and move `right`, there's no point checking if it's also too small. Use `else if`, not separate `if` statements.

The return adds 1 to both indices because the problem specifies 1-indexed output. `left` and `right` are 0-indexed internally.

The loop condition is `left < right`, not `left <= right`. When they meet, they're pointing at the same element — you can't use it twice to form a pair.

**Why it's guaranteed to find the answer**

The problem states exactly one solution exists. Every iteration either finds it or eliminates at least one element from consideration. The pointers keep converging. They will meet the answer before they cross.

---

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
