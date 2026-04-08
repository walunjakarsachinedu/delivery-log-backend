import { Router } from "express";
import { verifyTokenAndSetContext } from "./utils/verifyToken.js";

const resolver = Router();

// protected route
resolver.use("/delivery", verifyTokenAndSetContext())

resolver.get("/health", (_req, res) => {
  res.send("API running");
});

export default resolver;