# Stitch Prompt — P1 Operational Modules

Design consistent screens for the following modules, reusing FactoryOS design tokens and components.

## Machines
- Machine directory with code, name, work area, status.
- Issue list with severity, machine, reported time, open/resolved state.
- Report issue form.
- Issue detail with timeline, resolution notes, downtime duration.
- Explicitly show that status is manually reported, not sensor-connected.

## Inventory
- Stock overview with item, available quantity, unit, reorder threshold.
- Low-stock filter.
- Item detail with movement ledger.
- Receive stock, issue/consume stock, return, adjustment.
- Every movement shows reference, actor, timestamp.
- Adjustment requires reason.
- No direct “edit stock balance” screen.

## Quality
- Inspection queue.
- Inspection form with inspected, accepted, rejected, rework quantities.
- Defect category selector.
- Inspection history and defect trend.
- Clear quantity reconciliation.

## Dispatch
- Orders ready for dispatch.
- Order detail showing accepted available quantity and remaining quantity.
- Create dispatch form.
- Dispatch history and partial dispatch status.
- Confirmation before dispatch record is committed.

## Design rule
Only show P1 modules in navigation when enabled for that factory. If disabled, explain how to enable rather than showing empty nonfunctional screens.
