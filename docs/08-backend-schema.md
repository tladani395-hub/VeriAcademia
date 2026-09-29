# VeriAcademia Backend Schema

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Schema conventions

- PostgreSQL is the system of record.
- Use UUID primary keys unless a stable external identifier is explicitly required.
- Use `tenant_id` on tenant-scoped records.
- Use `created_at`, `updated_at`, `created_by`, and `updated_by` where auditability requires them.
- Use ISO-8601 timestamps with time zone.
- Use enumerated check constraints or strongly typed enum values.
- Use soft lifecycle states for records that must preserve history.
- Use append-oriented verification, audit, and state-transition records.
- Normalize DOI, identifiers, domains, names, and titles before comparison.
- Do not store passwords, MFA secrets, signed URLs, or raw security tokens in ordinary business tables.

## 2. Common columns

Most tables should include a subset of:

```text
id uuid primary key
tenant_id uuid null
status text not null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
created_by uuid null
updated_by uuid null
version integer not null default 1
```

`tenant_id` is null only for explicitly platform-scoped records. A platform-scoped record must not be treated as globally visible by default.

## 3. Core entity relationship overview

```text
PlatformAccount 1──* VerifiedEmail
PlatformAccount 1──* UniversityMembership *──1 University
University 1──* UniversityDomain
University 1──* InstituteRelationship *──1 Institute
Institute 1──* Department
UniversityMembership 1──* RolePermissionAssignment
UniversityMembership 1──* ResearcherProfile
ResearcherProfile 1──* ResearcherAffiliation
ResearcherProfile 1──* ExternalResearchProfile
Publication 1──* PublicationAuthor
PublicationAuthor 1──* PublicationAffiliation
Publication 1──* UniversityPublicationAssociation
Publication 1──* IndexingRecord
Publication 1──* PublicationFile
Patent 1──* PatentInventor
Patent 1──* UniversityPatentAssociation
ProtectedResource 1──* AccessRequest 1──* AccessGrant
University 1──* AuditLog
```

## 4. Identity and tenancy

### 4.1 `platform_accounts`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key. |
| `display_name` | text | User-facing name. |
| `password_hash` | text nullable | Null for non-password identities. |
| `mfa_required` | boolean | True for privileged roles or policy. |
| `mfa_enabled_at` | timestamptz nullable | MFA activation time. |
| `account_status` | text | `pending`, `active`, `suspended`, `disabled`. |
| `last_sign_in_at` | timestamptz nullable | Security/audit use. |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

### 4.2 `verified_emails`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key. |
| `account_id` | uuid | FK platform account. |
| `email_normalized` | text | Lowercase/normalized. |
| `email_verified_at` | timestamptz | Verification time. |
| `is_primary` | boolean | One primary per account. |
| `status` | text | `pending`, `verified`, `disabled`. |

Unique index: `(account_id, email_normalized)`.

### 4.3 `sessions`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key. |
| `account_id` | uuid | FK account. |
| `session_hash` | text | Hash of session token, never raw token. |
| `created_at` | timestamptz |  |
| `expires_at` | timestamptz | Absolute expiry. |
| `last_seen_at` | timestamptz | Idle tracking. |
| `revoked_at` | timestamptz nullable | Revocation. |
| `user_agent` | text nullable | Sanitized metadata. |
| `ip_hash` | text nullable | Privacy-conscious security context. |

### 4.4 `universities`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Tenant ID after activation. |
| `slug` | text | Unique public slug. |
| `official_name` | text |  |
| `abbreviation` | text nullable |  |
| `university_type` | text |  |
| `website_url` | text | Validated HTTPS URL. |
| `address_json` | jsonb | Country/state/city/address. |
| `contact_json` | jsonb | Official contact data. |
| `verification_status` | text | `draft`, `pending`, `under_review`, `additional_info`, `verified`, `rejected`, `suspended`, `deactivated`. |
| `activated_at` | timestamptz nullable |  |
| `suspended_at` | timestamptz nullable |  |
| `deactivated_at` | timestamptz nullable |  |
| `logo_file_id` | uuid nullable | FK protected/public file. |

Unique indexes: `slug`, normalized official name, normalized primary domain where applicable.

