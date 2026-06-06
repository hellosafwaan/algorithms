// Solution 1 — Swap to Back (Two Pointers, Converging)
// p1 scans left to right. swappableIndex scans right to left looking for a valid element to swap in.
// When p1 finds a target, we pull a valid element from the right and put it at p1's position.
// This minimises total write operations — useful when writes are expensive.
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, target) {
    const n = nums.length;
    let swappableIndex = n - 1;
    let p1 = 0;

    while(p1 <= swappableIndex) {
        const valueAtp1 = nums[p1];

        if(valueAtp1 === target) {
            // Find the rightmost position that holds a valid (non-target) element.
            // Skip over any targets from the right side — they're already where we want them.
            let valueAtSwappableIndex = nums[swappableIndex]
            while(valueAtSwappableIndex === target && swappableIndex > 0) {
                swappableIndex--
                valueAtSwappableIndex = nums[swappableIndex]
            }

            // If the pointers have crossed or met, there's nothing left to swap.
            // Everything from p1 onward is a target — we're done.
            // Key bug that was fixed: the original condition was `swappableIndex === 0`,
            // which missed valid elements at index 0 and broke when pointers crossed mid-array.
            if(swappableIndex <= p1) {
                break;
            }

            // Safe to swap — swappableIndex is strictly to the right of p1,
            // so we're not touching anything we've already confirmed as valid.
            const temp = valueAtp1;
            nums[p1] = valueAtSwappableIndex;
            nums[swappableIndex] = temp;
        }

        p1++
    }

    // p1 is the count of valid elements. When the loop exits naturally, every element
    // before p1 is valid. When we break early, p1 points at a target that had no valid
    // swap partner — so the valid range is still 0..p1-1.
    return p1;
};

// Solution 2 — Read/Write Pointers (Same Direction)
// p2 reads every element left to right. p1 only advances when we write a valid element.
// Simpler than the swap approach — we just overwrite targets in place.
// Safe because p1 never gets ahead of p2, so we never overwrite a value we still need.
function removeElement2(nums, target) {
    const n = nums.length;
    let p1 = 0; // write pointer — next position to write a valid element
    let p2 = 0; // read pointer — scans every element

    while(p2 <= n - 1) {
        const valueAtP2 = nums[p2];

        if(valueAtP2 !== target) {
            // Valid element — write it to the next available write position
            nums[p1] = valueAtP2
            p1++
        }
        // Whether target or not, the read pointer always advances
        p2++
    }

    // p1 is how many valid elements we wrote, which is k
    return p1;
}