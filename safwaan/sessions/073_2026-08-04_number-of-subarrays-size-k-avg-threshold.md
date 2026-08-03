# Session: Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold — 2026-08-04

## What He Attempted

Same-day follow-up to LC 643. Explained the full approach unprompted, before showing any code: seed the first window's sum, compute its average, check against `threshold`, count it if it qualifies; then slide — for each step, remove the outgoing element (at the old `i`), add the incoming element (at `i + k`), recompute sum and average, check again, count again.

Brought working code (already submitted on LeetCode, initially with the wrong submission link pasted — a different problem, LC 2461 — caught and corrected when flagged):

```js
function numOfSubarrays(arr, k, threshold) {
    let count = 0;
    let currentSum = 0;
    for(let i = 0; i < k; i++) {
        currentSum += arr[i]
    }
    let currentAverage = currentSum / k;
    if(currentAverage >= threshold) count++;
    for(let i = 0; i < arr.length; i++) {          // bug: should be arr.length - k
        currentSum = currentSum - arr[i] + arr[i + k];
        currentAverage = currentSum / k;
        if(currentAverage >= threshold) count++;
    }
    return count;
};
```

## Where He Got Stuck

Didn't get stuck on the core approach — it's the same shape as LC 643, and he named the connection ("very similar to the last problem, just a small condition change") without being asked. The one issue was the slide loop's bound: `i < arr.length` instead of `i < arr.length - k`, which runs several iterations past the last real window and reads `arr[i+k]` out of bounds.

## Mistakes Made

- Slide loop bound `arr.length` instead of `arr.length - k` — runs extra iterations that read `undefined` from out-of-bounds array access. Notably, this bug never produced a wrong final count on any tested input: `undefined` arithmetic poisons `currentSum` to `NaN`, and `NaN >= threshold` is always `false` in JS, so the extra iterations are silently harmless. Still a real bug — correct by a language quirk, not by construction. Self-corrected to `arr.length - k` in one guided question, and referenced the identical bound from `maxSubarraySumSizeK`/LC 643 without being told to look there.
- Pasted the wrong submission link initially (LC 2461 instead of LC 1343) — caught and corrected immediately when pointed out.

## Key Insight

His own words: "this was very similar to the last problem that we did, so just a small condition change." The fixed-window seed-then-slide shape is the same as LC 643 and `maxSubarraySumSizeK`; the only real difference is counting every qualifying window instead of tracking a single max.

## Complexity Reached

O(N) time (seed O(k) + slide O(N-k)), O(1) space — not explicitly re-derived this session since it's the same shape as LC 643, discussed there in detail.

## Coach Notes for Next Session

- The "NaN masks an out-of-bounds loop bound" bug shape is new — see patterns.md #75. Worth checking on the next fixed-window problem whether he re-derives the slide loop's bound from "how many windows are left" rather than defaulting to the array's full length.
- Good sign: he named the LC 643 connection himself, unprompted, this time — contrast with LC 643 itself, where the fundamentals-module connection needed to be asked for directly. Worth watching whether this keeps happening without prompting on the next sliding-window bonus problem.
- Submission-link mix-up (pasted a different problem's link) was a one-off slip, not treated as meaningful — just double-check links before logging in future wrap-ups.
