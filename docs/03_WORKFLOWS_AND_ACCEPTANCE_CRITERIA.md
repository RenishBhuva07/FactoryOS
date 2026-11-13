# 03 — Workflows & Acceptance Criteria

## A. First-time factory setup

1. Owner creates account.
2. Owner creates factory profile and selects industry template (start with engineering components).
3. Owner sets language, timezone, working days, shifts.
4. Owner adds departments/work areas.
5. Owner invites supervisor.
6. Owner optionally imports employees and products.
7. Guided checklist shows remaining setup.
8. Dashboard explains the next best action.

Acceptance:
- Setup can be paused and resumed.
- Required fields are clearly marked.
- CSV import previews errors before commit.
- Sample data is visibly labelled and cannot be mistaken for live data.

## B. Create an order and job

1. User creates/selects customer.
2. User creates order with one or more product lines.
3. User enters quantity and promised date.
4. User creates a job from an order line.
5. User assigns department, supervisor, priority, and target.
6. Supervisor sees job in “Today's work”.

Acceptance:
- Order number unique within tenant.
- Quantities must be positive.
- Due date validation is clear.
- Partial production and partial dispatch are supported.
- Order status is derived or transitioned consistently.

## C. Record production

1. Supervisor opens “Today's work”.
2. Selects a job.
3. Enters produced quantity.
4. Enters rejected quantity (default 0, editable).
5. Selects shift and optional machine.
6. Reviews a concise summary.
7. Saves.
8. Job progress and owner dashboard update.

Acceptance:
- Common entry under 30 seconds after initial setup.
- Produced and rejected quantities cannot be negative.
- Rejected quantity cannot exceed produced quantity unless the domain model explicitly supports a different definition.
- Duplicate submissions are protected by idempotency key.
- Offline entry is queued and visibly marked pending sync.
- Corrections require a reason and preserve audit history.
- KPI calculations distinguish gross produced, accepted, rejected, and rework.

## D. Attendance

1. Supervisor opens attendance for a shift.
2. Sees expected employees.
3. Marks each employee using large, clear states.
4. Can bulk-mark present, then change exceptions.
5. Saves attendance.
6. Dashboard and report update.

Acceptance:
- No accidental mass marking without review.
- Duplicate attendance for same employee/date/shift is prevented or explicitly handled.
- Manual changes create audit events.
- Employee is not silently included in a shift they were not assigned to.
- Attendance state labels are translated consistently.

## E. Report machine issue

1. Supervisor taps “Report issue”.
2. Selects machine or “Other”.
3. Selects issue category and severity.
4. Adds optional photo/note.
5. Saves issue.
6. Owner sees open issue.
7. Authorized user records resolution and end time.

Acceptance:
- Open issue cannot be marked resolved without resolution details where configured.
- Downtime is calculated from timestamps and clearly labelled as estimated if start/end times are manually entered.
- No control command is sent to a machine.

## F. Factory Pulse

1. Scheduled job runs in factory timezone.
2. Aggregates only records for the reporting date and configured shift boundaries.
3. Checks data completeness.
4. Generates report.
5. Saves report snapshot and delivery attempts.
6. Sends in-app notification; optional external channel if configured.
7. Owner can open details behind every metric.

Acceptance:
- No fabricated or inferred metrics.
- Missing data appears as “Not recorded”.
- Timezone and daylight/time boundary behavior are tested.
- Retry does not create duplicate reports or duplicate messages.
- Delivery failures are visible to admins.
- Report can be regenerated only with an explicit audit trail if source data changes.

## G. Inventory movement (P1)

1. Storekeeper selects item.
2. Selects transaction type.
3. Enters quantity and unit.
4. Adds reference (purchase/job/return/adjustment).
5. Reviews and saves.
6. Ledger updates stock balance and alert state.

Acceptance:
- Stock is derived from transactions.
- Unit conversion is explicit.
- Adjustments require a reason.
- Duplicate transaction submission is prevented.
- Negative stock is blocked by default.

## H. Quality inspection (P1)

1. Inspector selects job/product.
2. Enters inspected quantity.
3. Enters accepted/rejected/rework quantities.
4. Adds defect category and optional evidence.
5. Saves.
6. Accepted stock and quality metrics update.

Acceptance:
- Quantity reconciliation is enforced.
- Rework is tracked separately.
- Defect categories can be configured.
- Quality records are traceable to job and actor.

## I. Dispatch (P1)

1. User opens order.
2. Sees accepted available quantity.
3. Enters dispatch quantity and dispatch reference.
4. Confirms.
5. Order balance and dispatch status update.

Acceptance:
- Partial dispatch supported.
- Dispatch cannot exceed eligible accepted quantity without authorized override.
- Every dispatch has actor, timestamp, and reference.

## Global acceptance requirements

- Every query and mutation is tenant-scoped.
- API validates role permissions.
- All dates use factory timezone for business reporting and UTC for stored timestamps.
- Every list has loading, empty, error, and retry states.
- Every form has validation and clear recovery from errors.
- Destructive actions require confirmation.
- Data exports respect permissions and tenant scope.
- Audit events exist for sensitive edits.
- Keyboard and screen-reader basics are supported.
