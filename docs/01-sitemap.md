# VeriAcademia Sitemap and Information Architecture

**Status:** Proposed baseline  
**Audience:** Product, design, engineering, content, SEO, and operations

## 1. Architecture principles

The sitemap separates four mental models:

1. **Discover** — public visitors find universities, researchers, publications, patents, and public analytics.
2. **Join** — representatives verify a university and users apply for membership.
3. **Contribute** — approved members maintain profiles, publications, patents, and evidence.
4. **Govern** — delegated administrators and platform administrators review, configure, audit, and recover data.

A route must never imply access. Every protected route is paired with a server-side permission and tenant-scope check.

## 2. Global navigation

### Public navigation

- Home
- Universities
- Researchers
- Publications
- Patents
- Analytics
- About / Trust
- Sign in
- Register

### Authenticated member navigation

- My dashboard
- My university
- My profile
- Research workspace
- Access requests
- Notifications
- Settings

### Administrator navigation

- Overview
- Organization
- Members
- Research
- Verification queue
- Access requests
- Analytics
- Exports
- Audit log
- Settings

### Platform navigation

- University applications
- Domain claims
- Tenant operations
- Platform research
- Security and incidents
- Platform analytics
- Audit and recovery
- Platform settings

## 3. Public route map

| Route | Purpose | Access | Primary actions |
|---|---|---|---|
| `/` | Trusted research discovery landing page | Public | Search, browse universities, understand trust model |
| `/universities` | University directory | Public | Filter by location, type, institute relationship |
| `/universities/[slug]` | Verified university profile | Public | View profile, institutes, public researchers and research |
| `/universities/[slug]/researchers` | University researcher directory | Public | Search and filter public profiles |
| `/universities/[slug]/publications` | University publication collection | Public | Search, filter, export public citations where enabled |
| `/universities/[slug]/patents` | University patent collection | Public | Search and view verified patent metadata |
| `/researchers` | Global researcher directory | Public | Search by name, interest, university, identifier |
| `/researchers/[slug-or-id]` | Public researcher profile | Public | View verified profile, publications, patents |
| `/publications` | Global publication discovery | Public | Search, filter, view permitted metadata |
| `/publications/[id]` | Publication detail | Public or authenticated | View metadata; request protected resource |
| `/patents` | Global patent discovery | Public | Search and filter patent metadata |
| `/patents/[id]` | Patent detail | Public | View verified patent record |
| `/analytics` | Public research analytics | Public | View aggregate charts and definitions |
| `/trust` | Verification, governance, and privacy explanation | Public | Explain how institutions and records are validated |
| `/help` | Help and support | Public | Find guidance or submit a permitted support request |

### Public SEO routes

- `/sitemap.xml` — XML sitemap for indexable public routes.
- `/robots.txt` — crawler policy.
- Canonical URLs must use the verified university slug and stable publication/patent identifiers.
- Draft, private, suspended, rejected, and member-only pages must not be indexed.

## 4. Authentication and onboarding routes

| Route | Purpose | Access |
|---|---|---|
| `/auth/sign-in` | Password or institutional sign-in | Public |
| `/auth/sign-up` | Create platform account | Public |
| `/auth/verify-email` | Confirm email verification token | Public |
| `/auth/forgot-password` | Request recovery link | Public |
| `/auth/reset-password` | Set a new password | Token-bound |
| `/auth/mfa` | Complete multi-factor challenge | Authenticated |
| `/auth/invitation/[token]` | Accept administrator or membership invitation | Invitee |
| `/onboarding/university/new` | Start university application | Verified account |
| `/onboarding/university/[applicationId]` | Continue or review application | Applicant / authorized reviewer |
| `/onboarding/university/[applicationId]/domains` | Claim and verify domains | Applicant |
| `/onboarding/university/[applicationId]/evidence` | Upload supporting evidence | Applicant |
| `/membership/applications/new` | Apply to a university | Verified account |
| `/membership/applications/[applicationId]` | Track or supplement application | Applicant / authorized reviewer |

## 5. Member workspace

| Route | Purpose | Access |
|---|---|---|
| `/dashboard` | Role-aware activity summary | Approved member |
| `/my-profile` | Account, memberships, security, preferences | Signed-in user |
| `/researcher/profile` | Claim, create, or edit scholarly profile | Approved researcher/member |
| `/researcher/profile/verification` | Review controlled profile changes | Researcher / verifier |
| `/researcher/publications` | Researcher publication workspace | Approved researcher |
| `/researcher/publications/new` | Create publication draft | Eligible researcher/admin |
| `/researcher/publications/[id]` | Edit, submit, track publication | Authorized owner/reviewer |
| `/researcher/patents` | Researcher patent workspace | Approved researcher |
| `/researcher/patents/new` | Create patent draft | Eligible researcher/admin |
| `/researcher/patents/[id]` | Edit and track patent | Authorized owner/reviewer |
| `/requests/access` | Track external access requests and grants | Requester |
| `/requests/access/new?resource=[id]` | Request a protected resource | Authenticated external user |
| `/requests/access/[requestId]` | View decision, respond to information request | Requester / approver |
| `/notifications` | In-app notifications | Signed-in user |
| `/settings/profile` | Public and private profile preferences | Signed-in user |
| `/settings/notifications` | Notification preferences | Signed-in user |
| `/settings/security` | Sessions, MFA, recovery, connected emails | Signed-in user |

## 6. University administrator workspace

All routes below require an active membership, a university-scoped role, and the relevant permission.

