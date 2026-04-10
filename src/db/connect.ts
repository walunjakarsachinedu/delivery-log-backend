import mongoose from "mongoose";
import { getEnv } from "../utils/getEnv.js";

export async function connectToDB(): Promise<void> {
  try {
    // clear();
    console.log("connecting to database...");
    const username: string | undefined = getEnv("MONGODB_USERNAME");
    const password: string | undefined = getEnv("MONGODB_PASSWORD");
    const dbName: string | undefined = getEnv("MONGODB_DB_NAME");
    // clear();
    const dbUrl =`mongodb+srv://${username}:${password}@cluster0.aqcdz0m.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority`;
    // const dbUrl = `mongodb+srv://${username}:${password}@cluster0.zasrmm9.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    await mongoose
      .connect(dbUrl)
      .then(() => console.log("mongodb connected successfully"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
