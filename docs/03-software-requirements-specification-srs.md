# Software Requirements Specification — VeriAcademia

**Status:** Baseline for review  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Introduction

This SRS translates the VeriAcademia project understanding into testable software requirements. It is intended for product owners, designers, engineers, QA, security reviewers, and operations teams.

The system is a responsive web application with a public discovery surface, authenticated member workspace, university administration surface, and platform administration surface. It is multi-tenant by design and must enforce isolation in every persistence, file, search, cache, job, analytics, export, and audit path.

## 2. Scope

### 2.1 In scope

- University registration, verification, activation, suspension, and deactivation.
- University profiles, institutes, departments, aliases, and relationship history.
- Email-domain claims and verification.
- Account creation, email verification, membership applications, and membership lifecycle.
- Roles, granular permissions, scopes, invitations, and privileged controls.
- Researcher profiles, identity claims, affiliations, and external identifiers.
- Publication and patent lifecycle management.
- Canonical publication records and university-specific associations.
- Visibility, protected-file authorization, and external access requests/grants.
- Search, filters, public and private analytics.
- Exports, notifications, corrections, disputes, appeals, audit logs, backups, and restoration records.
- Platform governance and security operations.

### 2.2 Out of scope for initial release

See the PRD non-goals. Future integrations must be added through versioned interfaces and explicit privacy/security review.

## 3. Actors and responsibilities

| Actor | Responsibility |
|---|---|
| Public visitor | Discover public institutional and research information. |
| Registered external user | Maintain account and request specific protected resources. |
| Member / viewer | Access active research permitted for the member’s university. |
| Researcher / author | Maintain profile and submit eligible research. |
| Research verifier | Review evidence and decide research-record status. |
| Access approver | Decide external resource requests within delegated scope. |
| Department administrator | Manage assigned departmental data and queues. |
| Institute administrator | Manage assigned institutes, departments, members, and research. |
| University administrator | Manage tenant operations and delegated governance. |
| University owner | Control university governance and appoint administrators. |
| Platform administrator | Govern platform-wide institutions, domains, policies, incidents, and recovery. |
| System worker | Execute asynchronous jobs with service identity and least privilege. |

## 4. Functional requirements

### 4.1 Authentication and account security

**SRS-AUTH-001** The system shall allow a person to create an account using a valid email address and a compliant password or an approved identity provider.  
**SRS-AUTH-002** The system shall verify an email address before it can be used for membership or privileged actions.  
**SRS-AUTH-003** The system shall support secure password reset with single-use, time-limited tokens.  
**SRS-AUTH-004** Privileged roles shall require multi-factor authentication.  
**SRS-AUTH-005** The system shall rotate session identifiers after authentication and privilege elevation.  
**SRS-AUTH-006** The system shall support idle and absolute session expiry, active-session revocation, and reauthentication for sensitive actions.  
**SRS-AUTH-007** Authentication responses shall not reveal whether an email account exists.  
**SRS-AUTH-008** Login, recovery, membership, and access-request flows shall be rate-limited and monitored.

### 4.2 University onboarding

**SRS-UNI-001** An authorized representative shall be able to create a university application with official identity, location, contact, representative, domains, and evidence.  
**SRS-UNI-002** The system shall detect likely duplicate applications using normalized name, domain, website, and location signals.  
**SRS-UNI-003** A platform administrator shall be able to request additional information, approve, or reject an application with a reason.  
**SRS-UNI-004** Only an approved application shall create an active university tenant.  
**SRS-UNI-005** The initial approved representative shall become the university owner or primary administrator after accepting the appointment.  
**SRS-UNI-006** The system shall preserve application, reviewer, evidence, decision, and status history.

### 4.3 Organization and domain management

