# 07 — Roadmap, Delivery Plan & Validation

## Phase 0 — Discovery (2 weeks)

Deliverables:
- 15–20 interviews.
- 3–5 factory floor observations.
- Workflow maps for target vertical.
- Existing forms/registers sample set (with permission and sensitive details removed).
- Competitor review.
- Pilot commitments.

Exit criteria:
- One repeatable workflow confirmed across at least three target factories.
- Named buyer and daily user identified.
- Pilot owner agrees to provide weekly feedback and baseline measures.

## Phase 1 — Product definition and design (2 weeks)

Deliverables:
- Signed-off MVP PRD.
- Role/permission matrix.
- Core workflow diagrams.
- Stitch designs for desktop owner and mobile supervisor.
- Usability test with 5–8 target users.
- Clickable prototype.

Exit criteria:
- Users can complete production entry and attendance without facilitator intervention.
- Owner can interpret dashboard without explanation.
- Gujarati/Hindi language strategy agreed.

## Phase 2 — Foundation (2–3 weeks)

Build:
- Authentication and tenant model.
- Factory onboarding.
- Roles and permissions.
- Departments and shifts.
- Employee directory.
- Audit foundation.
- CI/CD, logging, monitoring, backups.

Exit criteria:
- Tenant isolation tests pass.
- Setup can be completed with seeded demo data.
- No critical authorization issue.

## Phase 3 — MVP operations (3–5 weeks)

Build:
- Customers/products.
- Orders/jobs.
- Production entries.
- Attendance.
- Owner dashboard.
- Daily report.
- Export and audit views.

Exit criteria:
- End-to-end workflow tested in staging.
- Data calculations verified against hand-calculated fixtures.
- Supervisor production entry under 30 seconds in usability test.

## Phase 4 — Pilot hardening (2–4 weeks)

Build/refine:
- Offline drafts for selected actions.
- Sync status and conflict handling.
- Better empty/error states.
- Onboarding assistance.
- Report scheduling and delivery retries.
- Performance and security testing.

Exit criteria:
- Three pilot factories using the product.
- Daily usage data available.
- Critical workflow completion measured.

## Phase 5 — P1 expansion (after pilot)

Prioritize based on observed demand:
- Machine issues/maintenance.
- Inventory ledger.
- Quality and rejection.
- Dispatch.
- WhatsApp notifications.
- Accounting export/integration.

Do not build all P1 modules before seeing actual usage.

## Phase 6 — Scale and vertical expansion

- Industry templates.
- Multi-factory dashboard.
- Advanced analytics.
- AI-assisted voice entry.
- Partner onboarding network.
- Integrations and configurable workflows.

## Prioritization framework

Score each feature:
- Frequency of problem (1–5)
- Cost/impact of problem (1–5)
- Number of pilot customers affected (1–5)
- Ease of implementation (1–5)
- Risk/compliance complexity (1–5, reverse score)

Build high-impact, frequent, low-complexity workflows first.

## Pilot measurement

Capture baseline before rollout:
- Time spent preparing daily report.
- Number of missing production entries.
- Time to answer order status.
- Attendance correction frequency.
- Number and duration of untracked stoppages.
- Stock discrepancy frequency if stock is in pilot scope.

Compare after 2–4 weeks. Avoid claiming productivity improvements without measured before/after data.

## Go / no-go gates

Proceed to paid launch only if:
- At least two pilot customers agree to pay.
- Supervisors use it without daily founder intervention.
- Owners use the daily report.
- Data quality is sufficient for trustworthy metrics.
- Support and onboarding effort is commercially sustainable.
- No unresolved critical security or tenant-isolation issues.
