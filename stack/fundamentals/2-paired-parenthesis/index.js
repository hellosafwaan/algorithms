const pairedParentheses = (str) => {
  let count = 0;
  for(let i = 0; i < str.length; i++) {
    if(count < 0) return false;
    if(str[i] === '(') count++;
    else if(str[i] === ')') count--;
  }
  return count === 0;
};
