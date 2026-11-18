export interface InventoryItem {
  id: string;
  materialName: string;
  sku: string;
  category: string;
  currentStock: number;
  currentStockUnit: string;
  reorderLevel: number;
  reorderLevelUnit: string;
  supplierName: string;
  supplierLocation: string;
  supplierContact: string;
  binCard: string;
  status: 'low_stock' | 'reorder_due' | 'optimal';
  statusLabel: string;
}

export interface InventoryKpiMetrics {
  totalSkuCount: number;
  skuDescription: string;
  capacityUtilizationPercent: number;
  capacitySubtext: string;
  pendingInboundCount: number;
  pendingInboundDescription: string;
  stockValuation: string;
  stockValuationTime: string;
}

export interface SupplierReliability {
  id: string;
  supplierName: string;
  location: string;
  compliancePercent: number;
}
