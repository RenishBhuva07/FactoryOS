# 05 — Google Stitch Master Prompt

Paste this prompt into Google Stitch. Attach this blueprint and `06_SCREEN_INVENTORY.md` if supported.

---

Design a complete, production-quality responsive web SaaS product called **FactoryOS**.

## Product context

FactoryOS is a simple factory operations management platform for small manufacturing businesses in India, initially targeting Gujarat. Factories typically have 5–50 workers. The users are often non-technical owners and supervisors who currently rely on registers, spreadsheets, calls and WhatsApp.

The product must feel premium and extraordinary to the owner, while being exceptionally easy for the manager to use on a phone.

This is NOT a complex ERP interface. Do not use dense legacy ERP tables, technical jargon, or excessive charts.

## User roles

1. **Owner:** pays for the plan, registers the business, configures the factory, invites managers, sees the complete command centre, manages billing and controls permissions.
2. **Manager:** logs in through a manager entry point, handles daily operational work, records production, updates orders, reports machine issues and completes the shift report.

Use one coherent product with role-specific dashboards and navigation.

## Brand and visual direction

- Brand: FactoryOS.
- Tagline: “Your entire factory. One simple dashboard.”
- Premium, calm, confident, modern industrial SaaS following the approved FactoryOS Benchmark Design System (canonically implemented and locked in `src/design-reference/` and `src/pages/dashboard/DashboardPage.tsx`).
- Light theme as the primary design: soft off-white canvas (`#F8FAFA` / `#F5F7F8`), pure white elevated cards (`#FFFFFF`, `rounded-2xl`, `border border-[#EBF1F5]`).
- **Core 3 Brand Colors (60-30-10 Ratio):**
  - **Midnight Navy (`#002941`):** 60% Dominant brand, primary typography, active nav pills, checkboxes, profit chart bars.
  - **Pale Mint (`#CFE8E1`):** 30% Secondary freshness, completed badges, sub-card wells, positive progress tracks.
  - **Coral Orange (`#FD6E6E`):** 10–15% Active accent, loss chart bars, pending badges, threshold alerts, notification dots.
- **Semantic Status System (Dot + Label Pattern):**
  - `completed`: Mint dot `#2D8576` + Mint pill `#E4F4F0`
  - `inProgress`: Navy dot `#002941` + Navy pill `#DFECF3`
  - `pending`: White dot + Coral Gradient pill `from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]`
  - `issue`: Crimson dot `#D62727` + Alert pill `#FFE6E4`
- Pill architecture across all interactive elements (`rounded-full` for all buttons, tabs, tags, badges, search inputs).
- Restrained ambient diffused shadows (`box-shadow: 0 4px 20px -2px rgba(0, 41, 65, 0.04)`), zero harsh dark borders.
- Consistent **14px (`gap-3.5` / `space-y-3.5`)** layout rhythm.
- Excellent typography and mandatory `tabular-nums` for all numeric metrics and currency figures.
- Universal mobile browser responsiveness: works seamlessly in mobile phone and tablet browsers down to 360px width.
- Avoid generic AI gradients, glassmorphism, excessive decoration, and dense legacy ERP tables.
- Use realistic Indian factory context without stereotypes.
- Use realistic sample content and mark it as demo data.

## UX requirements

- Mobile-first for Manager, desktop-first but responsive for Owner.
- Simple everyday language.
- Large touch-friendly actions.
- Short forms with defaults and recent selections.
- Clear empty, loading, error, success and offline/pending-sync states.
- Do not display missing information as zero.
- Make the source and time period of each KPI obvious.
- Keep charts understandable and labelled.
- Use Gujarati/Hindi-ready layout and font choices, but create English UI first.
- Every screen must use consistent design tokens and components.

## Core product experience

### Public website
Create:
- Homepage with clear value proposition and product preview.
- Features section.
- “How it works” section.
- Industry use cases.
- Pricing page.
- FAQ.
- Contact/demo CTA.
- Separate Owner Login and Manager Login links.

### Owner onboarding
Design:
- Plan selection.
- Checkout state.
- Owner account creation.
- Verification state.
- Business registration wizard.
- Factory setup: industry, shifts, units, products.
- Manager invitation.
- Setup checklist and first-run empty dashboard.

### Owner dashboard
This is the hero experience. The owner should understand the factory in 30 seconds.

Show:
- Production today vs target.
- Workers present (if attendance enabled).
- Active/pending orders and at-risk orders.
- Open machine issues (if enabled).
- Low-stock alerts (if enabled).
- Production trend.
- Recent manager activity.
- “Needs your attention” section.
- Daily Factory Pulse card.

Use believable illustrative sample data, not claims about actual factory performance.

### Manager dashboard
Create a very simple mobile workbench:
- Greeting and current shift.
- Today's assigned priorities.
- Large quick actions: Add Production, Update Order, Report Machine Issue, Attendance, End Shift.
- Recent activity.
- Incomplete tasks.
- Clear sync state.

### Modules
- Orders.
- Production.
- Machine log.
- Inventory.
- Attendance.
- Quality.
- Dispatch.
- Reports.
- Team and permissions.
- Subscription and settings.

For the first design pass, prioritise orders and production; show P1 modules in a coherent but secondary way.

## Required interaction states

Design realistic screens/states for:
- No orders yet.
- No production entry today.
- Production successfully saved.
- Manager invitation pending.
- Manager invitation accepted.
- Machine issue open.
- Low stock warning.
- Order at risk.
- Subscription payment failed.
- Trial ending soon.
- Offline/pending sync.
- Permission denied.

## Navigation

Owner desktop sidebar:
Overview, Orders, Production, Machines, Inventory, Team & Attendance, Quality, Dispatch, Reports, Settings.

Owner mobile bottom navigation:
Home, Orders, Production, Alerts, More.

Manager mobile bottom navigation:
Today, Production, Orders, Issues, More.

Do not show modules the tenant has not enabled or the user is not allowed to access.

## Design deliverables

Create a cohesive high-fidelity design system and all screens in `06_SCREEN_INVENTORY.md`. Keep component consistency. Use realistic data tables only where they are useful; prefer cards and focused lists. Include desktop and mobile layouts for key screens. Make the Manager production-entry flow especially fast and intuitive.

The result should look like a serious, premium SaaS product that a small factory owner would be proud to use and show to business partners.

---
