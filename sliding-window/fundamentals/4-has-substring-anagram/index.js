const hasSubstringAnagram = (s, anagram) => {
  const k  = anagram.length;
  const windowSet = new Set()
  for (let i = 0; i < k; i++) {
    windowSet.add(s[i]);
  }
  const anagramSet = new Set(anagram);
  if(equalSet(windowSet, anagramSet)) return true;
  for (let i = 0; i < s.length - k; i++) {
    windowSet.delete(s[i]);
    windowSet.add(s[k + i]);
    if(equalSet(windowSet, anagramSet)) return true;
  }
  return false;
  
};

function equalSet(setA, setB) {
  if(setA.size !== setB.size) return false;
  for (elem of setA) {
    if(!setB.has(elem)) return false;
  }
  return true;
}

module.exports = {
  hasSubstringAnagram,
};
