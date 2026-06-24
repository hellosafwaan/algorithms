/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 * Input: target = 7, nums = [2,3,1,2,4,3]
 */

// Intitial Thinking Wrong Solution
function minSubArrayLen(target, nums) {
    const n = nums.length
    let subArrayLen = Infinity;
    let start  = 0;
    let currentSum = nums[start]
    for (let end = 1; end < n; end++) {
        if(currentSum < target) {
            currentSum += nums[end]
        } else {
            currentSum += nums[end]
            while (currentSum >= target) {
                const currentWindowLength = end - start + 1;
                if(currentWindowLength < subArrayLen) subArrayLen = currentWindowLength;
                currentSum -= nums[start]
                start++
            }
        }
    }
    return subArrayLen;
};

// Correct solution - you were confused. This is bad. 
function minSubArrayLen(target, nums) {
    const n = nums.length
    let subArrayLen = Infinity;
    let start  = 0;
    let currentSum = 0
    for (let end = 0; end < n; end++) {
        currentSum += nums[end]
        while (currentSum >= target) {
            const currentWindowLength = end - start + 1;
            if(currentWindowLength < subArrayLen) subArrayLen = currentWindowLength;
            currentSum -= nums[start]
            start++
        }
    }
    return subArrayLen === Infinity ? 0 : subArrayLen;
};