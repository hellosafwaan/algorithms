# Session: Contains Duplicate II (LC 219) — 2026-06-15

## What He Attempted

First instinct was a frequency HashMap, same as LC 217. Then recognised the index constraint and reasoned that he'd need to track where each element was seen — not just whether. Started thinking about storing arrays of indices per value, then watched a video mid-session, came back and landed on the Set sliding window approach independently.

**First Set attempt (buggy):**
```js
function containsNearbyDuplicate(nums, k) {
    const window = new Set();
    let left = 0;
    for (let r = 0; r < nums.length; r++) {
        if(window.size > k + 1) {
            window.delete(currentElement);  // bug: deleting new element, not the old leftmost
            left++
        }
        const currentElement = nums[r];
        if(window.has(currentElement)) return true;
        else window.add(currentElement)
    }
    return false;
}
```

**Fixed Set solution:**
```js
function containsNearbyDuplicate(nums, k) {
    const window = new Set();
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
        if(r - l > k) {
            window.delete(nums[l]);
            l++
        }
        const currentElement = nums[r];
        if(window.has(currentElement)) return true;
        else window.add(currentElement)
    }
    return false;
}
```

Then independently worked through the HashMap approach in three progressive versions (verbose → compressed).

## Where He Got Stuck

Two separate sticking points:

1. **Why store only the most recent index?** The explanation "the most recent gives the smallest gap — if that's too far, all earlier occurrences are even further" didn't click from abstract description alone. Needed a concrete trace with specific k values before it landed.

2. **Window shrink condition:** First attempt used `window.size > k + 1` and deleted `currentElement` instead of `nums[l]`. Identified that the size computation was wrong himself; needed a hint to see the deletion target bug (deleting the incoming element, not the outgoing one).

## Mistakes Made

- `window.size > k + 1` — too loose; allows the window to hold k+2 elements before shrinking, so a pair that's k+1 apart would pass as valid. Should be `r - l > k`.
- `window.delete(currentElement)` — deletes the element just read, not the leftmost. Should be `window.delete(nums[l])`.
- Initial confusion on HashMap: tried to store arrays of all previous indices per value, rather than just the most recent one.

## Key Insight

**Set approach:** The window is a fixed-size sliding Set of at most k elements. When the window grows past k (`r - l > k`), evict `nums[l]` and advance `l`. If the incoming element is already in the window, the duplicate is within k distance — done.

**HashMap approach:** Store `value → most recent index`. When a value is seen again, check `r - map.get(value) <= k`. Always update the stored index, even after a hit — you might need it for a future duplicate further right.

**Which is better:** Set wins on space — O(k) vs O(n). HashMap is equally valid conceptually and is what LeetCode categorises this under ("HashMap").

## Complexity Reached

**Set solution:** Time O(n), Space O(k)  
**HashMap solution:** Time O(n), Space O(n)

## Coach Notes for Next Session

- The window condition (`r - l > k`) was self-identified as wrong; the deletion target needed a hint. At next sliding window problem, probe cold: "when do you shrink the window, and what do you remove?"
- The verbose-to-terse compression exercise was valuable — he did it himself across three versions. He's building comfort with idiomatic JS style.
- `Math.max` guard in sliding window (from LC 3) still hasn't been confirmed cold — probe at next sliding window problem (LC 424).
- Move fast — interview is Friday 2026-06-19.
