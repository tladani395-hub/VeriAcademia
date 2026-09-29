# Product Requirements Document — VeriAcademia

**Status:** Baseline for review  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Executive summary

VeriAcademia is a secure, multi-tenant web platform for verified universities to govern their research ecosystem. It combines public research discovery, university onboarding, membership and identity management, researcher profiles, publication and patent workflows, controlled cross-university access, analytics, export, backup, and auditability.

The product must make research easier to discover without weakening institutional control. A university can operate as an isolated tenant, configure its organization and membership policies, verify research records, and decide how protected resources are exposed. A researcher can maintain a credible scholarly identity and submit eligible work. An external user can request narrowly scoped access without gaining access to the entire university.

## 2. Problem statement

Research information is fragmented across university websites, departmental files, spreadsheets, faculty profiles, journals, indexing services, and internal systems. The resulting problems include:

- unreliable or outdated author and affiliation data;
- duplicate and conflicting publication records;
- weak evidence that a paper or patent belongs to an institution;
- separate handling of papers and patents;
- manually assembled analytics that are difficult to reproduce;
- no consistent process for requesting non-public research;
- risk of university impersonation and domain claims;
- inability to safely host many universities in one system.

VeriAcademia addresses these problems through verified institutions, explicit membership, canonical research records, tenant isolation, controlled access, and auditable governance.

## 3. Product vision

Create a trusted digital research ecosystem where universities securely manage and showcase research, researchers maintain verified scholarly identities, authorized users discover institutional knowledge, and cross-university access occurs through controlled, auditable permission workflows.

## 4. Product principles

1. University autonomy.
2. Platform trust before institutional activation.
3. Strong tenant isolation.
4. Verified affiliation and evidence.
5. Membership approval separate from email eligibility.
6. Canonical research records across universities.
7. Least-privilege roles and granular permissions.
8. Traceable decisions and preserved history.
9. Privacy and distribution-rights awareness.
10. Accessible, responsive, and explainable user experiences.

## 5. Goals and non-goals

### 5.1 Initial product goals

- Verify universities and activate isolated institutional tenants.
- Model universities, institutes, departments, domains, memberships, roles, and permissions.
- Let approved members access their own university’s active research content.
- Let researchers create and maintain verified profiles.
- Support publication and patent submission, review, activation, correction, and archival.
- Reuse one canonical publication across legitimate university associations.
- Provide public discovery and controlled external access requests.
- Provide analytics, exports, notifications, audit logs, backup, and restoration foundations.
- Prevent cross-tenant leakage in data, files, search, caches, jobs, and reports.

### 5.2 Explicit non-goals for the initial release

- Native Android or iOS applications.
- Automatic Scholar, Scopus, Web of Science, Crossref, or ORCID imports.
- Institutional single sign-on as a mandatory first-release capability.
- Public developer APIs as a committed product surface.
- Citation-network analysis, h-index, impact factor, quartiles, or proprietary metrics.
- Grants, theses, laboratories, conferences, projects, social networking, or direct messaging.
- AI summarization, recommendations, or classification.
- Automated copyright or license determination.
- Multilingual interface unless separately approved.

These may be considered in later phases after the core governance and research workflows are stable.

## 6. Primary personas

### Public visitor

Needs to discover verified universities, researchers, publications, patents, and public analytics without exposing restricted material.

### External registered user

Needs to view public records and request access to a specific protected paper or file for a stated purpose.

### Student or viewer

Needs to search and read active research available to approved members of their university without administrative capabilities.

### Researcher or author

Needs to claim a profile, maintain permitted scholarly details, submit eligible papers and patents, provide evidence, and track review status.

### Research verifier

Needs a focused queue, evidence viewer, correction workflow, and traceable decision controls for assigned organizational scopes.

### Access approver

Needs to review a request’s purpose, requested action, rights constraints, and history, then approve, reject, request information, limit, or revoke access.

### University administrator

