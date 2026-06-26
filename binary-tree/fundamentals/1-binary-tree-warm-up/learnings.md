# Binary Tree Warm-Up — The Node Class

## Key Insight

A binary tree node has three fields: a value and two child pointers (`left`, `right`). Unlike a linked list node (one `.next`), each node can branch in two directions. You build the tree by wiring up nodes manually — the structure exists only through the pointer assignments.

---

## The Node Class

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

Both children start as `null`. A node with no children is a **leaf**.

---

## Building a Tree

```js
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left = b;  a.right = c;
b.left = d;  b.right = e;
c.right = f;

//        a
//       / \
//      b   c
//     / \   \
//    d   e   f
```

You only hold a reference to the **root** (`a`). Everything else is reached by following `.left` / `.right` pointers.

---

## Watch Out For

- If a node's `left` or `right` is `null`, accessing `.left.value` on it throws — always null-check before traversing a child.
- There's no built-in length or size — you have to traverse to count nodes.
