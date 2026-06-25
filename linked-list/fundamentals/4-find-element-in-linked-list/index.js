// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }


function linkedListFind(head, target) {
  let current = head;
  while(current !== null) {
    if(current.val === target) return true
    current = current.next
  }
  return false
}

function linkedListFind(head, target) {
  if (head === null) return; 
  if(head.val === target) return true;
  return linkedListFind(head.next, target)
}

module.exports = {
  linkedListFind,
};
