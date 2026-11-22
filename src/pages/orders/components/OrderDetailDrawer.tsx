import React from 'react';
import { PillButton, PillProgressBar } from '../../../components/common';
import type { OrderCommitment } from '../../../types/orders';

export interface OrderDetailDrawerProps {
  order: OrderCommitment | null;
  isOpen: boolean;
  onClose: () => void;
  onFastTrackQc?: (order: OrderCommitment) => void;
  onDispatchStaging?: (order: OrderCommitment) => void;
  onIssueJobCard?: (order: OrderCommitment) => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  isOpen,
  onClose,
  onFastTrackQc,
  onDispatchStaging,
  onIssueJobCard,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#002941]/35 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-[#DFECF3] animate-in slide-in-from-right duration-250 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#002941] to-[#0C3953] text-[#CFE8E1] flex items-center justify-center font-bold text-sm shadow-xs">
              {order.clientInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#002941]">{order.poNumber}</h2>
                <span
                  className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === 'in_machining'
                      ? 'bg-[#CFE8E1] text-[#184E46]'
                      : order.status === 'awaiting_qc'
                      ? 'bg-[#FD6E6E]/15 text-[#AB1B1B]'
                      : 'bg-[#002941] text-white'
                  }`}
                >
                  {order.statusLabel}
                </span>
              </div>
              <p className="text-xs text-[#566E7F]">{order.clientName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-5 flex-1">
          {/* Commercial & Delivery Milestone */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3]">
            <div>
              <p className="text-[11px] text-[#566E7F] font-semibold">Contract Value</p>
              <p className="text-lg font-bold text-[#002941] tabular-nums mt-0.5">
                {order.currencySymbol}
                {order.contractValue.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#566E7F] font-semibold">Promised Dispatch Due</p>
              <p
                className={`text-xs font-bold mt-1 ${
                  order.isDispatchUrgent ? 'text-[#AB1B1B]' : 'text-[#002941]'
                }`}
              >
                {order.dispatchDue}
              </p>
            </div>
          </div>

          {/* Production Progress */}
          <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#002941]">Spindle Progress</span>
              <span className="font-bold text-[#184E46] tabular-nums">
                {order.progressPercent}% ({Math.round((order.quantity * order.progressPercent) / 100)} / {order.quantity} {order.unit})
              </span>
            </div>
            <PillProgressBar
              value={order.progressPercent}
              max={100}
              variant={order.isDispatchUrgent ? 'coral' : 'mint'}
              height="md"
            />
          </div>

          {/* 4-Stage Lifecycle Tracker */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#002941] uppercase tracking-wider">
              Manufacturing &amp; Fulfillment Lifecycle
            </h3>

            <div className="space-y-2 border-l-2 border-[#DFECF3] pl-4 ml-2">
              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#2D8576] ring-4 ring-white" />
                <p className="text-xs font-bold text-[#002941]">Stage 1: Purchase Order &amp; Spec Signed</p>
                <p className="text-[11px] text-[#566E7F]">Technical drawing approved • Client PO confirmed</p>
              </div>

              <div className="relative pt-2">
                <span className="absolute -left-[23px] top-3 w-3 h-3 rounded-full bg-[#2D8576] ring-4 ring-white" />
                <p className="text-xs font-bold text-[#002941]">Stage 2: Raw Material BOM Allocation</p>
                <p className="text-[11px] text-[#566E7F]">EN8 Carbon Steel Rounds (50mm) staged at Bay A-12</p>
              </div>

              <div className="relative pt-2">
                <span
                  className={`absolute -left-[23px] top-3 w-3 h-3 rounded-full ${
                    order.status === 'in_machining' ? 'bg-[#002941] animate-ping' : 'bg-[#2D8576]'
                  } ring-4 ring-white`}
                />
                <p className="text-xs font-bold text-[#002941]">Stage 3: CNC Machining &amp; Turning</p>
                <p className="text-[11px] text-[#566E7F]">
                  Assigned to <span className="font-semibold text-[#002941]">{order.assignedMachine}</span>
                </p>
              </div>

              <div className="relative pt-2">
                <span
                  className={`absolute -left-[23px] top-3 w-3 h-3 rounded-full ${
                    order.status === 'awaiting_qc'
                      ? 'bg-[#FD6E6E] animate-pulse'
                      : 'bg-[#DFECF3]'
                  } ring-4 ring-white`}
                />
                <p className="text-xs font-bold text-[#002941]">Stage 4: Quality Inspection &amp; Gate Pass</p>
                <p className="text-[11px] text-[#566E7F]">
                  {order.needsQc
                    ? 'Batch requires lead quality signature before gate pass issuance.'
                    : 'Awaiting completion of remaining spindle cycle.'}
                </p>
              </div>
            </div>
          </div>

          {/* Part Specifications Card */}
          <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-2">
            <h4 className="text-xs font-bold text-[#002941]">Part Technical Specifications</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[#8DA1AF]">Part Description:</span>
                <p className="font-semibold text-[#002941]">{order.partDescription}</p>
              </div>
              <div>
                <span className="text-[#8DA1AF]">Order Batch Quantity:</span>
                <p className="font-semibold text-[#002941]">{order.quantity.toLocaleString('en-IN')} {order.unit}</p>
              </div>
              <div>
                <span className="text-[#8DA1AF]">Tolerance Limit:</span>
                <p className="font-semibold text-[#002941]">ISO Grade +/- 0.02 mm</p>
              </div>
              <div>
                <span className="text-[#8DA1AF]">Assigned Workstation:</span>
                <p className="font-semibold text-[#002941]">{order.assignedMachine}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#DFECF3] bg-[#F8FAFA] space-y-2 sticky bottom-0">
          {order.status !== 'ready_for_dispatch' && order.status !== 'completed' && onIssueJobCard && (
            <PillButton
              type="button"
              variant="secondary"
              size="md"
              className="w-full text-xs font-semibold bg-white border border-[#DFECF3]"
              icon={<span className="material-symbols-outlined text-[17px]">assignment_add</span>}
              onClick={() => {
                onClose();
                onIssueJobCard(order);
              }}
            >
              Issue Production Job Card
            </PillButton>
          )}

          {order.needsQc ? (
            <PillButton
              type="button"
              variant="coral"
              size="md"
              className="w-full text-xs font-bold shadow-xs"
              icon={<span className="material-symbols-outlined text-[17px]">verified</span>}
              onClick={() => {
                onClose();
                onFastTrackQc?.(order);
              }}
            >
              Fast-Track Quality Clearance
            </PillButton>
          ) : (
            <PillButton
              type="button"
              variant="primary"
              size="md"
              className="w-full text-xs font-bold shadow-xs"
              icon={<span className="material-symbols-outlined text-[17px]">local_shipping</span>}
              onClick={() => {
                onClose();
                onDispatchStaging?.(order);
              }}
            >
              Stage for Outbound Dispatch Challan
            </PillButton>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-[#566E7F] hover:text-[#002941] text-center cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailDrawer;
