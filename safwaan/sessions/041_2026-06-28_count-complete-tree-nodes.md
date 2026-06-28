# Session: Count Complete Tree Nodes — 2026-06-28

## What He Attempted

Three O(n) solutions cold before the optimal:

```js
// Iterative DFS
function countNodes(root) {
    if(root === null) return 0;
    const stack = [root];
    let nodesCount = 0;
    while(stack.length > 0){
        const currentNode = stack.pop();
        nodesCount++;
        if(currentNode.left) stack.push(currentNode.left);
        if(currentNode.right) stack.push(currentNode.right);
    }
    return nodesCount;
};

// Recursive
function countNodes(root) {
    if(root === null) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// BFS
function countNodes(root) {
    if(root === null) return 0;
    const queue = [root];
    let nodesCount = 0;
    while(queue.length > 0) {
        const currentNode = queue.shift();
        nodesCount++;
        if(currentNode.left !== null) queue.push(currentNode.left);
        if(currentNode.right !== null) queue.push(currentNode.right);
    }
    return nodesCount;
}
```

For the optimal: walked through the left-height / right-height shortcut with guidance.

Final solution:
```js
function countNodes(root) {
    let leftHeight = 0, rightHeight = 0;
    let left = root, right = root;
    while(left) { leftHeight++; left = left.left; }
    while(right) { rightHeight++; right = right.right; }
    if(leftHeight === rightHeight) return 2**leftHeight - 1;
    else return 1 + countNodes(root.left) + countNodes(root.right);
};
```

## Where He Got Stuck

- Didn't initially see what the complete tree property adds — asked "what significance does it have?"
- Needed guidance to arrive at: measure left height going all-left, right height going all-right; if equal → perfect subtree.
- Used `2^leftHeight` (XOR in JS) instead of `2**leftHeight` — corrected once caught.

## Mistakes Made

- `^` operator used for exponentiation — JS XOR, not power. Corrected to `**`.

## Key Insight

For a complete binary tree, if you go all-left from root and all-right from root and hit the same height, the whole tree is perfect → use `2^h - 1`. If not perfect, recurse on both subtrees — each subtree is also complete, so the shortcut fires at multiple levels.

## Complexity Reached

Time: O(log n × log n) — recursion goes O(log n) levels deep, each level does O(log n) work measuring heights.
Space: O(log n) — recursion stack depth.

## Coach Notes for Next Session

- O(n) solves were completely cold and correct — all three in a row. Strong.
- Couldn't independently see what the complete tree property enables — needed Socratic guiding questions ("what do you know about a perfect tree?").
- `^` vs `**` is a knowledge gap — first time this has surfaced.
- Complexity reasoning for O(log²n) came correctly after "height = log n" was established; he derived it himself once prompted.
- Base case for the optimal (null → 0 for both heights → 2^0 - 1 = 0... wait, actually leftHeight would be 0 = rightHeight 0 → returns -1 which is wrong → actually the null check is the base case, returns 0) — didn't get tested explicitly. Next problem: confirm he understands why `if(root === null) return 0` is implicitly handled by `leftHeight === rightHeight === 0 → 2^0 - 1 = -1`... actually this is a bug to probe: the function doesn't explicitly check null. Go all-left on null: leftHeight = 0. Go all-right: rightHeight = 0. 0 === 0 → returns 2**0 - 1 = 0. OK that actually works, no bug. But worth probing whether he can trace it.
