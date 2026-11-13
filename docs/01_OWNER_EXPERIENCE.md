# Stitch Prompt — Owner Experience

Create a high-fidelity desktop-first owner/admin experience for FactoryOS.

## Main screen: Owner Overview

Use a premium, calm, light industrial SaaS aesthetic. The page should feel powerful but effortless. A factory owner should understand the current situation in under 60 seconds.

### Layout
- Left sidebar with FactoryOS logo and navigation: Overview, Orders & Jobs, Production, People, Inventory, Machines, Quality, Dispatch, Reports, Settings.
- Top header with factory selector, date selector, shift filter, notifications, profile.
- Page title “Good morning, [Name]” and a short status sentence.
- Primary action “Create job” or “Add order”.
- KPI row: Production today, Target achieved, Workers present, Open issues.
- “Needs attention” section with delayed jobs, machine issues, low-stock alerts (only when module enabled).
- Production trend chart with a plain-language summary.
- Today's production by department/work area.
- Pending orders table with status, due date, progress.
- Recent activity feed.
- Factory Pulse daily summary card.

### Sample data (illustrative)
Factory: Shree Precision Components
Date: 13 Nov 2026
Production: 1,250 units
Target: 1,320 units
Attendance: 8 of 10
Open issues: 2
Pending jobs: 3
Overdue jobs: 1

Clearly mark sample data as demo/illustrative. Do not suggest this is actual factory performance.

### Visual hierarchy
- Production and attention items above the fold.
- Keep KPI cards concise and clickable.
- Use accessible chart labels and text summary.
- Distinguish missing data from zero.
- Show “Updated 5 min ago” only as sample UI data.

### Additional owner screens
- Orders list with filters and overdue state.
- Order detail with line items, jobs, progress and dispatches.
- Production report with date/shift filters.
- Attendance overview with department/shift filters.
- Reports history and daily report detail.
- User/role settings.

### Responsive behavior
At tablet width collapse sidebar to icon/compact navigation. At mobile prioritize summary, attention items, and a simple bottom navigation. Tables become readable cards, not squeezed columns.
