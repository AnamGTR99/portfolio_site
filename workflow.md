# Ticket Implementation Workflow

A systematic workflow for implementing tickets from Linear (or any project management tool). This document is project-agnostic and designed to be reused across any codebase.

---

## Overview

```
Pull Ticket → Review Spec → Plan → Implement → Generate PR Doc → User Review → Commit & Push → Update Ticket
```

Every ticket follows this exact flow. No commits happen until the user has reviewed and approved the work.

---

## Phase 1: Pull & Review

### 1.1 — Pull the ticket
- Fetch the ticket from Linear using its ID (e.g., `INL-57`)
- Read the **full** ticket — title, description, acceptance criteria, implementation notes, labels, priority, and any linked issues

### 1.2 — Review the spec
Break the ticket into its core parts:

| Section | What to extract |
|---|---|
| **Description** | What is being built and why |
| **Acceptance Criteria** | Checkbox list of requirements — every single one must be met |
| **Implementation Notes** | Technical guidance, file paths, patterns to follow, constraints |
| **Dependencies** | Other tickets, APIs, assets, or decisions this depends on |

### 1.3 — Flag blockers early
Before writing any code, identify:
- Missing assets or information
- Ambiguous acceptance criteria
- Conflicts with existing code
- Dependencies that aren't ready

Raise these with the user immediately. Don't guess — ask.

---

## Phase 2: Plan

### 2.1 — Create a systematic plan
Before touching code, outline:

1. **Files to create or modify** — list every file that will be touched
2. **Order of operations** — what gets built first, what depends on what
3. **Patterns to follow** — match existing codebase conventions (naming, structure, styling)
4. **Edge cases** — what could go wrong, what needs special handling
5. **Testing strategy** — how to verify each acceptance criterion

### 2.2 — Align with user (if needed)
For non-trivial tickets, share the plan with the user before implementing. This prevents rework. For straightforward tickets where the spec is clear, proceed directly.

---

## Phase 3: Implement

### 3.1 — Branch
Create a branch from `main` following the project's naming convention:
```
git checkout -b {ticket-id}-{short-description}
```
Example: `inl-57-contact-page`

### 3.2 — Build incrementally
- Implement one logical piece at a time
- Verify each piece works before moving to the next
- Match existing code patterns — don't introduce new conventions unless the ticket requires it
- Keep changes scoped to what the ticket asks for — no drive-by refactors

### 3.3 — Self-review
Before generating the PR doc:
- Re-read every acceptance criterion and confirm it's met
- Check for regressions in related areas
- Run linting/build checks
- Take screenshots or recordings where applicable (visual changes)

---

## Phase 4: PR Document

### 4.1 — Generate the PR doc
Create a file named `{TICKET-ID}_PR.md` (e.g., `INL-57_PR.md`) in the project root or a designated docs folder.

### 4.2 — PR document structure

```markdown
# {TICKET-ID}: {Ticket Title}

## Summary
Brief description of what was implemented and why.

## Approach
High-level explanation of the technical approach taken. Include:
- Architecture decisions
- Patterns used (and why)
- Key implementation details

## Changes from Initial Approach
Document any deviations from the original plan or ticket spec, and why.
If none, state "None — implemented as specified."

## Acceptance Criteria Validation

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | {criterion from ticket} | PASS | {how it was verified} |
| 2 | {criterion from ticket} | PASS | {how it was verified} |
| 3 | {criterion from ticket} | PASS | {how it was verified} |

## Files Changed

| File | Change Type | Description |
|------|-------------|-------------|
| `src/app/contact/page.tsx` | Created | Contact page component |
| `src/data/personal.ts` | Modified | Added contact form fields |

## Screenshots / Evidence
{Screenshots, terminal output, or recordings showing the feature working}

## Risk Assessment
- **Breaking changes**: None / {describe}
- **Regressions**: None identified / {describe areas to watch}
- **Edge cases handled**: {list}

## Notes
Any additional context, follow-up items, or things the reviewer should pay attention to.
```

### 4.3 — Present to user
Share the PR document with the user. Walk through:
1. What was built
2. How each acceptance criterion was validated
3. Any deviations from the spec
4. Screenshots or demo

---

## Phase 5: Review & Approval

### 5.1 — User reviews
The user reviews the PR document and the actual changes. They may:
- **Approve** — proceed to commit
- **Request changes** — go back to Phase 3, address feedback, regenerate PR doc
- **Ask questions** — clarify before deciding

