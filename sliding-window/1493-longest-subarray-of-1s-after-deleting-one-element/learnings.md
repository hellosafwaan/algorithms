Session: [080_2026-08-05_longest-subarray-of-1s-after-deleting-one-element](../../safwaan/sessions/080_2026-08-05_longest-subarray-of-1s-after-deleting-one-element.md)

## How It Felt

Spent a lot of time on the initial insight — "I would have never been able to come up with this... I was not able to come up with this, so I would consider that a failure." Once the insight was in place, the sliding window implementation itself was straightforward.

## Key Insight

Deleting a `1` never helps — it can only shorten a run. The only useful deletion is a `0` sitting between two runs of 1s, which merges them into one. That reframes the problem into: find the longest window containing **at most one `0`**; the answer for that window is `windowLength - 1` (the one `0`, if present, gets deleted). This formula already covers the all-1s edge case (a window with *zero* zeros still loses one element, since the problem requires exactly one deletion regardless) — no special case needed.

**This is the exact same problem as `fundamentals/10-max-ones-with-single-flip`, just worded differently.** "Flip one `0` to a `1`" and "delete one element" land on an identical mechanism: both are "find the longest window with at most one exception, and both use a count-and-shrink-while-over-budget window to get there. The only real difference is the final arithmetic — the flip version returns the window length directly (`end - start + 1`, since flipping the `0` in place keeps the window the same size), while the deletion version returns `windowLength - 1` (since deleting the `0` actually shrinks the array by one). Same window, same shrink condition, same underlying idea — different final formula because "flip in place" and "remove" are different operations on the one exception once you've found it.

## Solution Walkthrough

The problem says "delete one element to maximize the following run of 1s." The first real question is: what's ever worth deleting? Deleting a `1` can only make things worse — it just removes a 1 from whatever run it was part of. Deleting a `0`, though, if it's sitting between two runs of 1s, merges them into one continuous run. So the only deletion worth considering is a `0`.

That reframes the whole problem: instead of thinking about *which* element to delete, think about the longest **window that contains at most one `0`**. Whatever `0` is in that window (if any) is the one you'd delete, turning the window into a run of all 1s of length `windowLength - 1`.

Why does this formula also work when the window has *no* zeros at all? Because the problem requires you to delete exactly one element no matter what — even if the array is all 1s (see example 3). A window with zero zeros still loses one element to satisfy that requirement, so `windowLength - 1` is still correct.

From there it's the standard "at most one exception" variable window, same shape as the fundamentals module's `maxOnesWithSingleFlip`:

1. Expand the window, incrementing `zeroCountInWindow` whenever the incoming element is `0`.
2. Shrink from the left while `zeroCountInWindow > 1`, decrementing the count when the outgoing element is `0`.
3. After the shrink, the window is guaranteed to have at most one `0` — record `end - start` (which is exactly `windowLength - 1`, since `windowLength = end - start + 1`).

The bug that came up: an early draft only recorded the result when `zeroCountInWindow === 1` exactly, which silently excluded the all-zeros-free window case — even though the "zero zeros should still count" edge case had already been worked out correctly moments earlier, just not yet reflected in the code. The fix: drop the condition entirely and record on every iteration, since the window is already guaranteed valid (`<= 1` zero) right after the shrink loop runs.

## Pattern Introduced

**Sliding Window — Variable Size, "at most one exception"**

Same shape as `fundamentals/10-max-ones-with-single-flip` — a single count (here, of zeros) instead of a full frequency map, shrink while the count exceeds the allowed exception budget (here, `1`). The generalization from "at most one flip allowed" to "at most one deletion allowed" is essentially the same mechanism with a different framing.

## Watch Out For

- **Only a `0` between two runs of `1`s is ever worth deleting** — this is the reframing that unlocks the whole problem; deleting a `1` is never beneficial.
- **`windowLength - 1` already handles the zero-zero-in-window case** — don't gate the recording step behind `zeroCountInWindow === 1`; the window is valid (at most one zero) on every iteration after the shrink loop runs, including when it has none at all.
- **Window size for "after deleting one"** is `end - start`, not `end - start + 1` — it's the actual window length minus the one deleted element, computed directly rather than as a separate subtraction step.

## Template

```javascript
function longestSubarray(nums) {
    let start = 0;
    let longestSubarrayLen = 0;
    let zeroCountInWindow = 0;

    for (let end = 0; end < nums.length; end++) {
        if (nums[end] === 0) zeroCountInWindow++;

        while (zeroCountInWindow > 1) {
            if (nums[start] === 0) zeroCountInWindow--;
            start++;
        }

        longestSubarrayLen = Math.max(longestSubarrayLen, end - start);
    }

    return longestSubarrayLen;
}
```

## Trace Through

`nums = [0,1,1,1,0,1,1,0,1]`

| end | nums[end] | zeroCount | shrink? | end - start | longestSubarrayLen |
|-----|-----------|-----------|---------|--------------|---------------------|
| 0 | 0 | 1 | no | 0 | 0 |
| 1 | 1 | 1 | no | 1 | 1 |
| 2 | 1 | 1 | no | 2 | 2 |
| 3 | 1 | 1 | no | 3 | 3 |
| 4 | 0 | 2 | yes: nums[0]=0, count→1, start=1 | 3 | 3 |
| 5 | 1 | 1 | no | 4 | 4 |
| 6 | 1 | 1 | no | 5 | 5 |
| 7 | 0 | 2 | yes: nums[1]=1 (skip), start=2; nums[2]=1(skip),start=3;... continues until nums[4]=0, count→1, start=5 | 2 | 5 |
| 8 | 1 | 1 | no | 3 | 5 |

Return `5`. ✓ (matches LC 1493's example — delete index 4, giving `[1,1,1,1,1]`)

## Complexity

**Time: O(n).** `start` and `end` each advance at most `n` times total.

**Space: O(1).** Just the running zero count and a couple of pointers.

## Alternative Approaches

Same shape could track two separate values — the length of the run of 1s immediately before the current `0` and immediately after — and combine them (`before + after`) instead of using a window/count approach. Equivalent in complexity, more specific to "exactly one exception" problems where the exception's position matters more directly. Not implemented this session.

## Submissions

- [Accepted](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/submissions/2094533049) — 2026-08-05

## Open Questions

- **ANSWERED 2026-08-05 (same session, at wrap-up)** — Does he connect this to `fundamentals/10-max-ones-with-single-flip`? He named the connection himself right after wrap-up and asked for it to be documented explicitly. Not spontaneous *during* the solve, but self-initiated during reflection rather than needing to be told — worth watching whether it surfaces even earlier (mid-solve) on the next matching problem.
- Does gating a recording step behind an overly narrow condition (here, `=== 1` instead of "the loop invariant already guarantees validity") recur on a future variable-window problem?
