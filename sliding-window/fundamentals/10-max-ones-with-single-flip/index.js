const maxOnesWithSingleFlip = (s) => {
  let start = 0;
  let streak = 0;
  let zeroUsed = false;
  for(let end = 0; end < s.length; end++){
    const currentChar = s[end];
    if(currentChar === '0') {
    while (zeroUsed) {
      if (s[start] === '0') zeroUsed = false;
      start++;
    }
    zeroUsed = true;
    }

    const currentWindow = end - start + 1;
    streak = Math.max(streak, currentWindow);
  }
  return streak;
};

module.exports = {
  maxOnesWithSingleFlip,
};
