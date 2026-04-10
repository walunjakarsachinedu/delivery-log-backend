import type {
  Handler,
  HandlerEvent,
  HandlerContext,
  HandlerResponse,
} from "@netlify/functions";
import serverless from "serverless-http";
import setupServer from "../server.js";
import mongoose from "mongoose";
import { connectToDB } from "../db/connect.js";

let cachedHandler: ReturnType<typeof serverless> | null = null;

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
): Promise<HandlerResponse> => {
  if (!cachedHandler) cachedHandler = serverless(await setupServer());
  if (![1, 2].includes(mongoose.connection.readyState)) await connectToDB();

  const response = await cachedHandler(event, context);
  return response as HandlerResponse;
};