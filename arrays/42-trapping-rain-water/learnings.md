Session: [020_2026-06-09_trapping-rain-water](../../safwaan/sessions/020_2026-06-09_trapping-rain-water.md)

## How It Felt

Pretty straightforward once the core formula clicked. The brute force and prefix approaches felt natural and clean — both derived without much friction. The two-pointer was the frustrating one: the physical intuition wasn't landing from reasoning alone, so I went to get a visual explanation from another chat. The condition `leftMax <= rightMax` is the bit that didn't come to me cold. Everything else I built myself.

## Key Insight

Water at any index is determined by the walls, not the floor. Specifically: `min(maxLeft, maxRight) - height[i]`. The min of the two side maxes is how high water can sit before it spills; you subtract the floor to get the depth.

Once you have that formula, the three approaches are just three ways to evaluate it efficiently:
- **Brute force:** Compute maxLeft and maxRight by scanning from each index. O(n²).
- **Prefix max:** Precompute both max arrays in two passes, then accumulate in a third. O(n) time, O(n) space.
- **Two-pointer:** Process one index at a time using running maxes. The trick: if `leftMax <= rightMax`, the left side is the bottleneck — you already know enough to calculate water there without knowing the exact right max. O(n) time, O(1) space.

## Solution Walkthrough

### Approach 1 — Brute Force

So the idea is simple: for every index, scan left to find the tallest bar you've seen, scan right to find the tallest bar you've seen, take the min, subtract the current height, and add it to the total if it's positive.

```js
function trap(height) {
    const n = height.length;
    let totalWaterAccumulated = 0;
    for (let i = 0; i < n; i++) {
        let leftMaxHeight = -1;
        let leftStartIndex = i - 1;
        while (leftStartIndex >= 0) {
            if (height[leftStartIndex] > leftMaxHeight) {
                leftMaxHeight = height[leftStartIndex];
            }
            leftStartIndex--;
        }
        let rightMaxHeight = -1;
        let rightStartIndex = i + 1;
        while (rightStartIndex <= n - 1) {
            if (height[rightStartIndex] > rightMaxHeight) {
                rightMaxHeight = height[rightStartIndex];
            }
            rightStartIndex++;
        }
        let effectiveHeight = Math.min(leftMaxHeight, rightMaxHeight);
        const waterAccumulatedAtIndex = effectiveHeight - height[i];
        if (waterAccumulatedAtIndex > 0) {
            totalWaterAccumulated += waterAccumulatedAtIndex;
        }
    }
    return totalWaterAccumulated;
}
```

Why do we guard `> 0`? At the edge indices — where there's nothing to the left or right — `leftMaxHeight` or `rightMaxHeight` stays at `-1`. That makes `effectiveHeight` negative. And even for interior indices, if the current bar is taller than both side maxes, the formula goes negative. Negative water doesn't make sense, so we clamp it.

**Complexity:** O(n²) time (n outer iterations × up to n inner scans), O(1) space.

---

### Approach 2 — Prefix Max Arrays

The brute force repeats the same scanning work for every index. What if we precomputed it once?

- Left-to-right pass: for each index `i`, store the max height seen to its left (strictly — not including itself). We maintain a running `lastLeftMaxHeight` and push it *before* updating with the current element. So at index 0, we push 0 (nothing to the left), then update the running max.
- Right-to-left pass: same idea in the other direction, but we assign by index (`rightMaxHeights[i] = lastRightMaxHeight`) so the indices align correctly without needing a reverse later.
- Third pass: apply the formula at each index using the precomputed values.

```js
function trap(height) {
    const n = height.length;

    const leftMaxHeights = [];
    let lastLeftMaxHeight = 0;
    for (let i = 0; i < n; i++) {
        leftMaxHeights.push(lastLeftMaxHeight);
        if (height[i] > lastLeftMaxHeight) lastLeftMaxHeight = height[i];
    }

    const rightMaxHeights = [];
    let lastRightMaxHeight = 0;
    for (let i = n - 1; i >= 0; i--) {
        rightMaxHeights[i] = lastRightMaxHeight;
        if (height[i] > lastRightMaxHeight) lastRightMaxHeight = height[i];
    }

    let totalAccumulatedWater = 0;
    for (let i = 0; i < n; i++) {
        const effectiveHeight = Math.min(leftMaxHeights[i], rightMaxHeights[i]);
        const waterAccumulatedAtIndex = effectiveHeight - height[i];
        if (waterAccumulatedAtIndex > 0) {
            totalAccumulatedWater += waterAccumulatedAtIndex;
        }
    }
    return totalAccumulatedWater;
}
```

**Complexity:** O(n) time — three sequential passes, each O(n). Three loops that don't nest ≠ O(n²). O(n) space — two auxiliary arrays of size n.

This is also called a **prefix max** approach — each array stores the running maximum from one direction, so each element encodes "the tallest thing I've seen so far."

---

### Approach 3 — Two Pointers

We can eliminate the two auxiliary arrays entirely. The key observation: you don't need to know both `maxLeft` and `maxRight` precisely for every index. You just need to know which side is the bottleneck.

