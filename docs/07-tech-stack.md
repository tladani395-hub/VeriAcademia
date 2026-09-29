# VeriAcademia Proposed Technology Stack

**Status:** Proposed baseline for approval  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Recommendation summary

The source document permits Python, Java, PHP, JavaScript, and TypeScript, with React/Next.js and PostgreSQL/MySQL as preferred directions. For a secure, multi-tenant, workflow-heavy research platform, the proposed baseline is:

| Layer | Proposed choice | Reason |
|---|---|---|
| Frontend | Next.js + React + TypeScript | Server-rendered public discovery, responsive member/admin UI, strong ecosystem. |
| UI | Design-system CSS + accessible component primitives | Avoids unnecessary dependency weight while enforcing consistent states. |
| Backend | NestJS + TypeScript + Fastify/HTTP adapter | Modular domain boundaries, dependency injection, validation, testing, and shared TypeScript contracts. |
| Database | PostgreSQL | Relational integrity, transactions, JSONB where useful, full-text/search extensions, row-level security, mature operations. |
| Data access | Drizzle ORM or Kysely with explicit SQL for tenant/RLS-sensitive queries | Type safety without hiding multi-tenant authorization logic. |
| Migrations | Versioned SQL migrations | Auditable schema evolution and database-native constraints. |
| Queue | BullMQ + Redis | Durable asynchronous jobs, retries, scheduling, and observability. |
| Search | PostgreSQL full-text for MVP; OpenSearch/Meilisearch adapter when scale requires | Avoids premature infrastructure; keeps authorization metadata under control. |
| Storage | S3-compatible object storage | Protected/public separation, encryption, versioning, lifecycle policies, and portable deployment. |
| Authentication | Application-managed email/password + TOTP MFA initially; OIDC/SAML adapter later | Meets initial requirements without making institutional SSO a prerequisite. |
| Email | Transactional email provider adapter | Verification, invitations, decisions, security, and operations. |
| Monitoring | OpenTelemetry + structured logs + metrics + error tracking | Consistent tracing across web, API, workers, search, and storage. |
| Infrastructure | Docker/Compose locally; cloud or VM deployment with managed services in production | Portable and operationally understandable. |

This is a baseline, not a final procurement decision. The team may substitute a proven internal stack if it satisfies the same security, tenancy, transaction, and operational requirements.

## 2. Frontend stack

### 2.1 Next.js and React

Use Next.js for:

- public SEO pages and canonical metadata;
- server-rendered or statically generated university/research discovery pages;
- authenticated member and administration routes;
- API integration through a same-origin backend-for-frontend boundary;
- responsive layouts and accessible navigation.

Use React for reusable interface components and stateful workflows.

### 2.2 TypeScript

Use TypeScript across frontend, shared DTOs, and backend where practical. Shared types reduce contract drift for:

- roles and permissions;
- lifecycle states;
- visibility levels;
- API responses/errors;
- form schemas;
- analytics dimensions.

### 2.3 Styling

Use a small project-owned design system with CSS custom properties and accessible primitives. A utility framework may be added only if it improves delivery without weakening the design system. Avoid a heavy component library that cannot represent evidence panels, scoped administration, status histories, and complex tables cleanly.

### 2.4 Forms and validation

- Zod or equivalent schema validation at boundaries.
- Client validation for fast feedback.
- Server validation as the authority.
- Accessible error summaries and field-level messages.

## 3. Backend stack

### 3.1 NestJS modular monolith

Recommended modules:

1. `identity`
2. `universities`
3. `organization`
4. `memberships`
5. `authorization`
6. `researchers`
7. `publications`
8. `patents`
9. `access`
10. `search`
11. `analytics`
12. `exports`
13. `notifications`
14. `audit`
15. `operations`
16. `platform-admin`

A modular monolith is preferred for the first release because it preserves transactions across university activation, membership decisions, canonical publication associations, verification, and audit events. Extract services later only when a measured boundary justifies independent deployment.

### 3.2 API conventions

- REST under `/api/v1`.
- JSON request/response bodies.
- Consistent error envelope.
- Cursor or offset pagination with explicit limits.
- Idempotency keys for create/decision/export operations where retries are possible.
- ETags or row versions for concurrent edits where appropriate.
- OpenAPI generated from validated contracts.

### 3.3 Validation and authorization

- Validate all external input.
- Use allowlists for enums, file types, URL schemes, and sort fields.
- Resolve tenant and permission in a central authorization service.
- Keep object-level checks close to the domain operation.
- Never trust a tenant ID supplied by the browser when it can be derived from membership and route context.

## 4. Data stack

### 4.1 PostgreSQL

Use PostgreSQL for authoritative data and constraints:

- foreign keys for relationships;
- unique constraints for normalized identifiers where appropriate;
- check constraints for lifecycle states;
- partial indexes for active/public records;
- transactional state transitions;
- row-level security or enforced query predicates;
- JSONB only for extensible metadata that is not queried as a core invariant.

