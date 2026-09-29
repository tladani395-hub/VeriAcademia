# VeriAcademia System Architecture

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Architectural goals

The architecture must support:

- many independent university tenants;
- public discovery and authenticated workspaces;
- canonical research records shared across legitimate university associations;
- strict tenant and object authorization;
- protected file access and rights-aware distribution;
- searchable bibliographic and patent data;
- asynchronous verification, indexing, export, notification, backup, and analytics jobs;
- auditable governance and recoverability;
- responsive web delivery and future integration adapters.

## 2. Logical architecture

```text
Browser / mobile web
        |
        v
Edge CDN + WAF + TLS termination
        |
        v
Next.js web application
  |-- public SSR/SSG pages
  |-- authenticated web routes
  |-- BFF/API client
  |-- design system
        |
        +-----------------------------+
        |                             |
        v                             v
REST API / Backend services       Search index
  |-- identity and sessions        |-- publications
  |-- tenancy and authorization    |-- universities
  |-- universities/memberships     |-- researchers
  |-- research workflows           |-- patents
  |-- access requests/grants       |
  |-- analytics/exports            v
  |-- audit/notifications       Object storage
        |                      |-- public assets
        |                      |-- protected evidence
        |                      |-- permitted files
        |                      |-- exports/backups
        v
PostgreSQL
  |-- relational domain data
  |-- tenant scoping
  |-- transactions
  |-- RLS and constraints
        |
        v
Queue + workers
  |-- email/notifications
  |-- duplicate analysis
  |-- search indexing
  |-- exports
  |-- backups
  |-- malware scanning
```

## 3. Component responsibilities

### 3.1 Edge and CDN

- Terminates TLS and applies secure headers.
- Serves static assets and approved public pages.
- Applies bot/rate-limit protections where configured.
- Never caches protected responses or file URLs without tenant/user-aware validation.
- Forwards trace and request identifiers.

### 3.2 Web application

- Renders public pages with SEO-friendly metadata.
- Provides authenticated member and administration interfaces.
- Calls backend APIs through a backend-for-frontend layer or same-origin API client.
- Keeps authorization decisions in the backend; UI checks are convenience only.
- Uses server-side rendering for high-value public discovery pages where appropriate.

### 3.3 API/backend services

A modular monolith is the proposed initial boundary. It keeps transactions and deployment simple while separating domain modules:

- Identity and session module.
- University and organization module.
- Membership and authorization module.
- Researcher/profile module.
- Publication and canonical-record module.
- Patent module.
- Visibility and access module.
- Search/analytics module.
- Export/backup module.
- Notification/audit module.
- Platform administration module.

A service boundary may be extracted later when scale, team ownership, or reliability requirements justify it. Do not split services merely to appear “microservice-based.”

### 3.4 Database

PostgreSQL is the system of record for:

- accounts, memberships, roles, permissions, and scopes;
- universities, domains, institutes, departments, and relationships;
- researcher profiles and affiliation history;
- canonical publications, authors, affiliations, associations, indexing, and files metadata;
- patents, inventors, and associations;
- access requests and grants;
- verification, corrections, exports, backup/restore records, notifications, and audit events.

Use transactions for lifecycle transitions and multi-row invariants. Use row-level security or an equivalent enforced tenant predicate for tenant-scoped tables. Platform-scoped tables must be explicitly distinguished from tenant-scoped tables.

### 3.5 Search

Search is a derived index, not the source of truth.

- Index only records visible to the relevant audience.
- Store tenant/visibility metadata in each indexed document.
- Apply authorization filters before returning results and facets.
- Rebuild or update indexes through idempotent workers.
- Keep canonical publication ID and university association IDs stable.
- Never place protected full text in a public index unless rights and access policy explicitly permit it.

### 3.6 Object storage

Use separate logical prefixes/buckets or access policies for:

- public assets;
- protected evidence;
- protected research files;
- exports;
- backups.

The application authorizes every protected view/download and issues a short-lived storage URL or streams through an authorized route. Randomize stored object names. Scan uploads before they become available. Store rights metadata separately from file bytes.

### 3.7 Queue and workers

Use a durable queue for:

- email and in-app notifications;
- duplicate detection;
- search indexing;
- analytics materialization;
- exports;
- malware scanning;
- backups and restore preparation;
- retryable external integrations.

Workers run with service identities and least-privilege credentials. Jobs include idempotency keys, tenant scope, correlation IDs, and retry/dead-letter handling.

## 4. Multi-tenancy model

### 4.1 Tenant identity

- `universities.id` is the tenant identifier after activation.
- Applications and pending domains are not active tenants but may carry a prospective tenant reference.
- Platform-scoped records use an explicit `platform` scope rather than an arbitrary university ID.
- Every tenant-scoped query includes the tenant predicate at the data-access boundary.

### 4.2 Isolation layers

