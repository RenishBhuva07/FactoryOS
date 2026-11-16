import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AlertItem {
  id: string;
  category: 'urgent' | 'action' | 'info';
  title: string;
  message: string;
  timestamp: string;
  actionText: string;
  route: string;
  isRead: boolean;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'notif-1',
    category: 'urgent',
    title: 'Machine M-04 Spindle Overheating',
    message: 'Bearing temperature exceeded 72°C threshold on Line 02. Automatic coolant cycle triggered.',
    timestamp: '8 mins ago',
    actionText: 'View Machine Fleet',
    route: '/machines',
    isRead: false,
  },
  {
    id: 'notif-2',
    category: 'urgent',
    title: 'PO #ORD-1039 BOM Shortage',
    message: 'Raw material EN8 50mm stock insufficient for upcoming 800 pcs run scheduled for Shift B.',
    timestamp: '25 mins ago',
    actionText: 'Inspect Inventory',
    route: '/inventory',
    isRead: false,
  },
  {
    id: 'notif-3',
    category: 'action',
    title: 'Batch Inspection Sign-Off Ready',
    message: 'Batch #2024-089 (Forged Spindle Shafts, 450 pcs) passed dimensional tolerance. Awaiting lead sign-off.',
    timestamp: '42 mins ago',
    actionText: 'Open QC Register',
    route: '/quality',
    isRead: false,
  },
  {
    id: 'notif-4',
    category: 'action',
    title: '2 Operators Absent — Shift A',
    message: 'Stations CNC-03 and Drill-01 require reliever reallocation before general line startup.',
    timestamp: '1 hour ago',
    actionText: 'Manage Attendance',
    route: '/team',
    isRead: true,
  },
  {
    id: 'notif-5',
    category: 'info',
    title: 'Shift A Production Logged',
    message: 'Supervisor Mahesh recorded 1,420 units output with 18 pcs scrap. 94.6% target achieved.',
    timestamp: '2 hours ago',
    actionText: 'View Shift Slip',
    route: '/production-logs',
    isRead: true,
  },
];

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  if (!isOpen) return null;

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const handleAction = (alert: AlertItem) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alert.id ? { ...a, isRead: true } : a))
    );
    onClose();
    navigate(alert.route);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#002941]/35 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#DFECF3] animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#DFECF3] flex items-center justify-between bg-[#F8FAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#002941] text-[#CFE8E1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#002941]">Factory Alerts &amp; Feed</h2>
              <p className="text-[11px] text-[#566E7F]">
                {unreadCount > 0 ? `${unreadCount} unread operational alerts` : 'All alerts acknowledged'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-[#2D8576] hover:underline"
              >
                Mark all read
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:bg-[#F0F5F9] transition"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {alerts.map((alert) => {
            const isUrgent = alert.category === 'urgent';
            const isAction = alert.category === 'action';
            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-2xl border transition ${
                  !alert.isRead
                    ? isUrgent
                      ? 'bg-[#FD6E6E]/5 border-[#FD6E6E]/40'
                      : isAction
                      ? 'bg-[#E4F4F0]/40 border-[#CFE8E1]'
                      : 'bg-white border-[#DFECF3]'
                    : 'bg-white/70 border-[#E8EFF4]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isUrgent
                          ? 'bg-[#FD6E6E]'
                          : isAction
                          ? 'bg-[#2D8576]'
                          : 'bg-[#002941]'
                      }`}
                    />
                    <h3 className="text-xs font-bold text-[#002941]">{alert.title}</h3>
                  </div>
                  <span className="text-[10px] text-[#8DA1AF] font-medium shrink-0">
                    {alert.timestamp}
                  </span>
                </div>

                <p className="text-xs text-[#566E7F] mt-1 leading-relaxed">
                  {alert.message}
                </p>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#DFECF3]/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8DA1AF]">
                    {alert.category === 'urgent'
                      ? 'Action Required'
                      : alert.category === 'action'
                      ? 'Pending Review'
                      : 'Telemetry'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAction(alert)}
                    className="text-xs font-bold text-[#002941] hover:text-[#2D8576] flex items-center gap-1 transition"
                  >
                    <span>{alert.actionText}</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-[#DFECF3] bg-[#F8FAFA]">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/settings');
            }}
            className="w-full py-2.5 px-4 rounded-full border border-[#DFECF3] bg-white text-xs font-bold text-[#002941] hover:bg-[#F0F5F9] transition shadow-2xs flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Configure WhatsApp &amp; In-App Notification Thresholds</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDrawer;
