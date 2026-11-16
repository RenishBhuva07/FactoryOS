import React, { useState } from 'react';
import { FloatingIconDock } from '../components';
import {
  DashboardHeader,
  TotalBalanceCard,
  SpendingLimitCard,
  CardsCarouselCard,
  KpiMetricsGrid,
  RecentActivitiesCard,
  IncomeChartCard,
} from './components';
import {
  MOCK_WALLETS,
  MOCK_CREDIT_CARDS,
  MOCK_KPIS,
  MOCK_TRANSACTIONS,
  MOCK_MONTHLY_INCOME,
} from '../../data/mockDashboardData';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeDockItem, setActiveDockItem] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="w-full h-screen overflow-hidden flex bg-[#F8FAFA] antialiased font-sans">
      <FloatingIconDock
        activeId={activeDockItem}
        onSelect={setActiveDockItem}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        brandName="FactoryOS"
        className="hidden md:flex"
      />

      <div className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden flex flex-col">
        <DashboardHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          brandName="FactoryOS"
          userName="Oripio Studio"
          userEmail="oripiostudio@gmail.com"
        />

        <main className="flex-1 min-w-0 pl-2 pr-4 sm:pl-3 sm:pr-5 lg:pl-3 lg:pr-6 py-3 sm:py-3.5 space-y-3.5 w-full flex flex-col justify-between">
          <section className="space-y-0.5 shrink-0">
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
              Good morning, Oripio
            </h1>
            <p className="text-xs sm:text-sm text-[#566E7F]">
              Stay on top of your tasks, monitor progress, and track status.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
            {/* Left Column: Balance, Spending Limit, Credit Cards */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3.5">
              <TotalBalanceCard
                totalBalance={689372.0}
                growthPercent={5}
                wallets={MOCK_WALLETS}
              />

              <SpendingLimitCard
                spentAmount={1400}
                totalLimit={5500}
              />

              <CardsCarouselCard
                cards={MOCK_CREDIT_CARDS}
              />
            </div>

            {/* Right Area: Top Row (KPIs + Chart), Bottom Row (Full-width Recent Activities) */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-3.5">
              {/* Top Row: 4 KPI Cards on left, Income Chart Card on right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch">
                <KpiMetricsGrid
                  metrics={MOCK_KPIS}
                />

                <IncomeChartCard
                  data={MOCK_MONTHLY_INCOME}
                  className="h-full flex-1"
                />
              </div>

              {/* Bottom Row: Recent Activities spanning full width to the right edge */}
              <RecentActivitiesCard
                transactions={MOCK_TRANSACTIONS}
                className="w-full flex-1 flex flex-col justify-between"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

