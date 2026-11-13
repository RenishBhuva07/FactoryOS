# Stitch Prompt — Supervisor Mobile Experience

Design the FactoryOS mobile PWA for a factory supervisor using an Android phone, potentially with limited digital confidence and intermittent connectivity.

## Design principles
- Extremely simple.
- Large touch targets.
- Clear labels and familiar words.
- Avoid dense dashboards.
- One main action per screen.
- Numeric keyboard for quantities.
- Strong visual feedback.
- Offline and sync state always visible when relevant.

## Supervisor home
- Header: “Good morning, Mahesh” and shift label.
- Small factory/department context.
- “Today's work” job cards with product name, planned quantity, completed quantity, due date, progress and status.
- Large quick actions:
  1. Add production
  2. Mark attendance
  3. Report machine problem
  4. Update stock (show only if enabled)
- “Needs attention” list for overdue job and unresolved issue.
- Bottom nav: Today, Jobs, Actions, Profile.

## Add production screen
- Step 1: Select job from assigned jobs.
- Step 2: Large numeric input “How many did you produce?”
- Step 3: “How many were rejected?” default 0.
- Step 4: Shift preselected; machine optional.
- Step 5: Review summary and Save.
- After save show confirmation and updated progress.
- Provide a clear “Saved on this device — waiting to sync” state when offline.
- Do not make voice entry mandatory.

## Attendance screen
- Shift and date shown at top.
- Employee roster with name, employee code, and large status controls.
- Quick “Mark all present” action followed by review of exceptions.
- Statuses: Present, Absent, Late, Leave, Half-day.
- Sticky Save button.
- Confirmation summary before saving bulk changes.

## Report issue screen
- Select machine or “Other”.
- Category: breakdown, maintenance, quality, material, safety observation, other.
- Severity: normal, urgent.
- Short description and optional photo.
- Submit and show issue tracking state.
- Do not provide machine control actions.

## States to design
- Loading.
- No assigned jobs.
- No employees configured.
- Validation errors.
- Offline.
- Pending sync.
- Sync failed / retry.
- Successful save.
- Permission denied.

Use realistic Gujarati/Hindi text expansion in layouts. All sample records must be clearly illustrative.
