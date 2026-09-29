# Technical Requirements Document — VeriAcademia

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Purpose

This TRD defines the technical requirements needed to implement the product requirements, architecture, schema, and security model. It is an engineering contract for the initial build and a checklist for technical review.

## 2. Technical objectives

1. Provide a responsive web application for public, member, university, and platform users.
2. Enforce multi-tenancy at authentication, authorization, database, file, search, cache, job, export, and audit layers.
3. Preserve canonical research facts while isolating university-specific evidence, files, verification, and visibility.
4. Support reliable asynchronous workflows for notifications, indexing, duplicate analysis, exports, backups, and integrations.
5. Make critical decisions traceable through append-oriented verification and audit records.
6. Deliver secure file handling with rights awareness and per-request authorization.
7. Provide measurable performance, availability, accessibility, and recovery targets.
8. Keep the initial system operable by a small engineering team without premature distributed complexity.

## 3. Technical environment

### 3.1 Supported clients

- Current versions of Chrome, Edge, Firefox, and Safari.
- Desktop width ≥ 1024 px.
- Tablet width 768–1023 px.
- Mobile width 360–767 px.
- Keyboard and screen-reader interaction for primary workflows.

### 3.2 Runtime

- Web/application runtime with TypeScript.
- PostgreSQL-compatible relational database.
- Redis-compatible queue/cache for background work.
- S3-compatible object storage.
- Optional search service behind an adapter.
- Transactional email provider adapter.

### 3.3 Environments

| Environment | Purpose | Data |
|---|---|---|
| Local | Development and integration | Synthetic fixtures; disposable services. |
| Staging | Release candidate validation | Synthetic/anonymized production-like data. |
| Production | Live pilot and operation | Approved production data only. |

Environment variables must identify the environment and prevent staging/production cross-wiring.

## 4. API requirements

### 4.1 General

