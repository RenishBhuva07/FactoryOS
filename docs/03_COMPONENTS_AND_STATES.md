# Stitch Prompt — Design System, Components & States

Create a reusable design system for FactoryOS.

## Foundations
- Responsive grid and spacing scale.
- Typography scale optimized for readability.
- Color tokens: background, surface, text, muted, border, primary, success, warning, danger, info.
- Semantic status colors must always be paired with text/icon.
- Light theme first.
- Accessible contrast.
- Focus, hover, pressed, disabled, loading states.
- Gujarati/Hindi font fallback and text expansion support.

## Components
1. App sidebar and mobile bottom navigation.
2. Top bar with factory selector and date/shift filter.
3. KPI card.
4. Status badge.
5. Job card.
6. Order progress bar.
7. Quick action button.
8. Employee attendance row.
9. Numeric quantity field with unit suffix.
10. Search/filter toolbar.
11. Data table and mobile card alternative.
12. Needs-attention alert card.
13. Activity feed item.
14. Daily report card.
15. Empty state with one helpful CTA.
16. Toast/snackbar.
17. Confirmation dialog.
18. Offline/sync banner.
19. File/photo attachment control.
20. Language selector.

## State matrix
For each component design:
- default
- hover/focus
- pressed
- disabled
- loading
- success
- warning/error where relevant
- empty state where relevant

## Interaction details
- Destructive actions require confirmation.
- Form errors appear next to the field and in a concise summary if multiple.
- Save buttons show progress and prevent duplicate submission.
- Numeric fields show unit and sensible examples.
- Tables support sort/filter without overwhelming the screen.
- Status cannot rely on color alone.
- Offline queue records show pending count and last successful sync.

## Avoid
- tiny 12px primary text
- icon-only important controls
- overuse of charts
- decorative gradients
- fake real-time machine telemetry
- confusing ERP acronyms
