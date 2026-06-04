/**
 * @param {number[]} nums
 * @return {number[]}
 */

// Approach 1 - Naive
function sortedSquares(nums) {
    const n = nums.length
    const squared = []
    for (let i = 0; i < n; i++) {
        const result = nums[i] * nums[i];
        squared.push(result)
    }

    /**
     * I don't like that fact that i had to use the inbuilt js sort function 
     * just memorize that (a, b) => (a - b) will sort the array in ascending order.
     * the inbuilt sort function is in-place.
     */

    squared.sort((a, b) => a - b)
    return squared

};

// Approach 2 - Optmised

function sortedSquares(nums) {
    const n = nums.length;
    const squared = [];
    let currentIndex = nums.length - 1;
    let left = 0; right = nums.length - 1;
    while (left <= right) {
        const leftSquared = nums[left] * nums[left];
        const rightSquared = nums[right] * nums[right];
        if(leftSquared > rightSquared) {
            squared[currentIndex] = leftSquared
            currentIndex--
            left++
        } else {
            squared[currentIndex] = rightSquared
            currentIndex--
            right--
        }

    }
    return squared
}



/**
 * Input nums  = [-1, 2, 3]
 * 
 * n = 3
 * squared = []
 * currentIndex = 2
 * left = 0
 * right = 2
 * 
 * Iterations
 * 
 * left <= right => 0 < 2 => true => while loop executes
 * leftSquared = nums[left] * nums[left] => nums[0] * nums[0] => -1 * -1 => 1 => leftSquared = 1
 * rightSquared = nums[right] * nums[right] => nums[2] * nums[2] => 3 * 3 => 9 => rightSquared = 9
 * leftSquared > rightSquare => 1 > 9 => false
 *   squared = [9]
 *   currentIndex = 1    
 *   right = 1
 * 
 * left <= right => 0 < 1 => true => while loop executes
 * leftSquared = nums[left] * nums[left] => nums[0] * nums[0] => -1 * -1 => 1 => leftSquared = 1
 * rightSquared = nums[right] * nums[right] => nums[1] * nums[1] => 2 * 2 => 4 => rightSquared = 4
 * leftSquared > rightSquare => 1 > 4 => false
 *   squared = [4, 9]
 *   currentIndex = 0    
 *   right = 0
 * 
 * left <= right => 0 <= 0 => true => while loop executes
 * leftSquared = nums[left] * nums[left] => nums[0] * nums[0] => -1 * -1 => 1 => leftSquared = 1
 * rightSquared = nums[right] * nums[right] => nums[0] * nums[0] => -1 * -1 => 1 => leftSquared = 1
 * leftSquared > rightSquare => 1 > 4 => false
 *   squared = [1, 4, 9]
 *   currentIndex = -1    
 *   right = -1
 * 
 */
