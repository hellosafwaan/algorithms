/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const anagrams = {};
    const n = strs.length
    for (let i = 0; i < n; i++) {
        const currentElement = strs[i];
        const sortedCurrentElement = currentElement.split("").sort().join("");

        if(anagrams[sortedCurrentElement] !== undefined) {
            anagrams[sortedCurrentElement].push(currentElement)
        } else {
            anagrams[sortedCurrentElement] = [currentElement]
        }
    }

    // const result = [];
    // const keys = Object.keys(anagrams);
    // for (let i = 0; i < keys.length; i++) {
    //     result.push(anagrams[keys[i]])
    // }
    // return result;

    // This is the better logic, you just did not know how to use Object.values

    return Object.values(anagrams);
};