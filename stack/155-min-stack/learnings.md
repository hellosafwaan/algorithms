Session: [065_2026-07-15_min-stack.md](../../safwaan/sessions/065_2026-07-15_min-stack.md)

## How It Felt
Watched a NeetCode video first — pretty easy once the idea of the second stack clicked.

## Key Insight
Use two stacks that grow and shrink in lockstep. The first (`stack`) just holds the actual values, same as any normal stack. The second (`minStack`) holds, at every position, "the minimum value seen so far, up to and including this depth" — so its top is always the answer to `getMin()`, no scanning required.

## Solution Walkthrough
In his own words (lightly cleaned up):

1. Whenever we push an element to the stack, we push it to the actual stack, and then we also push something onto the minimum stack. If the minimum stack is currently empty, we just push the value itself — it's the only thing seen so far, so it's trivially the minimum. If the minimum stack already has something in it, we compare the top value there with the value currently being inserted, and push whichever is smaller. So for every push onto the main stack, the minimum stack tells us, at that exact depth, what the minimum was at the time.
2. When we pop, we pop from *both* stacks together — they always stay the same length, so whatever was the current minimum for the item just removed goes away with it, and the new top of `minStack` is correctly the minimum of what's left.
3. `top()` just returns the last item of the actual stack — nothing special.
4. `getMin()` just returns the last item of `minStack` — since it always tracks the running minimum at the current depth, it's a direct O(1) read.

**The bug that came up:** `pop()` was calling `this.stack.pop(value)` and `this.minStack.pop(value)` — but `value` was only ever a parameter on `push`, not on `pop`. Since `Array.prototype.pop()` doesn't take arguments anyway, the fix was simply to call `pop()` with nothing.

## Pattern Introduced
**Auxiliary Min-Tracking Stack** — new pattern, first appearance. Doesn't map to anything from the stack fundamentals module.

## Watch Out For
- `pop()` takes no arguments — passing one does nothing useful, and referencing an undefined variable there throws.
- Keep both stacks the same length at all times — every push/pop must happen on both together, or `minStack`'s top stops correctly representing "the minimum at the current depth."

## Template
```js
var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};

MinStack.prototype.push = function(value) {
    this.stack.push(value);
    if (this.minStack.length > 0) {
        this.minStack.push(Math.min(value, this.minStack[this.minStack.length - 1]));
    } else {
        this.minStack.push(value);
    }
};

MinStack.prototype.pop = function() {
    this.stack.pop();
    this.minStack.pop();
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};
```

## Trace Through
`push(3)` → stack: `[3]`, minStack: `[3]`
`push(1)` → stack: `[3,1]`, minStack: `[3,1]` (min(1,3)=1)
`push(2)` → stack: `[3,1,2]`, minStack: `[3,1,1]` (min(2,1)=1)
`getMin()` → `1`
`pop()` → stack: `[3,1]`, minStack: `[3,1]`
`getMin()` → `1`
`pop()` → stack: `[3]`, minStack: `[3]`
`getMin()` → `3`

## Complexity
Time: O(1) for every operation (`push`, `pop`, `top`, `getMin`) — all direct array end-operations, no scanning.
Space: O(n) — both stacks grow to the same length as the number of elements pushed. (This is the "always push to `minStack`" version; a space-optimized variant only pushes to `minStack` when a new minimum is actually set — deferred to a future session.)

## Submissions
https://leetcode.com/problems/min-stack/submissions/2068955523
Accepted — 45/45 testcases. Runtime 100ms (beats 41.11%), Memory 86.86MB (beats 42.18%).

## Open Questions
**Space-optimized variant, deferred to a future session:** only push to `minStack` when the incoming value is a new minimum (use `<=` to correctly handle duplicate minimums — e.g. pushing the same minimum value twice, then popping one, must leave the other still tracked). On `pop()`, only pop from `minStack` if the value being removed from `stack` equals the current top of `minStack` — self-derived the reasoning for this during the session ("if the popped value equals the top of minStack, that means it's the current minimum, so pop it from minStack too"), but the implementation itself hasn't been written yet.
