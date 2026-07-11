/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */

function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;
    while(i < firstList.length && j < secondList.length) {
        const [s1, e1] = firstList[i];
        const [s2, e2] = secondList[j];
        if(e1 >= s2 && e2 >= s1) result.push([Math.max(s1, s2), Math.min(e1, e2)]);
        if(e1 < e2) i++;
        else j++;
    }
    return result;    
};