Needs to configure the institution, approve members, appoint administrators, manage organization and research records, review queues, export reports, and inspect audit history.

### University owner / primary administrator

Needs protected control over university governance, administrator appointments, permissions, policies, and recovery paths.

### Platform administrator

Needs to verify universities, review domain claims, prevent fraud and duplicates, suspend or reactivate tenants, govern platform policies, and investigate incidents with audited access.

## 7. Core user stories

### University onboarding

- As an authorized representative, I want to submit official university details, domains, and evidence so the platform can verify the institution.
- As a platform administrator, I want to detect likely duplicates and review evidence so fraudulent or duplicate universities are not activated.
- As a university owner, I want to configure domains, organization, administrators, and policies after activation.

### Membership and identity

- As a user, I want to verify my email and apply to a university so I can request internal membership.
- As a university administrator, I want to review evidence and approve, reject, or request more information so membership is explicit and accountable.
- As a member, I want separate account, membership, researcher, and permission settings so one relationship does not grant unintended authority.

### Researcher and research records

- As a researcher, I want to maintain my profile, affiliations, identifiers, publications, and patents so my scholarly record is accurate.
- As an author, I want to submit a paper with authors, affiliations, identifiers, files, and evidence so it can be verified.
- As a verifier, I want to inspect evidence and return, reject, verify, or activate a record with a reason.
- As an administrator, I want suspected duplicates to be flagged for review rather than silently deleted.

### Access and visibility

- As a public visitor, I want to discover public metadata without seeing protected files.
- As an external user, I want to request view or download access to one protected resource and track the decision.
- As an approver, I want to grant time-limited, resource-specific access and revoke it when necessary.

### Analytics and operations

- As an authorized administrator, I want scoped analytics with clear counting rules so I can understand research output without double counting.
- As an operator, I want exports, backups, restoration, notifications, and audit logs so the platform is accountable and recoverable.

## 8. Functional requirements summary

| ID | Requirement | Priority |
|---|---|---|
| PRD-FR-01 | Public directories and search for universities, researchers, publications, and patents | Must |
| PRD-FR-02 | University application, duplicate detection, evidence review, and activation | Must |
| PRD-FR-03 | Domain claiming, verification, status, and membership eligibility | Must |
| PRD-FR-04 | Account, email verification, membership application, approval, and lifecycle | Must |
| PRD-FR-05 | Granular roles, permissions, scopes, invitations, and privileged controls | Must |
| PRD-FR-06 | Researcher profile, name variants, affiliations, identifiers, and claims | Must |
| PRD-FR-07 | Publication draft, validation, duplicate detection, verification, activation, correction, and archival | Must |
| PRD-FR-08 | Canonical publication and university-specific associations, files, evidence, and visibility | Must |
| PRD-FR-09 | Patent submission, validation, verification, activation, correction, and archival | Must |
| PRD-FR-10 | Visibility levels and resource-level access evaluation | Must |
| PRD-FR-11 | External access requests, scoped grants, expiry, revocation, and audit | Must |
| PRD-FR-12 | Search/filtering with tenant and visibility enforcement | Must |
| PRD-FR-13 | Public, university, institute, department, author, indexing, and patent analytics | Must |
| PRD-FR-14 | Authorized exports with tenant scope, field selection, size limits, and expiring links | Should |
| PRD-FR-15 | Notifications for workflow, security, and operational events | Should |
| PRD-FR-16 | Correction, dispute, appeal, and evidence-review cases | Should |
| PRD-FR-17 | Audit logs, backup jobs, restoration records, and recovery controls | Must |
| PRD-FR-18 | Platform administration for tenant, domain, duplicate, policy, and incident governance | Must |

## 9. Non-functional requirements summary

