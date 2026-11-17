import React, { useState } from 'react';
import type { VideoGuideItem } from '../../../types/support';
import { VideoGuideModal } from './VideoGuideModal';

const GUIDES: VideoGuideItem[] = [
  {
    id: 'guide-1',
    title: '60-Second Supervisor Workbench Tour',
    duration: '1:45 min',
    category: 'Mobile Floor Tour',
    description: 'See how supervisors record hourly output batches and worker punch-ins on any smartphone.',
    icon: 'smartphone',
  },
  {
    id: 'guide-2',
    title: 'Printing & Sticking Machine QR Codes',
    duration: '2:10 min',
    category: 'Asset Setup',
    description: 'Learn how to generate, print, and affix waterproof QR stickers to CNCs and Lathes.',
    icon: 'qr_code_2',
  },
  {
    id: 'guide-3',
    title: 'Rotational Shifts & Overtime Setup',
    duration: '3:05 min',
    category: 'Shifts & Compliance',
    description: 'Configure multi-shift schedules and automatic overtime calculations under the Factories Act.',
    icon: 'schedule',
  },
  {
    id: 'guide-4',
    title: 'Strict Owner Privacy & Data Shield',
    duration: '1:30 min',
    category: 'Security & Access',
    description: 'Understand how P&L, customer margins, and client pricing stay isolated from floor supervisors.',
    icon: 'security',
  },
];

export const VideoGuidesSection: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<VideoGuideItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {GUIDES.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="bg-white p-4 rounded-2xl border border-[#DFECF3] shadow-xs flex flex-col justify-between hover:border-[#2D8576] transition group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] group-hover:bg-gradient-to-br group-hover:from-[#002941] group-hover:to-[#164E6E] group-hover:text-white transition flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">{guide.icon}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#F0F5F9] text-[#566E7F] text-[10px] font-bold tabular-nums">
                  {guide.duration}
                </span>
              </div>

              <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D8576] block mb-1">
                {guide.category}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#002941] leading-snug mb-1.5">
                {guide.title}
              </h4>
              <p className="text-[11px] text-[#566E7F] leading-relaxed">
                {guide.description}
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-[#DFECF3] flex items-center justify-between text-xs font-bold text-[#002941] group-hover:text-[#2D8576] transition">
              <span>Watch Walkthrough</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">
                play_circle
              </span>
            </div>
          </div>
        ))}
      </div>

      <VideoGuideModal
        guide={selectedGuide}
        isOpen={selectedGuide !== null}
        onClose={() => setSelectedGuide(null)}
      />
    </>
  );
};

export default VideoGuidesSection;
