import { initServer } from "@ts-rest/express";
import mongoose from "mongoose";
import { deliveryContract } from "./contract.js";
import { DeliveryModel, toDelivery } from "./model.js";

const s = initServer();

export const deliveryRouter = s.router(deliveryContract, {
  create: async ({ body, req }) => {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const delivery = await DeliveryModel.create({
      ...body,
      photoUrl: body.photoUrl ?? null,
      userId,
    });

    return { status: 200, body: toDelivery(delivery) };
  },

  getAll: async ({ query, req }) => {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const now = new Date();
    const start =
      query.startDate ?? new Date(now.getFullYear(), now.getMonth(), 1);
    const end =
      query.endDate ??
      new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const deliveries = await DeliveryModel.find({
      userId,
      dispatchDate: { $gte: start, $lte: end },
    }).lean();

    return { status: 200, body: deliveries.map(toDelivery) };
  },

  getById: async ({ params, req }) => {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const delivery = await DeliveryModel.findOne({
      _id: new mongoose.Types.ObjectId(params.id),
      userId,
    });

    if (!delivery) {
      return { status: 404, body: { message: "not found" } };
    }

    return { status: 200, body: toDelivery(delivery) };
  },

  update: async ({ params, body, req }) => {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const updated = await DeliveryModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(params.id),
        userId,
      },
      body,
      { new: true }
    );

    if (!updated) {
      return { status: 404, body: { message: "not found" } };
    }

    return { status: 200, body: toDelivery(updated) };
  },

  delete: async ({ params, req }) => {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const deleted = await DeliveryModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(params.id),
      userId,
    });

    if (!deleted) {
      return { status: 404, body: { message: "not found" } };
    }

    return { status: 200, body: { success: true } };
  },
});