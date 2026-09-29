# VeriAcademia Testing Strategy

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Testing goals

Testing must prove that VeriAcademia is:

- functionally correct across complex research workflows;
- secure against cross-tenant and object-level access bypasses;
- accurate in canonical-record and analytics behavior;
- usable and accessible to representative users;
- reliable under realistic data and background-job loads;
- recoverable through tested backup and restoration procedures.

High-risk controls are security gates, not optional regression tests.

## 2. Test levels

### 2.1 Unit tests

Cover pure domain logic and small services:

- identifier normalization;
- domain normalization and matching;
- state-transition validation;
- permission evaluation;
- visibility precedence;
- duplicate scoring helpers;
- analytics counting functions;
- date/expiry calculations;
- export field filtering;
- URL/file validation;
- notification template rendering.

Target: critical domain rules have deterministic unit coverage.

### 2.2 Integration tests

Use a test database and controlled workers to cover:

- account/email verification;
- university application and activation transaction;
- domain verification;
- membership approval and role assignment;
- administrator invitation acceptance;
- researcher profile claim;
- publication submission and duplicate detection;
- canonical publication association across universities;
- patent verification;
- access request/grant lifecycle;
- protected file authorization;
- export job generation;
- audit event creation;
- search indexing and visibility filtering.

### 2.3 End-to-end tests

Exercise critical user journeys in a browser:

1. Public visitor discovers a publication and requests access.
2. Representative registers and verifies a university.
3. User applies for membership and receives approval.
4. Researcher submits a publication with authors, affiliations, files, and evidence.
5. Verifier returns a record for correction and then verifies it.
6. External user requests and uses a scoped grant.
7. University administrator exports an authorized report.
8. Platform administrator suspends/reactivates a tenant.
9. User completes privileged MFA and reauthentication.
10. Mobile navigation and key forms work at phone width.

### 2.4 Contract tests

Validate:

- REST request/response schemas;
- authentication and error envelopes;
- pagination and filtering;
- OpenAPI contract;
- worker message schemas;
- email provider adapter boundary;
- storage signed-URL boundary;
- search adapter behavior.

### 2.5 Security tests

Include:

- tenant isolation matrix;
- object-level authorization tests;
- identifier-based access bypass attempts;
- session fixation/rotation;
- MFA enforcement;
- CSRF tests where applicable;
- XSS/output encoding;
- SQL injection and query parameterization;
- unsafe URL schemes;
- file type, size, and malware-scan behavior;
- rate limiting and enumeration resistance;
- protected cache behavior;
- secret leakage and dependency scans;
- audit completeness for privileged actions.

### 2.6 Performance and load tests

Test realistic volumes of universities, members, publications, patents, requests, and searches. Measure:

- public page latency;
- authenticated API p95/p99;
- search latency and index freshness;
- dashboard aggregate latency;
- queue throughput and retry behavior;
- export job duration;
- database pool and query plans;
- storage download authorization latency;
- behavior when search/queue/email dependencies fail.

### 2.7 Accessibility tests

- Automated checks on critical routes.
- Keyboard-only navigation.
- Screen-reader smoke tests.
- Focus order and visible focus.
- Form errors and instructions.
- Table headers, sort controls, and pagination.
- Color/contrast and non-color status cues.
- Mobile touch targets and responsive behavior.

### 2.8 Backup and disaster-recovery tests

- Create backup.
- Validate backup manifest and encryption.
- Restore into isolated environment.
- Verify tenant isolation after restore.
- Verify audit and lifecycle state.
- Measure RPO/RTO against approved targets.
- Test failed/partial restore handling.

## 3. Tenant-isolation test matrix

Create at least two universities, A and B, with distinct users, memberships, publications, files, requests, exports, and audit records.

| Attempt | Expected result |
|---|---|
| A member opens B publication detail | Public fields only or safe not-found; no protected data. |
| A member calls B admin API | Forbidden/not-found. |
| A admin changes B publication association | Forbidden. |
| A admin exports with B tenant ID in payload | Rejected; export scoped to A. |
| A user requests B protected file without grant | Forbidden. |
| B grant is presented to A file endpoint | Rejected. |
| A search query includes B-only private terms | No private result/snippet/count. |
| Worker job carries A tenant ID but requests B object | Rejected and audited. |
| Cache key is reused across tenants | Never returns B payload to A. |
| A restore is requested against B backup | Rejected unless platform-approved scope. |

