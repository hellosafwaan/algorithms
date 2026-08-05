Session: [083_2026-08-05_fruit-into-baskets](../../safwaan/sessions/083_2026-08-05_fruit-into-baskets.md)

## How It Felt

"Once I was able to decode how to store the window, the sliding window was pretty straightforward." Most of the effort was translating the problem statement, not the algorithm.

## Key Insight

The "fruit trees and baskets" story is a disguise: two baskets, each holding only one type of fruit, means the window can contain **at most 2 distinct fruit types**. Once decoded, this is the same shape as `fundamentals/9-longest-two-char-substring` — track a frequency Map, shrink while there are more than 2 distinct keys, track the max window size.

## Solution Walkthrough

The problem statement talks about picking fruit from trees in a row and carrying them in exactly two baskets, where each basket can only hold one type of fruit — maximize the total fruit collected from a single contiguous run of trees.

Stripped of the story: find the length of the longest contiguous subarray of `fruits` containing **at most 2 distinct values**.

1. Expand the window by adding `fruits[end]` to a frequency `Map`, incrementing its count (or seeding it at 1).
2. While the map has more than 2 distinct keys, shrink from the left — decrement the leaving fruit's count, deleting the key entirely once it hits 0 (so `windowMap.size` accurately reflects distinct types still present).
3. Track the max window size seen.

The one bug here was a plain typo: `start[end]` instead of `fruits[end]` — indexing the pointer variable instead of the actual array. `start` is just a number, so `start[end]` is always `undefined`, which meant every element got grouped under a single `undefined` key and the window never actually shrank — the whole algorithm silently degenerated into "count everything."

## Pattern Introduced

**Sliding Window — Variable Size, at-most-2-distinct**

Identical to `fundamentals/9-longest-two-char-substring`. No new technique — the only real work in this problem was decoding the cover story into the underlying constraint.

## Watch Out For

- **Read past the story.** "Two baskets, one fruit type each" = "at most 2 distinct values in the window." Translate the constraint before reaching for a technique.
- **Index the array, not the pointer.** `start[end]` and `fruits[end]` look similar in a rushed read but mean completely different things — one is indexing a number (always `undefined`), the other is the actual data.
- **Recomputing the window size by summing map values every iteration is unnecessary** — `end - start + 1` already gives the current window size directly, without an O(distinct keys) inner loop.

## Template

```javascript
function totalFruit(fruits) {
    const windowMap = new Map();
    let start = 0;
    let maxFruits = 0;

    for (let end = 0; end < fruits.length; end++) {
        windowMap.set(fruits[end], (windowMap.get(fruits[end]) || 0) + 1);

        while (windowMap.size > 2) {
            const leaving = fruits[start];
            windowMap.set(leaving, windowMap.get(leaving) - 1);
            if (windowMap.get(leaving) === 0) windowMap.delete(leaving);
            start++;
        }

        maxFruits = Math.max(maxFruits, end - start + 1);
    }

    return maxFruits;
}
```

## Trace Through

`fruits = [1,2,3,2,2]`

| end | fruits[end] | windowMap | shrink? | window size | max |
|-----|-------------|-----------|---------|-------------|-----|
| 0 | 1 | {1:1} | no | 1 | 1 |
| 1 | 2 | {1:1,2:1} | no | 2 | 2 |
| 2 | 3 | {1:1,2:1,3:1} | yes: -1→delete, start=1 | 2 | 2 |
| 3 | 2 | {2:2,3:1} | no | 3 | 3 |
| 4 | 2 | {2:3,3:1} | no | 4 | 4 |

Return `4`. ✓ (matches LC 904's example)

## Complexity

**Time: O(n).** `start` and `end` each advance at most `n` times total.

**Space: O(1).** The map holds at most 3 distinct keys at any point (2 valid + 1 that just triggered a shrink).

## Alternative Approaches

Same "at most K distinct" shrink shape could be reused for the general K-distinct version of this problem family (LC 340, "Longest Substring with At Most K Distinct Characters") by parameterizing the `2` — not implemented here since this problem fixes K at 2. No fundamentally different technique is needed.

## Submissions

- [Accepted](https://leetcode.com/problems/fruit-into-baskets/submissions/2095258115) — 2026-08-05

## Open Questions

- Does he name the `fundamentals/9-longest-two-char-substring` connection unprompted next time this exact shape comes up, given he didn't this session (unlike several other fundamentals connections this week)?
- Does recomputing the window sum via a full map-values loop (instead of `end - start + 1`) recur, or was this specific to not yet having simplified this particular draft?
