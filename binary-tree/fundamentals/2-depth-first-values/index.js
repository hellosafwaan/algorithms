// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }



// Iterative Solution
const depthFirstValues = (root) => {
  if(root === null) return [];
  const stack = [root];
  const result = []
  while(stack.length > 0) {
    const currentNode = stack.pop()
    result.push(currentNode.value)
    if(currentNode.right) stack.push(currentNode.right);
    if(currentNode.left) stack.push(currentNode.left);
  }
  return result; 
};

// Recursive Solution
function depthFirstValues(root) {
  if(root === null) return []
  const leftValues = depthFirstValues(root.left);
  const rightValues = depthFirstValues(root.right);
  return [root.val, ...leftValues, ...rightValues]
}

module.exports = {
  depthFirstValues,
};