### 4.5 `university_applications`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `applicant_account_id` | uuid |  |
| `proposed_university_id` | uuid nullable | FK when draft tenant row exists. |
| `status` | text | Lifecycle state. |
| `official_data_json` | jsonb | Submitted official details. |
| `domain_claims_json` | jsonb | Initial claims; normalized copies also stored in domains. |
| `evidence_manifest_json` | jsonb | Protected file references. |
| `duplicate_score` | numeric nullable | Review aid, not sole decision. |
| `submitted_at` | timestamptz nullable |  |
| `reviewed_at` | timestamptz nullable |  |
| `decision_reason` | text nullable |  |

### 4.6 `university_domains`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid | FK university. |
| `domain_normalized` | text | Lowercase, punycode-normalized. |
| `verification_method` | text | `email`, `dns`, `document`, `manual`. |
| `status` | text | `pending`, `verified`, `rejected`, `disabled`, `review_required`. |
| `verified_at` | timestamptz nullable |  |
| `expires_at` | timestamptz nullable | Ownership review. |
| `evidence_file_id` | uuid nullable |  |
| `verified_by` | uuid nullable |  |

Unique index: `(tenant_id, domain_normalized)`. A cross-tenant unique claim table may be needed for disputed domains.

## 5. Organization

### 5.1 `institutes`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid | Owning university. |
| `name` | text |  |
| `slug` | text |  |
| `status` | text | `pending`, `active`, `suspended`, `archived`. |
| `address_json` | jsonb nullable |  |
| `created_at` | timestamptz |  |

Unique index: `(tenant_id, slug)`.

### 5.2 `university_institute_relationships`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `university_id` | uuid | FK university. |
| `institute_id` | uuid | FK institute. |
| `relationship_type` | text | `constituent` or `affiliated`. |
| `effective_start` | date |  |
| `effective_end` | date nullable |  |
| `status` | text | `pending`, `verified`, `rejected`, `archived`. |
| `verification_status` | text |  |
| `evidence_file_id` | uuid nullable |  |
| `authority_json` | jsonb | Governance scope. |

### 5.3 `departments`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `institute_id` | uuid nullable | Null for university-level department if supported. |
| `name` | text |  |
| `slug` | text |  |
| `status` | text | `active`, `archived`. |

Unique index: `(tenant_id, institute_id, slug)` with a partial expression for null institute scope.

## 6. Membership and authorization

### 6.1 `university_memberships`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `account_id` | uuid |  |
| `status` | text | `invited`, `draft`, `pending`, `under_review`, `additional_info`, `approved`, `rejected`, `suspended`, `expired`, `revoked`, `ended`. |
| `approved_at` | timestamptz nullable |  |
| `effective_start` | date nullable |  |
| `effective_end` | date nullable |  |
| `decision_reason` | text nullable |  |
| `evidence_file_id` | uuid nullable |  |
| `approved_by` | uuid nullable |  |

Unique active-membership index: `(tenant_id, account_id)` where status is approved/active-equivalent.

### 6.2 `roles`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid nullable | Null for platform roles. |
| `code` | text | Stable code, e.g. `university_admin`. |
| `name` | text |  |
| `description` | text nullable |  |
| `is_system` | boolean | Prevent accidental deletion of system roles. |

### 6.3 `permissions`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `code` | text | Unique atomic action, e.g. `publication.verify`. |
| `name` | text |  |
| `resource` | text | `membership`, `publication`, etc. |
| `action` | text | `view`, `create`, `update`, `verify`, `approve`, `export`. |

### 6.4 `role_permissions`

| Column | Type | Notes |
|---|---|---|
| `role_id` | uuid | FK role. |
| `permission_id` | uuid | FK permission. |

Composite primary key: `(role_id, permission_id)`.

### 6.5 `membership_permission_assignments`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `membership_id` | uuid |  |
| `role_id` | uuid nullable | Role group. |
| `permission_id` | uuid | Explicit permission. |
| `scope_type` | text | `university`, `institute`, `department`, `platform`. |
| `scope_id` | uuid nullable | Organization scope. |
| `status` | text | `active`, `revoked`, `expired`. |
| `effective_start` | timestamptz |  |
| `effective_end` | timestamptz nullable |  |

The authorization service must evaluate explicit grants and role grants without trusting the client-supplied scope.

### 6.6 `administrator_invitations`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `inviter_id` | uuid |  |
| `email_normalized` | text |  |
| `role_id` | uuid |  |
| `permission_set_json` | jsonb | Snapshot of intended permissions. |
| `scope_json` | jsonb | Intended organization scope. |
| `status` | text | `pending`, `accepted`, `expired`, `revoked`. |
| `token_hash` | text |  |
| `expires_at` | timestamptz |  |

