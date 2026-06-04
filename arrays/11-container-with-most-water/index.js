/**
 * @param {number[]} height
 * @return {number}
 * Sample Inputs
 *  height = [1,8,6,2,5,4,8,3,7]
 *  result = 49
 */
function maxArea(height) {
    const n = height.length
    let overallMaxArea = -1
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const breadth = j - i
            const leftEndHeight = height[i]
            const rightEndHeight = height[j]
            let effectiveHeight;
            if(leftEndHeight < rightEndHeight) {
                effectiveHeight = leftEndHeight
            } else {
                effectiveHeight = rightEndHeight
            }
            const resultantArea = breadth * effectiveHeight

            if(resultantArea > overallMaxArea) {
                overallMaxArea = resultantArea
            }
        }
    }
    return overallMaxArea
}


// Optimised Solution First go.
function maxArea(height) {
    const n = height.length; 
    let overallMaxArea = -1; 
    let left = 0; 
    let right = n - 1;

    while(left < right) {
        const breadth = right - left
        const leftEndHeight = height[left]
        const rightEndHeight = height[right]
        let effectiveHeight;
        if(leftEndHeight < rightEndHeight) {
            effectiveHeight = leftEndHeight;
        } else {
            effectiveHeight = rightEndHeight;
        }
        const resultantArea = breadth * effectiveHeight;

        if(resultantArea > overallMaxArea) overallMaxArea = resultantArea

        /**
        Deciding how to move the pointers.
        The effective height of the container 
        is always going to be the short height. 
        So we move that. Because There is 
        possibility by moving this we can get a 
        higher area value. If we were to move the 
        pointer that has higger height, There will 
        be gurantee that area will get smaller. Because 
        we are decreasing the width by 1 and the effective 
        height will be the smallest one. so each time 
        we move the pointer, we keep decreasing the width, 
        without changing the height that will result always 
        in a smaller area.
         */

        // This logic can moved above because the same check is there.
        if(leftEndHeight < rightEndHeight) {
            left++
        } else {
            right--
        }
    }

    return overallMaxArea
}

// Optimised solution - Final

function maxArea(height) {
    const n = height.length; 
    let overallMaxArea = 0; 
    let left = 0; 
    let right = n - 1;

    while(left < right) {
        const breadth = right - left
        const leftEndHeight = height[left]
        const rightEndHeight = height[right]
        let effectiveHeight;
        if(leftEndHeight < rightEndHeight) {
            effectiveHeight = leftEndHeight;
            left++
        } else {
            effectiveHeight = rightEndHeight;
            right--
        }
        const resultantArea = breadth * effectiveHeight;
        if(resultantArea > overallMaxArea) overallMaxArea = resultantArea
    }

    return overallMaxArea
}