const countSubarrayProduct = (nums, targetProduct) => {
  let start = 0;
  let windowProduct = 1;
  let count = 0;
  for (let end = 0; end < nums.length; end += 1) {
    windowProduct *= nums[end];
    while (windowProduct >= targetProduct && start <= end) {
      windowProduct /= nums[start];
      start += 1;
    }
    count += end - start + 1;
  }
  return count;
};