## 7. Researcher identity

### 7.1 `researcher_profiles`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid | Primary institutional scope. |
| `membership_id` | uuid nullable | Linked approved membership when claimed. |
| `name_primary` | text |  |
| `name_variants_json` | jsonb | Published variants. |
| `research_interests_json` | jsonb |  |
| `biography` | text nullable |  |
| `profile_photo_file_id` | uuid nullable |  |
| `status` | text | `draft`, `pending`, `verified`, `rejected`, `archived`. |
| `visibility` | text | Public/member/private policy. |

### 7.2 `researcher_affiliation_history`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `researcher_profile_id` | uuid |  |
| `institute_id` | uuid nullable |  |
| `department_id` | uuid nullable |  |
| `designation` | text nullable |  |
| `effective_start` | date |  |
| `effective_end` | date nullable |  |
| `status` | text | `active`, `ended`, `historical`. |
| `evidence_file_id` | uuid nullable |  |

### 7.3 `external_research_profiles`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `researcher_profile_id` | uuid |  |
| `provider` | text | `orcid`, `scopus`, `wos`, `scholar`, other approved. |
| `external_identifier` | text |  |
| `profile_url` | text | Safe URL. |
| `verification_status` | text | `pending`, `verified`, `rejected`. |

## 8. Publications

### 8.1 `publications`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Canonical publication ID. |
| `title` | text |  |
| `title_normalized` | text | Search/duplicate matching. |
| `abstract` | text nullable | Rights-aware. |
| `publication_type` | text | Journal article, conference, book chapter, etc. |
| `publication_date` | date nullable |  |
| `publication_year` | integer | Derived/validated. |
| `venue` | text nullable | Journal/conference. |
| `publisher` | text nullable |  |
| `volume` | text nullable |  |
| `issue` | text nullable |  |
| `pages` | text nullable |  |
| `doi_normalized` | text nullable | Unique where non-null and verified. |
| `other_identifiers_json` | jsonb |  |
| `publication_url` | text nullable | Safe URL. |
| `keywords_json` | jsonb |  |
| `canonical_status` | text | `draft`, `candidate`, `canonical`, `duplicate`, `archived`. |
| `visibility` | text | Resource-level default. |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

### 8.2 `publication_authors`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `publication_id` | uuid |  |
| `author_position` | integer | Ordered list. |
| `published_name` | text | Exact name as published. |
| `researcher_profile_id` | uuid nullable | Resolved profile. |
| `external_author_id` | text nullable |  |
| `is_corresponding` | boolean |  |

Unique index: `(publication_id, author_position)`.

### 8.3 `publication_affiliations`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `publication_author_id` | uuid |  |
| `exact_affiliation_text` | text | Preserve source text. |
| `normalized_affiliation` | text | Matching/alias aid. |
| `institute_id` | uuid nullable |  |
| `department_id` | uuid nullable |  |
| `verification_status` | text | `pending`, `verified`, `rejected`. |
| `evidence_file_id` | uuid nullable |  |

### 8.4 `university_publication_associations`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid | Controlling university. |
| `publication_id` | uuid | Canonical publication. |
| `eligibility_status` | text | `pending`, `eligible`, `ineligible`. |
| `verification_status` | text | `pending`, `verified`, `returned`, `rejected`. |
| `lifecycle_status` | text | `draft`, `submitted`, `active`, `withdrawn`, `archived`, `deactivated`. |
| `visibility` | text | University-specific policy. |
| `rights_status` | text | `unknown`, `authorized`, `restricted`, `external_link_only`. |
| `evidence_file_id` | uuid nullable |  |
| `verified_by` | uuid nullable |  |
| `verified_at` | timestamptz nullable |  |
| `decision_reason` | text nullable |  |

Unique index: `(tenant_id, publication_id)`.

### 8.5 `indexing_records`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid nullable | Source may be canonical or university-specific. |
| `publication_id` | uuid |  |
| `source` | text | Scopus, Web of Science, other approved. |
| `identifier` | text nullable |  |
| `indexed_at` | date nullable |  |
| `status` | text | `pending`, `verified`, `rejected`. |
| `evidence_file_id` | uuid nullable |  |

