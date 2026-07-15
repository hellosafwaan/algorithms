const befittingBrackets = (str) => {
  const stack = [];
  const brackets = {
    '(': ')',
    '[': ']',
    '{': '}'
  };

  for(char of str) {
    if(char in brackets) stack.push(brackets[char]);
    else {
      if(stack.length > 0 && stack[stack.length - 1] === char) stack.pop()
      else return false;
    }
  }
  return stack.length === 0;
};