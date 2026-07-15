/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function(s) {
    const stack = [0];
    for(let i = 0; i < s.length; i++) {
        const char = s[i];
        if(char === '(') stack.push(0);
        else {
            const popped = stack.pop();
            if(popped === 0) stack[stack.length - 1] += 1;
            else stack[stack.length - 1] += popped * 2;
        }
    }
    return stack[0];
};
