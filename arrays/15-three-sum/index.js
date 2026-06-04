/**
 * @param {number[]} nums
 * @return {number[][]}
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 */


// Naive solution that exceeded timelimit
function threeSum(nums) {
    const n = nums.length;
    const result = new Set()
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n ; j++) {
            for (let k = j + 1; k < n; k++) {
                const tripletSum = nums[i] + nums[j] + nums[k]
                if (tripletSum === 0) {
                    const triplet = [nums[i],nums[j],nums[k]]
                    triplet.sort((a, b) => a - b)
                    result.add(`${triplet[0]},${triplet[1]},${triplet[2]}`)
                }
            }
        }
    }

    return Array
        .from(result)
        .map((triplet) => {
            return triplet
                .split(',')
                .map(value => Number(value))
        })
};


// Optimised solution - run 1

function threeSum(nums) {
    nums.sort((a, b) => a - b)
    const n = nums.length;
    const result = new Set();
    for (let i = 0; i < n; i++) {
        let left = i + 1
        let right = n - 1
        const target = -nums[i]
        let triplet = [nums[i]]
        while (left < right) {
            const leftValue = nums[left]
            const rightValue = nums[right]
            const sum = leftValue + rightValue
            if(sum > target) {
                right--
            } else if (sum < target) {
                left++
            } else {
                triplet.push(leftValue, rightValue)
                triplet.sort((a, b) => a - b)
                result.add(`${triplet[0]},${triplet[1]},${triplet[2]}`)
                triplet = [nums[i]]
                right--
                left++
            }
        }

    }
    return Array
        .from(result)
        .map((triplet) => {
            return triplet
                .split(',')
                .map(value => Number(value))
        })
}



// Optimised approach run 2
function threeSum(nums) {
    nums.sort((a, b) => a - b)
    const n = nums.length;
    const result = []
    for (let i = 0; i < n; i++) {
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1
        let right = n - 1
        const target = -nums[i]
        while (left < right) {
            const sum = nums[left] + nums[right]
            if(sum > target) {
                right--
            } else if (sum < target) {
                left++
            } else {
                result.push([nums[i], nums[left], nums[right]])
                right--
                left++
                while (left < right && nums[left] === nums[left - 1]) left++
                while (left < right && nums[right] === nums[right + 1]) right--
            }
        }
    }
    return result
}