### 4.2 Tenant strategy

Recommended hybrid:

- `tenant_id` on tenant-scoped tables;
- explicit `scope_type` / `scope_id` for university, institute, and department permissions;
- PostgreSQL RLS for tenant-scoped tables;
- service role bypass limited to carefully audited platform operations;
- platform-scoped tables separated by schema or explicit classification.

The database must make cross-tenant queries difficult, not merely rely on application conventions.

### 4.3 Search

Start with PostgreSQL full-text and trigram indexes for the MVP if expected volume is moderate. Add a dedicated search engine when:

- result latency exceeds target under realistic data;
- faceting and ranking become complex;
- indexing volume requires independent scaling;
- synonym/typo behavior becomes a product requirement.

The search adapter must always include tenant and visibility fields.

### 4.4 Analytics

Use materialized views or scheduled aggregate tables for common dashboards. Keep raw records authoritative. Define counting rules in versioned SQL and test them against multi-author/multi-university fixtures.

## 5. Asynchronous processing

### 5.1 Redis and BullMQ

Use for:

- email delivery;
- duplicate detection;
- search reindexing;
- analytics refresh;
- export generation;
- malware scan coordination;
- backup jobs;
- retryable integrations.

Store only identifiers and safe job metadata in the queue. Retrieve sensitive payloads from protected storage/database using authorized service credentials.

### 5.2 Job guarantees

- Idempotency key per business operation.
- Retry with exponential backoff and jitter.
- Dead-letter queue.
- Correlation and tenant IDs.
- Explicit terminal states: succeeded, failed, cancelled, expired.
- Manual replay only after root-cause review.

## 6. File and rights handling

Use S3-compatible storage with:

- separate public/protected prefixes or buckets;
- server-side encryption;
- object versioning for evidence and permitted files where required;
- randomized object names;
- short-lived signed URLs after authorization;
- malware scanning before activation;
- lifecycle rules for temporary exports and rejected uploads;
- audit events for protected access.

The application stores rights, visibility, and ownership metadata in PostgreSQL. Storage permissions alone do not determine business authorization.

## 7. Identity and security tooling

### Initial baseline

- Email/password with a modern password-hashing algorithm.
- Email verification.
- TOTP MFA for privileged roles.
- Secure HTTP-only session cookies or equivalent protected token storage.
- Password reset and session revocation.
- Rate limiting and account-enumeration protection.

### Future adapters

- OIDC/SAML institutional SSO.
- Enterprise directory synchronization.
- Hardware security keys where approved.

Do not introduce an identity provider unless its threat model, recovery flow, tenant mapping, and administrative controls are understood.

## 8. DevOps and delivery

### Local

- Docker Compose for PostgreSQL, Redis, mail capture, storage emulator, and application services.
- Seed synthetic universities, members, publications, patents, and access requests.
- Migration command and reset command for development only.

### CI

- Type check and lint.
- Unit and integration tests.
- Contract tests.
- Security/dependency scans.
- Database migration dry run.
- Build and smoke test.
- Accessibility checks for critical routes where practical.

### Production

- Immutable builds.
- Database migrations in a controlled deployment step.
- Health/readiness checks.
- Rollback plan for application and schema changes.
- Secrets manager.
- Centralized logs and metrics.
- Backup and restore runbooks.

## 9. Alternatives considered

| Alternative | Benefit | Concern |
|---|---|---|
| Python/Django + DRF | Rapid admin and ORM productivity | Frontend/API consistency and async/search boundaries still need careful design. |
| Java/Spring Boot | Strong enterprise ecosystem | Higher initial complexity for a small team. |
| PHP/Laravel | Fast CRUD/admin delivery | Must prove multi-tenant, file, queue, and search controls meet security goals. |
| MySQL | Familiar relational option | PostgreSQL RLS, JSONB, and advanced indexing are better aligned with this design. |
| Microservices from day one | Independent scaling | Distributed transactions and tenant consistency increase risk before scale is known. |
| Serverless-only | Low operations overhead | Long-running exports, file scanning, and predictable tenant isolation need careful limits. |

## 10. Selection criteria

The final stack should be selected against:

1. Strong relational integrity and transactions.
2. Enforceable tenant isolation.
3. Secure protected-file access.
4. Accessible responsive frontend.
5. Mature background jobs and retries.
6. Search and analytics performance.
7. Observability and operational recoverability.
8. Team familiarity and hiring/maintenance capacity.
9. Clear licensing and data-processing terms.
10. Ability to deploy in the intended hosting environment.

## 11. Open technical decisions

- Final ORM/query layer.
- Initial search engine and scale threshold.
- Cloud/VM provider and managed-service availability.
- Email provider and regional data requirements.
- MFA/recovery implementation details.
- Backup/restore tooling and RPO/RTO.
- Whether to use server-side session cookies or token-based sessions.
- Exact export formats and generation libraries.
- Whether analytics aggregates are materialized views, tables, or a warehouse later.
