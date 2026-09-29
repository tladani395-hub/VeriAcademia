# VeriAcademia Requirements Traceability

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Purpose

This matrix links product objectives to requirements, architecture, data, rules, tests, and delivery phases. It helps prevent important controls from being designed but not implemented or tested.

## 2. Traceability matrix

| Product objective | SRS reference | Architecture/schema | Business rule | Test evidence | Delivery phase |
|---|---|---|---|---|---|
| Verify universities securely | SRS-UNI-001–006 | `universities`, `university_applications`, `audit_logs` | BR-001, BR-011, BR-012 | University activation and duplicate tests | Phase 2 |
| Prevent domain impersonation | SRS-ORG-004–008 | `university_domains`, verification records | BR-004–007 | Domain conflict, expiry, eligibility tests | Phase 2 |
| Require explicit membership | SRS-MEM-001–008 | `university_memberships`, assignments, invitations | BR-002, BR-003, BR-009, BR-010 | Approval-before-access and multi-tenant matrix | Phase 3 |
| Enforce least privilege | SRS-MEM-005–008 | roles, permissions, scoped assignments | BR-008, BR-016 | Role/scope positive and negative tests | Phase 3 |
| Maintain researcher identity separately | SRS-RES-001–006 | `researcher_profiles`, affiliation history | BR-017–020 | Claim, name-change, historical-affiliation tests | Phase 4 |
| Validate publication eligibility | SRS-PUB-001–011 | authors, affiliations, university associations | BR-021–023, BR-030–032 | Eligibility, evidence, rights tests | Phase 4 |
| Prevent duplicate research records | SRS-PUB-002–005 | canonical publications, duplicate workflow | BR-024–029 | DOI/title duplicate and merge preservation tests | Phase 4 |
| Isolate university-specific data | SRS-VIS-001–006 | tenant IDs, associations, RLS | BR-025–026, BR-033–041 | Cross-tenant API/file/search/cache/export tests | Phases 2–7 |
| Control external paper access | SRS-ACC-001–008 | access requests and grants | BR-035–040 | Scope, expiry, revocation, rights tests | Phase 5 |
| Secure protected files | SRS-VIS-005, SRS-PUB-010–011 | publication files and storage adapter | BR-031, BR-032, BR-039 | Direct-object, malware, signed-URL, rights tests | Phase 5 |
| Provide trustworthy search | SRS-SRC-001–004 | search adapter and visibility metadata | BR-033, BR-040 | Search leakage, freshness, filter tests | Phases 1 and 6 |
| Prevent analytics double counting | SRS-ANA-001–004 | canonical associations and aggregates | BR-044–048 | Multi-author/multi-university fixtures | Phase 6 |
| Secure exports | SRS-EXP-001–002 | export jobs and protected storage | BR-049, BR-050 | Scope, field, size, link-expiry tests | Phase 6 |
| Preserve auditability | SRS-OPS-003–005 | append-oriented audit/verification records | BR-053 | Critical-event completeness tests | Phases 2–7 |
| Support backup and recovery | SRS-OPS-006–007 | backup/restore records and operations | BR-051, BR-052 | Isolated restore and disaster-recovery test | Phase 6–7 |
| Protect privacy | SRS non-functional privacy | data classification, response shaping, retention | BR-054–056 | Privacy leakage and retention tests | All phases |
| Meet accessibility goals | SRS 5.4 | semantic frontend and design system | UX acceptance criteria | Keyboard/screen-reader/contrast tests | Phases 1–7 |
| Scale safely | SRS 5.2–5.3 | queue, indexes, aggregates, observability | Operational rules | Load, queue, dependency-failure tests | Phases 1, 6–7 |

## 3. High-risk control traceability

| Control | Prevent | Implement in | Verify by | Release gate |
|---|---|---|---|---|
| Tenant predicate/RLS | Cross-tenant database reads/writes | Database access and migrations | Tenant-isolation matrix | Phase 2 and every later phase |
| Object authorization | ID-based file/record bypass | Authorization service and domain modules | Negative API/file tests | Phase 3 onward |
| Visibility shaping | Private fields/snippets in responses | API response builders and search | Leakage tests | Phase 1 onward |
| MFA/reauthentication | Privileged account misuse | Identity and admin workflows | Session/MFA tests | Phase 2 onward |
| File quarantine/scanning | Malware distribution | Upload worker and storage | Malware/type/size tests | Phase 5 |
| Rights status | Unauthorized full-text distribution | Publication/file/access modules | Rights decision tests | Phase 5 |
| Grant scope/expiry | Over-broad or stale access | Access module | Scope/expiry/revocation tests | Phase 5 |
| Canonical merge history | Loss of provenance | Publication module | Merge regression fixtures | Phase 4 |
| Audit append controls | Undetectable privileged changes | Audit schema/database permissions | Completeness/tamper tests | Phase 2 onward |
| Export validation | Cross-tenant data leakage | Export worker | Malicious payload tests | Phase 6 |
| Restore scope checks | Cross-tenant corruption | Operations module | Isolated restore exercise | Phase 7 |
| Cache namespace/invalidation | Stale private data | Cache layer | Cross-user/tenant cache tests | Every protected feature |

## 4. Acceptance evidence checklist

### Product

- [ ] MVP scope and open decisions approved.
- [ ] Representative user journeys demonstrated.
- [ ] Public/private content distinction validated.
- [ ] Pilot success metrics agreed.

### Engineering

- [ ] Architecture and stack approved.
- [ ] Database migrations reviewed.
- [ ] API contract generated and reviewed.
- [ ] Background-job contracts reviewed.
- [ ] Observability dashboards and alerts active.

### Security and privacy

- [ ] Threat model approved.
- [ ] Tenant-isolation matrix passed.
- [ ] Protected-file bypass tests passed.
- [ ] Search/cache/export leakage tests passed.
- [ ] MFA, session, and reauthentication tests passed.
- [ ] Privacy/retention review completed.

### Quality and operations

- [ ] Critical end-to-end journeys passed.
- [ ] Accessibility review completed.
- [ ] Load test meets approved targets.
- [ ] Backup/restore exercise passed.
- [ ] Runbooks and rollback plan approved.
- [ ] Pilot support and training completed.

## 5. Change impact process

When a requirement changes:

1. Update the PRD/SRS source requirement.
2. Identify affected business rules and state machines.
3. Update schema/API/architecture documents if needed.
4. Add or modify automated/manual tests.
5. Update the implementation backlog and decision log.
6. Re-run high-risk security and regression tests.
7. Record approval and release version.

No requirement should exist only in a ticket without a corresponding rule, implementation boundary, and verification method.
