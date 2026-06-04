Session: [011_2026-06-04_container-with-most-water](../../safwaan/sessions/011_2026-06-04_container-with-most-water.md)

---

## How It Felt

Pointer movement logic was the hard part. I was able to narrow down that you move the shorter pointer but couldn't fully conclude the reasoning on my own — needed to work through it step by step. Once I got there, the code came naturally.

---

## Key Insight

The effective height of a container is always the shorter of the two lines — water spills over the shorter one. So if you fix the shorter pointer and move the taller one inward, the height cap doesn't change and width only shrinks. Area can only decrease. There is nothing to gain from moving the taller pointer. So you always move the shorter pointer — it's the only move that gives you a chance at a larger area.

---

## Pattern Introduced

**Two pointers — converge from both ends, greedy pointer movement**

Start with the widest possible container (left = 0, right = n-1). At each step, compute area, update max, then move the shorter pointer inward. Repeat until pointers meet.

The key property: the array doesn't need to be sorted. The greedy move works because of the height-cap proof above, not because of sorted order.

---

## Watch Out For

- Width formula: `j - i`, not `(j+1) - (i+1)`. Trace `i=0, j=1` to verify.
- Loop condition: `left < right`, not `left <= right`. When they meet, width = 0, area = 0 — nothing useful.
- Don't move the taller pointer. You're guaranteed to lose area. Only move the shorter one.

---

## Template

```js
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;

    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        max = Math.max(max, width * h);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max;
}
```

---

## Trace Through

Input: `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`

| left | right | height[left] | height[right] | width | effectiveH | area | max | move |
|------|-------|-------------|--------------|-------|------------|------|-----|------|
| 0 | 8 | 1 | 7 | 8 | 1 | 8 | 8 | left++ |
| 1 | 8 | 8 | 7 | 7 | 7 | 49 | 49 | right-- |
| 1 | 7 | 8 | 3 | 6 | 3 | 18 | 49 | right-- |
| 1 | 6 | 8 | 8 | 5 | 8 | 40 | 49 | right-- |
| 1 | 5 | 8 | 4 | 4 | 4 | 16 | 49 | right-- |
| 1 | 4 | 8 | 5 | 3 | 5 | 15 | 49 | right-- |
| 1 | 3 | 8 | 2 | 2 | 2 | 4 | 49 | right-- |
| 1 | 2 | 8 | 6 | 1 | 6 | 6 | 49 | right-- |
| left >= right → stop |

Output: `49` ✓

---

## Complexity

**Time: O(n)**
Each pointer starts at one end and moves inward. Together they traverse the array once — `left` moves right, `right` moves left, never passing each other. Total moves = n - 1. That's O(n).

**Space: O(1)**
No arrays or data structures created. Only a fixed set of variables (`left`, `right`, `max`, `width`, `h`) regardless of input size. Constant space.

---

## Submissions

| Solution | Link |
|----------|------|
| Optimized (two pointers) | [Submission #2022333399](https://leetcode.com/problems/container-with-most-water/submissions/2022333399/) |
| Naive (nested loop) | TLE — not submitted |

---

## Open Questions

- Can you justify the pointer movement proof cold, without being walked through it?
