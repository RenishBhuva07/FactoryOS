import React from 'react';
import { CORE_COLORS, COLOR_SCALES, SEMANTIC_COLORS, HERO_COLORS } from './constants/colors';

export { CORE_COLORS, COLOR_SCALES, SEMANTIC_COLORS, HERO_COLORS };

export interface HeroGradientCardProps {
  name: string;
  gradient: string;
  stops: { light: string; main: string; dark: string };
  cssClass: string;
  textColor?: string;
  className?: string;
}

export const HeroGradientCard: React.FC<HeroGradientCardProps> = ({
  name,
  gradient,
  stops,
  cssClass,
  textColor = '#FFFFFF',
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col justify-between shadow-sm transition hover:shadow-md ${className}`}
      style={{ background: gradient, color: textColor, minHeight: '140px' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider opacity-85">
          Hero Gradient
        </span>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: stops.light }} />
          <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: stops.main }} />
          <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: stops.dark }} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight">{name}</h3>
        <p className="text-xs font-mono font-medium opacity-90 mt-1">{cssClass}</p>
        <p className="text-[10px] font-mono opacity-75 mt-0.5">
          {stops.light} → {stops.main} → {stops.dark}
        </p>
      </div>
    </div>
  );
};

export interface ColorSwatchProps {
  name: string;
  hex: string;
  label?: string;
  textColor?: string;
  className?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  hex,
  label,
  textColor,
  className = '',
}) => {
  const isDark = hex.toLowerCase() === '#002941' || hex.toLowerCase().startsWith('#00') || hex.toLowerCase().startsWith('#0c');
  const defaultText = textColor || (isDark ? '#FFFFFF' : '#002941');

  return (
    <div
      className={`rounded-2xl p-5 flex flex-col justify-between shadow-sm transition hover:shadow-md ${className}`}
      style={{ backgroundColor: hex, color: defaultText, minHeight: '140px' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
          {label || 'Brand Core'}
        </span>
        <div
          className="w-3.5 h-3.5 rounded-full border border-black/10"
          style={{ backgroundColor: hex }}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight">{name}</h3>
        <p className="text-xs font-mono font-medium opacity-90 mt-0.5">{hex}</p>
      </div>
    </div>
  );
};

export const ColorPalettePreview: React.FC = () => {
  return (
    <div className="bg-[#F5F7F8] p-8 rounded-[32px] max-w-4xl mx-auto space-y-8 font-sans">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#002941]">
          FactoryOS Master Palette
        </h2>
        <p className="text-sm text-[#566E7F] mt-1">
          Three primary brand colors and their derived production scales.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <ColorSwatch
          name="Pale Mint"
          hex={CORE_COLORS.PALE_MINT}
          label="Fresh / Completed"
          textColor="#002941"
        />
        <ColorSwatch
          name="Midnight Navy"
          hex={CORE_COLORS.MIDNIGHT_NAVY}
          label="Primary / Command"
          textColor="#FFFFFF"
        />
        <ColorSwatch
          name="Coral Orange"
          hex={CORE_COLORS.CORAL_ORANGE}
          label="Action / Attention"
          textColor="#FFFFFF"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#002941]">
          Hero Gradients (Three Master Colors)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <HeroGradientCard
            name={HERO_COLORS.NAVY.name}
            gradient={HERO_COLORS.NAVY.gradient}
            stops={HERO_COLORS.NAVY.stops}
            cssClass={HERO_COLORS.NAVY.cssClass}
            textColor={HERO_COLORS.NAVY.text}
          />
          <HeroGradientCard
            name={HERO_COLORS.CORAL.name}
            gradient={HERO_COLORS.CORAL.gradient}
            stops={HERO_COLORS.CORAL.stops}
            cssClass={HERO_COLORS.CORAL.cssClass}
            textColor={HERO_COLORS.CORAL.text}
          />
          <HeroGradientCard
            name={HERO_COLORS.MINT.name}
            gradient={HERO_COLORS.MINT.gradient}
            stops={HERO_COLORS.MINT.stops}
            cssClass={HERO_COLORS.MINT.cssClass}
            textColor={HERO_COLORS.MINT.text}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#EBF1F5] shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-[#002941]">
          Semantic Status Standard (Dot + Label Pattern)
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E4F4F0] text-[#184E46] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2D8576]" />
            Completed / Active
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DFECF3] text-[#002941] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#002941]" />
            In Progress / Running
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-white" />
            Pending / Attention
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFE6E4] text-[#871919] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#D62727]" />
            Issue / Overdue
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  CORE_COLORS,
  COLOR_SCALES,
  HERO_COLORS,
  SEMANTIC_COLORS,
  ColorSwatch,
  HeroGradientCard,
  ColorPalettePreview,
};
