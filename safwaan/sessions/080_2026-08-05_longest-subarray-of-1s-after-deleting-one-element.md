# Session: Longest Subarray of 1's After Deleting One Element — 2026-08-05

## What He Attempted

Same-day follow-up to LC 1658. Brought the problem via an external recommendation ("someone said this can be solved by sliding window") and asked for confirmation before starting to think it through. Once confirmed, worked through the entire reframing via guided questions, with zero direct answers given at any point:

1. If deleting exactly one element to maximize a run of 1s, is it ever useful to delete a `1`? → correctly answered: no, only a `0` helps.
2. Why does deleting a `0` help? → correctly answered: it merges the two runs of 1s on either side into one.
3. Given a window with at most one `0`, what's the length of the run of 1s after deleting that `0`? → correctly derived: `windowLength - 1`.
4. Checked against example 3 (`[1,1,1]`, no zeros at all, but must still delete one element) — confirmed the `L - 1` formula still gives the right answer (`3 - 1 = 2`) even with zero zeros present, since "at most one zero" includes the zero-zero case.
5. What to track while sliding, and when to shrink? → correctly answered: count of zeros in the window; shrink while count > 1.

Wrote the initial implementation independently:

```js
function longestSubarray(nums) {
    let start = 0;
    let longestSubarrayLen = 0;
    let zeroCountInWindow = 0;
    for (let end = 0; end < nums.length; end++) {
        if(nums[end] === 0) zeroCountInWindow++;
        while(zeroCountInWindow > 1) {
            if(nums[start] === 0) zeroCountInWindow--
            start++
        }
        if(zeroCountInWindow === 1) {                    // bug: excludes the zero-zero case
            longestSubarrayLen = Math.max(longestSubarrayLen, end - start);
        }
    }
    return longestSubarrayLen;
};
```

## Where He Got Stuck

The bug was a direct consequence of not yet trusting the "zero zeros still counts" edge case in the code, even though he'd already correctly reasoned through it verbally two steps earlier: the `if(zeroCountInWindow === 1)` guard excluded any window with *zero* zeros from ever being recorded, so an all-ones input (`[1,1,1]`) returned `0` instead of the correct `2`. Caught via the same test case that had already surfaced the edge case verbally — asked directly whether `=== 1` accounts for the zero-zero case, and self-corrected by removing the condition entirely (recording unconditionally every iteration, since the window is already guaranteed to have `<= 1` zero right after the shrink loop).

## Mistakes Made

- Recording condition `zeroCountInWindow === 1` excluded the zero-zero-in-window case, even though this exact case had already been reasoned through correctly moments earlier. Self-corrected in one question by removing the condition.

## Key Insight

Deleting a `1` never helps; only deleting a `0` that sits between two runs of 1s can merge them. That reframes the problem into "find the longest window containing at most one `0`," and the answer for any such window is `windowLength - 1` — a formula that already handles the all-ones edge case (delete one arbitrary element from an all-1s array) without needing a special case.

## Complexity Reached

Not explicitly re-derived (same O(n) time / O(1) space shape as the day's other variable-window problems).

## Coach Notes for Next Session

- Second instance of the "at-most-one-exception" window family this week (after `fundamentals/10-max-ones-with-single-flip`) — connected at wrap-up, self-initiated: correctly identified both problems as the same mechanism under different wording, and pinpointed the one real difference (flip-in-place keeps window length; delete shrinks it by one). Worth checking if this link surfaces even earlier — mid-solve, unprompted — next time. Also second instance of a disguised-problem reframing (after LC 1658, patterns.md #79) — this time he asked for confirmation upfront rather than self-diagnosing the gap, but once confirmed, derived every subsequent piece himself with zero direct answers needed. Meaningfully cleaner than LC 1658 in that respect.
- **Worth addressing directly next time it comes up:** he called the session "a failure" because he couldn't derive the initial insight without guided questions, despite flawless independent execution once the plan was established. This conflates two different things — arriving at a novel reframing unaided vs. executing a known mechanism — and the harsh self-label doesn't match the actual session (which was strong: fast, clean, zero direct answers, correct edge-case handling). Worth a direct, honest conversation about separating "needed guidance to see the insight" from "failed."
