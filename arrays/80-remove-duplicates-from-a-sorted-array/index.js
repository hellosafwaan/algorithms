/**
 * @param {number[]} nums
 * @return {number}
 * Input: nums = [1,1,1,2,2,3]
 * Output: 5, nums = [1,1,2,2,3,_]
 * Explanation: Your function should return k = 5, 
 * with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 */


// Wrong SOLUTION
function removeDuplicates(nums) {
    const n = nums.length;
    let p1 = 0;
    let p2 = 0;
    let totalOccurenceOfValue = 0;
    while (p2 <= n - 1) {
        const valueAtP1 = nums[p1];
        const valueAtP2 = nums[p2];
        if (valueAtP1 === valueAtP2) {
            p2++
            totalOccurenceOfValue++
        } else {
            // if we are here that means we have have a non-duplicate that needs to be arranged
            const duplicateOccurenceOfValue = totalOccurenceOfValue - 1
            if (duplicateOccurenceOfValue >= 2) {
                p1 += 2;
                nums[p1] = valueAtP2
            } else {
                if(totalOccurrenceOfValue == 1) {
                    nums[p1] = valueAtP2
                }
                p1++
                
            }
            p2++
            totalOccurenceOfValue = 1; 
        }
    }
};


// Optimised working solution;
function removeDuplicates(nums) {
    const n = nums.length;
    let p1 = 0;
    let p2 = 0;

    while (p2 < n) {
        const valueAtP2 = nums[p2];
        if (p1 < 2) {
            nums[p1] = valueAtP2
            p2++, p1++
            continue;
        } else {
            if(nums[p1 - 1] === valueAtP2 && nums[p1 - 2] == valueAtP2) {
                p2++
            } else {
                nums[p1] = valueAtP2
                p2++, p1++
            }
        }
    }

    return p1;
}