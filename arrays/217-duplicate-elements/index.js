/**
 * @param {number[]} nums
 * @return {boolean}
 * 
 * Input: nums = [1,2,3,1]
 * Output: true
 * Explanation:
 * The element 1 occurs at the indices 0 and 3.
 * 
 * Example 2:
 * Input: nums = [1,2,3,4]
 * Output: false
 * Explanation:
 * All elements are distinct.
 */


// The hashmap solution
function containsDuplicate(nums) {
    const n = nums.length;
    const seen = {};
    for (let i = 0; i < n; i++) {
        const currentElement = nums[i]
        if(seen[currentElement] !== undefined) return true;
        else seen[currentElement] = true;
    }
    return false
};

// The set solution 

function containsDuplicate(nums) {
    const n = nums.length;
    const seen = new Set();
    for (let i = 0; i < n; i++) {
        const currentElement = nums[i]
        if (seen.has(currentElement)) return true;
        else seen.add(currentElement)
    }
    return false;
}