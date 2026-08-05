Session: [081_2026-08-05_subarray-product-less-than-k](../../safwaan/sessions/081_2026-08-05_subarray-product-less-than-k.md)

## How It Felt

Pretty smooth — felt like the fundamentals problem in disguise.

## Key Insight

Direct transfer of `fundamentals/11-count-subarray-product`: expand the window unconditionally, shrink from the left while the product is `>= k`, then count **every** valid subarray ending at the current position in one shot via `end - start + 1`, instead of counting one subarray at a time.

## Solution Walkthrough

The question: how many contiguous subarrays have a product strictly less than `k`?

Same variable-window shape as the fundamentals module's product-counting problem:

1. Expand the window by multiplying `nums[end]` into `windowProduct`, every iteration, unconditionally.
2. While `windowProduct >= k`, shrink from the left — divide out `nums[start]`, advance `start`.
3. Once the window is valid (`windowProduct < k`), every shorter subarray ending at `end` — `[start+1, end]`, `[start+2, end]`, ..., `[end, end]` — is *also* valid, since dividing out more positive elements can only shrink the product further. So instead of counting `1`, add `end - start + 1` — that's every valid subarray ending here, counted at once.

**The bug that mattered here wasn't in this logic at all — it was in the shrink loop's boundary.** The first version submitted had `while(windowProduct >= k)`, with no check on `start` versus `end`. If a single element (or the running product) is already `>= k`, the loop needs to shrink past the point where `start` would exceed `end` — and without a guard, it does exactly that, dividing by elements past the window's actual right edge and producing a nonsensical `windowProduct`. Once `start > end`, `end - start + 1` goes negative, and the running `answer` gets corrupted.

Concretely: `nums = [7,2,7,8,6], k = 1`. Every element is `>= 1 = k`, so the correct answer is `0` (no valid subarrays exist at all). The unguarded version returns `-4`.

**This exact buggy version was Accepted by LeetCode** — found via stress-testing against a brute-force reference (20,000+ random cases), not via LeetCode's own test suite, which apparently doesn't include a case where `k` is small enough that a single array element alone breaks the constraint.

The fix: guard the shrink loop with `start <= end`:

```js
while (windowProduct >= k && start <= end) {
    windowProduct /= nums[start];
    start++;
}
```

This lets the window fully empty out when needed — dividing out the very last remaining element resets `windowProduct` cleanly to `1`, the correct value for an empty window, rather than leaving it holding a stale invalid value.

(A narrower guard, `start < end`, also passes every test — it just stops one step earlier and relies on the following `if` check to skip recording an already-invalid single-element window, rather than fully normalizing `windowProduct` back to `1`. Both are empirically correct here; `start <= end` is the more defensible one to reach for, since it keeps a cleaner invariant — `windowProduct` always equals the product of `nums[start..end]`, or `1` if the window is empty.)

## Pattern Introduced

**Sliding Window — Variable Size, count all valid subarrays ending at `end`**

Identical to `fundamentals/11-count-subarray-product` — same shrink-while-invalid loop, same bulk-counting closing move. The only genuinely new thing this problem surfaced was the boundary bug, not a new technique.

## Watch Out For

- **Guard the shrink loop with `start <= end`** whenever a single element could already violate the window's constraint on its own — without it, `start` can overshoot `end`, corrupting both `windowProduct` and any `end - start + 1` computation with negative values.
- **"Accepted" isn't proof of correctness.** This exact bug passed LeetCode's judge. Stress-testing against a brute-force reference on random inputs is worth doing even after a submission is accepted, especially for boundary-sensitive shrink loops.
- File naming: keep it `index.js`, not `indexjs` — a missing dot breaks the convention other tooling and links depend on.

## Template

```javascript
function numSubarrayProductLessThanK(nums, k) {
    let answer = 0;
    let start = 0;
    let windowProduct = 1;

    for (let end = 0; end < nums.length; end++) {
        windowProduct *= nums[end];

        while (windowProduct >= k && start <= end) {
            windowProduct /= nums[start];
            start++;
        }

        answer += end - start + 1;
    }

    return answer;
}
```

(Note: once the guard is in place, `windowProduct < k` is always true after the loop exits, so the `if` around the final line is unnecessary — it can be added unconditionally.)

## Trace Through

`nums = [10,5,2,6], k = 100`

| end | nums[end] | windowProduct | shrink? | end-start+1 | answer |
|-----|-----------|----------------|---------|--------------|--------|
| 0 | 10 | 10 | no | 1 | 1 |
| 1 | 5 | 50 | no | 2 | 3 |
| 2 | 2 | 100 | yes: /10 → 10, start=1 | 2 | 5 |
| 3 | 6 | 60 | no | 3 | 8 |

Return `8`. ✓ (matches LC 713's example)

## Complexity

**Time: O(n).** `start` and `end` each advance at most `n` times total across the whole run.

**Space: O(1).** Just a running product and two pointers.

## Alternative Approaches

Not explored this session, but worth naming: a logarithm-based approach (convert to a sum problem via `log(product) = sum(log(nums[i]))`, then it becomes a prefix-sum + two-pointer problem) — same asymptotic complexity, introduces floating-point precision concerns that the direct product approach avoids entirely. Direct product tracking (this solution) is simpler and safer given the constraint bounds.

## Submissions

- [Accepted (buggy version, no boundary guard)](https://leetcode.com/problems/subarray-product-less-than-k/submissions/2094908022) — 2026-08-05. Bug found post-acceptance via stress testing; a bug report was drafted for LeetCode noting the missing test coverage. Corrected version (with the `start <= end` guard) is what's in `index.js`.

## Open Questions

- Does the "Accepted doesn't mean bug-free — stress test anyway" lesson get applied proactively on a future problem, especially ones with tight boundary conditions (small `k`, single-element edge cases)?
- Follow up on whether the LeetCode bug report gets a response, and if the "3 potential duplicates" GitHub flagged turn out to already cover this.
