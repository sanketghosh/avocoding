// packages
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

// imported routes
import { authRoutes } from "./routes";

// port
const PORT = process.env.PORT || 8000;

// initializing app
const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// routes
app.use("/api/v1", authRoutes);

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// app listener
app.listen(PORT, () => {
  console.log(`SUCCESS: app listening on http://localhost:${PORT}`);
});
