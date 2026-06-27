# Return All Values in a List

## Problem

Write a function that takes in the head of a linked list and returns an array containing all values of the nodes in the list, in order.

---

## Key Insight

Same traversal as print-all-values, but collecting into an array. The recursive version introduces the **helper function pattern** — when you need to carry extra state through recursion that you can't return up the chain cleanly, pass it as a parameter to a helper.

---

## Solutions

### Iterative

```js
function linkedListValues(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}
```

Straightforward — push each value, return the array.

### Recursive (helper pattern)

```js
function linkedListValues(head) {
  const result = [];
  fillResult(head, result);
  return result;
}

function fillResult(node, result) {
  if (node === null) return;
  result.push(node.val);
  fillResult(node.next, result);
}
```

The outer function owns the array and returns it. The helper mutates it via reference. This avoids the awkward problem of trying to accumulate an array through return values across recursive calls.

---

## Trace Through

List: `A → B → C → null`

**Iterative:**
```
result = []
current = A  →  push A  →  result = ['A'],  current = B
current = B  →  push B  →  result = ['A','B'],  current = C
current = C  →  push C  →  result = ['A','B','C'],  current = null
current = null  →  exit loop
return ['A','B','C']
```

**Recursive:**
```
linkedListValues(A)
  result = []
  fillResult(A, [])
    A !== null → push A → result = ['A'] → fillResult(B, ['A'])
      B !== null → push B → result = ['A','B'] → fillResult(C, ['A','B'])
        C !== null → push C → result = ['A','B','C'] → fillResult(null, ['A','B','C'])
          null → return            ← base case
        ← returns
      ← returns
    ← returns
  return ['A','B','C']   ← same array, mutated in place
```

---

## Watch Out For

- You can't cleanly return a growing array up through recursive calls without spreading/concatenating — which is O(n²). The helper-with-mutation pattern is O(n).
- Arrays are passed by reference in JS — `fillResult` mutates `result` in place, so the outer function sees the updates.

---

## Complexity

- **Time: O(n)** — every node visited once
- **Space: O(1)** extra for iterative (excluding result array), **O(n)** for recursive (call stack)
