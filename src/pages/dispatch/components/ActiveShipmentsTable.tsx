import React, { useState } from 'react';
import { Card, PillButton } from '../../../components/common';
import type { OutboundShipment } from '../../../types/dispatch';

export interface ActiveShipmentsTableProps {
  shipments: OutboundShipment[];
  selectedShipmentIds?: string[];
  onToggleSelectShipment?: (id: string) => void;
  onToggleSelectAll?: () => void;
  onTrackGps?: (shipment: OutboundShipment) => void;
  onSignEWayBill?: (shipment: OutboundShipment) => void;
  onExpediteQc?: (shipment: OutboundShipment) => void;
  className?: string;
}

export const ActiveShipmentsTable: React.FC<ActiveShipmentsTableProps> = ({
  shipments,
  selectedShipmentIds = [],
  onToggleSelectShipment,
  onToggleSelectAll,
  onTrackGps,
  onSignEWayBill,
  onExpediteQc,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShipments = shipments.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.consignmentNumber.toLowerCase().includes(q) ||
      s.clientName.toLowerCase().includes(q) ||
      s.carrierName.toLowerCase().includes(q) ||
      s.vehicleNumber.toLowerCase().includes(q)
    );
  });

  const isAllSelected =
    filteredShipments.length > 0 &&
    filteredShipments.every((s) => selectedShipmentIds.includes(s.id));

  return (
    <Card padding="none" className={`flex flex-col overflow-hidden ${className}`}>
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941] tracking-tight">
              Active Outbound Shipments
            </h2>
            <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
              Real-time status of road freight and logistics carriers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-[#8DA1AF]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter consignments..."
              className="w-full h-9 pl-9 pr-3 rounded-full text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] placeholder-[#8DA1AF] focus:outline-none focus:border-[#002941] focus:bg-white transition-all"
            />
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-white transition-all cursor-pointer"
            title="Filter options"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs min-w-[720px]">
          <thead className="bg-[#F8FAFA] text-[#566E7F] font-bold uppercase tracking-wider text-[11px] border-b border-[#DFECF3]">
            <tr>
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                />
              </th>
              <th className="py-3 px-3">Consignment & Client</th>
              <th className="py-3 px-4">Volume</th>
              <th className="py-3 px-4">Carrier & Vehicle</th>
              <th className="py-3 px-4">Gate Pass</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DFECF3]">
            {filteredShipments.map((s) => {
              const isSelected = selectedShipmentIds.includes(s.id);

              return (
                <tr
                  key={s.id}
                  className={`hover:bg-[#F8FAFA]/80 transition-colors ${
                    isSelected ? 'bg-[#F0F5F9]/60' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectShipment && onToggleSelectShipment(s.id)}
                      className="w-4 h-4 rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                    />
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <span className="material-symbols-outlined text-[17px]">
                          inventory_2
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-[#002941] text-xs sm:text-[13px] tabular-nums">
                          {s.consignmentNumber}
                        </div>
                        <div className="text-[11px] text-[#566E7F]">
                          {s.clientName} ({s.clientLocation})
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#002941] tabular-nums">
                      {s.volumeUnits.toLocaleString()} units
                    </div>
                    <div className="text-[11px] text-[#566E7F] tabular-nums">
                      {s.volumePallets} Pallets ({s.productCategory})
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#002941]">{s.carrierName}</div>
                    <div className="text-[11px] text-[#566E7F] font-mono tabular-nums">
                      {s.vehicleNumber}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {s.status === 'delayed' ? (
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE6E4] text-[#D62727]">
                          Awaiting QC
                        </span>
                        <div className="text-[11px] text-[#871919] mt-0.5 tabular-nums">
                          {s.gatePassTime}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E4F4F0] text-[#20675C] tabular-nums">
                          {s.gatePassNumber}
                        </span>
                        <div className="text-[11px] text-[#566E7F] mt-0.5 tabular-nums">
                          {s.gatePassTime}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {s.status === 'in_transit' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#CFE8E1] text-[#103530]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#20675C]" />
                        {s.statusLabel}
                      </span>
                    )}
                    {s.status === 'loading' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0F5F9] text-[#002941] border border-[#DFECF3]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3381AB]" />
                        {s.statusLabel}
                      </span>
                    )}
                    {s.status === 'delayed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFE6E4] text-[#D62727]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D62727] animate-pulse" />
                        {s.statusLabel}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    {s.actionType === 'track_gps' && (
                      <PillButton
                        variant="primary"
                        size="sm"
                        icon={<span className="material-symbols-outlined text-[15px]">navigation</span>}
                        onClick={() => onTrackGps && onTrackGps(s)}
                      >
                        Track GPS
                      </PillButton>
                    )}
                    {s.actionType === 'sign_eway' && (
                      <PillButton
                        variant="ghost"
                        size="sm"
                        icon={<span className="material-symbols-outlined text-[15px]">draw</span>}
                        onClick={() => onSignEWayBill && onSignEWayBill(s)}
                      >
                        Sign E-Way Bill
                      </PillButton>
                    )}
                    {s.actionType === 'expedite_qc' && (
                      <button
                        type="button"
                        onClick={() => onExpediteQc && onExpediteQc(s)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs hover:opacity-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">bolt</span>
                        Expedite QC
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
