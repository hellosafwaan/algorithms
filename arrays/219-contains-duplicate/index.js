/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 * Input: nums = [1,2,3,1], k = 3
 * Output: true
 */


// A HashSet/Set Based Solution;
function containsNearbyDuplicate(nums, k) {
    const window = new Set();
    let l = 0;
    const n = nums.length;
    for (let r = 0; r < n; r++) {
        if(r - l > k) {
            window.delete(nums[l]);
            l++
        }
        const currentElement = nums[r];
        if(window.has(currentElement)) return true;
        else window.add(currentElement)
    }
    return false;
};

// A HashMap / Map Based Solution;
// First Solution

function containsNearbyDuplicate(nums, k) {
    const seen = new Map();
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        const currentIndex = i;
        const currentElement = nums[currentIndex];
        if(seen.has(currentElement)) {
            const lastSeenIndex = seen.get(currentElement);
            if(currentIndex - lastSeenIndex <= k) return true;
            else {
                seen.set(currentElement, currentIndex)
            }
        } else {
            seen.set(currentElement, currentIndex)
        }
    }
    return false;
}

// Simplying the code for the above logic progressively
// V2
function containsNearbyDuplicate(nums, k) {
    const seen = new Map();
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        const currentIndex = i;
        const currentElement = nums[currentIndex];
        if(seen.has(currentElement)) {
            const lastSeenIndex = seen.get(currentElement);
            if(currentIndex - lastSeenIndex <= k) return true;
        }
        seen.set(currentElement, currentIndex)
    }
    return false;
}

// Simplying the code for the above logic progressively
// V3
function containsNearbyDuplicate(nums, k) {
    const seen = new Map();
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if(seen.has(nums[i]) && i - seen.get(nums[i]) <= k) return true;
        seen.set(nums[i], i)
    }
    return false;
}