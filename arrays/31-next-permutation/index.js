// [1, 3, 5, 4, 2]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    const n = nums.length
    let pivotAvailable = false
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivotAvailable = true
            for (let j = n  - 1; j > i; j--) {
                if(nums[j] > nums[i]) {
                    const temp = nums[i]
                    nums[i] = nums[j]
                    nums[j] = temp
                    break;
                }
            }
            let left = i + 1
            let right = n - 1
            while (left < right) {
                const temp = nums[left]
                nums[left] = nums[right]
                nums[right] = temp
                left += 1
                right -= 1
            }
            break;
        }
    }
    if (!pivotAvailable) {
        let left = 0;
        let right = n - 1;
        while(left < right) {
            const temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
            left += 1
            right -= 1
        }
}
    return nums
};