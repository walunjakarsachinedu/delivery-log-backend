import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { DELIVERY_STATUSES } from "./constants.js";
import type { Delivery } from "./type.js";

const c = initContract();

export const deliverySchema = z.object({
  _id: z.string(),
  photoUrl: z.string().nullable().optional(),
  customerName: z.string(),
  cost: z.number(),
  materialName: z.string(),
  siteName: z.string(),
  trackingNumber: z.string(),
  courierName: z.string(),
  dispatchDate: z.string(),
  status: z.enum(DELIVERY_STATUSES),
} satisfies Record<keyof Delivery, z.ZodTypeAny>);

export const createDeliveryBody = deliverySchema.omit({ _id: true });

export const deliveryContract = c.router({
  create: {
    method: "POST",
    path: "/",
    body: createDeliveryBody,
    responses: {
      200: deliverySchema,
    },
  },

  getAll: {
    method: "GET",
    path: "/",
    query: z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
    responses: {
      200: z.array(deliverySchema),
    },
  },

  getById: {
    method: "GET",
    path: "/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: deliverySchema,
      404: z.object({ message: z.string() }),
    },
  },

  update: {
    method: "PUT",
    path: "/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    body: createDeliveryBody.partial(),
    responses: {
      200: deliverySchema,
      404: z.object({ message: z.string() }),
    },
  },

  delete: {
    method: "DELETE",
    path: "/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({ success: z.boolean() }),
      404: z.object({ message: z.string() }),
    },
  },
});