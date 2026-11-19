import React from "react";
import { useNavigate } from "react-router-dom";
import { BrandLogo } from "../../../components/common";

export interface WorkbenchHeaderProps {
  supervisorName?: string;
  shiftLabel?: string;
  factoryName?: string;
  isOffline?: boolean;
  onToggleOffline?: () => void;
  lang?: "en" | "gu" | "hi";
  onLanguageChange?: (lang: "en" | "gu" | "hi") => void;
  offlineQueueCount?: number;
  onOpenOfflineQueue?: () => void;
}

export const WorkbenchHeader: React.FC<WorkbenchHeaderProps> = ({
  supervisorName = "Mahesh Solanki",
  shiftLabel = "Shift A (08:00 - 16:30)",
  factoryName = "Apex Engineering Works",
  isOffline = false,
  onToggleOffline,
  lang = "en",
  onLanguageChange,
  offlineQueueCount = 0,
  onOpenOfflineQueue,
}) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-[#DFECF3] px-4 py-3 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BrandLogo
            variant="plain"
            size="sm"
            onClick={() => navigate("/dashboard")}
          />
          <div className="hidden xs:block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#184E46] bg-[#CFE8E1] px-2 py-0.5 rounded-full">
              Supervisor PWA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#F0F5F9] border border-[#DFECF3] rounded-full p-0.5 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => onLanguageChange?.("en")}
              className={`px-2 py-0.5 rounded-full transition ${
                lang === "en"
                  ? "bg-[#002941] text-white shadow-xs"
                  : "text-[#566E7F]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange?.("gu")}
              className={`px-2 py-0.5 rounded-full transition ${
                lang === "gu"
                  ? "bg-[#002941] text-white shadow-xs"
                  : "text-[#566E7F]"
              }`}
            >
              ગુજ
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange?.("hi")}
              className={`px-2 py-0.5 rounded-full transition ${
                lang === "hi"
                  ? "bg-[#002941] text-white shadow-xs"
                  : "text-[#566E7F]"
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Offline simulator pill */}
          <button
            type="button"
            onClick={onToggleOffline}
            title="Toggle simulated connection"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold border transition ${
              isOffline
                ? "bg-[#FD6E6E]/15 text-[#AB1B1B] border-[#FD6E6E]/40"
                : "bg-[#E4F4F0] text-[#184E46] border-[#CFE8E1]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOffline ? "bg-[#FD6E6E]" : "bg-[#2D8576] animate-pulse"
              }`}
            />
            <span>{isOffline ? "Offline" : "Live"}</span>
            {offlineQueueCount > 0 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenOfflineQueue?.();
                }}
                className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#AB1B1B] text-white text-[9px] font-bold hover:scale-105"
                title="View queued slips"
              >
                {offlineQueueCount}
              </span>
            )}
          </button>

          {/* Exit to Owner Dashboard */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#002941] text-white text-[11px] font-bold hover:bg-[#0C3953] transition shadow-xs"
          >
            <span className="material-symbols-outlined text-[14px]">
              desktop_windows
            </span>
            <span className="hidden sm:inline">Owner App</span>
          </button>
        </div>
      </div>

      {/* Sub-bar with Supervisor & Factory Context */}
      <div className="max-w-2xl mx-auto mt-2 pt-2 border-t border-[#DFECF3]/60 flex items-center justify-between text-xs text-[#566E7F]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#2D8576]">
            account_circle
          </span>
          <span className="font-bold text-[#002941]">{supervisorName}</span>
          <span>•</span>
          <span className="text-[#2D8576] font-semibold">{shiftLabel}</span>
        </div>
        <span className="truncate max-w-[130px] sm:max-w-none text-[#8DA1AF] font-medium text-[11px]">
          {factoryName}
        </span>
      </div>
    </header>
  );
};

export default WorkbenchHeader;
