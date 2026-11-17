import React from 'react';

interface WhatsAppPreviewProps {
  supervisorName?: string;
  proprietorName?: string;
  factoryName?: string;
  passlink?: string;
}

export const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({
  supervisorName = 'Ramesh Bhai',
  proprietorName = 'Rajesh Bhai',
  factoryName = 'Apex Engineering Works',
  passlink = 'factoryos.in/m/apex-eng-shift-a',
}) => {
  return (
    <div className="bg-[#F8FAFA] p-4 sm:p-5 rounded-2xl border border-[#DFECF3] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#002941]">
            <span className="material-symbols-outlined text-[16px] text-[#2D8576]">chat</span>
            <span>WhatsApp Invite Preview</span>
          </div>
          <span className="text-[10px] text-[#566E7F] font-semibold uppercase tracking-wider">
            Instant SMS Backup
          </span>
        </div>

        {/* WhatsApp message bubble */}
        <div className="bg-[#DCF8C6]/60 border border-[#BEE7A5] rounded-2xl rounded-tl-sm p-3.5 shadow-2xs text-[#002941] text-xs space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#20675C]">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>FactoryOS Verified Sender</span>
          </div>

          <p className="leading-relaxed text-[12px]">
            Namaste <span className="font-bold">{supervisorName}</span>, {proprietorName} has invited
            you to log daily shift production on FactoryOS for{' '}
            <span className="font-bold">{factoryName}</span>.
          </p>

          <div className="bg-white/90 p-2.5 rounded-xl border border-[#DFECF3] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] text-[#566E7F] block uppercase font-bold tracking-wider">
                One-tap Quick Workbench
              </span>
              <span className="text-xs font-bold text-[#002941] truncate block">{passlink}</span>
            </div>
            <a
              href={`https://${passlink}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[11px] font-bold shadow-xs shrink-0"
            >
              Open
            </a>
          </div>

          <div className="flex justify-end text-[10px] text-[#566E7F] font-medium tabular-nums">
            10:42 AM &bull; Delivered
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-[#DFECF3] flex items-center gap-2 text-[11px] text-[#566E7F]">
        <span className="material-symbols-outlined text-[16px] text-[#2D8576] shrink-0">bolt</span>
        <span>Zero app download required on Android or iOS. Works offline in spotty factory cell zones.</span>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
