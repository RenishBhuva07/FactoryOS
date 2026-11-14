# FactoryOS Design System — Components & States

Create and maintain reusable components for FactoryOS following the approved FactoryOS Benchmark Design System (canonically implemented and locked in `src/design-reference/` and `src/pages/dashboard/DashboardPage.tsx`).

> [!CAUTION]
> **LOCKED DESIGN REFERENCE MANDATE (Zero Changes Without Permission):**
> The reference Dashboard UI and its supporting components are strictly locked. No edits or restyling without explicit user permission. They serve as the single source of truth for designing all future FactoryOS UI components.

> [!IMPORTANT]
> **Golden Rule of Attachments:** All future Stitch reference screens and wireframes define **CONTENT, DATA, AND FUNCTIONALITY ONLY**. Visual layout, geometry, spacing, typography, pills, badges, and card styling must strictly adhere to the FactoryOS Benchmark Design Rules below.

---

## 1. Foundations

- **Canvas & Shell:** Soft off-white canvas (`#F8FAFA` / `#F5F7F8`), floating app shell, pure white elevated cards (`#FFFFFF`, `rounded-2xl`, `border border-[#EBF1F5]`).
- **Core 3 Brand Colors (Source of Truth — 60-30-10 Ratio):**
  - **Midnight Navy (`#002941`):** 60% Primary brand, high-contrast headings & tabular metrics, active nav pills, dark contrast surfaces, checkboxes, profit/production chart bars.
  - **Pale Mint (`#CFE8E1`):** 30% Fresh accent, completed status pills, secondary accent buttons, sub-card wells, positive progress tracks, trend delta badges.
  - **Coral Orange (`#FD6E6E`):** 10–15% Action/attention accent, pending status badges, loss/expense chart bars, threshold alerts, spending highlights, notification dots.
- **Master Multi-Stop Gradients:**
  - *Navy Hero Gradient:* `bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E]`
  - *Coral Hero Gradient:* `bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]`
  - *Mint Hero Gradient:* `bg-gradient-to-br from-[#103530] via-[#184E46] to-[#2D8576]`
- **Pill Architecture:** `rounded-full` for all action buttons, segmented navigation tabs, search inputs, tags, micro-badges, and progress bars.
- **Diffused Ambient Elevation:** Zero harsh outlines; soft ambient elevation (`box-shadow: 0 4px 20px -2px rgba(0, 41, 65, 0.04), 0 2px 6px -1px rgba(0, 41, 65, 0.02)`).
- **Spatial Rhythm:** Consistent **14px (`gap-3.5` / `space-y-3.5`)** layout rhythm across all card grids, vertical stacks, and columns.
- **Card Padding:** `p-5 sm:p-6` for standard cards, `p-3.5 sm:p-4` for compact sub-cards.
- **Typography & Tabular Numbers:** Clean geometric sans-serif (Plus Jakarta Sans / Inter). Every number, currency figure, and metric must use `tabular-nums`.
- **Semantic Status System (Dot + Label Pattern):**
  - `completed`: Dot `#2D8576`, Text `#184E46`, Pill Bg `#E4F4F0`
  - `inProgress`: Dot `#002941`, Text `#002941`, Pill Bg `#DFECF3`, Border `#BDD7E7`
  - `pending`: Dot `#FFFFFF` (Pill) / Coral (Dot), Text `#FFFFFF`, Pill Bg Coral Gradient (`from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]`)
  - `issue`: Dot `#D62727`, Text `#871919`, Pill Bg `#FFE6E4`, Border `#FD6E6E`/60
- **The 60-30-10 Tripartite Rule for Data Breakdowns:** When visualizing 3-part breakdowns or tier pipelines (e.g. `ClientTierPipelineCard`), strictly assign Tier 1 (Dominant ~60%) to Midnight Navy, Tier 2 (Secondary ~30%) to Pale Mint, and Tier 3 (Accent ~10%) to Coral Orange. Never use generic muted gray for the 3rd tier.
- **Entity & Card 1:1 Theming Rule:** Maintain 1:1 color harmony across Avatar chip, Progress Bar, Status Badge, and Action buttons:
  - *Urgent / Awaiting QC (`coral`):* Coral avatar gradient, Coral progress bar (`variant="coral"`), Coral pill badge (`#FFEBE9`), Coral action button (`variant="coral"`), and `text-[#FD6E6E]` due dates.
  - *Active Machining / Completed (`mint`):* Mint avatar gradient, Mint progress bar (`variant="mint"`), Mint pill badge (`#E2F3EC`), Mint action button.
  - *Standard Assembly / Neutral (`navy`):* Navy avatar gradient, Navy progress bar (`variant="navy"`), Cool gray/navy pill badge (`#F0F5F9`).
