export type DeliveryStatus = 'in-transit' | 'pending' | 'completed' | 'returned';

export interface Delivery {
  id: string;
  photoUrl?: string | null;
  customerName: string;
  cost: number;
  materialName: string;
  siteName: string;
  trackingNumber: string;
  courierName: string;
  dispatchDate: string; // ISO string
  status: DeliveryStatus;
}