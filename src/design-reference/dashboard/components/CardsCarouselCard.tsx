import React from 'react';
import { Card, PillButton } from '../../components';
import type { CreditCardItem } from '../../../types/dashboard';

export interface CardsCarouselCardProps {
  cards: CreditCardItem[];
  onAddNew?: () => void;
  className?: string;
}

export const CardsCarouselCard: React.FC<CardsCarouselCardProps> = ({
  cards,
  onAddNew,
  className = '',
}) => {
  return (
    <Card variant="default" padding="md" className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#002941]">
          <span className="material-symbols-outlined text-[20px]">credit_card</span>
          <h3 className="text-sm font-semibold">My Cards</h3>
        </div>
        <PillButton
          variant="mintGradient"
          size="sm"
          onClick={onAddNew}
          icon={<span className="material-symbols-outlined text-[16px]">add</span>}
          className="text-xs py-1 px-3"
        >
          Add new
        </PillButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {cards.map((card) => {
          const gradientClass =
            card.theme === 'coral' || card.theme === 'coral-gradient'
              ? 'bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]'
              : card.theme === 'navy'
              ? 'bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E]'
              : 'bg-gradient-to-br from-[#103530] via-[#184E46] to-[#20675C]';

          return (
            <div
              key={card.id}
              className={`rounded-2xl p-3.5 flex flex-col justify-between text-white relative overflow-hidden min-h-[125px] shadow-sm ${gradientClass}`}
            >
              {/* Card top icons */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] opacity-80">contactless</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                    {card.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Mastercard interlocking circles */}
                <div className="flex items-center -space-x-2">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      card.theme === 'coral' || card.theme === 'coral-gradient'
                        ? 'bg-[#CFE8E1]/90'
                        : 'bg-[#FD6E6E]/90'
                    }`}
                  />
                  <div
                    className={`w-5 h-5 rounded-full ${
                      card.theme === 'coral' || card.theme === 'coral-gradient'
                        ? 'bg-white/80'
                        : 'bg-[#FFAAA3]/90'
                    }`}
                  />
                </div>
              </div>

              {/* Card bottom details */}
              <div className="mt-4 z-10 space-y-2">
                <div>
                  <p className="text-[10px] text-white/60 font-medium tracking-wider uppercase">Card Number</p>
                  <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white">
                    {card.cardNumber}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/80 font-mono pt-1">
                  <div>
                    <span className="text-white/50 mr-1 uppercase">EXP</span>
                    <span>{card.expiry}</span>
                  </div>
                  <div>
                    <span className="text-white/50 mr-1 uppercase">CVV</span>
                    <span>{card.cvv}</span>
                  </div>
                </div>
              </div>

              {/* Soft decorative background circles */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CardsCarouselCard;
