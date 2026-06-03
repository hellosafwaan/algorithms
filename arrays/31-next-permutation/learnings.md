# Next Permutation — Personal Notes

## Key Insight
When you scan from the right, the suffix is descending until the pivot. A descending suffix means you've exhausted all arrangements for that prefix — there's nothing larger you can make from those elements. The pivot is the rightmost element that can still go higher.

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
