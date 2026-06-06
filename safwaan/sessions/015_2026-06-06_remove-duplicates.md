# Session: Remove Duplicates from Sorted Array (LC 26) — 2026-06-06

## What He Attempted

Initially reached for a swap/move-to-end approach — move duplicate elements to the back of the array. Articulated the setup (p1 at 0, p2 at 1, find duplicates) but got stuck on what to do when one is found. After realising he "never knows where the end is," he pivoted to the ignore-duplicates approach.

First code attempt introduced an unnecessary inner while loop to skip duplicates, and used `const` for `valueAtP2` while reassigning it inside the loop — would have thrown a TypeError.

Second attempt: removed the inner while, kept the `const` issue. Cleaned up on third attempt — simplified to a single outer while loop with an if/else.

## Where He Got Stuck

Deciding when to advance the write pointer (p1). Got tangled up thinking about both pointers moving together. Unlocked by isolating p2 first: "what does p2 do on every step, no exceptions?" → "it reads, always moves." Then: "so when does p1 move?" → "only after writing." Then: "when does it write?" → "when nums[p2] !== nums[p1]."

## Mistakes Made

- Reached for swap/move-to-end first (wrong approach for this problem — no fixed "end" to target)
- Used `const` for a variable he then reassigned in an inner while loop — self-caught after being asked about `const`
- Built an unnecessary inner while loop — removed after being asked "do you need this?"

## Key Insight

The write pointer only advances when you find a new unique element. Even after writing, keep p1 there — the next read might produce the same value again, in which case p1 stays put and p2 keeps reading. The sorted property guarantees all duplicates are adjacent, so this always works.

## Complexity Reached

Time: O(n) — p2 visits every element once  
Space: O(1) — in-place, no extra data structures

## Coach Notes for Next Session

- This session was clean and fast — he self-corrected the approach and derived the write condition himself.
- The initial swap instinct was pattern-matching from LC 27 (swap to back). That's fine — it shows the previous problem is in memory. The key gap is noticing early when the new problem's constraints don't support that approach.
- The const reassignment bug: flagged when asked, not self-caught before running. Keep watching for variable declaration habits.
- Next problem: Trapping Rain Water (LC 42) — Phase 2 final problem. Hard. Probe the LC 88 fill invariant before starting.
