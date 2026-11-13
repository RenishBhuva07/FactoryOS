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

- Owner: command centre, clear KPIs, exceptions and drill-downs.
- Manager: mobile-first workbench, large buttons, short forms.
- Plain language.
- No dense ERP-style dashboard.
- Show “Not reported” when data is missing.
- Use status text and icon in addition to colour.
- Build empty/loading/error/success/offline states.
- Keep all UI copy translation-ready.

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
