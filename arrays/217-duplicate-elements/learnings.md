Session: [019_2026-06-07_contains-duplicate](../../safwaan/sessions/019_2026-06-07_contains-duplicate.md)

## How It Felt

Easy. HashMap clicked immediately — didn't even think about brute force. The main thing that came up was learning that Set is the cleaner tool when you only need to track membership, not store a value alongside a key.

## Key Insight

For any "have I seen this before?" problem, reach for a Set first. HashMap works too, but Set has no falsy edge case (`has()` works cleanly on any value including `0`), no key-type conversion overhead, and communicates intent more clearly — you're tracking existence, not key-value pairs.

## Solution Walkthrough

The core idea: keep a record of every element you've seen. Before recording each one, check if it's already there. If it is — you've found a duplicate, return true. If you reach the end without a hit — no duplicates, return false.

**Why does this beat the nested loop?** The nested loop asks, for every element, "is this element anywhere else in the array?" — that's O(n) work per element, so O(n²) total. The Set approach trades space for time: you store what you've seen so that the "is this anywhere?" check is O(1) instead of O(n).

**Why Set over HashMap?** HashMap stores key-value pairs. Here you don't have a value to store — you just want to record that a number was seen. Set is exactly that: a collection of unique values, with O(1) `has()` and `add()`. No value means no `seen[0]` falsy trap (a plain object returns `undefined` for any key you haven't set, which is falsy — so `if(seen[0])` evaluates to false even after you've added `0`).

**The sort approach** is a different trade-off: sort the array first (O(n log n)), then check adjacent elements in one pass (O(n)). If two values are equal and adjacent, you have a duplicate. Iterate to `i < n - 1` because you're checking `nums[i + 1]` — going to `n - 1` would read out of bounds. This costs more time but uses O(1) extra space (assuming in-place sort). It also mutates the input, which may not be acceptable.

**The nested loop** is pure brute force: fix one element, scan everything after it. If any element matches, return true. O(n²) time, O(1) space. Never reach for this in an interview unless explicitly exploring approaches before optimizing.

## Pattern Introduced

**Hash Set — membership tracking**

When you only need to know whether something was seen (not retrieve a stored value), use a Set:
- `seen.has(x)` — O(1), no falsy trap, works on any value type
- `seen.add(x)` — O(1)

Use HashMap when you need to store something alongside the key (complement, count, index).

## Watch Out For

- `if(seen[x])` on a plain object — fails when `x` is `0` or any other falsy value (`false`, `""`, `NaN`). Use `x in seen` or `seen[x] !== undefined` instead. Or just use a Set.
- Number keys on plain objects get converted to strings — minor overhead, no correctness issue here, but it's why object access is slower than `Set.has()`.
- Sort approach iterates to `i < n - 1`, not `i < n` — you check `nums[i + 1]`, so stopping one early prevents an out-of-bounds read.

## Template

```js
// Set (cleanest — default to this for membership tracking)
function containsDuplicate(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}

// HashMap (works, but has falsy-zero edge case on plain objects)
function containsDuplicate(nums) {
    const seen = {};
    for (const num of nums) {
        if (num in seen) return true;
        seen[num] = true;
    }
    return false;
}

// Sort + adjacent check (O(n log n) time, O(1) extra space, mutates input)
function containsDuplicate(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) return true;
    }
    return false;
}

// Nested loop (brute force — O(n²), never use in interview)
function containsDuplicate(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) return true;
        }
    }
    return false;
}
```

## Trace Through

Input: `[1, 2, 3, 1]`

| i | num | seen (Set) | action |
|---|-----|-----------|--------|
| 0 | 1   | {}        | not seen → add 1 |
| 1 | 2   | {1}       | not seen → add 2 |
| 2 | 3   | {1,2}     | not seen → add 3 |
| 3 | 1   | {1,2,3}   | **seen** → return true |

Input: `[0, 1, 2]`

| i | num | seen (Set) | action |
|---|-----|-----------|--------|
| 0 | 0   | {}        | `has(0)` → false → add 0 |
| 1 | 1   | {0}       | `has(1)` → false → add 1 |
| 2 | 2   | {0,1}     | `has(2)` → false → add 2 |
| — | —   | end of array → return false |

*(The `0` case is why `if(seen[0])` with a plain object would fail — `seen[0]` is `undefined`, not `true`.)*

## Complexity

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Nested loop | O(n²) | O(1) | Never use |
| Sort + adjacent | O(n log n) | O(1) extra | Mutates input |
| HashMap | O(n) | O(n) | Falsy-zero edge case on plain object |
| Set | O(n) | O(n) | Cleanest — default choice |

**Why O(n)?** You iterate the array once. Each `has()` and `add()` on a Set is O(1). Total: n × O(1) = O(n).

**Why O(n) space?** In the worst case (no duplicates), you store every element before returning false.

## Submissions

- HashMap solution (13th pct): https://leetcode.com/problems/contains-duplicate/submissions/2025371977
- Set solution (65th pct): https://leetcode.com/problems/contains-duplicate/submissions/2025383209

## Open Questions

- Does the falsy-zero trap (`if(obj[key])`) come up pre-emptively next time, or only when prompted?
- "Set for membership, HashMap for key-value" — can he state this rule cold in a future session?
