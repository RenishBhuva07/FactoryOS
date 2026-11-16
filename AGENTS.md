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
- **LOCKED DESIGN REFERENCE MANDATE (Zero Changes to src/design-reference Without Explicit Permission)**:
  - The dedicated benchmark archive (`src/design-reference/`), along with its foundational benchmark components, is **STRICTLY LOCKED**.
  - **No Changes Without Permission**: You MUST NOT make any changes, edits, refactoring, re-styling, or restructuring to `src/design-reference/**` without explicit, prior user approval.
  - **Single Source of Truth**: This design reference serves as the permanent gold standard, visual blueprint, and single source of truth for designing all future UI components and screens of this project.
  - **Strict Pattern Inheritance**: All future modules (e.g., Inventory, Production, Orders, Supervisor Mobile, Quality, Settings) must faithfully mirror the exact visual standards, spatial rhythm (14px / `gap-3.5`), 60-30-10 color balance, tabular numbers (`tabular-nums`), pill navigation, stationary coordinate-locked sidebar, and clean card perimeters established in this reference, but must be implemented in their own separate modular directories without modifying the locked reference.
- Follow the approved FactoryOS Benchmark Design System (detailed in `docs/06_UX_CONTENT_AND_DESIGN_SYSTEM.md`, canonically implemented in `src/design-reference/` and `src/pages/dashboard/DashboardPage.tsx`).
- **Core 3 Brand Colors Mandate**:
  - All UI across the entire project must strictly adhere to the 3 approved brand colors, balanced via the **60-30-10 benchmark ratio**:
    1. **Midnight Navy**: `#002941` (60% Primary brand, high-contrast typography, dark contrast surfaces, active nav pills, checkboxes, profit chart bars)
    2. **Pale Mint**: `#CFE8E1` (30% Fresh accent, completed/normal status, soft sub-wells, highlight pills, profit/production chart bars)
    3. **Coral Orange**: `#FD6E6E` (10–15% Action/attention accent, pending/urgent alerts, loss/expense chart bars, spending highlights, attention cards, notification dots)
  - Any additional tints, shades, surfaces, or states must be harmoniously derived from these 3 colors, defined centrally in `src/colors.tsx` and `src/constants/colors.ts`.
  - **Tripartite Breakdown Rule (Multi-Tier & Pipeline Visualization)**: When visualizing 3-part breakdowns or tier pipelines (e.g., `ClientTierPipelineCard`), strictly assign Tier 1 (Dominant ~60%) to Midnight Navy, Tier 2 (Secondary ~30%) to Pale Mint, and Tier 3 (Accent ~10%) to Coral Orange. Never use generic muted gray for the 3rd tier.
  - **Entity & Card 1:1 Theming Rule**: When an entity/card has a specific operational state or urgency, all accompanying accents (Avatar Icon, Progress Bar Fill, Status Dot/Pill, Action Buttons, and Due Dates) must maintain 1:1 color harmony with that theme (Urgent/Awaiting QC in Coral, Machining/Completed in Mint, Standard/Assembly in Navy).
  - **60-30-10 Hero Colors Mandate (`HERO_COLORS`)**:
    - All 3 hero gradient palettes (`HERO_COLORS.NAVY`, `HERO_COLORS.MINT`, `HERO_COLORS.CORAL` defined in `src/constants/colors.ts`) must be deployed systematically rather than defaulting solely to Midnight Navy.
    - **Hero Page**: Navy Hero (60% command core), Mint Hero (30% telemetry & OEE), Coral Hero (10-15% urgent trial & downtime savings).
    - **Onboarding Step Progression**: Step 1 Navy (Business Profile), Step 2 Mint (Shifts & Schedule), Step 3 Navy (Machinery Catalog), Step 4 Coral + Mint (Supervisor Invites & WhatsApp Passlinks).
    - **Dashboard KPI Strip**: Balance across 1 Hero Navy, 1 Hero Mint, 1 Subtle Mint/White, and 1 Hero/Subtle Coral (for maintenance attention). Avoid dual-coral dominance in top KPI strips.
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
- **Collapsible In-Flow Sidebar & Coordinate-Lock Mandate**:
  - The left dock rail operates in two seamless states: **Collapsed Rail** (`72px`, centered at $X = 36\text{px}$) and **Expanded Full Sidebar** (`256px` / `w-64`, with smooth `cubic-bezier(0.16, 1, 0.3, 1)` easing).
  - **In-Flow Layout Push**: The expanding dock MUST push and resize the sibling content container (`flex-1 min-w-0`) within the flex layout flow. Floating overlays that occlude or cast shadows over dashboard content, tabs, or headers are strictly prohibited.
  - **Stationary Icon Coordinate Lock ($X$ and $Y$ Invariance)**: Navigation icons must never shift position when opening or closing. Anchor all icons to a dedicated 40×40px box centered at $X = 36\text{px}$. Lock vertical heights via a standardized top header footprint (`h-[148px] shrink-0`), identical container padding (`py-2.5`), identical item heights (`h-10`), and identical gaps (`gap-2`). Expansion unfolds strictly horizontally to reveal labels and badges to the right of stationary icons.
  - **Brand Capsule Badge Wrapper**: Enclose logo mark and name inside an elevated white capsule badge (`bg-white border border-[#DFECF3] shadow-xs`): 48×48px in collapsed mode, widening to a unified capsule enclosing the logo and title in expanded mode.
  - **Drawer Controls**: Use canonical panel collapse/expand icons (`menu_open` / `dock_to_left`), never generic pin icons.
  - **Collapsed Bottom Utilities**: Preserve the classic circular action pill capsule (`rounded-full p-1 bg-white border border-[#DFECF3] shadow-xs`) with centered 32×32px buttons.
- **Clean Card Perimeter Mandate**:
  - Prohibit protruding chevron or arrow buttons floating across outer card borders or gutter channels. All controls and pagination actions must remain cleanly contained within card headers or toolbars.
- **Brand Naming Mandate**:
  - The brand name throughout all components, layouts, headings, and mock copy is strictly **FactoryOS** (never legacy or placeholder names like "Finexy").
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
