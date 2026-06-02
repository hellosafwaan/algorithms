# Session: Pascal's Triangle — 2026-06-03

## What He Attempted

Correctly identified the structure immediately: array of arrays. Derived the general formula independently:

```
triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
```

And noted the edge case: first and last elements of each row are always `1`.

First implementation handled both edge cases in the same branch:

```js
if (j === 0 || j === i) {
    triangle[i] = [1]  // bug: overwrites the row on last element
}
```

## Where He Got Stuck

Didn't notice that `triangle[i] = [1]` on the last element (j === i) wipes out the whole row. Traced through mentally and got the correct expected output — was tracing intent, not the actual code.

One targeted question: "trace through i=3, j=3 — what does that line actually do?" He identified the overwrite bug himself.

## Mistakes Made

- **Array assignment vs element assignment:** `triangle[i] = [1]` resets the row; `triangle[i][j] = 1` sets one element. He conflated these in the first pass. Caught after tracing.
- **Arithmetic sum formula:** Said n(n-1)/2 instead of n(n+1)/2 when computing total elements. Conclusion (O(n²)) was correct; formula was slightly off.

## Key Insight

"One is creating an element in the parent array, another is updating an element of the parent array" — his words, after being asked if the first-element case and last-element case are the same operation.

## Complexity Reached

Time: O(n²) — inner loop runs i times per row, total iterations = 1+2+...+n = n(n+1)/2  
Space: O(n²) — storing every element of the triangle

## Coach Notes for Next Session

- Complexity analysis is improving — he reasoned through it well with only a small nudge
- The overwrite bug is a 2D-array-specific mistake; watch for similar issues in matrix problems
- He's consistently self-correcting with one targeted question — continue using trace-through prompts as the primary unblocking tool