- **Security:** server-side authentication, authorization, tenant isolation, object checks, MFA for privileged roles, secure sessions, input validation, CSRF protection where applicable, safe URLs, rate limiting, secure headers, malware scanning, encryption in transit and at rest.
- **Privacy:** data minimization, explicit public profile fields, private access-request details, retention policies, and least-privilege administrative views.
- **Performance:** paginated search, indexed common fields, bounded exports, background work for expensive tasks, and explicit response-time budgets.
- **Scalability:** support growth in universities, institutes, members, researchers, publications, patents, requests, and analytical queries without a fundamental redesign.
- **Availability:** health checks, graceful degradation, retry-safe jobs, monitored storage, backup and recovery procedures.
- **Accessibility:** keyboard navigation, screen-reader labels, contrast, accessible tables/charts/forms/dialogs, responsive layouts.
- **Maintainability:** modular services, documented rules/APIs, automated tests, coding standards, versioned migrations, observability.
- **Interoperability:** REST API, stable identifiers, normalized DOI/external IDs, structured exports, future integration hooks.

## 10. Success metrics

### Trust and governance

- Percentage of active universities with completed verification evidence.
- Percentage of memberships with an explicit decision and reviewer.
- Number of unauthorized cross-tenant access attempts blocked.
- Percentage of privileged actions with complete audit context.

### Research quality

- Duplicate rate before and after canonical-record enforcement.
- Percentage of active publications with verified affiliation evidence.
- Verification turnaround time by queue and university.
- Correction/dispute resolution time.

### Discovery and access

- Search success rate and zero-result rate.
- Public publication/patent discovery volume.
- External access-request approval/rejection/expiration distribution.
- Time from request submission to decision.

### Reliability and operations

- API availability and error rate.
- Search and dashboard latency percentiles.
- Backup success rate and restoration test success.
- Export completion and failure rate.
- Accessibility defects by severity.

## 11. MVP release definition

The MVP should include:

1. Public university, researcher, publication, and patent discovery.
2. University application and platform verification.
3. Email-domain policy and explicit membership approval.
4. Account, membership, role, and scoped permission foundations.
5. Researcher profile and publication/patent submission workflows.
6. Canonical publication associations and university-specific verification.
7. Visibility enforcement and external access requests.
8. Basic scoped analytics, exports, notifications, audit logs, and backup records.
9. Platform administration for tenants, domains, duplicates, and incidents.

The MVP should not include automatic scholarly imports, native mobile apps, proprietary metrics, AI features, or public developer APIs.

## 12. Open product decisions

The following decisions must be resolved before final sign-off:

1. Initial countries and university types.
2. Minimum university verification evidence.
3. First supported domain-verification methods.
4. Whether an institute may be affiliated with multiple universities.
5. Membership evidence requirements and exception policy.
6. Exact internal resources available to every approved member.
7. Legal/policy exceptions that restrict internal members.
8. Who may approve external access requests.
9. Default access-grant duration and view/download defaults.
10. Supported file formats, size limits, and watermark policy.
11. Authoritative indexing sources and conflict policy.
12. Analytics counting rules for multi-affiliation records.
13. Required export formats.
14. Backup frequency, retention, RPO, and RTO.
15. Notification channels and retention periods.
16. Accessibility, privacy, and data-protection standards.
17. Initial and three-year scale targets.
18. Default public-metadata policy.

## 13. Acceptance criteria

The product is ready for pilot when:

- A legitimate university can complete verification and activate a tenant.
- A user can apply for membership and cannot gain access before approval.
- A researcher can submit a publication and patent with evidence.
- A verifier can make a traceable decision and return corrections.
- A canonical publication can appear in multiple university collections without duplicating shared bibliographic facts.
- An external user can request and use only an approved resource/action within its validity period.
- A University A member cannot access University B protected data by URL, API, file, search, cache, export, or job.
- Public analytics use only eligible, verified, active records and documented counting rules.
- Critical actions are logged with actor, target, scope, timestamp, result, and previous/new state where appropriate.
- The main workflows work on desktop and mobile and meet agreed accessibility checks.
