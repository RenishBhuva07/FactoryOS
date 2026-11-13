# 05 — Data Dictionary & Metric Definitions

This document defines the initial data concepts. Final schema and constraints belong in migrations and application contracts.

## Common fields

Every tenant-owned record:
- `id`: UUID.
- `tenantId`: tenant boundary.
- `factoryId`: factory/site boundary where relevant.
- `createdAt`, `updatedAt`: UTC timestamps.
- `createdBy`, `updatedBy`: actor IDs where applicable.
- `status`: controlled enum, not free-form text.

For offline-capable events:
- `occurredAt`: when user says the event happened.
- `recordedAt`: server receipt time.
- `clientMutationId`: idempotency identifier.
- `syncStatus`: client-side state only; server stores accepted event state.

## Entities

### Tenant
Business customer account; subscription and isolation boundary.

### Factory
Name, address, timezone, locale, industry template, workweek, active state.

### Membership
User-to-tenant relationship, role, permissions, status.

### Employee
Employee code, display name, department, shift assignment, preferred language, active state. Keep personal data minimal.

### Shift
Name, start/end local time, break rules, applicable days, grace period.

### AttendanceRecord
Employee, date, shift, status, check-in/out timestamps, overtime duration (recorded only), source, correction reason.

Unique policy: one effective attendance record per employee/date/shift unless split shifts are explicitly supported.

### Product
SKU, display name, description, base unit, optional category, active state.

### Customer
Name, contact information, optional billing/delivery metadata.

### SalesOrder
Order number, customer, order date, promised date, status, notes.

### SalesOrderLine
Order, product, quantity, unit, price optional, due date optional.

### WorkOrder / Job
Job number, source order line optional, product, planned quantity, target date, department, assigned supervisor, priority, status.

### ProductionEntry
Job, shift, machine optional, produced quantity, rejected quantity, note, actor, occurredAt, recordedAt, correction/void metadata.

### Machine
Code, name, type, department/work area, active state.

### MachineIssue
Machine, category, severity, description, startedAt, resolvedAt, reportedBy, resolvedBy, status, resolution note.

### InventoryItem
Code, name, category, base unit, reorder threshold, active state.

### InventoryTransaction
Item, type, quantity, unit, reference type/id, location, reason, actor, occurredAt. Immutable after posting; corrections via reversal/adjustment.

### QualityInspection
Job, product, inspected quantity, accepted, rejected, rework, defect category, inspector, timestamp.

### Dispatch
Order, dispatch reference, date, quantity, status, carrier optional.

### DailyReport
Factory, reporting date, generatedAt, metric snapshot, completeness warnings, delivery state.

### AuditEvent
Actor, action, entity type/id, timestamp, reason, before/after diff, request ID.

## Metric definitions

Every dashboard metric must show its definition in product documentation and drill down to source records.

| Metric | Definition | Important caveat |
|---|---|---|
| Gross production | Sum of valid produced quantities for selected period | Do not include voided entries |
| Rejected quantity | Sum of rejected quantity at defined stage | Avoid double counting later QC rejection |
| Accepted production | Quantity accepted under the chosen production/quality definition | Must be consistent across jobs |
| Target achievement | Actual / target × 100 | Specify gross vs accepted actual |
| Pending job quantity | Planned quantity minus accepted quantity | Clamp/flag overproduction; handle rework explicitly |
| Attendance present | Unique scheduled employees with present-equivalent state | Do not count unscheduled employees |
| Absence | Scheduled employees marked absent | Leave and weekly off are separate |
| Open machine issues | Count of unresolved issues | Not equal to machine telemetry |
| Downtime | ResolvedAt minus StartedAt | Open issue duration is ongoing/unknown |
| Stock on hand | Sum of posted inventory ledger movements | Do not allow direct balance edits |
| Low stock | Stock on hand <= configured reorder level | Threshold is customer-defined |
| On-time completion | Jobs completed on/before due date / jobs due in period | Define treatment of cancelled jobs |

## Data quality rules

- Missing values must display as “Not recorded”, not zero.
- Each metric shows its reporting period and last updated time.
- Corrections retain history.
- Unit conversions are explicit and tested.
- Use decimal types for quantities and currency.
- Store timestamps in UTC; report using factory timezone.
- Do not compare quantities with different units.
