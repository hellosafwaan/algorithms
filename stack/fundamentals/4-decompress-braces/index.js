const decompressBraces = (s) => {
  const numberChars = '123456789'
  const stack = [];
  for(let char of s) {
    if(numberChars.includes(char)){
      stack.push(Number(char));
    } else {
      if(char === '}') {
        let segment = '';
        while(typeof stack[stack.length - 1] !== 'number') {
          const popped = stack.pop();
          segment = popped + segment;
        }
        const num = stack.pop();
        stack.push(repeat(segment, num));
      } else if(char !== '{') {
        stack.push(char);
      }
    }
  }
  return stack.join('')
};

function repeat(str, n) {
  let result = '';
  for(let i = 0; i < n; i++) {
    result += str;
  }
  return result;
}
