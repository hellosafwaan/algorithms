/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

function findAnagrams(s, p) {
    const k = p.length;
    const windowMap = new Map();

    for (let i = 0; i < k; i++) {
        const elem = s[i];
        if(windowMap.has(elem)) windowMap.set(elem, windowMap.get(elem) + 1);
        else windowMap.set(elem, 1);
    }

    const pMap = new Map();
    for (let i = 0; i < k; i++) {
        const elem = p[i];
        if(pMap.has(elem)) pMap.set(elem, pMap.get(elem) + 1);
        else pMap.set(elem, 1);
    }
    
    const answer = []
    if(isSameMap(windowMap, pMap)) answer.push(0)

    for(let i = 0; i < s.length - k; i++) {
        const startElement = s[i];
        windowMap.set(startElement, windowMap.get(startElement) - 1)
        if(windowMap.get(startElement) === 0) windowMap.delete(startElement)

        const endElement = s[i + k];
        if(windowMap.has(endElement)) windowMap.set(endElement, windowMap.get(endElement) + 1);
        else windowMap.set(endElement, 1);
        if(isSameMap(windowMap, pMap)) answer.push(i + 1)
    }
    return answer
}

function isSameMap(mapA, mapB){
    if (mapA.size !== mapB.size) return false;
    for(let key of mapB.keys()) {
        if(mapA.get(key) !== mapB.get(key)) return false
    }
    return true;
}