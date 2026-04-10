import type { InferSchemaType } from 'mongoose';
import mongoose, { Schema, model, } from 'mongoose';
import type { Delivery } from './type.js';

export const deliveryStatuses = [
  'in-transit',
  'pending',
  'completed',
  'returned',
] as const;

const deliverySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    photoUrl: { type: String, default: null },
    customerName: { type: String, required: true },
    cost: { type: Number, required: true },
    materialName: { type: String, required: true },
    siteName: { type: String, required: true },
    trackingNumber: { type: String, required: true, unique: true },
    courierName: { type: String, required: true },
    dispatchDate: { type: Date, required: true },
    status: {
      type: String,
      enum: deliveryStatuses,
      required: true,
      default: 'pending',
    },
  } satisfies Record<keyof Omit<Delivery, "_id"> | "userId", any>
);

export function toDelivery(dto: DeliveryDocument): Delivery {
  const d = dto as any;

  return {
    _id: d._id.toString(),
    customerName: d.customerName,
    cost: d.cost,
    materialName: d.materialName,
    siteName: d.siteName,
    trackingNumber: d.trackingNumber,
    courierName: d.courierName,
    dispatchDate: d.dispatchDate.toISOString(),
    status: d.status,
    photoUrl: d.photoUrl ?? null,
  };
}

export type DeliveryDocument = InferSchemaType<typeof deliverySchema>;

export const DeliveryModel =
  model<DeliveryDocument>('Delivery', deliverySchema);