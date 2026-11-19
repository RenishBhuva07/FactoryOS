import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FactoryStoreContext } from "./factoryStoreContextDef";
import { useOnboarding } from "./useOnboarding";
import type {
  FactoryStoreState,
  FactoryStoreContextType,
  CreateOrderParams,
  IssueJobCardParams,
  LogProductionParams,
  ReportMachineIssueParams,
  ScheduleDispatchParams,
  OfflineProductionSlip,
  MachineIssueTicket,
} from "../types/factoryStore";
import type { OrderCommitment, OrderStatus } from "../types/orders";
import type { OrderExecutionItem } from "../types/ordersManagement";
import type { ProductionLogEntry } from "../types/production";
import type { QualityInspectionBatch } from "../types/quality";
import type { OutboundShipment } from "../types/dispatch";

import { MOCK_ACTIVE_ORDER_COMMITMENTS } from "../data/mockOrdersData";
import { MOCK_ORDER_EXECUTION_ITEMS } from "../data/mockOrdersManagementData";
import {
  MOCK_PRIMARY_WORKSTATIONS,
  MOCK_SECONDARY_MACHINES,
} from "../data/mockMachinesData";
import {
  MOCK_PRODUCTION_LOGS,
  MOCK_ASSEMBLY_LINES,
} from "../data/mockProductionData";
import {
  MOCK_FACTORY_OUTPUT,
  MOCK_WORKFORCE_ATTENDANCE,
  MOCK_ACTIVE_ORDERS,
  MOCK_MACHINE_STATUS,
  MOCK_HOURLY_OUTPUT,
  MOCK_ATTENTION_ALERTS,
  MOCK_MANAGER_ACTIVITIES,
} from "../data/mockDashboardData";
import { MOCK_TEAM_ROSTER } from "../data/mockTeamData";
import { MOCK_INVENTORY_ITEMS } from "../data/mockInventoryData";
import { MOCK_QUALITY_INSPECTIONS } from "../data/mockQualityData";
import { MOCK_OUTBOUND_SHIPMENTS } from "../data/mockDispatchData";

const STORAGE_KEY = "factoryos_unified_store_v1";

