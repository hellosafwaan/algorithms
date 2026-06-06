# LC 27 — Remove Element

Session: [014_2026-06-06_remove-element](../../safwaan/sessions/014_2026-06-06_remove-element.md)

## How It Felt

Confusing at the start. The problem says "remove all occurrences" but you can't actually delete elements from an array in JavaScript — the array stays the same length. That took a bit to sink in. Once that clicked, the constraint that valid elements need to end up on the *left* side made the marker/flag approach useless, and the swap idea came naturally.

The swap solution felt like a solid idea but had more edge cases than expected — termination especially. The read/write approach was much simpler once the pattern was explained, and it came together in one attempt.

## Key Insight

**Swap approach:** Two pointers converge from both ends. p1 scans for targets; swappableIndex scans right-to-left for valid elements to swap in. The tricky part is the termination: you stop when the pointers cross (`swappableIndex <= p1`), because at that point everything from p1 onward is a target — there's nothing valid on the right to swap with. Return `p1`, not `n - valuesSwapped`, because `p1` directly tells you how many valid elements are in the first `p1` positions.

**Read/Write approach:** One pointer reads every element, the other only moves when you write a valid element. When you find a non-target, write it at the write pointer and advance both. When you find a target, skip it — read pointer moves, write pointer stays. It's safe to overwrite because the write pointer can never get ahead of the read pointer, so you never destroy a value you still need.

## Solution Walkthrough

### Solution 1 — Swap to Back

So the idea is: keep valid elements at the front, push targets toward the back. You don't need to carefully place the targets — the problem says the right side doesn't matter. You just need the left side to be clean.

Two pointers: `p1` starts at the left and scans for targets. `swappableIndex` starts at the right and points to where we can pull a valid element from.

When `p1` finds a target, we can't just leave it there. We need to replace it with something valid from the right side. But the element at `swappableIndex` might itself be a target — so we run an inner while loop to find the rightmost non-target. We keep decrementing `swappableIndex` while `nums[swappableIndex] === target`.

One catch with the inner loop: what if the entire right side is targets? We stop the inner loop when `swappableIndex` hits 0 to avoid going negative. That's the `swappableIndex > 0` condition.

Now we have a swappable index. But before swapping, we check: have the pointers crossed? If `swappableIndex <= p1`, we're done — p1 has passed everything valid, and there's nothing left to fix. Break. If they haven't crossed, swap.

After the swap, `p1` holds a valid element. Advance it. Loop continues.

When the loop terminates, everything in `nums[0..p1-1]` is valid. Return `p1`.

**The bug that was easy to miss:** originally the termination was `if(swappableIndex === 0) break`. That's wrong — it breaks too early when swappableIndex happens to reach 0 while p1 is still to the left of it (valid swap still possible), and doesn't break when the pointers cross mid-array. The correct condition is `swappableIndex <= p1`.

```js
function removeElement(nums, target) {
    const n = nums.length;
    let swappableIndex = n - 1;
    let p1 = 0;

    while(p1 <= swappableIndex) {
        const valueAtp1 = nums[p1];
        if(valueAtp1 === target) {
            let valueAtSwappableIndex = nums[swappableIndex];
            while(valueAtSwappableIndex === target && swappableIndex > 0) {
                swappableIndex--;
                valueAtSwappableIndex = nums[swappableIndex];
            }
            if(swappableIndex <= p1) break;
            const temp = valueAtp1;
            nums[p1] = valueAtSwappableIndex;
            nums[swappableIndex] = temp;
        }
        p1++;
    }
    return p1;
}
```

**When to prefer this over the read/write approach:** When write operations are expensive. This approach does fewer writes — each swap "fixes" one target position, whereas the read/write approach copies every valid element forward.

---

### Solution 2 — Read/Write Pointers

This one is simpler. Two pointers, both start at index 0, both move left to right.

`p2` is the read pointer — it looks at every element, no exceptions. `p1` is the write pointer — it only advances when we've written a valid element to it.

When `p2` finds a non-target element: copy it to `nums[p1]`, then advance both pointers. When `p2` finds a target: skip it. Just advance `p2`. The write pointer stays put, waiting for the next valid element.

