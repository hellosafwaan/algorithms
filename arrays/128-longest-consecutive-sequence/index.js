/**
 * @param {number[]} nums
 * @return {number}
 */

function longestConsecutive(nums) {
    const seen = new Set();
    const n = nums.length;

    if (n === 0) return 0;

    for (let i = 0; i < n; i++) {
        seen.add(nums[i]);
    }

    let maxSequenceCount = 0;
    let runningSequenceCount = 0;
    let startingSequenceElement;
    for (const elem of seen) {
        if(!seen.has(elem - 1)) {
            startingSequenceElement = elem
            runningSequenceCount++
            while (seen.has(startingSequenceElement + 1)) {
                runningSequenceCount++
                startingSequenceElement = startingSequenceElement + 1;
            }
            maxSequenceCount = Math.max(runningSequenceCount, maxSequenceCount)
            runningSequenceCount = 0;

        }
    }
    return maxSequenceCount
};

/**
 * This is much better to read the cleaned up my variables names by ai
 * Need to practice think like this. The style of writing algorithms
 */

function longestConsecutive(nums) {
    if (nums.length === 0) return 0;

    const seen = new Set(nums);
    let maxCount = 0;

    for (const num of seen) {
        if (!seen.has(num - 1)) {
            let curr = num;
            let count = 1;
            while (seen.has(curr + 1)) {
                curr++;
                count++;
            }
            maxCount = Math.max(count, maxCount);
        }
    }

    return maxCount;
}