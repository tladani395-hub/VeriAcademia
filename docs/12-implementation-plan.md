# VeriAcademia Implementation Plan

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Delivery approach

Deliver the platform in thin, testable slices that produce usable value while preserving the long-term multi-tenant architecture. Each phase ends with a demonstrable workflow, automated tests, documentation updates, and an operations check.

The plan assumes a small cross-functional team and the proposed TypeScript/Next.js/NestJS/PostgreSQL baseline. It can be adapted to another stack if the architecture and security requirements remain intact.

## 2. Guiding priorities

1. Establish trust and tenant boundaries before research content.
2. Build membership and authorization before internal workspaces.
3. Build canonical publications and affiliation evidence before analytics.
4. Build protected-file authorization before file upload is exposed.
5. Build auditability into every critical workflow from the first implementation.
6. Keep public discovery useful even when advanced integrations are deferred.
7. Use synthetic data and security tests throughout development.

## 3. Phase 0 — Discovery and decisions

**Duration:** 1–2 weeks  
**Goal:** Resolve decisions that affect contracts, data model, and pilot scope.

### Activities

- Confirm initial countries, university types, and pilot institutions.
- Define minimum university verification evidence.
- Choose domain verification methods for MVP.
- Approve membership evidence and exception policy.
- Define internal research resources and visibility defaults.
- Select access approver roles and default grant duration.
- Decide file formats, size limits, rights workflow, and watermark policy.
- Define analytics counting rules and export formats.
- Confirm privacy, accessibility, retention, backup, RPO, and RTO targets.
- Select hosting/provider and final stack components.

### Deliverables

- Approved decision log.
- Finalized MVP scope.
- Pilot success criteria.
- Data classification and retention matrix.
- Architecture/stack sign-off.

### Exit criteria

No critical open decision blocks schema, authorization, file, or pilot design.

## 4. Phase 1 — Foundation and public discovery

**Duration:** 2–3 weeks  
**Goal:** Create the runnable platform shell and trustworthy public surface.

### Build

- Repository, environments, CI, lint/type/test setup.
- Next.js web shell and design-system tokens.
- Public home, universities, researchers, publications, patents, and analytics routes.
- Basic PostgreSQL schema and migrations.
- Health/readiness endpoints.
- Public search using PostgreSQL or selected search adapter.
- Canonical publication and patent read models.
- Seed synthetic pilot data.
- Public SEO metadata, robots, and XML sitemap.

### Tests

- Public route smoke tests.
- Search/filter tests.
- Responsive and accessibility checks.
- Migration and seed tests.

### Exit criteria

A visitor can discover synthetic universities, researchers, publications, and patents on desktop and mobile without authenticated data leakage.

## 5. Phase 2 — Identity, university onboarding, and tenancy

**Duration:** 3–4 weeks  
**Goal:** Establish secure accounts, university verification, domains, and tenant activation.

### Build

- Account registration, email verification, sign-in, password reset.
- Session security and MFA foundation for privileged roles.
- University application form and evidence upload.
- Duplicate detection and platform review queue.
- University approval/rejection/additional-information workflow.
- Tenant creation and owner appointment transaction.
- Domain claim and verification workflow.
- Platform administration tenant directory.
- Audit events for all onboarding decisions.

### Tests

- Account enumeration and session tests.
- University activation transaction tests.
- Duplicate and domain-claim tests.
- Tenant isolation matrix.
- Platform admin authorization tests.

### Exit criteria

A legitimate test university can be verified, activated, assigned an owner, and isolated from another tenant.

## 6. Phase 3 — Membership, roles, and organization

**Duration:** 3–4 weeks  
**Goal:** Enable explicit membership and scoped administration.

### Build

- Membership application and review queue.
- Domain-policy evaluation and empty-domain behavior.
- Membership lifecycle and notifications.
- Roles, permissions, scopes, and assignments.
- Administrator invitations, acceptance, MFA, and revocation.
- Institute/relationship and department management.
- Tenant-scoped admin navigation and permission checks.
- Membership audit and security events.

### Tests

- Approval-before-access tests.
- Multi-university membership tests.
- Invitation expiry/revocation tests.
- Scoped permission tests.
- Organization lifecycle tests.

### Exit criteria

An approved member can enter a member workspace; an unapproved or other-tenant user cannot access protected tenant data.

## 7. Phase 4 — Researcher profiles and publication workflows

**Duration:** 4–6 weeks  
**Goal:** Deliver the core research contribution and verification experience.

### Build

- Researcher profile create/claim/edit.
- Name variants, affiliations, interests, external links, and verification.
- Publication draft and submission forms.
- Ordered authors and exact affiliation capture.
- DOI/identifier normalization and duplicate detection.
- Canonical publication and university association model.
- Evidence upload, rights status, and verifier queue.
- Verify/return/reject/activate/deactivate decisions.
- Revision/re-verification behavior.
- Researcher publication workspace and profile display.

