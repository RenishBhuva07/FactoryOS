import React, { useState } from 'react';
import { Card } from '../../../components/common';
import type { MaintenanceTask } from '../../../types/machines';

export interface PreventativeMaintenanceTableProps {
  tasks: MaintenanceTask[];
  onViewMonthlyPlan?: () => void;
  className?: string;
}

export const PreventativeMaintenanceTable: React.FC<PreventativeMaintenanceTableProps> = ({
  tasks,
  onViewMonthlyPlan,
  className = '',
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(tasks.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Card padding="none" className={`flex flex-col overflow-hidden ${className}`}>
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941]">
              Weekly Preventative Maintenance Schedule
            </h2>
            <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
              Scheduled MSME servicing, oil top-ups, lubrication, and tool replacement timeline.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {selectedIds.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#002941] text-[#CFE8E1]">
              {selectedIds.length} Selected
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF1F5] text-[#002941]">
            Week 42 • Oct 2024
          </span>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs min-w-[620px]">
          <thead className="bg-[#F8FAFA] text-[#566E7F] font-bold uppercase tracking-wider text-[11px] border-b border-[#DFECF3]">
            <tr>
              <th className="py-3 px-4 sm:px-5 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all maintenance tasks"
                  checked={tasks.length > 0 && selectedIds.length === tasks.length}
                  onChange={handleSelectAll}
                  className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Machine</th>
              <th className="py-3 px-4">Task Description</th>
              <th className="py-3 px-4">Frequency</th>
              <th className="py-3 px-4">Assigned Tech</th>
              <th className="py-3 px-4 sm:px-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DFECF3]">
            {tasks.map((task) => {
              const isSelected = selectedIds.includes(task.id);

              return (
                <tr
                  key={task.id}
                  className={`transition-colors ${
                    isSelected ? 'bg-[#F0F5F9]' : 'hover:bg-[#F8FAFA]/80'
                  }`}
                >
                  <td className="py-3 px-4 sm:px-5">
                    <input
                      type="checkbox"
                      aria-label={`Select task ${task.machine}`}
                      checked={isSelected}
                      onChange={() => handleToggleSelect(task.id)}
                      className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4 font-bold text-[#002941]">
                    {task.machine}
                  </td>
                  <td className="py-3 px-4 text-[#566E7F]">
                    {task.taskDescription}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#002941]">
                    {task.frequency}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#566E7F]">
                    {task.assignedTech}
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-right">
                    {task.status === 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#CFE8E1] text-[#103530]">
                        Completed
                      </span>
                    )}
                    {task.status === 'in_progress' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DFECF3] text-[#002941]">
                        In Progress
                      </span>
                    )}
                    {task.status === 'scheduled' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0F5F9] text-[#566E7F]">
                        Scheduled
                      </span>
                    )}
                    {task.status === 'due_tomorrow' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF4F3] border border-[#FFD0CC] text-[#FD6E6E]">
                        Due Tomorrow
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 sm:p-4 border-t border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between text-xs">
        <span className="text-[#566E7F] font-medium">
          3 tasks pending this week • 1 completed
        </span>
        <button
          type="button"
          onClick={onViewMonthlyPlan}
          className="text-xs font-bold text-[#002941] hover:underline cursor-pointer flex items-center gap-1"
        >
          View Monthly Maintenance Plan
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </button>
      </div>
    </Card>
  );
};
