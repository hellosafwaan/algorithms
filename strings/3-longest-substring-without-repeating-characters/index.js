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

// Cold Redo (2026-08-04) — frequency-count + while-shrink, instead of the last-seen-index
// jump above. Answers this file's own June "Open Questions": yes, this can be done with a
// Map-based count (not a Set) using the same while-loop shrink shape as the fundamentals
// module's longestUniqueSubstring. See learnings.md "Cold Redo" section for the bugs hit
// along the way (return placed inside the for loop; decrementing only the current element
// instead of whatever character was actually leaving the window).
function lengthOfLongestSubstring(s) {
    const windowMap = new Map();
    let start  = 0;
    let longestStringLen = 0;

    for (let end = 0; end < s.length; end++) {
        const currentElement = s[end];

        if(windowMap.has(currentElement)) {
            windowMap.set(currentElement, windowMap.get(currentElement) + 1);
        } else {
            windowMap.set(currentElement, 1);
        }

        while(windowMap.get(currentElement) > 1) {
            const startElement = s[start];
            windowMap.set(startElement, windowMap.get(startElement) - 1);
            if(windowMap.get(startElement) === 0) windowMap.delete(startElement);
            start++
        }

        const currentStringLength = end - start + 1;
        longestStringLen = Math.max(currentStringLength, longestStringLen);

    }
    return longestStringLen;
}