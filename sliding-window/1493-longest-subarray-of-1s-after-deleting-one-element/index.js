/**
 * @param {number[]} nums
 * @return {number}
 */
function longestSubarray(nums) {
    let start = 0;
    let longestSubarrayLen = 0;
    let zeroCountInWindow = 0;
    for (let end = 0; end < nums.length; end++) {
        const currentElement = nums[end];
        if(currentElement === 0) zeroCountInWindow++;
        while(zeroCountInWindow > 1) {
            const startElement = nums[start];
            if(startElement === 0) zeroCountInWindow--
            start++
        }
        const currentWindowSize = end - start;
        longestSubarrayLen = Math.max(longestSubarrayLen, currentWindowSize)
    }
    return longestSubarrayLen;
};
