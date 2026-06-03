/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */


/**
 * This is the naive solution that we did for the 2 sum, just with a small difference of adding by increasing the index by one. 
 */
function twoSum(nums, target) {
    n = nums.length
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = nums[i] + nums[j]
            if(sum === target) return [i + 1, j + 1]
            
        }
        
    }
};


/**
 * This was the first solution I wrote. Due to three different 
 * if checks which will be executed at runtime, 
 * I was at the 60th percentile, so if checks really do matter. 
 */

function twoSum(nums, target) {
    let left = 0;
    let right = nums.length - 1
    while (left < right) {
        const sum = nums[left] + nums[right]
        if (sum > target) right--
        if (sum < target) left++
        if (sum === target) return [left + 1, right + 1]
    }
}

/** 
*  This is the optimal solution using a two-pointer approach. 
*  The solution gave me the 100th percentile. 
*/

function twoSum(nums, target) {
    let left = 0;
    let right = nums.length - 1
    while (left < right) {
        const sum = nums[left] + nums[right]
        if(sum > target) {
            right--
        } else if (sum < target) {
            left++
        } else {
            return [left + 1, right + 1]
        }
    }
}