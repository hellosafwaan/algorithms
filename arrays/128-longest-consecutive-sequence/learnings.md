Session: [030_2026-06-15_longest-consecutive-sequence](../../safwaan/sessions/030_2026-06-15_longest-consecutive-sequence.md)

## How It Felt

Difficult at first. The key block was figuring out how to pick the right element to start counting from — I tried walking backwards with a while loop before seeing the one-shot check. A few JavaScript bugs (const on mutable vars, for...in on a Set, .get() on a Set) added friction. Once the sequence-start condition clicked, the rest fell into place.

## Key Insight

A number is the start of a consecutive sequence if and only if `n - 1` is NOT in the Set. Skip everything else — let the "real" start handle it. This means even with nested loops, each element is visited at most twice total, so the algorithm is O(n), not O(n²).

## Solution Walkthrough

So the problem wants the longest run of consecutive integers in an unsorted array. Sorting would make this trivial — one pass, compare neighbours — but sorting costs O(n log n) and we need O(n).

The insight is: what does sorting actually give us? The ability to ask "does the next integer exist?" in O(1). We can get that for free with a Set, without ever sorting the array.

**Step 1 — Build the Set.**  
`new Set(nums)` handles duplicates for free. Every element is now O(1) lookup.

**Step 2 — Find sequence starts.**  
The clever part: don't start counting from every element. Only start from the *beginning* of each sequence. A number is a sequence start if its left neighbour (`n - 1`) is NOT in the Set. If `n - 1` IS in the Set, someone to the left of us will start that sequence — skip this number.

Why does this matter? Without this check, landing on `3` in the sequence `[1,2,3,4]` would count `3,4` and give length 2. We'd undercount.

**Step 3 — Count the sequence.**  
Once we've confirmed `elem` is a sequence start, we walk right with a while loop: keep incrementing `curr` and `count` as long as `curr + 1` is in the Set. When the chain breaks, we've found the full length of this sequence.

**Step 4 — Track the maximum.**  
Standard comparator: `maxCount = Math.max(count, maxCount)`. No reset needed because `count` is scoped inside the `if` block — each sequence start gets a fresh `count = 1`.

**Why is it O(n) even though there are two loops?**  
The outer `for...of` visits every element once. The inner `while` only runs when we're at a sequence start. Across the entire array, how many total steps does the while loop take? Each element can be visited by the while loop at most once — `2` can only be stepped through during the sequence starting at `1`. So across all sequences, the while loop collectively runs at most n times. Total: O(n).

## Pattern Introduced

Hash Set — O(1) membership lookup to avoid sorting. Sequence-start filtering to prevent redundant counting.

## Watch Out For

- `for...in` on a Set gives you nothing useful — use `for...of` for values (arrays, Sets, strings), `for...in` for keys (plain objects)
- Set has `.has()`, `.add()`, `.delete()` — NOT `.get()`. That's a Map.
- The sequence-start check must be `!seen.has(elem - 1)` — flip your instinct (we want the element with NO left neighbour, not one that HAS a left neighbour)
- If `count` and `curr` are scoped inside the `if` block, you don't need a manual reset — each sequence start is a fresh scope
- `new Set(nums)` is cleaner than a manual for loop; Set takes any iterable

## Template

```js
function longestConsecutive(nums) {
    if (nums.length === 0) return 0;

    const seen = new Set(nums);
    let maxCount = 0;

    for (const num of seen) {
        if (!seen.has(num - 1)) {
            let curr = num;
            let count = 1;
            while (seen.has(curr + 1)) {
                curr++;
                count++;
            }
            maxCount = Math.max(count, maxCount);
        }
    }

    return maxCount;
}
```

## Trace Through

Input: `[100, 4, 200, 1, 3, 2]`  
Set: `{100, 4, 200, 1, 3, 2}`

- `num = 100`: is `99` in Set? No → sequence start. Walk: `101` in Set? No. `count = 1`. `maxCount = 1`.
- `num = 4`: is `3` in Set? Yes → skip.
- `num = 200`: is `199` in Set? No → sequence start. Walk: `201` in Set? No. `count = 1`. `maxCount = 1`.
- `num = 1`: is `0` in Set? No → sequence start. Walk: `2` → yes, `3` → yes, `4` → yes, `5` → no. `count = 4`. `maxCount = 4`.
- `num = 3`: is `2` in Set? Yes → skip.
- `num = 2`: is `1` in Set? Yes → skip.

Result: `4` ✓

## Complexity

**Time: O(n)**  
Building the Set: O(n). The `for...of` outer loop: O(n). The `while` inner loop: amortized O(n) total — each element is stepped through by the while loop at most once across the entire execution. So despite the nesting, it's 2n total steps = O(n).

**Space: O(n)**  
The Set stores every element.

## Submissions

- Unclean (first attempt): https://leetcode.com/problems/longest-consecutive-sequence/submissions/2034018232 — 84th percentile
- Clean: https://leetcode.com/problems/longest-consecutive-sequence/submissions/2034024844

## Open Questions

- How does amortized O(n) reasoning apply to other "nested but not really" patterns (monotonic stack, sliding window)?
- Can you solve this with a sort + single pass? What are the tradeoffs?
