// Approach 1
function isValid(s) {
    const brackets = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    const stack = [];
    for(let i = 0; i < s.length; i++) {
        const elem = s[i];
        if(elem in brackets) stack.push(brackets[elem])
        else {
            if(stack.length > 0 && stack[stack.length - 1] === elem) stack.pop();
            else return false;
        }
    }
    return stack.length === 0;
};
// Approach 2
function isValid(s) {
    const stack = [];
    const brackets = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    for(let i = 0; i < s.length; i++) {
        const elem = s[i];
        if('([{'.includes(elem)) stack.push(elem);
        else {
            if(stack.length > 0 && stack[stack.length - 1] === brackets[elem]) stack.pop();
            else return false;
        }
    }
    return stack.length === 0;
}