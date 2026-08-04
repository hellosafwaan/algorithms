/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 
function checkInclusion(s1, s2) {
    const k = s1.length;
    const windowMap = new Map();

    for (let i = 0; i < k; i++) {
        const elem = s2[i];
        if(windowMap.has(elem)) windowMap.set(elem, windowMap.get(elem) + 1);
        else windowMap.set(elem, 1);
    }

    const s1Map = new Map();
    for (let i = 0; i < k; i++) {
        const elem = s1[i];
        if(s1Map.has(elem)) s1Map.set(elem, s1Map.get(elem) + 1);
        else s1Map.set(elem, 1);
    }

    if(isSameMap(windowMap, s1Map)) return true;

    for(let i = 0; i < s2.length - k; i++) {
        const startElement = s2[i];
        windowMap.set(startElement, windowMap.get(startElement) - 1)
        if(windowMap.get(startElement) === 0) windowMap.delete(startElement)

        const endElement = s2[i + k];
        if(windowMap.has(endElement)) windowMap.set(endElement, windowMap.get(endElement) + 1);
        else windowMap.set(endElement, 1);
        if(isSameMap(windowMap, s1Map)) return true
    }
    return false
}

function isSameMap(mapA, mapB){
    if (mapA.size !== mapB.size) return false;
    for(let key of mapB.keys()) {
        if(mapA.get(key) !== mapB.get(key)) return false
    }
    return true;
}