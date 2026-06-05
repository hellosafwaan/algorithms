# Next Permutation — Personal Notes

## Key Insight
When you scan from the right, the suffix is descending until the pivot. A descending suffix means you've exhausted all arrangements for that prefix — there's nothing larger you can make from those elements. The pivot is the rightmost element that can still go higher.

## Solution Walkthrough

The problem: given an array representing a permutation of numbers, rearrange it into the next lexicographically greater permutation. If no greater permutation exists (the array is fully descending), rearrange it into the smallest possible order (fully ascending). Do it in-place.

**What does "next permutation" even mean?**

Think of the array as a number. `[1, 2, 3]` is like 123. The next permutation is the next largest number you can form using the same digits — 132. Then 213, 231, 312, 321. After 321 (fully descending), you wrap around to 123 (fully ascending).

The problem is asking: given the current arrangement, what's the next one up?

**The key observation: descending suffixes**

Scan from the right. At some point you'll hit a drop — an element that's smaller than the one after it. Everything to the right of that element is in descending order.

Why does a descending suffix matter? Because a descending sequence is already in its largest possible arrangement. `[3, 2, 1]` — there's nothing larger you can make from those three elements without changing something to their left. So the suffix is "exhausted."

The element just before the suffix — where the drop happens — is called the pivot. It's the rightmost element that can still go higher.

Take `[1, 3, 5, 4, 2]`. Scanning right to left: 2 < 4? No. 4 < 5? No. 5 < 3? Wait — we check `nums[i] < nums[i+1]`, so: is `nums[2]=5` < `nums[3]=4`? No. Is `nums[1]=3` < `nums[2]=5`? Yes — pivot is at index 1, value 3. Everything to its right `[5, 4, 2]` is descending.

**Step 1: Find the pivot**

Scan right to left, find the first index `i` where `nums[i] < nums[i+1]`. That's the pivot. Start the scan at `n-2` (not `n-1`) because you're comparing `nums[i]` with `nums[i+1]` — you need a right neighbor.

**Step 2: Find the swap candidate**

We want to make the permutation just slightly larger. So we swap the pivot with the smallest number in the suffix that's still larger than the pivot. That gives us the minimum possible increase at the pivot position.

In our example, pivot = 3. The suffix is `[5, 4, 2]`. The smallest value greater than 3 is 4. So we swap 3 and 4.

We find it by scanning right to left again — the first element we encounter that's greater than the pivot is the rightmost one, which is the smallest qualifying candidate (because the suffix is descending, smaller values are on the right). We scan right to left and `break` at the first match.

After swapping: `[1, 4, 5, 3, 2]`.

**Step 3: Reverse the suffix**

After the swap, the suffix is still in descending order — `[5, 3, 2]`. We want the next permutation to be as small as possible beyond the pivot position, so we reverse the suffix to put it in ascending order.

`[1, 4, 5, 3, 2]` → reverse from index 2 onward → `[1, 4, 2, 3, 5]`. That's the next permutation.

We reverse using two pointers: `left = i+1`, `right = n-1`, swap and converge inward until they meet.

**The edge case: no pivot found**

If you scan the entire array and never find a drop, the whole array is descending — `[5, 4, 3, 2, 1]`. This is the largest possible permutation. The next one wraps around to the smallest — reverse the whole array to get `[1, 2, 3, 4, 5]`.

The `pivotFound` boolean flag handles this. If after the outer loop it's still false, reverse the whole array.

**Why scan right to left for the swap candidate, not left to right?**

If you scanned left to right, you'd find the largest element in the suffix that's greater than the pivot — not the smallest. Take suffix `[5, 4, 2]` and pivot 3. Left to right, the first element greater than 3 is 5. Swapping 3 and 5 gives `[1, 5, 4, 3, 2]` — that's a much bigger jump, not the *next* permutation. Right to left gives you 4, which is the minimum increase. That's why the direction matters.

**Why is this O(n) despite nested loops?**

The outer loop finds the pivot — one pass right to left. The inner loop finds the swap candidate — one pass right to left through the suffix. The reverse is one pass through the suffix. All three are sequential, not nested — each element is touched a constant number of times across all three passes combined. Total O(n).

---

## Pattern Introduced
**Pivot + swap + two-pointer reverse.** Three passes, all O(n), all sequential.

Also the first real use of two-pointer reverse as a standalone technique.

## The Four Steps
1. Scan right to left → find pivot (`nums[i] < nums[i+1]`)
2. Scan right to left again → find rightmost `j` where `nums[j] > nums[i]`
3. Swap `i` and `j`
4. Reverse from `i+1` to end (descending → ascending)

**Edge case:** No pivot found (array fully descending) → reverse the whole array.

## Watch Out For
- Start outer loop at `n-2` (not `n-1`) — you access `nums[i+1]`
- Scan RIGHT TO LEFT for the swap candidate — left to right gives you the largest, not the next
- `break` after the inner swap (stop at first match from the right)
- `break` after the reverse in the outer loop (only one pivot to process)
- Boolean flag needed to handle the no-pivot edge case

## Template
```js
var nextPermutation = function(nums) {
    const n = nums.length
    let pivotFound = false
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivotFound = true
            for (let j = n - 1; j > i; j--) {
                if (nums[j] > nums[i]) {
                    const temp = nums[i]; nums[i] = nums[j]; nums[j] = temp
                    break
                }
            }
            let left = i + 1, right = n - 1
            while (left < right) {
                const temp = nums[left]; nums[left] = nums[right]; nums[right] = temp
                left++; right--
            }
            break
        }
    }
    if (!pivotFound) {
        let left = 0, right = n - 1
        while (left < right) {
            const temp = nums[left]; nums[left] = nums[right]; nums[right] = temp
            left++; right--
        }
    }
}
```

## Complexity
Time: O(n) — three sequential passes, not nested
Space: O(1) — in-place

## Open Questions
- Can you solve this without the boolean flag? (hint: think about what happens if you always reverse from i+1 after the loop)
- Redo this problem fresh after palindrome check — see how much you can crack without guidance
