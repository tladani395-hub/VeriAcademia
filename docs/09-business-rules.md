# VeriAcademia Business Rules

**Status:** Baseline for approval  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Rule classification

- **Hard rule:** must be enforced by backend validation, authorization, database constraints, or workflow state.
- **Policy rule:** configurable by a university or platform policy within approved boundaries.
- **Review rule:** requires human evidence review and cannot be safely automated as a final decision.

## 2. Identity, membership, and domains

| ID | Rule | Class | Enforcement |
|---|---|---|---|
| BR-001 | A university must be verified and active before it operates as a trusted tenant. | Hard | University lifecycle and authorization service. |
| BR-002 | Selecting a university does not create membership. | Hard | No membership row without explicit application/decision. |
| BR-003 | Every internal membership requires an authorized approval decision. | Hard | Membership workflow and permissions. |
| BR-004 | When allowed domains are configured, a normal applicant must use a verified matching email. | Policy/hard | Domain policy evaluated at submission. |
| BR-005 | When no domains are configured, any verified email may apply, but approval remains mandatory. | Policy/hard | Empty-list policy branch. |
| BR-006 | Domain ownership must be verified before the domain is trusted. | Hard | Domain status and verification record. |
| BR-007 | A matching domain never grants administrator rights. | Hard | Invitation and appointment workflow. |
| BR-008 | Administrators must be explicitly invited, accept the invitation, and complete required security setup. | Hard | Invitation token, MFA, role assignment. |
| BR-009 | A person may hold memberships in multiple universities only after independent approval for each. | Hard | Membership uniqueness and tenant scope. |
| BR-010 | Suspended, revoked, expired, or ended memberships lose active internal access immediately. | Hard | Authorization evaluation. |

## 3. University and organization

| ID | Rule | Class | Enforcement |
|---|---|---|---|
| BR-011 | A university application must include official identity, contact, representative, claimed domains, and evidence sufficient for review. | Policy/hard | Required-field validation. |
| BR-012 | Likely duplicate universities must be flagged for manual review. | Review | Duplicate detector and platform queue. |
| BR-013 | Constituent and affiliated relationships require type, effective dates, status, and evidence. | Hard | Organization schema. |
| BR-014 | An institute relationship is not active until verified. | Hard | Relationship status and authorization. |
| BR-015 | Historical organization changes must preserve effective dates and prior relationships. | Hard | Append/update history rules. |
| BR-016 | Platform administrators may access tenant data only when authorized and audited. | Hard | Privileged authorization and audit. |

## 4. Researcher profiles and affiliation

| ID | Rule | Class | Enforcement |
|---|---|---|---|
| BR-017 | Account, membership, researcher identity, role, and permission are separate concepts. | Hard | Separate tables and authorization model. |
| BR-018 | A researcher profile may be created independently of a login account, but claiming it requires controlled verification. | Hard | Claim workflow. |
| BR-019 | External profile links must use approved schemes and validated URLs. | Hard | URL allowlist and sanitizer. |
| BR-020 | Name and affiliation history must remain available for historical attribution. | Hard | Effective-dated relationships. |
| BR-021 | A publication is eligible for a university only when at least one author has a valid affiliation supported by the work or accepted authoritative evidence. | Hard/review | Affiliation verification. |
| BR-022 | Current employment alone does not make an older or unrelated paper eligible. | Hard/review | Evidence requirement. |
| BR-023 | Exact published affiliation text must be preserved even when mapped to a normalized organization. | Hard | Publication affiliation record. |

## 5. Publications and canonical records

| ID | Rule | Class | Enforcement |
|---|---|---|---|
| BR-024 | One canonical publication should represent the same bibliographic work across universities. | Hard/product | Canonical publication service. |
| BR-025 | Shared bibliographic facts and university-specific associations are separate. | Hard | Schema and permissions. |
| BR-026 | A university cannot modify or expose another university’s private evidence or files. | Hard | Object/tenant authorization. |
| BR-027 | DOI and stable identifiers must be normalized before comparison. | Hard | Identifier normalization. |
| BR-028 | Suspected duplicates must be reviewed, not silently deleted. | Review/hard | Duplicate queue and merge workflow. |
| BR-029 | A merge must preserve source records, relationships, files, revisions, and audit history. | Hard | Merge transaction and history. |
| BR-030 | Material changes to verified fields require a new revision or re-verification. | Policy/hard | Versioning and lifecycle rules. |
| BR-031 | Uploading a file does not establish distribution rights. | Hard | Rights status and exposure check. |
| BR-032 | Access approval cannot override legal or contractual distribution restrictions. | Hard | Rights check before grant/download. |

## 6. Visibility and access

| ID | Rule | Class | Enforcement |
|---|---|---|---|
| BR-033 | Public visitors may access only explicitly public resources. | Hard | Visibility filter and object authorization. |
| BR-034 | Approved members may access their own university’s active member research content, subject to role and legal/policy exceptions. | Policy/hard | Membership + resource policy. |
| BR-035 | A member of University A does not automatically receive University B protected access. | Hard | Tenant and grant evaluation. |
| BR-036 | External access approval normally applies to the requested resource and action only. | Hard | Grant scope. |
| BR-037 | View and download permissions may be granted separately. | Hard | `allowed_action` field. |
| BR-038 | Grants may be time-limited and revocable. | Hard | Start/expiry/revocation evaluation. |
| BR-039 | Protected files require authorization on every access attempt. | Hard | Per-request authorization. |
| BR-040 | Search results, snippets, counts, filters, and errors must not leak restricted data. | Hard | Search authorization and response shaping. |
| BR-041 | Platform-wide legal, privacy, embargo, and security restrictions override university settings. | Hard | Precedence order in authorization. |

