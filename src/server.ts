import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import subRoutes from "./routes/subs";
import trim from "./middleware/trim";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(trim);
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/sub", subRoutes);

const { PORT } = process.env;
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    await createConnection();
    console.log("Database Connected");
  } catch (e) {
    console.log(e);
  }
});
