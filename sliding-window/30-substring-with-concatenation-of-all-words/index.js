/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 * Input: s = "barfoothefoobarman", words = ["foo","bar"]
 * Output: [0,9]
 */


// Wrong idea
function findSubstring(s, words) {
    const concatenatedStr = words.join("")
    const counter = new Map()
    for (let i = 0; i < concatenatedStr.length; i++) {
        const currChar = concatenatedStr[i];
        if (!counter.has(currChar)) counter.set(currChar, 1)
        else counter.set(currChar, counter.get(currChar) + 1)
    }
    console.log(counter)
    const window_counter = new Map()
    for (let i = 0; i < concatenatedStr.length; i++) {
        const currChar = concatenatedStr[i];
        if (!window_counter.has(currChar)) window_counter.set(currChar, 1)
        else window_counter.set(currChar, window_counter.get(currChar) + 1)
    }
    console.log(window_counter)
};

function isMapsEqual(a, b) {
    if(a.size !== b.size) return false;
    for(let [key, value] of a) {
        if(b.get(key) !== value) return false;
    }
    return true;
}
function findSubstring(s, words) {
    const wordFreq = new Map()
    for (let i = 0; i < words.length; i++) {
        const currWord = words[i];
        if(!wordFreq.has(currWord)) wordFreq.set(currWord, 1)
        else wordFreq.set(currWord, wordFreq.get(currWord) + 1)
    }

    const windowFreq = new Map()
    const wordLen = words[0].length
    const k = words.length * wordLen // k is the window size

    const result =  []
    for (let i = 0; i < s.length - k + 1; i++) {
        windowFreq.clear()
        for (let j = 0; j < words.length; j++) {
            const start =  i + j * wordLen
            const end = start + wordLen
            const currWord = s.substring(start, end)
            if(!windowFreq.has(currWord)) windowFreq.set(currWord, 1)
            else windowFreq.set(currWord, windowFreq.get(currWord) + 1)
        }
        if(isMapsEqual(wordFreq, windowFreq)) result.push(i)
    }
    return result;
}

findSubstring('barfoothefoobarman', ["foo", "bar"])