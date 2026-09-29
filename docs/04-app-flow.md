# VeriAcademia Application Flow

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Flow conventions

Each flow below identifies:

- **Actor:** the person or system role taking action.
- **Entry:** where the flow starts.
- **Primary path:** the expected happy path.
- **System responsibilities:** backend checks and side effects.
- **Alternate paths:** rejection, correction, expiry, suspension, or permission failure.
- **Exit:** the resulting state and next likely action.

All flows are subject to the authorization and tenant-isolation rules in [`09-business-rules.md`](09-business-rules.md) and [`14-security-and-privacy.md`](14-security-and-privacy.md).

## 2. Public discovery flow

**Actor:** Public visitor  
**Entry:** Home, search engine, university link, researcher link, publication link, or patent link.

### Primary path

1. Visitor opens `/` or a public discovery route.
2. The system renders only public, active, and indexable content.
3. Visitor searches by keyword, title, author, DOI, university, institute, department, year, type, indexing source, or patent status.
4. The search service applies visibility filters before returning results, snippets, counts, and facets.
5. Visitor opens a public detail page.
6. The page displays permitted metadata and an authorized external link when available.
7. If a protected resource is referenced, the page offers “Request access” to an authenticated user or “Sign in to request access” to a visitor.

### System responsibilities

- Verify university and record lifecycle status.
- Apply public visibility at query time.
- Prevent restricted snippets, private counts, and protected file URLs from appearing.
- Record only non-sensitive discovery analytics where approved.
- Serve canonical URLs and metadata for SEO.

### Alternate paths

- No results: show a helpful empty state and suggest broader filters.
- Suspended/deactivated university: hide normal public presence or show a policy-approved notice.
- Restricted resource: show public metadata only and a safe request action.
- Search abuse: apply rate limits and CAPTCHA/equivalent controls where appropriate.

### Exit

Visitor discovers a public record or begins authentication/membership/access-request flow.

## 3. University registration and verification flow

**Actors:** Authorized representative, platform administrator  
**Entry:** `/onboarding/university/new`

### Primary path

1. Representative signs in and verifies their email.
2. Representative enters official university information, location, website, contact details, representative details, proposed primary administrator, claimed domains, and supporting evidence.
3. The system normalizes names and domains and checks for likely duplicates.
4. Representative submits the application.
5. The application enters `Pending verification` or `Under review`.
6. Platform administrator reviews identity, official website, domains, evidence, duplicate signals, and contact channel.
7. Administrator approves the application or requests more information.
8. On approval, the system creates an active university tenant and an owner/primary-administrator appointment.
9. Owner accepts the appointment, completes privileged security setup, and reaches the university administration onboarding checklist.

### System responsibilities

- Store application and evidence in protected storage.
- Keep applicant and reviewer identity in the audit trail.
- Prevent two active tenants from claiming the same verified domain without an approved exception.
- Send status notifications.
- Create the tenant boundary and initial permission records transactionally.

### Alternate paths

- Duplicate likely: flag for manual review; do not automatically reject.
- Evidence insufficient: move to `Additional information required`.
- Fraud concern: platform security review, possible rejection or dispute case.
- Applicant abandons draft: retain draft according to retention policy.
- Domain verification fails: domain remains pending/rejected and cannot establish membership eligibility.

### Exit

University is active and owned, or application is rejected/suspended with a recorded reason.

## 4. Email-domain verification flow

**Actors:** University owner/administrator, platform administrator or automated verifier  
**Entry:** University administration → Domains

### Primary path

1. Administrator enters a domain.
2. System normalizes it and checks existing claims.
3. Administrator chooses an approved verification method.
4. System sends an institutional-email challenge or provides a DNS record/instruction.
5. Verifier confirms control through the selected method.
6. Domain becomes `Verified`.
7. Membership application eligibility uses the verified list.

### Alternate paths

- Domain already claimed by another tenant: route to dispute or platform review.
- Challenge expires: require a new challenge.
- DNS record missing or mismatched: return to pending with a clear error.
- Domain is disabled or ownership review expires: no longer trusted for eligibility.

### Exit

Domain is trusted, rejected, disabled, or awaiting renewed verification.

## 5. Membership application flow

**Actors:** User, university administrator  
**Entry:** User selects a university and chooses “Request membership.”

### Primary path

1. User signs in and verifies the email to be used.
2. System evaluates the university’s current domain policy.
3. If the email is ineligible, the system explains the policy and offers external access or support options.
4. If eligible, user submits requested membership information and evidence.
5. Application enters the university’s review queue.
6. Administrator reviews evidence and approves, rejects, or requests more information.
7. On approval, system creates an active membership and assigns the approved role/scope.
8. User receives notification and can access the member workspace.

### System responsibilities

- Never create membership merely because a university was selected.
- Evaluate policy at submission time and record the policy result.
- Prevent a suspended/revoked account from becoming active.
- Require explicit role and scope assignment.
- Audit the decision and notify the applicant.

