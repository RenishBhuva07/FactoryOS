import React, { useState } from 'react';
import type { SupportCategory, SupportTicketFormData } from '../../../types/support';

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<SupportTicketFormData>({
    factoryName: 'Apex Engineering Works',
    contactName: 'Rajesh Bhai Patel',
    mobileNumber: '+91 98250 12345',
    category: 'machinery_qr',
    urgency: 'normal',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess(
      `Support ticket created for ${formData.factoryName}. A regional factory engineer will call ${formData.mobileNumber} within 15 minutes.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-[#DFECF3] shadow-lg relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#DFECF3] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#2D8576]">support_agent</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#002941]">Request Engineer Callback</h3>
              <p className="text-[11px] text-[#566E7F]">Average response time: 15 minutes</p>
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

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
                Factory Legal Name
              </label>
              <input
                type="text"
                required
                value={formData.factoryName}
                onChange={(e) => setFormData({ ...formData, factoryName: e.target.value })}
                className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
                Callback Mobile Number
              </label>
              <input
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 tabular-nums"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
                Issue Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as SupportCategory })
                }
                className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 appearance-none"
              >
                <option value="machinery_qr">Machinery &amp; QR Codes</option>
                <option value="onboarding_shifts">Shifts &amp; Schedule Timing</option>
                <option value="mobile_workbench">Supervisor Mobile Passlinks</option>
                <option value="owner_privacy_security">Data Privacy &amp; Security</option>
                <option value="billing_gst">GST / Udyam / Invoicing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
              Brief Description
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Need assistance setting up custom shift timings for CNC lathe line 2..."
              className="w-full p-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 resize-none"
            />
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
              type="submit"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Submit Callback Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportTicketModal;
