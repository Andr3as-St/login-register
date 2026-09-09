import express from "express";
import dotenv from "dotenv";
import "colors";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

dotenv.config();
const app = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowedOrigin = allowedOrigins.includes(origin);
      const isVercelDeployment =
        /^https:\/\/mern-auth-dashboard(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin);

      if (isAllowedOrigin || isVercelDeployment) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => res.json({ msg: "MERN Auth Dashboard API" }));
app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    if (!process.env.MONGO_URL || !process.env.JWT_SECRET) {
      throw new Error("MONGO_URL and JWT_SECRET environment variables are required");
    }
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`.yellow.bold));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

start();
