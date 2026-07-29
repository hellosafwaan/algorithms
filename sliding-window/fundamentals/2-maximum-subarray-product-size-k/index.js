// Approach 1 - Naive Sliding Window (timeout)
function maxSubarrayProductSizeK(nums, k) {
  let maxProduct = -Infinity;
  for (let i = 0; i <= nums.length - k; i += 1) {
    let product = 1;
    for (let j = i; j < i + k; j += 1) {
      product *= nums[j]; 
    }
    if (product > maxProduct) {
      maxProduct = product;
    }
  }
  return maxProduct;
};

// Approach 2 - The Optimised Sliding Window
function maxSubarrayProductSizeK(nums, k) {
  let currentProduct = 1;
  for (let i = 0; i < k; i += 1) {
    currentProduct *= nums[i]
  }
  let maxProduct = currentProduct;
  
  for (let i = 0; i < nums.length - k; i += 1) {
    currentProduct /= nums[i]
    currentProduct *= nums[i + k]
    maxProduct = Math.max(currentProduct, maxProduct)
  }

  return maxProduct;
};
