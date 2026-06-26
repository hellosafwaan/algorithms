// This is the wrong solution
function maxPathSum(root) {
    let max = -Infinity;
    let currentSum = 0;
    const stack = [root];
    while(stack.length > 0) {
        const currentNode = stack.pop();
        currentSum += currentNode.val;
        if(currentNode.left !== null) stack.push(currentNode.left);
        else {
            if(currentSum > max) max = currentSum;
            currentSum = 0;
        }
        if(currentNode.right !== null) stack.push(currentNode.right);
        else {
            if(currentSum > max) max = currentSum;
            currentSum = 0;
        }
    }
    return max;
}
// Wrong

function maxPathSum(root) {
    let max = -Infinity;
    let currentSum = 0;
    const stack = [root];
    while(stack.length > 0) {
        const currentNode = stack.pop();
        currentSum += currentNode.val;
        if(currentNode.left !== null) stack.push(currentNode.left);
        if(currentNode.right !== null) stack.push(currentNode.right);
        max = Math.max(max, currentSum);
        currentSum = 0;
    }
    return max;
}

// Wrong
function maxPathSum(root) {
    let max = -Infinity;
    let currentSum = 0;
    const stack = [root];
    while(stack.length > 0) {
        const currentNode = stack.pop();
        currentSum += currentNode.val;
        if(currentNode.left === null) {
            max = Math.max(currentSum, max)
            currentSum = 0;
        } else {
            stack.push(currentNode.left);
        }

        if(currentNode.right === null) {
            max = Math.max(currentSum, max)
            currentSum = 0;
        } else {
            stack.push(currentNode.right);
        }
    }
    return max;
}

// This is the wrong solution
function maxPathSum(root) {
    let max = -Infinity;
    let currentSum = 0;
    const stack = [root];
    while(stack.length > 0) {
        const currentNode = stack.pop();
        currentSum += currentNode.val;
        if(currentNode.left !== null) stack.push(currentNode.left);
        if(currentNode.right !== null) stack.push(currentNode.right);
        if(currentNode.left === null && currentNode.right == null) {
            max = Math.max(currentSum, max)
            currentSum -= currentNode.val
        }
    }
    return max;
}


/**
 * Well I couldn't find out where i was going wrong, this was the solution given to me by claude. 
 * The solution is When you push a child, you compute its path sum right there. The two branches never share state.
 */

function maxPathSum(root) {
    let max = -Infinity;
    const stack = [[root, root.val]];
    while(stack.length > 0 ) {
        const [currentNode, currentSum] = stack.pop();
        if(currentNode.left === null && currentNode.right === null) {
            max = Math.max(max, currentSum);
        }
        if(currentNode.left) stack.push([currentNode.left, currentSum + currentNode.left.val]);
        if(currentNode.right) stack.push([currentNode.right, currentSum + currentNode.right.val]);

    }
    return max;
}


// Recursive Version 
function maxPathSum(root) {
    if(root === null) return -Infinity
    if(root.left === null && root.right === null) return root.val;
    const leftMax = maxPathSum(root.left);
    const rightMax = maxPathSum(root.right);
    const max = Math.max(leftMax, rightMax)
    return max + root.val;
}