## 7. Verification, patents, and analytics

| ID | Rule | Class | Enforcement |
|---|---|---|---|
| BR-042 | Verification decisions must record reviewer, decision, evidence, reason, previous state, resulting state, and time. | Hard | Verification record and audit. |
| BR-043 | Patent records require validated identifiers, inventors, affiliations, and evidence. | Hard | Patent workflow. |
| BR-044 | Unverified, ineligible, inactive, withdrawn, archived, or deactivated records must not inflate official active analytics. | Hard | Analytics query filters. |
| BR-045 | A publication counts once globally. | Hard | Canonical counting rule. |
| BR-046 | A publication may contribute once to each legitimately affiliated university. | Hard | Association-level counting. |
| BR-047 | A university total must not double count a paper because several internal authors are associated with it. | Hard | Deduplicated university aggregate. |
| BR-048 | Metric definitions must be visible or available to dashboard users. | Policy/UX | Metric documentation and UI help. |

## 8. Exports, backups, audit, and privacy

| ID | Rule | Class | Enforcement |
|---|---|---|---|
| BR-049 | Exports must respect permission, tenant scope, field selection, visibility, and size limits. | Hard | Export job validation. |
| BR-050 | Export download links must be secure and expiring. | Hard | Storage URL policy. |
| BR-051 | Backup and restore operations require strict authorization and complete audit logging. | Hard | Operations workflow. |
| BR-052 | A university restore must not corrupt or roll back another university’s data. | Hard | Tenant-scoped restore validation. |
| BR-053 | Audit logs must capture actor, action, target, scope, timestamp, result, and context. | Hard | Audit schema. |
| BR-054 | Access-request reasons and personal data are visible only to requester and authorized reviewers. | Hard | Object authorization and response shaping. |
| BR-055 | Data collection must be limited to information required for identity, affiliation, research, access, and operations. | Hard/privacy | Form/schema review. |
| BR-056 | Public researcher fields must be explicitly designated; personal contact details are not public by default. | Hard/privacy | Profile visibility fields. |

## 9. Authorization decision table

The backend evaluates the following in order:

| Step | Question | Deny/continue |
|---:|---|---|
| 1 | Is the account authenticated and active? | Deny. |
| 2 | Is the session valid and not revoked? | Deny. |
| 3 | Is the requested tenant known and active? | Deny or safe not-found. |
| 4 | Does the user have an active membership where required? | Deny. |
| 5 | Does the user have the exact permission? | Deny. |
| 6 | Does the permission scope cover the target? | Deny. |
| 7 | Is the target lifecycle state eligible for this action? | Deny. |
| 8 | Does visibility allow this audience? | Deny or public alternative. |
| 9 | Is there a valid access grant where required? | Deny. |
| 10 | Are rights, legal, embargo, privacy, or security restrictions satisfied? | Deny. |
| 11 | Execute and audit. | Continue. |

## 10. Visibility precedence

From most restrictive to least:

1. Legal/security hold or distribution restriction.
2. Private.
3. Specific users without a valid grant.
4. Request required without a valid grant.
5. University members without active membership.
6. Public metadata only for protected file actions.
7. Public for explicitly public resources.

A less restrictive university setting can never override a more restrictive platform/legal rule.

## 11. Duplicate and merge rules

1. Normalize DOI and stable identifiers before exact matching.
2. Compare normalized title, authors/order, year, venue, and URL for records without identifiers.
3. Flag likely duplicates; do not auto-delete.
4. A reviewer chooses merge, link, or retain.
5. A merge preserves all source IDs and provenance.
6. University-specific associations and files remain independently controlled.
7. Conflicting verified metadata uses evidence and revision history, not last-write-wins.
8. Analytics and search are rebuilt after a merge.

## 12. Lifecycle rules

### University

`draft → pending_verification → under_review → additional_info → verified_active`

Terminal or exceptional states: `rejected`, `suspended`, `deactivated`.

### Membership

`invited/draft → pending_approval → under_review → additional_info → approved_active`

Exceptional states: `rejected`, `suspended`, `expired`, `revoked`, `ended`.

### Publication association

`draft → submitted → under_validation → correction_required → verified → active`

Exceptional states: `rejected`, `withdrawn`, `archived`, `deactivated`.

### Access request

`draft → pending → under_review → additional_info → approved/rejected/cancelled`

Grant states: `active → expired/revoked`.

## 13. Safe defaults

Until an open decision is resolved:

- deny protected access;
- require explicit membership approval;
- require explicit administrator appointment;
- require evidence for affiliation and verification;
- expose metadata only when public policy allows;
- block protected file distribution when rights are unknown;
- preserve history rather than delete;
- require re-verification for material changes;
- audit privileged and access decisions.
