function minOperations(nums, x) {
  /**
   * We need to find th longest sub-array whose sum will be equal to
   * totalSum of the array - x;
   */

  let totalSum = 0;

  for(let i = 0; i < nums.length; i++) {
    const elem = nums[i];
    totalSum += elem;
  }

  const target = totalSum - x;
  let longestSubArrayLen = -1;
  let start = 0;
  let windowSum = 0;
  for(let end = 0; end < nums.length; end++) {
    const currentElement = nums[end];
    windowSum += currentElement;

    while(windowSum > target) {
        const startElement = nums[start];
        windowSum -= startElement;
        start++;
    }

    if(windowSum === target) {
        const currentWindowSize = end - start + 1;
        longestSubArrayLen = Math.max(longestSubArrayLen, currentWindowSize)
    }
  }
  if(longestSubArrayLen === -1) return -1;
  else return nums.length - longestSubArrayLen;
};