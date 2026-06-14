/**
 * @param {string} s
 * @return {number}
 */


// This soultion is wrong -> 
function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    const subString = "";
    const n = s.length;
    let runningLength = 0;
    for (let i = 0; i < n; i++) {
        const currentCharacter = s[i];
        if(subString.includes(currentCharacter)) {
            maxLength = Math.max(runningLength, maxLength)
            subString = "";
            runningLength = 0;
        }
        else {
            subString += currentCharacter
            runningLength++
        }
    }
    return maxLength;
};

// This is naive solution


function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let subString = "";
    const n = s.length;
    for (let i = 0; i < n; i++) {
        const currentCharacter = s[i];
        if(subString.includes(currentCharacter)) {
            const duplicateIndex = subString.indexOf(currentCharacter);
            subString = subString.slice(duplicateIndex + 1);
            subString += currentCharacter
            maxLength = Math.max(subString.length, maxLength);
        }
        else {
            subString += currentCharacter
            maxLength = Math.max(subString.length, maxLength);
        }
    }
    return maxLength;
};


// The Optimised solution
function lengthOfLongestSubstring(s) {
    const map = {};
    const n = s.length;
    let left = 0;
    let maxLength = 0;
    for (let i = 0; i < n; i++) {
        const currentElement = s[i];
        let currentWindowSize;
        if(map[currentElement] === undefined) {
            map[currentElement] = i;
            currentWindowSize = (i - left) + 1
            maxLength = Math.max(maxLength, currentWindowSize);
        } else {
            left = Math.max(left ,map[currentElement] + 1);
            map[currentElement] = i;
            currentWindowSize = (i - left) + 1
            maxLength = Math.max(maxLength, currentWindowSize);
        }
    }
    return maxLength;
}