**SRS-ORG-001** A university shall be able to propose constituent and affiliated institutes with relationship type, dates, evidence, status, and authority.  
**SRS-ORG-002** An institute relationship shall be verifiable before it is treated as active.  
**SRS-ORG-003** A university shall be able to manage departments and verified aliases under the supported hierarchy.  
**SRS-ORG-004** A university shall be able to claim one or more email domains.  
**SRS-ORG-005** A domain shall have a verification method, status, ownership evidence, timestamps, and reviewer.  
**SRS-ORG-006** If allowed domains are configured, only a verified matching email may submit a normal membership application.  
**SRS-ORG-007** An empty allowed-domain list shall permit applications from any verified email, subject to administrator approval and abuse controls.  
**SRS-ORG-008** Domain matching shall never grant membership or administrator authority by itself.

### 4.4 Membership, roles, and permissions

**SRS-MEM-001** The system shall maintain account, university membership, researcher identity, role, and permission as separate records.  
**SRS-MEM-002** A user may apply to more than one university, but each membership requires an independent approval decision.  
**SRS-MEM-003** A membership application shall record applicant, university, domain-policy result, evidence, status, reviewer, decision, and timestamps.  
**SRS-MEM-004** An approved membership shall have an effective start date and may have an end, suspension, expiry, or revocation date.  
**SRS-MEM-005** Roles shall be groups of permissions; permissions shall be atomic actions with an optional organizational scope.  
**SRS-MEM-006** The system shall support university, institute, and department scopes.  
**SRS-MEM-007** Administrator invitations shall be time-limited, single-use, role/scope-specific, and auditable.  
**SRS-MEM-008** Privileged permissions shall be revocable immediately and shall require server-side enforcement.

### 4.5 Researcher profiles

**SRS-RES-001** An approved researcher shall be able to create or claim a researcher profile through a controlled process.  
**SRS-RES-002** A profile shall support name variants, current and historical affiliations, research interests, biography, photograph where permitted, and external profile links.  
**SRS-RES-003** External links shall use allowed schemes and be validated before storage or rendering.  
**SRS-RES-004** Institution-controlled or sensitive fields shall enter verification when configured.  
**SRS-RES-005** The system shall preserve affiliation and name history so earlier attribution remains intelligible.  
**SRS-RES-006** A profile may exist independently of a login account when created or imported by an authorized administrator.

### 4.6 Publication management

**SRS-PUB-001** An eligible user shall be able to create a publication draft with required bibliographic metadata, ordered authors, affiliations, identifiers, links, keywords, files, and evidence.  
**SRS-PUB-002** The system shall validate required fields, identifier formats, dates, URLs, file types, and size limits.  
**SRS-PUB-003** The system shall detect likely duplicates using normalized DOI, stable identifiers, normalized title, authors, year, venue, and URL.  
**SRS-PUB-004** A suspected duplicate shall be flagged for review; it shall not be silently deleted.  
**SRS-PUB-005** The system shall support one canonical publication with multiple ordered authors, affiliations, university associations, indexing records, and files.  
**SRS-PUB-006** A university association shall record eligibility, verification status, visibility, evidence, and lifecycle independently from the canonical record.  
**SRS-PUB-007** A publication shall qualify for a university only when an author has a valid eligible affiliation supported by the work or accepted authoritative evidence.  
**SRS-PUB-008** Authorized reviewers shall be able to verify, return for correction, reject, activate, withdraw, archive, or deactivate a record with a reason.  
**SRS-PUB-009** Changing verified information shall create a revision or re-verification requirement according to policy.  
**SRS-PUB-010** The system shall distinguish metadata, abstract, author-accepted manuscript, publisher version, repository copy, supplementary file, and external authorized link.  
**SRS-PUB-011** Uploading a file shall not by itself establish distribution rights.

### 4.7 Patent management

**SRS-PAT-001** An eligible user shall be able to submit patent title, identifiers, inventors, applicant/assignee, dates, jurisdiction, status, description where permitted, affiliations, links, and evidence.  
**SRS-PAT-002** The system shall validate identifiers, dates, inventor relationships, and affiliation evidence.  
**SRS-PAT-003** The system shall detect likely duplicate or conflicting patent records.  
**SRS-PAT-004** Authorized reviewers shall verify, return, reject, activate, withdraw, archive, or deactivate patents with traceable decisions.  
**SRS-PAT-005** Verified active patents shall contribute to profiles and analytics according to visibility and counting rules.

