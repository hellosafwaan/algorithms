Session: [017_2026-06-07_majority-element](../../safwaan/sessions/017_2026-06-07_majority-element.md)

## How It Felt

Pretty easy. HashMap came naturally — I thought of storing all counts in a hash, then traversing to find the element above the threshold. Straightforward once I knew the threshold was `> n/2`.

Boyer-Moore was new territory. I wouldn't have reached for it cold — it's a named algorithm I hadn't seen before. Once given the "candidate + votes" framing, I derived the rest myself and coded it in one attempt.

One JS gap surfaced: I forgot how to iterate over an object (`for...in`) and had to look it up. Also missed that `for...in` keys are always strings, not numbers — needed `Number(key)` on the return.

## Key Insight

**HashMap:** Count occurrences, return the key whose count exceeds `n/2`. Since majority is guaranteed, just stop at the first key that clears the threshold — no need to find the max.

**Boyer-Moore:** Keep one `candidate` and one `count`. For each element: if it matches the candidate, vote for it (increment). If it doesn't, it cancels one vote (decrement). When `count` hits 0, the current element takes over as the new candidate with count 1. By the end, the surviving candidate is the majority element. Why does this work? The majority element appears more than `n/2` times. Even if every other element votes against it, it can't be fully cancelled out — there are simply more of it than everything else combined.

## Solution Walkthrough

**HashMap approach:**

So the idea is simple: go through the array once and tally how many times each value appears. You store this in an object `count`, where each key is a number from the array and the value is how many times it's appeared. Then make a second pass over the count object. Since the majority element is guaranteed to exist and appears more than `n/2` times, the first key you find that exceeds that threshold is your answer.

One thing to watch: when you do `for (const key in count)`, `key` is always a string in JavaScript. So `return key` would give you "2" instead of 2. You need `return Number(key)`.

Also — you don't need the second loop to find the "maximum count". You only need to find any key above the threshold. Since the majority is guaranteed, that's enough.

```js
function majorityElement(nums) {
    const n = nums.length
    const count = {}
    const minimumCount = n / 2

    for (let i = 0; i < n; i++) {
        const val = nums[i]
        count[val] = (count[val] || 0) + 1
    }

    for (const key in count) {
        if (count[key] > minimumCount) return Number(key)
    }
}
```

**Boyer-Moore Voting Algorithm:**

This is the clever one. The insight is: what if majority elements and non-majority elements could cancel each other out? If every minority element destroys one majority element, the majority still survives — because it has more than half the votes.

So you track a `candidate` (starting at `nums[0]`) and a `candidateCount` (starting at 1). Then walk through the array from index 1:
- Same as candidate → increment count (support)
- Different → decrement count (cancel)
- Count hits 0 → the candidate has been fully cancelled; set the current element as the new candidate with count 1

At the end, whatever candidate remains is the answer. The guarantee that a majority element exists is what makes this safe — without it, you'd need a second pass to verify.

```js
function majorityElement(nums) {
    let candidate = nums[0]
    let candidateCount = 1

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === candidate) {
            candidateCount++
        } else if (candidateCount > 0) {
            candidateCount--
        } else {
            candidate = nums[i]
            candidateCount = 1
        }
    }

    return candidate
}
```

## Pattern Introduced

**Boyer-Moore Voting Algorithm** — a named algorithm specific to the majority element problem. Not something you'd derive cold. Know it, recognise when the problem guarantees a majority element exists, and reach for it.

**HashMap counting** — same pattern as LC 1 (Two Sum), but here you store counts rather than indices.

## Watch Out For

- `for...in` keys are always **strings** in JavaScript. Return `Number(key)` not `key`.
- You don't need to find the "max count" — just return the first key above `n/2`. The guarantee does the work.
- Boyer-Moore only works when a majority element is **guaranteed to exist**. If the problem says "find if a majority element exists", you'd need a second validation pass.
- The naive brute force is O(n²): for each element, count how many times it appears with a nested loop. Not worth implementing — HashMap is already optimal in practice.

## Template

**Boyer-Moore:**
```js
let candidate = nums[0]
let candidateCount = 1
for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
        candidateCount++
    } else if (candidateCount > 0) {
        candidateCount--
    } else {
        candidate = nums[i]
        candidateCount = 1
    }
}
return candidate
```

## Trace Through

`nums = [2, 2, 1, 1, 2]` — majority is 2 (appears 3/5 times)

| i | nums[i] | candidate | count | action |
|---|---------|-----------|-------|--------|
| — | — | 2 | 1 | init |
| 1 | 2 | 2 | 2 | match → increment |
| 2 | 1 | 2 | 1 | mismatch → decrement |
| 3 | 1 | 2 | 0 | mismatch → decrement |
| 4 | 2 | 2 | 1 | match → increment |

Return: `2` ✓

Notice: even after two cancellations (index 2 and 3), 2 survives as the candidate and gets the final vote.

## Complexity

**HashMap:**
- Time: O(n) — one pass to build counts, one pass over the map (at most n distinct elements)
- Space: O(n) — worst case every element is unique, storing n keys

**Boyer-Moore:**
- Time: O(n) — single pass, constant work per element
- Space: O(1) — just two variables regardless of input size

The difference shows up in practice: 35th percentile with HashMap, 100th percentile with Boyer-Moore.

## Submissions

- HashMap: https://leetcode.com/problems/majority-element/submissions/2024697882 (35th pct runtime, 71st pct memory — 2026-06-07 01:02)
- Boyer-Moore: https://leetcode.com/problems/majority-element/submissions/2025072113 (100th pct runtime, 85th pct memory — 2026-06-07 12:03)

## Open Questions

- Boyer-Moore with no majority guarantee: how would you verify? (second pass — check if candidate count > n/2)
- Can you generalise this to find an element appearing more than n/3 times? (yes — two candidates; this is a known extension)
