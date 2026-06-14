# LC 383 — Ransom Note

## How It Felt
Pretty easy. Reached for a HashMap solution quickly and independently — increment for ransomNote, decrement using magazine, then check all counts are zero. No real struggle.

## Key Insight
Count how many of each character ransomNote needs, then "spend" magazine's characters against that count. If any character still has a positive count at the end, magazine didn't have enough of it.

## Solution Walkthrough

The concept behind the problem name: a kidnapper cuts individual letters out of a magazine and pastes them together to form a ransom note. Each letter can only be used once — once it's cut out, it's gone.

So the question is just: does magazine have enough of each character that ransomNote needs?

The HashMap approach: build a frequency map of ransomNote (what we need), then walk through magazine and decrement counts (what we're spending). At the end, any positive count means we came up short on that character.

**Why we use `counts.get(char) ?? 0`:** `Map.get()` returns `undefined` for missing keys. The `??` operator falls back to `0` when the value is `undefined` or `null` — so we can skip the `has` check entirely when building the map. Without this, you'd need an `if/else` to handle the first time a character appears.

**Why we only decrement when `has` returns true in the magazine loop:** we only care about characters ransomNote needs. If magazine has a character ransomNote doesn't need, we ignore it — no point decrementing something that isn't in the map.

**The final check:** any count > 0 means ransomNote needed that character more than magazine had it. Return false. If everything is ≤ 0, we had enough of everything.

---

## Approaches

### 1. Your Original Solution (Map with explicit has/get/set)

```javascript
function canConstruct(ransomNote, magazine) {
    const n = magazine.length;
    const m = ransomNote.length;

    const counts = new Map();
    for (let i = 0; i < m; i++) {
        const currentElement = ransomNote[i];
        if (counts.has(currentElement)) {
            counts.set(currentElement, counts.get(currentElement) + 1);
        } else {
            counts.set(currentElement, 1);
        }
    }

    for (let i = 0; i < n; i++) {
        const currentElement = magazine[i];
        if (counts.has(currentElement) && counts.get(currentElement) > 0) {
            counts.set(currentElement, counts.get(currentElement) - 1);
        }
    }

    for (const elem of counts) {
        const char = elem[0];
        const value = elem[1];
        if (value !== 0) return false;
    }
    return true;
}
```

Straightforward and easy to read. Verbose because each Map operation is spelled out individually.

---

### 2. Cleaned Up Map Solution (less boilerplate)

```javascript
function canConstruct(ransomNote, magazine) {
    const counts = new Map();

    for (const char of ransomNote) {
        counts.set(char, (counts.get(char) ?? 0) + 1);
    }

    for (const char of magazine) {
        if (counts.has(char)) {
            counts.set(char, counts.get(char) - 1);
        }
    }

    for (const val of counts.values()) {
        if (val > 0) return false;
    }
    return true;
}
```

Same logic, less code. `counts.get(char) ?? 0` removes the need for the `has/else` block when building the map. `counts.values()` lets you skip destructuring `[char, value]` in the final loop.

---

### 3. Early Exit with Remaining Counter

```javascript
function canConstruct(ransomNote, magazine) {
    const counts = new Map();

    for (const char of ransomNote) {
        counts.set(char, (counts.get(char) || 0) + 1);
    }

    let remaining = ransomNote.length;

    for (const char of magazine) {
        if (counts.get(char) > 0) {
            counts.set(char, counts.get(char) - 1);
            remaining--;

            if (remaining === 0) {
                return true;
            }
        }
    }

    return false;
}
```

Same Map approach but with an early exit. `remaining` tracks how many ransomNote characters still need to be found. Every time magazine provides one, decrement it. The moment it hits 0, you're done — no need to scan the rest of magazine.

**`|| 0` vs `?? 0`:** Both work here since counts are always ≥ 0. The difference: `||` treats `0` as falsy (so `0 || 0` still gives 0, which is fine for counting). `??` only falls back when the value is `undefined` or `null` — safer in general when 0 is a meaningful value.

---

### 4. Array of 26 (charCodeAt)

```javascript
function canConstruct(ransomNote, magazine) {
    const counts = new Array(26).fill(0);

    for (const char of ransomNote) {
        counts[char.charCodeAt(0) - 97]++;
    }

    for (const char of magazine) {
        counts[char.charCodeAt(0) - 97]--;
    }

    return counts.every(c => c <= 0);
}
```

Instead of a Map, uses a fixed array of 26 slots — one per letter of the alphabet. `charCodeAt(0)` gives the ASCII value of a character (`'a'` = 97, `'b'` = 98, ..., `'z'` = 122). Subtracting 97 maps `'a'` → 0, `'b'` → 1, ..., `'z'` → 25.

No need to check `has` before decrementing — if magazine has a character ransomNote didn't need, its slot goes negative, and the final check `every(c => c <= 0)` still passes.

**`new Array(26).fill(0)`:** creates an array of 26 slots all set to 0. Without `.fill(0)` the slots are `undefined`, which breaks the `++` increment.

Same O(1) space as the Map version — the alphabet is fixed at 26 regardless of input size.

---

### 4. Naive Approach (no HashMap)

```javascript
function canConstruct(ransomNote, magazine) {
    magazine = magazine.split('');

    for (const char of ransomNote) {
        const idx = magazine.indexOf(char);
        if (idx === -1) return false;
        magazine.splice(idx, 1);
    }
    return true;
}
```

For each character in ransomNote, scan magazine to find it with `indexOf`, then remove it with `splice` so it can't be reused.

**`splice(idx, 1)`:** removes 1 element at position `idx` from the array. The rest shift left. General form: `array.splice(startIndex, deleteCount)`.

**Why it's slow:** `indexOf` is O(n) per character — it scans the whole array each time. So for every character in ransomNote, you're potentially scanning all of magazine. That's O(m × n) overall.

The HashMap solutions avoid this by pre-counting in a single pass, making each lookup O(1).

---

## Pattern Introduced
HashMap — frequency counting (increment/decrement variant)

## Watch Out For
- `Map.get()` returns `undefined` for missing keys — use `?? 0` to default to zero, or check `has` first
- `splice` only works on arrays, not strings — convert with `split('')` first if needed
- `charCodeAt(0) - 97` maps lowercase letters to indices 0–25

## Complexity
**HashMap solutions:** Time O(n + m), Space O(1) — the map holds at most 26 entries (bounded by alphabet, not input size)

**Naive:** Time O(n × m), Space O(m) — for each of n ransomNote chars, you scan up to m magazine chars

## Submissions
- https://leetcode.com/problems/ransom-note/submissions/2032955640