- **Common Separate Reusable Components:** Everything must be built as standalone, modular components under `src/components/common/`.
- **Universal Mobile Browser Responsiveness:** Mobile browsers (phone and tablet) are first-class targets. Responsive single-column stacking down to 360px viewport width with no horizontal overflow, touch targets >= 44px–48px, horizontal table scroll wrappers, sticky header, and bottom floating pill actions.
- **Gujarati/Hindi font fallback and text expansion support (20–30% text growth).**

---

## 2. Core Benchmark Components

1. **Floating Left Icon Dock / Rail (`FloatingIconDock.tsx`):**
   - Dual-state in-flow navigation dock:
     - *Collapsed Rail (Idle):* `72px` width (`w-16 sm:w-[72px] px-2 items-center`), with all primary icon centers pinned to $X = 36\text{px}$.
     - *Expanded Full Sidebar (Hover / Locked):* Smoothly expands in-flow to `256px` (`w-64 px-2.5 bg-[#F8FAFA] border-r border-[#DFECF3]`) using `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`.
   - In-Flow Layout Push: The expanding dock dynamically pushes and resizes the sibling content view (`flex-1 min-w-0`); floating overlays that occlude dashboard content or header navigation are strictly prohibited.
   - Stationary Coordinate Lock ($X$ and $Y$ Invariance): All primary navigation icons (`Dashboard`, `Calendar`, `Messages`, `Documents`, `Team`, `Inventory`, `Settings`) maintain identical $(X, Y)$ pixel coordinates across both states ($X = 36\text{px}$ dedicated anchor box, $Y$ stability via `h-[148px]` top container, `py-2.5`, `gap-2`). Expansion is strictly horizontal.
   - Brand Capsule Badge Wrapper: Elevated white badge container (`bg-white border border-[#DFECF3] shadow-xs`): 48×48px in collapsed mode, widening to a unified capsule enclosing the logo and "FactoryOS — SMART MANUFACTURING" title in expanded mode.
   - Drawer Controls: Canonical panel toggle icons (`menu_open` for collapse, `dock_to_left` for keep-open / lock), never generic pin icons.
   - Classic Bottom Utility Pill: Collapsed mode preserves the classic pill capsule (`rounded-full p-1 bg-white border border-[#DFECF3] shadow-xs`) with centered 32×32px circular buttons for Help & Support and Sign Out.
   - Responsive: `hidden md:flex` (hidden on mobile phone screens).

2. **Top Navigation Bar (`DashboardHeader.tsx`):**
   - Sticky backdrop blur container (`sticky top-0 z-10 bg-[#F8FAFA]/95 backdrop-blur-md`).
   - Mobile brand pill fallback (`flex md:hidden`).
   - Segmented Pill Navigation (`SegmentedPillNav.tsx`): `bg-white p-1 rounded-full border border-[#EBF1F5]`, active Navy gradient pill (`from-[#002941] via-[#0C3953] to-[#164E6E]`), swipeable on mobile.
   - Right Action Capsule: Search, notification dot, info buttons.
   - User Profile Pill: Avatar circle with active dot, user name, and coral role chip (`ADMIN`).

3. **The 4-Card Archetype System (`KpiMetricCard.tsx`):**
   - *Hero Command Card:* Midnight Navy gradient (`from-[#002941] via-[#0C3953] to-[#164E6E]`), white typography, mint trend delta pill (`bg-[#CFE8E1] text-[#002941]`).
   - *Subtle Coral Attention/Expense Card:* Pale coral surface (`bg-[#FFF4F3] border-[#FFD0CC]`), coral icon circle, white trend badge with coral text and border.
   - *Subtle Mint Freshness/Savings Card:* Pale mint surface (`bg-[#F4FAF8] border-[#CFE8E1]`), mint icon circle, white trend badge with mint text and border.
   - *Standard White Elevation Card:* Pure white surface (`bg-white border-[#EBF1F5]`), slate icon circle, mint trend badge.

