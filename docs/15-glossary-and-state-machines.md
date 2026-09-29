# VeriAcademia Glossary and State Machines

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Glossary

| Term | Definition |
|---|---|
| Account | A person’s platform identity, authentication methods, verified emails, sessions, and security state. |
| Active tenant | A university that has passed platform verification and may operate normal institutional workflows. |
| Affiliated institute | An institute academically or formally connected to a university but potentially independently managed. |
| Affiliation | A dated relationship between a researcher/author and a university, institute, or department. |
| Access grant | A scoped, optionally time-limited permission for an account to perform an action on a protected resource. |
| Access request | A requester’s application to view or download a specific protected resource. |
| Association | A university-specific relationship to a canonical publication or patent, including eligibility, verification, visibility, and evidence. |
| Canonical publication | One shared bibliographic record representing a work across legitimate university associations. |
| Constituent institute | An institute directly established, owned, or operated under a university. |
| Domain eligibility | Permission to apply for membership based on a verified email domain; it is not membership or authority. |
| Evidence | Supporting material used to verify identity, affiliation, research, rights, or a governance decision. |
| External user | An authenticated account that is not an approved member of the university controlling a requested resource. |
| Member | An account with an approved, active university membership. |
| Permission | An atomic action such as `publication.verify` or `access.approve`. |
| Platform administrator | A user who governs the platform across tenants with justified, audited access. |
| Researcher profile | A scholarly identity separate from the login account, with names, affiliations, identifiers, and research output. |
| Role | A named group of permissions that can be assigned within a scope. |
| Scope | The organizational boundary of a permission: university, institute, department, platform, or resource. |
| Tenant | A verified university’s isolated data and policy boundary. |
| Verification | A traceable review decision about evidence, eligibility, accuracy, or status. |
| Visibility | The audience policy for a resource or field, such as public, members, request required, or private. |

## 2. State-machine conventions

- States are explicit values stored with the record.
- Transitions are validated by the backend.
- A transition records actor, time, reason, evidence, previous state, and resulting state where required.
- Terminal states can be reopened only through an approved workflow.
- Deactivation, archival, suspension, and revocation preserve history.
- A state does not itself grant permission; authorization still evaluates role, scope, visibility, lifecycle, and grants.

## 3. University state machine

```text
draft
  -> pending_verification
  -> under_review
  -> additional_info_required
  -> verified_active
  -> suspended
  -> verified_active
  -> deactivated

under_review -> rejected
pending_verification -> rejected
verified_active -> deactivated
```

### Transition rules

- Only a platform administrator may approve, reject, suspend, or reactivate.
- Activation requires completed verification evidence and an owner/primary-administrator appointment.
- Suspension immediately blocks normal tenant operations while preserving audit/recovery access.
- Deactivation preserves historical records and stops normal public/operational contribution according to policy.

## 4. Domain state machine

```text
pending_verification
  -> verified
  -> review_required
  -> verified

pending_verification -> rejected
verified -> disabled
disabled -> pending_verification
```

### Transition rules

- Only verified domains participate in normal membership eligibility.
- A domain conflict routes to platform review/dispute.
- Expiry or ownership uncertainty moves the domain to review-required or disables trust.

## 5. Membership state machine

```text
invited
  -> application_draft
  -> pending_approval
  -> under_review
  -> additional_info_required
  -> approved_active
  -> suspended
  -> approved_active
  -> ended

pending_approval -> rejected
under_review -> rejected
approved_active -> expired
approved_active -> revoked
approved_active -> ended
```

### Transition rules

- Application requires a verified email and domain-policy evaluation.
- Approval requires an authorized administrator and explicit role/permission assignment.
- Suspension, revocation, expiry, or end removes active internal access.
- Historical membership remains for attribution and audit.

## 6. Administrator invitation state machine

```text
pending -> accepted -> active
pending -> expired
pending -> revoked
```

### Transition rules

- Invitation includes role, permissions, scope, and expiry.
- Acceptance requires email verification, sign-in, and required MFA.
- Policy changes may require revalidation before activation.
- Acceptance and appointment are audited.

## 7. Researcher profile state machine

```text
draft
  -> pending_verification
  -> verified
  -> archived

pending_verification -> correction_required -> pending_verification
pending_verification -> rejected
verified -> correction_required -> verified
```

### Transition rules

- Claiming an existing profile requires controlled identity/affiliation review.
- Controlled fields may have field-level verification states.
- Name and affiliation changes preserve effective dates and history.

