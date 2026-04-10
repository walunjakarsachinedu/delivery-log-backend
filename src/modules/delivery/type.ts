import type { DELIVERY_STATUSES } from "./constants.js";

export type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];

export interface Delivery {
  _id: string;
  photoUrl?: string | null | undefined;
  customerName: string;
  cost: number;
  materialName: string;
  siteName: string;
  trackingNumber: string;
  courierName: string;
  dispatchDate: string; // ISO string
  status: DeliveryStatus;
}