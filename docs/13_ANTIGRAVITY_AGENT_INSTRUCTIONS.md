# 13 — Antigravity Agent Instructions

You are the senior product engineer responsible for implementing FactoryOS from this blueprint.

## 1. First task: inspect and plan

Before changing code:
1. Inspect the entire repository.
2. Identify existing framework, dependencies, routes, conventions and design tokens.
3. Read all FactoryOS blueprint files.
4. Identify reusable components and existing patterns.
5. Produce a phased implementation plan with file-level changes.
6. List ambiguities and risks.
7. Do not start implementation until the plan is reviewed.

Do not overwrite existing project architecture without explaining why.

## 2. Engineering principles

- TypeScript strict mode.
- Small, focused modules.
- Clear domain/service boundaries.
- Schema validation at API boundaries.
- Server-side authorisation on every protected operation.
- Tenant isolation is mandatory.
- No business logic inside presentation components.
- Reuse design tokens and shared components.
- Accessible forms and keyboard support.
- Responsive mobile-first manager experience.
- Avoid premature microservices.
- Never hard-code secrets, plan prices or role privileges in the client.

## 3. Product priorities

Implement in this order:
1. Public website and pricing.
2. Owner authentication.
3. Business tenant creation.
4. Subscription and checkout state machine.
5. Manager invitation and role-aware login.
6. Owner and Manager dashboards.
7. Orders and production entries.
8. Daily Factory Pulse.
9. Machine log and inventory.
10. Attendance, quality and dispatch.

Do not implement all modules in one giant change.

## 4. Mandatory security rules

- Resolve tenant membership on the server.
- Never trust business_id, role or permissions from local storage.
- Verify payment provider webhooks.
- Use idempotency for payment and production creation.
- Validate and sanitise inputs.
- Rate-limit auth and invitation endpoints.
- Protect against CSRF where cookie sessions are used.
- Do not store plaintext passwords or permanent invite secrets.
- Audit sensitive edits.
- Do not expose raw errors to users.

## 5. UI rules

- **LOCKED DESIGN REFERENCE MANDATE (Zero Changes to src/design-reference Without Explicit Permission):**
  - The dedicated benchmark archive `src/design-reference/`, along with its foundational benchmark components, is **STRICTLY LOCKED**.
  - **No Changes Without Permission:** You MUST NOT make any changes, edits, refactoring, re-styling, or restructuring to `src/design-reference/**` without explicit, prior user approval.
  - **Single Source of Truth:** This whole Dashboard UI serves as the permanent gold standard, visual blueprint, and single source of truth for designing all future UI components and screens of FactoryOS.
  - **Strict Pattern Inheritance:** All future modules (Inventory, Production, Orders, Supervisor Mobile, Quality, Settings) must faithfully mirror the exact visual standards, spatial rhythm (14px / `gap-3.5`), 60-30-10 color balance, tabular numbers (`tabular-nums`), pill navigation, stationary coordinate-locked sidebar, and clean card perimeters established in this reference, but must be implemented in their own separate modular directories without modifying the locked reference.