### 5.2 — Iterate if needed
If changes are requested:
1. Make the changes
2. Update the PR document
3. Re-present for review
4. Repeat until approved

**No commits happen until explicit approval.**

---

## Phase 6: Commit & Push

### 6.1 — Stage and commit
```bash
git add {specific files}
git commit -m "{TICKET-ID}: {concise description of what was done}"
```

- Reference the ticket ID in every commit message
- Stage specific files — never `git add .` or `git add -A`
- Write commit messages that describe the *what*, not the *how*

### 6.2 — Push
```bash
git push origin {branch-name}
```

Or if merging directly to main (per project workflow):
```bash
git checkout main
git merge {branch-name}
git push origin main
```

### 6.3 — Clean up
```bash
git branch -d {branch-name}
```

---

## Phase 7: Update Ticket

### 7.1 — Move ticket status
Update the Linear ticket status to **Done** (or the appropriate completed state).

### 7.2 — Update project memory
If the implementation revealed important context for future work (architectural decisions, gotchas, patterns established), save it to the project's memory system.

---

## Quick Reference

```
 Pull ticket from Linear
    ↓
 Read FULL spec (description + acceptance criteria + notes)
    ↓
 Flag any blockers or questions
    ↓
 Create implementation plan
    ↓
 Branch from main
    ↓
 Implement incrementally
    ↓
 Self-review against acceptance criteria
    ↓
 Generate {TICKET-ID}_PR.md
    ↓
 Present to user with evidence
    ↓
 User approves? ──No──→ Address feedback → loop back
    ↓ Yes
 Commit with ticket ID in message
    ↓
 Push to remote
    ↓
 Update Linear ticket → Done
```

---

## Example PR Document

Below is a real example of what a thorough PR document looks like.

---

### INL-15: Implement Order Processing Service

#### Summary
Built the order processing service that handles incoming orders from the API gateway, validates inventory, processes payments, and dispatches fulfillment events.

#### Approach

**Service Pattern**
- Adopted the existing `BaseService` pattern from `src/services/base.ts`
- Used the repository pattern for database access, consistent with `UserService` and `ProductService`
- All business logic lives in the service layer — controllers remain thin

**Atomic Status Updates**
- Order status transitions are wrapped in database transactions
- Used an event-driven approach: status changes emit domain events consumed by the notification and analytics services
- Implemented a state machine for valid transitions: `pending → confirmed → processing → shipped → delivered`

#### Changes from Initial Approach
- **Payment retry logic**: The ticket spec suggested a simple retry with exponential backoff. After reviewing the payment provider's SDK, their client already handles retries internally. Added a circuit breaker instead to handle prolonged outages.
- **Inventory check**: Moved from a synchronous DB check to a Redis-cached lookup for performance. Falls back to DB on cache miss.

#### Acceptance Criteria Validation

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | Orders are created with `pending` status | PASS | Verified via integration test + manual API call |
| 2 | Inventory is validated before confirmation | PASS | Returns 409 with insufficient stock details |
| 3 | Payment is processed via Stripe | PASS | Test mode transactions verified |
| 4 | Status transitions follow the defined state machine | PASS | Invalid transitions return 422 |
| 5 | Fulfillment event is dispatched on `confirmed` | PASS | Event logged in Redis stream |

#### Files Changed

| File | Change Type | Description |
|------|-------------|-------------|
| `src/services/order.service.ts` | Created | Core order processing service |
| `src/repositories/order.repository.ts` | Created | Database access layer for orders |
| `src/controllers/order.controller.ts` | Created | Thin controller — delegates to service |
| `src/events/order.events.ts` | Created | Domain event definitions |
| `src/models/order.model.ts` | Created | Order entity and status enum |
| `src/middleware/inventory.guard.ts` | Created | Middleware for inventory validation |
| `src/services/base.ts` | Modified | Added `withTransaction` helper |
| `tests/order.service.test.ts` | Created | 14 test cases covering all flows |

#### Risk Assessment
- **Breaking changes**: None — new service, no existing API modifications
- **Regressions**: Payment service integration is new; monitoring dashboard should be watched for the first 24h
- **Edge cases handled**: Concurrent orders for last-in-stock item (optimistic locking), payment timeout, partial fulfillment

#### Notes
- The circuit breaker threshold (5 failures in 60s) may need tuning based on production traffic patterns
- Follow-up ticket needed for order cancellation flow (not in scope for this ticket)
