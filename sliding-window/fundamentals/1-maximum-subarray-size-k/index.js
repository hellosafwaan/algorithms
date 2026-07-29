// Approach 1 - Naive Sliding Window (timeout)
const maxSubarraySumSizeK = (nums, k) => {
  let maxSum = -Infinity;
  for (let i = 0; i <= nums.length - k; i += 1) {
    let sum = 0
    for (let j = i; j < i + k; j += 1) {
      sum += nums[j]; 
    }
    if (sum > maxSum) {
      maxSum = sum;
    }
  }
  return maxSum;
};

// Approach 2 - The Optimised Sliding Window
const maxSubarraySumSizeK = (nums, k) => {
  let currentSum = 0;
  for (let i = 0; i < k; i += 1) {
    currentSum += nums[i]
  }
  let maxSum = currentSum;
  
  for (let i = 0; i < nums.length - k; i += 1) {
    currentSum -= nums[i]
    currentSum += nums[i + k]
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
};