Why is it safe to overwrite `nums[p1]`? Because `p1` is always at or behind `p2`. By the time we write to position `p1`, `p2` has already read that position and moved on. We're not destroying anything we still need.

At the end, `p1` is the number of valid elements written. Return it.

```js
function removeElement(nums, target) {
    const n = nums.length;
    let p1 = 0; // write pointer
    let p2 = 0; // read pointer

    while(p2 <= n - 1) {
        const valueAtP2 = nums[p2];
        if(valueAtP2 !== target) {
            nums[p1] = valueAtP2;
            p1++;
        }
        p2++;
    }
    return p1;
}
```

## Pattern Introduced

**Read/Write Pointers (same direction)** — new pattern. One pointer reads every element, the other only advances on a write. The write pointer's final position is the answer. Safe to overwrite because write pointer never gets ahead of read pointer.

This is different from the converging two-pointer pattern (which requires sorted input or a structural property). The read/write pattern works on any array.

## Watch Out For

- **Termination in the swap approach** — `swappableIndex <= p1`, not `swappableIndex === 0`. The pointers crossing mid-array is what terminates, not one pointer hitting zero.
- **Return value in swap approach** — return `p1`, not `n - swaps`. Count of valid elements = where the left pointer stopped.
- **Missing p1++ for non-target in swap approach** — if p1 is only incremented inside the `if(target)` block, non-target elements cause an infinite loop. The increment must be outside and unconditional.
- **When tracing bugs, use the smallest input possible.** A length-4 array took 40 minutes to trace. `[1, 3]` would have caught the infinite loop bug in 30 seconds.

## Template

**Read/Write (the simpler one — default to this):**
```js
let p1 = 0; // write pointer
for (let p2 = 0; p2 < nums.length; p2++) {
    if (nums[p2] !== target) {
        nums[p1++] = nums[p2];
    }
}
return p1;
```

**Swap to back (use when minimising writes matters):**
```js
let p1 = 0;
let swappableIndex = nums.length - 1;
while (p1 <= swappableIndex) {
    if (nums[p1] === target) {
        while (nums[swappableIndex] === target && swappableIndex > 0) swappableIndex--;
        if (swappableIndex <= p1) break;
        [nums[p1], nums[swappableIndex]] = [nums[swappableIndex], nums[p1]];
    }
    p1++;
}
return p1;
```

## Trace Through

**Input:** `nums = [3, 2, 2, 3]`, `target = 3`

**Read/Write:**
```
p1=0, p2=0: nums[0]=3 (target) → skip. p2=1
p1=0, p2=1: nums[1]=2 (valid) → write nums[0]=2, p1=1, p2=2
p1=1, p2=2: nums[2]=2 (valid) → write nums[1]=2, p1=2, p2=3
p1=2, p2=3: nums[3]=3 (target) → skip. p2=4
Loop ends. Return p1=2. nums=[2,2,2,3] (first 2 are valid)
```

**Swap:**
```
p1=0, swappableIndex=3: nums[0]=3 (target)
  inner: nums[3]=3 → swappableIndex=2, nums[2]=2 ≠ target, stop
  2 > 0: swap → nums=[2,2,3,3]. p1=1
p1=1, swappableIndex=2: nums[1]=2 (not target) → p1=2
p1=2, swappableIndex=2: nums[2]=3 (target)
  inner: nums[2]=3 → swappableIndex=1, nums[1]=2 ≠ target, stop
  swappableIndex(1) <= p1(2): break
Return p1=2. nums=[2,2,3,3] (first 2 are valid)
```

## Complexity

**Both solutions — Time: O(n), Space: O(1)**

Why O(n): every element is visited at most once. The read/write approach visits each element exactly once. The swap approach: p1 moves forward, swappableIndex moves backward — together they scan the array once, O(n) total even with the inner while loop (swappableIndex never moves right, so its total movement across the whole run is at most n steps).

Why O(1): no auxiliary data structures. The array is modified in place.

## Submissions

- [Swap solution — 100th percentile](https://leetcode.com/problems/remove-element/submissions/2023643894)
- [Read/Write solution — 100th percentile](https://leetcode.com/problems/remove-element/submissions/2023914541)

## Open Questions

- When do you reach for the swap approach vs the read/write approach? The problem says write operations are expensive — but in an interview, is swap ever the default answer?
