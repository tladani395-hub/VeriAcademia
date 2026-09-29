# VeriAcademia API Contract Outline

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Purpose

This document defines the initial REST API shape. It is an outline for OpenAPI design and implementation; exact fields and status codes must be finalized with the SRS, schema, and security review.

## 2. Common conventions

### 2.1 Base URL

```text
/api/v1
```

### 2.2 Content type

```text
Content-Type: application/json
```

File upload endpoints may use `multipart/form-data` and return JSON metadata.

### 2.3 Authentication

- Browser sessions or approved token sessions.
- Protected endpoints require a valid authenticated session.
- Privileged endpoints require MFA and, where configured, reauthentication.
- Service-to-service endpoints use workload identity and least privilege.

### 2.4 Pagination

```json
{
  "data": [],
  "pagination": {
    "limit": 25,
    "nextCursor": "..."
  }
}
```

### 2.5 Error envelope

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Check the highlighted fields.",
    "requestId": "01J...",
    "fields": {
      "doi": "The DOI format is not recognized."
    }
  }
}
```

Use safe generic messages for authorization failures when object existence is sensitive.

### 2.6 Idempotency

Use `Idempotency-Key` for retryable create/decision/export operations. The server returns the original result for the same key and request fingerprint.

## 3. Authentication endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/sign-up` | Create account. |
| POST | `/auth/sign-in` | Start/sign in session. |
| POST | `/auth/sign-out` | Revoke current session. |
| POST | `/auth/email/verify` | Verify email token. |
| POST | `/auth/password/reset/request` | Request recovery email. |
| POST | `/auth/password/reset/confirm` | Set new password. |
| GET | `/auth/mfa/challenge` | Get MFA challenge requirements. |
| POST | `/auth/mfa/verify` | Complete MFA. |
| GET | `/auth/sessions` | List active sessions. |
| DELETE | `/auth/sessions/{sessionId}` | Revoke session. |

## 4. Public discovery endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/universities` | List public verified universities. |
| GET | `/universities/{slug}` | Get public university profile. |
| GET | `/universities/{slug}/researchers` | List public researchers. |
| GET | `/universities/{slug}/publications` | List public publications. |
| GET | `/universities/{slug}/patents` | List public patents. |
| GET | `/researchers` | Search public researchers. |
| GET | `/researchers/{id}` | Get public researcher profile. |
| GET | `/publications` | Search public publications. |
| GET | `/publications/{id}` | Get publication with visibility-shaped fields. |
| GET | `/patents` | Search public patents. |
| GET | `/patents/{id}` | Get patent with visibility-shaped fields. |
| GET | `/analytics/public` | Get public aggregate analytics. |

## 5. University onboarding endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/university-applications` | Create application. |
| GET | `/university-applications/{id}` | Get applicant’s application. |
| PATCH | `/university-applications/{id}` | Update draft/submission. |
| POST | `/university-applications/{id}/submit` | Submit for review. |
| POST | `/university-applications/{id}/evidence` | Upload evidence. |
| GET | `/platform/universities/applications` | Platform review queue. |
| POST | `/platform/universities/applications/{id}/decision` | Approve/reject/request information. |
| GET | `/platform/universities` | Platform tenant directory. |
| POST | `/platform/universities/{id}/suspend` | Suspend tenant. |
| POST | `/platform/universities/{id}/reactivate` | Reactivate tenant. |

## 6. Domain and organization endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/universities/{slug}/admin/domains` | List tenant domains. |
| POST | `/universities/{slug}/admin/domains` | Claim domain. |
| POST | `/universities/{slug}/admin/domains/{id}/verify` | Start/complete verification. |
| PATCH | `/universities/{slug}/admin/domains/{id}` | Disable/renew domain. |
| GET | `/universities/{slug}/admin/organization` | Get hierarchy. |
| POST | `/universities/{slug}/admin/institutes` | Create institute proposal. |
| PATCH | `/universities/{slug}/admin/institutes/{id}` | Update institute/relationship. |
| POST | `/universities/{slug}/admin/institutes/{id}/verify` | Verify relationship. |
| POST | `/universities/{slug}/admin/departments` | Create department. |
| PATCH | `/universities/{slug}/admin/departments/{id}` | Update department. |

## 7. Membership and authorization endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/memberships/applications` | Apply to university. |
| GET | `/memberships/applications/{id}` | Get own application. |
| PATCH | `/memberships/applications/{id}` | Supplement evidence. |
| GET | `/universities/{slug}/admin/members/applications` | Review queue. |
| POST | `/universities/{slug}/admin/members/applications/{id}/decision` | Approve/reject/request information. |
| GET | `/universities/{slug}/admin/members` | Member directory. |
| GET | `/universities/{slug}/admin/members/{membershipId}` | Membership details/history. |
| POST | `/universities/{slug}/admin/admin-invitations` | Invite administrator. |
| POST | `/admin-invitations/{token}/accept` | Accept invitation. |
| GET | `/universities/{slug}/admin/permissions` | List available permissions. |
| PATCH | `/universities/{slug}/admin/members/{membershipId}/permissions` | Assign/revoke scoped permissions. |

