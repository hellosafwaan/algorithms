# Sum Linked List

## Key Insight

The recursive version is the cleanest linked list pattern where a **value flows back up through return values** — no helper needed. Base case returns 0 (empty list contributes nothing). Each node returns its own value plus whatever its tail sums to.

---

## Solutions

### Iterative

```js
function sumList(head) {
  let sum = 0;
  let current = head;
  while (current !== null) {
    sum += current.val;
    current = current.next;
  }
  return sum;
}
```

Accumulate as you walk. Return after the loop.

**Trace** on `1 → 2 → 3 → null`:
```
sum = 0
current = 1  →  sum = 1  →  current = 2
current = 2  →  sum = 3  →  current = 3
current = 3  →  sum = 6  →  current = null
current = null  →  exit loop
return 6
```

### Recursive

```js
function sumList(head) {
  if (head === null) return 0;
  return head.val + sumList(head.next);
}
```

Base case: `null → 0`. The call stack computes partial sums on the way back up. Each frame adds its node's value to the result from the rest of the list.

**Trace** on `1 → 2 → 3 → null`:
```
sumList(1) = 1 + sumList(2)
                  = 2 + sumList(3)
                            = 3 + sumList(null)
                                       = 0
                            = 3
                  = 5
           = 6
```

---

## Watch Out For

- The recursive base case must return `0`, not `null` or `undefined` — because the return value is used in arithmetic (`head.val + ...`). Adding `undefined` gives `NaN`.

---

## Complexity

- **Time: O(n)** — every node visited once
- **Space: O(1)** iterative, **O(n)** recursive
