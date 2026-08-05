# Session: Subarray Product Less Than K — 2026-08-05

## What He Attempted

Unprompted, self-connected to the fundamentals module before showing any code: "this question was literally the same as the one that we saw in the fundamentals question" (referring to `fundamentals/11-count-subarray-product`). Walked through the approach verbally (seed/expand the window, shrink while the product is `>= k`, then count every valid subarray ending at the current position via `end - start + 1`) and brought a working submission directly.

```js
function numSubarrayProductLessThanK(nums, k) {
    let answer = 0;
    let start = 0;
    let windowProduct = 1;
    for(let end = 0; end < nums.length; end++) {
        const currentElement = nums[end];
        windowProduct *= currentElement

        while(windowProduct >= k) {
            const startElement = nums[start];
            windowProduct /= startElement;
            start++
        }

        if(windowProduct < k) {
            answer += end - start + 1;
        };
    }
    return answer
};
```

## Where He Got Stuck

Didn't get stuck on his own — the coach found a real bug via stress-testing (20,000+ random cases against a brute-force reference), not via anything Safwaan reported experiencing. The submitted code above has no guard on the shrink loop; when a single element (or the running product) already meets or exceeds `k`, `start` can advance past `end`, making `end - start + 1` negative and corrupting the total. Concrete failing case: `nums=[7,2,7,8,6], k=1` → expected `0`, got `-4`.

**Notably, this exact buggy code was Accepted by LeetCode** — meaning LC 713's official test suite doesn't appear to include a case where `k` is small enough that a single array element alone violates the constraint. Safwaan confirmed the submission showed Accepted, then chose to file a bug report with LeetCode's GitHub issue tracker; the coach helped draft the report content (code, description, expected behavior) for him to review and submit himself.

Fixed by adding a guard to the shrink loop's condition. Two variants were tested (`start < end` and `start <= end`), both pass 20,000 random tests including `k=0` cases — but they're not equivalent in what they guarantee:
- `start <= end` lets the window fully empty (product resets cleanly to `1` when the last element is divided out) — matches the version already built in the fundamentals module.
- `start < end` stops one step earlier, leaving `windowProduct` holding an already-invalid single element's value, relying on the subsequent `if` check to skip recording it rather than fully normalizing the window state.

`start <= end` was chosen as the fix for both the final `index.js` and the bug report, since it's the cleaner invariant.

## Mistakes Made

- Shrink loop missing a `start <= end` (or `start < end`) guard — allows `start` to overshoot `end`, corrupting the count with negative values. Found by the coach via stress testing, not self-caught; the buggy version had already been Accepted by LeetCode.
- Filename was `indexjs` (missing the dot) instead of `index.js` — renamed during wrap-up.

## Key Insight

His own words: "pretty smooth, felt like the fundamentals problem in disguise." Direct transfer of the "count all valid subarrays ending at `end`" technique from `fundamentals/11-count-subarray-product` — expand unconditionally, shrink while invalid, then add `end - start + 1` once per `end` rather than counting one subarray at a time.

## Complexity Reached

O(n) time (amortized — `start` and `end` each move forward at most `n` times total), O(1) space. Not explicitly re-derived this session, already covered in the fundamentals module's documentation.

## Coach Notes for Next Session

- This is now roughly the fifth sliding-window bonus problem this week where the fundamentals connection surfaced fully unprompted, before any code was shown (after LC 1343, 1456, 438, and the eventual self-recognition at LC 567/1493) — the transfer instinct looks settled for this topic, consistent with the stack-fundamentals precedent from July.
- The missing-guard bug is a genuinely interesting one to flag: it's the same *shape* as the LC 1343 "loop bound masked by NaN" bug (patterns.md #75) and the general "off-by-one at the window's boundary" family, but this time the bug was invisible to LeetCode's own judge, not just to him. Worth remembering that "Accepted" isn't proof of correctness — stress testing against a reference caught something the official test suite didn't.
- He handled the "should I report this" moment well — verified acceptance status before assuming a bug report was warranted, checked for potential duplicates before submitting. Good instinct for engaging with external tools/platforms carefully.
