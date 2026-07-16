/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 *
 * Input: nums1 = [1,2,3], nums2 = [2,4,6]
 * Output: [[1,3],[4,6]]
 * Explanation:
 * For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2.
 * Therefore, answer[0] = [1,3].
 * For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums2.
 * Therefore, answer[1] = [4,6].
 */

function findDifference(nums1, nums2) {
    const nums1Set = new Set(nums1);
    const nums2Set = new Set(nums2);
    const nums1Difference = [];
    const nums2Difference = [];
    for (let number of nums1Set) {
        if (!nums2Set.has(number)) nums1Difference.push(number);
    }
    for (let number of nums2Set) {
        if (!nums1Set.has(number)) nums2Difference.push(number);
    }
    return [nums1Difference, nums2Difference];
};