### 8.6 `publication_files`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid | Owning university. |
| `publication_id` | uuid | Canonical publication. |
| `association_id` | uuid nullable | University-specific association. |
| `file_kind` | text | `author_accepted`, `publisher_version`, `repository_copy`, `supplementary`, `evidence`. |
| `storage_object_key` | text | Randomized. |
| `mime_type` | text | Allowlisted. |
| `size_bytes` | bigint |  |
| `visibility` | text |  |
| `rights_status` | text |  |
| `malware_status` | text | `pending`, `clean`, `infected`, `blocked`. |
| `status` | text | `pending`, `active`, `blocked`, `archived`. |

## 9. Patents

### 9.1 `patents`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Canonical patent ID. |
| `title` | text |  |
| `patent_number` | text nullable |  |
| `application_number` | text nullable |  |
| `filing_date` | date nullable |  |
| `publication_date` | date nullable |  |
| `grant_date` | date nullable |  |
| `jurisdiction` | text nullable |  |
| `patent_office` | text nullable |  |
| `status` | text | `published`, `granted`, `pending`, `withdrawn`, `archived`. |
| `abstract` | text nullable | Rights-aware. |
| `official_url` | text nullable | Safe URL. |
| `visibility` | text |  |

Unique indexes for verified patent/application numbers where appropriate.

### 9.2 `patent_inventors`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `patent_id` | uuid |  |
| `inventor_position` | integer |  |
| `published_name` | text |  |
| `researcher_profile_id` | uuid nullable |  |

### 9.3 `university_patent_associations`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `patent_id` | uuid |  |
| `institute_id` | uuid nullable |  |
| `department_id` | uuid nullable |  |
| `eligibility_status` | text |  |
| `verification_status` | text |  |
| `lifecycle_status` | text |  |
| `visibility` | text |  |
| `evidence_file_id` | uuid nullable |  |
| `verified_at` | timestamptz nullable |  |

## 10. Access requests and grants

### 10.1 `access_requests`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid | Controlling university. |
| `requester_account_id` | uuid |  |
| `resource_type` | text | `publication`, `publication_file`, `supplementary`. |
| `resource_id` | uuid | Canonical/object reference. |
| `requested_action` | text | `view_metadata`, `view_abstract`, `view_full_text`, `download`, `export_citation`, `view_supplementary`. |
| `reason` | text |  |
| `intended_use` | text |  |
| `requester_organization` | text nullable |  |
| `status` | text | `draft`, `pending`, `under_review`, `additional_info`, `approved`, `rejected`, `cancelled`, `expired`, `revoked`. |
| `submitted_at` | timestamptz |  |
| `assigned_to` | uuid nullable |  |
| `decision_reason` | text nullable |  |
| `decided_at` | timestamptz nullable |  |

### 10.2 `access_grants`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `request_id` | uuid |  |
| `account_id` | uuid |  |
| `resource_type` | text |  |
| `resource_id` | uuid |  |
| `allowed_action` | text |  |
| `starts_at` | timestamptz |  |
| `expires_at` | timestamptz |  |
| `status` | text | `active`, `expired`, `revoked`. |
| `revoked_at` | timestamptz nullable |  |
| `revoked_by` | uuid nullable |  |

Unique active grant constraint should prevent duplicate grants for the same account/resource/action while active.

## 11. Workflow, operations, and audit

### 11.1 `submissions`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid nullable | Platform cases may be null. |
| `submitter_id` | uuid |  |
| `resource_type` | text | `researcher_profile`, `publication`, `patent`, `organization`. |
| `resource_id` | uuid |  |
| `submission_type` | text | `create`, `update`, `correction`, `claim`. |
| `status` | text | `draft`, `submitted`, `under_review`, `correction_required`, `verified`, `rejected`. |
| `payload_json` | jsonb | Versioned submitted data. |
| `evidence_manifest_json` | jsonb |  |

### 11.2 `verification_records`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `submission_id` | uuid nullable |  |
| `resource_type` | text |  |
| `resource_id` | uuid |  |
| `reviewer_id` | uuid |  |
| `decision` | text | `verified`, `returned`, `rejected`, `escalated`. |
| `reason` | text nullable |  |
| `evidence_file_id` | uuid nullable |  |
| `previous_status` | text |  |
| `resulting_status` | text |  |
| `decided_at` | timestamptz |  |

