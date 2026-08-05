/**
 * @param {number[]} fruits
 * @return {number}
 */
function totalFruit(fruits) {
    let windowMap = new Map();
    let start = 0;
    let maxNoOfFruits = -Infinity;

    for(let end = 0; end < fruits.length; end++) {
        const currentElement = fruits[end];
        if(windowMap.has(currentElement)) windowMap.set(currentElement, windowMap.get(currentElement) + 1)
        else windowMap.set(currentElement, 1)

        while(windowMap.size > 2) {
            const startElement = fruits[start];
            windowMap.set(startElement, windowMap.get(startElement) - 1)
            if(windowMap.get(startElement) === 0) windowMap.delete(startElement)
            start++
        }
        let currentNoOfFruitsInWindow = 0;
        for(let key of windowMap.keys()) {
            currentNoOfFruitsInWindow += windowMap.get(key)
        }
        maxNoOfFruits = Math.max(currentNoOfFruitsInWindow, maxNoOfFruits)
    }
    return maxNoOfFruits;
};