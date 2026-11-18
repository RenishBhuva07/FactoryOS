import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface AttendanceRecord {
  id: string;
  name: string;
  code: string;
  station: string;
  status: 'present' | 'absent' | 'half_day' | 'overtime';
}

const INITIAL_ROSTER: AttendanceRecord[] = [
  { id: 'att-1', name: 'Ramesh Kumar', code: 'EMP-014', station: 'CNC Lathe 01', status: 'present' },
  { id: 'att-2', name: 'Dinesh Prajapati', code: 'EMP-019', station: 'CNC Lathe 02', status: 'present' },
  { id: 'att-3', name: 'Suresh Bhai Parmar', code: 'EMP-022', station: 'VMC Milling 04', status: 'present' },
  { id: 'att-4', name: 'Vikram Singh', code: 'EMP-031', station: 'Deburring Station', status: 'absent' },
  { id: 'att-5', name: 'Amit Varma', code: 'EMP-038', station: 'Drill Bench 01', status: 'present' },
  { id: 'att-6', name: 'Kailash Solanki', code: 'EMP-045', station: 'Packing & Staging', status: 'half_day' },
];

export interface WorkbenchAttendanceProps {
  onSave?: (roster: AttendanceRecord[]) => void;
}

export const WorkbenchAttendance: React.FC<WorkbenchAttendanceProps> = ({ onSave }) => {
  const [roster, setRoster] = useState<AttendanceRecord[]>(INITIAL_ROSTER);
  const [feedback, setFeedback] = useState(false);

  const handleMarkAllPresent = () => {
    setRoster((prev) => prev.map((r) => ({ ...r, status: 'present' })));
  };

  const handleStatusChange = (id: string, status: AttendanceRecord['status']) => {
    setRoster((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleSave = () => {
    onSave?.(roster);
    setFeedback(true);
    setTimeout(() => setFeedback(false), 3500);
  };

  const presentCount = roster.filter((r) => r.status === 'present' || r.status === 'overtime').length;
  const absentCount = roster.filter((r) => r.status === 'absent').length;

  return (
    <div className="bg-white rounded-3xl border border-[#DFECF3] p-4 sm:p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DFECF3]">
        <div>
          <h2 className="text-base font-bold text-[#002941]">Shift A Attendance Roster</h2>
          <p className="text-xs text-[#566E7F]">
            {presentCount} of {roster.length} present • {absentCount} exceptions
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllPresent}
          className="px-3.5 py-1.5 rounded-full bg-[#E4F4F0] border border-[#CFE8E1] text-[#184E46] text-xs font-bold hover:bg-[#CFE8E1] transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[16px] text-[#2D8576]">done_all</span>
          <span>Mark All Present</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-2xl bg-[#E4F4F0] border border-[#2D8576] flex items-center gap-2 text-xs font-bold text-[#184E46] animate-in zoom-in-95">
          <span className="material-symbols-outlined text-[18px] text-[#2D8576]">verified</span>
          <span>Attendance lock recorded with supervisor biometric passlink.</span>
        </div>
      )}

      <div className="space-y-2">
        {roster.map((worker) => (
          <div
            key={worker.id}
            className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-[#002941]">{worker.name}</p>
                <span className="text-[10px] font-semibold text-[#8DA1AF]">{worker.code}</span>
              </div>
              <p className="text-[11px] text-[#566E7F] mt-0.5">{worker.station}</p>
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#DFECF3] shrink-0">
              <button
                type="button"
                onClick={() => handleStatusChange(worker.id, 'present')}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition select-none cursor-pointer ${
                  worker.status === 'present'
                    ? 'bg-[#2D8576] text-white shadow-2xs'
                    : 'text-[#566E7F] hover:bg-[#F0F5F9]'
                }`}
              >
                Present
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(worker.id, 'absent')}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition select-none cursor-pointer ${
                  worker.status === 'absent'
                    ? 'bg-[#FD6E6E] text-white shadow-2xs'
                    : 'text-[#566E7F] hover:bg-[#F0F5F9]'
                }`}
              >
                Absent
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(worker.id, 'half_day')}
                className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition select-none cursor-pointer ${
                  worker.status === 'half_day'
                    ? 'bg-[#002941] text-[#CFE8E1] shadow-2xs'
                    : 'text-[#566E7F] hover:bg-[#F0F5F9]'
                }`}
              >
                Half-Day
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(worker.id, 'overtime')}
                className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition select-none cursor-pointer ${
                  worker.status === 'overtime'
                    ? 'bg-[#002941] text-white shadow-2xs'
                    : 'text-[#566E7F] hover:bg-[#F0F5F9]'
                }`}
              >
                OT
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <PillButton
          type="button"
          variant="primary"
          size="lg"
          onClick={handleSave}
          className="w-full h-12 text-sm font-bold shadow-md"
          icon={<span className="material-symbols-outlined text-[19px]">save</span>}
        >
          Save Shift Attendance ({presentCount} Present)
        </PillButton>
      </div>
    </div>
  );
};

export default WorkbenchAttendance;
