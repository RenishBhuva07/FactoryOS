import React, { useState } from 'react';

interface MachineImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (count: number) => void;
}

export const MachineImportModal: React.FC<MachineImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [tab, setTab] = useState<'upload' | 'whatsapp'>('upload');
  const [phone, setPhone] = useState('+91 98250 12345');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleConfirmUpload = () => {
    onImportSuccess(4);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-[#DFECF3] shadow-lg animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#DFECF3] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#2D8576]">upload_file</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#002941]">Import Shopfloor Machinery</h3>
              <p className="text-[11px] text-[#566E7F]">Excel sheet or WhatsApp concierge typing</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] flex items-center justify-center transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#F8FAFA] border border-[#DFECF3] mb-4 w-fit">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
              tab === 'upload'
                ? 'bg-gradient-to-r from-[#002941] to-[#164E6E] text-white shadow-xs'
                : 'text-[#566E7F] hover:text-[#002941]'
            }`}
          >
            Upload Excel / CSV
          </button>
          <button
            type="button"
            onClick={() => setTab('whatsapp')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
              tab === 'whatsapp'
                ? 'bg-gradient-to-r from-[#002941] to-[#164E6E] text-white shadow-xs'
                : 'text-[#566E7F] hover:text-[#002941]'
            }`}
          >
            WhatsApp Support Typing
          </button>
        </div>

        {tab === 'upload' ? (
          <div className="space-y-3.5">
            <div className="border-2 border-dashed border-[#DFECF3] hover:border-[#2D8576] rounded-2xl p-6 text-center transition bg-[#F8FAFA] flex flex-col items-center justify-center cursor-pointer relative">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="material-symbols-outlined text-[36px] text-[#2D8576] mb-2">
                cloud_upload
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#002941]">
                {uploadedFileName ? uploadedFileName : 'Click or Drag & Drop Machine Sheet'}
              </p>
              <p className="text-[11px] text-[#566E7F] mt-1">Supports .xlsx, .xls, .csv up to 10MB</p>
            </div>

            <div className="p-3 rounded-xl bg-[#F4FAF8] border border-[#CFE8E1] text-[11px] text-[#002941] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#2D8576]">description</span>
                <span>Expected columns: Machine Name, Category, Bay Location, Model Year</span>
              </div>
              <a
                href="#download-template"
                onClick={(e) => {
                  e.preventDefault();
                  alert('FactoryOS machine catalog sample template downloaded.');
                }}
                className="text-[#2D8576] font-bold hover:underline shrink-0"
              >
                Sample CSV
              </a>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFECF3]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-bold text-[#566E7F] hover:bg-[#F0F5F9] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmUpload}
                disabled={!uploadedFileName}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#002941] to-[#164E6E] text-white text-xs font-bold shadow-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Import Machines
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-[#F4FAF8] border border-[#CFE8E1] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#002941]">
                <span className="material-symbols-outlined text-[18px] text-[#2D8576]">chat</span>
                <span>Don't have an Excel file? Send a photo on WhatsApp</span>
              </div>
              <p className="text-[11px] text-[#566E7F] leading-relaxed">
                Take a photo of your workshop maintenance book or type your equipment list in WhatsApp. Our dedicated MSME support rep will format and import it for you within 15 minutes.
              </p>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
                Your WhatsApp Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 tabular-nums"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFECF3]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-bold text-[#566E7F] hover:bg-[#F0F5F9] transition cursor-pointer"
              >
                Close
              </button>
              <a
                href={`https://wa.me/919825012345?text=Hello%20FactoryOS%20team,%20here%20is%20my%20plant%20equipment%20list%20from%20phone%20${phone}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#002941] to-[#164E6E] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <span>Open WhatsApp Support</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineImportModal;
