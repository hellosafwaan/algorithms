/**
 * @param {number[]} nums
 * @return {number}
 */

function singleNumber(nums) {
    const n = nums.length;
    let result = 0;
    for (let i = 0; i < n; i++) {
        result = result ^ nums[i]
    }
    return result
};