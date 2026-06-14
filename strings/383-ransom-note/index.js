/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
function canConstruct(ransomNote, magazine) {
    const n = magazine.length
    const m = ransomNote.length

    const counts = new Map();
    for (let i = 0; i < m; i++) {
        const currentElement = ransomNote[i];
        if(counts.has(currentElement)) {
            counts.set(currentElement, counts.get(currentElement) + 1);
        } else {
            counts.set(currentElement, 1);
        }
    }

    for (let i = 0; i < n; i++) {
        const currentElement = magazine[i];
        if (counts.has(currentElement) && counts.get(currentElement) > 0){
            counts.set(currentElement, counts.get(currentElement) - 1);
        }
    }

    for (const elem of counts) {
        const char = elem[0];
        const value = elem[1];
        if(value > 0) return false
    }
    return true;
};