# 09 — Antigravity Build Instructions

You are the senior product engineer implementing FactoryOS. Read all files in `/docs` and `/stitch` before coding. Treat `02_PRODUCT_REQUIREMENTS.md` as the product scope source of truth.

## Required working method

1. Inspect the existing repository before making changes.
2. Report the current stack, structure, conventions, and gaps.
3. Produce an implementation plan with milestones and file-level changes.
4. Do not start coding until the plan is reviewed if the user requests a plan-first workflow.
5. Implement one vertical slice at a time.
6. Keep UI, domain logic, persistence, and API concerns separated.
7. Use TypeScript strict mode and explicit types.
8. Add tests alongside business logic.
9. Do not invent product requirements where documents are silent; list assumptions.
10. Do not claim completion unless tests/builds have actually passed.

## Product constraints

- Target non-technical factory owners and supervisors.
- Plain language; avoid ERP jargon.
- Mobile-first for supervisor actions, desktop-first for owner overview.
- English, Gujarati, Hindi-ready architecture.
- Accessible and responsive.
- No machine control, PLC, SCADA, facial recognition, or employee GPS tracking.
- No AI auto-writing production or attendance records without user review.
- Missing data must not be displayed as zero.
- Tenant isolation is mandatory.

## Engineering constraints

- Use modular monolith architecture.
- All API requests must authenticate and authorize tenant membership.
- Enforce permissions server-side.
- Validate all input on the server.
- Use database migrations.
- Use idempotency for retryable/offline mutations.
- Keep audit history for corrections and sensitive actions.
- Use UTC timestamps and factory-local reporting.
- Do not put secrets in source control.
- No `any` unless documented and isolated.
- No direct database calls from UI components.
- No business calculations embedded in presentation components.

## First implementation milestone

Build only:
1. App shell and responsive navigation.
2. Authentication scaffolding.
3. Tenant/factory model.
4. User membership and roles.
5. Factory onboarding.
6. Employee directory.
7. Shift configuration.
8. Seeded demo tenant and demo data.

Before proceeding, demonstrate:
- Owner onboarding.
- Adding supervisor.
- Adding employees.
- Mobile supervisor navigation.
- Tenant isolation tests.
- Build and test results.

## Subsequent vertical slices

Slice A: attendance end-to-end.  
Slice B: customers/products/orders/jobs.  
Slice C: production entry and dashboard.  
Slice D: Factory Pulse report.  
Slice E: machine issue tracking.  
Slice F: inventory ledger.  
Slice G: quality and dispatch.

For every slice include:
- User story.
- API contract.
- Schema/migration.
- Permission matrix.
- Loading/empty/error states.
- Unit/integration/E2E tests.
- Accessibility and responsive checks.
- Documentation update.

## Design implementation

- Strictly follow the FactoryOS Benchmark Design System (`docs/06_UX_CONTENT_AND_DESIGN_SYSTEM.md`), canonically implemented in `src/pages/dashboard/DashboardPage.tsx`.
- **Core 3 Brand Colors Mandate:** Adhere strictly to Midnight Navy (`#002941`, 60%), Pale Mint (`#CFE8E1`, 30%), and Coral Orange (`#FD6E6E`, 10–15%).
- **Common Separate Reusable Components:** Build all interfaces out of shared components in `src/components/common/` (`Card`, `PillButton`, `SegmentedPillNav`, `FloatingIconDock`, `StatusDotBadge`, `KpiMetricCard`, `DataTable`, `PillInput`, `PillProgressBar`). Never write monolithic or duplicated UI blocks.
- **Universal Mobile Browser Responsiveness:** Every screen must be verified in mobile phone/tablet browsers (360px+ viewport) with no horizontal overflow, touch targets >= 44px–48px, and responsive card stacking.
- **Attachment Interpretation Rule:** Any provided Stitch reference screens, wireframes, or example mockups serve **STRICTLY TO DEFINE CONTENT, DATA FIELDS, AND FEATURE WORKFLOWS**. Visual styling, card architecture, floating pill navigation, buttons, spacing (14px rhythm), and shadows must always follow the approved FactoryOS Benchmark Design System. Do not copy dated, clunky, or unstyled visuals from reference attachments. Do not invent a different visual style on each screen.

## Definition of done

A feature is done only when:
- Acceptance criteria pass.
- Server-side authorization is tested.
- Tenant isolation is tested.
- Error/empty/loading states exist.
- Mobile and desktop behavior works.
- Accessibility basics pass.
- Tests and build pass.
- Documentation is updated.
