import React from 'react';
import { Card, PillButton } from '../../../components/common';
import type { TeamMemberPermission } from '../../../types/settings';

export interface TeamRolePermissionsCardProps {
  members: TeamMemberPermission[];
  onAddMember?: () => void;
  className?: string;
}

export const TeamRolePermissionsCard: React.FC<TeamRolePermissionsCardProps> = ({
  members,
  onAddMember,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">badge</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#002941]">
              Team Role Permissions
            </h2>
            <p className="text-xs text-[#566E7F]">
              Manage plant access and role capabilities
            </p>
          </div>
        </div>

        <PillButton
          variant="ghost"
          size="sm"
          icon={<span className="material-symbols-outlined text-[16px]">add</span>}
          onClick={onAddMember}
        >
          Add Member
        </PillButton>
      </div>

      <div className="space-y-2.5">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#002941] text-white text-xs font-bold flex items-center justify-center shrink-0">
                {member.avatarInitials}
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold text-[#002941]">
                  {member.name}
                </h3>
                <p className="text-[11px] text-[#566E7F]">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EBF1F5] text-[#002941]">
                {member.role}
              </span>

              <button
                type="button"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#EBF1F5] transition-all cursor-pointer"
                title="Member options"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