### 4.8 Visibility and protected resources

**SRS-VIS-001** The system shall support Public, Public metadata only, University members, Request required, Specific users, and Private visibility levels.  
**SRS-VIS-002** Visibility may be configured independently for metadata, abstract, full text, supplementary files, profiles, analytics, and reports.  
**SRS-VIS-003** A university may define default visibility, but platform security, legal, privacy, embargo, and rights restrictions shall override tenant settings.  
**SRS-VIS-004** Authorization evaluation shall consider authentication, account security, membership status, role/permission, tenant, lifecycle, resource visibility, grant, expiry, revocation, and legal restrictions.  
**SRS-VIS-005** Protected files shall require authorization on every view or download attempt.  
**SRS-VIS-006** Search results, counts, filters, previews, and errors shall not leak restricted information.

### 4.9 External access requests

**SRS-ACC-001** An authenticated external user shall be able to request access to a specific protected resource.  
**SRS-ACC-002** A request shall record resource, requester, verified email, university/organization if supplied, reason, intended use, access type, submission time, and status.  
**SRS-ACC-003** Supported access types shall include metadata, abstract, full-text view, permitted download, citation export, and approved supplementary material.  
**SRS-ACC-004** An approver shall be able to approve, reject, cancel, request more information, limit scope, set expiry, or revoke a request.  
**SRS-ACC-005** Approval shall create a scoped, optionally time-limited grant; it shall not grant access to the university collection.  
**SRS-ACC-006** View and download permissions may be granted independently.  
**SRS-ACC-007** Request and grant decisions shall be auditable and notifications shall be sent according to policy.  
**SRS-ACC-008** Repeated or abusive requests shall be rate-limited or blocked.

### 4.10 Search and discovery

**SRS-SRC-001** The system shall search universities, institutes, departments, researchers, publications, DOI, venues, years, keywords, indexing sources, patents, and inventors.  
**SRS-SRC-002** The system shall support filters for university, relationship type, institute, department, author, year range, publication type, indexing source, patent status, and current-user visibility.  
**SRS-SRC-003** Search shall paginate results and apply tenant/visibility filters before returning records or snippets.  
**SRS-SRC-004** Search indexes shall be rebuilt or updated through controlled background jobs with tenant-safe identifiers.

### 4.11 Analytics and exports

**SRS-ANA-001** The system shall provide public, university, institute, department, author, year, indexing, and patent metrics using explicit definitions.  
**SRS-ANA-002** A global publication shall count once globally and may contribute once to each legitimately affiliated university.  
**SRS-ANA-003** University totals shall avoid double counting a paper because multiple internal authors are associated with it.  
**SRS-ANA-004** Private dashboards shall use only data within the user’s authorized scope.  
**SRS-EXP-001** Authorized users shall be able to request permitted exports with field selection, scope, format, and size controls.  
**SRS-EXP-002** Export jobs shall be asynchronous, tenant-scoped, visibility-aware, audited, and delivered through secure expiring links.

### 4.12 Notifications, cases, audit, backup, and restoration

**SRS-OPS-001** The system shall notify users about verification, membership, research, access, security, export, and policy events according to preferences and mandatory-security rules.  
**SRS-OPS-002** Users shall be able to report metadata/profile errors, disputes, unauthorized content, fraudulent claims, and access decisions where permitted.  
**SRS-OPS-003** A case shall record status, responsible reviewer, evidence, decision, and history.  
**SRS-OPS-004** Audit events shall record actor, action, target, tenant scope, timestamp, result, source context, and previous/new values where appropriate.  
**SRS-OPS-005** Audit logs shall be tamper-resistant and restricted to authorized roles.  
**SRS-OPS-006** The system shall support scheduled encrypted backups, retention policies, tenant-aware recovery procedures, restoration tests, and restore authorization/audit.  
**SRS-OPS-007** A university restore shall not roll back or corrupt another university’s data.

