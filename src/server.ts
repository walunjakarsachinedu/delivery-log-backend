import cors from 'cors';
import dotenv from "dotenv";
import type { Express } from 'express';
import express from "express";
import resolver from "./resolver.js";

dotenv.config();


async function setupServer(): Promise<Express> {
  const app = express();

  app.use(
    "/v1",
    cors<cors.CorsRequest>({
      // origin: ["https://delivery-log.vercel.app", "http://localhost:5173"],
      // origin: true
    }),
    express.json(),
    resolver
  );

  return app;
}

export default setupServer;