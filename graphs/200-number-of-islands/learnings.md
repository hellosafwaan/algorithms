Session: [046_2026-07-05_number-of-islands.md](../../safwaan/sessions/046_2026-07-05_number-of-islands.md)

## How It Felt
Pretty easy — but honestly, because I watched a video first and followed the approach. Flagged that myself: this one is *recognized*, not yet *owned*. The cold redo (2026-07-19) is the real test. Also came in convinced this was BFS, not DFS — that confusion got resolved properly this session.

## Key Insight
**Exactly one cell per island returns `true` — the first cell of that island the outer scan reaches.** That cell passes all three guards, floods the *entire* island via recursion, and returns `true`. Every other cell of that island, when the scan gets to it later, fails the `visited.has(pos)` check and returns `false`. So `count` is really counting "flood origins," and each island can only ever have one origin.

Second insight, the one I got wrong first: **this is DFS, not BFS.** Four recursive calls written in a row do NOT execute as a layer — the first call runs to completion (floods everything it can reach) before the second call even starts. Stack → depth-first. Queue → breadth-first.

## Solution Walkthrough
So the first mental move is seeing the grid *as a graph*: every cell is a node, and each cell has up to 4 edges — up, down, left, right. Land cells connected to each other form one component, and "count the islands" is really "count the connected components." That reframing is the whole problem.

How do you count components? Scan every cell with a double loop, and for each cell ask `explore` to try flooding from there. `explore` is where everything happens, and it opens with three guards, in this exact order:

1. **Bounds check** — is `(r, c)` even on the grid? This is what lets the recursive calls be so carefree. `explore(r-1, c)` from the top row asks about row -1; instead of the *caller* checking before recursing (4 fiddly conditions at every call site), the *callee* protects itself with one check at the top. Return `false`, no harm done.
2. **Water check** — `grid[r][c] === '0'`? The flood stops here. Return `false`. Water is what separates islands, so the recursion never crosses it.
3. **Visited check** — have we already flooded this cell? This is the guard that prevents infinite recursion. Without it, cell A probes its neighbour B, B probes back into A, A probes B again... forever. Note the key is the *string* `'r,c'` — a Set of arrays wouldn't work because two arrays with the same contents are different objects (reference equality — we learned that at 3Sum).

Survive all three guards? Then this is fresh land. **Mark it visited immediately** — before recursing, so no neighbour can claim it — then fire the four recursive calls. Each one floods as deep as it can before the next starts. By the time all four return, every cell reachable from this one is in `visited`. Return `true`: "I flooded new land."

Back in the outer loop: `=== true` means "a new island was just discovered and fully consumed," so `count++`. Every later cell of that same island fails guard 3 and returns `false` — which is why the count can never double-count. One island, one origin, one `true`.

Why is order of the guards non-negotiable? Bounds must come first — `grid[-1][c]` would crash before the water check could run. And why mark visited *before* the four calls instead of after? Because during those calls, neighbours will probe back into this cell — the mark is what bounces them off.

## Pattern Introduced
**Graph DFS — Flood Fill on a grid.** First graphs-phase pattern. Components:
- Grid-as-graph: cell = node, 4-directional neighbours = edges
- Outer scan + "did this call discover anything new?" = connected-component counting
- Self-guarding recursion: callee checks bounds/validity, callers recurse blindly
- Visited Set with string keys to survive reference equality
- **Stack → DFS, queue → BFS** — the data structure holding pending work defines the traversal, not how the code reads

## Watch Out For
- **Sequential recursive calls are NOT a layer.** They look like "visit all 4 neighbours," but call #1 finishes its entire flood before call #2 starts. Reading code textually instead of tracing execution is what produced the BFS confusion.
- Visited keys must be primitives (`'r,c'` string). `visited.has([r, c])` is always false — arrays compare by reference.
- Mark visited *before* recursing, or neighbours re-enter and you recurse forever.
- Bounds guard before grid access, always — `grid[-1]` is `undefined`, and `undefined[c]` throws.
- `'0'` and `'1'` are *strings* in this problem. `grid[r][c] === 0` never matches.
- Recursion depth: worst case (one giant island) the stack is O(m·n) deep — on huge grids that's a stack-overflow risk; BFS with a queue avoids it.

## Template
```js
const countComponents = (grid) => {
  const visited = new Set();
  let count = 0;
  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
      if (explore(grid, r, c, visited) === true) count++;
    }
  }
  return count;
};

function explore(grid, r, c, visited) {
  // guards: bounds → invalid cell → already seen
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return false;
  if (grid[r][c] === '0') return false;
  const pos = r + ',' + c;
  if (visited.has(pos)) return false;

  visited.add(pos);          // claim BEFORE recursing
  explore(grid, r - 1, c, visited);
  explore(grid, r + 1, c, visited);
  explore(grid, r, c - 1, visited);
  explore(grid, r, c + 1, visited);
  return true;               // this call was a flood origin
}
```

## Trace Through
Grid (LC example, first island only):
```
1 1 0
1 1 0
0 0 1
```
Outer loop hits (0,0): fresh land → mark `'0,0'`, probe up (out of bounds, false), probe down → (1,0) fresh → mark `'1,0'`, its probes: up → (0,0) SEEN false, down → (2,0) water false, left → out false, right → (1,1) fresh → mark `'1,1'` → ... eventually (0,1) gets marked at stack depth 4: `explore(0,0) → explore(1,0) → explore(1,1) → explore(0,1)` — while (0,0)'s left/right probes still haven't run. **That stack picture is the proof this is depth-first.** Everything unwinds, `explore(0,0)` returns true → count = 1. Later, outer loop reaches (0,1), (1,0), (1,1): all fail `visited.has` → false → no double count. Then (2,2) fires a second flood → count = 2.

Full interactive version: [index.html](index.html) — debugger-style, every line, every call/return, with the call stack visible.

## Complexity
**Time: O(m·n).** Each cell gets marked visited at most once, and the flood work per marked cell is constant (4 probes). Rejected probes (water / seen / bounds) are O(1) each and each cell can only be probed by its ≤4 neighbours plus the outer scan — so total rejections are also O(m·n). It is *not* O((m·n)²) even though the outer loop calls `explore` on every cell, because the visited Set makes repeat calls constant-time bounces.

**Space: O(m·n).** The visited Set holds up to every land cell. The recursion stack is also O(m·n) worst case — one snake-shaped island threading the whole grid.

## Submissions
- https://leetcode.com/problems/number-of-islands/submissions/2056161532 (accepted)

## Open Questions
- Can I write flood fill cold, from a blank editor, with the verbal walkthrough first? (Redo 2026-07-19)
- Mutate-the-grid variant (flip `'1'` → `'0'` instead of a Set) — implement it and articulate the trade-off (O(1) space vs mutating input).
- BFS variant with a queue — after BFS is formally introduced. When does BFS beat DFS here? (Stack depth on giant islands.)
- DFS or BFS — can I answer cold on the next graph problem by pointing at the data structure?