## 5. Non-functional requirements

### 5.1 Security

- All protected operations shall be authorized on the server.
- Tenant ID and object ownership shall be checked for every protected query and file operation.
- Secrets shall be stored in a managed secret store and never in source control.
- TLS shall protect data in transit; sensitive data and backups shall be encrypted at rest.
- Security headers, CSP, output encoding, input validation, CSRF protection where applicable, rate limits, and safe URL handling shall be enforced.
- Protected uploads shall be type/size checked and malware scanned.
- Privileged actions shall require MFA and, where configured, reauthentication or dual approval.

### 5.2 Performance

The following are proposed initial budgets pending load testing:

| Operation | Target |
|---|---:|
| Public page first content | ≤ 2.5 s on a typical broadband connection |
| Authenticated API p95 | ≤ 500 ms for ordinary reads |
| Search p95 | ≤ 1.5 s for paginated queries |
| Dashboard p95 | ≤ 2 s for bounded aggregates |
| Export start | ≤ 5 s; completion asynchronous |
| Protected download authorization | ≤ 500 ms before storage redirect/stream |

### 5.3 Availability and reliability

- Health endpoints shall expose liveness and readiness.
- Background jobs shall be retry-safe and idempotent where possible.
- Failed jobs shall be observable and replayable without duplicating external side effects.
- Backups and restoration procedures shall be tested periodically.
- A single tenant’s heavy workload should not materially degrade other tenants.

### 5.4 Accessibility and usability

- Support keyboard operation, visible focus, semantic landmarks, labels, and error summaries.
- Meet the approved WCAG target; WCAG 2.2 AA is the proposed baseline.
- Provide responsive layouts for desktop, tablet, and mobile.
- Use understandable status labels, reasons for returned records, and clear access-request progress.

### 5.5 Maintainability and interoperability

- Use modular boundaries, documented APIs, automated tests, coding standards, versioned migrations, and observability.
- Use REST as the initial integration style with stable identifiers and normalized external IDs.
- Keep future integrations behind adapter boundaries and explicit data-processing agreements.

## 6. Data and lifecycle requirements

- All tenant-scoped records shall carry a university/tenant identifier or an explicit platform scope.
- Historical relationships shall be preserved through effective dates and status transitions rather than destructive overwrites.
- Deactivation shall be a lifecycle state, not an unconditional delete.
- Canonical publications shall separate shared facts from university-specific associations and files.
- Audit and verification records shall be append-oriented and protected from ordinary updates.
- Retention and deletion policies shall be configurable by record class and jurisdiction after legal approval.

## 7. External interfaces

### 7.1 User interfaces

- Responsive web frontend for public, member, university, and platform workspaces.
- Email templates for verification, invitations, decisions, security events, and operational notifications.

### 7.2 APIs

- Versioned REST API under `/api/v1`.
- Consistent pagination, filtering, error, and idempotency conventions.
- No public API is committed until separately designed and approved.

### 7.3 Future integrations

Potential adapters include DOI/metadata services, ORCID, Scholar/Scopus/Web of Science, institutional SSO, email delivery, malware scanning, object storage, and analytics. Each requires security, privacy, reliability, and licensing review.

## 8. Acceptance and traceability

Each requirement shall be linked to at least one automated test, manual acceptance scenario, or operational control. High-risk requirements—tenant isolation, membership approval, publication eligibility, protected-file authorization, external grants, privileged access, exports, backups, and audit logging—require explicit security and QA sign-off before pilot.

## 9. Open decisions affecting requirements

See [`02-product-requirements-document-prd.md`](02-product-requirements-document-prd.md#12-open-product-decisions) and [`15-glossary-and-state-machines.md`](15-glossary-and-state-machines.md). Until resolved, implementations shall use safe defaults: deny access, require approval, preserve history, and avoid automatic trust.
