/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
    const operators = '+-*/';
    const stack = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if(operators.includes(token)) {
            const rightOperand = stack.pop();
            const leftOperand = stack.pop();
            if(token === '+') stack.push(leftOperand + rightOperand)
            if(token === '-') stack.push(leftOperand - rightOperand)
            if(token === '*') stack.push(leftOperand * rightOperand)
            if(token === '/') stack.push(Math.trunc(leftOperand / rightOperand))
        } else {
            stack.push(Number(token))
        }
    }
    return stack[0];
};
