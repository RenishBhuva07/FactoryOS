import React from 'react';
import { KpiMetricCard } from '../../components';
import type { KpiMetric } from '../../../types/dashboard';

export interface KpiMetricsGridProps {
  metrics: KpiMetric[];
  className?: string;
}

export const KpiMetricsGrid: React.FC<KpiMetricsGridProps> = ({
  metrics,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 ${className}`}>
      {metrics.map((metric) => (
        <KpiMetricCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          changeText={metric.changeText}
          trend={metric.trend}
          isHero={metric.isHero}
          accent={metric.accent}
          icon={
            <span className="material-symbols-outlined text-[20px]">
              {metric.iconName}
            </span>
          }
        />
      ))}
    </div>
  );
};

export default KpiMetricsGrid;