- Base path: `/api/v1`.
- JSON request and response bodies.
- UTF-8.
- TLS in all non-local environments.
- Consistent request IDs/correlation IDs.
- Consistent error envelope:

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have access to this resource.",
    "requestId": "..."
  }
}
```

- Do not expose stack traces, SQL, storage paths, tenant IDs, or internal identifiers in client errors.
- Use safe not-found responses where existence itself is sensitive.
- Use idempotency keys for retryable create/decision/export operations.
- Use ETags or versions for concurrent edits where supported.
- Generate and review OpenAPI documentation.

### 4.2 Authentication

- Secure cookie/session or approved token mechanism.
- Session rotation after sign-in and privilege elevation.
- MFA challenge endpoint for privileged roles.
- Email verification and password reset endpoints.
- Account/session revocation endpoints.
- Rate limits by IP, account, email, and action where appropriate.

### 4.3 Authorization headers/context

The server must derive tenant and membership context from authenticated identity and route/resource ownership. Client-supplied tenant IDs are inputs to validate, never authority to trust.

### 4.4 Pagination and filtering

- Explicit `limit`, bounded by a documented maximum.
- Cursor or offset pagination with stable ordering.
- Allowlisted sort fields and directions.
- Filters encoded as structured query parameters.
- Search queries trimmed, length-limited, and escaped/parameterized.

### 4.5 File endpoints

- Metadata endpoints may return safe file metadata.
- Download endpoints must authorize the exact file and action.
- Return a short-lived signed URL or authorized stream.
- Never expose raw storage object keys in public responses.
- Set safe content type, disposition, and no-sniff headers.
- Audit protected views/downloads according to policy.

## 5. Database requirements

### 5.1 Integrity

- Foreign keys for all mandatory relationships.
- Unique constraints for canonical identifiers where appropriate.
- Check constraints for state enums and date ordering.
- Transactions for multi-row state transitions.
- Optimistic concurrency version for high-contention records.
- Time-zone-aware timestamps.

### 5.2 Tenancy

- Tenant ID on tenant-scoped tables.
- Platform tables explicitly classified.
- PostgreSQL row-level security or equivalent enforced query policy.
- Service role bypass limited to audited platform operations.
- Tenant-safe migrations and seed data.
- No cross-tenant foreign key or cascade that can delete another tenant’s records.

### 5.3 Performance

- Index common filters and joins.
- Use partial indexes for active/public records.
- Use materialized aggregates for expensive dashboards.
- Analyze query plans for publication, membership, access, and audit queries.
- Archive or partition large audit/event data according to retention policy.

## 6. File requirements

### 6.1 Upload

- Maximum size configured by file kind.
- Allowlisted MIME type and extension.
- Randomized object name.
- Store uploader, tenant, resource, rights, visibility, and scan status.
- Quarantine pending malware scan.
- Reject executable or unsafe content.
- Preserve original filename only as metadata after sanitization.

### 6.2 Access

- Authorize every view/download.
- Check membership, role, visibility, grant, expiry, revocation, and rights.
- Use short-lived signed URLs or authorized streams.
- Prevent direct public bucket access for protected prefixes.
- Support watermarking later as a configurable output policy, not a storage dependency.

### 6.3 Retention

- Temporary uploads expire if submission is abandoned.
- Rejected/blocked files are retained only according to policy.
- Evidence and audit-linked files follow legal/retention rules.
- Backups and exports have separate lifecycle policies.

## 7. Search requirements

### 7.1 Index contents

- Public university/researcher/publication/patent metadata.
- Member-visible metadata where authorized.
- Tenant and visibility fields on every document.
- Canonical publication and association IDs.
- No protected full text unless rights and access policy explicitly permit it.

### 7.2 Query behavior

- Apply authorization filters before result and facet generation.
- Escape/sanitize user input.
- Paginate and rate-limit.
- Avoid private counts and snippets.
- Reindex after publication, visibility, affiliation, merge, or deactivation changes.
- Provide a rebuild job with progress and failure reporting.

### 7.3 Ranking

Initial ranking may use field weights for title, authors, DOI, keywords, venue, and recency. Ranking must not use private data to influence public results.

## 8. Background job requirements

### 8.1 Job contract

Each job message should contain:

- job type;
- idempotency key;
- tenant ID where applicable;
- resource type and ID;
- correlation/request ID;
- safe retry metadata;
- no passwords, MFA secrets, signed URLs, or raw protected payloads.

### 8.2 Reliability

- Retry transient failures with bounded exponential backoff.
- Dead-letter unrecoverable jobs.
- Make external side effects idempotent.
- Record job state, attempts, error category, and completion time.
- Allow authorized replay after investigation.
- Monitor queue age and failure rate.

### 8.3 Required jobs

- Email verification and notifications.
- University/domain verification reminders.
- Duplicate detection.
- Search indexing.
- Analytics materialization.
- Malware scanning.
- Export generation.
- Backup and restore preparation.
- Grant expiry cleanup/notifications.
- Future metadata integrations.

## 9. Frontend requirements

- Server-render or statically generate public discovery pages where useful for SEO.
- Use client-side hydration only for interactive controls.
- Keep authenticated data out of public HTML/JavaScript bundles.
- Use accessible components and semantic HTML.
- Provide loading, empty, error, permission-denied, and offline states.
- Keep route-level authorization as a convenience; backend remains authoritative.
- Use CSP-compatible scripts and no unapproved third-party runtime dependencies.
- Support light, dark, and system theme tokens.
- Preserve form values across recoverable validation errors.

## 10. Security requirements

### 10.1 Authentication and session

- Modern password hashing with per-password salt/parameters.
- Email verification before membership/privileged actions.
- MFA for privileged roles.
- Session rotation and revocation.
- Idle/absolute expiry.
- Reauthentication for high-risk actions.
- Account enumeration resistance.

### 10.2 Authorization

- Deny by default.
- Exact permission and scope checks.
- Tenant and object checks on every protected operation.
- No authorization based solely on URL visibility or frontend state.
- Privileged role changes take effect immediately.

### 10.3 Input/output

- Server-side schema validation.
- Parameterized SQL.
- Output encoding.
- CSP and secure headers.
- Safe URL allowlist.
- HTML/Markdown sanitization where user content is rendered.
- CSRF protection where cookie-authenticated state-changing requests require it.

### 10.4 Secrets and configuration

- Secrets in managed secret storage.
- No secrets in source, logs, browser bundles, or queue payloads.
- Separate credentials per environment and service.
- Rotate credentials and support emergency revocation.

### 10.5 Security operations

- Security audit events.
- Alert on repeated denials, privileged changes, domain claims, tenant suspension, restore, and protected-file anomalies.
- Dependency scanning and patch process.
- Incident response runbook.
- Periodic access review for platform and university administrators.

## 11. Observability requirements

- Structured JSON logs with request/correlation ID, service, environment, tenant scope where safe, action, outcome, and latency.
- Metrics for request rate/errors/latency, queue age, job outcomes, search freshness, database pool, storage operations, and backup status.
- Distributed traces across web, API, worker, database, search, and storage where supported.
- Redact personal data, tokens, passwords, MFA secrets, and protected file URLs.
- Dashboards for platform health and tenant workload without exposing private content.
- Alerts with actionable runbooks.

## 12. Deployment and release requirements

- Immutable build artifact.
- Database migration command with preflight checks.
- Health/readiness endpoints.
- Rollback procedure for application and schema changes.
- CI checks: type, lint, unit, integration, contract, security, build, and migration tests.
- Staging smoke test before production.
- Feature flags for high-risk or incomplete capabilities.
- No production deployment without backup and restore verification.

## 13. Data protection and retention

- Data minimization in forms and logs.
- Explicit public/private profile fields.
- Private access-request reasons and evidence.
- Retention schedules by record class.
- Legal hold support.
- Secure deletion or anonymization workflow after retention expiry.
- Regional/data-residency requirements reviewed before provider selection.

## 14. Acceptance criteria

The technical implementation is acceptable when:

- all protected operations pass tenant/object authorization tests;
- canonical publication associations preserve university-specific isolation;
- protected files cannot be accessed through storage URLs, IDs, search, cache, or exports without authorization;
- critical workflows are transactionally consistent and auditable;
- queues recover from transient failures without duplicate business effects;
- public pages meet SEO and accessibility requirements;
- performance targets are met under agreed test data;
- backup/restore is tested in an isolated environment;
- operational logs and alerts expose failures without exposing sensitive data.

## 15. Open technical decisions

See [`07-tech-stack.md`](07-tech-stack.md#11-open-technical-decisions) and the PRD open decisions. The implementation must preserve safe defaults while decisions remain unresolved.
