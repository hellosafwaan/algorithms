/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// Naive Solution -> Using nested loops
function twoSum(nums, target) {
    n = nums.length
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = nums[i] + nums[j]
            if(sum === target) return [i, j]
            
        }
        
    }
};

// Optimized Solution Using Hash Map

function twoSum(nums, target) {
    const complements = new Map()
    let n = nums.length
    for (let i = 0; i < n; i++) {
        const differnce = target - nums[i]
        if(complements.has(nums[i])) {
            return [complements.get(nums[i]), i]
        }
        complements.set(differnce, i)
    }
}