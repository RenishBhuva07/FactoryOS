import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrandLogo } from '../common';
import { useAuth } from '../../context';

export interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemDef {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string;
  badgeColor?: 'mint' | 'coral' | 'navy';
}

const NAV_ITEMS: NavItemDef[] = [
  { id: 'overview', label: 'Overview', icon: 'grid_view', path: '/dashboard' },
  { id: 'workbench', label: 'Supervisor Workbench', icon: 'smartphone', path: '/workbench', badge: '60s Mobile', badgeColor: 'mint' },
  { id: 'orders', label: 'Orders & Job Cards', icon: 'shopping_bag', path: '/orders' },
  { id: 'production', label: 'Production Floor', icon: 'factory', path: '/production' },
  { id: 'production-logs', label: 'Production Logs', icon: 'receipt_long', path: '/production-logs' },
  { id: 'machines', label: 'Machines Fleet', icon: 'precision_manufacturing', path: '/machines' },
  { id: 'inventory', label: 'Stores Inventory', icon: 'inventory_2', path: '/inventory' },
  { id: 'team', label: 'Team & Attendance', icon: 'groups', path: '/team' },
  { id: 'quality', label: 'Quality & QC', icon: 'verified', path: '/quality' },
  { id: 'dispatch', label: 'Dispatch & Challans', icon: 'local_shipping', path: '/dispatch' },
  { id: 'reports', label: 'Reports & OEE', icon: 'bar_chart', path: '/reports' },
  { id: 'settings', label: 'Factory Settings', icon: 'settings', path: '/settings' },
];

export const MobileNavigationDrawer: React.FC<MobileNavigationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOut = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-[280px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between p-4 border-r border-[#DFECF3] animate-in slide-in-from-left duration-250 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
            <BrandLogo variant="capsule" size="sm" onClick={() => handleNavigate('/dashboard')} />
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:bg-[#F0F5F9] transition"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#E4F4F0] border border-[#CFE8E1] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#2D8576]">
                verified_user
              </span>
              <div>
                <p className="text-[11px] font-bold text-[#184E46]">
                  {user?.factoryName || 'Apex Engineering Works'}
                </p>
                <p className="text-[10px] text-[#2D8576]">
                  {user?.name || 'Rajesh Bhai Patel'} (Owner)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleNavigate('/workbench')}
              className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#002941] text-[#CFE8E1] hover:bg-[#0C3953] transition shrink-0"
            >
              Workbench
            </button>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/dashboard'
                  ? location.pathname === '/dashboard'
                  : location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition select-none ${
                    isActive
                      ? 'bg-[#002941] text-white shadow-xs'
                      : 'text-[#002941] hover:bg-[#F0F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[19px] ${
                        isActive ? 'text-[#CFE8E1]' : 'text-[#566E7F]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#CFE8E1] text-[#002941]'
                          : 'bg-[#CFE8E1]/80 text-[#184E46]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#DFECF3] space-y-2">
          <button
            type="button"
            onClick={() => handleNavigate('/help')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#566E7F] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>Help &amp; Concierge Desk</span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#AB1B1B] hover:bg-[#FD6E6E]/10 transition"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationDrawer;
