# FactoryOS — Design Reference (LOCKED)

> **LOCKED REFERENCE SPECIFICATION**
> This directory (`src/design-reference/`) is the immutable gold standard and visual single source of truth for FactoryOS.
> **STRICT RULE**: Do NOT modify, refactor, or delete any file in this directory without explicit user permission.

---

## Purpose

This directory preserves the canonical benchmark implementation of FactoryOS (`DashboardPage` and its supporting common primitives). All future application modules (Inventory, Production, Orders, Supervisor Mobile, Quality, Onboarding, Settings, etc.) must reference and replicate the design rules, spatial hierarchy, and component contracts established here.

---

## Visual Design Benchmark Rules

### 1. 60-30-10 Brand Color Balance
- **60% Midnight Navy (`#002941`)**: High-contrast typography, primary brand surfaces, active navigation pills, table header text, dark contrast containers.
- **30% Pale Mint (`#CFE8E1`)**: Fresh accents, completed status pills, secondary sub-wells, soft badge backgrounds, production/profit metric bars.
- **10–15% Coral Orange (`#FD6E6E`)**: High-attention alerts, pending statuses, loss/expense metric bars, spending threshold warnings, notification indicators.

### 2. Spatial Rhythm and Spacing
- Canonical layout gap is **14px (`gap-3.5`)**.
- Padding standards:
  - Header: `px-3 sm:px-4 py-2.5`
  - Cards: `p-3.5` (compact) or `p-4 sm:p-5` (standard)
  - Outer page bounds: `pl-2 pr-4 sm:pl-3 sm:pr-5 lg:pl-3 lg:pr-6 py-3 sm:py-3.5`

### 3. Typography & Numerals
- Font family: Clean modern sans-serif (`font-sans`).
- All numeric figures, metrics, timestamps, and currency amounts must strictly use `tabular-nums` for vertical alignment.

### 4. Collapsible In-Flow Sidebar & Coordinate Lock
- Two states:
  - **Collapsed Rail**: `72px` width, centered at $X = 36\text{px}$.
  - **Expanded Full Sidebar**: `256px` (`w-64`), easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **In-flow push**: Expanding pushes the content container (`flex-1 min-w-0`), never overlapping or casting modal shadows.
- **$X$ and $Y$ Coordinate Lock**: Icons anchor to a 40×40px box centered at $X = 36\text{px}$ and must never shift horizontally or vertically during transition.
- **Brand Capsule**: White capsule wrapper (`bg-white border border-[#DFECF3] shadow-xs`).

### 5. Clean Card Perimeters
- Prohibit floating chevron/arrow buttons across card gutters or borders. All controls remain within card headers and toolbars.

---

## Directory Inventory

- `dashboard/DashboardPage.tsx`: Full benchmark dashboard composition.
- `dashboard/components/`: Composite cards (TotalBalanceCard, SpendingLimitCard, CardsCarouselCard, KpiMetricsGrid, IncomeChartCard, RecentActivitiesCard, DashboardHeader).
- `components/`: Core design primitives (Card, FloatingIconDock, SegmentedPillNav, PillButton, PillInput, PillProgressBar, StatusDotBadge, KpiMetricCard, DataTable).

