# VeriAcademia Design System and UX Direction

**Status:** Proposed baseline  
**Version:** 0.1  
**Date:** 2026-09-21

## 1. Design intent

VeriAcademia should feel like a trustworthy scholarly infrastructure product: calm, evidence-led, precise, and institutional without feeling bureaucratic. The interface should make provenance, status, scope, and next action visible at a glance.

The visual system should communicate:

- **Trust:** verified status, evidence, reviewer identity, and audit history are first-class content.
- **Clarity:** a user always knows whether they are viewing public, member, researcher, university, or platform content.
- **Control:** administrative actions show scope, impact, and required confirmation.
- **Discovery:** search and filters feel fast, readable, and scholarly.
- **Accessibility:** status is never communicated by color alone.

## 2. Product surfaces

### Public discovery

Use generous editorial spacing, strong typographic hierarchy, readable metadata, and restrained institutional accents. The first screen should show a clear search purpose and trusted-university signal rather than a generic hero.

### Member workspace

Use an operational dashboard with concise status chips, queue counts, recent activity, and direct actions. Prioritize “What needs my attention?” and “What can I do next?”

### University administration

Use dense but readable tables, scoped navigation, evidence panels, and explicit permission/scope indicators. Avoid hiding important governance actions inside decorative cards.

### Platform administration

Use an audit-oriented interface with tenant status, risk signals, review queues, and recovery controls. High-risk actions require confirmation, reauthentication, and clear impact text.

## 3. Visual language

### Color palette

A restrained academic palette with a deep blue-green anchor and warm neutral ground:

| Token | Light value | Dark value | Use |
|---|---:|---:|---|
| `--ink` | `#17252b` | `#e8f0ee` | Primary text |
| `--muted-ink` | `#52646a` | `#a8babd` | Secondary text and captions |
| `--paper` | `#f7f9f7` | `#10181a` | Page ground |
| `--surface` | `#ffffff` | `#182426` | Panels and cards |
| `--line` | `#d7e2df` | `#33474a` | Dividers and borders |
| `--brand` | `#0b6172` | `#65c2c9` | Primary actions and trusted signals |
| `--brand-strong` | `#074653` | `#8adbe0` | Hover/focus/active brand |
| `--gold` | `#a66a19` | `#e4b45f` | Evidence, review, and caution accents |
| `--danger` | `#a23b3b` | `#ff9b9b` | Destructive or blocked states |
| `--success` | `#26734d` | `#77d3a0` | Verified/active states |

Semantic status colors must always be paired with text or an icon.

### Typography

- **Display:** `Fraunces` for the product name, major section headings, and trust statements; use sparingly.
- **Body:** `Source Sans 3` for interface copy, forms, tables, and long-form documentation.
- **Data/utility:** `IBM Plex Mono` for identifiers, DOI, status codes, timestamps, and technical metadata.

Fallbacks: `Georgia, serif` for display and `system-ui, sans-serif` for body.

### Shape and texture

- Use 4–8 px radii for operational controls; avoid making every object a rounded card.
- Use hairline rules and subtle surface elevation to separate dense administrative information.
- Use a narrow evidence rail or provenance strip on research detail pages.
- Use small caps labels only for stable section metadata, never for critical action labels.
- Use a subtle paper-grain or grid motif only on the public landing page; keep workspaces quiet.

## 4. Layout system

- Maximum content width: 1200 px for public pages, 1440 px for administration.
- Outer gutter: at least 16 px at every width.
- Public pages: 12-column grid; content and metadata may use 8/4 or 9/3 splits.
- Administration: persistent left navigation on desktop, top bar with tenant selector, scoped queue, and user menu.
- Mobile: navigation becomes a drawer; tables become horizontally scrollable or transform into stacked record summaries where appropriate.
- Use grid/flex gaps rather than ad-hoc margins.
- Keep running text near 65 characters wide.
- Use sticky filters only when they materially improve a long result list.

## 5. Core components

### Navigation

- Global public navigation.
- Authenticated member navigation.
- University-scoped administration navigation.
- Platform administration navigation.
- Breadcrumbs for nested organization and research records.
- Tenant switcher only for users with multiple approved memberships.

### Search

- One prominent search field on public landing and discovery pages.
- Filter drawer or sidebar with active-filter chips.
- Result rows show title, verified affiliation, year, type, indexing status, and visibility label.
- Search result snippets must never include restricted content.

### Status chips

Use consistent labels:

