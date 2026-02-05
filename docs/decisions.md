We chose HTML-first over JSX to preserve inspectability and AI collaboration.

## Decision: Event-Driven Page & Section Hydration

**Status:** Accepted  
**Date:** 2026-02-01

### Context
The application loads page-level HTML dynamically and resolves nested sections after injection.

### Decision
We use a strict, event-driven lifecycle:

route:change  
→ content:loaded  
→ sections resolved (recursive)  
→ sections:loaded  
→ content:hydrated  

Each utility listens only for the events it needs and never calls other utilities directly.

### Rationale
- Prevents hidden coupling
- Makes hydration order explicit
- Simplifies debugging
- Allows future auth, API, and UI layers to hook in safely

### Consequences
- Slightly more ceremony
- Stronger guarantees
- Easier long-term maintenance
