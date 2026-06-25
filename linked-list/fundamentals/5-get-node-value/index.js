// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }



function getNodeValue(head, index) {
  let currentIndex = 0;
  let currentNode = head;
  while(currentNode !== null) {
    if(currentIndex === index) return currentNode.val;
    currentNode = currentNode.next;
    currentIndex++
  }
  return null;
}

function getNodeValue(head, index) {
  return findValueAtIndex(head, 0, index)
}

function findValueAtIndex(head, currentIndex, targetIndex) {
  if (head === null) return null;
  if(currentIndex === targetIndex) return head.val;
  return findValueAtIndex(head.next, currentIndex + 1, targetIndex)
}

module.exports = {
  getNodeValue,
};