### 11.3 `correction_appeal_cases`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid nullable |  |
| `reporter_id` | uuid |  |
| `case_type` | text | `metadata`, `profile`, `affiliation`, `rights`, `fraud`, `access`. |
| `resource_type` | text |  |
| `resource_id` | uuid |  |
| `status` | text | `open`, `under_review`, `awaiting_evidence`, `resolved`, `rejected`, `escalated`. |
| `description` | text |  |
| `evidence_manifest_json` | jsonb |  |
| `assigned_to` | uuid nullable |  |
| `resolution` | text nullable |  |

### 11.4 `notifications`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `recipient_account_id` | uuid |  |
| `notification_type` | text |  |
| `title` | text |  |
| `body` | text | No secrets. |
| `related_resource_type` | text nullable |  |
| `related_resource_id` | uuid nullable |  |
| `status` | text | `queued`, `sent`, `failed`, `read`. |
| `created_at` | timestamptz |  |
| `read_at` | timestamptz nullable |  |

### 11.5 `audit_logs`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid nullable | Platform events may be null. |
| `actor_account_id` | uuid nullable | Service actors use a separate actor type. |
| `actor_type` | text | `user`, `service`, `system`. |
| `action` | text | Stable event code. |
| `target_type` | text |  |
| `target_id` | uuid nullable |  |
| `scope_type` | text | `platform`, `university`, `institute`, `department`, `resource`. |
| `scope_id` | uuid nullable |  |
| `timestamp` | timestamptz |  |
| `result` | text | `success`, `denied`, `failed`. |
| `reason` | text nullable |  |
| `request_id` | uuid nullable | Correlation. |
| `previous_json` | jsonb nullable | Redacted previous state. |
| `current_json` | jsonb nullable | Redacted resulting state. |

Audit records should be append-only from application permissions. Use database permissions, partitioning, or an immutable store for tamper resistance according to the approved threat model.

### 11.6 `export_jobs`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid |  |
| `requested_by` | uuid |  |
| `resource_types_json` | jsonb |  |
| `field_selection_json` | jsonb |  |
| `filters_json` | jsonb |  |
| `format` | text |  |
| `status` | text | `queued`, `running`, `succeeded`, `failed`, `cancelled`, `expired`. |
| `storage_object_key` | text nullable |  |
| `download_expires_at` | timestamptz nullable |  |
| `created_at` | timestamptz |  |

### 11.7 `backup_restore_records`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid |  |
| `tenant_id` | uuid nullable | Platform backup may be null. |
| `operation_type` | text | `backup`, `restore`, `validation`. |
| `status` | text | `queued`, `running`, `succeeded`, `failed`, `cancelled`. |
| `backup_ref` | text nullable | Immutable backup reference. |
| `scope_json` | jsonb |  |
| `requested_by` | uuid nullable |  |
| `started_at` | timestamptz nullable |  |
| `completed_at` | timestamptz nullable |  |
| `validation_json` | jsonb |  |

## 12. Indexing strategy

Create indexes for:

- normalized DOI and stable identifiers;
- normalized publication title and venue;
- publication year/type/indexing source;
- university slug and status;
- membership `(tenant_id, account_id, status)`;
- permission assignments `(membership_id, scope_type, scope_id, status)`;
- publication associations `(tenant_id, lifecycle_status, visibility)`;
- access requests `(tenant_id, status, submitted_at)`;
- grants `(account_id, resource_type, resource_id, status, expires_at)`;
- audit `(tenant_id, timestamp)` and `(target_type, target_id, timestamp)`;
- full-text search vectors for public titles, abstracts where rights permit, names, keywords, and patent metadata.

## 13. Constraints and invariants

1. A university must be `verified` before `activated_at` is populated.
2. A membership cannot be `approved` without an approved account/email and an explicit role/permission assignment.
3. A publication association cannot be `active` without verified eligibility.
4. A protected file cannot be `active` unless malware status is `clean` and rights/visibility policy permits exposure.
5. An access grant cannot be active outside its start/expiry window or for a revoked request.
6. A canonical publication may have many university associations, but each tenant/publication pair is unique.
7. A researcher profile claim must link to exactly one approved membership in the relevant tenant.
8. Audit records are not ordinary update targets.
9. Deletion is replaced by lifecycle state unless a documented legal/privacy deletion workflow applies.

## 14. Migration strategy

- Use versioned migrations with forward-only changes where possible.
- Add columns nullable/backfilled before enforcing constraints.
- Test migrations against a production-sized anonymized dataset.
- Maintain rollback/runbook for each release.
- Keep canonical IDs stable across merges and tenant changes.
- Rebuild search indexes after schema or visibility changes.
