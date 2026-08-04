Session: [073_2026-08-04_number-of-subarrays-size-k-avg-threshold](../../safwaan/sessions/073_2026-08-04_number-of-subarrays-size-k-avg-threshold.md)

## How It Felt

"This was very similar to the last problem that we did, so just a small condition change."

## Key Insight

Same fixed-window seed-then-slide shape as LC 643 (Maximum Average Subarray I), but instead of tracking a single running max, every window that clears the threshold gets counted. The slide mechanics don't change at all — only what you *do* with each window's average does.

## Solution Walkthrough

The problem asks: out of every contiguous subarray of size `k`, how many have an average `>= threshold`?

That's a fixed-size window again, so the shape is identical to `maxSubarraySumSizeK` and LC 643:

1. Seed the first window — sum its first `k` elements, divide by `k` to get its average, and check it against `threshold` right away. If it qualifies, count it.
2. Slide the window one step at a time: subtract the outgoing element (the one at the old start), add the incoming element (`k` positions ahead of the one that just left), recompute the sum and average, and check against `threshold` again — every single window gets its own check, since (unlike a "count all subarrays ending here" problem) window size never changes, so there's no bulk-counting shortcut. Each valid window is exactly one count.

The one thing that actually needs care here is the slide loop's bound. The first loop already consumes the very first window, so there are exactly `arr.length - k` windows left to slide through — not `arr.length`. Looping the full `arr.length` reads past the end of the array on the last few iterations, and `arr[out_of_bounds]` is `undefined` in JS. `currentSum - arr[i] + undefined` becomes `NaN`, and `NaN >= threshold` is always `false` — so those extra iterations happen to be harmless, but only because of that specific JS quirk. The correct fix is to bound the loop by `arr.length - k`, matching the exact same bound already used in the fixed-window fundamentals problems.

## Pattern Introduced

**Sliding Window — Fixed Size (numeric slide + count)**

Same as the "Fixed Window — Numeric Slide" flavor (`maxSubarraySumSizeK`, LC 643), but the closing move is "count every window that satisfies a condition" instead of "track the max." Since the window is always exactly `k` elements, there's no bulk-counting shortcut (unlike the *variable*-window counting technique from `count all valid subarrays ending here`) — every window gets its own individual check.

## Watch Out For

- **Slide loop bound is `arr.length - k`, not `arr.length`.** The first loop already consumes the first window; looping the full array length reads out of bounds on the tail end.
- **Out-of-bounds reads don't always crash in JS.** `arr[outOfBounds]` is `undefined`, and `undefined` in arithmetic becomes `NaN`. `NaN >= anything` is always `false`, so an incorrect loop bound like this can accidentally produce the right final answer anyway — don't mistake "passed the test cases" for "the loop bound is correct." Check the bound is right by construction, not by luck.
- **Check the threshold on every single window, not just some.** Since the window is fixed-size, every slide produces exactly one new window to check — there's no "count all valid suffixes" shortcut like the variable-window counting problems have.

## Template

```javascript
function numOfSubarrays(arr, k, threshold) {
    let count = 0;
    let currentSum = 0;
    for (let i = 0; i < k; i++) {
        currentSum += arr[i];
    }
    if (currentSum / k >= threshold) count++;

    for (let i = 0; i < arr.length - k; i++) {
        currentSum = currentSum - arr[i] + arr[i + k];
        if (currentSum / k >= threshold) count++;
    }

    return count;
}
```

## Trace Through

`arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4`

| step | currentSum | avg | counted? | count |
|------|-----------|-----|----------|-------|
| seed (indices 0-2: 2+2+2) | 6 | 2 | no | 0 |
| i=0 → window[1,2,3] | 6 | 2 | no | 0 |
| i=1 → window[2,3,4] | 9 | 3 | no | 0 |
| i=2 → window[3,4,5] | 12 | 4 | yes | 1 |
| i=3 → window[4,5,6] | 15 | 5 | yes | 2 |
| i=4 → window[5,6,7] | 18 | 6 | yes | 3 |

Loop bound `arr.length - k = 5`, so `i` runs 0-4 only. Return `3`. ✓ (matches LC 1343's example 2)

## Complexity

**Time: O(N).** One O(k) pass to seed, one O(N-k) pass to slide and check — both bounded by `N`.

**Space: O(1).** A running sum, a running count, no extra structures.

## Alternative Approaches

**Prefix sum.** Build `prefix[i]` = sum of `arr[0..i-1]` in one O(N) pass, then any window's sum is `prefix[i+k] - prefix[i]` — check each one against `threshold * k` (avoids repeated division) and count. Same O(N) time overall as the sliding window, different mechanism. Not implemented this session — flagged 2026-08-04 alongside the same note on LC 643.

## Submissions

- [Accepted](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/submissions/2093169075) — 2026-08-04 (after fixing the loop-bound bug)

## Open Questions

- Does the "derive the slide loop's bound from windows-remaining, not `arr.length`" check happen unprompted on the next fixed-window problem, or does it need to be asked again? (patterns.md #75)
- Does relying on a language-specific quirk (NaN propagation) to accidentally avoid a wrong answer get flagged as "still a bug" on his own next time, without being told?