### Tests

- Publication eligibility tests.
- Canonical reuse and cross-university association tests.
- Duplicate merge/preserve-history tests.
- Verification state-transition tests.
- File rights and protected-access tests.

### Exit criteria

A researcher can submit a paper, a verifier can make a traceable decision, and the same paper can be associated with multiple universities without sharing private evidence.

## 8. Phase 5 — Patents, access requests, and protected resources

**Duration:** 3–5 weeks  
**Goal:** Complete controlled research access and patent management.

### Build

- Patent draft, validation, duplicate checks, and verification.
- Visibility levels and resource-level policy.
- External access request form and queue.
- Scoped grants, expiry, revocation, and notifications.
- Protected file upload quarantine/malware-scan integration.
- Authorized view/download endpoint and audit.
- Correction/dispute/appeal cases.
- Rights-aware metadata/file display.

### Tests

- Patent workflow tests.
- Access request/grant scope tests.
- Expiry/revocation tests.
- Protected file bypass tests.
- Rights restriction tests.

### Exit criteria

External users can request and use only approved resource actions; protected files are never publicly addressable.

## 9. Phase 6 — Search, analytics, exports, and operations

**Duration:** 3–5 weeks  
**Goal:** Make the platform useful for discovery, reporting, and operations.

### Build

- Search index synchronization and visibility-aware facets.
- Public and private analytics dashboards.
- Metric definitions and counting fixtures.
- Export request, worker, field selection, and expiring links.
- Notification preferences and email templates.
- Audit log viewer with scoped access.
- Backup job records and restoration runbook.
- Operational dashboards and alerts.

### Tests

- Search authorization and freshness tests.
- Analytics multi-affiliation fixtures.
- Export scope/size/security tests.
- Backup/restore isolated test.
- Audit completeness tests.

### Exit criteria

Authorized users can obtain accurate reports and operators can observe, export, back up, and recover the system safely.

## 10. Phase 7 — Pilot hardening and launch

**Duration:** 2–4 weeks  
**Goal:** Validate real workflows, security, usability, and operations with pilot institutions.

### Activities

- Pilot onboarding and training.
- End-to-end regression suite.
- Security review and remediation.
- Accessibility review and remediation.
- Load/performance test.
- Backup/restore exercise.
- Content/SEO review.
- Operational runbooks and support handoff.
- Production deployment and monitoring.
- Pilot feedback backlog and release decision.

### Exit criteria

Pilot institutions can complete onboarding, membership, research submission, verification, access requests, analytics, and administration with no critical/high security defects.

## 11. Suggested milestone map

| Milestone | Date target | Evidence |
|---|---|---|
| M0 decisions approved | End of Phase 0 | Signed decision log. |
| M1 public discovery demo | End of Phase 1 | Deployed staging URL and smoke tests. |
| M2 tenant onboarding demo | End of Phase 2 | Verified synthetic university and isolation matrix. |
| M3 membership/admin demo | End of Phase 3 | Approved member and scoped admin workflows. |
| M4 research workflow demo | End of Phase 4 | Submitted/verified canonical publication. |
| M5 controlled access demo | End of Phase 5 | Approved scoped grant and protected download test. |
| M6 operational demo | End of Phase 6 | Analytics/export/audit/backup evidence. |
| M7 pilot launch | End of Phase 7 | Security, accessibility, load, and recovery sign-off. |

Dates should be replaced with team-specific targets after staffing and provider decisions are known.

## 12. Workstream ownership

| Workstream | Primary owner | Key collaborators |
|---|---|---|
| Product and decisions | Product owner | University representatives, operations |
| UX/design | Design lead | Researchers, administrators, accessibility reviewer |
| Frontend | Frontend lead | Backend, design, QA |
| Backend/data | Backend lead | Security, DevOps, QA |
| Security/privacy | Security lead | Product, legal/privacy, platform admin |
| QA | QA lead | Engineering, pilot users |
| DevOps | Platform/DevOps lead | Backend, security |
| Pilot operations | Delivery lead | University owners, support |

## 13. Definition of done

A feature is done when:

- product and design acceptance criteria are met;
- backend authorization and tenant scope are implemented;
- database migration and rollback notes are reviewed;
- unit/integration tests pass;
- critical negative security tests pass;
- UI states include loading, empty, error, and permission denied;
- accessibility checks pass for the affected flow;
- audit/notification behavior is verified;
- documentation and API contracts are updated;
- staging deployment and monitoring are verified.

## 14. Backlog after MVP

- Institutional SSO/OIDC/SAML.
- Approved metadata integrations.
- Public developer API.
- Advanced citation networks and metrics.
- Watermarking and document rendering.
- Multilingual interface.
- AI-assisted metadata suggestions with human review.
- Grants, theses, laboratories, conferences, and project management.
- Native mobile applications.

These items require separate product, privacy, security, and licensing decisions.
