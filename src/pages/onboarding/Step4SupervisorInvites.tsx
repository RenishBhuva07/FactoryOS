import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context';
import { StepTracker } from './components/StepTracker';
import { SupervisorCard } from './components/SupervisorCard';
import { WhatsAppPreview } from './components/WhatsAppPreview';
import { PillButton } from '../../components/common';
import type { SupervisorAccessRole } from '../../types/onboarding';

export const Step4SupervisorInvites: React.FC = () => {
  const {
    state,
    addSupervisor,
    removeSupervisor,
    goToPreviousStep,
    setStep,
    completeOnboarding,
  } = useOnboarding();
  const navigate = useNavigate();

  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newRole, setNewRole] = useState<SupervisorAccessRole>('shift_c_night');
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<string | null>(null);
  const [launching, setLaunching] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  React.useEffect(() => {
    setStep(4);
  }, [setStep]);

  const { supervisors, businessDetails } = state;

  const activeSupervisor =
    supervisors.find((s) => s.id === selectedSupervisorId) || supervisors[0];

  const handleAddSupervisor = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanNumber = newMobile.replace(/[^0-9]/g, '');
    if (!newName.trim()) {
      setFormError('Please enter supervisor name.');
      return;
    }
    if (cleanNumber.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    let roleLabel = 'Shift C Supervisor (Night)';
    let shiftBadge = 'Shift C (Night)';
    let permissionsLabel = 'Production Logging & Attendance only';

    if (newRole === 'shift_a_morning') {
      roleLabel = 'Shift A (Morning)';
      shiftBadge = 'Shift A';
    } else if (newRole === 'shift_b_evening') {
      roleLabel = 'Shift B (Evening)';
      shiftBadge = 'Shift B';
    } else if (newRole === 'qc_inspection') {
      roleLabel = 'Quality Control Lead';
      shiftBadge = 'Quality Control';
      permissionsLabel = 'QC Inspection & Scrap Logging';
    } else if (newRole === 'floor_manager') {
      roleLabel = 'Floor Manager';
      shiftBadge = 'Floor Manager';
      permissionsLabel = 'Shift Handovers & Dispatch Staging';
    }

    const formattedMobile = newMobile.startsWith('+91')
      ? newMobile
      : `+91 ${cleanNumber.slice(-10, -5)} ${cleanNumber.slice(-5)}`;

    addSupervisor({
      name: newName.trim(),
      mobile: formattedMobile,
      role: newRole,
      roleLabel,
      shiftBadge,
      permissionsLabel,
      inviteStatus: 'whatsapp_ready',
    });

    setNewName('');
    setNewMobile('');
  };

  const handleFinishSetup = () => {
    setLaunching(true);
    completeOnboarding();
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const handleBack = () => {
    goToPreviousStep();
    navigate('/onboarding/step-3');
  };

  return (
    <div>
      <StepTracker />

      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xs relative border border-[#DFECF3]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 mb-5 border-b border-[#DFECF3]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-[14px] text-[#2D8576]">shield_person</span>
              <span>Role-Based Factory Access</span>
            </div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-[#002941] tracking-tight leading-snug">
              Invite your shift supervisors &amp; shopfloor managers
            </h1>
            <p className="text-xs sm:text-sm text-[#566E7F] mt-1 max-w-2xl leading-relaxed">
              Supervisors receive an instant mobile passlink via WhatsApp or SMS. No complex passwords
              needed—they get a lightning-fast 60-second workbench to record hourly outputs and worker punch-ins.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-[#F8FAFA] px-3.5 py-2 rounded-xl border border-[#DFECF3] self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#2D8576]" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-[#566E7F] font-bold">
                Target Unit
              </div>
              <div className="text-xs font-bold text-[#002941]">
                {supervisors.length} Supervisor slots allocated
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {supervisors.map((supervisor) => (
            <SupervisorCard
              key={supervisor.id}
              supervisor={supervisor}
              factoryName={businessDetails.factoryName}
              isSelected={activeSupervisor?.id === supervisor.id}
              onSelect={() => setSelectedSupervisorId(supervisor.id)}
              onRemove={removeSupervisor}
            />
          ))}
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#002941]">
              Add Additional Supervisor or Floor In-charge
            </span>
            <span className="text-[11px] text-[#2D8576] font-semibold">Takes 15 seconds</span>
          </div>

          {formError && (
            <div className="mb-2.5 p-2 rounded-xl bg-[#FFF4F3] border border-[#FFD0CC] text-[#871919] text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleAddSupervisor} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <div className="sm:col-span-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F] block mb-1">
                Supervisor Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Mukesh Sompura"
                className="w-full h-9 px-3 rounded-xl bg-white text-xs sm:text-sm font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F] block mb-1">
                Mobile (WhatsApp)
              </label>
              <input
                type="tel"
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value)}
                placeholder="+91 98980 12345"
                className="w-full h-9 px-3 rounded-xl bg-white text-xs sm:text-sm font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40 tabular-nums"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F] block mb-1">
                Shift / Access Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as SupervisorAccessRole)}
                className="w-full h-9 px-3 rounded-xl bg-white text-xs sm:text-sm font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40 appearance-none"
              >
                <option value="shift_c_night">Shift C Supervisor (Night)</option>
                <option value="shift_a_morning">Shift A Supervisor (Morning)</option>
                <option value="shift_b_evening">Shift B Supervisor (Evening)</option>
                <option value="qc_inspection">Quality Control Lead</option>
                <option value="floor_manager">Floor Manager</option>
              </select>
            </div>

            <div className="sm:col-span-12 flex justify-end mt-0.5">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#DFECF3] hover:bg-[#F0F5F9] text-xs font-bold text-[#002941] shadow-2xs transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#2D8576]">add_circle</span>
                <span>Add Another Manager</span>
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <WhatsAppPreview
            supervisorName={activeSupervisor?.name || 'Ramesh Bhai'}
            proprietorName={businessDetails.proprietorName || 'Rajesh Bhai'}
            factoryName={businessDetails.factoryName || 'Apex Engineering Works'}
            passlink={activeSupervisor?.passlink || 'factoryos.in/m/apex-eng-shift-a'}
          />

          <div className="bg-[#F8FAFA] p-4 rounded-2xl border border-[#DFECF3] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#2D8576]">
                  security
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#002941]">Strict Owner Privacy Shield</h4>
              <p className="text-xs text-[#566E7F] leading-relaxed">
                Supervisors only see their active shift counters and worker rosters. Your P&amp;L
                profits, sales invoices, client pricing, and billing stay 100% hidden and locked to
                your master owner account.
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#DFECF3] flex items-center gap-2 text-[11px] text-[#184E46] font-semibold">
              <span className="material-symbols-outlined text-[15px] text-[#2D8576]">lock</span>
              <span>End-to-end access isolation per Indian Factory Compliance norms.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#DFECF3]">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#566E7F] hover:text-[#002941] px-4 py-2 rounded-full hover:bg-[#F0F5F9] transition cursor-pointer self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Machinery</span>
          </button>

          <PillButton
            type="button"
            onClick={handleFinishSetup}
            disabled={launching}
            variant="mintGradient"
            size="lg"
            icon={<span className="material-symbols-outlined text-[20px]">rocket_launch</span>}
            iconPosition="right"
          >
            {launching ? 'Configuring FactoryOS...' : 'Finish Setup & Launch FactoryOS 🚀'}
          </PillButton>
        </div>

        <div className="text-center mt-3 text-[11px] text-[#8DA1AF]">
          Need to add more than 10 supervisors? You can invite unlimited floor managers anytime from your Settings &gt; Shift Management.
        </div>
      </div>
    </div>
  );
};

export default Step4SupervisorInvites;
