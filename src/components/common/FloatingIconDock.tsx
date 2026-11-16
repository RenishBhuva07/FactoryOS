import React, { useState, useRef, useEffect } from "react";
import { BrandLogo } from "./BrandLogo";

export interface DockItem {
  id: string;
  icon: string;
  label: string;
  badge?: boolean;
}

export interface FloatingIconDockProps {
  activeId: string;
  onSelect: (id: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onSignOut?: () => void;
  onHelp?: () => void;
  brandName?: string;
  className?: string;
  items?: DockItem[];
}

const DEFAULT_MAIN_ITEMS: DockItem[] = [
  { id: "overview", icon: "grid_view", label: "Overview" },
  { id: "orders", icon: "shopping_bag", label: "Orders" },
  { id: "orders-management", icon: "assignment", label: "Orders Management" },
  { id: "production", icon: "factory", label: "Production" },
  { id: "production-logs", icon: "receipt_long", label: "Production Logs" },
  { id: "machines", icon: "precision_manufacturing", label: "Machines" },
  { id: "inventory", icon: "inventory_2", label: "Inventory" },
  { id: "team", icon: "groups", label: "Team & Attendance" },
  { id: "quality", icon: "verified", label: "Quality" },
  { id: "dispatch", icon: "local_shipping", label: "Dispatch" },
  { id: "reports", icon: "bar_chart", label: "Reports" },
  { id: "settings", icon: "settings", label: "Settings" },
];

export const FloatingIconDock: React.FC<FloatingIconDockProps> = ({
  activeId,
  onSelect,
  isDarkMode = false,
  onToggleTheme,
  onSignOut,
  onHelp,
  brandName = "FactoryOS",
  className = "",
  items = DEFAULT_MAIN_ITEMS,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isExpanded = isPinned || isHovered;

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseMove = () => {
    if (!isHovered) {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 120);
  };

  useEffect(() => {
    if (asideRef.current && asideRef.current.matches(":hover")) {
      setIsHovered(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsHovered(false);
        setIsPinned(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  return (
    <aside
      ref={asideRef}
      aria-label="Sidebar Navigation"
      aria-expanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-screen py-3.5 flex flex-col justify-between shrink-0 select-none z-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto overflow-x-hidden ${
        isExpanded
          ? "w-64 px-2.5 bg-[#F8FAFA] border-r border-[#DFECF3]"
          : "w-16 sm:w-[72px] px-2 items-center bg-transparent border-r border-transparent"
      } ${className}`}
    >
      <div className="flex flex-col items-center w-full h-[142px] shrink-0 justify-start">
        {isExpanded ? (
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between w-full gap-2">
              <BrandLogo
                variant="capsule"
                size="md"
                brandName={brandName}
                onClick={() => onSelect("dashboard")}
                className="flex-1 min-w-0"
              />

              <button
                type="button"
                onClick={() => setIsPinned(!isPinned)}
                title={isPinned ? "Collapse sidebar" : "Keep sidebar open"}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer border shrink-0 ${
                  isPinned
                    ? "bg-[#002941] text-[#CFE8E1] border-[#002941] shadow-xs"
                    : "bg-white text-[#566E7F] border-[#DFECF3] hover:text-[#002941] hover:bg-[#F0F5F9] shadow-xs"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isPinned ? "menu_open" : "dock_to_left"}
                </span>
              </button>
            </div>

            <div className="w-full flex items-center p-1 rounded-xl bg-white border border-[#DFECF3] shadow-xs gap-1">
              <button
                type="button"
                onClick={onToggleTheme}
                title="Light mode"
                className={`flex-1 h-7 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  !isDarkMode
                    ? "bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs"
                    : "text-[#8DA1AF] hover:text-[#002941]"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  light_mode
                </span>
                <span className="text-[11px]">Light</span>
              </button>
              <button
                type="button"
                onClick={onToggleTheme}
                title="Dark mode"
                className={`flex-1 h-7 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs"
                    : "text-[#8DA1AF] hover:text-[#002941]"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  dark_mode
                </span>
                <span className="text-[11px]">Dark</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <BrandLogo
              variant="iconOnly"
              brandName={brandName}
              onClick={() => onSelect("dashboard")}
            />

            <div className="flex flex-col items-center gap-1 p-1 rounded-full bg-white border border-[#DFECF3] shadow-xs">
              <button
                type="button"
                onClick={onToggleTheme}
                title="Light mode"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  !isDarkMode
                    ? "bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs"
                    : "text-[#8DA1AF] hover:text-[#002941]"
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">
                  light_mode
                </span>
              </button>
              <button
                type="button"
                onClick={onToggleTheme}
                title="Dark mode"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs"
                    : "text-[#8DA1AF] hover:text-[#002941]"
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">
                  dark_mode
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <nav
        className={`my-auto rounded-2xl bg-white border border-[#DFECF3] shadow-[0_4px_20px_-2px_rgba(0,41,65,0.06)] transition-[width,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-1 py-1.5 max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar ${
          isExpanded ? "w-full px-1.5" : "w-[52px] items-center px-1.5"
        }`}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              title={item.label}
              className={`relative rounded-xl h-[37px] flex items-center transition-all duration-150 cursor-pointer overflow-hidden ${
                isExpanded ? "w-full pr-2.5" : "w-10 justify-center"
              } ${
                isActive
                  ? "bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-[0_4px_12px_rgba(0,41,65,0.25)]"
                  : "text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9]"
              }`}
            >
              <div className="w-10 h-[37px] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
              </div>

              <span
                className={`text-xs sm:text-[13px] font-semibold truncate whitespace-nowrap transition-all duration-200 ${
                  isActive ? "text-white" : "text-[#566E7F]"
                } ${
                  isExpanded
                    ? "opacity-100 max-w-[155px] ml-1"
                    : "opacity-0 max-w-0 pointer-events-none"
                }`}
              >
                {item.label}
              </span>

              {item.badge &&
                (isExpanded ? (
                  <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide shrink-0 transition-opacity duration-200 ${
                      isActive
                        ? "bg-[#CFE8E1] text-[#002941]"
                        : "bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs"
                    }`}
                  >
                    3 New
                  </span>
                ) : (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs">
                    3
                  </span>
                ))}
            </button>
          );
        })}
      </nav>

      <div className="w-full shrink-0 flex flex-col items-center mt-auto">
        {isExpanded ? (
          <div className="w-full p-1.5 rounded-2xl bg-white border border-[#DFECF3] shadow-xs flex flex-col gap-1 transition-all duration-300">
            <button
              type="button"
              onClick={() => (onHelp ? onHelp() : undefined)}
              title="Help & Support"
              className="w-full h-8.5 px-1 rounded-xl flex items-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  help_outline
                </span>
              </div>
              <span className="ml-2 text-xs font-semibold text-left truncate whitespace-nowrap">
                Help & Support
              </span>
            </button>
            <button
              type="button"
              onClick={() => (onSignOut ? onSignOut() : undefined)}
              title="Sign out"
              className="w-full h-8.5 px-1 rounded-xl flex items-center text-[#566E7F] hover:bg-gradient-to-br hover:from-[#FD6E6E] hover:via-[#F04646] hover:to-[#AB1B1B] hover:text-white border border-transparent hover:shadow-[0_2px_8px_rgba(253,110,110,0.35)] transition-all cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  logout
                </span>
              </div>
              <span className="ml-2 text-xs font-semibold text-left truncate whitespace-nowrap">
                Sign out
              </span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 p-1 rounded-full bg-white border border-[#DFECF3] shadow-xs">
            <button
              type="button"
              onClick={() => (onHelp ? onHelp() : undefined)}
              title="Help & Support"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                help_outline
              </span>
            </button>
            <button
              type="button"
              onClick={() => (onSignOut ? onSignOut() : undefined)}
              title="Sign out"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#8DA1AF] hover:bg-gradient-to-br hover:from-[#FD6E6E] hover:via-[#F04646] hover:to-[#AB1B1B] hover:text-white border border-transparent hover:shadow-[0_2px_8px_rgba(253,110,110,0.35)] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FloatingIconDock;
