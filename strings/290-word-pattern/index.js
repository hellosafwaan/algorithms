/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

function wordPattern(pattern, s) {
    const n = pattern.length;
    const patternMap = new Map();
    const sMap = new Map();
    s = s.split(" ");
    if(n !== s.length) return false;
    for (let i = 0; i < n; i++) {
        const pChar = pattern[i];
        const sWord = s[i];
        if(patternMap.has(pChar) && patternMap.get(pChar) !== sWord) return false;
        if(sMap.has(sWord) && sMap.get(sWord) !== pChar) return false;

        patternMap.set(pChar, sWord);
        sMap.set(sWord, pChar);
    }

    return true;
};