import type {
  Handler,
  HandlerEvent,
  HandlerContext,
  HandlerResponse,
} from "@netlify/functions";
import serverless from "serverless-http";
import setupServer from "../server.js";

let cachedHandler: ReturnType<typeof serverless> | null = null;

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
): Promise<HandlerResponse> => {
  if (!cachedHandler) {
    const app = await setupServer();
    cachedHandler = serverless(app);
  }

  const response = await cachedHandler(event, context);
  return response as HandlerResponse;
};