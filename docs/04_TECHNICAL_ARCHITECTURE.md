# 04 — Technical Architecture

## 1. Recommended architecture

Use a **modular monolith** for the first product version.

Suggested stack:
- Frontend: Next.js + React + TypeScript.
- Styling: Tailwind CSS with a documented design token system.
- UI components: accessible component primitives; avoid excessive custom controls.
- Backend: Node.js + TypeScript REST API (NestJS or a well-structured Express/Fastify application).
- Database: PostgreSQL.
- ORM: Prisma.
- Background jobs: Redis + BullMQ when scheduled reports/notifications require durable queues.
- File storage: S3-compatible object storage.
- Authentication: secure server-managed sessions or a well-reviewed identity provider.
- PWA: service worker and IndexedDB for explicitly supported offline actions.
- Testing: Vitest/Jest, API integration tests, Playwright end-to-end tests.
- Monitoring: structured logs, error tracking, uptime and queue monitoring.

Do not split into microservices until independent scaling or team ownership justifies it.

## 2. High-level modules

- Identity & Access
- Tenant / Factory Configuration
- Employees
- Shifts & Attendance
- Customers & Products
- Orders & Jobs
- Production
- Machine Issues
- Inventory
- Quality
- Dispatch
- Reports & Notifications
- Audit
- Subscription & Billing (later)

Each module owns its business rules and exposes application services. Avoid direct cross-module database writes from UI code.

## 3. Multi-tenancy

Every business record must include `tenantId` (and factory/site ID where multi-site is supported).

Requirements:
- Resolve tenant from authenticated membership, never trust a tenant ID supplied by client as authorization.
- Enforce tenant scope in repository/service layer.
- Consider PostgreSQL row-level security as defense in depth.
- Unique constraints include tenant scope where appropriate.
- Background jobs carry tenant ID and revalidate access/configuration.
- Automated tests attempt cross-tenant reads, updates, exports, and object access.

## 4. API conventions

- Version prefix: `/api/v1`.
- JSON request/response.
- Consistent error envelope with code, message, field errors, request ID.
- Cursor or page-based pagination.
- Filtering/sorting allowlists.
- Idempotency keys for offline queue and critical create operations.
- Server-side validation (Zod or equivalent).
- Never expose ORM entities directly; use DTOs.
- Avoid returning sensitive fields by default.

Example endpoints:
- `POST /api/v1/factories`
- `GET /api/v1/dashboard/summary?date=YYYY-MM-DD`
- `GET /api/v1/employees`
- `POST /api/v1/attendance/bulk`
- `GET /api/v1/jobs?status=in_progress`
- `POST /api/v1/jobs`
- `POST /api/v1/production-entries`
- `POST /api/v1/machine-issues`
- `GET /api/v1/reports/daily/:date`

## 5. Data model (conceptual)

Core:
- User
- Tenant
- Factory
- Membership
- Role / Permission
- Department
- Shift
- Employee
- AttendanceRecord
- Customer
- Product
- SalesOrder
- SalesOrderLine
- WorkOrder / Job
- ProductionEntry
- Machine
- MachineIssue
- InventoryItem
- InventoryTransaction
- QualityInspection
- Defect
- Dispatch
- DailyReport
- Notification
- AuditEvent
- Attachment

Use immutable ledger records for inventory movements and audit history. Store both `createdAt` and `updatedAt`; operational events also need `occurredAt` and `recordedAt` where delayed/offline entry matters.

## 6. Key business calculations

Production:
- `grossProduced = sum(valid production entries producedQty)`
- `rejected = sum(valid rejectedQty)`
- `accepted = grossProduced - rejected` only if rejection is recorded at the same production stage and no rework/inspection nuance applies. Otherwise derive accepted quantity from quality disposition.
- `remaining = plannedQty - acceptedQty` (define whether rework counts separately).
- Target achievement = actual metric / target metric. Document whether actual means gross or accepted output.

Attendance:
- Present count is a count of unique employees in the selected shift/date with a present-equivalent status.
- Do not count absent, leave, weekly off, or holiday as present.
- “Expected” excludes employees not scheduled for that shift.

Downtime:
- `downtimeMinutes = resolvedAt - startedAt` with timezone-safe timestamp handling.
- Open issues have no final downtime duration.

Inventory:
- Stock balance = sum(receipts + returns + positive adjustments + transfers in) minus sum(issues + consumption + negative adjustments + transfers out).
- Use decimal precision appropriate to units; do not use floating point for quantities or money.

## 7. Offline architecture

Offline support must be deliberately scoped. Do not pretend the entire app works offline.

Initial offline-capable actions:
- Draft production entry.
- Draft issue report.
- Possibly attendance batch if customer pilot confirms need.

Use IndexedDB:
- Store pending mutation with UUID/idempotency key, actor, tenant, schema version, client timestamp, payload.
- Show “Waiting to sync”, “Syncing”, “Synced”, and “Needs attention”.
- Retry with backoff.
- Do not silently discard failed records.
- Server validates permissions and business rules again.
- Conflicts require user resolution; do not blindly last-write-wins for production/attendance.

## 8. Background jobs

Use durable queue for:
- Daily report generation.
- Notification delivery.
- Retry handling.
- CSV export generation.
- Scheduled reminders.

Jobs must be idempotent and tenant-scoped. Store delivery attempts and final status.

## 9. Security baseline

- TLS in transit.
- Managed encryption at rest.
- Strong password policy or trusted identity provider.
- Secure, HttpOnly, SameSite cookies for session auth.
- CSRF protection where applicable.
- Rate limiting on authentication and sensitive endpoints.
- Authorization checks on every API request.
- Input validation and output encoding.
- File type/size validation and malware scanning where practical.
- Secrets in environment/secret manager, never source control.
- Audit logs for sensitive actions.
- Database backups and restore tests.
- Least-privilege service credentials.
- No sensitive data in analytics or logs.

## 10. Reliability and observability

- Health/readiness endpoints.
- Structured logs with request ID and tenant-safe metadata.
- Error monitoring.
- Queue depth and failed-job alerts.
- Database connection and slow-query monitoring.
- Backup success alerts.
- Defined RPO/RTO after hosting selection.
- Restore drill before production launch.

## 11. Suggested repository structure

```text
factoryos/
  apps/
    web/
      src/
        app/
        components/
        features/
        hooks/
        lib/
        styles/
    api/
      src/
        modules/
          auth/
          tenants/
          factories/
          employees/
          attendance/
          orders/
          jobs/
          production/
          machines/
          inventory/
          quality/
          dispatch/
          reports/
          notifications/
          audit/
        common/
        config/
        database/
  packages/
    contracts/
    validation/
    ui/
    config/
  prisma/
    schema.prisma
    migrations/
    seed.ts
  docs/
  tests/
  .env.example
  README.md
```

## 12. Engineering rules

- TypeScript strict mode.
- No `any` unless justified and isolated.
- Keep domain calculations in tested services, not React components.
- Use shared schemas/contracts between client and server where practical.
- Add migration for every schema change.
- Never edit production data directly to fix a bug without an audited migration.
- Unit tests for calculations and permissions.
- Integration tests for tenant isolation.
- E2E tests for critical workflows.
- Keep demo fixtures separate from production data.