### Alternate paths

- Empty domain list: any verified email may apply, but administrator approval remains mandatory.
- Duplicate pending application: show existing application rather than creating another.
- Evidence missing: `Additional information required`.
- Rejected: record reason and any appeal route allowed by policy.
- Suspended/revoked: remove active internal access immediately.

### Exit

Membership is active, rejected, expired, revoked, or ended.

## 6. Administrator appointment flow

**Actors:** University owner, invited administrator  
**Entry:** University administration → Administrators → Invite administrator

### Primary path

1. Owner enters an eligible email and selects role, permissions, and scope.
2. System validates domain policy or approved exception.
3. System creates a time-limited invitation with a secure token.
4. Invitee verifies email, signs in, completes MFA, and accepts the invitation.
5. System activates the appointment and records the audit event.
6. Administrator enters the scoped administration workspace.

### Alternate paths

- Invitation expires or is revoked: token is unusable.
- Invitee lacks required MFA: block activation.
- Email policy changes before acceptance: re-evaluate or require owner confirmation.
- Owner unavailable: use the approved recovery process, not an informal account transfer.

### Exit

Administrator is active with explicit permissions, or invitation is expired/revoked.

## 7. Researcher profile flow

**Actors:** Approved member/researcher, verifier or administrator  
**Entry:** Member workspace → Researcher profile

### Primary path

1. Researcher creates or claims a profile.
2. System checks for existing profiles using identifiers, email, name variants, and affiliations.
3. Researcher enters permitted details and external profile links.
4. Controlled fields enter verification when required.
5. Verifier reviews evidence and approves or returns corrections.
6. Approved fields become visible according to visibility policy.
7. Profile appears in researcher directories and contributes to authorized analytics.

### Alternate paths

- Existing profile found: start a controlled claim rather than creating a duplicate.
- External URL unsafe: reject or sanitize according to URL policy.
- Identity conflict: route to administrator/security review.
- Name or affiliation changes: preserve prior history and effective dates.

### Exit

Profile is active and verified to the configured field level, returned, or disputed.

## 8. Publication submission and verification flow

**Actors:** Researcher/author, system validator, research verifier, university administrator  
**Entry:** Research workspace → New publication

### Primary path

1. Eligible author creates a draft.
2. Author enters metadata, ordered authors, published names, affiliations, identifiers, links, keywords, files, and evidence.
3. System validates required fields, formats, dates, URLs, file types, and size limits.
4. System normalizes DOI/identifiers and runs duplicate detection.
5. If a canonical record exists, the system proposes reuse; otherwise it creates a new canonical record.
6. System evaluates university eligibility from published/accepted affiliation evidence.
7. Author submits the record to the responsible university queue.
8. Verifier reviews metadata, authorship, affiliation, indexing claims, links, files, and distribution rights.
9. Verifier verifies, returns for correction, or rejects with a reason.
10. Verified association is activated according to visibility and lifecycle policy.
11. Search, profiles, and analytics update.

### System responsibilities

- Keep canonical bibliographic facts separate from university-specific associations.
- Preserve exact published affiliation text and ordered author list.
- Prevent one university from changing another university’s private evidence or files.
- Require re-verification for material changes to verified fields.
- Audit every state transition and reviewer decision.

### Alternate paths

- Duplicate suspected: reviewer merges/links/retains with evidence; never silently deletes.
- Affiliation unsupported: return or reject the university association.
- Rights unclear: allow metadata/abstract but block protected file exposure.
- Correction requested: author edits a new revision or editable draft according to policy.
- Deactivation: preserve historical relationships and remove from official active analytics.

### Exit

Publication association is active, returned, rejected, withdrawn, archived, or deactivated.

## 9. Patent submission and verification flow

**Actors:** Researcher/author, verifier, administrator  
**Entry:** Research workspace → New patent

### Primary path

1. Eligible author creates a patent draft.
2. Author enters identifiers, inventors, applicant/assignee, dates, jurisdiction, status, affiliations, links, and evidence.
3. System validates identifiers, dates, inventor relationships, and required fields.
4. System checks for duplicate/conflicting records.
5. Author submits the record.
6. Verifier reviews evidence and decides verify, return, or reject.
7. Verified active patent appears in the university collection, researcher profile, and authorized analytics.

### Alternate paths

- Patent number conflict: route to manual review.
- Inventor/affiliation unsupported: return or reject.
- Record is withdrawn/archived: preserve history and stop contributing to active metrics.

### Exit

Patent association is active or in a terminal/non-active lifecycle state.

## 10. External paper-access request flow

**Actors:** External registered user, access approver  
**Entry:** Publication/resource detail → Request access

### Primary path

