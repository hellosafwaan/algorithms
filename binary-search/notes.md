# Binary Search — Phase 5 Notes

## Core Shape

```js
let low = 0, high = n - 1; // or whatever range the answer could live in
while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (/* target too big for mid */) high = mid - 1;
    else if (/* target too small for mid */) low = mid + 1;
    else return mid;
}
// low and high have crossed here — everything's been checked
```

## What Changes Between Variants

- **What gets compared at `mid`:** an array element (LC 704), or a computed value like `mid * mid` (LC 69, "binary search on the answer").
- **What you return when the loop exits without a match:**
  - `-1` — target genuinely doesn't exist and there's no fallback answer (LC 704).
  - `low` (a.k.a. `start`) — round UP to the next valid slot. `low` only ever moves past elements smaller than the target, so it lands exactly one past the last "too small" element (LC 35 — Search Insert Position).
  - `high` (a.k.a. `right`) — round DOWN to the last valid candidate. `high` only ever moves past elements too big, so it lands exactly on the last "still valid" element (LC 69 — Sqrt(x)).

## Watch Out For

- `Math.floor` on the midpoint always — `(low + high) / 2` gives a float for odd sums.
- `low <= high`, not `low < high` — the loop must still check the single-element window.
- `low = mid + 1` / `high = mid - 1` — never reuse `mid` itself as the new boundary, or a 2-element window can infinite-loop.

## Problems

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| [LC 704 — Binary Search](704-binary-search/learnings.md) | Classic, array target | Baseline shape — return `-1` on miss |
| [LC 35 — Search Insert Position](35-search-insert-position/learnings.md) | Round up | Return `low`/`start` on miss — it's the insert point |
| [LC 69 — Sqrt(x)](69-sqrtx/learnings.md) | Binary search on the answer | No real array — search over `[0, x]`, compare `mid*mid` to `x`, return `high`/`right` (round down) |
