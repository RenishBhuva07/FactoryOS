import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayout } from '../../context';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleMobileMenu } = useLayout();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'grid_view', path: '/dashboard' },
    { id: 'orders', label: 'Orders', icon: 'shopping_bag', path: '/orders' },
    { id: 'workbench', label: 'Workbench', icon: 'smartphone', path: '/workbench', isPill: true },
    { id: 'production', label: 'Production', icon: 'factory', path: '/production' },
    { id: 'more', label: 'Modules', icon: 'menu', isAction: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#DFECF3] shadow-[0_-4px_20px_rgba(0,41,65,0.06)] px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const isActive = item.path
          ? item.path === '/dashboard'
            ? location.pathname === '/dashboard'
            : location.pathname.startsWith(item.path)
          : false;

        if (item.isAction) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={toggleMobileMenu}
              className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 text-[#566E7F] hover:text-[#002941] active:scale-95 transition"
            >
              <span className="material-symbols-outlined text-[21px]">menu</span>
              <span className="text-[10px] font-bold mt-0.5">Modules</span>
            </button>
          );
        }

        if (item.isPill) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => item.path && navigate(item.path)}
              className="flex flex-col items-center justify-center -mt-3.5 min-w-[56px] group"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#002941] text-[#CFE8E1] ring-2 ring-[#CFE8E1]'
                    : 'bg-gradient-to-br from-[#002941] to-[#0C3953] text-[#CFE8E1]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <span
                className={`text-[9.5px] font-bold mt-1 ${
                  isActive ? 'text-[#002941]' : 'text-[#566E7F]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => item.path && navigate(item.path)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition active:scale-95 ${
              isActive ? 'text-[#002941]' : 'text-[#8DA1AF] hover:text-[#566E7F]'
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-7 rounded-full transition ${
                isActive ? 'bg-[#E4F4F0] text-[#184E46]' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </div>
            <span
              className={`text-[10px] font-semibold mt-0.5 ${
                isActive ? 'font-bold text-[#002941]' : ''
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
