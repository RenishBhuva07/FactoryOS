import React from "react";
import { PillButton } from "../../../components/common";
import type { OfflineProductionSlip } from "../../../types/factoryStore";

export interface OfflineQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  queue: OfflineProductionSlip[];
  onSync: () => void;
}

export const OfflineQueueModal: React.FC<OfflineQueueModalProps> = ({
  isOpen,
  onClose,
  queue,
  onSync,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-[#DFECF3] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FD6E6E]/15 text-[#AB1B1B] flex items-center justify-center">
              <span className="material-symbols-outlined text-[19px]">
                cloud_off
              </span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#002941]">
                Offline Production Queue
              </h2>
              <p className="text-[11px] text-[#566E7F]">
                {queue.length} slip{queue.length === 1 ? "" : "s"} cached
                locally in browser storage
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-[#8DA1AF] hover:text-[#002941] hover:bg-white flex items-center justify-center transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 max-h-80 overflow-y-auto space-y-2.5">
          {queue.length === 0 ? (
            <div className="p-6 text-center space-y-1">
              <span className="material-symbols-outlined text-[32px] text-[#2D8576]">
                cloud_done
              </span>
              <p className="text-xs font-bold text-[#002941]">Queue is empty</p>
              <p className="text-[11px] text-[#566E7F]">
                All production slips have been synchronized.
              </p>
            </div>
          ) : (
            queue.map((slip) => (
              <div
                key={slip.id}
                className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#002941]">
                      {slip.jobCard}
                    </span>
                    <span className="text-[10px] text-[#8DA1AF]">
                      • {slip.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#566E7F] mt-0.5">
                    {slip.machine}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-[#184E46] bg-[#CFE8E1] px-2 py-0.5 rounded-full text-[11px]">
                    +{slip.goodUnits} pcs
                  </span>
                  {slip.scrapUnits > 0 && (
                    <p className="text-[10px] text-[#AB1B1B] font-semibold mt-0.5">
                      {slip.scrapUnits} scrap ({slip.defectReason})
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between gap-3">
          <PillButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs font-bold"
          >
            Close
          </PillButton>

          {queue.length > 0 && (
            <PillButton
              type="button"
              variant="mintGradient"
              size="sm"
              onClick={() => {
                onSync();
                onClose();
              }}
              icon={
                <span className="material-symbols-outlined text-[17px]">
                  sync
                </span>
              }
              className="text-xs font-bold"
            >
              Sync All Slips Now
            </PillButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineQueueModal;