4. **Action Buttons (`PillButton.tsx`):**
   - Strict `rounded-full` capsule geometry.
   - Variants:
     - `primary`: Midnight Navy multi-stop gradient (`bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white`)
     - `coral`: Coral Orange multi-stop gradient (`bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white`)
     - `mintGradient`: Dark Mint multi-stop gradient (`bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576] text-white`)
     - `accent`: Solid Pale Mint (`bg-[#CFE8E1] text-[#002941] hover:bg-[#A8D7CC]`)
     - `secondary`: Soft cool neutral (`bg-[#F0F5F9] text-[#002941] hover:bg-[#DFECF3]`)
     - `ghost`: Transparent with hairline border (`bg-transparent text-[#566E7F] border border-[#DFECF3] hover:bg-[#F0F5F9]`)

5. **Modern Data Table (`DataTable.tsx`):**
   - Subtle uppercase headers (`bg-[#F8FAFA] text-[11px] font-semibold text-[#8DA1AF] rounded-lg`).
   - Custom rounded row checkboxes (`w-4 h-4 rounded-[4px]`, Navy checked state with white checkmark).
   - Activity icon badge column (`w-6 h-6 rounded-md`).
   - Tabular numeric price/quantity columns (`tabular-nums font-semibold text-[#002941]`).
   - Status dot column (`StatusDotBadge variant="dotOnly"`).
   - Smooth row hover (`transition-colors hover:bg-[#F8FAFA] divide-y divide-[#EBF1F5]/70`).
   - Mobile safety: Wrapped in `overflow-x-auto` to prevent viewport stretching.

6. **Two-Tone Stacked Bar Charts (`IncomeChartCard.tsx`):**
   - High-contrast visual pairs: Top Profit bar (`rounded-t-lg bg-gradient-to-b from-[#164E6E] via-[#0C3953] to-[#002941]`), 0.5px white separation divider, and Bottom Loss bar (`rounded-b-xs bg-gradient-to-b from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]`).
   - Faint dotted horizontal gridlines (`border-b border-dashed border-[#DFECF3]`) and monospace Y-axis numbers.
   - Floating dark navy tooltip (`bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white rounded-xl shadow-lg`).
   - Clean Contained Perimeter: Prohibit protruding chevron or arrow buttons floating across outer card borders. All pagination or controls remain cleanly inside card headers.

7. **Capsule Progress Bar (`PillProgressBar.tsx`):**
   - Track: `rounded-full bg-[#DFECF3]/70 overflow-hidden` (or `bg-white/20` inside dark hero cards).
   - Variants:
     - `navy` / `heroNavy`: `bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E]`
     - `mint` / `heroMint`: `bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576]`
     - `coral` / `heroCoral`: `bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] shadow-[0_1px_4px_rgba(253,110,110,0.3)]`
   - Height scale: `sm` (`h-1.5` for compact nested wells), `md` (`h-2.5` standard), `lg` (`h-3.5` hero).
   - Dual labels: Left muted description + right bold navy tabular metric.

8. **Nested Sub-Cards / Micro-Wells & 4-Stat Data Grids:**
   - Standard 4-Stat Grid: `bg-[#F8FAFA] border border-[#DFECF3] rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs`.
   - Uppercase labels (`text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider`).
   - Bold tabular numbers (`font-bold text-[#002941] tabular-nums mt-0.5`).
   - Monospace PO tag badges (`px-2 py-0.5 rounded-md bg-[#F0F5F9] border border-[#DFECF3] text-[#002941] font-mono text-[11px] font-semibold tabular-nums`).
   - `rounded-xl` mini-cards for wallets, batches, or machines with flag/icon, code, balance, and mini status dot.
   - Selected state: `bg-white border-[#BDD7E7] ring-1 ring-[#BDD7E7]/40 shadow-xs`.
   - Unselected state: `bg-[#F8FAFA] border-[#DFECF3] hover:border-[#CBD6DF]`.

