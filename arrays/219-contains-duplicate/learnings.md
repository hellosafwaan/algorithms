Session: [028 — 2026-06-15](../../safwaan/sessions/028_2026-06-15_contains-duplicate-ii.md)

## How It Felt

Took a detour — initial instinct was HashMap with index tracking, which led to confusion about why you'd need all previous indices vs just the most recent. Stepped back, watched a video, came back with the Set window insight. Once that clicked, the code came fast. HashMap solution felt natural once the "store last seen index, update always" pattern was clear. The verbose-to-concise compression exercise at the end was satisfying — went from 20 lines to 4.

## Key Insight

**Set approach:** The problem is asking "does a duplicate exist within k distance?" That's a sliding window membership check. Maintain a Set of the last k elements. Expand right on every step. Shrink left whenever the window exceeds k (`r - l > k`). If the incoming element is already in the Set, the duplicate is within k distance.

**HashMap approach:** You don't need a window at all if you store where you last saw each value. Map `value → last seen index`. When you hit a duplicate, check `r - map.get(value) <= k`. If yes, you're done. Always update the stored index — even after a match — because you might see the same value again further right and you want the freshest index.

**Which to prefer:** Set is O(k) space. HashMap is O(n) space. Set wins.

## Solution Walkthrough

So why does the Set approach work? The key observation is that if two identical values are within k positions of each other, *at some point* they'll both be inside a window of size k. The window is just a sliding buffer: as the right pointer advances, the left pointer catches up to keep the window at most k wide.

The shrink condition is `r - l > k`, not `r - l >= k`. When `r - l === k`, the gap is exactly k — that's still valid. You only need to shrink when the gap exceeds k.

When you shrink, you delete `nums[l]`, not whatever you're currently looking at. The leftmost element is the one that's now out of range. Then advance `l`.

```js
// Set solution — O(n) time, O(k) space
function containsNearbyDuplicate(nums, k) {
    const window = new Set();
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
        if (r - l > k) {
            window.delete(nums[l]);
            l++;
        }
        if (window.has(nums[r])) return true;
        window.add(nums[r]);
    }
    return false;
}
```

The HashMap solution is different in shape. You don't maintain a window at all — you just remember the last time you saw each value. When you encounter a value that's already in the map, the most recent previous occurrence gives you the smallest possible gap. If *that* gap is > k, no earlier occurrence can be close enough either (they're all further away). So one index per value is all you need.

```js
// HashMap solution — O(n) time, O(n) space
// Verbose (V1) — explicit and readable:
function containsNearbyDuplicate(nums, k) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const currentElement = nums[i];
        if (seen.has(currentElement)) {
            const lastSeenIndex = seen.get(currentElement);
            if (i - lastSeenIndex <= k) return true;
        }
        seen.set(currentElement, i);  // always update — keep freshest index
    }
    return false;
}

// Compressed (V3) — idiomatic:
function containsNearbyDuplicate(nums, k) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (seen.has(nums[i]) && i - seen.get(nums[i]) <= k) return true;
        seen.set(nums[i], i);
    }
    return false;
}
```

Notice: `seen.set(nums[i], i)` is *outside* any `if/else`. You always update the stored index — the only branching is on whether to return true.

## Pattern Introduced

**Sliding Window — Fixed Size (Hash Set)**  
New flavor: the window size is bounded by `k`, not the problem constraints. Shrink when `r - l > k`, remove the leftmost element `nums[l]`, advance `l`.

**Hash Map — Last Seen Index**  
Store `value → most recent index`. Check distance on duplicate hit. Always update.

## Watch Out For

- **Deleting the wrong element:** When shrinking, delete `nums[l]` (the outgoing element), not the incoming element you just read.
- **Off-by-one on shrink condition:** `r - l > k` means shrink when distance exceeds k. `r - l >= k` would incorrectly evict elements still in valid range.
- **Not updating the index:** In the HashMap approach, always call `seen.set(nums[i], i)` regardless of whether you found a match — you need the freshest index for future lookups.
- **Space difference:** Set is O(k), HashMap is O(n). They're both O(n) time but Set is strictly better on space for large inputs with few distinct values.

## Template

```js
// Set — preferred (O(k) space)
function containsNearbyDuplicate(nums, k) {
    const window = new Set();
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
        if (r - l > k) { window.delete(nums[l]); l++; }
        if (window.has(nums[r])) return true;
        window.add(nums[r]);
    }
    return false;
}

// HashMap — O(n) space
function containsNearbyDuplicate(nums, k) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (seen.has(nums[i]) && i - seen.get(nums[i]) <= k) return true;
        seen.set(nums[i], i);
    }
    return false;
}
```

## Trace Through

**Set approach** — `nums = [1, 2, 3, 1, 2, 3]`, `k = 2`:

| r | l | nums[r] | window before | action | window after |
|---|---|---------|---------------|--------|--------------|
| 0 | 0 | 1 | {} | add 1 | {1} |
| 1 | 0 | 2 | {1} | add 2 | {1,2} |
| 2 | 0 | 3 | {1,2} | add 3 | {1,2,3} |
| 3 | 0 | 1 | {1,2,3} | r-l=3>2 → delete nums[0]=1, l=1; has(1)? No → add 1 | {2,3,1} |
| 4 | 1 | 2 | {2,3,1} | r-l=3>2 → delete nums[1]=2, l=2; has(2)? No → add 2 | {3,1,2} |
| 5 | 2 | 3 | {3,1,2} | r-l=3>2 → delete nums[2]=3, l=3; has(3)? No → add 3 | {1,2,3} |

Return false. ✓

## Complexity

**Set solution:**
- Time: O(n) — one pass, each element added and removed at most once
- Space: O(k) — window never holds more than k+1 elements

**HashMap solution:**
- Time: O(n) — one pass, O(1) per operation
- Space: O(n) — map can hold every element in the worst case (all distinct values)

## Submissions

Set: https://leetcode.com/problems/contains-duplicate-ii/submissions/2033651105 (82nd percentile)  
HashMap: https://leetcode.com/problems/contains-duplicate-ii/submissions/2033678642

## Open Questions

- Can you derive the shrink condition (`r - l > k`) cold on the next sliding window problem without a hint?
- `Math.max` guard from LC 3 — does it come up here? (It doesn't — but confirm you know why: in LC 219, the window is fixed-size and you evict by index distance, not by jumping left. `Math.max` was only needed in LC 3 because left could jump backwards.)
