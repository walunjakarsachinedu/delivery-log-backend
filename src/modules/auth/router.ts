import { initServer } from "@ts-rest/express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { authContract } from "./contract.js";
import { UserModel } from "./model.js";
import { getEnv } from "../../utils/getEnv.js";

const s = initServer();

export const authRouter = s.router(authContract, {
  signup: async ({ body }) => {
    const { email, password } = body;

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return { status: 400, body: { message: "user already exists" } };
    }

    const user = await UserModel.create({
      email,
      password: encryptPassword(password),
    });

    const token = generateJwtToken(user);

    return { status: 200, body: { token } };
  },

  signin: async ({ body }) => {
    const { email, password } = body;

    const user = await UserModel.findOne({ email });
    if (!user || !isPasswordValid(password, user)) {
      return { status: 401, body: { message: "invalid credentials" } };
    }

    const token = generateJwtToken(user);

    return { status: 200, body: { token } };
  },
});

function isPasswordValid(password: string, user: { password: string }) {
  return bcrypt.compareSync(password, user.password);
}

function encryptPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

function generateJwtToken(
  user: { _id: mongoose.Types.ObjectId; email: string }
) {
  const payload = { email: user.email };
  const jwtSecret = getEnv("JWT_SECRET") as string;

  return jwt.sign(payload, jwtSecret, {
    subject: user._id.toString(),
    expiresIn: "1d",
  });
}