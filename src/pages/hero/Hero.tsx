import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { PillButton, Card } from '../../components/common';
import { HeroNavBar } from './components/HeroNavBar';
import { HeroCommandDeck } from './components/HeroCommandDeck';
import { RoiCalculator } from './components/RoiCalculator';

type PersonaType = 'owner' | 'supervisor' | 'quality';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [persona, setPersona] = useState<PersonaType>('owner');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const personaContent = {
    owner: {
      headline: (
        <>
          Run your factory with <span className="text-[#2D8576]">clarity</span>, not paperwork.
        </>
      ),
      subtext:
        'Live shopfloor dispatch boards, machine OEE tracking, and operator attendance — unified into automated 9:00 PM shift digests delivered straight to your WhatsApp.',
      badge: 'FOR FACTORY OWNERS & PROPRIETORS',
      primaryFocus: 'Night Shift WhatsApp Digest • Real-Time Margins',
    },
    supervisor: {
      headline: (
        <>
          Record shift output in <span className="text-[#2D8576]">60 seconds</span>, right from your phone.
        </>
      ),
      subtext:
        'Zero passwords needed. Supervisors get an instant WhatsApp one-tap mobile passlink to log hourly machine counts, worker punch-ins, and shift handover notes.',
      badge: 'FOR SHOPFLOOR SUPERVISORS',
      primaryFocus: 'Mobile Passlink • Instant Worker Roster • Fast Punch-In',
    },
    quality: {
      headline: (
        <>
          Catch machine drift <span className="text-[#FD6E6E]">before</span> scrap piles up.
        </>
      ),
      subtext:
        'Immediate threshold warnings on hydraulic pressure and motor temperatures. Staged E-Way bill generation and 1-click dispatch challans once QC approves.',
      badge: 'FOR QUALITY INSPECTORS & DISPATCH',
      primaryFocus: 'Threshold Telemetry • Scrap Audit • Auto E-Way Sync',
    },
  }[persona];

  const handleScrollToDeck = () => {
    const el = document.getElementById('command-deck');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA] font-sans text-[#002941] flex flex-col selection:bg-[#CFE8E1] selection:text-[#002941] antialiased overflow-x-hidden">
      <HeroNavBar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-16 sm:space-y-20">
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-xs font-bold shadow-2xs">
            <span className="material-symbols-outlined text-[16px] text-[#2D8576]">verified</span>
            <span>The Next-Gen Operating System for Indian MSMEs • Udyam &amp; GST Ready</span>
          </div>

          <div className="flex items-center justify-center p-1 rounded-full bg-[#F0F5F9] border border-[#DFECF3] w-fit mx-auto shadow-2xs">
            <button
              type="button"
              onClick={() => setPersona('owner')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition select-none cursor-pointer ${
                persona === 'owner'
                  ? 'bg-[#002941] text-white shadow-xs'
                  : 'text-[#566E7F] hover:text-[#002941]'
              }`}
            >
              Factory Owner / MD
            </button>
            <button
              type="button"
              onClick={() => setPersona('supervisor')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition select-none cursor-pointer ${
                persona === 'supervisor'
                  ? 'bg-[#002941] text-white shadow-xs'
                  : 'text-[#566E7F] hover:text-[#002941]'
              }`}
            >
              Shopfloor Supervisor
            </button>
            <button
              type="button"
              onClick={() => setPersona('quality')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition select-none cursor-pointer ${
                persona === 'quality'
                  ? 'bg-[#002941] text-white shadow-xs'
                  : 'text-[#566E7F] hover:text-[#002941]'
              }`}
            >
              QC &amp; Dispatch Head
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#002941] tracking-tight leading-[1.12]">
            {personaContent.headline}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#566E7F] max-w-2xl mx-auto leading-relaxed">
            {personaContent.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <PillButton
              type="button"
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              icon={<span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
              iconPosition="right"
              className="w-full sm:w-auto text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all"
            >
              Start 14-Day Free MSME Trial
            </PillButton>

            <PillButton
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleScrollToDeck}
              icon={<span className="material-symbols-outlined text-[18px] text-[#2D8576]">play_circle</span>}
              iconPosition="left"
              className="w-full sm:w-auto text-sm sm:text-base font-bold bg-white border border-[#DFECF3] shadow-xs hover:border-[#BDD7E7]"
            >
              Explore Live Shopfloor Demo
            </PillButton>
          </div>

          <div className="text-xs text-[#566E7F] flex items-center justify-center gap-3 flex-wrap pt-2">
            <span className="flex items-center gap-1 font-semibold text-[#002941]">
              <span className="material-symbols-outlined text-[15px] text-[#2D8576]">check_circle</span>
              14-Day Free MSME Trial
            </span>
            <span className="text-[#DFECF3]">•</span>
            <span className="flex items-center gap-1 font-semibold text-[#002941]">
              <span className="material-symbols-outlined text-[15px] text-[#2D8576]">check_circle</span>
              Zero Hardware Setup
            </span>
            <span className="text-[#DFECF3]">•</span>
            <span className="flex items-center gap-1 font-semibold text-[#002941]">
              <span className="material-symbols-outlined text-[15px] text-[#2D8576]">check_circle</span>
              Works on Phone &amp; PC
            </span>
          </div>
        </section>

        <section className="w-full">
          <HeroCommandDeck />
        </section>

        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F5F9] text-[#002941] border border-[#DFECF3] text-xs font-bold">
              <span>TRIPARTITE ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002941] tracking-tight">
              Three synchronized engines powering your factory
            </h2>
            <p className="text-xs sm:text-sm text-[#566E7F]">
              Balanced via FactoryOS&apos;s 60-30-10 operational model for zero downtime and effortless compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <Card
              variant="heroNavy"
              padding="lg"
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 text-[#CFE8E1] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">domain</span>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-[#CFE8E1] text-[10px] font-bold tracking-wider">
                  60% COMMAND CORE
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Midnight Navy Command
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Centralized factory operations, GST and Udyam alignment, order commitment fulfillment, and automated 9:00 PM owner reports.
                </p>
              </div>
              <div className="pt-3 border-t border-white/20 text-xs text-[#CFE8E1] font-semibold flex items-center gap-1">
                <span>Direct Owner Authority</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </Card>

            <Card
              variant="heroMint"
              padding="lg"
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">speed</span>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-bold tracking-wider">
                  30% SHOPFLOOR PULSE
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Pale Mint OEE &amp; Uptime
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Real-time machine counters, operator punch-in verification, scrap rate minimization, and active line performance tracking.
                </p>
              </div>
              <div className="pt-3 border-t border-white/20 text-xs text-white font-semibold flex items-center gap-1">
                <span>94.2% Average Fleet Uptime</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </Card>

            <Card
              variant="heroCoral"
              padding="lg"
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">notifications_active</span>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-wider">
                  10-15% ZERO-DOWNTIME ALERTS
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Coral Red Alert Engine
                </h3>
                <p className="text-xs text-white/90 leading-relaxed">
                  Proactive notifications for temperature spikes, tool wear thresholds, and supervisor sign-off delays before costly machine breakdown.
                </p>
              </div>
              <div className="pt-3 border-t border-white/20 text-xs text-white font-semibold flex items-center gap-1">
                <span>65% Downtime Reduction</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </Card>
          </div>
        </section>

        <section className="w-full">
          <RoiCalculator />
        </section>

        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002941] tracking-tight">
              Designed for real Indian manufacturing shopfloors
            </h2>
            <p className="text-xs sm:text-sm text-[#566E7F]">
              Eliminate friction between the proprietor desk and the greasy machine bay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-5 rounded-2xl bg-white border border-[#EBF1F5] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                </div>
                <h3 className="text-sm font-bold text-[#002941]">Digital Job Routing</h3>
                <p className="text-xs text-[#566E7F] leading-relaxed">
                  Assign batches to specific VMC or CNC machines. Track piece progress in real time without paper chits.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#2D8576] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">check</span>
                Zero chit misplacement
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBF1F5] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#2D8576]">smartphone</span>
                </div>
                <h3 className="text-sm font-bold text-[#002941]">60-Second Mobile Pass</h3>
                <p className="text-xs text-[#566E7F] leading-relaxed">
                  Supervisors tap an SMS or WhatsApp link to record outputs. Zero password friction, works in patchy cell zones.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#2D8576] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">check</span>
                No app installation needed
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBF1F5] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#FFF4F3] text-[#AB1B1B] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#FD6E6E]">local_shipping</span>
                </div>
                <h3 className="text-sm font-bold text-[#002941]">E-Way Bill &amp; Dispatch</h3>
                <p className="text-xs text-[#566E7F] leading-relaxed">
                  Generate dispatch challans directly from completed machine batches. Pre-fill transporter and GSTIN details.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#2D8576] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">check</span>
                1-Click gate pass ready
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBF1F5] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                </div>
                <h3 className="text-sm font-bold text-[#002941]">Operator Shift Register</h3>
                <p className="text-xs text-[#566E7F] leading-relaxed">
                  Track present operators vs machine allocation. Instant visibility into idle stations and overtime.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#2D8576] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">check</span>
                Udyam compliance logged
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002941] tracking-tight">
              Trusted by MSME unit heads across industrial hubs
            </h2>
            <p className="text-xs sm:text-sm text-[#566E7F]">
              From Rajkot CNC clusters to Naroda Ahmedabad and Makarpura Vadodara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-5 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-[#2D8576]">
                {'★★★★★'}
              </div>
              <p className="text-xs text-[#002941] leading-relaxed italic">
                &ldquo;Earlier I had to call my supervisor 4 times every evening just to know how many pump bodies were milled. Now the 9:00 PM WhatsApp message tells me everything while I am driving home.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#DFECF3] text-[11px]">
                <strong className="text-[#002941] block">Rajesh Bhai Patel</strong>
                <span className="text-[#566E7F]">Proprietor, Apex Engineering • Naroda GIDC (16 CNCs)</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-[#2D8576]">
                {'★★★★★'}
              </div>
              <p className="text-xs text-[#002941] leading-relaxed italic">
                &ldquo;Our supervisor Ramesh doesn&apos;t know how to use computer ERPs. But he uses WhatsApp all day. Giving him a 1-tap link on his phone saved our whole factory from paperwork chaos.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#DFECF3] text-[11px]">
                <strong className="text-[#002941] block">Haresh Bhai Vora</strong>
                <span className="text-[#566E7F]">Managing Partner, Vora Fasteners • Rajkot Hub</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-[#2D8576]">
                {'★★★★★'}
              </div>
              <p className="text-xs text-[#002941] leading-relaxed italic">
                &ldquo;The temperature alerts caught our hydraulic press coolant pump failure before the motor seized. That alone saved us at least ₹1.2 Lakh in emergency rewinding and 3 days of lost production.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#DFECF3] text-[11px]">
                <strong className="text-[#002941] block">Bhavin Mehta</strong>
                <span className="text-[#566E7F]">Plant Head, Mehta Precision Auto • Makarpura GIDC</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white p-6 sm:p-10 lg:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#2D8576]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FD6E6E]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#CFE8E1] border border-white/15 text-xs font-semibold backdrop-blur-md">
              <span className="material-symbols-outlined text-[15px] text-[#43A392]">verified</span>
              <span>14-Day Free MSME Trial • No Credit Card Required</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to modernize your factory in less than 5 minutes?
            </h2>

            <p className="text-xs sm:text-base text-[#DFECF3]/85 max-w-xl mx-auto leading-relaxed">
              Create your unit account, configure your shifts and machinery catalog, and send instant supervisor links to WhatsApp today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <PillButton
                type="button"
                variant="coral"
                size="lg"
                onClick={() => navigate('/signup')}
                icon={<span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                iconPosition="right"
                className="w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Create Factory Account Now
              </PillButton>

              <a
                href="https://wa.me/919825012345"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                <span>Chat with Onboarding Concierge</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-white border-t border-[#DFECF3] py-6 sm:py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#566E7F]">
          <div className="flex items-center gap-2">
            <span>&copy; 2025 FactoryOS India.</span>
            <span className="hidden sm:inline text-[#8DA1AF]">&bull;</span>
            <span>Protected by 256-bit SSL encryption. Udyam &amp; GST Compliant.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hover:text-[#002941] font-semibold transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="hover:text-[#002941] font-semibold transition cursor-pointer"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => navigate('/help')}
              className="hover:text-[#002941] font-semibold transition cursor-pointer"
            >
              Help Desk
            </button>
            <a
              href="tel:1800123456"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] font-bold"
            >
              <span className="material-symbols-outlined text-[14px] text-[#2D8576]">call</span>
              <span>Helpline: 1800 123 456</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
