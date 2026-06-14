/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * Input: s = "egg", t = "add"
 * Output: true
 * Explanation:
 * The strings s and t can be made identical by:
 * Mapping 'e' to 'a'.
 * Mapping 'g' to 'd'.
 */


// Wrong Solution
function isIsomorphic(s, t) {
    const n = s.length;
    const map = new Map()
    for (let i = 0; i < n; i++) {
        const currentSChar = s[i];
        const currentTChar = t[i];

        if(map.has(currentSChar)) {
            if(map.get(currentSChar) === currentTChar) {
                continue;
            } else {
                return false;
            }
        } else {
            map.set(currentSChar, currentTChar)
            map.set(currentTChar, currentSChar)
        }
    }
    return true;
};

// Wrong Solution
function isIsomorphic(s, t) {
    const n = s.length;
    const map = new Map()
    for (let i = 0; i < n; i++) {
        const currentSChar = s[i];
        const currentTChar = t[i];

        if(map.has(currentSChar)) {
            if(map.get(currentSChar) === currentTChar) {
                continue;
            } else {
                return false;
            }
        } else {
            if(map.has(currentTChar)) return false;
            else {
                map.set(currentSChar, currentTChar)
                map.set(currentTChar, currentSChar)
            }
        }   
        console.log(map)
    }
    return true;
};


// Working Solution
function isIsomorphic(s, t) {
    const n = s.length;
    const sMapping = new Map()
    const tMapping = new Map()
    for (let i = 0; i < n; i++) {
        const currentSChar = s[i]
        const currentTChar = t[i]

        if(sMapping.has(currentSChar)) {
            if(sMapping.get(currentSChar) === currentTChar) {
                continue;
            } else {
                return false;
            }
        }

        if(tMapping.has(currentTChar)) {
            if(tMapping.get(currentTChar) === currentSChar) {
                continue;
            } else {
                return false;
            }
        }
        sMapping.set(currentSChar, currentTChar)
        tMapping.set(currentTChar, currentSChar)

    }

    return true;
};
