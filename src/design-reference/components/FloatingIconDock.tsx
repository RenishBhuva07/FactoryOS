import React, { useState, useRef, useEffect } from "react";

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
  brandName?: string;
  className?: string;
  items?: DockItem[];
}

const DEFAULT_MAIN_ITEMS: DockItem[] = [
  { id: "dashboard", icon: "grid_view", label: "Dashboard" },
  { id: "calendar", icon: "calendar_today", label: "Calendar" },
  {
    id: "messages",
    icon: "chat_bubble_outline",
    label: "Messages",
    badge: true,
  },
  { id: "documents", icon: "description", label: "Documents" },
  { id: "team", icon: "group", label: "Team" },
  { id: "inventory", icon: "inventory_2", label: "Inventory" },
  { id: "settings", icon: "settings", label: "Settings" },
];

export const FloatingIconDock: React.FC<FloatingIconDockProps> = ({
  activeId,
  onSelect,
  isDarkMode = false,
  onToggleTheme,
  brandName = "FactoryOS",
  className = "",
  items = DEFAULT_MAIN_ITEMS,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isExpanded = isPinned || isHovered;

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 120);
  };

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
      aria-label="Sidebar Navigation"
      aria-expanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`h-screen py-3.5 flex flex-col justify-between shrink-0 select-none z-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto overflow-x-hidden ${
        isExpanded
          ? "w-64 px-2.5 bg-[#F8FAFA] border-r border-[#DFECF3]"
          : "w-16 sm:w-[72px] px-2 items-center bg-transparent border-r border-transparent"
      } ${className}`}
    >
      <div className="flex flex-col items-center w-full h-[148px] shrink-0 justify-start">
        {isExpanded ? (
          <div className="w-full flex flex-col gap-2.5">
            <div className="flex items-center justify-between w-full gap-2">
              <div
                className="flex items-center gap-2.5 bg-white border border-[#DFECF3] rounded-2xl py-1.5 px-2.5 shadow-xs cursor-pointer group hover:border-[#BDD7E7] transition-all min-w-0 flex-1"
                title={brandName}
                onClick={() => onSelect("dashboard")}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[19px]">
                    trending_up
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold tracking-tight text-[#002941] truncate leading-tight">
                    {brandName}
                  </span>
                  <span className="text-[9px] font-semibold text-[#566E7F] tracking-wider uppercase truncate leading-tight">
                    SMART MANUFACTURING
                  </span>
                </div>
              </div>

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
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex flex-col items-center gap-1 cursor-pointer group"
              title={brandName}
              onClick={() => onSelect("dashboard")}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#DFECF3] shadow-xs flex items-center justify-center group-hover:border-[#BDD7E7] transition-all">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[19px]">
                    trending_up
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold tracking-tight bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] bg-clip-text text-transparent select-none">
                {brandName}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-1 rounded-full bg-white border border-[#DFECF3] shadow-xs">
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
        className={`my-auto rounded-2xl bg-white border border-[#DFECF3] shadow-[0_4px_20px_-2px_rgba(0,41,65,0.06)] transition-[width,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-2 py-2.5 ${
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
              className={`relative rounded-xl h-10 flex items-center transition-all duration-150 cursor-pointer overflow-hidden ${
                isExpanded ? "w-full pr-2.5" : "w-10 justify-center"
              } ${
                isActive
                  ? "bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-[0_4px_12px_rgba(0,41,65,0.25)]"
                  : "text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9]"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
              </div>

              <span
                className={`text-xs sm:text-[13px] font-semibold truncate whitespace-nowrap transition-all duration-200 ${
                  isActive ? "text-white" : "text-[#566E7F]"
                } ${
                  isExpanded
                    ? "opacity-100 max-w-[125px] ml-1"
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
              onClick={() => onSelect("help")}
              title="Help & Support"
              className="w-full h-9 px-1 rounded-xl flex items-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition-colors cursor-pointer"
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
              onClick={() => onSelect("logout")}
              title="Sign out"
              className="w-full h-9 px-1 rounded-xl flex items-center text-[#566E7F] hover:text-[#FD6E6E] hover:bg-[#FFF4F3] border border-transparent hover:border-[#FFD0CC] transition-colors cursor-pointer"
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
          <div className="flex flex-col items-center gap-1.5 p-1 rounded-full bg-white border border-[#DFECF3] shadow-xs">
            <button
              type="button"
              onClick={() => onSelect("help")}
              title="Help & Support"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                help_outline
              </span>
            </button>
            <button
              type="button"
              onClick={() => onSelect("logout")}
              title="Sign out"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#8DA1AF] hover:text-[#FD6E6E] hover:bg-[#FFF4F3] border border-transparent hover:border-[#FFD0CC] transition-colors cursor-pointer"
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
