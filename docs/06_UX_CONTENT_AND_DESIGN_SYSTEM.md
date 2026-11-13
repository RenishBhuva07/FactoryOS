# 06 — UX Content & Design System

## Experience objective

The interface should feel trustworthy, calm, premium, and unusually easy for non-technical factory users. It must not look like a dense legacy ERP.

## Design principles

1. Clarity before density.
2. One obvious primary action per screen.
3. Use everyday language: “Today's work”, “Add production”, “Report a problem”.
4. Show exceptions before secondary analytics.
5. Keep forms short and progressive.
6. Large tap targets, readable typography, clear contrast.
7. Use icons with text labels; never rely on icons alone for important actions.
8. Show empty states that teach the next step.
9. Show last-updated and sync status.
10. Use visual consistency across desktop and mobile.

## Suggested visual direction

- Modern industrial SaaS, warm and approachable.
- Light theme as default for factory-floor readability.
- Optional dark owner dashboard only if validated; do not make the first release depend on theme complexity.
- Neutral canvas, restrained navy/charcoal text, one confident primary accent, semantic green/amber/red states.
- Avoid excessive gradients, glassmorphism, neon, tiny charts, and decorative 3D effects.
- Cards should be useful, not ornamental.
- Charts must have labels, accessible colors, and text summaries.

## Layout

### Desktop owner app
- Left navigation: Overview, Orders & Jobs, Production, People, Inventory, Machines, Quality, Dispatch, Reports, Settings.
- Top bar: factory switcher, date/shift filter, notifications, profile.
- Main area: page title, contextual actions, KPI strip, exception panel, detailed sections.
- Keep critical daily summary above the fold.

### Mobile supervisor app
- Bottom navigation: Today, Jobs, Actions, Profile.
- “Actions” opens a short list of high-frequency actions.
- Job cards show product, planned quantity, completed quantity, due date, status.
- Use full-width controls and numeric keypad for quantities.
- Save confirmation and sync state are visible.

### Worker experience
- Minimal navigation.
- Today's assignment, shift, task progress, report a problem.
- No owner analytics or unrelated modules.
- Language selector easy to find.

## Components

- KPI card with value, label, trend/context, freshness.
- Status badge with text and icon.
- Job card with due date and progress.
- Quick action button.
- Attendance roster row with large status selector.
- Quantity entry field with unit suffix.
- Empty state with one CTA.
- Alert/exception card with severity, context, owner/action.
- Activity feed with actor and timestamp.
- Data table with mobile card fallback.
- Confirmation dialog for consequential actions.
- Offline/sync banner.

## Content and terminology

Prefer:
- “Add production” over “Create production transaction”.
- “Today's work” over “Work order management”.
- “Report machine problem” over “Downtime incident registration”.
- “Stock running low” over “Reorder threshold breached”.
- “Not recorded” over a blank cell.
- “Needs attention” over “Exception queue”.

Avoid unexplained acronyms such as OEE, MRP, WIP, SKU in primary workflows. Where needed, provide a short explanation.

## Localization

Launch language set:
- English
- Gujarati
- Hindi

Requirements:
- Store language preference per user.
- All UI strings use translation keys.
- Do not hardcode user-visible strings in components.
- Support Gujarati/Hindi text expansion.
- Use locale-aware dates, numbers, and units.
- Avoid text embedded in images.
- Test real translations with native speakers; machine translation is not sufficient for production quality.

## Accessibility

- WCAG AA contrast target.
- Keyboard navigation on desktop.
- Visible focus state.
- Labels and error descriptions for form fields.
- Do not communicate status by color alone.
- Respect reduced motion.
- Minimum comfortable touch target around 44–48 CSS px.
- Charts have accessible summaries.

## Engagement and retention

Retention should come from useful daily value, not gamification pressure:
- A morning “Today's plan” for supervisors.
- A closing “Factory Pulse” for owners.
- Actionable reminders only for overdue work or unresolved issues.
- Weekly trends and improvement insights.
- Progress indicators for onboarding.
- Optional saved views.

Avoid streaks, public employee rankings, manipulative nudges, or punitive leaderboards.
