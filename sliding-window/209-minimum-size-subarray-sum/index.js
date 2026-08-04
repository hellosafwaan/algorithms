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

// Cold Redo Attempt (2026-08-04) — see learnings.md "Cold Redo" section for the two bugs
// hit along the way (missing start++, and checking validity after the shrink instead of
// during it) before arriving back at this version.
function minSubArrayLen(target, nums) {
    let minWindowLength = Infinity;
    let currentWindowSum = 0;
    let start = 0;

    for(let end = 0; end < nums.length; end++) {
        const currentElement = nums[end];
        currentWindowSum += currentElement;

        while(currentWindowSum >= target) {
            const currentWindowLength = end - start + 1;
            minWindowLength = Math.min(minWindowLength, currentWindowLength);
            const startElement = nums[start];
            currentWindowSum -= startElement;
            start++
        }
    }
    if(minWindowLength === Infinity) return 0;
    else return minWindowLength;
};