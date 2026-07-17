Session: [069_2026-07-17_rotate-array](../../safwaan/sessions/069_2026-07-17_rotate-array.md)

## How It Felt

Started confident — wrote a brute-force rotation from scratch and immediately recognized the TLE meant something about complexity was wrong, without needing that pointed out. The optimization itself was a harder climb than recent sessions: the index-mapping insight came together through guided tracing, but the *modulo-for-wraparound* idea specifically didn't feel familiar and needed to be taught directly rather than derived — a genuine new concept, not a re-derivation of something already known. The two follow-up O(1)-space approaches (three reversals, cyclic replacement) were also explicitly requested as direct teaching rather than worked through Socratically.

## Key Insight

Rotating right by `k` means every element at index `i` belongs at index `(i + k) % n` — the `%` wraps indices that overflow past the end of the array back to the start, the same remainder mechanic already used for digit extraction (`n % 10`), just applied to a new kind of problem (cyclic ranges instead of place values).

The genuinely self-generated insight of the session: after getting the index formula, the instinct was to write `nums[newIndex] = nums[i]` directly in place — and independently, before being asked, correctly identified that this destroys values at `newIndex` before they've been read for their *own* index mapping. That's the real reason a rotate-in-place-naively approach doesn't work, and it's what motivates every one of the three solutions below (extra array to avoid the collision, or a mechanism — reversal or cycle-tracking — that provably never reads-after-overwrite).

## Solution Walkthrough

**Approach 0 — brute force (what TLE'd):** pop the last element, unshift it to the front, `k` times. `nums.pop()` is O(1), but `nums.unshift()` has to shift every remaining element over by one, so it's O(n). Doing that `k` times gives O(n·k) — with `n` and `k` both up to 10⁵ in the constraints, that's up to 10¹⁰ operations, hence the timeout.

**Approach 1 — extra array (submitted, accepted):** Once the destination formula `(i + k) % n` was in hand, the natural first fix is: don't overwrite `nums` while still reading from it — write into a *fresh* array of the same size instead, then copy that back into `nums` at the end (needed because the problem requires modifying `nums` in-place, not returning a new array). One pass to place every element at its computed destination, one pass to copy back. Two O(n) passes, so O(n) total, and correct because there's no aliasing — reads all come from the original untouched `nums`, writes all go to the new array.

**Approach 2 — three reversals (O(1) space):** Reverse the *whole* array first. This correctly puts the last `k` elements at the front and the first `n-k` at the back (the actual rotation), but each of those two chunks is now internally backwards. Reversing the first `k` elements, then reversing the remaining `n-k` elements, un-does just the internal backwardness of each chunk without moving them from their new positions.

**Approach 3 — cyclic replacements (O(1) space):** Instead of a second array, follow the destination chain directly inside `nums`. Save the value about to be overwritten *before* overwriting it, then carry that saved value to *its* destination, and repeat. This traces out a cycle of index visits that (for the right `n`/`k`) can loop back to the starting index before every element has moved — so the code tracks a total moved-count and restarts a new chain from the next unvisited index until everything's placed.

## Pattern Introduced

Array Rotation — Index Mapping via Modulo, with three implementation strategies (extra array, in-place reversal, in-place cyclic replacement) trading off simplicity vs. space.

## Watch Out For

- `%` for wraparound is a distinct use of modulo from digit extraction (`n % 10`) — same operator, different mental model (cyclic range vs. place-value). Didn't feel obviously connected at first.
- Writing into a new array by computed index (not `push`) means the array needs to be pre-sized or indices assigned directly — `rotatedArray[newIndex] = value`, not `.push(value)`.
- The function signature is `void` — must mutate `nums` directly, not `return` a new array. First draft of the extra-array approach returned instead of copying back; caught by re-checking the signature.
- Cyclic replacement's chain can close before touching every element — the multi-start/moved-count structure exists specifically to handle that, not an edge case you can skip.

## Template

```js
// Extra array — O(n) time, O(n) space (what was submitted)
function rotate(nums, k) {
    const n = nums.length;
    const rotatedArray = [];
    for (let i = 0; i < n; i++) {
        const newIndex = (i + k) % n;
        rotatedArray[newIndex] = nums[i];
    }
    for (let i = 0; i < n; i++) {
        nums[i] = rotatedArray[i];
    }
}

// Three reversals — O(n) time, O(1) space
function rotateThreeReversals(nums, k) {
    const n = nums.length;
    k = k % n;
    reverseRange(nums, 0, n - 1);
    reverseRange(nums, 0, k - 1);
    reverseRange(nums, k, n - 1);
}
function reverseRange(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}

// Cyclic replacements — O(n) time, O(1) space
function rotateCyclic(nums, k) {
    const n = nums.length;
    k = k % n;
    if (k === 0) return;
    let movedCount = 0;
    for (let start = 0; movedCount < n; start++) {
        let current = start;
        let carrying = nums[start];
        do {
            const dest = (current + k) % n;
            const saved = nums[dest];
            nums[dest] = carrying;
            carrying = saved;
            current = dest;
            movedCount++;
        } while (current !== start);
    }
}
```

## Trace Through

Input: `nums = [1,2,3,4,5]`, `k = 2`

**Extra array:** `i=0→newIndex 2`, `i=1→3`, `i=2→4`, `i=3→0`, `i=4→1` → `rotatedArray = [4,5,1,2,3]` → copied back into `nums`.

**Three reversals:** `[1,2,3,4,5]` → reverse all → `[5,4,3,2,1]` → reverse first 2 → `[4,5,3,2,1]` → reverse last 3 → `[4,5,1,2,3]`.

**Cyclic:** start at index 0, carrying `1` → dest 2 (save `3`) → carrying `3` → dest 4 (save `5`) → carrying `5` → dest 1 (save `2`) → carrying `2` → dest 3 (save `4`) → carrying `4` → dest 0 → back at start, done. Final: `[4,5,1,2,3]`.

All three: `[4,5,1,2,3]` ✓

## Complexity

**Brute force:** O(n·k) time — `k` iterations, each with an O(n) `unshift`. O(1) space. Times out on large inputs.

**Extra array:** O(n) time — two linear passes. O(n) space — one extra array of size n.

**Three reversals:** O(n) time — three passes whose combined work is bounded by n total swaps. O(1) space — swaps happen in place.

**Cyclic replacements:** O(n) time — every element is moved exactly once across however many chains it takes. O(1) space — no extra array, just a few scalar variables.

## Submissions

- https://leetcode.com/problems/rotate-array/submissions/2070701132/ — Accepted, 41/41, 1ms runtime (beats 83.91%), 65.27MB memory (beats 58.85%) — extra-array approach

## Open Questions

- Does the modulo-wraparound concept transfer cold to a different cyclic problem (e.g. circular queue, Josephus-style)?
- Can the three-reversals and cyclic-replacement approaches be implemented cold, without notes, at the redo? Both were given as direct teaching this session, not self-derived.
