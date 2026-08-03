/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
function numOfSubarrays(arr, k, threshold) {
    let count = 0;
    let currentSum = 0;
    for(let i = 0; i < k; i++) {1
        currentSum += arr[i]
    }
    let currentAverage = currentSum / k; 
    if(currentAverage >= threshold) count++;
    for(let i = 0; i < arr.length - k; i++) {
        currentSum = currentSum - arr[i] + arr[i + k];
        currentAverage = currentSum / k;
        if(currentAverage >= threshold) count++;
    }
    return count;
};