If `leftMax <= rightMax`, then whatever `maxRight` actually is, it doesn't change the result — the min is `leftMax`. So you can calculate water at the left pointer immediately and move inward. Same logic applies when `rightMax < leftMax`.

```js
function trap(height) {
    const n = height.length;
    let leftPointer = 0;
    let rightPointer = n - 1;
    let leftMax = 0;
    let rightMax = 0;
    let accumulatedWater = 0;

    while (leftPointer <= rightPointer) {
        if (leftMax <= rightMax) {
            leftMax = Math.max(leftMax, height[leftPointer]);
            accumulatedWater += leftMax - height[leftPointer];
            leftPointer++;
        } else {
            rightMax = Math.max(rightMax, height[rightPointer]);
            accumulatedWater += rightMax - height[rightPointer];
            rightPointer--;
        }
    }
    return accumulatedWater;
}
```

A few things worth noting:

**Why `leftMax <= rightMax` and not `height[left] < height[right]`?** Because the water at any index depends on the *running max*, not the current height. You might be standing on a bar of height 5 but `leftMax` is only 2 — in that case the left side is still the bottleneck even though the current bar is tall. Comparing current heights gives you a snapshot; comparing running maxes gives you the actual bottleneck.

**Why does `leftMax - height[leftPointer]` never go negative?** Because we update `leftMax` to be `Math.max(leftMax, height[leftPointer])` first — so `leftMax` is always at least as tall as the current bar. The subtraction is always ≥ 0.

**Loop condition `<=` not `<`:** When both pointers land on the same index, we still need to process it. Using `<` would skip the middle element of an odd-length array.

**Complexity:** O(n) time — each element is processed exactly once. O(1) space — no arrays, just four variables.

## Pattern Introduced

**Prefix max** — precomputing a running max from each direction. Appears in: Trapping Rain Water, Product of Array Except Self, and any problem where you need "the best value seen so far from this direction."

**Two-pointer with running max** — the O(1) space optimization of the prefix approach. The condition `leftMax <= rightMax` is the decision gate: process the bottleneck side.

## Watch Out For

- Negative accumulation: `effectiveHeight - height[i]` can be negative at edges or at tall interior bars. Guard with `> 0` or use `Math.max(0, ...)`.
- Two-pointer condition: compare **running maxes** (`leftMax <= rightMax`), not current heights. Current heights give you a snapshot, not the bottleneck.
- Loop condition: `<=` not `<` — otherwise you skip the middle element when pointers converge.
- In the prefix approach: build `rightMaxHeights` by assigning `rightMaxHeights[i]` directly (not push) — otherwise indices are reversed.

## Template

```js
// Two-pointer — O(n) time, O(1) space
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;

    while (left <= right) {
        if (leftMax <= rightMax) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}
```

## Trace Through

Input: `[4, 2, 0, 3, 2, 5]`, expected: 9

| L | R | leftMax | rightMax | action | water |
|---|---|---------|----------|--------|-------|
| 0 | 5 | 0 | 0 | leftMax(0) <= rightMax(0) → process left. leftMax=max(0,4)=4. add 4-4=0 | 0 |
| 1 | 5 | 4 | 0 | leftMax(4) > rightMax(0) → process right. rightMax=max(0,5)=5. add 5-5=0 | 0 |
| 1 | 4 | 4 | 5 | leftMax(4) <= rightMax(5) → process left. leftMax=max(4,2)=4. add 4-2=2 | 2 |
| 2 | 4 | 4 | 5 | leftMax(4) <= rightMax(5) → process left. leftMax=max(4,0)=4. add 4-0=4 | 6 |
| 3 | 4 | 4 | 5 | leftMax(4) <= rightMax(5) → process left. leftMax=max(4,3)=4. add 4-3=1 | 7 |
| 4 | 4 | 4 | 5 | leftMax(4) <= rightMax(5) → process left. leftMax=max(4,2)=4. add 4-2=2 | 9 |
| 5 | 4 | — | — | left > right → loop ends | 9 ✓ |

## Complexity

| Approach | Time | Space | Why |
|----------|------|-------|-----|
| Brute force | O(n²) | O(1) | n outer × n inner scans |
| Prefix max | O(n) | O(n) | 3 sequential passes; 2 arrays of size n |
| Two-pointer | O(n) | O(1) | 1 pass; 4 variables |

## Submissions

- Prefix max: https://leetcode.com/problems/trapping-rain-water/submissions/2026591755 — 23rd percentile runtime, 18th percentile memory
- Two-pointer: https://leetcode.com/problems/trapping-rain-water/submissions/2027062161 — **100th percentile runtime, 92nd percentile memory**

## Open Questions

- Can you derive the two-pointer solution cold without any hints? (Hard redo scheduled end of week — 2026-06-13)
- Why does comparing current heights (`height[left] < height[right]`) sometimes give wrong answers, while comparing running maxes (`leftMax <= rightMax`) is always correct? (Understand this before the redo.)
