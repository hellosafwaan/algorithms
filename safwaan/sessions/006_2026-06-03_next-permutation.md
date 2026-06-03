# Session: Next Permutation — 2026-06-03

## What He Attempted
Chose this problem from a sheet he's following. Had background on permutations from school (n!/r! formula) but no knowledge of "next permutation" concept specifically.

## Where He Got Stuck
- Couldn't derive the descending suffix observation independently — needed it explained step by step through the sorted list of arrangements
- Two-pointer reverse was completely new — had to be traced and explained
- Tried to pattern-match to "rotate the array" before understanding the general algorithm
- Loop condition on the reverse step: wrote `left === right` instead of `left < right`
- Put the `break` outside the `if` block initially (would always break after first outer loop iteration)
- Needed a flag variable to handle the "no pivot found" edge case — got there himself once asked the right question

## Mistakes Made
- O(n²) time complexity — counted two loops and assumed nested, needed explanation of sequential vs nested
- `break` outside the `if` block — caught when asked "what does the outer loop do after the swap?"
- Reverse loop condition `left === right` — caught when asked what the condition should be

## Key Insight
Never independently articulated one — this was a full guided walkthrough. He understood each step when it was explained and could reason forward from there, but could not derive the algorithm cold. This is expected: the problem requires the two-pointer pattern he hasn't built yet.

## Complexity Reached
Time: O(n) — Space: O(1)

## Coach Notes for Next Session
- Next: palindrome check (builds two-pointer instinct properly)
- After that: redo Next Permutation fresh — this is the explicit plan, Safwaan agreed to it
- When he comes back to Next Permutation: don't hint. Let him struggle with the descending suffix observation. He's seen it now — the question is whether it sticks.
- Probe complexity on the redo: watch for the sequential-vs-nested mistake again
