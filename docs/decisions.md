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

### Stage 2 Consent Handling

Decision:
Legal consent is enforced via a session-based modal gate
prior to granting access to protected routes.

Rationale:
- Mirrors industry-standard adult platforms (e.g., OnlyFans)
- Avoids premature backend coupling
- Keeps legal acknowledgment explicit and auditable

Status:
Accepted — Stage 2

### Stage 3 Scope Lock

Out of scope:
- OAuth implementation
- User persistence
- Cookies / JWTs
- Third-party SDKs

Reason:
Prevent premature coupling and security debt.