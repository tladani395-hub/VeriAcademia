# VeriAcademia Decision Log

**Status:** Working register  
**Version:** 0.1  
**Date:** 2026-09-21

## How to use this register

Each open decision needs an accountable owner, a decision date, supporting evidence, and affected documents. Until it is resolved, implementation must use the safe default in the final column.

## Decision register

| ID | Decision | Owner | Priority | Options | Safe default until approved | Affected documents |
|---|---|---|---|---|---|---|
| D-001 | Which countries and university types are supported initially? | Product | High | One country/pilot group; multiple countries; global from launch | Limit pilot scope and avoid jurisdiction-specific claims. | PRD, SRS, implementation plan |
| D-002 | What evidence verifies a university? | Product + security | High | Government/accreditation record; official-domain challenge; representative attestation; combined evidence | Require multiple evidence types and manual platform approval. | PRD, SRS, app flow |
| D-003 | Which domain-verification methods are in MVP? | Technical + operations | High | Institutional email; DNS; documents; manual approval | Support manual review plus one automated method after provider review. | SRS, schema, implementation plan |
| D-004 | Can an institute be affiliated with multiple universities? | Product + legal | Medium | Yes; no; only with platform approval | Disallow multiple active affiliations until policy is approved. | PRD, schema, rules |
| D-005 | Who may create an institute, and how are duplicates resolved? | Product | Medium | University only; platform mediated; both with review | University proposes; platform/university reviewer verifies. | SRS, app flow |
| D-006 | What membership evidence is required? | Product + university reps | High | Institutional email only; ID/employment evidence; departmental confirmation | Require administrator approval and collect minimal evidence. | PRD, SRS, privacy |
| D-007 | Are domain-policy exceptions allowed? | Product + governance | High | No exceptions; owner-approved exception; platform-approved exception | No exception workflow in MVP. | PRD, rules, app flow |
| D-008 | Can administrators be invited from outside configured domains? | Governance | High | Never; university-owner exception; platform exception | No; invitation email must satisfy domain policy. | PRD, SRS, rules |
| D-009 | Which research resources are available to every approved member? | Product + legal | High | Metadata/abstract; full text; configured by university | Active metadata and abstract only; files require resource policy/grant. | PRD, visibility, access flow |
| D-010 | Which exceptions can restrict internal members? | Legal + product | High | Legal hold; privacy; embargo; investigation; rights restriction | All listed restrictions override internal access. | SRS, rules, security |
| D-011 | Who approves external paper requests? | Product + governance | High | University admin; delegated approver; author; configurable | University administrator or explicitly delegated access approver. | PRD, app flow, API |
| D-012 | What is the default access-grant duration? | Product | Medium | 7, 30, 90 days; custom | 30 days, with approver-controlled shorter duration. | PRD, schema, rules |
| D-013 | Are protected documents view-only by default? | Product + legal | High | View only; download allowed; rights-dependent | View only; download requires separate permission and confirmed rights. | PRD, security, app flow |
| D-014 | Is watermarking required? | Legal + product | Medium | Never; downloads only; view and download; configurable | No watermark in MVP; authorization and audit remain mandatory. | PRD, design, security |
| D-015 | What file formats and maximum sizes are supported? | Technical + legal | High | PDF-only MVP; PDF plus common office files; broad allowlist | PDF only for full text; small image/PDF for evidence, with conservative limits. | SRS, schema, testing |
| D-016 | Which publication version may be hosted? | Legal + research ops | High | Author-accepted manuscript; publisher version; repository copy; external link only | External link or author-accepted manuscript only after rights confirmation. | PRD, rules, security |
| D-017 | Which indexing sources are authoritative? | Research ops | Medium | Scopus; Web of Science; both; approved registry | Treat claims as evidence pending verifier approval; do not auto-trust. | PRD, SRS, analytics |
| D-018 | How is external metadata obtained? | Product + technical | Medium | Manual; approved API import; hybrid | Manual entry in MVP behind an adapter boundary. | PRD, architecture, implementation plan |
| D-019 | How are canonical metadata conflicts resolved? | Governance | High | Evidence review; owning-university proposal; platform decision; voting | Evidence-based platform review; no last-write-wins. | PRD, architecture, rules |
| D-020 | What are official analytics counting rules? | Research ops + product | High | Association-level; fractional; first-author; configurable | Count canonical publication once globally and once per eligible university. | PRD, SRS, testing |
| D-021 | Which export formats are required? | Product + operations | Medium | CSV; Excel; JSON; PDF report | CSV and JSON for structured data; PDF later. | PRD, SRS, API |
| D-022 | What backup frequency, retention, RPO, and RTO apply? | Operations + security | High | Daily/hourly; 30–90 day retention; defined RPO/RTO | Daily encrypted backups, 30-day working retention, restore test before pilot; finalize numerically. | PRD, architecture, testing |
| D-023 | Which notification channels are required? | Product + operations | Medium | Email; in-app; both; SMS later | Email plus in-app for workflow and security events. | PRD, SRS, implementation plan |
| D-024 | What retention applies to rejected applications, requests, and audit logs? | Legal/privacy | High | Fixed periods by record class; legal-hold override | Minimize rejected-application data; retain critical audit events per approved policy. | SRS, security, schema |
| D-025 | Which accessibility and privacy standards apply? | Legal + design | High | WCAG 2.1/2.2 AA; regional privacy law; institutional policy | WCAG 2.2 AA proposed; privacy review before pilot. | SRS, design, security |
| D-026 | What initial and three-year scale must be supported? | Product + technical | High | Pilot; regional; national; international targets | Design for horizontal growth; load-test a synthetic pilot-scale dataset first. | SRS, architecture, implementation plan |
| D-027 | Is institutional SSO required later? | Product + technical | Low | OIDC; SAML; both; not planned | Keep identity-provider adapter boundary; do not implement in MVP. | PRD, tech stack |
| D-028 | Is public metadata visible by default? | Product + legal | High | Opt-in per university; public by default; record-level choice | Opt-in/verified public policy; protected fields/files remain non-public. | PRD, sitemap, rules |
| D-029 | What is the final technology stack? | Technical lead | High | Proposed TypeScript/PostgreSQL baseline or approved alternative | Use modular architecture and enforce all security/tenancy requirements regardless of stack. | Tech stack, architecture, TRD |
| D-030 | What public label is used for the highest university role? | Product | Low | University Owner; Primary Administrator; Institutional Administrator | Use “Primary Administrator” in working UI until approved. | Glossary, design, sitemap |

## Decision record template

```markdown
### D-NNN — Short title

- **Status:** Proposed / Approved / Rejected / Superseded
- **Owner:**
- **Decision date:**
- **Context:**
- **Options considered:**
- **Decision:**
- **Rationale:**
- **Consequences:**
- **Affected documents:**
- **Implementation action:**
- **Review date:**
```

## Approval rules

- Product decisions require the product owner and affected operational owner.
- Security, privacy, retention, and rights decisions require the relevant specialist review.
- Architecture and stack decisions require the technical lead and operations review.
- A decision is not final until affected documents and implementation backlog are updated.
- Superseded decisions remain in history with a link to the replacement.
