/**
 * @param {string} s
 * @return {string}
 */

// Approach 1
function decodeString(s) {
    const stack = [];
    for(let i = 0; i < s.length; i++) {
        const elem = s[i];
        if(elem !== ']') stack.push(elem);
        else {
            let segment = '';
            while (stack[stack.length - 1] !== '[') {
                segment = stack.pop() + segment;
            }
            stack.pop();
            let num = '';
            while(
                stack.length &&
                stack[stack.length - 1] >= '0' &&
                stack[stack.length - 1] <= '9'
            ) {
                num = stack.pop() + num;
            }
            stack.push(segment.repeat(num))
        }
    }
    return stack.join('')
};