const countSubstringAnagrams = (s, anagram) => {
  const k = anagram.length;
  const windowMap = new Map();
  for(let i = 0; i < k; i++) {
    const elem = s[i];
    if(windowMap.has(elem)) windowMap.set(elem, windowMap.get(elem) + 1);
    else windowMap.set(elem, 1);
  }

  const anagramMap = new Map();
  let count = 0;
  for(let i = 0; i < k; i++) {
    const elem = anagram[i];
    if(anagramMap.has(elem)) anagramMap.set(elem, anagramMap.get(elem) + 1);
    else anagramMap.set(elem, 1);
  }
  if(isEqualFrequencyInMap(windowMap, anagramMap)) count++;

  for(let i = 0; i < s.length - k; i++) {
    // Remove the element from the start of the window
    const startElement = s[i];
    windowMap.set(startElement, windowMap.get(startElement) - 1);
    if(windowMap.get(startElement) <= 0) windowMap.delete(startElement);

    // Add the element to the end of the window
    const endElement = s[k + i];
    if(windowMap.has(endElement)) windowMap.set(endElement, windowMap.get(endElement) + 1);
    else windowMap.set(endElement, 1);

    if(isEqualFrequencyInMap(windowMap, anagramMap)) count++
  }
  return count;
  
};

function isEqualFrequencyInMap(map1, map2) {
  if(map1.size !== map2.size) return false;
  for (const [key, value] of map2) {
    if (map1.get(key) !== value) return false;
  }
  return true;
}
// function isEqualFrequencyInMap(map1, map2) {
//   if(map1.size !== map2.size) return false;
//   for(let key of map2.keys()) {
//     if(!map1.has(key)) return false;
//     if(map1.get(key) !== map2.get(key)) return false;
//   }
//   return true;
// }

module.exports = {
  countSubstringAnagrams,
};
