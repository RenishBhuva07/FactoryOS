import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context';
import { StepTracker } from './components/StepTracker';
import { MachineRowItem } from './components/MachineRowItem';
import { EditMachineModal } from './components/EditMachineModal';
import { MachineImportModal } from './components/MachineImportModal';
import { PillButton } from '../../components/common';
import type { MachineCategory, OnboardingMachine } from '../../types/onboarding';

export const Step3MachineryCatalog: React.FC = () => {
  const {
    state,
    addMachine,
    updateMachine,
    deleteMachine,
    saveDraft,
    goToNextStep,
    goToPreviousStep,
    setStep,
  } = useOnboarding();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<MachineCategory>('all');
  const [newMachineName, setNewMachineName] = useState('');
  const [newMachineType, setNewMachineType] = useState('CNC Turning');
  const [newBayLocation] = useState('Bay A (Chucker Section)');
  const [saveToast, setSaveToast] = useState(false);
  const [isGujarati, setIsGujarati] = useState(false);
  const [editingMachine, setEditingMachine] = useState<OnboardingMachine | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  React.useEffect(() => {
    setStep(3);
  }, [setStep]);

  const { machinery, businessDetails } = state;

  const handleSaveDraft = () => {
    saveDraft();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMachineName.trim()) return;

    const isCnc =
      newMachineType.toLowerCase().includes('cnc') || newMachineType.toLowerCase().includes('vmc');

    addMachine({
      name: newMachineName.trim(),
      category: isCnc ? 'cnc' : 'conventional',
      typeLabel: newMachineType,
      modelYear: `${new Date().getFullYear()} Model`,
      bayLocation: newBayLocation,
      status: 'ready_for_production',
      statusLabel: 'Ready for Production',
    });

    setNewMachineName('');
  };

  const handleOpenEdit = (machine: OnboardingMachine) => {
    setEditingMachine(machine);
    setIsEditModalOpen(true);
  };

  const handleImportSuccess = (count: number) => {
    setImportSuccessMsg(`Successfully imported ${count} machine assets into the catalog.`);
    setTimeout(() => setImportSuccessMsg(null), 3500);
  };

  const filteredMachines = machinery.filter((m) => {
    if (activeFilter === 'all') return true;
    return m.category === activeFilter;
  });

  const cncCount = machinery.filter((m) => m.category === 'cnc').length;
  const conventionalCount = machinery.filter((m) => m.category === 'conventional').length;

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    goToNextStep();
    navigate('/onboarding/step-4');
  };

  const handleBack = () => {
    goToPreviousStep();
    navigate('/onboarding/step-2');
  };

  return (
    <div>
      <StepTracker />

      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xs relative border border-[#DFECF3]">
        {saveToast && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#002941] to-[#164E6E] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition-all animate-bounce z-10">
            <span className="material-symbols-outlined text-[15px] text-[#CFE8E1]">check_circle</span>
            <span>Draft saved to workspace</span>
          </div>
        )}

        {importSuccessMsg && (
          <div className="absolute top-4 right-4 bg-white border border-[#2D8576] text-[#002941] text-xs font-semibold px-4 py-2 rounded-2xl shadow-md flex items-center gap-2 z-10">
            <span className="material-symbols-outlined text-[18px] text-[#2D8576]">check_circle</span>
            <span>{importSuccessMsg}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 mb-5 border-b border-[#DFECF3]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-[14px] text-[#2D8576]">precision_manufacturing</span>
              <span>{businessDetails.factoryName || 'Apex Engineering Works'}, Rajkot</span>
              <span className="text-[#8DA1AF]">&bull;</span>
              <span className="font-normal">Verified MSME Reg: UDYAM-GJ-20-004812</span>
            </div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-[#002941] tracking-tight leading-snug">
              Machinery &amp; Equipment Catalog
            </h1>
            <p className="text-xs sm:text-sm text-[#566E7F] mt-1 max-w-2xl leading-relaxed">
              Supervisors &amp; machine operators on the floor will select from these assets when logging
              hourly output batches, breakdown alerts, or scheduled maintenance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsGujarati(!isGujarati)}
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition cursor-pointer self-start sm:self-auto ${
              isGujarati
                ? 'bg-[#E4F4F0] border-[#2D8576] text-[#184E46]'
                : 'bg-[#F8FAFA] hover:bg-[#F0F5F9] border-[#DFECF3] text-[#002941]'
            }`}
            title="Toggle Operator Language"
          >
            <span className="material-symbols-outlined text-[18px] text-[#2D8576]">translate</span>
            <div className="text-left text-xs font-bold leading-tight">
              <div>Rajeshbhai's View</div>
              <div className="text-[10px] text-[#566E7F] font-normal">
                {isGujarati ? 'ગુજરાતી સક્રિય' : 'સરળ ગુજરાતી / English'}
              </div>
            </div>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] text-xs font-bold tabular-nums">
              {machinery.length} Machines ready in catalog
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DFECF3] hover:bg-[#F0F5F9] text-xs font-bold text-[#002941] transition cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#2D8576]">upload_file</span>
              <span>Import Excel / WhatsApp List</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('quickAddMachineInput');
                el?.focus();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002941] hover:bg-[#0C3953] text-xs font-bold text-white transition cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#CFE8E1]">add</span>
              <span>Add Single Machine</span>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002941]">
              Registered Machinery ({machinery.length})
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#566E7F] font-semibold mr-1">Filter:</span>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#002941] text-white shadow-2xs'
                    : 'bg-[#F0F5F9] text-[#566E7F] hover:bg-[#E4ECF2]'
                }`}
              >
                All ({machinery.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('cnc')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeFilter === 'cnc'
                    ? 'bg-[#002941] text-white shadow-2xs'
                    : 'bg-[#F0F5F9] text-[#566E7F] hover:bg-[#E4ECF2]'
                }`}
              >
                CNC ({cncCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('conventional')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeFilter === 'conventional'
                    ? 'bg-[#002941] text-white shadow-2xs'
                    : 'bg-[#F0F5F9] text-[#566E7F] hover:bg-[#E4ECF2]'
                }`}
              >
                Conventional ({conventionalCount})
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredMachines.map((machine) => (
              <MachineRowItem
                key={machine.id}
                machine={machine}
                isGujarati={isGujarati}
                onEdit={() => handleOpenEdit(machine)}
                onDelete={() => deleteMachine(machine.id)}
              />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleQuickAdd}
          className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] flex flex-col sm:flex-row items-center gap-2.5 mb-5"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#002941] shrink-0">
            <span className="material-symbols-outlined text-[17px] text-[#2D8576]">add_circle</span>
            <span className="hidden sm:inline">QUICK ADD:</span>
          </div>

          <input
            id="quickAddMachineInput"
            type="text"
            value={newMachineName}
            onChange={(e) => setNewMachineName(e.target.value)}
            placeholder="e.g. Band Saw Cutter #01"
            className="flex-1 h-9 px-3 rounded-xl bg-white text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:ring-2 focus:ring-[#002941]/20 w-full sm:w-auto"
          />

          <select
            value={newMachineType}
            onChange={(e) => setNewMachineType(e.target.value)}
            className="h-9 px-3 rounded-xl bg-white text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:ring-2 focus:ring-[#002941]/20 w-full sm:w-auto"
          >
            <option value="CNC Turning">CNC Turning</option>
            <option value="VMC Milling">VMC Milling</option>
            <option value="Manual Lathe">Manual Lathe</option>
            <option value="Drilling &amp; Tapping">Drilling &amp; Tapping</option>
            <option value="Grinding &amp; Finishing">Grinding &amp; Finishing</option>
            <option value="Press &amp; Assembly">Press &amp; Assembly</option>
          </select>

          <button
            type="submit"
            className="w-full sm:w-auto h-9 px-4 rounded-xl bg-[#002941] hover:bg-[#0C3953] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px] text-[#CFE8E1]">add</span>
            <span>Add Machine</span>
          </button>
        </form>

        <div className="flex items-center justify-between pt-4 border-t border-[#DFECF3]">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#566E7F] hover:text-[#002941] px-4 py-2 rounded-full hover:bg-[#F0F5F9] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Shifts</span>
          </button>

          <div className="hidden sm:inline-block text-[11px] text-[#8DA1AF] font-medium">
            Next: Add line supervisors &amp; operators
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-xs font-bold text-[#566E7F] hover:text-[#002941] px-4 py-2 rounded-full hover:bg-[#F0F5F9] transition cursor-pointer hidden sm:inline-block"
            >
              Save as Draft
            </button>

            <PillButton
              type="button"
              onClick={() => handleNext()}
              variant="primary"
              size="md"
              icon={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              iconPosition="right"
            >
              Save &amp; Continue to Team Setup
            </PillButton>
          </div>
        </div>
      </div>

      <EditMachineModal
        isOpen={isEditModalOpen}
        machine={editingMachine}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMachine(null);
        }}
        onSave={(id, updates) => updateMachine(id, updates)}
      />

      <MachineImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
};

export default Step3MachineryCatalog;
