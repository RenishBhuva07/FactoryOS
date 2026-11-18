import React, { useState } from 'react';
import { Card, PillButton } from '../../../components/common';
import type { TeamMemberRoster } from '../../../types/team';

export interface ShopfloorRosterTableProps {
  roster: TeamMemberRoster[];
  onAction?: (member: TeamMemberRoster) => void;
  className?: string;
}

export const ShopfloorRosterTable: React.FC<ShopfloorRosterTableProps> = ({
  roster,
  onAction,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = roster.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.assignedStation.toLowerCase().includes(q)
    );
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <Card padding="none" className={`flex flex-col overflow-hidden ${className}`}>
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">groups</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941]">
              Shopfloor Operator & Supervisor Roster
            </h2>
            <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
              Real-time shift station coverage and biometric punch authentication
            </p>
          </div>
          {selectedIds.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#002941] text-[#CFE8E1]">
              {selectedIds.length} Selected
            </span>
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-[#8DA1AF]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search personnel or station..."
            className="w-full h-9 pl-9 pr-3 rounded-full text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] placeholder-[#8DA1AF] focus:outline-none focus:border-[#002941] focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs min-w-[680px]">
          <thead className="bg-[#F8FAFA] text-[#566E7F] font-bold uppercase tracking-wider text-[11px] border-b border-[#DFECF3]">
            <tr>
              <th className="py-3 px-4 sm:px-5 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all team members"
                  checked={filtered.length > 0 && selectedIds.length === filtered.length}
                  onChange={handleSelectAll}
                  className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Operator & Role</th>
              <th className="py-3 px-4">Assigned Station</th>
              <th className="py-3 px-4">Shift</th>
              <th className="py-3 px-4">Punch-in</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DFECF3]">
            {filtered.map((m) => {
              const isSelected = selectedIds.includes(m.id);
              const isAbsent = m.status === 'absent';
              const isOnBreak = m.status === 'on_break';
              const isOvertime = m.status === 'overtime';

              return (
                <tr
                  key={m.id}
                  className={`transition-colors ${
                    isSelected ? 'bg-[#F0F5F9]' : 'hover:bg-[#F8FAFA]/80'
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-5">
                    <input
                      type="checkbox"
                      aria-label={`Select ${m.name}`}
                      checked={isSelected}
                      onChange={() => handleToggleSelect(m.id)}
                      className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#002941] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {m.avatarInitials}
                      </div>
                      <div>
                        <div className="font-bold text-[#002941] text-xs sm:text-[13px]">
                          {m.name}
                        </div>
                        <div className="text-[11px] text-[#566E7F]">
                          {m.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[#002941]">
                    {m.assignedStation}
                  </td>

                  <td className="py-3.5 px-4 text-[#566E7F]">
                    {m.shift}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-[#002941]">
                    {m.punchInTime}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isAbsent
                          ? 'bg-[#FFF4F3] border border-[#FFD0CC] text-[#FD6E6E]'
                          : isOnBreak
                          ? 'bg-[#FFF8E6] text-[#B37400]'
                          : isOvertime
                          ? 'bg-[#DFECF3] text-[#002941]'
                          : 'bg-[#CFE8E1] text-[#103530]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isAbsent ? 'bg-[#FD6E6E]' : isOnBreak ? 'bg-[#C77700]' : isOvertime ? 'bg-[#002941]' : 'bg-[#103530]'
                        }`}
                      />
                      {m.statusLabel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <PillButton
                      variant={isAbsent ? 'coral' : 'ghost'}
                      size="sm"
                      onClick={() => onAction && onAction(m)}
                    >
                      {isAbsent ? 'Assign Reliever' : 'Station Logs'}
                    </PillButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