## 4. Critical acceptance scenarios

### University verification

- Duplicate warning appears and routes to manual review.
- Approval creates exactly one active tenant and owner appointment.
- Rejection does not activate a tenant.
- Every decision is auditable.

### Membership

- Domain-eligible applicant still cannot access before approval.
- Empty-domain policy allows application but still requires approval.
- Rejected/suspended membership cannot access internal content.
- Multi-university membership remains independently scoped.

### Publication

- Same DOI reuses canonical record.
- Two universities can associate with one canonical publication.
- University A cannot view or change University B evidence/file.
- Unsupported affiliation cannot become active.
- Material verified-field change triggers re-verification.
- Deactivation removes record from active analytics without erasing history.

### Access

- External request is limited to requested resource/action.
- View grant does not imply download grant.
- Expired/revoked grant denies access.
- Request reasons are not visible to unrelated users.
- Rights restriction blocks prohibited file distribution.

### Analytics

- Global total counts a canonical publication once.
- Each legitimate university receives one contribution.
- Multiple authors from one university do not double count its total.
- Ineligible/inactive records are excluded.

## 5. Test data strategy

- Use synthetic universities, people, organizations, publications, patents, and files.
- Never use real personal data in non-production environments unless explicitly approved and protected.
- Seed deterministic fixtures for lifecycle and authorization tests.
- Include edge cases: missing identifiers, duplicate DOI, historical affiliations, expired grants, suspended tenants, multi-university papers, and conflicting metadata.
- Maintain a small “golden dataset” for analytics and search regression tests.

## 6. Quality gates

Before merge:

- type check and lint pass;
- unit/integration tests pass;
- critical security tests pass;
- migration dry run passes;
- no high-severity dependency finding without approved exception;
- API contract tests pass;
- code owners review domain-sensitive changes.

Before staging pilot:

- end-to-end critical journeys pass;
- accessibility smoke tests pass;
- load test meets agreed budgets;
- backup/restore test succeeds;
- audit logs are complete for high-risk actions;
- operational runbooks are reviewed.

Before production:

- penetration/security review completed for authentication, tenancy, files, and privileged administration;
- disaster-recovery exercise completed;
- monitoring/alerts verified;
- data retention and privacy review completed;
- rollback plan tested;
- pilot users trained and support path established.

## 7. Suggested coverage priorities

| Area | Minimum expectation |
|---|---|
| Authorization/tenant isolation | Very high; every protected operation has positive and negative tests. |
| Publication/patent lifecycle | High; state transitions and evidence decisions. |
| Access grants | Very high; scope, expiry, revocation, rights. |
| Analytics | High; counting fixtures and regression tests. |
| Files | Very high; type, malware, authorization, URL expiry. |
| Audit | High; critical events and redaction. |
| Public UI | Medium/high; discovery, SEO, accessibility. |
| Notifications | Medium; delivery and failure handling. |
| Exports/backups | High; scope, integrity, recovery. |

## 8. Manual pilot checklist

- University representative completes onboarding.
- Platform administrator verifies a university and domain.
- Owner appoints an administrator.
- User applies for membership and is approved.
- Researcher claims profile and submits a paper.
- Verifier returns and then approves a correction.
- External user requests access and uses only granted action.
- Administrator exports a scoped report.
- Platform administrator reviews audit and suspends/reactivates a test tenant.
- Restore is tested in an isolated environment.
- Representative users complete tasks on desktop and mobile.

## 9. Defect severity

- **Critical:** cross-tenant disclosure, unauthorized privileged action, protected-file bypass, data loss/corruption, authentication bypass.
- **High:** incorrect membership/access decision, analytics integrity failure, audit gap for critical action, unrecoverable job failure.
- **Medium:** workflow blockage, incorrect state transition, significant usability/accessibility defect.
- **Low:** cosmetic or non-blocking content issue.

Critical and high defects block release. Security defects require documented remediation or explicit risk acceptance by the accountable owner.
