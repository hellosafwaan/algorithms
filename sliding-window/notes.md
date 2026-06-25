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

---

## Key Distinctions

| Type | Window Size | Unit | Add | Shrink condition |
|------|------------|------|-----|-----------------|
| Variable, maximize | grows/shrinks | char/num | always | while invalid |
| Variable, minimize | grows/shrinks | char/num | always | while valid |
| Fixed | constant `k` | word | rebuild each time | never (fixed) |

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