1. User signs in and opens a protected resource action.
2. System confirms the resource is not public and the user is not already authorized.
3. User selects access type: view metadata, abstract, full text, download, citation export, or supplementary material.
4. User provides reason, intended use, organization/university if applicable, and requested duration where supported.
5. System creates a request in the controlling university’s queue.
6. Assigned approver reviews identity, purpose, rights constraints, prior requests, and requested scope.
7. Approver approves with optional start/expiry and action limits, rejects, cancels, or requests more information.
8. Approval creates a scoped grant; rejection/cancellation closes the request.
9. User accesses the resource through an authorized route while the grant is valid.
10. System audits access and notifies relevant parties.

### Alternate paths

- User already has a valid grant: show current access instead of creating a duplicate request.
- Requester is an approved member of the owning university: route to internal access policy instead of external request.
- Rights prohibit distribution: approver may approve metadata/abstract only or reject file access.
- Grant expires/revoked: subsequent access is denied and user is informed.
- Abuse/rate limit: block or challenge further requests.

### Exit

Request is approved, rejected, cancelled, expired, revoked, or awaiting information.

## 11. Verification queue flow

**Actors:** Research verifier, department/institute/university administrator  
**Entry:** Verification queue

### Primary path

1. Reviewer opens an assigned item.
2. System displays submission, evidence, history, related canonical records, and policy checks.
3. Reviewer selects verify, return for correction, reject, or escalate.
4. Reviewer provides reason and evidence reference.
5. System transitions state, notifies submitter, and records audit event.
6. Queue and analytics update.

### Alternate paths

- Conflict of interest or insufficient scope: reassign.
- Evidence unavailable: request more information.
- Security concern: escalate to platform/security workflow.
- Duplicate: open canonical-resolution workflow.

### Exit

Item has a traceable decision or is reassigned/escalated.

## 12. Correction, dispute, and appeal flow

**Actors:** Reporter, responsible reviewer, platform administrator where needed  
**Entry:** Record detail → Report issue / correction request

### Primary path

1. Authorized user reports a specific issue and supplies evidence.
2. System creates a case linked to the affected record.
3. Responsible reviewer acknowledges and investigates.
4. Reviewer resolves, requests more evidence, rejects the case, or escalates.
5. Affected records are revised through their normal lifecycle rather than silently overwritten.
6. Reporter and record owner receive the outcome where policy permits.

### Alternate paths

- Urgent rights/privacy/security issue: restrict exposure while reviewed.
- Cross-tenant dispute: platform administrator mediates.
- Repeated abusive reports: rate-limit or suspend reporting capability.

### Exit

Case is resolved, rejected, escalated, or closed with documented rationale.

## 13. Deactivation and archival flow

**Actors:** Authorized administrator  
**Entry:** Record or tenant administration → Deactivate/archive

### Primary path

1. Administrator selects the target and reviews connected relationships and impact.
2. System requires a reason and, for high-risk targets, reauthentication or dual approval.
3. System changes lifecycle state and updates search/analytics visibility.
4. Historical relationships, files, and audit history remain available to authorized roles.
5. Notifications and audit events are created.

### Alternate paths

- Target has unresolved dependencies: show impact and require confirmation or block.
- Legal hold: preserve records and prevent deletion.
- Suspended tenant: block normal administration while preserving recovery and audit access.

### Exit

Target is deactivated, withdrawn, archived, suspended, or restored through an authorized process.

## 14. Export, backup, and restoration flow

**Actors:** Authorized operator/administrator, system worker  
**Entry:** Exports or Backup/Restore administration

### Export primary path

1. User selects permitted record classes, fields, scope, format, and filters.
2. System validates permission, tenant boundary, visibility, and size.
3. Export job is queued.
4. Worker generates a protected artifact.
5. User receives an expiring download link.
6. Export completion and access are audited.

### Backup primary path

1. Scheduled or authorized backup job starts.
2. System captures database and protected-file manifests with encryption.
3. Backup is validated and stored according to retention policy.
4. Backup status is visible to authorized operators.

### Restoration primary path

1. Authorized operator selects a backup and recovery scope.
2. System requires reauthentication/dual approval according to risk.
3. Restoration is validated in a safe target or maintenance window.
4. Tenant-scoped restore is applied without affecting other tenants.
5. Post-restore checks, audit record, and notification complete the operation.

### Alternate paths

- Export exceeds limits: reject or split according to policy.
- Backup validation fails: alert operations and do not mark successful.
- Restore would affect another tenant: block and require a platform-level approved procedure.

### Exit

Job succeeds, fails with an actionable reason, is cancelled, or is awaiting approval.

## 15. Cross-flow invariants

- No route, API, file, search index, cache, export, notification, or job may bypass tenant authorization.
- No email domain, university selection, or profile claim grants automatic membership.
- No upload grants automatic distribution rights.
- No canonical publication merge may discard source, relationships, files, revisions, or audit history.
- No deactivation silently erases historical attribution.
- No public or private analytics may include ineligible, unverified, inactive, or unauthorized records.
- Every critical decision records actor, target, scope, timestamp, result, reason, and prior/new state where applicable.
