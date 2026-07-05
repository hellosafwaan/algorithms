Session: [051_2026-07-06_max-area-of-island.md](../../safwaan/sessions/051_2026-07-06_max-area-of-island.md)

## How It Felt
This one felt easy, and it should have — it's the same flood-fill shape as Number of Islands, just returning a number instead of a boolean. Good confirmation that the pattern actually stuck.

## Key Insight
"Count the size of a connected region" is the exact same walk as "does a connected region exist" — the only thing that changes is what you accumulate at each step (a running sum instead of nothing) and what you compare across regions (`Math.max` instead of a `count++`).

## Solution Walkthrough
Same shape as flood fill from Number of Islands: outer double loop scans every cell, and for each fresh `1` it finds, hands it to a recursive helper that walks the whole connected region. The only real difference is what the helper *returns* — instead of `true`/`false`, it returns the **size** of the region it just walked.

`computeArea(grid, i, j, visited)`:
1. Bounds check — off the grid, return `0` (contributes nothing).
2. Water check — `grid[i][j] === 0`, return `0`.
3. Visited check — already counted, return `0` (this is what stops double-counting and infinite recursion, exactly like LC 200).
4. Otherwise: mark visited, and return `1` (this cell) `+` the sum of all 4 recursive neighbor calls.

Back in the outer loop: after each fresh `1` triggers `computeArea`, compare its result against a running `maxArea`, keeping the largest.

One genuine edge case: if the whole grid is water, the outer loop never calls `computeArea` at all, so `maxArea` needs to start at `0` — not `-Infinity` — so that "no island found" naturally resolves to the correct answer.

## Pattern Introduced
No new pattern — this is a direct reapplication of **Graph DFS — Flood Fill** from Number of Islands, with the return value changed from a boolean signal to an accumulated sum. Confirms the pattern generalizes: flood fill can compute *any* accumulable property of a region (existence, size, or — as seen in Surrounded Regions — collect the whole region for a later decision).

## Watch Out For
- `const` can't hold a value you plan to update via `Math.max(...)` — needs `let`.
- The water-check guard is easy to forget if you're recalling the pattern from memory rather than re-deriving it — without it, the flood fill counts water cells as area and floods straight through them.
- All-water grid: initialize the running max to `0`, not `-Infinity`, so the "no island" case resolves correctly without a special-case check.

## Template
**Visited-Set version:**
```js
function maxAreaOfIsland(grid) {
    let maxArea = 0;
    const visited = new Set();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                maxArea = Math.max(maxArea, computeArea(grid, i, j, visited));
            }
        }
    }
    return maxArea;
}
function computeArea(grid, i, j, visited) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) return 0;
    if (grid[i][j] === 0) return 0;
    const pos = `${i},${j}`;
    if (visited.has(pos)) return 0;
    visited.add(pos);
    return 1
        + computeArea(grid, i - 1, j, visited)
        + computeArea(grid, i + 1, j, visited)
        + computeArea(grid, i, j - 1, visited)
        + computeArea(grid, i, j + 1, visited);
}
```

**Mutate-in-place version (better space, destroys input):**
```js
function computeArea(grid, i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) return 0;
    if (grid[i][j] === 0) return 0; // covers both "water" and "already counted"
    grid[i][j] = 0;
    return 1
        + computeArea(grid, i - 1, j)
        + computeArea(grid, i + 1, j)
        + computeArea(grid, i, j - 1)
        + computeArea(grid, i, j + 1);
}
```

## Trace Through
Grid with one 3-cell island and one isolated cell:
```
1 1 0
0 1 0
0 0 1
```
`(0,0)` fresh → floods `(0,0),(0,1),(1,1)` → area `3`. Later, `(2,2)` fresh → floods just itself → area `1`. `maxArea = max(3, 1) = 3`.

## Complexity
**Time: O(m·n)** — every cell is visited/marked exactly once; rejected probes are O(1) each.
**Space: O(m·n)** — visited Set (or none, in the mutate-in-place version — O(1) auxiliary there) plus worst-case recursion depth.

## Submissions
- Visited-Set version: https://leetcode.com/problems/max-area-of-island/submissions/2057301752 (accepted, 22.92nd/48.11th percentile)
- Mutate-in-place version: https://leetcode.com/problems/max-area-of-island/submissions/2057304264 (accepted, 77.44th/87.18th percentile)

## Open Questions
- None specific to this problem — it served as a transfer check for the LC 200 pattern, and the transfer held up cleanly.
