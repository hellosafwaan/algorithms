/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

const findLeftmostIndex = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let leftMost = -1;
  while(left <= right) {
    const mid = Math.floor((left + right) / 2)
    if(target < nums[mid]) right = mid - 1;
    else if (target > nums[mid]) left = mid + 1;
    else {
      right = mid - 1;
      leftMost = mid;
    }
  }
  return leftMost
};

const findRightMostIndex = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let rightMost = -1;
  while(left <= right) {
    const mid = Math.floor((left + right) / 2)
    if(target < nums[mid]) right = mid - 1;
    else if (target > nums[mid]) left = mid + 1;
    else {
      left = mid + 1;
      rightMost = mid;
    }
  }
  return rightMost
};

function searchRange(nums, target) {
    const rightIndex = findRightMostIndex(nums, target)
    const leftIndex = findLeftmostIndex(nums, target);
    if(rightIndex === -1) {
        return [-1, -1];
    } else {
        return [leftIndex, rightIndex]
  }
};
