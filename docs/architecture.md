# Architecture Overview

This project is a framework-agnostic, client-side web template designed to be
forked and branded for multiple products without rewriting core logic.

The system is intentionally modular and declarative.

---

## Core Principles

1. **Single Source of Truth**
   - `site.config.js` is the only place where brand, copy, and environment data live.
   - No hard-coded brand values are allowed outside config.

2. **Deterministic Rendering**
   - HTML is loaded, then hydrated.
   - No component mutates global state implicitly.

3. **Fail Loud, Not Silent**
   - Missing routes, sections, or config values must surface visibly.
   - Development errors should never be hidden.

4. **Template First**
   - This repository represents a neutral template.
   - Forks may extend features but must not break contracts.

---

## Subsystems

### Router (`assets/js/router.js`)
**Responsibilities**
- Map URL paths to static HTML files in `/pages`
- Inject page content into `#app`
- Emit lifecycle events

**Forbidden**
- No knowledge of brand, auth, or business logic
- No DOM mutation outside `#app`

---

### Section Loader (`assets/js/section-loader.js`)
**Responsibilities**
- Load reusable sections (header, footer, hero, etc.)
- Inject into designated containers

**Forbidden**
- No routing logic
- No config validation

---

### Template Binder (`assets/js/binder.js`)
**Responsibilities**
- Replace `{path.to.value}` placeholders using `SITE_CONFIG`
- Visibly mark unresolved bindings

**Forbidden**
- No mutation of config
- No assumptions about value existence

---

### Config System (`config/`)
**Responsibilities**
- Declare brand, environment, and feature flags
- Enforce shape via schema

**Files**
- `site.config.js` — runtime values
- `site.config.schema.js` — structural contract

---

## Lifecycle Events

The system emits explicit events to support progressive hydration:

- `content:loaded`
- `sections:loaded`
- `content:hydrated`

These events may be used by extensions but must not be relied upon for core rendering.

---

## Extension Rules

- New features must be gated behind `features.*`
- Auth, dashboards, and APIs are optional layers
- No extension may modify existing contracts

---

## Stability Guarantees

The following are considered **stable**:
- Config shape
- Binder syntax
- Router behavior
- Lifecycle event names

Anything else may evolve.

## Stage 2 — Access & Consent Flow

The Private Suite enforces a pre-auth legal consent gate prior to granting access
to any authenticated or semi-authenticated areas (e.g., dashboard).

Flow (frontend-only, session scoped):

Visitor
 → Apply / Signup Intent
 → Legal Consent Modal
   → Accept (sessionStorage flag set)
     → Dashboard Placeholder
   → Reject
     → Access denied

This mechanism is intentionally client-side only in Stage 2 and
will be mirrored server-side in later stages.