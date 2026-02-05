# Authentication Flow — Design Specification

This document defines the authentication and access flow for The Private Suite.
This is a **design-only specification**. No backend or SDK is implemented at this stage.

The system is intentionally third-party–auth–driven to reduce liability and security burden.

---

## Core Principles

- Authentication is delegated to a third-party provider
- Legal consent is handled by The Private Suite
- Access is gated post-authentication
- No user is granted dashboard access without consent
- No credentials are stored or processed by the platform

---

## Supported Entry Methods

Primary (default):
- Email + password (provider-hosted)

Secondary:
- Google OAuth
- X (Twitter) OAuth

UI priority:
1. Email form
2. OAuth alternatives

---

## Auth State Machine

anonymous  
→ authenticating  
→ authenticated_unconsented  
→ authenticated_consented  
→ dashboard_access

At no point does authentication imply access.

---

## Step-by-Step Flow

### 1. Anonymous User
- User lands on `/apply`
- No session, no identity

### 2. Authentication Initiated
User selects one of:
- Email signup
- Google OAuth
- X OAuth

Auth provider handles:
- Credential validation
- OAuth exchange
- Session creation

---

### 3. Authenticated (Unconsented)
User is now:
- Identified
- Logged in
- **NOT authorized**

System immediately presents:
- Consent / disclaimer modal

---

### 4. Consent Gate

User must affirm:
- Agreement to Terms & Conditions
- Agreement to Privacy Policy
- Confirmation they are 18+ years old

No checkboxes required.
Affirmation is action-based (e.g. “Continue”).

---

### 5. Access Granted

Only after consent:
- User is marked `authenticated_consented`
- Access to dashboard is granted

Failure to consent:
- Session remains authenticated
- Access remains blocked

---

## Failure Scenarios

- Auth failure → user remains anonymous
- Consent dismissal → user remains blocked
- Provider outage → show failure state
- No silent fallback

Failures must be visible and explicit.

---

## Explicitly Out of Scope

- User roles
- Payments
- Content uploads
- Backend APIs
- Persistent auth state

These require a new phase and template version.