// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

function linkedListValues (head) {
  const result = []
  let current = head
  while(current !== null) {
    result.push(current.val)
    current = current.next
  }
  return result
};

function linkedListValues(head) {
  const result = [];
  fillResult(head, result);
  return result;
}

function fillResult(node, result) {
  if(node === null) return;
  result.push(node.val);
  fillResult(node.next, result)
}

module.exports = {
  linkedListValues,
};
