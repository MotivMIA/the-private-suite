# Repository Rules — The Private Suite

**Status:** Authoritative
**Purpose:** Defines how repository structure is interpreted and how raw GitHub URLs are derived.

This document does **not** contain the repository tree.
The tree lives in `docs/tree.md`.

---

## 1. Interpretation Contract

When working with this repository, the AI must follow these rules:

1. `docs/tree.md` is the **single source of truth** for repository structure
2. Any tree pasted into chat is assumed to be copied into `docs/tree.md`
3. The AI must never infer files, folders, or structure not present in `tree.md`
4. If a file is not in `tree.md`, it is considered nonexistent
5. All file reading must occur via **raw GitHub URLs**, never assumptions

---

## 2. Raw GitHub Base URL (Immutable)

All files are read using this base:

```
https://raw.githubusercontent.com/MotivMIA/the-private-suite/refs/heads/main/
```

This base is immutable unless explicitly changed by the repo owner.

---

## 3. Path → Raw URL Resolution Rules

For any file path listed in `docs/tree.md`:

### Transformation Algorithm

1. Treat the path as relative to the repo root
2. Remove any leading `./`
3. Append the path directly to the base URL
4. Preserve directory names and filenames exactly
5. Do not URL-encode slashes

### Formula

```
RAW_URL = BASE_URL + RELATIVE_PATH
```

---

## 4. Examples

| Tree Path                            | Resolved Raw URL                         |
| ------------------------------------ | ---------------------------------------- |
| `index.html`                         | `.../index.html`                         |
| `pages/apply.html`                   | `.../pages/apply.html`                   |
| `assets/css/main.css`                | `.../assets/css/main.css`                |
| `sections/legal/privacy-policy.html` | `.../sections/legal/privacy-policy.html` |

If a path exists in `tree.md`, the AI must assume the raw URL is valid and readable.

---

## 5. Directory Semantics

* Directories are **structural only**
* Only files (leaf nodes) are readable
* Folder names imply no behavior unless defined in code

---

## 6. Update Workflow

When the repo structure changes:

1. Update **only** `docs/tree.md`
2. Do not modify this file
3. The AI must automatically adapt using the new tree

---

## 7. Enforcement Priority

1. `repo-rules.md`
2. `tree.md`
3. Repository contents
4. Assumptions (never preferred)

If conflict exists, higher priority always wins.

