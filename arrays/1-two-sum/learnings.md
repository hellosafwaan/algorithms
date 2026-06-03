# Two Sum (LC 1) — Personal Reference

## Key Insight

You need the complement of each number (`target - nums[i]`). Store complements in a map as you go. If the current number already exists as a stored complement, you've found the pair — return both indices.

Do the check *before* storing, not after. This handles the case where a number would pair with itself.

## Pattern Introduced

**Hash map / complement lookup** — trade O(n) space for O(n) time instead of O(n²) brute force.

Classic time-space trade-off: brute force checks all pairs (slow), hash map stores what you're looking for as you go (fast).

## Watch Out For

- Typos: `nums[i]` not `num[i]`
- Two pointers do NOT work here — array is unsorted. Two pointers require sorted input (→ LC 167)

## Template

```javascript
function twoSum(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(nums[i])) {
            return [map.get(nums[i]), i]
        }
        map.set(complement, i)
    }
}
```

## Complexity

- Time: O(n)
- Space: O(n)

## Open Questions

- Why can't two pointers work on an unsorted array? What property does the array need? (carry-forward)
