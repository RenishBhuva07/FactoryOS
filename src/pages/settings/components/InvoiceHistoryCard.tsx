import React from 'react';
import { Card, PillButton } from '../../../components/common';
import type { BillingInvoice } from '../../../types/settings';

export interface InvoiceHistoryCardProps {
  invoices: BillingInvoice[];
  onDownloadTaxStatement?: () => void;
  className?: string;
}

export const InvoiceHistoryCard: React.FC<InvoiceHistoryCardProps> = ({
  invoices,
  onDownloadTaxStatement,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col justify-between gap-3.5 ${className}`}>
      <div>
        <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
          <h2 className="text-sm sm:text-base font-bold text-[#002941]">
            Invoice History
          </h2>
          <button
            type="button"
            className="text-xs font-semibold text-[#002941] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-2 pt-2 text-xs">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="p-2.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-[#002941] font-mono block">
                  {inv.invoiceNumber}
                </span>
                <span className="text-[11px] text-[#566E7F]">{inv.date}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#002941] tabular-nums block">
                  {inv.amount}
                </span>
                <span className="text-[10px] font-bold text-[#20675C] bg-[#CFE8E1] px-1.5 py-0.5 rounded-md inline-block">
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-[#DFECF3]/70">
        <PillButton
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          icon={<span className="material-symbols-outlined text-[16px]">receipt</span>}
          onClick={onDownloadTaxStatement}
        >
          Download Tax Statement
        </PillButton>
      </div>
    </Card>
  );
};
