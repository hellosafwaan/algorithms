# Sliding Window — Notes

## Core Idea

Two indices marking a window. Expand right on every step. The question is only *when* and *how much* to shrink left.

---

## Flavors

### 1. Running Min / Single Pass (degenerate case — no explicit window)
No left pointer at all. Just a running "best seen so far" variable.
- **When:** Maximize a value where one element must come before another (buy before sell).
- **Example:** LC 121 — Best Time to Buy and Sell Stock

### 2. Variable Window — Maximize
Expand right every step. Shrink left *while invalid*. Track max size seen.
- **When:** Longest substring satisfying a constraint.
- **Loop shape:**
  ```
  for each right:
      add s[right] to window state
      while window invalid:
          remove s[left], left++
      update max
  ```
- **Examples:** LC 3 (no repeating chars), LC 424 (longest repeating char replacement)

### 3. Variable Window — Minimize
Expand right every step. Shrink left *while valid*. Record *inside* the while loop.
- **When:** Shortest subarray satisfying a constraint (sum ≥ target, etc.).
- **Loop shape:**
  ```
  for each right:
      add nums[right] to window state unconditionally
      while window valid:
          record current window size
          remove nums[left], left++
  return 0 if never recorded
  ```
- **Key:** Record while still valid (inside while), not after. The add is always unconditional.
- **Examples:** LC 209 (min subarray sum ≥ target)

### 4. Fixed Window — Word Frequency
Window size is fixed (`words.length * wordLen`). Slide by 1. For each start, extract words and compare frequency maps.
- **When:** All words same length, find all starting positions of any concatenation.
- **Loop shape:**
  ```
  for i from 0 to s.length - k:
      clear windowFreq
      for j from 0 to words.length - 1:
          word = s.substring(i + j*wordLen, i + j*wordLen + wordLen)
          add to windowFreq
      if windowFreq matches wordFreq: record i
  ```
- **Key:** Atomic unit is words not characters. `i + j * wordLen` is the position formula.
- **Examples:** LC 30 (substring with concatenation of all words)

### 5. Fixed Window — Numeric Slide (sum / product)
Window size is a fixed `k`. Seed the first window with an O(k) pass, then slide by subtracting/dividing the outgoing element and adding/multiplying in the incoming one — O(1) per slide instead of recomputing the whole window.
- **When:** Max/target sum or product over every contiguous window of a fixed length.
- **Loop shape:**
  ```
  seed = combine(nums[0..k-1])
  for i from 0 to nums.length - k - 1:
      seed = uncombine(seed, nums[i])       // subtract or divide out
      seed = combine(seed, nums[i + k])     // add or multiply in
      compare seed against target/best
  ```
- **Key:** Only valid when "undo" is safe — division breaks on a `0` element; this is why the product variant assumes no zeros.
- **Examples:** `fundamentals/1-maximum-subarray-size-k`, `fundamentals/2-maximum-subarray-product-size-k`, `fundamentals/3-subarray-size-target-sum-k`, LC 643 (Maximum Average Subarray I — same seed-then-slide shape, plus one division by `k` at the end), LC 1343 (Number of Sub-arrays of Size K and Average ≥ Threshold — same shape, but count every qualifying window instead of tracking one max)
- **Watch out:** the slide loop bound is `arr.length - k`, not `arr.length` — the seed pass already consumed the first window. An out-of-bounds read (`arr[i+k]` past the end) silently becomes `NaN` in JS rather than crashing, which can mask this bug rather than surface it (see `safwaan/patterns.md` #75).

### 6. Fixed Window — Set/Map Composition Match (anagrams)
Window size is fixed (`pattern.length`). The window's *state* is a Set (membership only) or Map (exact frequency) of characters, compared against the target pattern's Set/Map after every slide.
- **When:** "Does this window contain the same characters as X" (Set) vs. "is this window a true anagram of X" (Map — order-independent, count-exact).
- **Key:** Delete a key the moment its count hits 0 — a stale zero-count entry silently breaks `map.size` comparisons.
- **Examples:** `fundamentals/4-has-substring-anagram` (Set), `fundamentals/5-count-substring-anagrams` (Map)

---

## Counting Techniques

These aren't new window shapes — they're closing moves layered on top of the variable-window pattern, for when the question is "how many windows" instead of "the longest/shortest window."

### Count all valid subarrays ending at `end`
Once the window `[start, end]` is valid, every shorter suffix of it — `[start+1, end]`, `[start+2, end]`, ..., `[end, end]` — is valid too, *if* validity is monotonic under shrinking (true for "sum/product below a positive threshold," "at most K distinct," etc.). So instead of counting `1` per valid window, add `end - start + 1` once per `end` — this counts every valid window ending there in one shot.
- **Examples:** `fundamentals/11-count-subarray-product`, `fundamentals/12-count-substring-atmost-k-distinct`

### "At most K" → "exactly K" via subtraction
`exactly(k) = atMost(k) - atMost(k - 1)`. If tracking "exactly K" directly inside one window is awkward (it would need separate invalid states for both "too many" and "too few"), solve the easier "at most K" twice and subtract — everything counted in `atMost(k)` but not `atMost(k-1)` has precisely `k` distinct elements.
- **Examples:** `fundamentals/13-count-substring-exactly-k-distinct`

### "At most one exception" window (single flip)
Instead of a size/count threshold, the window state is a single boolean flag marking whether the one allowed exception (e.g. a `0` in a binary string) is currently "spent" inside the window. On a new exception arriving while the flag is set, shrink specifically until the *old* exception exits (not just one step) before spending the flag again.
- **Examples:** `fundamentals/10-max-ones-with-single-flip`

---

## Key Distinctions

| Type | Window Size | Unit | Add | Shrink condition |
|------|------------|------|-----|-----------------|
| Variable, maximize | grows/shrinks | char/num | always | while invalid |
| Variable, minimize | grows/shrinks | char/num | always | while valid |
| Fixed (word freq) | constant `k` | word | rebuild each time | never (fixed) |
| Fixed (numeric slide) | constant `k` | char/num | slide (uncombine + combine) | never (fixed) |
| Fixed (set/map match) | constant `k` | char | slide (delete + add) | never (fixed) |

---

## Toolkit Reminders

- **Map comparison:** `===` compares references, always false. Compare size + iterate entries.
  ```js
  function mapsEqual(a, b) {
      if (a.size !== b.size) return false;
      for (let [k, v] of a) if (b.get(k) !== v) return false;
      return true;
  }
  ```
- **`for...of` on a Map** gives `[key, value]` pairs.
- **`s.substring(start, end)`** — second arg is end index (exclusive), not length.
- **Window size formula:** `i - left + 1` (both ends inclusive, needs +1).
- **Left pointer guard:** `left = Math.max(left, map[char] + 1)` — left never goes backwards.
