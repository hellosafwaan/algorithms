/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 *
 * Note: the version without `&& start <= end` on the while loop was Accepted by LeetCode
 * despite being wrong (returns negative counts once `start` overshoots `end`, e.g.
 * nums=[7,2,7,8,6], k=1 gives -4 instead of 0). Found via stress-testing against a
 * brute-force reference, not by LeetCode's own test suite — see learnings.md.
 */
function numSubarrayProductLessThanK(nums, k) {
    let answer = 0;
    let start = 0;
    let windowProduct = 1;
    for(let end = 0; end < nums.length; end++) {
        const currentElement = nums[end];
        windowProduct *= currentElement

        while(windowProduct >= k && start <= end) {
            const startElement = nums[start];
            windowProduct /= startElement;
            start++
        }

        if(windowProduct < k) {
            answer += end - start + 1;
        };
    }
    return answer
};