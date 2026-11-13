import React from 'react';

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
}

const DEFAULT_MAIN_ITEMS: DockItem[] = [
  { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
  { id: 'calendar', icon: 'calendar_today', label: 'Calendar' },
  { id: 'messages', icon: 'chat_bubble_outline', label: 'Messages', badge: true },
  { id: 'documents', icon: 'description', label: 'Documents' },
  { id: 'team', icon: 'group', label: 'Team' },
  { id: 'inventory', icon: 'inventory_2', label: 'Inventory' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

export const FloatingIconDock: React.FC<FloatingIconDockProps> = ({
  activeId,
  onSelect,
  isDarkMode = false,
  onToggleTheme,
  brandName = 'Finexy',
  className = '',
}) => {
  return (
    <aside
      className={`w-16 sm:w-[72px] h-screen py-3.5 px-2 flex flex-col items-center justify-between shrink-0 select-none z-20 ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-1 cursor-pointer group" title={brandName}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-[0_4px_14px_rgba(0,41,65,0.25)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[22px]">trending_up</span>
          </div>
          <span className="text-[11px] font-bold tracking-tight bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] bg-clip-text text-transparent select-none">
            {brandName}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 p-1 rounded-full bg-white border border-[#DFECF3] shadow-xs mt-1">
          <button
            onClick={onToggleTheme}
            title="Light mode"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              !isDarkMode
                ? 'bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs'
                : 'text-[#8DA1AF] hover:text-[#002941]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">light_mode</span>
          </button>
          <button
            onClick={onToggleTheme}
            title="Dark mode"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isDarkMode
                ? 'bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs'
                : 'text-[#8DA1AF] hover:text-[#002941]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">dark_mode</span>
          </button>
        </div>
      </div>

      <nav className="flex flex-col items-center gap-2.5 my-auto py-3 px-2 rounded-2xl bg-white border border-[#DFECF3] shadow-[0_4px_20px_-2px_rgba(0,41,65,0.06)]">
        {DEFAULT_MAIN_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              title={item.label}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-[0_4px_12px_rgba(0,41,65,0.25)]'
                  : 'text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-1.5 p-1 rounded-full bg-white border border-[#DFECF3] shadow-xs">
        <button
          onClick={() => onSelect('help')}
          title="Help & Support"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">help_outline</span>
        </button>
        <button
          onClick={() => onSelect('logout')}
          title="Sign out"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#8DA1AF] hover:text-[#FD6E6E] hover:bg-[#FFF4F3] border border-transparent hover:border-[#FFD0CC] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
        </button>
      </div>
    </aside>
  );
};

export default FloatingIconDock;

