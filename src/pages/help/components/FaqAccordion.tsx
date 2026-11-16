import React, { useState } from 'react';
import type { FaqItem, SupportCategory } from '../../../types/support';

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'mobile_workbench',
    question: 'How do shopfloor supervisors log production without passwords?',
    answer:
      'FactoryOS generates a secure, one-tap mobile passlink (e.g. factoryos.in/m/apex-eng-shift-a). When sent via WhatsApp or SMS, supervisors tap the link to immediately open their 60-second shift workbench on any Android or iOS browser without downloading an app or entering passwords.',
    highlightTag: 'Instant Passlinks',
  },
  {
    id: 'faq-2',
    category: 'mobile_workbench',
    question: 'What happens if factory cell connectivity or Wi-Fi drops on the floor?',
    answer:
      'The supervisor workbench is fully offline-capable. Punch-ins, hourly output entries, and rejection counts are cached securely on the phone’s local storage and sync automatically to the cloud the moment the device reconnects.',
    highlightTag: 'Offline Sync',
  },
  {
    id: 'faq-3',
    category: 'machinery_qr',
    question: 'Do we need expensive IoT sensors or PLC wiring on our CNC/Lathes?',
    answer:
      'Zero hardware setup is required. FactoryOS uses auto-generated QR code stickers printed on standard paper or sticker sheets. Machine operators tap the QR code with their phone camera to instantly start an hourly batch or report breakdown downtime.',
    highlightTag: 'Zero Hardware',
  },
  {
    id: 'faq-4',
    category: 'owner_privacy_security',
    question: 'Can shift supervisors or machine operators see my factory profits and pricing?',
    answer:
      'No. The Strict Owner Privacy Shield completely isolates confidential data. Supervisors only see machine counters, batch targets, and worker attendance. Profit & Loss, sales invoices, client purchase orders, and pricing remain 100% hidden and accessible only to master owner credentials.',
    highlightTag: 'Owner Privacy Shield',
  },
  {
    id: 'faq-5',
    category: 'onboarding_shifts',
    question: 'Can I add a 3rd rotational night shift or change timings later?',
    answer:
      'Yes! You can introduce rotational 3rd shifts, adjust shift boundaries (e.g. 08:00 AM to 04:30 PM), or alter tea breaks at any time from Settings > Shift Management without disrupting historical production or attendance logs.',
    highlightTag: 'Flexible Shifts',
  },
  {
    id: 'faq-6',
    category: 'machinery_qr',
    question: 'What if I have handwritten machine lists or an old Excel file?',
    answer:
      'Simply send a picture of your equipment sheet or Excel workbook to our WhatsApp Concierge at +91 98250 12345. Our dedicated MSME onboarding specialists will format and load your entire catalog for you within 15 minutes.',
    highlightTag: 'WhatsApp Typing Concierge',
  },
];

interface FaqAccordionProps {
  searchQuery: string;
  categoryFilter: SupportCategory;
}

const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={index}
            className="bg-[#CFE8E1] text-[#002941] px-0.5 rounded-xs font-bold"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ searchQuery, categoryFilter }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.highlightTag && item.highlightTag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-2.5">
      {filteredFaqs.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-[#DFECF3] text-center">
          <span className="material-symbols-outlined text-[32px] text-[#8DA1AF] mb-2">search_off</span>
          <p className="text-sm font-bold text-[#002941]">No matching FAQs found</p>
          <p className="text-xs text-[#566E7F] mt-1">
            Try searching with other keywords or reach out via WhatsApp concierge.
          </p>
        </div>
      ) : (
        filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);

          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-[#DFECF3] shadow-2xs overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3 hover:bg-[#F8FAFA] transition cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {faq.highlightTag && (
                    <span className="px-2 py-0.5 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-[10px] font-bold shrink-0">
                      {highlightMatch(faq.highlightTag, searchQuery)}
                    </span>
                  )}
                  <h4 className="text-xs sm:text-sm font-bold text-[#002941] leading-snug">
                    {highlightMatch(faq.question, searchQuery)}
                  </h4>
                </div>
                <span
                  className={`material-symbols-outlined text-[18px] text-[#8DA1AF] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#002941]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 text-xs sm:text-[13px] text-[#566E7F] leading-relaxed border-t border-[#DFECF3]/60 bg-[#F8FAFA]/50">
                  <p className="pt-3">{highlightMatch(faq.answer, searchQuery)}</p>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default FaqAccordion;
