# Google Stitch — Master Design Brief

Design **FactoryOS**, a premium but extremely simple factory operations SaaS for small manufacturing businesses in Gujarat, India. The primary users are non-technical factory owners and supervisors. The product must feel trustworthy, modern, calm, and unusually easy to use.

## Product promise
“Your factory. Your people. Your production. One place.”

## Design audience
- Owner/admin: desktop-first, wants a powerful but understandable overview.
- Supervisor: Android mobile-first, needs fast daily actions.
- Worker: minimal mobile interface, only relevant tasks.

## Design direction
- Modern industrial SaaS, not a legacy ERP.
- Light theme first.
- Warm neutral background, crisp white surfaces, dark readable text, restrained primary accent, semantic green/amber/red.
- High contrast, generous spacing, clear hierarchy, large tap targets.
- Use meaningful icons with labels.
- Avoid visual noise, tiny text, dense tables on mobile, excessive gradients, glassmorphism, neon, decorative 3D, and unnecessary animations.
- Use realistic but clearly illustrative demo data.
- Do not make unsupported claims such as “live machine tracking”.

## UX rules
1. One clear primary action per screen.
2. Use plain language, not ERP terminology.
3. Show “Not recorded” when data is missing; never imply zero.
4. Every metric shows its period and last-updated time.
5. Every KPI can drill into the records behind it.
6. Forms should be short, progressive, and forgiving.
7. Show loading, empty, error, offline, pending-sync, and success states.
8. Use confirmation for consequential actions.
9. Support English, Gujarati, and Hindi via translation-ready layouts.
10. Design responsive desktop, tablet, and 360px mobile states.

## Required screens
1. Login / welcome.
2. First-time factory onboarding wizard.
3. Owner dashboard / Factory Pulse.
4. Orders list and order detail.
5. Jobs / today's work.
6. Production quick entry.
7. Attendance roster.
8. Employees directory.
9. Machine issue report and issue list.
10. Inventory list and stock movement (P1).
11. Quality inspection (P1).
12. Dispatch list and dispatch detail (P1).
13. Reports.
14. Notifications / activity.
15. Settings: factory, shifts, users, language, report schedule.

## Owner dashboard content
- Production today vs target.
- Accepted/rejected quantities.
- Active/pending/overdue jobs.
- Attendance present / expected.
- Open machine issues.
- Low stock when inventory is enabled.
- “Needs attention” panel.
- Recent activity.
- Factory Pulse daily report preview.
- Filters for date, shift, department.
- Data freshness indicator.

## Supervisor mobile home
- Greeting and shift.
- Today's assigned jobs.
- Four large actions: Add Production, Attendance, Report Issue, Update Stock (only if enabled).
- Recent updates and pending sync.
- Use large numeric inputs and minimal typing.

## Production quick-entry flow
- Select job.
- Enter produced quantity.
- Enter rejected quantity (default zero, editable).
- Shift and machine optional/defaulted.
- Review concise summary.
- Save.
- Show success with updated job progress.
- Offline state must be designed.

## Deliverables
Create a consistent multi-screen design system and high-fidelity responsive screens. Include component states, responsive variants, realistic sample data, and clickable prototype connections for the core flows. Use the detailed per-screen prompts in the other files in this folder.
