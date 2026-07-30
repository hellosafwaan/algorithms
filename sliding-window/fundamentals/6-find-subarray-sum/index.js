const findSubarraySum = (nums, targetSum) => {
  let start = 0;
  let windowSum = 0;
  for(let end = 0; end < nums.length; end++) {
    windowSum += nums[end];
    while(windowSum > targetSum) {
      windowSum -= nums[start];
      start++;
    }
    if(windowSum === targetSum) return [start, end]
  }
};

module.exports = {
  findSubarraySum,
};
