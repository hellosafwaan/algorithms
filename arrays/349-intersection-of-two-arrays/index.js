/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * Input: nums1 = [1,2,2,1], nums2 = [2,2]
 * Output: [2]
 *
 * Example 2:
 * Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * Output: [9,4] (order does not matter)
 */

function intersection(nums1, nums2) {
    const setNums1 = new Set(nums1);
    const setNums2 = new Set(nums2);
    const result = [];
    for (const number of setNums1) {
        if (setNums2.has(number)) result.push(number);
    }
    return result;
};