9. **Dialogs & Modals Standard (`NewPurchaseOrderModal.tsx`, etc.):**
   - Backdrop overlay: `bg-[#002941]/40 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4`.
   - Container: Pure white `rounded-[28px] sm:rounded-[32px] bg-white border border-[#DFECF3] shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden`.
   - Header with elevated close button (`w-8 h-8 rounded-full bg-[#F0F5F9] hover:bg-[#DFECF3] text-[#002941]`).
   - Sticky action footer (`p-4 bg-[#F8FAFA] border-t border-[#DFECF3] flex items-center justify-end gap-2.5 rounded-b-[28px] sm:rounded-b-[32px]`).

10. **Search & Filter Toolbar (`PillSearch.tsx`, `PillButton.tsx`):**
    - Pill search bar (`rounded-full bg-[#F0F5F9] border border-[#DFECF3] focus-within:border-[#002941] focus-within:bg-white`).
    - Pill ghost filter button with icon.

11. **Status Badges & Dots (`StatusDotBadge.tsx`):**
    - `pill` variant (colored pill container + dot + text).
    - `dotOnly` variant (6px colored dot + text).

12. **Job card with due date, progress bar, and status badge.**
13. **Employee attendance row with large status selector pills.**
14. **Numeric quantity field with unit suffix (e.g. `kg`, `pcs`).**
15. **Needs-attention alert card (Subtle Coral card with coral icon circle).**
16. **Activity feed item with icon container, title, timestamp, and chevron.**
17. **Daily report card with key production summaries.**
18. **Empty state with calm illustration and one helpful PillButton CTA.**
19. **Toast/snackbar notification pill.**
20. **Confirmation dialog with destructive confirmation.**
21. **Offline/pending-sync banner with retry queue count.**

---

## 3. Comprehensive State Matrix

For each component:

| State | Visual Treatment | Example Tailwind Token / Class |
| :--- | :--- | :--- |
| **Default** | Resting elevation, hairline border, core brand colors | `bg-white border border-[#EBF1F5] shadow-[0_4px_20px_-2px_rgba(0,41,65,0.04)]` |
| **Hover / Focus** | Subtle background shift, elevated shadow, border tint | `hover:border-[#BDD7E7] hover:bg-[#F0F5F9] focus-within:border-[#002941]` |
| **Active / Pressed** | Deeper tone, subtle scale reduction or active gradient | `active:from-[#001827] active:to-[#0C3953] active:scale-[0.98]` |
| **Selected** | Solid brand gradient, crisp white text, or ring highlight | `bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-sm ring-1 ring-[#BDD7E7]/40` |
| **Disabled** | 50% opacity, non-interactive cursor | `disabled:opacity-50 disabled:cursor-not-allowed` |
| **Loading** | Pulse skeleton or subtle spinner inside pill button | `animate-pulse bg-[#DFECF3] rounded-full` |
| **Success / Completed**| Pale Mint surface, Mint 600 dot, Mint 800 high-contrast text | `bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1]` |
| **Warning / Alert / Loss** | Subtle Coral surface, Coral dot/gradient, high-contrast dark text | `bg-[#FFF4F3] border border-[#FFD0CC] text-[#871919]` |
| **Empty State** | Calm off-white well, friendly helper text, one primary Pill CTA | `bg-[#F8FAFA] border border-dashed border-[#DFECF3] p-8 rounded-2xl` |

---

## 4. Interaction Details

- Destructive actions require confirmation dialogs.
- Form errors appear directly next to the field and in a concise summary if multiple.
- Save buttons show progress state and prevent duplicate submissions.
- Numeric fields show explicit units (`kg`, `pcs`, `m`) and sensible examples.
- Tables support search/filter without overwhelming the screen.
- Status must NEVER rely on color alone (always combine colored dot with text).
- Offline queue records show pending count and last successful sync timestamp.
- On mobile browsers, all high-frequency actions expand to full-width or float in a bottom pill bar.

---

## 5. What to Avoid

- Tiny < 12px primary text.
- Icon-only important controls without text or accessible tooltips.
- Dense, unpadded legacy ERP tables with harsh dark borders.
- Flat, dull monochrome interfaces without brand accents.
- Fake real-time machine telemetry or fabricated metrics.
- Confusing ERP acronyms (MRP, WIP, BOM, SKU) in primary workflows.
- Horizontal page breaking on mobile phone screens (< 360px).
