import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const authBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authContract = c.router({
  signup: {
    method: "POST",
    path: "/signup",
    body: authBody,
    responses: {
      200: z.object({ token: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },

  signin: {
    method: "POST",
    path: "/signin",
    body: authBody,
    responses: {
      200: z.object({ token: z.string() }),
      401: z.object({ message: z.string() }),
    },
  },
});