const longestSubarraySum = (nums, targetSum) => {
  let start = 0;
  let longestWindowSize = 0;
  let windowSum = 0;
  for(let end = 0; end < nums.length; end++) {
    windowSum += nums[end];
    while(windowSum > targetSum) {
      windowSum -= nums[start];
      start++
    }

    if(windowSum === targetSum) {
      const currentWindowSize = end - start + 1;
      longestWindowSize = Math.max(currentWindowSize, longestWindowSize);
    }
  }
  if(longestWindowSize === 0) return -1;
  else return longestWindowSize;
};

module.exports = {
  longestSubarraySum,
};
