import React, { useState } from 'react';
import { Card, PillButton } from '../../../components/common';

export interface ApiAccessKeysCardProps {
  onGenerateKey?: () => void;
  className?: string;
}

export const ApiAccessKeysCard: React.FC<ApiAccessKeysCardProps> = ({
  onGenerateKey,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const sampleKey = 'fos_live_9983a7209dfa41fe';

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center gap-2 pb-1 border-b border-[#DFECF3]">
        <span className="material-symbols-outlined text-[20px] text-[#002941]">
          key
        </span>
        <h2 className="text-sm sm:text-base font-bold text-[#002941]">
          API Access Keys
        </h2>
      </div>

      <p className="text-xs text-[#566E7F] leading-relaxed">
        Use API tokens to connect factory floor IoT sensors securely to FactoryOS.
      </p>

      <div className="p-2.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="block text-[10px] font-bold text-[#566E7F] uppercase tracking-wider">
            production-sensor-primary-key
          </span>
          <span className="text-xs font-mono text-[#002941] truncate block mt-0.5">
            fos_live_9983a...41fe
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="w-8 h-8 rounded-lg border border-[#DFECF3] bg-white flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition-all cursor-pointer shrink-0"
          title="Copy key"
        >
          <span className="material-symbols-outlined text-[16px]">
            {copied ? 'done' : 'content_copy'}
          </span>
        </button>
      </div>

      <PillButton
        variant="ghost"
        size="sm"
        className="w-full text-xs"
        icon={<span className="material-symbols-outlined text-[16px]">add</span>}
        onClick={onGenerateKey}
      >
        Generate New Key
      </PillButton>
    </Card>
  );
};
