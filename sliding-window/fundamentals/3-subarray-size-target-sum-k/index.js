function subarrayTargetSumSizeK(nums, target, k) {
  let currentSum = 0;
  let count = 0;
  for(let i = 0; i < k; i++) {
    currentSum += nums[i];
  }
  if(currentSum === target) count++

  for(let i  = 0; i < nums.length - k; i++) {
    currentSum = currentSum - nums[i] + nums[k + i];
    if(currentSum === target) count++
  }
  return count;
};
