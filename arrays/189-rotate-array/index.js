/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 *
 * Input: nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 */

// Brute force — pop from end, unshift to front, k times. TLE — each unshift is
// O(n), called k times => O(n*k).
function rotateBruteForce(nums, k) {
    for (let i = 0; i < k; i++) {
        const element = nums.pop();
        nums.unshift(element);
    }
}

// Extra array — map each index i to its final index (i+k)%n, write into a new
// array, copy back. O(n) time, O(n) space. (Submitted, accepted, 1ms / 83.91st pct)
function rotate(nums, k) {
    const n = nums.length;
    const rotatedArray = [];
    for (let i = 0; i < n; i++) {
        const newIndex = (i + k) % n;
        rotatedArray[newIndex] = nums[i];
    }
    for (let i = 0; i < n; i++) {
        nums[i] = rotatedArray[i];
    }
}

// Three reversals — reverse the whole array, then the first k, then the rest.
// O(n) time, O(1) space.
function rotateThreeReversals(nums, k) {
    const n = nums.length;
    k = k % n;
    reverseRange(nums, 0, n - 1);
    reverseRange(nums, 0, k - 1);
    reverseRange(nums, k, n - 1);
}

function reverseRange(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}

// Cyclic replacements — follow the index chain i -> (i+k)%n, carrying one
// value at a time; restart from the next unvisited index if a chain doesn't
// cover every element. O(n) time, O(1) space.
function rotateCyclic(nums, k) {
    const n = nums.length;
    k = k % n;
    if (k === 0) return;

    let movedCount = 0;
    for (let start = 0; movedCount < n; start++) {
        let current = start;
        let carrying = nums[start];
        do {
            const dest = (current + k) % n;
            const saved = nums[dest];
            nums[dest] = carrying;
            carrying = saved;
            current = dest;
            movedCount++;
        } while (current !== start);
    }
}
