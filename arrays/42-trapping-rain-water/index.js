/**
 * @param {number[]} height
 * @return {number}
 * Example 2:
 * Input: height = [3, 2, 0, 5]
 * Output: 4
 */


/**
 * This is the naive solution, the logic for the naive solution is correct. 
 * we were able to pass 323/324 testcases. 
 * Test case number 323 failed because of a large input array. This was expected 
 * because of the quadratic nature of the algorithm. 
 */
function trap(height) {
    const n = height.length;
    let totalWaterAccumulated = 0;
    for (let i = 0; i < n; i++) {
        // Finding the maximum height to the left of the array
        let leftMaxHeight = -1;
        let leftStartIndex = i - 1
        while (leftStartIndex >= 0) {
            if(height[leftStartIndex] > leftMaxHeight) {
                leftMaxHeight = height[leftStartIndex]
            }
            leftStartIndex--
        }

        let rightMaxHeight = -1;
        let rightStartIndex = i + 1;
        while (rightStartIndex <= n - 1) {
            if(height[rightStartIndex] > rightMaxHeight){
                rightMaxHeight = height[rightStartIndex]
            }
            rightStartIndex++
        }
            let effectiveHeight = Math.min(leftMaxHeight, rightMaxHeight)
            const currentAccumulationAtIndex = effectiveHeight - height[i]
            if (currentAccumulationAtIndex > 0 ) {
                totalWaterAccumulated += currentAccumulationAtIndex
            }
    }

    return totalWaterAccumulated
};


// This is an approach where we make use of the space, but it is not that effective, but it does make the solution come down to an O(n) time complexity. 
function trap(height) {
    const n = height.length;

    const leftMaxHeights = [];
    let lastLeftMaxHeight = 0;

    for (let i = 0; i < n; i++) {
        leftMaxHeights.push(lastLeftMaxHeight)
        const currentHeight = height[i];
        if(currentHeight > lastLeftMaxHeight) lastLeftMaxHeight = currentHeight

    }

    const rightMaxHeights = [];
    let lastRightMaxHeight = 0;

    for (let i = n - 1; i >= 0; i--) {
        rightMaxHeights[i] = lastRightMaxHeight;
        const currentHeight = height[i];
        if(currentHeight > lastRightMaxHeight) lastRightMaxHeight = currentHeight
    }

    let totalAccumulatedWater = 0;
    for (let i = 0; i < n; i++) {
        const effectiveHeight = Math.min(leftMaxHeights[i], rightMaxHeights[i])
        const waterAccumulatedAtIndex = effectiveHeight - height[i]
        if(waterAccumulatedAtIndex > 0) {
            totalAccumulatedWater += waterAccumulatedAtIndex
        }
    }
    return totalAccumulatedWater
}


// This is the two-pointer approach. Without  using any consumption on the space 

function trap(height) {
    const n = height.length
    let leftPointer = 0;
    let rightPointer = n - 1; 
    let leftMax = 0;
    let rightMax = 0;
    let accumulatedWater = 0;
    while (leftPointer <= rightPointer) {
        if (leftMax <= rightMax) {
            leftMax = Math.max(leftMax, height[leftPointer])
            accumulatedWater += leftMax - height[leftPointer]
            leftPointer++
        } else {
            rightMax = Math.max(rightMax, height[rightPointer])
            accumulatedWater += rightMax - height[rightPointer]
            rightPointer--
        }
    }
    return accumulatedWater;
}