/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// Approach 1 - Naive Approach.
function findMaxAverage(nums, k) {
    let maximumAverage = -Infinity;
    for(let i = 0; i <= nums.length - k; i++) {
        let runningSum = 0;
        for(let j = i; j < i + k; j++) {
            runningSum += nums[j];
        }
        const currentAverage = runningSum /  k;
        maximumAverage = Math.max(maximumAverage, currentAverage);
    }
    return maximumAverage;
};

// Approach 2 - Optimised Approach.
function findMaxAverage(nums, k) {
    // Let's compute the first fixed size windows average;
    let currentSum = 0;
    for(let i = 0; i < k; i++) {
        currentSum += nums[i];
    }
    let currentAverage = currentSum / k;
    let maximumAverage = currentAverage;
    for(let i = 0; i < nums.length  - k; i++) {
        currentSum -= nums[i];
        currentSum += nums[i + k];
        currentAverage = currentSum / k;
        maximumAverage = Math.max(maximumAverage, currentAverage);
    }
    return maximumAverage
}
/**
    Actually, you don't need to compute the average every iteration,
    you can do that at the end. you just have to compute the maxmium sum
 */

function findMaxAverage(nums, k) {
    let currentSum = 0;
    for(let i = 0; i < k; i++) {
        currentSum += nums[i];
    };
    let maxSum = currentSum;
    for(let i = 0; i < nums.length - k; i++) {
        currentSum -= nums[i];
        currentSum += nums[i + k];
        maxSum = Math.max(currentSum, maxSum)
    }
    return maxSum/k
}