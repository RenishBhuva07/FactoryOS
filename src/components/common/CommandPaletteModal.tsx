import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Page' | 'Order' | 'Machine' | 'Inventory' | 'Team';
  icon: string;
  route: string;
  badge?: string;
  badgeColor?: 'mint' | 'coral' | 'navy';
}

const SEARCH_REGISTRY: SearchItem[] = [
  // Core Pages
  { id: 'page-overview', title: 'Dashboard Overview', subtitle: 'Factory KPI pulse, hourly output, attention alerts', category: 'Page', icon: 'grid_view', route: '/dashboard' },
  { id: 'page-workbench', title: 'Supervisor Mobile Workbench', subtitle: '60-second shift output entry, worker attendance, downtime', category: 'Page', icon: 'smartphone', route: '/workbench', badge: 'MOBILE PWA', badgeColor: 'mint' },
  { id: 'page-orders', title: 'Customer Orders & Commitments', subtitle: 'Purchase orders, client tiers, contract values', category: 'Page', icon: 'shopping_bag', route: '/orders' },
  { id: 'page-orders-mgmt', title: 'Job Cards & Line Scheduling', subtitle: 'Shopfloor execution matrix, BOM readiness', category: 'Page', icon: 'assignment', route: '/orders-management' },
  { id: 'page-production', title: 'Production Floor & Shifts', subtitle: 'Active assembly lines, hourly shift logging', category: 'Page', icon: 'factory', route: '/production' },
  { id: 'page-production-logs', title: 'Production Logs & Sign-Offs', subtitle: 'Digital shift slips, scrap audit trail', category: 'Page', icon: 'receipt_long', route: '/production-logs' },
  { id: 'page-machines', title: 'Machines Fleet & Maintenance', subtitle: 'Workstations, OEE status, breakdown tickets', category: 'Page', icon: 'precision_manufacturing', route: '/machines' },
  { id: 'page-inventory', title: 'Stores & Raw Material Stock', subtitle: 'Stock master, safety reorder limits, bin cards', category: 'Page', icon: 'inventory_2', route: '/inventory' },
  { id: 'page-team', title: 'Team & Shopfloor Attendance', subtitle: 'Biometric roster, station coverage, overtime register', category: 'Page', icon: 'groups', route: '/team' },
  { id: 'page-quality', title: 'Quality Control & Inspections', subtitle: 'Batch inspections, defect root causes, calibration', category: 'Page', icon: 'verified', route: '/quality' },
  { id: 'page-dispatch', title: 'Outbound Dispatch & Challans', subtitle: 'Staged shipments, E-Way bills, bay tracking', category: 'Page', icon: 'local_shipping', route: '/dispatch' },
  { id: 'page-reports', title: 'Plant Reports & Analytics', subtitle: 'OEE trends, executive dossier, shift efficiency', category: 'Page', icon: 'bar_chart', route: '/reports' },
  { id: 'page-settings', title: 'Factory Settings & Parameters', subtitle: 'Subscription plan, shift timings, API keys', category: 'Page', icon: 'settings', route: '/settings' },
  { id: 'page-help', title: 'Help & Support Concierge', subtitle: 'Video guides, WhatsApp support, FAQs', category: 'Page', icon: 'support_agent', route: '/help' },

  // Orders
  { id: 'ord-1048', title: 'PO #ORD-1048 — Tata Motors Ancillary', subtitle: '1,200 pcs • CNC Machined Valve Guides • Line 01', category: 'Order', icon: 'shopping_bag', route: '/orders', badge: 'IN MACHINING', badgeColor: 'mint' },
  { id: 'ord-1042', title: 'PO #ORD-1042 — Mahindra Transmission', subtitle: '450 pcs • Forged Spindle Shafts • Line 02', category: 'Order', icon: 'shopping_bag', route: '/orders', badge: 'AWAITING QC', badgeColor: 'coral' },
  { id: 'ord-1039', title: 'PO #ORD-1039 — Bharat Forge Components', subtitle: '800 pcs • Precision Flanges • Line 04', category: 'Order', icon: 'assignment', route: '/orders-management', badge: 'BOM DELAY', badgeColor: 'coral' },

  // Machines
  { id: 'mac-01', title: 'CNC Turning Center 01 (M-01)', subtitle: 'Operator: Rajesh Sharma • PO #1048 • 94.2% Uptime', category: 'Machine', icon: 'precision_manufacturing', route: '/machines', badge: 'OPERATIONAL', badgeColor: 'mint' },
  { id: 'mac-04', title: 'VMC Milling Center 04 (M-04)', subtitle: 'Spindle Lubrication in progress • Tech: Suresh Bhai', category: 'Machine', icon: 'build', route: '/machines', badge: 'MAINTENANCE', badgeColor: 'coral' },

  // Inventory
  { id: 'inv-01', title: 'EN8 Carbon Steel Rounds (50mm)', subtitle: 'SKU: RM-STEEL-001 • Bin A-12 • Stock: 1,840 kg', category: 'Inventory', icon: 'inventory_2', route: '/inventory', badge: 'NORMAL', badgeColor: 'mint' },
  { id: 'inv-02', title: 'Carbide Turning Inserts CNMG-120408', subtitle: 'SKU: TL-CARB-042 • Bin T-04 • Stock: 18 pcs', category: 'Inventory', icon: 'warning', route: '/inventory', badge: 'LOW STOCK', badgeColor: 'coral' },

  // Team
  { id: 'team-01', title: 'Rajesh Bhai Patel', subtitle: 'Plant Proprietor & Director • Apex Engineering Works', category: 'Team', icon: 'person', route: '/settings', badge: 'OWNER', badgeColor: 'navy' },
  { id: 'team-02', title: 'Mahesh Solanki', subtitle: 'Shift A Supervisor • Mobile Passlink Active', category: 'Team', icon: 'supervisor_account', route: '/workbench', badge: 'SUPERVISOR', badgeColor: 'mint' },
];

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return SEARCH_REGISTRY.slice(0, 8);
    }
    const q = query.toLowerCase();
    return SEARCH_REGISTRY.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    handleClose();
    navigate(item.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl border border-[#DFECF3] shadow-[0_20px_60px_-15px_rgba(0,41,65,0.25)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#DFECF3] bg-[#F8FAFA]/80">
          <span className="material-symbols-outlined text-[22px] text-[#002941]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search orders, machines, stock SKUs, people, or jump to page..."
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-[#002941] placeholder-[#8DA1AF] focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-bold text-[#566E7F] hover:text-[#002941] px-2 py-1 rounded-full bg-[#EBF3F7] transition"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-[#DFECF3] text-[10px] font-bold text-[#566E7F] shadow-2xs">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2.5 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl cursor-pointer transition select-none ${
                    isSelected
                      ? 'bg-[#E4F4F0] border border-[#CFE8E1]'
                      : 'hover:bg-[#F0F5F9] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                        isSelected
                          ? 'bg-[#002941] text-[#CFE8E1]'
                          : 'bg-[#F0F5F9] text-[#566E7F]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-[#002941] truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8DA1AF]">
                          • {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#566E7F] truncate">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${
                          item.badgeColor === 'coral'
                            ? 'bg-[#FD6E6E]/15 text-[#AB1B1B] border border-[#FD6E6E]/30'
                            : item.badgeColor === 'mint'
                            ? 'bg-[#CFE8E1] text-[#184E46] border border-[#A6D5C9]'
                            : 'bg-[#002941] text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span className="material-symbols-outlined text-[18px] text-[#8DA1AF]">
                      chevron_right
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-2">
              <span className="material-symbols-outlined text-3xl text-[#8DA1AF]">manage_search</span>
              <p className="text-sm font-bold text-[#002941]">No matching records found</p>
              <p className="text-xs text-[#566E7F]">
                Try searching with PO number, machine code, worker name, or page title.
              </p>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between text-[11px] text-[#566E7F]">
          <div className="flex items-center gap-3">
            <span>
              Navigate <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#DFECF3] text-[9px] font-bold">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#DFECF3] text-[9px] font-bold">↓</kbd>
            </span>
            <span>
              Select <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#DFECF3] text-[9px] font-bold">↵</kbd>
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="font-bold text-[#002941] hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandPaletteModal;
