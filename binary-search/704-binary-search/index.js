/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    while(low <= high) {
        const mid = Math.floor((low + high)/ 2);
        if(target > nums[mid]) low = mid + 1;
        else if (target < nums[mid]) high = mid - 1;
        else return mid;
    }
    return -1;
};
