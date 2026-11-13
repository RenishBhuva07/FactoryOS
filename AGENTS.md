# FactoryOS — Root Agent Instructions

You are the primary engineering agent for FactoryOS.

## Before implementing

Read the relevant documentation in `docs/`, especially:

1. `02_PRODUCT_REQUIREMENTS.md`
2. `04_TECHNICAL_ARCHITECTURE.md`
3. `06_UX_CONTENT_AND_DESIGN_SYSTEM.md`
4. `08_SECURITY_PRIVACY_AND_COMPLIANCE.md`
5. `09_ANTIGRAVITY_BUILD_INSTRUCTIONS.md`
6. `13_ANTIGRAVITY_AGENT_INSTRUCTIONS.md`

Consult other documents in `docs/` whenever relevant. Treat the approved product requirements as the source of truth for product scope, the technical architecture as the source of truth for engineering decisions, the approved Stitch screens and design system as the source of truth for visual design, and the security document as the source of truth for security requirements. If documents conflict, identify the conflict and ask for clarification rather than silently choosing.

## Repository rules

- Inspect the existing repository before changing files.
- Preserve the initialized project stack and working configuration unless an architectural change is explicitly approved.
- Use TypeScript with strict typing.
- Prefer modular, reusable components and clear separation of UI, business logic, and API services.
- Follow the approved FactoryOS Benchmark Design System (detailed in `docs/06_UX_CONTENT_AND_DESIGN_SYSTEM.md`, canonically implemented in `src/pages/dashboard/DashboardPage.tsx`).
- **Core 3 Brand Colors Mandate**:
  - All UI across the entire project must strictly adhere to the 3 approved brand colors, balanced via the **60-30-10 benchmark ratio**:
    1. **Midnight Navy**: `#002941` (60% Primary brand, high-contrast typography, dark contrast surfaces, active nav pills, checkboxes, profit chart bars)
    2. **Pale Mint**: `#CFE8E1` (30% Fresh accent, completed/normal status, soft sub-wells, highlight pills, profit/production chart bars)
    3. **Coral Orange**: `#FD6E6E` (10–15% Action/attention accent, pending/urgent alerts, loss/expense chart bars, spending highlights, attention cards, notification dots)
  - Any additional tints, shades, surfaces, or states must be harmoniously derived from these 3 colors, defined centrally in `src/colors.tsx` and `src/constants/colors.ts`.
- **Common Separate Reusable Components Architecture**:
  - Everything must be modularized into common separate components (`src/components/common/`).
  - Always write clean, atomic, reusable code with typed props (e.g. `Card`, `PillButton`, `SegmentedPillNav`, `FloatingIconDock`, `StatusDotBadge`, `KpiMetricCard`, `DataTable`, `PillInput`, `PillProgressBar`).
  - Never write monolithic or duplicated one-off UI blocks.
- **Benchmark Design System & Attachment Interpretation Rule**:
  - Any future attached example files, screenshots, wireframes, or Stitch mockups serve **STRICTLY TO DEFINE CONTENT, DATA FIELDS, WORKFLOWS, AND FUNCTIONAL REQUIREMENTS**.
  - **Never** copy clunky, dated, raw, or inconsistent visuals from reference attachments.
  - All visual execution, card architecture, 14px layout spacing (`gap-3.5`), typography, tabular numbers (`tabular-nums`), pill navigation, floating docks, soft diffused shadows, rounded corners, tables with 4px custom checkboxes, and color accents **MUST ALWAYS** follow the FactoryOS Benchmark Design System canonically implemented in `DashboardPage.tsx`.
- **Universal Mobile Browser Responsiveness**:
  - Build responsive experiences for owners and managers that open and function flawlessly in mobile phone and tablet web browsers (down to 360px viewport width) without horizontal page breaks.
  - Enforce touch targets >= 44px–48px, horizontal table scroll wrappers, sticky header, and single-column card stacking.
- Enforce authentication, authorization, and tenant isolation on the server; never rely only on hidden UI controls.
- Do not introduce fake integrations, fabricated live telemetry, or misleading metrics.
- Do not expose secrets or credentials in source code.
- Do not run project after code changes (e.g. dev server); user verifies manually.
- **Strict No-AI-Comments Rule**: Strictly NO big AI comments, multi-line comment blocks, file overview banners, or explanatory commentary in code files. Write clean, self-documenting code. Use only minimal, concise human comments where strictly necessary (e.g., non-obvious business logic).
- Focus strictly on relevant files and decisions without exploring unnecessary files or bloated context.

## Working protocol

For each task:

1. Understand the requirement and identify relevant documentation.
2. Inspect the existing implementation and affected files.
3. Prepare a concise file-level implementation plan.
4. Present the plan for approval before large or cross-cutting changes.
5. Implement only the approved scope.
6. Run relevant linting, type checks, tests, and build commands.
7. Report what changed, what was verified, and any remaining issues.

Do not claim a feature is complete unless it has been implemented and verified. Do not start large-scale implementation without approval.
