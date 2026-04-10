import { createExpressEndpoints } from '@ts-rest/express';
import cors from 'cors';
import dotenv from "dotenv";
import type { Express } from 'express';
import express, { Router } from "express";
import { verifyTokenAndSetContext } from './middleware/verifyToken.js';
import { deliveryContract } from './modules/delivery/contract.js';
import { deliveryRouter } from './modules/delivery/router.js';
import { authContract } from './modules/auth/contract.js';
import { authRouter } from './modules/auth/router.js';

dotenv.config();


async function setupServer(): Promise<Express> {
  const app = express();

  const router = Router();
  const authExpressRouter = Router();
  const deliveryExpressRouter = Router();


  createExpressEndpoints(
    authContract,
    authRouter,
    authExpressRouter
  );

  createExpressEndpoints(
    deliveryContract,
    deliveryRouter,
    deliveryExpressRouter,
  );
  

  router.use("/auth", authExpressRouter);
  router.use("/delivery", verifyTokenAndSetContext(), deliveryExpressRouter);
  // use to check if api is accessible
  router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(
    "/v1",
    cors<cors.CorsRequest>({
      // origin: ["https://delivery-log.vercel.app", "http://localhost:5173"],
      // origin: true
    }),
    express.json(),
    router
  );

  return app;
}

export default setupServer;