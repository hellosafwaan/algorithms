Session: [074_2026-08-04_maximum-number-of-vowels-in-a-substring](../../safwaan/sessions/074_2026-08-04_maximum-number-of-vowels-in-a-substring.md)

## How It Felt

Pretty smooth, no real struggle this time.

## Key Insight

Same fixed-window seed-then-slide shape as the last two problems (LC 643, LC 1343) — the only thing that changes is what you're counting inside the window. Here it's "is this character a vowel," checked via O(1) `Set` lookup instead of the O(k) `string.includes()` scan.

## Solution Walkthrough

The problem: find the substring of exactly length `k` with the most vowels in it.

First choice worth calling out: how do you check "is this character a vowel" quickly? A string like `'aeiou'` with `.includes()` works, but that's an O(k) scan through the vowel string on every single check. A `Set` of the same characters gives O(1) lookup instead — same idea as reaching for a `Set` over an array whenever the question is "have I seen this / is this a member," not "what's the count."

From there it's the exact same fixed-window shape as LC 643 and LC 1343:

1. Seed the first `k`-length window — walk through it once, and for every character that's in the vowels `Set`, bump `currentVowelCount`.
2. Set `max` to that starting count.
3. Slide one step at a time: check the character leaving the window (decrement if it was a vowel), check the character entering the window (increment if it is one), then update `max`.

No division, no threshold comparison this time — just a running count and a running max, which makes this the simplest of the three fixed-window problems solved this session.

## Pattern Introduced

**Sliding Window — Fixed Size (Set lookup + count slide)**

Same fixed-window seed-then-slide shape as `maxSubarraySumSizeK`, LC 643, and LC 1343 — the payload being tracked in the window changes (sum → average-vs-threshold → vowel count), but the skeleton (seed once, slide by remove-outgoing/add-incoming, track a running best) is identical every time.

## Watch Out For

- **Use a `Set` for membership checks, not `string.includes()` or an array `.includes()`.** Both are O(k)/O(n) scans; a `Set` is O(1) per lookup.
- **The slide loop bound is `s.length - k`**, matching the same bound as every other fixed-window problem in this thread — got this right immediately this time, no repeat of the LC 1343 out-of-bounds slip.
- **The vowels `Set` is O(1) space, not O(k).** It's easy to reflexively attach a `k` or `n` to any data structure's space cost — check whether its size is actually determined by the input at all. Here it's always exactly 5 characters, full stop.

## Template

```javascript
function maxVowels(s, k) {
    const vowels = new Set('aeiou');
    let currentVowelCount = 0;
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) currentVowelCount++;
    }
    let max = currentVowelCount;

    for (let i = 0; i < s.length - k; i++) {
        if (vowels.has(s[i])) currentVowelCount--;
        if (vowels.has(s[i + k])) currentVowelCount++;
        max = Math.max(max, currentVowelCount);
    }

    return max;
}
```

## Trace Through

`s = 'abciiidef', k = 3`

| step | window | currentVowelCount | max |
|------|--------|-------------------|-----|
| seed (i=0-2: 'a','b','c') | "abc" | 1 | 1 |
| i=0: -'a', +s[3]='i' | "bci" | 1 | 1 |
| i=1: -'b', +s[4]='i' | "cii" | 2 | 2 |
| i=2: -'c', +s[5]='i' | "iii" | 3 | 3 |
| i=3: -'i', +s[6]='d' | "iid" | 2 | 3 |
| i=4: -'i', +s[7]='e' | "ide" | 2 | 3 |
| i=5: -'i', +s[8]='f' | "def" | 1 | 3 |

Return `3`. ✓ (matches LC 1456's example)

## Complexity

**Time: O(N).** One O(k) seed pass, one O(N-k) slide pass — bounded by `N` overall. `Set.has()` is O(1), so it doesn't change the per-step cost.

**Space: O(1).** The vowels `Set` always holds exactly 5 characters, regardless of `s` or `k` — initially mislabeled as O(k) before self-correcting.

## Submissions

- [Accepted](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/submissions/2093188492) — 2026-08-04, one submission

## Open Questions

- Does the fixed-window connection keep surfacing unprompted on the next sliding-window bonus problem, now two-for-two (LC 1343, LC 1456)?
- Does the first-stated Big-O answer come out correct on the next complexity question, now that the correction itself has gotten fast and confident across three instances (LC 81, LC 643, LC 1456)?