- **Mandatory Design Benchmark:** Strictly follow the FactoryOS Benchmark Design System (`docs/06_UX_CONTENT_AND_DESIGN_SYSTEM.md`), canonically implemented in `src/design-reference/` and `src/pages/dashboard/DashboardPage.tsx`:
  - Soft neutral canvas (`#F8FAFA` / `#F5F7F8`), floating app shell, pure white elevated cards (`#FFFFFF`, `rounded-2xl`, `border border-[#EBF1F5]`).
  - **Core 3 Brand Colors (60-30-10 Ratio):** Midnight Navy (`#002941`, 60%), Pale Mint (`#CFE8E1`, 30%), and Coral Orange (`#FD6E6E`, 10–15%). All extended scales are derived from these 3 anchors, defined in `src/colors.tsx` and `src/constants/colors.ts`.
  - **The 4-Card Archetype System:** Hero Command Card (Navy gradient), Subtle Coral Attention/Expense Card, Subtle Mint Freshness Card, and Standard Pure White Elevation Card.
  - **Common Separate Reusable Components:** All UI elements must be built as standalone, reusable components in `src/components/common/`. Never write monolithic or duplicated one-off UI blocks.
  - Pill everywhere for interactive elements (`rounded-full` for all buttons, tabs, search inputs, tags, and micro-badges).
  - Floating top segmented pill navigation and collapsible in-flow left dock rail (`72px` $\leftrightarrow$ `256px` with stationary icon coordinate lock at $X = 36\text{px}$, in-flow flex layout push, brand capsule badge wrapper, and canonical `menu_open`/`dock_to_left` drawer controls; `hidden md:flex` on mobile).
  - Two-tone stacked rounded bar charts, hero gradient metric cards, and modern data tables with rounded checkboxes (`w-4 h-4 rounded-[4px]`) and status dots.
  - Clean contained card boundaries: zero protruding edge chevrons or floating boundary widgets.
  - Soft diffused ambient drop shadows (`box-shadow: 0 4px 20px -2px rgba(0, 41, 65, 0.04)`), zero harsh dark borders.
  - Consistent **14px (`gap-3.5` / `space-y-3.5`)** layout rhythm across all grids and card stacks.
  - Brand name across all screens, layouts, and copy is strictly **FactoryOS**.
- **Universal Mobile Browser Responsiveness:**
  - Every screen must open and function flawlessly in mobile phone and tablet browsers (down to 360px width) without horizontal page breaks.
  - Layouts must stack to single-column on mobile (`grid-cols-1 lg:grid-cols-12`).
  - High-frequency touch actions must use large pill buttons with minimum 44px–48px touch targets.
  - Data tables must be wrapped in safe horizontal overflow containers (`overflow-x-auto`).
- **Attachment Interpretation Rule:** Any future user-attached example screens, wireframes, or Stitch mockups serve **EXCLUSIVELY TO DEFINE CONTENT, DATA FIELDS, AND WORKFLOW REQUIREMENTS**. Never copy dated, clunky, or unstyled visuals from reference attachments; always translate their content into this benchmark production design system.
- Owner: command centre, clear KPIs, exceptions and drill-downs.
- Manager: mobile-first workbench, large full-width pill buttons, short forms.
- Plain language.
- No dense ERP-style dashboard.
- Show “Not recorded” when data is missing.
- Mandatory `tabular-nums` for all numbers, currency figures, and metrics.
- Use status text and icon in addition to colour (`StatusDotBadge`).
- Build empty/loading/error/success/offline states.
- Keep all UI copy translation-ready (20–30% text growth tolerance for Gujarati/Hindi).

## 6. Data rules

- PostgreSQL.
- UUID IDs.
- Tenant ID on all tenant-owned records.
- Decimal quantities.
- Explicit unit codes.
- UTC timestamps plus business-local reporting dates.
- Derived totals recalculable from source events.
- Audit corrections.
- Database migrations must be reviewed.

## 7. Testing requirements

For every feature:
- Unit tests for domain calculations.
- API tests for permissions and validation.
- Cross-tenant access tests.
- UI tests for primary workflow where practical.
- Responsive checks.
- Error/empty/loading state checks.

Do not claim a feature is complete until tests and typecheck/build pass.

## 8. Work protocol

For each phase:
1. Explain objective and scope.
2. List files to create/change.
3. State assumptions.
4. Implement one coherent slice.
5. Run lint, typecheck and tests.
6. Report changed files and results.
7. Identify remaining issues.
8. Wait for review before moving to the next major phase.

Never invent API keys, provider credentials, legal requirements or production customer data.

## 9. Definition of done

A feature is done only when:
- UX matches the product blueprint.
- Role permissions are enforced server-side.
- Tenant isolation is tested.
- Loading/error/empty states exist.
- Mobile and desktop behaviour are checked.
- Tests pass.
- Documentation is updated.
