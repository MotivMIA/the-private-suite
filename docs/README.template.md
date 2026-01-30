# Web Application Template — Authoritative Specification

> **Status:** FROZEN
>
> This document defines the canonical rules, structure, and contracts for this web application template. Once frozen, this template must not be modified when building individual sites. All projects must fork from this baseline.

---

## 1. Purpose

This template is a **framework-agnostic, static-first web application shell** designed to:

* Build small or large sites from the same structure
* Scale from static pages to authenticated applications
* Support future backend and database integration
* Enforce consistency for human and AI collaborators

It prioritizes:

* Clarity over cleverness
* Determinism over magic
* Progressive enhancement

---

## 2. Core Architectural Principles

### 2.1 HTML-First

* HTML must render meaningful content without JavaScript
* JavaScript enhances behavior only after content is stable

---

### 2.2 Progressive Enhancement

* CSS defines layout and appearance independently
* JavaScript must never be required for content visibility

---

### 2.3 Single Source of Truth

All reusable or repetitive data (branding, metadata, legal text, socials, etc.) **must** live in a centralized configuration object.

Hard-coded values are forbidden.

---

### 2.4 Deterministic Lifecycle

All runtime behavior follows this exact sequence:

```
route:change
  → content:loaded        (page injected)
    → section loading     (recursive)
      → sections:loaded   (all sections resolved)
        → content:hydrated (DOM stable, safe for JS)
```

No utility may violate this order.

---

## 3. Directory Structure (Template-Level)

```
/app
  ├── index.html                 # Base HTML shell
  ├── /pages                     # Route-level pages
  ├── /sections                  # Reusable partials
  ├── /assets
  │     ├── /css
  │     │     └── main.css
  │     ├── /js
  │     │     ├── router.js
  │     │     ├── section-loader.js
  │     │     └── binder.js
  │     └── /media
  ├── /config
  │     └── site.config.js       # Centralized data
  └── README.template.md
```

This structure defines **categories only**. Specific inventories belong in forks.

---

## 4. Base HTML Shell Contract

* Contains a single application mount point: `#app`
* Loads CSS before content
* Loads JavaScript at the end of `<body>`
* Contains no page-specific markup

The shell never changes between projects.

---

## 5. Routing Contract

* Routes load HTML files from `/pages/`
* Routing does not reload the document
* On route load, the router must dispatch:

```
content:loaded
```

The router must not:

* Parse sections
* Bind data
* Modify styles

---

## 6. Page Contract

Each page:

* Lives in `/pages/`
* Contains semantic HTML only
* May reference sections using `[data-include]`
* Contains no global scripts or styles

Example:

```html
<main>
  <section data-include="/sections/hero.html"></section>
</main>
```

---

## 7. Section Contract

Sections:

* Live in `/sections/`
* Are HTML-only
* May include nested sections
* Must be self-contained

Missing sections must fail **visibly**, not silently.

---

## 8. Section Loader Utility

Responsibilities:

* Discover `[data-include]` attributes
* Fetch and inject section HTML
* Support nested includes
* Guard against infinite recursion
* Emit lifecycle events

Failure behavior:

* Must render a visible error block
* Error styling must be red

---

## 9. Template Data Binding

### 9.1 Configuration Schema

```js
const CONFIG = {
  brand: {
    name: "",
    tagline: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    social: {
      instagram: "",
      x: "",
      tiktok: "",
      youtube: ""
    }
  },

  meta: {
    title: "",
    description: "",
    keywords: []
  },

  legal: {
    copyrightYear: ""
  }
};
```

---

### 9.2 Binding Rules

* Placeholders use `{path.to.value}` syntax
* Binding occurs after `sections:loaded`
* Missing data must fail loudly in development

Example:

```
{brand.name}
{brand.social.instagram}
```

---

## 10. CSS Architecture & Naming

### 10.1 One File Policy

* All styles live in `assets/css/main.css`
* No CSS frameworks
* No inline styles

---

### 10.2 Mandatory CSS Order

1. Design Tokens (CSS variables)
2. Reset / Base
3. Layout
4. Components
5. Sections
6. Utilities
7. Responsive overrides

---

### 10.3 Page Scope Classes (Optional)

```
.page-home
.page-about
.page-apply
```

Used to prevent cross-page bleed.

---

### 10.4 Section Root Classes

```
.section-hero
.section-faq
.section-apply
```

Rules:

* One root class per section
* No deep descendant selectors

---

### 10.5 Reusable Component Naming

```
.btn-primary
.nav-primary
.dropdown-menu
.card
```

Components must be page-agnostic.

---

### 10.6 Failure Styling

All failure states must:

* Be visually obvious
* Use red as the primary signal color

---

## 11. Comment & File Structure Standards

### 11.1 File Banner (Top of File)

```css
/* ██████████████████████████████████████████████████
   FILE NAME / PURPOSE
   TEMPLATE BASE (fork may override)
   ██████████████████████████████████████████████████ */
```

Required for all CSS and JS files.

---

### 11.2 Primary Section Header

```css
/* ==================================================
   SECTION NAME
   ================================================== */
```

Used for architectural boundaries.

---

### 11.3 Secondary Section Header

```css
/* ---------- Subsection Name ---------- */
```

Used for component groups.

---

## 12. MARK Tag Convention

The `//MARK:` tag is mandatory for:

* JavaScript files
* Large logical blocks

Used for:

* Editor navigation
* Regex parsing
* AI comprehension

---

## 13. Future Expansion (Non-Template)

The template is designed to support, but does not implement:

* Authentication systems
* Role-based access
* CRM-style data
* Document storage
* Admin dashboards

These features belong in forks.

---

## 14. Template Freeze Rule

Once a project forks this template:

* The template must not be modified
* All customization happens in the fork
* Structural changes require a new template version

---

**END OF AUTHORITATIVE TEMPLATE SPECIFICATION**
