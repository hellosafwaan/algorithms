/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
    let nums1Pointer = m - 1
    let nums2Pointer = n - 1
    let currentIndex = m + n - 1
    while (nums2Pointer >= 0) {
        const nums1PointerValue = nums1[nums1Pointer]
        const nums2PointerValue = nums2[nums2Pointer]

        if(nums1PointerValue >= nums2PointerValue) {
            nums1[currentIndex] = nums1PointerValue
            currentIndex--
            nums1Pointer--
        } else {
            nums1[currentIndex] = nums2PointerValue
            currentIndex--
            nums2Pointer--
        }
    }
    return nums1
};

/**
 * nums1 = [1, 2, 3, 0, 0, 0], m = 3
   nums2 = [2, 5, 6],           n = 3

Iteration 1
Variable State
    nums1 = [1, 2, 3, 0, 0, 0]
    nums2 = [2, 5, 6]
    nums1Pointer = 2
    nums2Pointer = 2
    currentIndex = 5

    nums2Pointer >= 0 => 2 >= 0 true (loop executes)
        nums1PointerValue = 3
        nums2PointerValue = 6
        nums1PointerValue >= nums2PointerValue => 3 >= 6 => false
            Inside Else Block Or Alternate Block
            nums1 = [1, 2, 3, 0, 0 , 6]
            currentIndex = 4
            nums2Pointer = 1

Iteration 2
Variable State
    nums1Pointer = 2
    nums2Pointer = 1
    currentIndex = 4
    nums1 = [1, 2, 3, 0, 0 , 6]
    nums2 = [2, 5, 6]

    nums2Pointer >= 0 =>    1 >= 0 true (loop executes)
        nums1PointerValue = 3
        nums2PointerValue = 5
        nums1PointerValue >= nums2PointerValue => 3 >= 5 => false
            Inside Else Block Or Alternate Block
            nums1 = [1, 2, 3, 0, 5 , 6]
            currentIndex = 3
            nums2Pointer = 0

Iteration 3
Variable State
    nums1Pointer = 2
    nums2Pointer = 0
    currentIndex = 3
    nums1 = [1, 2, 3, 0, 5 , 6]
    nums2 = [2, 5, 6]

    nums2Pointer >= 0 =>    0 >= 0 true (loop executes)
        nums1PointerValue = 3
        nums2PointerValue = 2
        nums1PointerValue >= nums2PointerValue => 3 >= 2 => true
            Inside If Block Or Consequent Block
            nums1 = [1, 2, 3, 3, 5 , 6]
            currentIndex = 2
            nums1Pointer = 1

Iteration 4
Variable State
    nums1Pointer = 1
    nums2Pointer = 0
    currentIndex = 2
    nums1 = [1, 2, 3, 3, 5 , 6]
    nums2 = [2, 5, 6]

    nums2Pointer >= 0 =>    0 >= 0 true (loop executes)
        nums1PointerValue = 2
        nums2PointerValue = 2
        nums1PointerValue >= nums2PointerValue => 2 >= 2 => true
            Inside If Block Or Consequent Block
            nums1 = [1, 2, 2, 3, 5 , 6]
            currentIndex = 1
            nums1Pointer = 0

Iteration 5
Variable State
    nums1 = [1, 2, 2, 3, 5 , 6]
    nums2 = [2, 5, 6]
    nums1Pointer = 0
    nums2Pointer = 0
    currentIndex = 1

    nums2Pointer >= 0 =>    0 >= 0 true (loop executes)
        nums1PointerValue = 1
        nums2PointerValue = 2
        nums1PointerValue >= nums2PointerValue => 1 >= 2 => false
            Inside Else Block Or Alternate Block
            nums1 = [1, 2, 2, 3, 5 , 6]
            currentIndex = 0
            nums2Pointer = -1

Iteration 6 doesn't happend because nums2Pointer is < 0, so the
loop condition fails and we exit the loop and we return
...
 */