# The Private Suite

## Overview

**The Private Suite** is a creator-focused web application built on top of a frozen, framework-agnostic frontend template. This repository represents a **forked implementation**, not the template itself.

The project inherits its architectural rules, file contracts, and lifecycle guarantees from the upstream template and applies them to a concrete business use case.

> This repository may evolve. The underlying template must not.

---

## Template Lineage

This project is forked from:

**Web Application Template — v1 (Frozen)**

The authoritative specification for the template lives in:

```
README.template.md
```

That document defines:

* Directory categories and contracts
* Runtime lifecycle guarantees
* Loader, router, and binder responsibilities
* CSS architecture and naming rules
* Comment and file header standards

⚠️ **No changes to template rules are permitted in this fork.**

---

## Project Scope

The Private Suite is intended to support:

* Public-facing marketing pages
* Creator onboarding flows
* Legal and disclosure content
* Future authenticated dashboards (planned)

At this stage, the application is:

* Static-first
* SEO-safe
* JavaScript-enhanced (not JS-dependent)

---

## Directory Structure (Project-Level)

This fork fills in **specific inventories** under the template’s structural categories.

```
/
├─ index.html                 # Application shell (unchanged from template)
│
├─ pages/                     # Route-level pages
│   ├─ home.html
│   ├─ apply.html
│   └─ about.html
│
├─ sections/                  # Reusable content blocks
│   ├─ hero.html
│   ├─ value-prop.html
│   ├─ services.html
│   ├─ apply-form.html
│   └─ footer-cta.html
│
│   └─ legal/
│       ├─ terms.html
│       ├─ privacy.html
│       └─ disclosures.html
│
├─ components/                # Structural UI fragments
│   ├─ header.html
│   ├─ footer.html
│   ├─ nav.html
│   └─ modal.html
│
├─ assets/
│   ├─ css/
│   │   └─ main.css           # Single stylesheet (template rules apply)
│   ├─ js/
│   │   ├─ router.js
│   │   ├─ section-loader.js
│   │   ├─ binder.js
│   │   └─ ui.js
│   └─ images/
│       ├─ brand/
│       ├─ icons/
│       └─ content/
│
├─ config/
│   └─ site.config.js         # Business-specific data
│
├─ docs/
│   ├─ architecture.md        # Project-specific notes
│   ├─ decisions.md           # Architectural decisions (ADRs)
│   └─ changelog.md
│
├─ README.md                  # This file (project-level)
└─ README.template.md         # Frozen template spec (reference only)
```

---

## Configuration & Data Binding

All business data is centralized in:

```
/config/site.config.js
```

Examples of data stored here:

* Business name and description
* Contact information
* Social links
* Legal metadata
* CTA URLs

HTML files use tokenized placeholders:

```
{brand.name}
{brand.social.instagram}
{legal.copyrightYear}
```

Binding is performed automatically after all pages and sections are loaded.

Missing values **fail visibly** during development.

---

## Content Rules (Strict)

* Pages define **structure only**
* Sections define **reusable content**
* Components define **structural UI**
* No business data is hard-coded in HTML
* No inline styles or scripts

All rules are enforced by convention and by the template loader lifecycle.

---

## Styling Rules

* All CSS lives in `assets/css/main.css`
* Section root classes are mandatory
* Components are page-agnostic
* Utility classes are minimal and explicit

Refer to `README.template.md` for the full CSS order and naming requirements.

---

## JavaScript Usage

JavaScript in this project:

* Never blocks initial content rendering
* Enhances after DOM stability
* Respects the template lifecycle:

```
route:change
 → content:loaded
   → sections:loaded
     → content:hydrated
```

No script may violate this order.

---

## Future Capabilities (Planned)

The Private Suite may later add:

* Authentication
* Role-based access
* Creator dashboards
* Secure document handling
* CRM-style workflows

These features will be implemented **without modifying the template**.

---

## Contribution Rules

Anyone working on this repository must:

* Follow the template specification exactly
* Preserve directory and naming contracts
* Avoid architectural shortcuts
* Treat `README.template.md` as immutable

---

## Final Note

This repository represents a **concrete implementation** built on a frozen foundation.

If a requirement cannot be met within the existing template rules, the correct response is:

> Create a new template version — not bend the fork.

---

© The Private Suite