- `Verified`
- `Active`
- `Pending review`
- `Correction required`
- `Rejected`
- `Archived`
- `Suspended`
- `Private`
- `Request required`

Each chip includes a text label and, where useful, a small semantic icon.

### Evidence panel

Research and governance detail pages should expose:

- source/evidence type;
- verifier or reviewer;
- review date;
- confidence/status;
- linked canonical record;
- history or revision link.

### Tables

- Stable column alignment and tabular numerals.
- Visible row selection for bulk actions only when permissions allow.
- Empty, loading, permission-denied, and error states.
- Accessible sort buttons and pagination.
- Avoid hiding critical actions behind hover-only controls.

### Forms

- Group fields by user goal, not database table.
- Show required fields and validation rules before submission.
- Use inline errors linked to fields and an error summary at the top.
- Preserve user input after recoverable validation errors.
- Use progressive disclosure for advanced evidence, rights, and policy fields.
- Confirm destructive or high-impact actions with explicit consequence text.

### dialogs and confirmations

Use dialogs for focused decisions such as invite, deactivate, revoke, merge, export, or restore. Include:

- target name and scope;
- consequence;
- required reason where applicable;
- cancel and primary action;
- keyboard and focus management.

## 6. Page patterns

### University profile

1. Verified status and official identity.
2. Location/type/contact summary.
3. Public research metrics with definitions.
4. Institutes and departments.
5. Researchers, publications, and patents tabs.
6. Trust/evidence link.

### Publication detail

1. Title, authors, affiliations, DOI, venue, year.
2. Visibility and rights status.
3. Abstract and keywords where permitted.
4. Indexing and verification evidence.
5. Files/actions according to current user authorization.
6. University associations and canonical-record provenance.
7. Request-access action for protected resources.

### Verification queue item

1. Submission summary and current state.
2. Required checks checklist.
3. Evidence viewer.
4. Canonical/duplicate suggestions.
5. Decision panel with reason and scope.
6. History/audit trail.

### Access request detail

1. Requester and requested resource.
2. Purpose and intended use.
3. Requested action and duration.
4. Rights/visibility warnings.
5. Prior requests or grants where authorized.
6. Decision panel and audit history.

## 7. Content and voice

- Use direct verbs: “Request access,” “Return for correction,” “Verify affiliation,” “Revoke grant.”
- Explain policy in plain language: “A matching email lets you apply; it does not make you a member.”
- Avoid unexplained acronyms in primary UI; define DOI, ORCID, and indexing terms in help text.
- Use status labels consistently across pages and notifications.
- Give errors a cause and next step: “The DOI format is not recognized. Check the identifier or remove it before submitting.”
- Do not expose internal IDs, tenant IDs, or security details to ordinary users.

## 8. Accessibility requirements

- Proposed target: WCAG 2.2 AA.
- Keyboard-accessible navigation, filters, tables, dialogs, and evidence viewers.
- Visible focus indicators.
- Semantic headings and landmarks.
- Form labels and instructions not conveyed by color alone.
- Charts include data tables or equivalent text summaries.
- Minimum contrast per approved standard.
- Motion is subtle and disabled under `prefers-reduced-motion`.
- Touch targets at least 44 px where practical.
- Mobile layouts must not require horizontal page scrolling; wide tables may scroll in their own container.

## 9. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| ≥ 1024 px | Persistent navigation, multi-column dashboards, full tables. |
| 768–1023 px | Collapsible navigation, two-column content, wrapped filters. |
| < 768 px | Bottom or drawer navigation, stacked record details, single-column forms, scrollable tables. |

## 10. Design deliverables

Before implementation, produce:

1. Public landing and discovery page wireframes.
2. University profile and publication detail wireframes.
3. Member dashboard and researcher profile wireframes.
4. University administration information architecture and queue screens.
5. Platform administration tenant and audit screens.
6. Component library with states and accessibility notes.
7. Content/error-state library.
8. Mobile interaction prototype.
9. High-fidelity themes for light, dark, and system preference.
10. Usability test plan with representative users.

## 11. UX acceptance criteria

- A first-time visitor can understand what is public and how to request protected access.
- A new applicant can complete university or membership onboarding without knowing internal data-model terms.
- A verifier can make a decision without leaving the evidence context.
- An administrator can identify tenant/scope before performing a privileged action.
- A member can distinguish internal access from external access requests.
- All primary flows are usable with keyboard and screen-reader navigation.
- Public and private surfaces are visually distinct without relying on color alone.