| Route | Purpose |
|---|---|
| `/universities/[slug]/admin` | University operations dashboard |
| `/universities/[slug]/admin/overview` | Queue, activity, health, and recent decisions |
| `/universities/[slug]/admin/profile` | University profile, branding, contact, policies |
| `/universities/[slug]/admin/domains` | Claim, verify, disable, and review email domains |
| `/universities/[slug]/admin/organization` | Constituent and affiliated institute hierarchy |
| `/universities/[slug]/admin/organization/institutes/new` | Create institute proposal |
| `/universities/[slug]/admin/organization/institutes/[id]` | Review institute relationship and evidence |
| `/universities/[slug]/admin/organization/departments` | Manage departments and aliases |
| `/universities/[slug]/admin/members` | Membership applications and member directory |
| `/universities/[slug]/admin/members/applications/[id]` | Approve, reject, or request evidence |
| `/universities/[slug]/admin/members/[memberId]` | Membership, roles, permissions, status history |
| `/universities/[slug]/admin/admins` | Administrator invitations and privileged access |
| `/universities/[slug]/admin/researchers` | Researcher profiles and affiliation history |
| `/universities/[slug]/admin/publications` | Publication queue and university collection |
| `/universities/[slug]/admin/publications/[id]` | Verify, return, activate, deactivate, resolve duplicate |
| `/universities/[slug]/admin/patents` | Patent queue and university collection |
| `/universities/[slug]/admin/patents/[id]` | Verify, return, activate, deactivate |
| `/universities/[slug]/admin/verification` | Assigned verification and correction queues |
| `/universities/[slug]/admin/access-requests` | External paper-access request queue |
| `/universities/[slug]/admin/access-requests/[id]` | Decide, request information, revoke, audit |
| `/universities/[slug]/admin/analytics` | Private university, institute, department metrics |
| `/universities/[slug]/admin/exports` | Create, monitor, and download authorized exports |
| `/universities/[slug]/admin/audit` | Tenant audit log and security events |
| `/universities/[slug]/admin/backup-restore` | Backup status and authorized recovery operations |
| `/universities/[slug]/admin/settings` | Visibility defaults, retention, notification, and integration settings |

## 7. Platform administrator workspace

| Route | Purpose |
|---|---|
| `/platform/admin` | Platform operations dashboard |
| `/platform/admin/universities` | University applications and tenant directory |
| `/platform/admin/universities/[id]` | Verify, suspend, reactivate, or investigate tenant |
| `/platform/admin/domains` | Domain claims and ownership review |
| `/platform/admin/duplicates` | Cross-tenant duplicate and canonical-record review |
| `/platform/admin/research` | Platform research integrity and disputes |
| `/platform/admin/security` | Incidents, suspicious activity, privileged access |
| `/platform/admin/audit` | Platform and cross-tenant audit log |
| `/platform/admin/backups` | Backup, restoration, and recovery operations |
| `/platform/admin/policies` | Platform-wide policies and feature controls |
| `/platform/admin/integrations` | Approved metadata, email, storage, and identity integrations |

## 8. API route map

The public API is versioned and separate from browser routes:

- `/api/v1/auth/*`
- `/api/v1/universities/*`
- `/api/v1/memberships/*`
- `/api/v1/researchers/*`
- `/api/v1/publications/*`
- `/api/v1/patents/*`
- `/api/v1/access-requests/*`
- `/api/v1/analytics/*`
- `/api/v1/exports/*`
- `/api/v1/notifications/*`
- `/api/v1/admin/*`
- `/api/v1/platform/*`
- `/api/v1/health/*`

Browser pages should use server-side rendering where it improves discovery and use the same authorization service as API clients. APIs must return a consistent error envelope and must never rely on route hiding.

## 9. Role-to-area access matrix

| Area | Visitor | External user | Member | Researcher | University admin | Platform admin |
|---|---:|---:|---:|---:|---:|---:|
| Public discovery | Yes | Yes | Yes | Yes | Yes | Yes |
| Restricted metadata | No | Request | Member | Member | Admin | Authorized |
| Protected file | No | Grant only | Policy/grant | Policy/grant | Policy/grant | Authorized |
| Membership application | No | Apply | Manage own | Manage own | Review | Investigate |
| Researcher profile | View public | View public | Own/permitted | Edit/submit | Review/manage | Authorized |
| Publication draft | No | No | No | Own/assigned | Scoped | Authorized |
| Verification queue | No | No | No | No | Scoped | Platform scope |
| University administration | No | No | No | No | Scoped | Platform scope |
| Platform governance | No | No | No | No | No | Yes |

“Scoped” means the permission is limited to the assigned university, institute, department, or queue.

## 10. Recommended URL conventions

- Use lowercase, hyphenated slugs for public entities.
- Keep opaque UUIDs for protected resources; do not expose sequential internal IDs as an authorization mechanism.
- Use query parameters only for transient filters or pre-filled actions.
- Use stable canonical identifiers for DOI, patent number, and external profile links.
- Use a single detail route for a canonical publication; university associations are filters or scoped views.
- Use explicit status in the UI, not in the URL, except for public workflow links that need a stable reference.

## 11. Navigation states

Every list should support:

- Loading skeleton with a clear label.
- Empty state explaining why no records appear.
- No-permission state with a safe alternative action.
- Filter and sort controls that are shareable.
- Server-side pagination.
- Export action only when the user has the permission.
- Search results that never reveal restricted snippets or private counts.

## 12. Sitemap acceptance criteria

- Every public route has a defined audience and canonical indexing policy.
- Every protected route has a role, permission, tenant scope, and object-level check.
- A member of University A cannot reach University B’s administration routes by changing a slug or ID.
- A public visitor can reach the main discovery paths without signing in.
- External access requests are available from the publication/resource detail page.
- University and platform administration have separate route trees.
- The XML sitemap includes only indexable public routes.
- The navigation remains usable at desktop, tablet, and mobile widths.
