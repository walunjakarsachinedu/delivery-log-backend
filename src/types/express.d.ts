import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        [key: string]: unknown;
        sub: string;
      };
      userId?: string;
    }
  }
}