| Layer | Required control |
|---|---|
| Authentication | Account and membership status are separate. |
| Authorization | Role, permission, tenant, scope, object, visibility, and grant checks. |
| Database | Tenant column/RLS, foreign keys, transactions, scoped indexes. |
| Files | Random object names, protected storage, per-request authorization. |
| Search | Tenant/visibility fields and filtered queries. |
| Cache | Tenant/user/visibility key namespace; no shared private payloads. |
| Jobs | Tenant-scoped payload and service credentials. |
| Analytics | Authorized scope and documented counting rules. |
| Exports | Tenant/field/visibility validation before job creation. |
| Logs | Redact secrets and personal data; scope audit access. |

### 4.3 Canonical publication boundary

A canonical publication stores shared bibliographic facts. University-specific data lives in association records:

- eligibility decision;
- verification state;
- visibility;
- evidence;
- files;
- rights declaration;
- review history.

This permits one paper to appear in multiple university collections without allowing one tenant to alter another tenant’s private evidence or files.

## 5. Authorization flow

For every protected operation:

1. Authenticate the request.
2. Confirm account and session are active.
3. Resolve membership and tenant scope.
4. Resolve role/permission assignments.
5. Load the target object with its tenant/owner metadata.
6. Evaluate lifecycle, visibility, grant, expiry, revocation, and legal restrictions.
7. Authorize the exact action, not merely the page.
8. Execute in a transaction where state changes occur.
9. Write audit event and dispatch notifications/jobs.

Deny by default. A missing role, missing tenant, inactive membership, expired grant, or unknown object returns a safe not-found/forbidden response according to the security policy.

## 6. Data flow examples

### 6.1 Publication submission

```text
Author browser
  -> validate draft in API
  -> transaction: canonical publication + author/affiliation relationships
  -> duplicate detection job
  -> university association + evidence
  -> verification queue
  -> reviewer decision
  -> search index update
  -> analytics materialization
  -> audit + notification
```

### 6.2 Protected download

```text
User requests /api/v1/files/[id]/download
  -> authenticate session
  -> load file metadata and owning association
  -> evaluate membership/visibility/grant/rights
  -> create short-lived storage URL or authorized stream
  -> audit access
  -> return file
```

### 6.3 University activation

```text
Application approved
  -> transaction: university + owner appointment + tenant settings
  -> initialize permissions/queues
  -> audit platform decision
  -> notify owner
  -> activate onboarding checklist
```

## 7. Caching strategy

- Public, verified, active content may use CDN/page caching with explicit invalidation.
- Authenticated pages and APIs should default to no private caching.
- Cache keys for private data include tenant, user role/scope, visibility, and resource version where needed.
- Use versioned cache invalidation after publication, visibility, membership, or grant changes.
- Never cache authorization results without a safe invalidation strategy.

## 8. Observability

Collect:

- request latency, status, and route;
- job duration, retries, and dead-letter events;
- search/index freshness;
- database pool and query metrics;
- storage and backup health;
- authorization denials by category;
- audit/security events;
- tenant-level operational metrics without exposing private content.

Use correlation IDs across web, API, workers, storage, and audit records. Dashboards should distinguish platform health from tenant-specific workload.

## 9. Deployment topology

Proposed environments:

- `development` — local or isolated shared environment with synthetic data.
- `staging` — production-like configuration and controlled test data.
- `production` — hardened, monitored, backed up, and access-restricted.

Recommended production components:

- CDN/WAF;
- web/application runtime;
- managed PostgreSQL with automated backups;
- managed Redis/queue;
- S3-compatible object storage with versioning and encryption;
- search cluster or managed search service;
- secrets manager;
- centralized logs and alerting;
- CI/CD with migration and health checks.

## 10. Reliability and failure handling

- Use idempotent jobs and unique operation keys.
- Retry transient failures with bounded backoff.
- Dead-letter jobs for manual inspection.
- Keep source-of-truth records intact when derived indexes fail.
- Serve public metadata from the database if search is temporarily unavailable where practical.
- Mark exports/backups as failed rather than silently partial.
- Test restoration regularly.
- Define RPO/RTO after scale and legal requirements are approved.

## 11. Security boundaries

- Public internet to edge/web/API.
- Web/API to database and queue.
- Workers to storage/search/email.
- Platform administrators to tenant data.
- University administrators to their tenant only.
- Protected files never served directly from a public bucket.
- Secrets and signing keys stored outside application configuration files.
- All administrative access logged and monitored.

## 12. Future evolution

- Extract search, notifications, or export workers into separate services only when operational needs justify it.
- Add metadata integrations behind adapters with rate limits, caching, licensing, and privacy controls.
- Add institutional SSO through a versioned identity-provider interface.
- Add public APIs only after authentication, scopes, rate limits, versioning, and data-sharing policies are approved.
- Keep canonical-record and tenant-association boundaries stable as the system grows.
