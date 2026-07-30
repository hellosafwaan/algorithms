const longestTwoCharSubstring = (s) => {
  let start  = 0;
  let counter = new Map();
  let longestSubstring = 0;
  for(let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    if(!counter.has(currentChar)) counter.set(currentChar, 1);
    else counter.set(currentChar, counter.get(currentChar) + 1);

    while(counter.size > 2) {
      const startingChar = s[start];
      counter.set(startingChar, counter.get(startingChar) - 1);
      if(counter.get(startingChar) === 0) counter.delete(startingChar);
      start++
    }
    if(counter.size === 2) {
      const currentWindowSize = end - start + 1;
      longestSubstring = Math.max(longestSubstring, currentWindowSize);
    }
  }
  return longestSubstring;
};

module.exports = {
  longestTwoCharSubstring,
};
