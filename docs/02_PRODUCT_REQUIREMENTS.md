# 02 — Product Requirements Document (PRD)

## 1. Product definition

**Name:** FactoryOS  
**Type:** Multi-tenant, subscription SaaS  
**Primary market:** Indian small and growing factories  
**Primary roles:** Owner and Manager  
**Primary interface:** Responsive web application / installable PWA  
**North-star outcome:** Owner can reliably understand factory operations without chasing updates.

## 2. Product principles

- Plain language, not ERP jargon.
- Mobile-first operational workflows.
- Desktop-friendly owner reporting.
- No required employee app in MVP.
- Fast data entry with sensible defaults.
- Every metric must be traceable to source entries.
- Show “not reported” rather than silently showing zero.
- Never infer machine status or attendance without a recorded event.
- Role-based permissions and audit logs.
- Do not control machinery in MVP.

## 3. Personas

### Owner
Business buyer, primary administrator and subscription owner. Can configure the factory, create managers, access all business reports, manage billing and export data.

### Manager
Daily operator. Can view assigned operational data and enter/modify permitted records. Cannot manage billing, change ownership, delete the business or grant themselves elevated permissions.

## 4. Subscription and onboarding

Public website → pricing → select plan → checkout/trial → owner account → verification → business registration → factory profile → production setup → manager invitation → first operational day.

Support two acquisition routes:
- Paid plan immediately.
- Time-limited free trial with payment method or payment at conversion, depending on selected commercial policy.

Payment success must be verified server-side via payment-provider webhook. Never activate a paid subscription based only on a client redirect.

Owner can create an account before checkout only if the product deliberately supports a pending checkout state. Avoid duplicate accounts when checkout is abandoned.

## 5. MVP scope

### P0 — Must ship

1. Marketing website and pricing.
2. Owner registration, login, password reset and verification.
3. Subscription checkout, trial and lifecycle states.
4. Business registration and onboarding wizard.
5. Manager profile creation and invitation.
6. Separate role-aware login experience.
7. Owner dashboard.
8. Manager dashboard.
9. Customer/order register.
10. Production entry against an order/product/operation.
11. Daily production target and actual.
12. End-of-day report and activity feed.
13. Basic notifications and audit history.
14. Responsive layout and basic PWA installability.

### P1 — After pilot validation

- Machine register and downtime events.
- Raw material and finished goods stock ledger.
- Attendance and shift register.
- Quality/rejection entry.
- Dispatch tracking.
- CSV export and printable reports.
- Gujarati and Hindi UI translations.
- Offline draft queue for selected manager workflows.

### Not in MVP

- PLC/SCADA/IoT machine control.
- Payroll calculation or statutory payroll filing.
- Full accounting and GST invoicing.
- Advanced MRP, BOM explosion and costing.
- Predictive maintenance or AI-generated root causes.
- Biometric device integrations.
- Multi-plant enterprise consolidation.
- Employee self-service portal.

## 6. Functional requirements

### FR-001 Public website
- Explain the product in simple language.
- Show modules, sample dashboard, pricing, FAQs and contact/demo CTA.
- Show no fabricated customer logos or testimonials.
- Provide separate Owner and Manager login entry points.
- Display legal pages: Terms, Privacy, Refund/Cancellation and Contact.

### FR-002 Plans and checkout
- Plan catalogue managed server-side.
- Monthly and annual billing options.
- Plan includes limits: factories/sites, managers, records/storage or other clearly described units.
- Coupon and tax support can be phased.
- Checkout session created server-side.
- Payment webhook verifies provider signature.
- Subscription states: trialing, active, past_due, canceled, expired, paused.
- Grace-period and read-only behaviour configurable.
- Owner can view invoices and update payment method through provider-supported flow.

### FR-003 Owner account
- Unique email or mobile identity.
- Verification required before sensitive actions.
- Secure password hashing or managed identity provider.
- Password reset and session revocation.
- Owner can manage their profile and security settings.

### FR-004 Business registration
Required:
- Legal/trade name.
- Display name.
- Industry/category.
- Address and state.
- Time zone (default Asia/Kolkata).
- Business contact.
- Optional GSTIN/Udyam reference; validate format only unless authoritative verification integration exists.
- Factory size band and shift pattern.
- Default language and unit preferences.

Do not require GSTIN or Udyam number to use the product.

### FR-005 Manager management
- Owner creates manager name and mobile/email.
- Send invitation link or one-time setup code.
- Manager creates own password; do not expose plaintext credentials in owner UI.
- Invitation expires and can be resent/revoked.
- Owner can deactivate manager and revoke sessions.
- Manager belongs to one business initially; architecture may allow multiple business memberships later.
- Owner can assign permissions by module.

### FR-006 Role-aware authentication
- Shared secure authentication service.
- Owner login route and Manager login route can be visually distinct.
- Role is enforced by server-side membership, not a user-selected dropdown.
- Wrong-role login shows a safe message and correct route.
- Never trust role claims supplied by browser local storage.