## 8. Publication association state machine

```text
draft
  -> submitted
  -> under_validation
  -> correction_required
  -> verified
  -> active

under_validation -> rejected
correction_required -> rejected
active -> withdrawn
active -> archived
active -> deactivated
withdrawn -> archived
```

### Transition rules

- Activation requires verified eligibility and affiliation evidence.
- Material verified-field changes create a revision or re-verification requirement.
- Canonical bibliographic facts may be shared; university-specific association state remains isolated.
- Deactivation preserves historical attribution and audit history.

## 9. Patent association state machine

```text
draft
  -> submitted
  -> under_validation
  -> correction_required
  -> verified
  -> active

under_validation -> rejected
correction_required -> rejected
active -> withdrawn
active -> archived
active -> deactivated
```

### Transition rules

- Patent identifiers, inventors, affiliations, and evidence must be validated.
- Duplicate/conflicting records require review.
- Active verified patents contribute to authorized profiles and analytics.

## 10. External access request and grant state machines

### Request

```text
draft
  -> pending
  -> under_review
  -> additional_info_required
  -> approved
  -> expired

pending -> rejected
pending -> cancelled
under_review -> rejected
under_review -> cancelled
approved -> revoked
```

### Grant

```text
active -> expired
active -> revoked
```

### Transition rules

- Approval is resource- and action-specific.
- View and download may be separate grants/actions.
- Start/expiry and revocation are evaluated on every access attempt.
- Rights restrictions may block file access even after an approver’s decision.
- Request reasons and evidence remain private to requester and authorized reviewers.

## 11. Verification and correction state machines

### Verification

```text
pending -> verified
pending -> returned_for_correction
pending -> rejected
pending -> escalated
returned_for_correction -> pending
```

### Correction/appeal case

```text
open -> under_review -> resolved
open -> awaiting_evidence -> under_review
under_review -> rejected
under_review -> escalated
```

### Transition rules

- Every decision records reviewer, reason, evidence, prior state, resulting state, and time.
- Escalation preserves the original case and adds a linked review.
- Resolved corrections use normal record revision/verification workflows rather than silent overwrite.

## 12. Export and backup state machines

### Export

```text
queued -> running -> succeeded
queued -> failed
running -> failed
running -> cancelled
succeeded -> expired
```

### Backup/restore

```text
queued -> running -> succeeded
queued -> failed
running -> failed
running -> cancelled
succeeded -> validated
```

### Transition rules

- Jobs are idempotent where retryable.
- Failed or partial jobs are never marked successful.
- Export links expire and access is audited.
- Restore requires authorized scope, validation, and post-restore checks.

## 13. Visibility vocabulary

| Visibility | Meaning |
|---|---|
| Public | Anyone may access the permitted resource. |
| Public metadata only | Anyone may see bibliographic details, not protected files or restricted fields. |
| University members | Approved active members of the controlling university, subject to role and policy. |
| Request required | External users need an approved scoped request/grant. |
| Specific users | Only explicitly granted accounts and authorized internal personnel. |
| Private | Author and authorized administrators/verifiers only. |

Visibility is evaluated together with lifecycle, rights, membership, permissions, and grants. It is not a standalone authorization decision.

## 14. Shared decision vocabulary

Use these decision labels consistently:

- `verify` — evidence and requirements are satisfied.
- `return_for_correction` — the record can be corrected and resubmitted.
- `reject` — the record or request is not acceptable; reason is recorded.
- `request_more_information` — decision is paused pending evidence.
- `approve_access` — create a scoped grant within rights and policy.
- `deny_access` — do not create a grant; reason is recorded.
- `revoke` — end an active permission or appointment.
- `suspend` — temporarily block operations while preserving records.
- `deactivate` — end normal active contribution while preserving history.
- `merge` — combine duplicate records while preserving provenance.
- `link` — relate records without collapsing their identities.
- `retain` — keep separate records after review.

## 15. Open terminology decisions

- Whether “University Owner” or “Primary Administrator” is the public-facing label.
- Whether “Research Verifier” and “Research Reviewer” are distinct roles.
- Whether “Request required” applies to metadata, abstract, full text, or all protected resources by default.
- Whether “archived” and “deactivated” have different retention or public-display behavior.
- Whether “constituent” and “affiliated” institutes can have additional relationship subtypes.

Resolve these before finalizing UI copy, OpenAPI enums, and role documentation.
