# Repository Authority — The Private Suite

**Purpose:**
This document defines how repository structure updates are interpreted **and** how all file paths are converted into raw GitHub URLs that the AI uses to read project files.

This file is the **single source of truth** for:

* Repo structure
* Path semantics
* Raw file resolution

---

## 1. AI Interpretation Rules (Authoritative)

When a repository tree is pasted into chat:

1. The pasted tree is treated as **authoritative and complete**
2. Any file or folder **not present** in the pasted tree is assumed **removed or deprecated**
3. Any new paths are assumed **added**
4. Formatting inconsistencies (spacing, ordering, casing) are **normalized**
5. This document must be updated to reflect the pasted tree exactly
6. All file access by the AI must occur via **raw GitHub URLs**, never inferred content

If ambiguity exists:

* Prefer existing structure unless explicitly contradicted
* Ask for clarification only if a path collision or naming conflict occurs

---

## 2. Raw GitHub Resolution Contract (Critical)

### 2.1 Base URL (Immutable)

All files in this repository are read using the following base:

```
https://raw.githubusercontent.com/MotivMIA/the-private-suite/refs/heads/main/
```

This base **must never be altered** unless the repository owner explicitly changes branches or org/repo name.

---

### 2.2 Path → Raw URL Transformation Rule

For **any file path** shown in the repo tree:

1. Remove the leading `./` (if present)
2. Append the remaining relative path directly to the base URL
3. Preserve directory structure and filename exactly
4. Do not URL-encode slashes

#### Formula

```
RAW_URL = BASE_URL + RELATIVE_PATH_FROM_REPO_ROOT
```

#### Examples

| Tree Path                                   | Raw GitHub URL                                  |
| ------------------------------------------- | ----------------------------------------------- |
| `index.html`                                | `.../index.html`                                |
| `pages/apply.html`                          | `.../pages/apply.html`                          |
| `assets/css/main.css`                       | `.../assets/css/main.css`                       |
| `assets/js/auth/providers/email.adapter.js` | `.../assets/js/auth/providers/email.adapter.js` |
| `sections/legal/privacy-policy.html`        | `.../sections/legal/privacy-policy.html`        |

If a file exists in the tree, the AI **must assume the raw URL is valid and readable**.

---

### 2.3 Directory Semantics

* **Directories are structural only** and cannot be fetched
* Only leaf nodes (files) are readable
* Directory names imply **no behavior** unless defined in code

---

## 3. Canonical Repo Structure (Current)

This section represents the **current authoritative structure** of the repository.

```
.
├── favicon.ico
├── favicon2.ico
├── index.html
├── README.md
├── pages/
│   ├── apply.html
│   ├── dashboard.html
│   └── home.html
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   ├── legacy.css
│   │   ├── main.css
│   │   ├── sections.css
│   │   ├── themes.css
│   │   ├── tokens.css
│   │   ├── utilities.css
│   │   └── variables.css
│   ├── images/
│   │   ├── hero-bg.png
│   │   └── hero-bg1.png
│   └── js/
│       ├── app.js
│       ├── apply.stub.js
│       ├── binder.js
│       ├── config-validator.js
│       ├── consent-gate.js
│       ├── guards.js
│       ├── router.js
│       ├── section-loader.js
│       ├── ui.js
│       ├── api/
│       │   └── api.contract.js
│       ├── auth/
│       │   ├── auth.interface.js
│       │   ├── consent.js
│       │   ├── index.js
│       │   └── providers/
│       │       ├── email.adapter.js
│       │       ├── google.adapter.js
│       │       └── x.adapter.js
│       └── config/
│           ├── config.schema.js
│           └── site.config.js
├── sections/
│   ├── apply-form.html
│   ├── consent-modal.html
│   ├── footer.html
│   ├── header.html
│   ├── hero.html
│   ├── legal-consent.html
│   └── legal/
│       ├── accessibility-statement.html
│       ├── code-of-conduct.html
│       ├── contact-us.html
│       ├── dmca-takedown-policy.html
│       ├── management.html
│       ├── privacy-policy.html
│       ├── refund-payment-policy.html
│       ├── release-form.html
│       └── terms-and-conditions.html
```

---

## 4. Update Contract (Operational)

To update this document:

1. Paste a new repository tree into chat
2. State: **“Update the repo authority doc”**
3. The pasted tree becomes the new canonical structure
4. Raw URLs are assumed to update mechanically via the transformation rule

No manual URL lists are required.
No inference beyond the tree is permitted.

---

## 5. Enforcement Priority

If conflicts arise, priority is:

1. This document
2. The pasted tree
3. Repo contents
4. Assumptions (never preferred)

This document always wins.

