import React, { useState } from 'react';
import { Card, PillButton } from '../../components';
import type { WalletItem } from '../../../types/dashboard';

export interface TotalBalanceCardProps {
  totalBalance: number;
  growthPercent: number;
  wallets: WalletItem[];
  onTransfer?: () => void;
  onRequest?: () => void;
  className?: string;
}

export const TotalBalanceCard: React.FC<TotalBalanceCardProps> = ({
  totalBalance,
  growthPercent,
  wallets,
  onTransfer,
  onRequest,
  className = '',
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  return (
    <Card variant="default" padding="md" className={`space-y-4 ${className}`}>
      {/* Header with Title and Currency Picker */}
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-[#566E7F]">Total Balance</span>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576] text-white border border-[#2D8576]/30 rounded-full text-xs font-semibold cursor-pointer hover:opacity-95 shadow-xs transition">
          <span>🇺🇸</span>
          <span>{selectedCurrency}</span>
          <span className="material-symbols-outlined text-[16px] text-white/80">expand_more</span>
        </div>
      </div>

      {/* Hero Numeric Amount & Trend Badge */}
      <div className="space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#002941] tabular-nums">
          ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E4F4F0] text-[#184E46]">
          <span>↑</span>
          <span>{growthPercent}% than last month</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-0.5">
        <PillButton
          variant="primary"
          size="sm"
          icon={<span className="material-symbols-outlined text-[17px]">swap_horiz</span>}
          onClick={onTransfer}
          className="w-full font-bold shadow-none hover:shadow-sm"
        >
          Transfer
        </PillButton>
        <PillButton
          variant="coral"
          size="sm"
          icon={<span className="material-symbols-outlined text-[17px]">call_received</span>}
          onClick={onRequest}
          className="w-full font-bold shadow-none hover:shadow-sm"
        >
          Request
        </PillButton>
      </div>

      {/* Wallets Subsection */}
      <div className="pt-1 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#566E7F]">
          <span>Wallets</span>
          <span className="text-[#8DA1AF]">Total {wallets.length * 2} wallets</span>
        </div>

        {/* Horizontal Mini Wallet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => setSelectedCurrency(wallet.currency)}
              className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                selectedCurrency === wallet.currency
                  ? 'bg-white border-[#BDD7E7] shadow-xs ring-1 ring-[#BDD7E7]/40'
                  : 'bg-[#F8FAFA] border-[#DFECF3] hover:border-[#CBD6DF]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#002941] flex items-center gap-1">
                  <span>{wallet.flag}</span>
                  <span>{wallet.currency}</span>
                </span>
                <span className="text-[10px] text-[#8DA1AF]">•••</span>
              </div>

              <div className="my-2">
                <p className="text-sm font-bold text-[#002941] tabular-nums">
                  {wallet.symbol}{wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] text-[#8DA1AF] truncate">
                  Limit is {wallet.symbol}{wallet.monthlyLimit / 1000}k a month
                </p>
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    wallet.isActive
                      ? 'bg-[#E4F4F0] text-[#184E46]'
                      : 'bg-[#FFF4F3] text-[#FD6E6E] border border-[#FFD0CC]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      wallet.isActive ? 'bg-[#2D8576]' : 'bg-[#FD6E6E]'
                    }`}
                  />
                  {wallet.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TotalBalanceCard;
