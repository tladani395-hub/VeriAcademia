# VeriAcademia Security and Privacy Requirements

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Security objectives

VeriAcademia must protect institutional trust, personal data, research evidence, protected files, and cross-university boundaries. The primary security goal is not merely to hide administration screens; it is to prevent unauthorized data access through every technical path, including APIs, files, search, caches, jobs, exports, backups, and logs.

## 2. Threat model

### 2.1 External attackers

- Credential stuffing and password spraying.
- Account enumeration.
- Session theft or fixation.
- Injection through search, filters, forms, or file metadata.
- XSS through researcher/profile/publication content.
- Direct object reference attacks using publication, file, request, or tenant IDs.
- Malware upload.
- Automated scraping and access-request abuse.
- Attempts to impersonate a university or claim its domain.

### 2.2 Malicious or compromised users

- A member of University A attempts to access University B data.
- A viewer attempts to approve, export, or change records.
- A researcher attempts to claim another researcher’s profile.
- A user requests or shares protected files beyond the granted scope.
- An administrator exceeds delegated organizational scope.
- A compromised administrator appoints new privileged users.

### 2.3 Insider and operational risks

- Platform administrator views tenant data without justification.
- Logs expose personal data, tokens, or protected URLs.
- Backup/restore affects the wrong tenant.
- Search index or cache retains stale private data.
- Worker job payload exposes sensitive content.
- A failed export contains records outside the requested scope.

## 3. Security architecture

### 3.1 Defense in depth

| Layer | Control |
|---|---|
| Edge | TLS, WAF/rate limits, secure headers, bot controls. |
| Application | Authentication, input validation, output encoding, CSRF protection where applicable. |
| Authorization | Exact permission, tenant, scope, object, lifecycle, visibility, grant, and rights checks. |
| Database | Constraints, transactions, RLS/enforced tenant predicates, least-privilege roles. |
| Files | Quarantine, malware scan, randomized names, protected storage, per-request authorization. |
| Search/cache | Tenant/visibility metadata, filtered queries, safe cache keys and invalidation. |
| Jobs | Service identity, safe payloads, idempotency, retry/dead-letter controls. |
| Operations | Audit, monitoring, backup/restore controls, access reviews. |

### 3.2 Authorization model

Every protected operation follows:

1. Authenticate.
2. Validate session and MFA/reauthentication requirements.
3. Resolve active membership and tenant.
4. Resolve role/permission and organizational scope.
5. Load target ownership and lifecycle.
6. Evaluate visibility, rights, grant, expiry, revocation, and legal restrictions.
7. Execute the exact action.
8. Write audit record and required notifications.

The default is deny. Missing or ambiguous state must not become allow.

## 4. Authentication requirements

- Use a modern password-hashing algorithm with unique salt/parameters.
- Verify email before membership or privileged actions.
- Require MFA for university/platform administrators and other privileged roles.
- Rotate session identifiers after authentication and privilege elevation.
- Support idle and absolute session expiry.
- Support active-session listing and revocation.
- Require reauthentication for administrator appointment, permission changes, tenant suspension, restore, and other high-risk actions.
- Protect recovery tokens with single use, short expiry, and safe error messages.
- Prevent account enumeration across sign-in, recovery, and invitation flows.
- Rate-limit login, recovery, membership, access requests, and invitation actions.

## 5. Tenant isolation requirements

Tenant isolation applies to:

- users and memberships;
- roles and permissions;
- universities, institutes, departments;
- researcher profiles and affiliations;
- publications, patents, evidence, and files;
- access requests and grants;
- analytics and exports;
- notifications and audit logs;
- backups and restoration;
- search indexes, caches, and background jobs.

### Required tests

- University A member cannot call University B APIs.
- University A admin cannot update University B records.
- A grant for one resource cannot be reused for another.
- Search cannot return private snippets or counts.
- Cache keys cannot cross tenant/user/visibility boundaries.
- Worker payloads cannot retrieve objects outside their tenant.
- Export filters cannot be overridden by client payload.
- Restore cannot affect another tenant.

## 6. File security

### Upload

- Enforce file kind, extension, MIME, and size allowlists.
- Scan uploads for malware before activation.
- Store uploads in quarantine until clean.
- Use randomized object names.
- Store original filename only as sanitized metadata.
- Reject executable or unsafe content.
- Record uploader, tenant, resource, rights, visibility, and scan status.

### Access

- Authorize every view/download.
- Check membership, role, visibility, grant, expiry, revocation, and rights.
- Use short-lived signed URLs or authorized streams.
- Set safe content type, content disposition, and no-sniff headers.
- Never expose raw object keys in public responses.
- Audit protected access according to policy.
- Prevent direct public access to protected storage prefixes.

