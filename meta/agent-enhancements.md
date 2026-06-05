# Agent Enhancement Backlog

Features to build on top of the daily activity log as data accumulates.

---

## Shipped

| Feature | Description | Date |
|---------|-------------|------|
| Daily accountability push | Runs 9am IST, reads TRACKER + HANDOFF, calculates pace, fires push notification | 2026-06-05 |
| EOD summary agent | Runs 10pm IST, reads daily-log.md, pushes today's score + pace | 2026-06-05 |
| Daily log at wrap-up | Appends JSONL record to `safwaan/daily-log.jsonl` on every wrap-up | 2026-06-05 |
| Weekly improvement review agent | Runs 7pm IST Fridays, checks meta/improvement-log.md for unactioned observations | 2026-06-05 |
| Self-improvement system | Mid-session feedback → immediate changes logged to meta/ | 2026-06-05 |

---

## In Progress

| Feature | Description | Priority |
|---------|-------------|----------|
| — | — | — |

---

## Backlog

| Feature | Description | Depends On | Priority |
|---------|-------------|------------|----------|
| Weekly summary agent | Every Sunday: problems solved, pace vs target, patterns struggled with, one focus for next week | 1+ week of daily log data | High |
| Pre-session brief command | Single command reads all 5 session-start files, outputs a 5-line brief: where you are, what's due, carry-forward to probe | Daily log running | High |
| Revisit reminder agent | Daily check of `revisit-queue.md` — nudges when a problem is due for cold redo (morning agent doesn't do this specifically) | Daily log running | Medium |
| Weak spot report | After Phase 3-4: flag which patterns are taking longest based on daily log | 3-4 weeks of data | Medium |
| Solve speed tracking | Track time-per-problem by topic — are you getting faster? | 4+ weeks of data | Medium |
| Interview readiness score | % interview-ready based on problems done, revisit success rate, pace | Phase 6+ complete | Low |
| Pattern detection | Which days/times are most productive, which problem types take longest | 6+ weeks of data | Low |
| Honest gap alert | If 2+ days missed: specific callout with problems behind + nearest deadline | Daily log running | Low |
| Interview simulation mode | Timed problem attempts, no hints, different coaching mode — triggered by keyword | Phase 6+ complete | Low |

---

## Notes

- All features read from files already in the repo — no external connectors needed
- Build incrementally: daily log → EOD agent → weekly summary → analytics
- Weekly summary becomes meaningful after ~2 weeks of consistent data
- Revisit success rate requires data from `safwaan/revisit-queue.md` being updated regularly
