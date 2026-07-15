const reverseSomeChars = (str, chars) => {
  const targetChars = new Set(chars);
  const stack = [];
  for (let char of str) {
    if(targetChars.has(char)) stack.push(char);
  };
  const result = [];
  for(let char of str) {
    if(targetChars.has(char)) result.push(stack.pop());
    else result.push(char);
  }
  return result.join('');
};
