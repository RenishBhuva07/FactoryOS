# Google Stitch — Master Design Brief

Design **FactoryOS**, a premium but extremely simple factory operations SaaS for small manufacturing businesses in Gujarat, India. The primary users are non-technical factory owners and supervisors. The product must feel trustworthy, modern, calm, and unusually easy to use.

## Product promise
“Your factory. Your people. Your production. One place.”

## Design audience
- Owner/admin: desktop-first, wants a powerful but understandable overview.
- Supervisor: Android mobile-first, needs fast daily actions.
- Worker: minimal mobile interface, only relevant tasks.

## Design direction
- FactoryOS Benchmark Design System (canonically implemented in `DashboardPage.tsx`):
  - Soft neutral canvas (`#F8FAFA` / `#F5F7F8`), floating island shell (`rounded-[32px]`), pure white elevated cards (`rounded-2xl`, `border border-[#EBF1F5]`).
  - **Core 3 Brand Colors (60-30-10 Ratio):** Midnight Navy (`#002941`, 60%), Pale Mint (`#CFE8E1`, 30%), and Coral Orange (`#FD6E6E`, 10–15% for active action accents, loss/expense chart bars, pending badges, threshold alerts, and spending highlights). All extended palettes are derived from these 3 colors.
  - Pill architecture across all interactive elements (`rounded-full` for all buttons, tabs, tags, badges, and search bars).
  - Floating top segmented pill navigation and floating left icon rail dock (`hidden md:flex` on mobile).
  - High-contrast two-tone rounded bar charts, hero gradient metric cards, and modern data tables with rounded checkboxes (`rounded-[4px]`) and status dots.
  - Soft diffused ambient shadows (`box-shadow: 0 4px 20px -2px rgba(0, 41, 65, 0.04)`), zero harsh black borders.
  - Consistent **14px (`gap-3.5` / `space-y-3.5`)** layout rhythm.
- **Universal Mobile Browser Responsiveness:** Every screen must open and function cleanly in mobile phone and tablet browsers (down to 360px width) without horizontal page breaks, utilizing responsive single-column card stacking, sticky mobile header, and minimum 44px–48px touch targets.
- **Common Separate Reusable Components:** Everything must be built using modular, reusable components in `src/components/common/`.
- **Attachment Interpretation Rule:** Any provided Stitch screens, wireframes, or reference attachments specify **CONTENT, FIELDS, AND FUNCTIONAL WORKFLOWS ONLY**. All visual execution, geometry, spacing, typography, and styling must follow the FactoryOS Benchmark Design System.
- Modern industrial SaaS, never a legacy ERP.
- High contrast, generous breathing room, clear typographic hierarchy, large tap targets.
- Avoid visual noise, tiny text, dense legacy ERP tables, excessive gradients, glassmorphism, neon, decorative 3D, and unnecessary animations.
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
