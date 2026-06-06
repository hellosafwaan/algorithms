/**
 * @param {number[]} nums
 * @return {number}
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_] 
 * Explanation: Your function should return k = 2, 
 * with the first two elements of nums being 1 and 2 
 * respectively. 
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 */
function removeDuplicates(nums) {
    const n = nums.length;
    let p1 = 0;
    let p2 = 0;
    while (p2 <= n - 1) {
        const valueAtP1 = nums[p1];
        const valueAtP2 = nums[p2];
        if(valueAtP1 === valueAtP2) {
            p2++
        } else {
            p1++
            nums[p1] = valueAtP2
            p2++
        }
    }

    return p1 + 1;
};

/**
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 * 
 * n = 3
 * p1 = 0
 * p2 = 0
 * 
 * Iteration 1
 * p2 <= n - 1 =>  0 < 2 => true => loop executes
 *  valueAtP1 = 1
 *  valueAtP2 = 1
 *  check valueAtP1 === valueAtP2 => 1 === 1 => true
 *      p2 = 1
 * 
 * Variable State Before Iteration 
 * n = 3
 * p1 = 0
 * p2 = 1
 * 
 * Iteration 2 
 * p2 <= n - 1 => 1 <= 2 => true => loop executes
 *  valueAtP1 = 1
 *  valueAtP2 = 1
 *  check valueAtP1 === valueAtP2 => 1 ===  true
 *      p2 = 2
 * 
 * Variable State Before Iteration 
 * n = 3
 * p1 = 0
 * p2 = 2
 * 
 * Iteration 3
 * p2 <= n - 1 => 2 <= 2 => true => loop executes
 *  valueAtP1 = 1
 *  valueAtP2 = 2
 *  check valueAtP1 === valueAtP2 => 1 === 2 false
 *      else case => 
 *      p1 = 1;
 *      nums = [1, 2, 2]
 *      p2 = 3
 * 
 * Iteration 4 
 *  * p2 <= n - 1 =>32 <= 2 => false => loop terminates
 * 
 */