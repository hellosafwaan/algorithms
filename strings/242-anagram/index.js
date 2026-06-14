/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */


function isAnagram(s, t) {
    const sMap = {};
    const tMap = {};

    const sLength = s.length;
    const tLength = t.length;

    if(sLength !== tLength) return false;

    for (let i = 0; i < s.length; i++) {
        const currSChar = s[i]
        if(sMap[currSChar] !== undefined) sMap[currSChar] += 1
        else sMap[currSChar] = 1

        const currTChar = t[i]
        if(tMap[currTChar] !== undefined) tMap[currTChar] += 1
        else tMap[currTChar] = 1
    }

    for (let i = 0; i < s.length; i++) {
        const currChar = s[i];
        if(sMap[currChar] !== tMap[currChar]) return false;
    }

    return true;
};


function isAnagram(s, t) {
    const occurence = {};

    const sLength = s.length;
    const tLength = t.length;

    if(sLength !== tLength) return false;

    for (let i = 0; i < s.length; i++) {
        const currSChar = s[i]
        if(occurence[currSChar] !== undefined) occurence[currSChar] += 1
        else occurence[currSChar] = 1

        const currTChar = t[i]
        if(occurence[currTChar] !== undefined) occurence[currTChar] -= 1
         else occurence[currTChar] = -1
    }

    const occurenceKeys = Object.keys(occurence);
    for (let i = 0; i < occurenceKeys.length; i++) {
        const currKey = occurenceKeys[i];
        if( occurence[currKey] !== 0) return false;
    }

    return true;
};