export const FactoryStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { state: onboardingState } = useOnboarding();

  const getInitialState = (): FactoryStoreState => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback to defaults
    }

    const initialMachines = MOCK_PRIMARY_WORKSTATIONS.map((ws, idx) => {
      if (onboardingState.machinery[idx]) {
        return {
          ...ws,
          name: onboardingState.machinery[idx].name,
          category: onboardingState.machinery[idx].typeLabel,
        };
      }
      return ws;
    });

    return {
      orders: MOCK_ACTIVE_ORDER_COMMITMENTS,
      orderExecutions: MOCK_ORDER_EXECUTION_ITEMS,
      machines: initialMachines,
      secondaryMachines: MOCK_SECONDARY_MACHINES,
      productionLogs: MOCK_PRODUCTION_LOGS,
      assemblyLines: MOCK_ASSEMBLY_LINES,
      hourlyOutput: MOCK_HOURLY_OUTPUT,
      attendanceRoster: MOCK_TEAM_ROSTER,
      inventoryItems: MOCK_INVENTORY_ITEMS,
      qualityInspections: MOCK_QUALITY_INSPECTIONS,
      dispatches: MOCK_OUTBOUND_SHIPMENTS,
      attentionAlerts: MOCK_ATTENTION_ALERTS,
      managerActivities: MOCK_MANAGER_ACTIVITIES,
      machineIssueTickets: [],
      offlineQueue: [],
      factoryOutput: MOCK_FACTORY_OUTPUT,
      workforceAttendance: MOCK_WORKFORCE_ATTENDANCE,
      activeOrdersKpi: MOCK_ACTIVE_ORDERS,
      machineStatusKpi: MOCK_MACHINE_STATUS,
    };
  };

  const [state, setState] = useState<FactoryStoreState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [state]);

  const createOrder = useCallback(
    (params: CreateOrderParams): OrderCommitment => {
      const poNumber =
        params.poNumber || `PO #ORD-${Math.floor(1050 + Math.random() * 900)}`;
      const initials =
        params.clientInitials ||
        params.clientName
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

      const newOrder: OrderCommitment = {
        id: `ord-${Date.now()}`,
        poNumber,
        clientName: params.clientName,
        clientInitials: initials,
        partDescription: params.partDescription,
        quantity: params.quantity,
        unit: params.unit || "Units",
        dispatchDue: params.dispatchDue || "Next Week, 17:00 IST",
        isDispatchUrgent: false,
        assignedMachine: params.assignedMachine || "Line 01 (CNC Lathe)",
        contractValue: params.contractValue,
        currencySymbol: "₹",
        status: "in_machining",
        statusLabel: "In Machining",
        statusVariant: "inProgress",
        progressPercent: 15,
        needsQc: false,
      };

      const newExecution: OrderExecutionItem = {
        id: `exec-${Date.now()}`,
        poNumber,
        clientName: params.clientName,
        partDescription: params.partDescription,
        quantityUnits: params.quantity,
        assignedLine: params.assignedMachine || "Line 01 (CNC Lathe)",
        bomStatus: "allocated",
        bomStatusLabel: "100% Allocated",
        fulfillmentStage: "machining",
        fulfillmentStageLabel: "Machining",
        dispatchDueDate: newOrder.dispatchDue,
        contractValue: `₹${(params.contractValue / 100000).toFixed(1)}L`,
      };

      setState((prev) => ({
        ...prev,
        orders: [newOrder, ...prev.orders],
        orderExecutions: [newExecution, ...prev.orderExecutions],
        activeOrdersKpi: {
          ...prev.activeOrdersKpi,
          inProgressCount: prev.activeOrdersKpi.inProgressCount + 1,
        },
        managerActivities: [
          {
            id: `act-${Date.now()}`,
            authorName: "Owner Desk",
            role: "Production Planning",
            time: "Just now",
            description: `Registered ${poNumber} for ${params.clientName} (${params.quantity} pcs).`,
            initials: "OD",
          },
          ...prev.managerActivities.slice(0, 9),
        ],
      }));

      return newOrder;
    },
    [],
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus, progressPercent?: number) => {
      setState((prev) => {
        const order = prev.orders.find(
          (o) => o.id === orderId || o.poNumber === orderId,
        );
        if (!order) return prev;

        const statusLabelMap: Record<OrderStatus, string> = {
          in_machining: "In Machining",
          awaiting_qc: "Awaiting Final QC",
          ready_for_dispatch: "Ready for Dispatch",
          completed: "Dispatched & Completed",
          in_assembly: "In Assembly",
          in_production: "In Production",
        };

        const statusVariantMap: Record<
          OrderStatus,
          "pending" | "inProgress" | "completed" | "issue"
        > = {
          in_machining: "inProgress",
          awaiting_qc: "pending",
          ready_for_dispatch: "completed",
          completed: "completed",
          in_assembly: "inProgress",
          in_production: "inProgress",
        };

        const updatedOrders = prev.orders.map((o) =>
          o.id === order.id
            ? {
                ...o,
                status,
                statusLabel: statusLabelMap[status],
                statusVariant: statusVariantMap[status],
                progressPercent:
                  progressPercent !== undefined
                    ? progressPercent
                    : o.progressPercent,
                needsQc: status === "awaiting_qc",
              }
            : o,
        );

        let qcPendingDelta = 0;
        let readyDispatchDelta = 0;

        if (order.status !== "awaiting_qc" && status === "awaiting_qc")
          qcPendingDelta = 1;
        if (order.status === "awaiting_qc" && status !== "awaiting_qc")
          qcPendingDelta = -1;
        if (
          order.status !== "ready_for_dispatch" &&
          status === "ready_for_dispatch"
        )
          readyDispatchDelta = 1;
        if (
          order.status === "ready_for_dispatch" &&
          status !== "ready_for_dispatch"
        )
          readyDispatchDelta = -1;

        return {
          ...prev,
          orders: updatedOrders,
          activeOrdersKpi: {
            ...prev.activeOrdersKpi,
            qcPendingCount: Math.max(
              0,
              prev.activeOrdersKpi.qcPendingCount + qcPendingDelta,
            ),
            readyForDispatchCount: Math.max(
              0,
              prev.activeOrdersKpi.readyForDispatchCount + readyDispatchDelta,
            ),
          },
        };
      });
    },
    [],
  );

  const issueJobCard = useCallback(
    (params: IssueJobCardParams): OrderExecutionItem => {
      const newExec: OrderExecutionItem = {
        id: `exec-${Date.now()}`,
        poNumber: params.poNumber,
        clientName: params.clientName,
        partDescription: params.partDescription,
        quantityUnits: params.quantityUnits,
        assignedLine: params.assignedLine,
        bomStatus: "allocated",
        bomStatusLabel: "100% Allocated",
        fulfillmentStage: "machining",
        fulfillmentStageLabel: "Machining",
        dispatchDueDate: params.dispatchDueDate || "In 4 Days",
        contractValue: params.contractValue || "₹2.8L",
      };

      setState((prev) => {
        const updatedLines = prev.assemblyLines.map((line) => {
          if (
            line.name.includes(params.assignedLine) ||
            line.lineCode.includes(params.assignedLine)
          ) {
            return {
              ...line,
              currentBatch: `${params.poNumber} ${params.partDescription.split(" ")[0]}`,
              completedUnits: 0,
              targetUnits: params.quantityUnits,
              status: "running" as const,
              statusLabel: "Running",
            };
          }
          return line;
        });

        return {
          ...prev,
          orderExecutions: [newExec, ...prev.orderExecutions],
          assemblyLines: updatedLines,
          managerActivities: [
            {
              id: `act-${Date.now()}`,
              authorName: "Shopfloor Lead",
              role: "Job Scheduling",
              time: "Just now",
              description: `Job Card issued for ${params.poNumber} on ${params.assignedLine}.`,
              initials: "SL",
            },
            ...prev.managerActivities.slice(0, 9),
          ],
        };
      });

      return newExec;
    },
    [],
  );

  const logProduction = useCallback(
    (params: LogProductionParams): { queuedOffline: boolean } => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (params.isOffline) {
        const slip: OfflineProductionSlip = {
          id: `offline-${Date.now()}`,
          jobCard: params.jobCard,
          machine: params.machine,
          goodUnits: params.goodUnits,
          scrapUnits: params.scrapUnits,
          defectReason: params.defectReason || "None",
          notes: params.notes || "",
          operatorName: params.operatorName || "Shopfloor Operator",
          timestamp: timeStr,
        };

        setState((prev) => ({
          ...prev,
          offlineQueue: [...prev.offlineQueue, slip],
        }));

        return { queuedOffline: true };
      }

      const newLog: ProductionLogEntry = {
        id: `log-${Date.now()}`,
        machineCode: params.machine.slice(0, 4).toUpperCase(),
        machineName: params.machine,
        isVerified: true,
        jobCard: params.jobCard,
        partName: "Machined Components",
        shift: "Shift A (08:00 - 16:30)",
        outputUnits: params.goodUnits,
        scrapUnits: params.scrapUnits,
        scrapReason: params.defectReason,
        operatorName: params.operatorName || "Mahesh Solanki",
        cycleTime: "2.4 mins",
        verifiedBy: "Shift Supervisor",
      };

      setState((prev) => {
        const newProduced = prev.factoryOutput.produced + params.goodUnits;
        const targetAchieved =
          Math.round(
            (newProduced / Math.max(1, prev.factoryOutput.target)) * 100 * 10,
          ) / 10;

        const updatedHourly = prev.hourlyOutput.map((h, i) => {
          if (i === prev.hourlyOutput.length - 1) {
            return {
              ...h,
              actual: h.actual + params.goodUnits,
            };
          }
          return h;
        });

        const updatedLines = prev.assemblyLines.map((l) => {
          if (
            params.machine.includes(l.lineCode) ||
            params.machine.includes(l.name)
          ) {
            return {
              ...l,
              completedUnits: l.completedUnits + params.goodUnits,
            };
          }
          return l;
        });

        const updatedInventory = prev.inventoryItems.map((item) => {
          if (item.category === "Raw Steel" && item.currentStock > 10) {
            const deduction = Math.min(
              item.currentStock,
              Math.round(params.goodUnits * 0.4),
            );
            const newStock = item.currentStock - deduction;
            return {
              ...item,
              currentStock: newStock,
              status:
                newStock <= item.reorderLevel
                  ? ("low_stock" as const)
                  : ("optimal" as const),
              statusLabel:
                newStock <= item.reorderLevel ? "Low Stock" : "Optimal",
            };
          }
          return item;
        });

        return {
          ...prev,
          productionLogs: [newLog, ...prev.productionLogs],
          hourlyOutput: updatedHourly,
          assemblyLines: updatedLines,
          inventoryItems: updatedInventory,
          factoryOutput: {
            ...prev.factoryOutput,
            produced: newProduced,
            targetAchievedPercent: targetAchieved,
          },
          managerActivities: [
            {
              id: `act-${Date.now()}`,
              authorName: params.operatorName || "Mahesh Solanki",
              role: "Shift A Supervisor",
              time: timeStr,
              description: `Recorded ${params.goodUnits} pcs output on ${params.machine}.`,
              initials: "MS",
            },
            ...prev.managerActivities.slice(0, 9),
          ],
        };
      });

      return { queuedOffline: false };
    },
    [],
  );

  const syncOfflineQueue = useCallback((): number => {
    let count = 0;
    setState((prev) => {
      if (prev.offlineQueue.length === 0) return prev;
      count = prev.offlineQueue.length;

      let additionalProduced = 0;
      const newLogs: ProductionLogEntry[] = prev.offlineQueue.map((slip) => {
        additionalProduced += slip.goodUnits;
        return {
          id: `log-${Date.now()}-${slip.id}`,
          machineCode: slip.machine.slice(0, 4).toUpperCase(),
          machineName: slip.machine,
          isVerified: true,
          jobCard: slip.jobCard,
          partName: "Machined Components",
          shift: "Shift A (Offline Sync)",
          outputUnits: slip.goodUnits,
          scrapUnits: slip.scrapUnits,
          scrapReason: slip.defectReason,
          operatorName: slip.operatorName,
          cycleTime: "2.4 mins",
          verifiedBy: "Auto-Synced to Cloud",
        };
      });

      const newProduced = prev.factoryOutput.produced + additionalProduced;
      const targetAchieved =
        Math.round(
          (newProduced / Math.max(1, prev.factoryOutput.target)) * 100 * 10,
        ) / 10;

      return {
        ...prev,
        productionLogs: [...newLogs, ...prev.productionLogs],
        offlineQueue: [],
        factoryOutput: {
          ...prev.factoryOutput,
          produced: newProduced,
          targetAchievedPercent: targetAchieved,
        },
        managerActivities: [
          {
            id: `act-${Date.now()}`,
            authorName: "Sync Agent",
            role: "Offline Worker",
            time: "Just now",
            description: `Synchronized ${count} cached floor slips to plant server.`,
            initials: "SA",
          },
          ...prev.managerActivities.slice(0, 9),
        ],
      };
    });

    return count;
  }, []);

  const reportMachineIssue = useCallback(
    (params: ReportMachineIssueParams): string => {
      const ticketId = `TKT-${Math.floor(1040 + Math.random() * 8900)}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setState((prev) => {
        const targetMachine = prev.machines.find(
          (m) => m.id === params.machineId || m.name.includes(params.machineId),
        );
        const machineCode = targetMachine
          ? targetMachine.code
          : params.machineId;
        const machineName = targetMachine
          ? targetMachine.name
          : params.machineId;

        const newTicket: MachineIssueTicket = {
          id: ticketId,
          machineId: params.machineId,
          machineCode,
          category: params.category,
          severity: params.severity,
          description: params.description,
          reportedBy: params.reportedBy || "Shift Supervisor",
          timestamp: timeStr,
          status: "open",
          estimatedDowntimeMinutes: params.downtimeMinutes || 45,
        };

        const updatedMachines = prev.machines.map((m) =>
          m.id === params.machineId || m.name.includes(params.machineId)
            ? {
                ...m,
                status: "maintenance" as const,
                statusLabel: "Down for Maintenance",
                currentJobOrTask: `Maintenance: ${params.category}`,
                isActionAlert: true,
                actionText: "Check PM →",
              }
            : m,
        );

        const newAlert = {
          id: `alert-${ticketId}`,
          title: `${machineName} Breakdown`,
          categoryIcon: "build",
          badgeText: `${params.severity.toUpperCase()} • ${params.category}`,
          badgeVariant:
            params.severity === "critical"
              ? ("urgent" as const)
              : ("warning" as const),
          description: `${params.description}. Technician dispatched to bay.`,
          secondaryActionText: "View Machine",
          primaryActionText: "Resolve & Resume",
        };

        return {
          ...prev,
          machines: updatedMachines,
          machineIssueTickets: [newTicket, ...prev.machineIssueTickets],
          attentionAlerts: [newAlert, ...prev.attentionAlerts],
          machineStatusKpi: {
            ...prev.machineStatusKpi,
            operational: Math.max(0, prev.machineStatusKpi.operational - 1),
            maintenanceNote: `${machineName} down for ${params.category}`,
          },
          managerActivities: [
            {
              id: `act-${Date.now()}`,
              authorName: params.reportedBy || "Shift Supervisor",
              role: "Shopfloor",
              time: timeStr,
              description: `Flagged breakdown on ${machineName}: ${params.category}.`,
              initials: "MC",
            },
            ...prev.managerActivities.slice(0, 9),
          ],
        };
      });

      return ticketId;
    },
    [],
  );

  const resolveMachineMaintenance = useCallback(
    (machineId: string, resolutionNotes?: string) => {
      setState((prev) => {
        const updatedMachines = prev.machines.map((m) =>
          m.id === machineId || m.name.includes(machineId)
            ? {
                ...m,
                status: "operational" as const,
                statusLabel: "Operational",
                currentJobOrTask: resolutionNotes || "Job Card Resumed",
                isActionAlert: false,
                actionText: "Job Slip →",
              }
            : m,
        );

        const updatedTickets = prev.machineIssueTickets.map((t) =>
          t.machineId === machineId || t.machineCode.includes(machineId)
            ? { ...t, status: "resolved" as const }
            : t,
        );

        const updatedAlerts = prev.attentionAlerts.filter(
          (a) =>
            !a.title.toLowerCase().includes(machineId.toLowerCase()) &&
            !a.id.includes(machineId),
        );

        return {
          ...prev,
          machines: updatedMachines,
          machineIssueTickets: updatedTickets,
          attentionAlerts: updatedAlerts,
          machineStatusKpi: {
            ...prev.machineStatusKpi,
            operational: Math.min(
              prev.machines.length,
              prev.machineStatusKpi.operational + 1,
            ),
            maintenanceNote: "All primary workstations active",
          },
        };
      });
    },
    [],
  );

  const updateAttendance = useCallback(
    (
      memberId: string,
      status: "on_spindle" | "on_break" | "overtime" | "absent",
      station?: string,
    ) => {
      setState((prev) => {
        const statusLabelMap = {
          on_spindle: "On Spindle",
          on_break: "On Break",
          overtime: "Overtime Shift",
          absent: "Absent",
        };

        const updatedRoster = prev.attendanceRoster.map((m) =>
          m.id === memberId
            ? {
                ...m,
                status,
                statusLabel: statusLabelMap[status],
                assignedStation: station || m.assignedStation,
              }
            : m,
        );

        const presentCount = updatedRoster.filter(
          (m) =>
            m.status === "on_spindle" ||
            m.status === "overtime" ||
            m.status === "on_break",
        ).length;
        const absentCount = updatedRoster.filter(
          (m) => m.status === "absent",
        ).length;

        return {
          ...prev,
          attendanceRoster: updatedRoster,
          workforceAttendance: {
            ...prev.workforceAttendance,
            present: presentCount,
            absent: absentCount,
          },
        };
      });
    },
    [],
  );

  const bulkMarkAttendance = useCallback((status: "on_spindle" | "absent") => {
    setState((prev) => {
      const statusLabel = status === "on_spindle" ? "On Spindle" : "Absent";
      const updatedRoster = prev.attendanceRoster.map((m) => ({
        ...m,
        status,
        statusLabel,
      }));

      const presentCount = status === "on_spindle" ? updatedRoster.length : 0;
      const absentCount = status === "absent" ? updatedRoster.length : 0;

      return {
        ...prev,
        attendanceRoster: updatedRoster,
        workforceAttendance: {
          ...prev.workforceAttendance,
          present: presentCount,
          absent: absentCount,
        },
      };
    });
  }, []);

  const adjustStock = useCallback(
    (itemId: string, quantityDelta: number, reason: string) => {
      setState((prev) => {
        const updatedItems = prev.inventoryItems.map((item) => {
          if (item.id === itemId) {
            const newStock = Math.max(0, item.currentStock + quantityDelta);
            const isLow = newStock <= item.reorderLevel;
            return {
              ...item,
              currentStock: newStock,
              status: isLow ? ("low_stock" as const) : ("optimal" as const),
              statusLabel: isLow ? "Low Stock" : "Optimal",
            };
          }
          return item;
        });

        return {
          ...prev,
          inventoryItems: updatedItems,
          managerActivities: [
            {
              id: `act-${Date.now()}`,
              authorName: "Stores Lead",
              role: "Inventory Audit",
              time: "Just now",
              description: `Stock adjustment: ${quantityDelta > 0 ? "+" : ""}${quantityDelta} (${reason}).`,
              initials: "SL",
            },
            ...prev.managerActivities.slice(0, 9),
          ],
        };
      });
    },
    [],
  );

  const recordGoodsReceipt = useCallback(
    (params: {
      poOrInvoice: string;
      items: { itemId: string; quantityReceived: number }[];
      supplierName: string;
    }) => {
      setState((prev) => {
        const itemMap = new Map(
          params.items.map((i) => [i.itemId, i.quantityReceived]),
        );

        const updatedItems = prev.inventoryItems.map((item) => {
          if (itemMap.has(item.id)) {
            const added = itemMap.get(item.id) || 0;
            const newStock = item.currentStock + added;
            return {
              ...item,
              currentStock: newStock,
              status:
                newStock <= item.reorderLevel
                  ? ("low_stock" as const)
                  : ("optimal" as const),
              statusLabel:
                newStock <= item.reorderLevel ? "Low Stock" : "Optimal",
            };
          }
          return item;
        });

        return {
          ...prev,
          inventoryItems: updatedItems,
          managerActivities: [
            {
              id: `act-${Date.now()}`,
              authorName: "Stores Inward",
              role: "Inbound GRN",
              time: "Just now",
              description: `GRN recorded for ${params.supplierName} (${params.poOrInvoice}).`,
              initials: "SI",
            },
            ...prev.managerActivities.slice(0, 9),
          ],
        };
      });
    },
    [],
  );

  const createQualityInspection = useCallback(
    (record: {
      batchPoNumber: string;
      componentName: string;
      toleranceVariance: string;
      sampleCount: number;
      inspectionTool: string;
      status: "passed" | "under_inspection" | "rework_required";
    }) => {
      const newInspection: QualityInspectionBatch = {
        id: `qc-${Date.now()}`,
        batchPoNumber: record.batchPoNumber,
        componentName: record.componentName,
        componentSpec: "Series MSME Precision",
        toleranceVariance: record.toleranceVariance,
        toleranceDetail: `Verified with ${record.inspectionTool}`,
        sampleCheckedText: `${record.sampleCount} pcs checked`,
        inspectorName: "Dinesh M. (QC Lead)",
        status: record.status,
        statusLabel:
          record.status === "passed"
            ? "Passed"
            : record.status === "under_inspection"
              ? "Under Inspection"
              : "Rework Required",
        actionText:
          record.status === "passed"
            ? "Sign Certificate"
            : record.status === "under_inspection"
              ? "Log Deviation Note"
              : "Send to Deburring",
        actionType:
          record.status === "passed"
            ? "sign_cert"
            : record.status === "under_inspection"
              ? "log_deviation"
              : "send_rework",
      };

      setState((prev) => ({
        ...prev,
        qualityInspections: [newInspection, ...prev.qualityInspections],
      }));
    },
    [],
  );

  const updateQualityStatus = useCallback(
    (
      inspectionId: string,
      status: "passed" | "under_inspection" | "rework_required",
      _notes?: string,
    ) => {
      setState((prev) => {
        const target = prev.qualityInspections.find(
          (i) => i.id === inspectionId,
        );
        if (!target) return prev;

        const updatedInspections = prev.qualityInspections.map((i) =>
          i.id === inspectionId
            ? {
                ...i,
                status,
                statusLabel:
                  status === "passed"
                    ? "Passed"
                    : status === "under_inspection"
                      ? "Under Inspection"
                      : "Rework Required",
                actionText:
                  status === "passed"
                    ? "Certificate Released"
                    : status === "under_inspection"
                      ? "Log Deviation"
                      : "Routed to Deburring",
              }
            : i,
        );

        let updatedOrders = prev.orders;
        let readyDispatchDelta = 0;
        let qcPendingDelta = 0;

        if (status === "passed") {
          updatedOrders = prev.orders.map((o) => {
            if (o.poNumber === target.batchPoNumber) {
              readyDispatchDelta += 1;
              qcPendingDelta -= 1;
              return {
                ...o,
                status: "ready_for_dispatch" as const,
                statusLabel: "Ready for Dispatch",
                statusVariant: "completed" as const,
                progressPercent: 100,
                needsQc: false,
              };
            }
            return o;
          });
        }

        return {
          ...prev,
          qualityInspections: updatedInspections,
          orders: updatedOrders,
          activeOrdersKpi: {
            ...prev.activeOrdersKpi,
            qcPendingCount: Math.max(
              0,
              prev.activeOrdersKpi.qcPendingCount + qcPendingDelta,
            ),
            readyForDispatchCount: Math.max(
              0,
              prev.activeOrdersKpi.readyForDispatchCount + readyDispatchDelta,
            ),
          },
        };
      });
    },
    [],
  );

  const scheduleDispatch = useCallback(
    (params: ScheduleDispatchParams): OutboundShipment => {
      const newShipment: OutboundShipment = {
        id: `dsp-${Date.now()}`,
        consignmentNumber: `#DSP-${Math.floor(4030 + Math.random() * 80)}`,
        clientName: params.client,
        clientLocation: "Gujarat Industrial Hub",
        volumeUnits: params.units,
        volumePallets: Math.ceil(params.units / 250),
        productCategory: "Finished MSME Assemblies",
        carrierName: params.carrier,
        vehicleNumber: params.vehicle,
        gatePassNumber: `#GP-${Math.floor(8840 + Math.random() * 90)}`,
        gatePassTime: "Issued: Just now",
        status: "loading",
        statusLabel: `Dock Staged (${params.dockBay})`,
        statusVariant: "inProgress",
        actionType: "sign_eway",
      };

      setState((prev) => {
        const updatedOrders = prev.orders.map((o) => {
          if (params.orderPoNumber && o.poNumber === params.orderPoNumber) {
            return {
              ...o,
              status: "completed" as const,
              statusLabel: "Dispatched & Completed",
              statusVariant: "completed" as const,
            };
          }
          return o;
        });

        return {
          ...prev,
          dispatches: [newShipment, ...prev.dispatches],
          orders: updatedOrders,
          managerActivities: [
            {
              id: `act-${Date.now()}`,
              authorName: "Dispatch Staging",
              role: "Outbound Logistics",
              time: "Just now",
              description: `Consignment ${newShipment.consignmentNumber} scheduled to ${params.carrier}.`,
              initials: "DS",
            },
            ...prev.managerActivities.slice(0, 9),
          ],
        };
      });

      return newShipment;
    },
    [],
  );

  const signGatePass = useCallback((dispatchId: string) => {
    setState((prev) => {
      const updatedDispatches = prev.dispatches.map((s) =>
        s.id === dispatchId
          ? {
              ...s,
              status: "in_transit" as const,
              statusLabel: "In Transit",
              statusVariant: "completed" as const,
              actionType: "track_gps" as const,
            }
          : s,
      );

      return {
        ...prev,
        dispatches: updatedDispatches,
      };
    });
  }, []);

  const resolveAlert = useCallback((alertId: string) => {
    setState((prev) => ({
      ...prev,
      attentionAlerts: prev.attentionAlerts.filter((a) => a.id !== alertId),
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable
    }
    setState(getInitialState());
  }, []);

  const value = useMemo<FactoryStoreContextType>(
    () => ({
      ...state,
      createOrder,
      updateOrderStatus,
      issueJobCard,
      logProduction,
      syncOfflineQueue,
      reportMachineIssue,
      resolveMachineMaintenance,
      updateAttendance,
      bulkMarkAttendance,
      adjustStock,
      recordGoodsReceipt,
      createQualityInspection,
      updateQualityStatus,
      scheduleDispatch,
      signGatePass,
      resolveAlert,
      resetToDefaults,
    }),
    [
      state,
      createOrder,
      updateOrderStatus,
      issueJobCard,
      logProduction,
      syncOfflineQueue,
      reportMachineIssue,
      resolveMachineMaintenance,
      updateAttendance,
      bulkMarkAttendance,
      adjustStock,
      recordGoodsReceipt,
      createQualityInspection,
      updateQualityStatus,
      scheduleDispatch,
      signGatePass,
      resolveAlert,
      resetToDefaults,
    ],
  );

  return (
    <FactoryStoreContext.Provider value={value}>
      {children}
    </FactoryStoreContext.Provider>
  );
};
