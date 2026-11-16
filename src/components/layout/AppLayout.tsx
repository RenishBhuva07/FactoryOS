import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useLayout } from '../../context';
import {
  FloatingIconDock,
  CommandPaletteModal,
  NotificationsDrawer,
  WhatsAppDigestModal,
} from '../common';
import type { DockItem } from '../common';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';
import { MobileBottomNav } from './MobileBottomNav';

const FACTORY_SIDEBAR_ITEMS: DockItem[] = [
  { id: 'overview', icon: 'grid_view', label: 'Overview' },
  { id: 'orders', icon: 'shopping_bag', label: 'Orders' },
  { id: 'orders-management', icon: 'assignment', label: 'Orders Management' },
  { id: 'production', icon: 'factory', label: 'Production' },
  { id: 'production-logs', icon: 'receipt_long', label: 'Production Logs' },
  { id: 'machines', icon: 'precision_manufacturing', label: 'Machines' },
  { id: 'inventory', icon: 'inventory_2', label: 'Inventory' },
  { id: 'team', icon: 'groups', label: 'Team & Attendance' },
  { id: 'quality', icon: 'verified', label: 'Quality' },
  { id: 'dispatch', icon: 'local_shipping', label: 'Dispatch' },
  { id: 'reports', icon: 'bar_chart', label: 'Reports' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate('/', { replace: true });
  };

  const getActiveDockId = (): string => {
    const path = location.pathname;
    if (path.startsWith('/orders-management')) return 'orders-management';
    if (path.startsWith('/orders')) return 'orders';
    if (path.startsWith('/production-logs')) return 'production-logs';
    if (path.startsWith('/production')) return 'production';
    if (path.startsWith('/machines')) return 'machines';
    if (path.startsWith('/inventory')) return 'inventory';
    if (path.startsWith('/team')) return 'team';
    if (path.startsWith('/quality')) return 'quality';
    if (path.startsWith('/dispatch')) return 'dispatch';
    if (path.startsWith('/reports')) return 'reports';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/help')) return 'help';
    return 'overview';
  };

  const handleDockSelect = (id: string) => {
    switch (id) {
      case 'orders':
        navigate('/orders');
        break;
      case 'orders-management':
        navigate('/orders-management');
        break;
      case 'production':
        navigate('/production');
        break;
      case 'production-logs':
        navigate('/production-logs');
        break;
      case 'machines':
        navigate('/machines');
        break;
      case 'inventory':
        navigate('/inventory');
        break;
      case 'team':
        navigate('/team');
        break;
      case 'quality':
        navigate('/quality');
        break;
      case 'dispatch':
        navigate('/dispatch');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        navigate('/help');
        break;
      case 'overview':
      case 'dashboard':
      default:
        navigate('/dashboard');
        break;
    }
  };

  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isWhatsAppDigestOpen,
    setIsWhatsAppDigestOpen,
  } = useLayout();

  return (
    <div className="w-full h-screen overflow-hidden flex bg-[#F8FAFA] antialiased font-sans relative">
      <FloatingIconDock
        items={FACTORY_SIDEBAR_ITEMS}
        activeId={getActiveDockId()}
        onSelect={handleDockSelect}
        onHelp={() => navigate('/help')}
        onSignOut={handleSignOut}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        brandName="FactoryOS"
        className="hidden md:flex"
      />
      <div className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden flex flex-col pb-16 md:pb-0">
        <Outlet />
      </div>

      {/* Mobile Drawer & Bottom Navigation */}
      <MobileNavigationDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <MobileBottomNav />

      {/* Global Modals */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <WhatsAppDigestModal
        isOpen={isWhatsAppDigestOpen}
        onClose={() => setIsWhatsAppDigestOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