## 8. Researcher endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/researcher/profile` | Get current user’s profile/claim state. |
| POST | `/researcher/profile` | Create or claim profile. |
| PATCH | `/researcher/profile` | Update permitted fields. |
| POST | `/researcher/profile/submit` | Submit controlled changes. |
| GET | `/researcher/profile/verification` | Verification status/history. |
| GET | `/researchers/{id}/publications` | Authorized profile publications. |
| GET | `/researchers/{id}/patents` | Authorized profile patents. |

## 9. Publication endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/researcher/publications` | Create draft. |
| GET | `/researcher/publications` | List own/authorized drafts. |
| GET | `/researcher/publications/{id}` | Get editable/authorized record. |
| PATCH | `/researcher/publications/{id}` | Update draft. |
| POST | `/researcher/publications/{id}/submit` | Submit for verification. |
| POST | `/researcher/publications/{id}/files` | Upload permitted file/evidence. |
| GET | `/universities/{slug}/admin/publications` | University publication queue/collection. |
| GET | `/universities/{slug}/admin/publications/{id}` | Review detail. |
| POST | `/universities/{slug}/admin/publications/{id}/decision` | Verify/return/reject. |
| POST | `/universities/{slug}/admin/publications/{id}/activate` | Activate verified association. |
| POST | `/universities/{slug}/admin/publications/{id}/deactivate` | Deactivate/archive. |
| POST | `/platform/duplicates/{id}/resolve` | Merge/link/retain canonical record. |

## 10. Patent endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/researcher/patents` | Create patent draft. |
| GET | `/researcher/patents` | List own/authorized drafts. |
| GET | `/researcher/patents/{id}` | Get patent draft/detail. |
| PATCH | `/researcher/patents/{id}` | Update draft. |
| POST | `/researcher/patents/{id}/submit` | Submit for verification. |
| GET | `/universities/{slug}/admin/patents` | Patent queue/collection. |
| POST | `/universities/{slug}/admin/patents/{id}/decision` | Verify/return/reject. |
| POST | `/universities/{slug}/admin/patents/{id}/activate` | Activate verified patent. |
| POST | `/universities/{slug}/admin/patents/{id}/deactivate` | Deactivate/archive. |

## 11. Access request and file endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/access-requests` | Request protected resource. |
| GET | `/access-requests` | List requester’s requests. |
| GET | `/access-requests/{id}` | Get request/grant status. |
| POST | `/access-requests/{id}/information` | Respond to information request. |
| GET | `/universities/{slug}/admin/access-requests` | Review queue. |
| GET | `/universities/{slug}/admin/access-requests/{id}` | Review detail. |
| POST | `/universities/{slug}/admin/access-requests/{id}/decision` | Approve/reject/request information. |
| POST | `/universities/{slug}/admin/access-grants/{id}/revoke` | Revoke grant. |
| GET | `/resources/{type}/{id}/permissions` | Get current user’s permitted actions. |
| GET | `/files/{id}/download` | Authorize and initiate download. |
| GET | `/files/{id}/view` | Authorize and initiate view/render. |

## 12. Analytics, export, notification, and operations endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/universities/{slug}/admin/analytics` | Scoped analytics. |
| POST | `/exports` | Create export job. |
| GET | `/exports` | List own/authorized exports. |
| GET | `/exports/{id}` | Get export status/link. |
| GET | `/notifications` | List in-app notifications. |
| PATCH | `/notifications/{id}` | Mark read/unread. |
| GET | `/settings/notifications` | Get preferences. |
| PATCH | `/settings/notifications` | Update preferences. |
| GET | `/universities/{slug}/admin/audit` | Tenant audit log. |
| GET | `/platform/admin/audit` | Platform audit log. |
| POST | `/operations/backups` | Start authorized backup. |
| GET | `/operations/backups` | List backup records. |
| POST | `/operations/restores` | Start authorized restore. |
| GET | `/operations/restores/{id}` | Get restore status. |

## 13. Authorization and response shaping

The same endpoint may return different fields based on:

- public vs authenticated audience;
- tenant membership;
- role and permission;
- resource visibility;
- lifecycle status;
- access grant;
- rights status.

The API must shape responses after authorization. It must not fetch private fields and remove them only in a generic serializer if the query itself can leak through timing, counts, or errors.

## 14. API security requirements

- Validate and allowlist path/query/body fields.
- Use parameterized queries.
- Apply tenant and object authorization before business logic.
- Rate-limit public search, authentication, membership, and access requests.
- Use secure cookies and CSRF protection where applicable.
- Return safe errors and request IDs.
- Audit critical decisions and protected-file access.
- Do not expose raw storage keys or signed URLs in list responses.
- Use TLS and secure headers in all non-local environments.

## 15. API versioning and change policy

- Additive fields may be added within a major version when backward-compatible.
- Breaking changes require `/api/v2` or an explicitly versioned resource.
- Deprecations require notice, documentation, and migration window.
- Enum additions must preserve unknown-value handling in clients.
- OpenAPI, SDK/shared types, and tests must be updated together.
