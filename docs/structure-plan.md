# Application Directory Structure Plan — Annotated

This document describes the **full structural vision** for projects built from `site-template-v1`.

Each directory or file is explicitly labeled as one of:

* **TEMPLATE** — exists in `site-template-v1`
* **FORK (Private Suite)** — added or expanded after duplication
* **FUTURE / OPTIONAL** — planned, not required

This separation prevents template pollution while preserving long-term intent.

---

## Root Level

```
/root
├─ index.html
├─ README.template.md
├─ README.md
├─ config/
├─ assets/
├─ pages/
├─ sections/
├─ components/
├─ data/
├─ docs/
```

---

## index.html

**Status:** TEMPLATE

* Permanent application shell
* Contains header/footer mount points and `#app`
* Never modified after template freeze

---

## README.template.md

**Status:** TEMPLATE

* Authoritative framework specification
* Defines contracts, naming rules, lifecycle, and behavior
* Never edited in forks

---

## README.md

**Status:** FORK (Private Suite)

* Project-specific README
* Expands on the template for business needs
* Includes full structure inventory and feature plans

---

## config/

### site.config.js

**Status:** TEMPLATE

* Single source of truth for all tokenized data
* No business logic
* Fork populates values only

### env.config.js

**Status:** FUTURE / OPTIONAL

* Environment flags
* Feature toggles
* Not required for static operation

---

## assets/

### css/

**Status:** TEMPLATE

* Contains `main.css`
* Single-file stylesheet

### js/

**Status:** TEMPLATE

* router.js — routing only
* section-loader.js — section injection
* binder.js — placeholder resolution

### images/

**Status:** FORK (Private Suite)

* Brand assets
* Content imagery

---

## pages/

**Status:** TEMPLATE (category only)

Pages define **route-level structure only**.

### Examples (FORK):

* home.html
* apply.html
* about.html
* dashboard.html (auth)

---

## sections/

**Status:** TEMPLATE (category only)

Reusable content blocks.

### Examples (FORK):

* hero.html
* value-prop.html
* services.html
* footer-cta.html

### legal/ (FORK)

* terms.html
* privacy.html
* disclosures.html

---

## components/

**Status:** FORK (Private Suite)

Structural UI fragments:

* header.html
* footer.html
* nav.html
* modal.html

### auth/ (FORK)

* login-form.html
* logout-button.html

---

## data/

**Status:** FUTURE / OPTIONAL

Static structured data used when backend is absent:

* faq.json
* services.json
* pricing.json

---

## docs/

**Status:** TEMPLATE

Internal documentation only:

* structure-plan.md (this file)
* architecture notes
* decisions / changelog

---

## Automation & Tooling (Deferred)

The following files and systems are **explicitly planned**, but intentionally excluded from the frozen template. They activate at the fork or future-template level.

### pages.manifest.js

**Status:** FORK / FUTURE

* Declares available pages
* Provides navigation metadata
* Enables sitemap and nav generation
* Not required for baseline routing

### robots.txt

**Status:** FORK / OPTIONAL

* Search engine directives
* Only relevant for deployed sites

### sitemap.xml

**Status:** FORK / GENERATED

* May be generated manually or automatically
* Never hand-maintained in template

### ui.js

**Status:** FORK

* Non-business UI helpers
* Animations, toggles, client-only behaviors

### auth.js

**Status:** FUTURE

* Authentication state handling
* Guards and token logic

### api.js

**Status:** FUTURE

* Backend API abstraction
* Never required for static operation

---

## Clarification: Why the Template Is Smaller

The original structure plan describes the **full application vision**.

The template intentionally includes only:

* Categories
* Contracts
* Core runtime utilities

Everything else is deferred to:

* Fork-level implementation
* Future template versions

This prevents premature commitment while preserving architectural intent.

---

## Summary

* Nothing has been removed from the vision
* Items not present in the template are **explicitly deferred**
* The Private Suite fork will activate the full structure

This document reconciles the original plan with the frozen template architecture.

### Authentication Abstraction (Planned)

Authentication is provider-agnostic and abstracted behind a single interface.

Planned providers:
- Email (default)
- Google OAuth
- X (Twitter) OAuth
- Biometric / device-based (future)

No provider-specific logic is embedded in UI components.
All auth calls will route through a centralized adapter.