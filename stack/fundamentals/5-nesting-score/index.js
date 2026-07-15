const nestingScore = (str) => {
  const stack = [0];
  for(let char of str) {
    if(char === '[') stack.push(0);
    else {
      const popped = stack.pop();
      if(popped === 0) {
        stack[stack.length - 1] += 1;
      } else {
        stack[stack.length - 1] += popped * 2
      }
    }
  }
  return stack[0]
};