### Rights

- Distinguish metadata, abstract, author-accepted manuscript, publisher version, repository copy, supplementary material, and external link.
- Unknown rights status blocks full-text distribution.
- Approval cannot override legal or contractual restrictions.
- Watermarking, if enabled, is an output policy and not a substitute for authorization.

## 7. Input, output, and web security

- Validate all external input with server-side schemas.
- Use parameterized SQL and safe query builders.
- Encode output based on context.
- Sanitize user-supplied HTML/Markdown if supported.
- Allowlist URL schemes and domains where appropriate.
- Use Content Security Policy, frame restrictions, referrer policy, and secure headers.
- Use CSRF protection for cookie-authenticated state-changing requests where applicable.
- Do not place secrets or private data in browser bundles, URLs, logs, or queue payloads.
- Return generic safe errors with a request ID; never return stack traces or SQL.

## 8. Data protection and privacy

### 8.1 Data minimization

Collect only data required for:

- account and email verification;
- university and membership governance;
- research attribution and verification;
- access requests and grants;
- security, audit, operations, and legal obligations.

### 8.2 Profile privacy

- Public fields are explicitly designated.
- Personal contact details are private by default.
- Profile photos require permission and safe storage.
- Historical affiliation is preserved without unnecessary personal exposure.
- External identifiers are visible only according to profile policy.

### 8.3 Access-request privacy

- Request reasons, intended use, organization, and evidence are visible only to requester and authorized reviewers.
- Other users cannot browse requests or infer private research from filters/counts.
- Retention and deletion follow an approved schedule.

### 8.4 Administrative privacy

- Administrators see only data needed for their role and scope.
- Platform administrator access to tenant data is justified, limited, and audited.
- Export field selection and visibility filtering are mandatory.

## 9. Audit and monitoring

### Required audit events

- University application/verification/suspension/reactivation.
- Domain claim/verification/disablement.
- Administrator invitation/appointment/permission change/removal.
- Membership application/decision/suspension/revocation.
- Researcher profile claim and controlled-field decision.
- Publication/patent submission and decision.
- Visibility, rights, and file-status changes.
- External access request/grant/expiry/revocation.
- Protected file view/download where policy requires.
- Duplicate merge/link/retain.
- Export creation/download.
- Backup/restore operation.
- Security-sensitive configuration changes.

### Audit record fields

Actor, actor type, action, target, tenant/scope, timestamp, result, request/correlation ID, reason, and redacted previous/new values where appropriate.

### Monitoring alerts

- Repeated authorization denials.
- New privileged appointment.
- Domain claim conflict.
- Tenant suspension/reactivation.
- Protected-file access anomaly.
- Backup failure or restore initiation.
- Queue dead letters or long queue age.
- Search index freshness failure.
- High export size or unusual export scope.

## 10. Secrets and infrastructure security

- Store secrets in a managed secret store.
- Use separate credentials per environment/service.
- Never commit secrets, tokens, MFA secrets, or signed URLs.
- Encrypt data in transit and sensitive data/backups at rest.
- Use least-privilege database, storage, queue, and cloud roles.
- Rotate credentials and support emergency revocation.
- Patch dependencies and base images.
- Restrict production administrative network/access where practical.
- Maintain incident response and disclosure procedures.

## 11. Backup, retention, and deletion

- Schedule encrypted backups and validate backup manifests.
- Define RPO/RTO after pilot scale and legal requirements are approved.
- Test restoration in an isolated environment.
- Tenant restore must not affect another tenant.
- Apply retention by record class: rejected applications, access requests, audit logs, files, exports, and backups.
- Support legal hold.
- Securely delete or anonymize expired data where required.
- Document deletion impact on historical research attribution and audit integrity.

## 12. Privacy and security review gates

Before production:

- Threat-model review completed.
- Authentication/session review completed.
- Tenant-isolation test matrix passed.
- Protected-file bypass tests passed.
- Search/cache/export leakage tests passed.
- Dependency and secret scans passed.
- Backup/restore exercise passed.
- Privacy/retention review approved.
- Incident and access-review runbooks approved.

## 13. Safe defaults

Until a policy is explicitly approved:

- deny protected access;
- require MFA for privileged roles;
- require reauthentication for high-risk actions;
- require evidence for affiliation and verification;
- keep personal contact details private;
- block full-text distribution when rights are unknown;
- do not index protected content;
- do not expose raw storage identifiers;
- preserve audit and historical relationships.
