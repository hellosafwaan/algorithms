Session: [047_2026-07-05_surrounded-regions.md](../../safwaan/sessions/047_2026-07-05_surrounded-regions.md)

## How It Felt
Way more mine than LC 200 was — same day, completely different mode. Came in with a plan that had a real hole in it (thought "surrounded" was about a cell's own position, not its whole region), and traced my way out of it step by step instead of being told. Got a little annoyed at one point when asked to re-explain the whole plan out loud one more time after I'd already stated every piece of it — fair pushback, I'd already said it.

## Key Insight
**"Surrounded" is a property of the whole connected region, not any single cell.** My first instinct was: check if a cell's own neighbors are all safely in bounds — but that's wrong, because a cell can be buried in the interior while still being *connected*, through a chain of other `O`s, to one that touches the border. A whole column of `O`s reaching down to the last row all survive together, even though the top one isn't anywhere near an edge itself.

Second insight: you have to walk the **entire** region even after you already know the verdict. The reason isn't about correctness of the answer — it's about `visited`. If you stop early the moment you hit a border cell, the rest of that region's cells never get marked, and the outer loop will wander back into them later and start a whole redundant re-exploration, treating an already-handled region as brand new.

## Solution Walkthrough
So the shape of this is: scan every cell, and for each one call `explore`, which behaves almost exactly like the flood fill from Number of Islands — bounds check, water check, visited check, mark, recurse in 4 directions — except now `explore` also **collects every coordinate it touches into an array** (`currentRegion`) and hands that whole array back to the caller when it's done.

Why collect the array? Because the decision "is this region surrounded" can only be answered once you've seen the *whole* region — and once you know the answer, you need to be able to act on every single cell in that region, not just the one you started from. So the array is both your evidence and your to-do list.

Back in `solve()`, after `explore` returns: if it gave you back `false` (bounced off immediately — water, or a cell some earlier region already claimed), skip it, nothing to do. If it gave you back a real array, that's a freshly-discovered whole region — time to decide its fate. Loop through every `[r, c]` in it and ask: is any of these actually sitting on the border? `r === 0 || r === rows-1 || c === 0 || c === cols-1`. Find even one, and the whole region is safe — `break` immediately, no point checking the rest. Find none, and you know with certainty the entire region is landlocked, so a second loop flips every coordinate in the array to `'X'`.

Two passes, deliberately separate: one to *decide*, one to *act*. You can't merge them, because you don't know whether to flip cell #1 until you've seen cell #12 — decide first, using the whole picture, then act.

## Pattern Introduced
**Graph DFS — Region Decision (walk full region, decide after).** A variant on the flood-fill pattern from LC 200:
- Same self-guarding recursive walk (bounds → invalid → visited → mark → recurse 4 ways).
- New addition: the walk **collects a per-region array** of every coordinate visited, instead of just returning a boolean.
- The verdict about the region (safe or captured) can only be computed once the walk is fully done — never decide mid-walk.
- Acting on the verdict (the flip) requires a *second* pass over the collected array — you cannot combine "check the condition" and "apply the consequence" into one loop, because finding a disqualifying cell late invalidates action already taken on earlier cells.

**Canonical alternative — Border-first flood fill:** instead of walking from every cell and asking "does this region touch the border," flip the direction: flood fill *starting only from `O`s already sitting on the border*, marking everything reachable as safe (e.g., `'#'`). Then one single final pass over the whole board: anything still `'O'` was never reached, so it's surrounded → flip to `'X'`; anything `'#'` gets restored to `'O'`. This drops the `visited` Set and the per-region arrays entirely — the board itself, via the `'#'` marker, becomes the visited-tracker. Same O(m·n) time, O(1) auxiliary space instead of O(m·n). **I still need to sit with this version more — it clicked conceptually when it was explained, but I haven't derived or re-explained it myself yet.**

## Watch Out For
- Checking a cell's own bounds vs. checking its neighbors' bounds are different things and easy to swap by accident — the neighbor-bounds check is what you use *inside* the recursive call to reject a probe before it happens; it says nothing about whether the *current* cell is on the border.
- The border condition needs all four sides: `r===0`, `r===rows-1`, `c===0`, `c===cols-1`. Missing the "far" edges (`rows-1`, `cols-1`) was my first mistake — caught by tracing a concrete bottom-right corner cell.
- `return false` inside a loop nested inside `solve()` doesn't just exit that loop — it exits the entire function. If you want to abandon just the current region's flip decision, set a flag and `break`, don't `return`.
- Recursive helper functions need every parameter threaded through every recursive call — forgetting to pass `currentRegion` in the 4 recursive calls means it's `undefined` one level down, silently breaking collection.
- Two separate passes for decide-then-act. Don't try to flip while still checking — you might invalidate cells you already touched.

## Template
```js
function solve(board) {
    const visited = new Set();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const currentRegion = explore(board, i, j, visited, []);
            if (!currentRegion) continue;

            let isSurrounded = true;
            for (const [r, c] of currentRegion) {
                if (r === 0 || r === board.length - 1 || c === 0 || c === board[0].length - 1) {
                    isSurrounded = false;
                    break;
                }
            }
            if (isSurrounded) {
                for (const [r, c] of currentRegion) board[r][c] = 'X';
            }
        }
    }
}

function explore(board, i, j, visited, currentRegion) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return false;
    const pos = i + ',' + j;
    if (board[i][j] === 'X') return false;
    if (visited.has(pos)) return false;

    visited.add(pos);
    currentRegion.push([i, j]);
    explore(board, i - 1, j, visited, currentRegion);
    explore(board, i + 1, j, visited, currentRegion);
    explore(board, i, j - 1, visited, currentRegion);
    explore(board, i, j + 1, visited, currentRegion);
    return currentRegion;
}
```

**Border-first alternative (needs more study):**
```js
function solve(board) {
    const rows = board.length, cols = board[0].length;
    for (let i = 0; i < rows; i++) { markSafe(board, i, 0); markSafe(board, i, cols - 1); }
    for (let j = 0; j < cols; j++) { markSafe(board, 0, j); markSafe(board, rows - 1, j); }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';
            else if (board[i][j] === '#') board[i][j] = 'O';
        }
    }
}
function markSafe(board, i, j) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
    if (board[i][j] !== 'O') return;
    board[i][j] = '#';
    markSafe(board, i - 1, j);
    markSafe(board, i + 1, j);
    markSafe(board, i, j - 1);
    markSafe(board, i, j + 1);
}
```

## Trace Through
Board:
```
X X X X
X O O X
X X O X
X O X X
```
Outer loop reaches (1,1): fresh `O` → walk discovers `(1,1), (1,2), (2,2)` (all interior). `currentRegion = [[1,1],[1,2],[2,2]]`. Border check: none of these three have `r` or `c` at 0 or 3 → `isSurrounded` stays `true` → flip all three to `X`.

Later the outer loop reaches (3,1): fresh `O` → walk discovers just `[[3,1]]` (boxed in by `X` on left/right, bottom is out of bounds). Border check: `r = 3 = rows - 1` → border hit immediately → `isSurrounded = false` → no flip.

Final board:
```
X X X X
X X X X
X X X X
X O X X
```
Matches the accepted submission. Full interactive comparison against the border-first alternative: [index.html](index.html).

## Complexity
**Time: O(m·n).** Every cell enters `visited` at most once across the whole run, so the total work inside all `explore` calls combined (across every region) is bounded by m·n. The two extra loops per region (border-check, flip) only ever iterate over coordinates that are already in some `currentRegion` — and the total size of all `currentRegion` arrays combined, across the whole board, can't exceed m·n either. So the extra passes don't add a new order of growth, they just walk the same m·n cells one more time each.

**Space: O(m·n).** `visited` Set (up to every land cell), every `currentRegion` array combined (bounded by total land cells), and the recursion stack (worst case one giant region, depth m·n).

## Submissions
- https://leetcode.com/problems/surrounded-regions/submissions/2056233249 (accepted, 65ms/5th percentile — expected given the Set + array overhead; see the border-first alternative for the O(1)-space version)

## Open Questions
- **Border-first flood fill (Solution B) — needs more study.** Clicked when explained and when built into the visualiser, but not yet self-derived or re-explained cold. Probe this explicitly before/at the next "flood from the boundary inward" problem (Pacific Atlantic Water Flow is the natural next test — it uses exactly this shape, flooding from two different sets of border cells).
- Can I state cold why the border-first version doesn't need a separate `visited` Set at all — what is it about the `'#'` marker that makes it double as both "processed" and "safe" simultaneously?
