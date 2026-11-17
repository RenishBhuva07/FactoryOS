import React from "react";
import { Card, PillProgressBar } from "../../../components/common";
import type {
  ClientTierItem,
  DispatchChallanInfo,
} from "../../../types/orders";

export interface ClientTierPipelineCardProps {
  tiers: ClientTierItem[];
  quarterLabel?: string;
  challan?: DispatchChallanInfo;
  onViewChallan?: (challan: DispatchChallanInfo) => void;
  className?: string;
}

export const ClientTierPipelineCard: React.FC<ClientTierPipelineCardProps> = ({
  tiers,
  quarterLabel = "Q4 Active",
  challan,
  onViewChallan,
  className = "",
}) => {
  return (
    <Card
      variant="default"
      padding="md"
      className={`border-[#DFECF3] shadow-xs flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">
              pie_chart
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941] tracking-tight">
            Client Tier Pipeline
          </h2>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F0F5F9] border border-[#DFECF3] text-[#002941] tabular-nums">
          {quarterLabel}
        </span>
      </div>

      <div className="space-y-3.5">
        {tiers.map((tier) => {
          const getBarVariant = () => {
            if (tier.colorVariant === "navy") return "navy";
            if (tier.colorVariant === "mint") return "mint";
            if (tier.colorVariant === "coral") return "coral";
            return "navy";
          };

          return (
            <div key={tier.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#002941] truncate">
                  {tier.name}
                </span>
                <span className="font-extrabold text-[#002941] tabular-nums shrink-0 ml-2">
                  {tier.amountFormatted} ({tier.percentage}%)
                </span>
              </div>
              <PillProgressBar
                value={tier.percentage}
                max={100}
                variant={getBarVariant()}
                height="sm"
                trackClassName="bg-[#DFECF3]"
              />
            </div>
          );
        })}
      </div>

      {challan && (
        <div
          onClick={() => onViewChallan && onViewChallan(challan)}
          className={`rounded-2xl p-3.5 sm:p-4 bg-[#F4FAF8] border border-[#CFE8E1] shadow-2xs flex items-start gap-3 transition-all ${
            onViewChallan ? "cursor-pointer hover:border-[#74BFB0]" : ""
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[19px]">
              local_shipping
            </span>
          </div>

          <div className="min-w-0 space-y-0.5">
            <h4 className="text-xs font-bold text-[#002941] tracking-tight">
              Dispatch Challan Staging
            </h4>
            <p className="text-xs text-[#566E7F] leading-relaxed">
              {challan.notes}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ClientTierPipelineCard;
