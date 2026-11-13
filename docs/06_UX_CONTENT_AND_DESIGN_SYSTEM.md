# 06 — UX Content & Design System

## 1. Executive Visual Principle: The FactoryOS Benchmark Standard

FactoryOS follows a clean, calm, and production-grade design benchmark, canonically implemented in [`DashboardPage.tsx`](file:///Users/renishbhuva/Documents/Development/React_Js/FactoryOS/src/pages/dashboard/DashboardPage.tsx). The interface feels like a high-end, bespoke operating system: uncluttered, softly elevated, generous in breathing room, and effortlessly intuitive for non-technical factory owners and supervisors across both desktop displays and mobile phone/tablet browsers.

It eliminates dense legacy ERP tables, harsh borders, overwhelming data grids, and noisy decorative elements in favor of smooth rounded geometry, floating pill navigation, tactile card architecture, and intentional accent pops.

---

## 2. The Golden Rule of Reference Attachments

> [!IMPORTANT]
> **Separation of Content vs. Visual Execution:**
> Whenever the user provides current or future UI attachments, screenshots, Stitch prototypes, or wireframes:
> 1. **Content & Functional Scope Only:** Attachments serve *exclusively* to specify what content, domain metrics, form fields, workflow steps, and actions are required.
> 2. **FactoryOS Benchmark Design System Governs All Visuals:** Never copy clunky layouts, dated ERP tables, harsh dark borders, or raw unstyled elements from reference attachments.
> 3. **Universal Production Finish:** Every screen must be synthesized and re-imagined into the clean, rounded, softly shadowed, pill-accented benchmark design rules specified in this document and modeled in `DashboardPage.tsx`.

---

## 3. Core Brand Colors & Tonal Scales

FactoryOS is anchored by **3 primary brand colors** across all screens, states, and components, balanced via the strict **60-30-10 production ratio**:

| Brand Color | Hex Code | Visual Character | System Role & Distribution |
| :--- | :--- | :--- | :--- |
| **MIDNIGHT NAVY** | `#002941` | Deep oceanic authority, grounded ink | **60% Dominant Anchor:** Primary typography, active navigation pills, floating dock icons, dark card contrast surfaces, primary CTA buttons, table checkboxes, profit/production chart bars |
| **PALE MINT** | `#CFE8E1` | Fresh, serene, clean pastel mint | **30% Secondary Freshness:** Success/Completed badges, secondary button accent, sub-card wells, positive progress tracks, mint gradient buttons, trend delta badges |
| **CORAL ORANGE** | `#FD6E6E` | Energetic, warm, eye-catching salmon-coral | **10–15% Active Accent:** High-energy action buttons, loss/expense/downtime chart bars, pending status badges, threshold alerts, spending highlights, attention cards, notification dots |

### 3.1 Extended Tonal Scales (Derived Mathematically)
All additional colors used throughout the app are derived strictly and harmoniously from these 3 anchors (centralized in `src/colors.tsx` and `src/constants/colors.ts`):

- **Midnight Navy Scale (`navy`):**
  - `navy-50`: `#F0F5F9` (Soft cool canvas wash / secondary pill button background / input background)
  - `navy-100`: `#DFECF3` (Nested wells, hairline borders, chart gridlines)
  - `navy-200`: `#BDD7E7` (Selected borders & hairline rings)
  - `navy-300`: `#8EBED7`
  - `navy-400`: `#579FC3`
  - `navy-500`: `#3381AB` (Medium steel accent)
  - `navy-600`: `#22668C`
  - `navy-700`: `#164E6E` (Deep oceanic surface / gradient stop)
  - `navy-800`: `#0C3953` (Intermediate gradient stop)
  - `navy-900`: `#002941` **[CORE MIDNIGHT NAVY]** (Headings, primary text, dark active pills, checkboxes)
  - `navy-950`: `#001827` (Deepest ink / active press states)

- **Pale Mint Scale (`mint`):**
  - `mint-50`: `#F4FAF8` (Ultra-light card well background)
  - `mint-100`: `#E4F4F0` (Completed/active status pill background)
  - `mint-200`: `#CFE8E1` **[CORE PALE MINT]** (Brand accent pill, progress fill, badge border)
  - `mint-300`: `#A8D7CC`
  - `mint-400`: `#74BFB0`
  - `mint-500`: `#43A392` (Vibrant mint for chart bars and positive metrics)
  - `mint-600`: `#2D8576` (Status dot for completed/active items)
  - `mint-700`: `#20675C`
  - `mint-800`: `#184E46` (High-contrast text on mint surfaces)
  - `mint-900`: `#103530` (Mint dark gradient start stop)
  - `mint-950`: `#0A221F`

- **Coral Orange Scale (`coral`):**
  - `coral-50`: `#FFF4F3` (Alert / attention well background & Coral icon container)
  - `coral-100`: `#FFE6E4` (Pending / exception badge background)
  - `coral-200`: `#FFD0CC` (Soft alert & chip border)
  - `coral-300`: `#FFAAA3` (Gradient transition tint)
  - `coral-400`: `#FD6E6E` **[CORE CORAL ORANGE]** (Active action accent, loss/expense bar fill, pending status dot, alert accent)
  - `coral-500`: `#F04646` (Critical action / gradient mid-stop)
  - `coral-600`: `#D62727` (Issue status dot)
  - `coral-700`: `#AB1B1B` (Gradient end stop / high-contrast text on coral surfaces)
  - `coral-800`: `#871919` (High-contrast text on coral badge backgrounds)
  - `coral-900`: `#6B1717`

### 3.2 Master Multi-Stop Gradients Matrix
All rich colored elements (hero cards, primary buttons, chart bars, and dock indicators) use multi-stop gradients with intentional depth:

1. **Midnight Navy Hero Gradient:**
   - Linear 135°: `linear-gradient(135deg, #002941 0%, #0C3953 50%, #164E6E 100%)`
   - Tailwind Class: `bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E]`
   - Bar Chart Vertical: `bg-gradient-to-b from-[#164E6E] via-[#0C3953] to-[#002941]`
   - Glow Shadow: `0 10px 25px -5px rgba(0, 41, 65, 0.3)`
2. **Coral Orange Hero Gradient:**
   - Linear 135°: `linear-gradient(135deg, #FD6E6E 0%, #F04646 50%, #AB1B1B 100%)`
   - Tailwind Class: `bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]`
   - Bar Chart Vertical: `bg-gradient-to-b from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]`
   - Glow Shadow: `0 10px 25px -5px rgba(253, 110, 110, 0.35)`
3. **Pale Mint Hero Gradient:**
   - Linear 135°: `linear-gradient(135deg, #103530 0%, #184E46 50%, #2D8576 100%)`
   - Tailwind Class: `bg-gradient-to-br from-[#103530] via-[#184E46] to-[#2D8576]`
   - Secondary Chart Tint: `linear-gradient(180deg, #CFE8E1 0%, #74BFB0 50%, #43A392 100%)`
   - Glow Shadow: `0 10px 25px -5px rgba(45, 133, 118, 0.25)`

### 3.3 Semantic Status System (`StatusDotBadge.tsx`)
Never communicate status by color alone. Always pair a colored dot with legible text:

| Status Key | Dot Spec | Pill Background | Text Color & Weight | Border | Meaning in FactoryOS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `completed` | `#2D8576` (Mint 600) | `#E4F4F0` (Mint 100) | `#184E46` (Mint 800) font-medium | None | Order Complete, Job Finished, Normal Inspection, Machine Running |
| `inProgress` | `#002941` (Navy 900) | `#DFECF3` (Navy 100) | `#002941` (Navy 900) font-medium | `#BDD7E7` | Job Active, Shift Underway, In Production |
| `pending` | `#FFFFFF` (Pill) / Coral Grad (Dot) | `bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]` | `#FFFFFF` font-semibold | Transparent | Pending Verification, Needs Supervisor Signoff, Overdue Alert |
| `issue` | `#D62727` (Coral 600) | `#FFE6E4` (Coral 100) | `#871919` (Coral 800) font-medium | `#FD6E6E`/60 | Machine Breakdown, Quality Rejection, Safety Issue |

---

## 4. Visual Foundations & Geometry Tokens

### 4.1 Surface & Canvas Hierarchy
- **Outer Canvas:** Soft cool off-white (`#F8FAFA` / `#F5F7F8`). Pure white cards float naturally on top without needing harsh borders.
- **Island App Shell:** The dashboard container sits comfortably within a viewport shell with independent scrolling and zero horizontal shift.
- **Primary Card Surface:** Crisp, pure white (`#FFFFFF`) cards with `rounded-2xl` (20px) and delicate hairline borders (`border border-[#EBF1F5]`).
- **Sub-Cards / Micro-Wells:** Nested sub-widgets (e.g., wallet chips, machine cards, input wells) sit inside primary cards with soft off-white fills (`bg-[#F8FAFA]` or Pale Mint tint `bg-[#F4FAF8]`), hairline borders (`border border-[#DFECF3]`), and `rounded-xl` (12px).
- **The 4-Card Archetype System (`KpiMetricCard.tsx`):**
  1. *Hero Command Card:* Rich Navy gradient (`bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E]`), white typography, mint trend delta pill (`bg-[#CFE8E1] text-[#002941]`).
  2. *Subtle Attention/Expense Card:* Pale coral surface (`bg-[#FFF4F3] border-[#FFD0CC]`), coral icon circle, white trend pill with coral border and text.
  3. *Subtle Freshness/Savings Card:* Pale mint surface (`bg-[#F4FAF8] border-[#CFE8E1]`), mint icon circle, white trend pill with mint border and dark text.
  4. *Standard Elevation Card:* Crisp pure white surface (`bg-white border-[#EBF1F5]`), slate icon circle, mint trend pill.

### 4.2 Spatial Rhythm & Layout Gaps
- **Standard Spatial Rhythm:** A uniform **14px (`gap-3.5` / `space-y-3.5`)** spacing scale is maintained across all card grids, vertical stacks, and layout columns.
- **Card Internal Padding:**
  - `sm`: `p-3.5 sm:p-4` (Compact sub-cards, mobile micro-widgets)
  - `md`: `p-5 sm:p-6` (Standard cards across all dashboard modules)
  - `lg`: `p-6 sm:p-8` (Prominent hero sections / modals)

### 4.3 Elevation & Shadows
- **Standard Card Ambient Elevation:** `box-shadow: 0 4px 20px -2px rgba(0, 41, 65, 0.04), 0 2px 6px -1px rgba(0, 41, 65, 0.02)`
- **Floating Dock & Navigation Elevation:** `box-shadow: 0 4px 20px -2px rgba(0, 41, 65, 0.06)`
- **Navy Hero Card Glow:** `box-shadow: 0 10px 25px -5px rgba(0, 41, 65, 0.3)`
- **Coral Hero / Alert Glow:** `box-shadow: 0 10px 25px -5px rgba(253, 110, 110, 0.35)`
- **Mint Hero Glow:** `box-shadow: 0 10px 25px -5px rgba(45, 133, 118, 0.25)`
- **Hairline Borders:** Borders are kept to delicate hairlines (`border border-[#EBF1F5]` or `border border-[#DFECF3]`). Harsh, dark borders are strictly prohibited.

### 4.4 Corner Radius Hierarchy
- **Outer Shell / Modal Containers:** `rounded-[32px]` (32px)
- **Primary Cards:** `rounded-2xl` (20px)
- **Nested Sub-Cards & Metric Wells:** `rounded-xl` (12px)
- **Interactive Controls (The Pill Standard):** `rounded-full` for all buttons, tabs, search inputs, tags, badges, chips, and progress bars.
- **Table Checkboxes:** `rounded-[4px]`.
- **Table Activity Icon Badges:** `rounded-md` (6px).

### 4.5 Typography & Tabular Numbers
- **Font Stack:** Clean, modern geometric / neo-grotesque sans-serif (Plus Jakarta Sans, Inter, -apple-system) with tight heading tracking.
- **Mandatory Tabular Numbers:** Every numerical quantity, currency figure, percentage, time stamp, batch code, and metric **MUST** include `tabular-nums`.
- **Typographic Scale:**
  - Page Greeting / Hero Headline: `text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]`
  - Page Subtitle: `text-xs sm:text-sm font-normal text-[#566E7F]`
  - Section Headings: `text-base sm:text-lg font-bold text-[#002941] tracking-tight`
  - Overlines / Secondary Labels: `text-xs sm:text-sm font-semibold text-[#566E7F]`
  - Hero Metrics / KPI Numbers: `text-2xl sm:text-3xl font-bold tracking-tight tabular-nums text-[#002941]` (or `text-white` on Hero cards)
  - Micro-Labels / Table Headers / Monospace: `text-[10px]` or `text-[11px] font-semibold text-[#8DA1AF]`
  - Trend Indicators / Deltas: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold` with directional arrows `↑` / `↓`.

---

## 5. Reusable Common Components Architecture

> [!IMPORTANT]
> **Modular & Reusable Code Mandate:**
> All UI across the entire project must be built out of common, standalone, single-responsibility components in `src/components/common/`. Never write monolithic, hard-coded, or copy-pasted layout blocks.

Every screen is assembled from this shared component suite:

1. **`Card` (`src/components/common/Card.tsx`)**:
   - Encapsulates `rounded-2xl` geometry, ambient shadow, and consistent padding props (`none`, `sm`, `md`, `lg`).
   - Variants: `default` (pure white), `subtle` (`#F8FAFA`), `subtleMint`, `subtleCoral`, `heroNavy`, `heroCoral`, `heroMint`.

2. **`PillButton` (`src/components/common/PillButton.tsx`)**:
   - Strict `rounded-full` capsule geometry with icon support (`left` or `right`).
   - Sizes: `sm` (`text-xs px-3.5 py-1.5`), `md` (`text-xs sm:text-sm px-5 py-2.5`), `lg` (`text-sm sm:text-base px-6 py-3`).
   - Variants:
     - `primary`: Midnight Navy multi-stop gradient (`bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white`)
     - `coral`: Coral Orange multi-stop gradient (`bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white`)
     - `mintGradient`: Dark Mint multi-stop gradient (`bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576] text-white`)
     - `accent`: Solid Pale Mint (`bg-[#CFE8E1] text-[#002941] hover:bg-[#A8D7CC]`)
     - `secondary`: Soft cool neutral (`bg-[#F0F5F9] text-[#002941] hover:bg-[#DFECF3]`)
     - `ghost`: Transparent with hairline border (`bg-transparent text-[#566E7F] border border-[#DFECF3] hover:bg-[#F0F5F9]`)

3. **`SegmentedPillNav` (`src/components/common/SegmentedPillNav.tsx`)**:
   - Capsule container (`bg-white p-1 rounded-full border border-[#EBF1F5] shadow-xs inline-flex`).
   - Active Tab: Solid Midnight Navy gradient pill (`bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white rounded-full px-4 sm:px-5 py-2 text-xs font-semibold shadow-sm`).
   - Inactive Tab: Smooth text label (`text-[#566E7F] hover:text-[#002941] px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition`).
   - Badge support: Optional pill count badge (`bg-[#CFE8E1] text-[#002941]` when active; `bg-[#DFECF3] text-[#002941]` when inactive).

4. **`FloatingIconDock` (`src/components/common/FloatingIconDock.tsx`)**:
   - Slim vertical rail (`72px` width, `py-3.5 px-2 select-none flex flex-col items-center justify-between`).
   - Responsive behavior: Visible on desktop/tablet (`md:flex`), hidden on mobile browsers (`hidden md:flex`).
   - Three functional tiers:
     1. Top: Brand icon box (`w-10 h-10 rounded-2xl bg-gradient-to-br from-[#002941]...`) + Theme toggle pill switch.
     2. Center: Navigation cluster (`py-3 px-2 rounded-2xl bg-white border border-[#DFECF3] shadow-md`) with active elevation pill and notification bubble.
     3. Bottom: Utility cluster (Help, Logout with alert hover).

5. **`StatusDotBadge` (`src/components/common/StatusDotBadge.tsx`)**:
   - Supports both `pill` (dot + colored background pill) and `dotOnly` (dot + text) modes across all 4 semantic states (`completed`, `inProgress`, `pending`, `issue`).

6. **`KpiMetricCard` (`src/components/common/KpiMetricCard.tsx`)**:
   - Title, bold tabular metric, icon chip, and directional delta trend badge.
   - Variant switch between pure white card, subtle tint cards (coral/mint), and hero gradient cards.

7. **`DataTable` (`src/components/common/DataTable.tsx`)**:
   - Subtle uppercase headers (`bg-[#F8FAFA] text-[11px] font-semibold text-[#8DA1AF] rounded-lg`).
   - Custom rounded row checkboxes (`w-4 h-4 rounded-[4px] cursor-pointer`). Checked state: `bg-[#002941] border border-[#002941] text-white shadow-2xs`.
   - Activity icon badge column (`w-6 h-6 rounded-md flex items-center justify-center`).
   - Tabular numeric price/quantity columns (`tabular-nums font-semibold text-[#002941]`).
   - Status dot column (`StatusDotBadge variant="dotOnly"`).
   - Smooth row hover (`transition-colors hover:bg-[#F8FAFA] divide-y divide-[#EBF1F5]/70`).

8. **`PillInput` & `PillSearch` (`src/components/common/PillInput.tsx`)**:
   - `rounded-full` input fields (`bg-[#F0F5F9] border border-[#DFECF3] focus-within:border-[#002941] focus-within:bg-white`) with optional leading/trailing icons.

9. **`PillProgressBar` (`src/components/common/PillProgressBar.tsx`)**:
   - Capsule track (`rounded-full bg-[#DFECF3]/70 overflow-hidden h-2.5`) with bold Navy, Mint, or Coral progress fill (`rounded-full h-full`) and dual-label markers below.

---

## 6. Charts & Data Visualization

- **Two-Tone Stacked Rounded Bar Charts (`IncomeChartCard.tsx`):**
  - High-contrast visual pairs:
    - **Positive / Production / Profit:** Top bar capped with `rounded-t-lg bg-gradient-to-b from-[#164E6E] via-[#0C3953] to-[#002941]`.
    - **Separation Divider:** Razor-thin white horizontal bar (`w-full h-0.5 bg-white shrink-0 shadow-xs`) separating stacked values cleanly.
    - **Negative / Expenses / Losses / Downtime:** Bottom bar capped with `rounded-b-xs bg-gradient-to-b from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]`.
  - Hover Micro-Interactions: Bars elevate and brighten on hover (`group-hover:shadow-[0_4px_12px_rgba(...)]`).
  - Ultra-Faint Dotted Gridlines: `border-b border-dashed border-[#DFECF3]` with right-aligned monospace Y-axis figures (`50k`, `40k`, etc.).
  - Floating Dark Tooltip: Navy gradient container (`bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white text-[10px] py-1.5 px-3 rounded-xl shadow-[0_8px_20px_-4px_rgba(0,41,65,0.4)] border border-white/10`) with mint header (`text-[#CFE8E1] font-bold`) and indicator dots.
  - Carousel Pagination Chevron: Floating circular arrow button on card edge (`w-8 h-8 rounded-full bg-white border border-[#DFECF3] text-[#002941] shadow-md hover:bg-[#F0F5F9]`).

---

## 7. Universal Mobile Browser Responsiveness Standard

FactoryOS is designed from the ground up to **open and perform flawlessly in mobile phone and tablet web browsers** (Chrome on Android, Safari on iOS) as well as desktop viewports. Both the Owner Overview and the Supervisor Workbench must provide an app-like, responsive experience in any mobile browser without horizontal page-breaking or unusable micro-elements.

### 7.1 Viewport Constraints & Non-Breaking Layouts
- **Minimum Supported Viewport:** Full layout integrity down to **360px width** (typical compact Android phone) without horizontal body scrolling (`overflow-x-hidden`).
- **Single-Column Stacking Rhythm:**
  - Desktop 12-column layouts (`grid-cols-1 lg:grid-cols-12 gap-3.5`) gracefully collapse to single-column card stacks (`grid-cols-1 gap-3.5`) on mobile screens.
  - Sub-grid mini cards (e.g. 3-column wallet cards or 2-column KPI pairs) stack cleanly into single columns (`grid-cols-1 sm:grid-cols-3` or `grid-cols-1 sm:grid-cols-2`).

### 7.2 Mobile Navigation Adaptations
- **Left Dock Hiding:** The left `FloatingIconDock` is hidden on mobile screens (`hidden md:flex`).
- **Sticky Mobile Header:**
  - The `DashboardHeader` remains sticky at the top (`sticky top-0 z-10 bg-[#F8FAFA]/95 backdrop-blur-md`).
  - Displays a compact mobile brand pill (`flex md:hidden items-center gap-2`) with the 32px rounded icon box.
  - Segmented navigation tabs enable smooth horizontal finger swiping (`overflow-x-auto max-w-full py-0.5 scrollbar-none`).
  - User profile pill collapses to a compact avatar-only or short-name badge on narrow screens (`hidden sm:block` for email).
- **Floating Bottom Pill Bar for High-Frequency Actions:**
  - For supervisor flows and high-frequency mobile actions, primary CTAs sit in a floating capsule pill at the bottom of the viewport with safe-area padding.

### 7.3 Touch Targets & Finger Ergonomics
- **Minimum Touch Target:** All interactive controls, pill buttons, icon buttons, and navigation tabs must maintain a **minimum touch target of 44px–48px** (or generous padding preventing mis-taps).
- **Full-Width Mobile Action Buttons:** High-frequency primary actions (e.g., *Add Production*, *Mark Attendance*, *Report Problem*) expand to full-width `rounded-full` pills on mobile (`w-full py-3`).
- **Table Mobile Horizontal Scroll Safety:** Data tables are wrapped in safe horizontal overflow containers (`w-full overflow-x-auto`) with fixed row heights and sticky column accents, preventing the parent page from stretching or zooming out.
- **Large Numeric Inputs:** Number entry fields on mobile feature dedicated large keypad-friendly triggers with prominent unit suffixes (e.g., `kg`, `pcs`, `meters`).

---

## 8. Localization & Content

- **Launch Languages:** English, Gujarati, and Hindi.
- **Text Expansion Tolerance:** Layouts, pill tabs, and buttons must accommodate **20–30% longer text strings** without clipping, overlapping, or breaking card bounds.
- **Tone & Plain Language:** Use approachable terminology (*“Today's work”*, *“Add production”*, *“Report problem”*, *“Needs attention”*). Avoid dense ERP acronyms (OEE, MRP, WIP, SKU) in primary workflows.
- **Missing Data Rule:** Never display `0` when data has not been recorded; explicitly display *“Not recorded”* or *“—”*.
