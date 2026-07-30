const longestUniqueSubstring = (s) => {
  let start = 0;
  const window = {}
  let longestUniqueSubstringSize = 0;
  for(end = 0; end < s.length; end++) {
    const currentChar = s[end];
    if(!(currentChar in window)){
      window[currentChar] = 0;
    }
    window[currentChar] += 1;
    while(window[currentChar] > 1) {
      const startChar = s[start];
      window[startChar] -= 1;
      start++
    }
    const currentWindowSize = end - start + 1
    longestUniqueSubstringSize = Math.max(currentWindowSize, longestUniqueSubstringSize)
  }
  return longestUniqueSubstringSize
};

module.exports = {
  longestUniqueSubstring,
};
