/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1
    s = s.toLowerCase();
    while (left < right) {
        while(left < right && !/^[a-z0-9]$/.test(s[left])) left += 1
        while(left < right && !/^[a-z0-9]$/.test(s[right])) right -= 1
        if(s[left] !== s[right]) return false
        left += 1
        right -= 1
    }
    return true
};

/**
 * This problem got lil tricky because of the addition of non-alphanumberic characters.
 * Otherwise it would have been a clean solution. Need-to comeback on this
 */