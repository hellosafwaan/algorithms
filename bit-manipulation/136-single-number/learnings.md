Session: [031_2026-06-16_single-number.md](../../safwaan/sessions/031_2026-06-16_single-number.md)

## How It Felt
Pretty easy — but only because of prior groundwork. Bit operations and XOR properties were already internalized from building the bit manipulation cheat sheet, so the problem fell into place quickly. Without that foundation, this would have been a genuinely hard pattern to invent cold.

## Key Insight
The reason XOR works here comes down to two properties: `a ^ a = 0` (a number cancels itself out) and `0 ^ b = b` (XOR with 0 changes nothing). So if every number except one appears exactly twice, and you XOR the whole array together, every pair cancels itself to 0, and you're left XOR-ing the lone survivor with 0 — which just gives you the survivor back.

The reason order doesn't matter is that XOR is commutative and associative. You can mentally reorder the array so all the pairs are next to each other, cancel them, and you're left with the single number — even though the real array is in some random order.

## Solution Walkthrough
So the brute force here would be something like a frequency map — count every number, then find the one with count 1. That works, but it needs O(n) extra space.

The XOR trick gets you to O(1) space by noticing something about the structure of the problem: every number except one appears *exactly* twice. That "exactly twice" is the whole key — it's what makes XOR cancellation useful.

Here's the move: start a `result` at 0, then XOR every element in the array into it, one at a time.

```javascript
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```

Why does this work? Think about what's happening to `result` as you walk the array. Each duplicate pair, no matter how far apart they are in the array, eventually both get XOR'd into `result`. Because XOR is commutative and associative, it doesn't matter what order they show up in — by the time you've XOR'd both copies of a duplicate number in, they've cancelled each other back to 0 (`a ^ a = 0`), and `0` XOR'd with anything else just passes that anything else through unchanged (`a ^ 0 = a`).

So by the end of the loop, every pair has silently cancelled itself, and the only thing left standing is the lone number that never had a partner to cancel with.

Traced on `[4, 1, 2, 1, 2]`:
- `result = 0`
- `0 ^ 4 = 4` → `result = 4` (100)
- `4 ^ 1 = 5` → `result = 5` (101)
- `5 ^ 2 = 7` → `result = 7` (111)
- `7 ^ 1 = 6` → `result = 6` (110)
- `6 ^ 2 = 4` → `result = 4` (100)
- Loop ends, return `4` ✓

Notice the `1`s and `2`s end up cancelling each other out across the trace even though they're not adjacent — that's the commutative/associative property doing the work, not coincidence.

## Pattern Introduced
XOR self-cancellation: `a ^ a = 0`, `a ^ 0 = a`. Use whenever a problem guarantees every element appears an even number of times except one (or some count) that appears once — XOR-ing the whole array collapses everything but the answer.

## Watch Out For
- This only works because duplicates appear *exactly* twice. If duplicates could appear three times, XOR cancellation breaks (three XORs of the same number doesn't cancel to 0 — it equals the number itself).
- Don't reach for a HashMap/Set here just because it's the default "have I seen this" instinct — that costs O(n) space for no reason once you recognize the XOR shape.

## Template
```javascript
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```

## Trace Through
See walkthrough above — `[4, 1, 2, 1, 2]` → `4`.

## Complexity
**Time: O(n)** — one pass over the array, one XOR operation per element, each O(1).
**Space: O(1)** — only one accumulator variable (`result`), no auxiliary data structure that scales with input size.

## Submissions
[https://leetcode.com/problems/single-number/submissions/2035240559](https://leetcode.com/problems/single-number/submissions/2035240559) — Accepted, 1ms runtime (beats 72.23%), 53.49MB memory (beats 99.31%), 2026-06-16.

## Open Questions
- None outstanding — first zero-mistake, zero-hint session of the sprint.