### FR-007 Owner dashboard
Show:
- Today's production actual vs target.
- Production trend.
- Active/pending orders and at-risk orders.
- Attendance summary, if module enabled.
- Machine downtime/open issues, if enabled.
- Low-stock alerts, if enabled.
- Recent manager activity.
- Missing daily report indicators.
- Filters: today, yesterday, date range; shift; product/order where relevant.

### FR-008 Manager dashboard
Show:
- Today's assigned priorities.
- Orders requiring updates.
- Production quick-entry CTA.
- Attendance quick action (if enabled).
- Report machine issue.
- Record material movement (if enabled).
- Quality/rejection entry (if enabled).
- Incomplete tasks and end-of-shift checklist.

### FR-009 Orders
- Create order with order number, customer, product, quantity, unit, promised date, priority and notes.
- Status: draft, confirmed, in_progress, on_hold, completed, dispatched, canceled.
- Track planned quantity, produced quantity, accepted quantity and dispatched quantity.
- Prevent negative quantities and over-dispatch unless owner-authorised override.
- At-risk status based on due date and remaining quantity; explain the rule.

### FR-010 Production
- Production entry references date, shift, order/product, operation/work centre (optional in MVP), quantity, unit, rejected quantity, notes and manager.
- Support units per product (pieces, kg, metres, litres, boxes, batches, etc.).
- Store quantity as decimal with unit precision.
- Edit history and correction reason.
- Avoid double counting on retries via idempotency key.
- Dashboard totals use accepted/good output and separately show rejected output.

### FR-011 Daily report
- Generate a report for the factory's local business date.
- Include production, order status, attendance, downtime, inventory and quality only where modules are enabled and data exists.
- Clearly mark missing reports and incomplete modules.
- Owner can view in app and receive email/WhatsApp later as a configurable channel.
- Scheduled report time is configurable; default 7 PM local time.
- If no data exists, report “No update submitted” rather than zero production.

### FR-012 Activity and notifications
- Activity timeline includes actor, action, timestamp and entity.
- In-app notification for new manager invite, breakdown, low stock and at-risk order.
- Notification preferences by role.
- No noisy notifications for every routine entry.

### FR-013 Machine log (P1)
- Machine register with name/code, type, location and active status.
- Breakdown event with start, reported time, reason, severity, notes and optional photo.
- Resolution event with end time, resolution notes and downtime duration.
- Machine state is derived from events; no hidden IoT inference.

### FR-014 Inventory (P1)
- Item master with code, name, category, unit and reorder threshold.
- Stock ledger: opening, receipt, issue, adjustment, production consumption, finished output.
- Every movement has quantity, unit, reference and actor.
- Stock balance is calculated from ledger, not independently overwritten.
- Negative stock policy configurable; default block with owner override.

### FR-015 Attendance (P1)
- Manager records attendance by shift/date.
- Status: present, absent, half_day, leave, weekly_off, holiday.
- Optional in/out time and overtime minutes.
- Corrections require reason and audit event.
- Do not label this as payroll or statutory compliance software.

### FR-016 Quality (P1)
- Record produced quantity, accepted quantity, rejected quantity, defect category and notes.
- Rework tracked separately from scrap.
- Dashboard rejection rate = rejected quantity / total inspected quantity, with denominator visible.

### FR-017 Dispatch (P1)
- Dispatch against order.
- Dispatch note/reference, date, quantity, transport details optional.
- Track remaining quantity and delivery status.
- Do not issue e-way bills or tax documents in MVP.

## 7. Non-functional requirements

- Mobile-first responsive layout from 360px viewport.
- Primary manager actions should require minimal typing.
- Core dashboard initial load target under 3 seconds on a typical mobile connection, subject to hosting and data volume.
- API p95 target under 500ms for common read operations under expected MVP load.
- WCAG 2.2 AA target for key flows.
- All data scoped by business/tenant.
- TLS in transit and encryption at rest through infrastructure/provider.
- Daily backups and tested restore procedure.
- Audit trail for sensitive and operational edits.
- Monitoring for application errors, payment webhooks and scheduled jobs.
- Export capability and documented deletion process.

## 8. Success metrics

Activation:
- Owner completes onboarding.
- Manager invited and activated.
- First order created.
- First production entry submitted.

Engagement:
- Active factories per week.
- Manager daily entry completion.
- Percentage of operating days with a submitted production report.
- Owner dashboard weekly visits.
- Daily report open rate.

Value:
- Time to complete production entry.
- Time owner spends collecting updates before vs after.
- Number of missed/late order risks surfaced.
- Stock discrepancies reported by pilot users.

Commercial:
- Trial-to-paid conversion.
- Paid retention at 30/90 days.
- Support hours per factory.
- Gross margin after messaging/payment/support costs.

## 9. Product decisions to resolve before coding

- One manager per factory or multiple managers by plan?
- Do workers need individual attendance identities, or only headcount at first?
- Is production recorded by order, product, machine or shift?
- Is inventory a P1 requirement for the first vertical?
- Is trial 7, 14 or 30 days?
- Is pricing per factory, per manager or by worker band?
- Will onboarding be self-service or assisted?
