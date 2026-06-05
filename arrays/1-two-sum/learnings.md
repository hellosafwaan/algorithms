# Two Sum (LC 1) — Personal Reference

## Key Insight

You need the complement of each number (`target - nums[i]`). Store complements in a map as you go. If the current number already exists as a stored complement, you've found the pair — return both indices.

Do the check *before* storing, not after. This handles the case where a number would pair with itself.

## Solution Walkthrough

The problem: given an unsorted array and a target, find two numbers that sum to the target and return their indices. Exactly one solution is guaranteed.

**The brute force**

Check every pair with two nested loops. For each element, scan every element after it and check if they sum to the target. O(n²) time, O(1) space. Works, but slow — for an array of 10,000 elements, that's up to 100 million comparisons.

**The insight**

For any element `nums[i]`, you already know what its partner needs to be — it's `target - nums[i]`. Call that the complement. Instead of scanning the whole array every time to find it, what if you remembered all the complements you've seen so far? Then for each new element, you just ask: "has anyone already told me they need me?"

That's the hash map approach. As you walk through the array, you store each element's complement in a map, indexed by the complement value. When you reach a new element, you check if it already exists in the map as a complement someone registered earlier. If it does, you've found your pair.

Take `[2, 7, 11, 15]`, target = `9`:
- `i = 0`, `nums[i] = 2`, complement = 7. Map is empty, no match. Store `{7: 0}` (complement 7 is needed, found at index 0).
- `i = 1`, `nums[i] = 7`. Check map — 7 is there! The element at index 0 needs a 7. Return `[0, 1]`.

**Check before storing — this is subtle**

The code checks `if (map.has(nums[i]))` before doing `map.set(complement, i)`. The order matters. If you stored first and then checked, a number could match with its own complement entry — meaning the same element could pair with itself. By checking first, you only match against complements that were registered by previous elements, never the current one.

For example, with `[3, 3]`, target = `6`. At `i = 0`, we check the map (empty, no match), then store complement 3 at index 0. At `i = 1`, we check the map — 3 is there, registered by index 0. Return `[0, 1]`. Correct. If we had stored before checking at `i = 0`, the complement 3 would already be in the map when we check `nums[0] = 3`, and we'd return `[0, 0]` — pairing an element with itself.

**Why not two pointers?**

Two pointers require sorted input. In a sorted array, moving a pointer left always decreases the value and moving it right always increases it — that's what makes pointer moves meaningful. In an unsorted array, moving a pointer in either direction gives you some arbitrary value. You have no logical basis for which direction to move. You'd be guessing. So two pointers don't work here — and sorting first doesn't count, because sorting destroys the original indices, which is what the problem asks you to return.

**The trade-off**

This is the classic time-space trade-off. Brute force is O(n²) time, O(1) space — slow but no memory cost. Hash map is O(n) time, O(n) space — fast but you're storing up to n complements. In most cases the speed win is worth the memory cost.

---

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
