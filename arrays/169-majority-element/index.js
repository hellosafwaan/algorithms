/**
 * @param {number[]} nums
 * @return {number}
 * Example 1:
 * Input: nums = [3,2,3]
 * Output: 3
 * Example 2:
 * Input: nums = [2,2,1,1,1,2,2]
 * Output: 2
 */


function majorityElement(nums) {
    const n  = nums.length
    const count = {}
    const minimumCount = n / 2

    for (let i = 0; i < n; i++) {
        const currentValue = nums[i]
        if(count[currentValue]) {
            count[currentValue] += 1
        } else {
            count[currentValue] = 1
        }
    }
    for (const key in count) {
        const currentCount = count[key];
        if(currentCount > minimumCount) {
            return Number(key)
        }
    }
};

/**
 * @param {number[]} nums
 * @return {number}
 * Example 1:
 * Input: nums = [3,2,3]
 * Output: 3
 * Example 2:
 * Input: nums = [2,2,1,1,1,2,2]
 * Output: 2
 * Input: nums = [3,3,4]
 * Output: 3
 * Input: nums = [6,5,5]
 * Output: 5
 * Input: nums = [2,2,1,1,2]
 */

function majorityElement(nums) {
    const n = nums.length
    let candidate = nums[0];
    let candidateCount = 1;
    for (let i = 1; i < n; i++) {
        const currentCandidate = nums[i];
        if(currentCandidate === candidate) {
            candidateCount++;
        } else {
            if(candidateCount > 0) {
                candidateCount--;
            } else {
                candidate = currentCandidate
                candidateCount = 1;
            }
        }
    }
    return candidate
}