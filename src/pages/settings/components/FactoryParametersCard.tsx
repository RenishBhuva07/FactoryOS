import React from 'react';
import { Card } from '../../../components/common';
import type { FactoryParameters } from '../../../types/settings';

export interface FactoryParametersCardProps {
  parameters: FactoryParameters;
  onChange: (key: keyof FactoryParameters, value: string) => void;
  className?: string;
}

export const FactoryParametersCard: React.FC<FactoryParametersCardProps> = ({
  parameters,
  onChange,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center gap-2.5 pb-1 border-b border-[#DFECF3]">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[16px]">tune</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#002941]">
            Factory Parameters
          </h2>
          <p className="text-xs text-[#566E7F]">
            Core operational telemetry defaults
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs">
        <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] space-y-1.5">
          <label className="text-[11px] font-bold text-[#566E7F] uppercase tracking-wider block">
            Plant Name
          </label>
          <input
            type="text"
            value={parameters.plantName}
            onChange={(e) => onChange('plantName', e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-white border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
          />
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] space-y-1.5">
          <label className="text-[11px] font-bold text-[#566E7F] uppercase tracking-wider block">
            Default Timezone
          </label>
          <select
            value={parameters.defaultTimezone}
            onChange={(e) => onChange('defaultTimezone', e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-white border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
          >
            <option>India Standard Time (IST) UTC+05:30</option>
            <option>Pacific Standard Time (PST) UTC-08:00</option>
            <option>Coordinated Universal Time (UTC)</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] space-y-1.5">
          <label className="text-[11px] font-bold text-[#566E7F] uppercase tracking-wider block">
            Telemetry Sampling Rate
          </label>
          <select
            value={parameters.telemetrySamplingRate}
            onChange={(e) => onChange('telemetrySamplingRate', e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-white border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
          >
            <option>High Resolution (10 seconds)</option>
            <option>Standard (30 seconds)</option>
            <option>Batch Aggregated (5 minutes)</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] space-y-1.5">
          <label className="text-[11px] font-bold text-[#566E7F] uppercase tracking-wider block">
            Safety Protocol Level
          </label>
          <select
            value={parameters.safetyProtocolLevel}
            onChange={(e) => onChange('safetyProtocolLevel', e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-white border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
          >
            <option>Level 3 - Strict Organic Safeguard</option>
            <option>Level 2 - Heavy Industrial Standard</option>
            <option>Level 1 - Baseline Facility Safeguard</option>
          </select>
        </div>
      </div>
    </Card>
  );
};
