function countSubstringAtMostKDistinct(s, k){
  let start = 0;
  let count = 0;
  const counter = new Map();
  for(let end = 0; end < s.length; end++) {
    const currentElement = s[end];
    if(counter.has(s[end])) counter.set(currentElement, counter.get(currentElement) + 1);
    else counter.set(currentElement, 1);

    while(counter.size > k) {
      const startElement = s[start];
      counter.set(startElement, counter.get(startElement) - 1);
      if(counter.get(startElement) <= 0) counter.delete(startElement);
      start++;
    }

    count += end - start + 1;
  }
  return count;
  
};

module.exports = {
  countSubstringAtMostKDistinct,
};
