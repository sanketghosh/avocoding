// PACKAGES
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";

// LOCAL NODULES
import { authRoutes, folderRoutes, questionRoutes } from "./routes";
import swaggerDoc from "./swagger.json";

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
app.use("/api/v1", folderRoutes);
app.use("/api/v1", questionRoutes);

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// app listener
app.listen(PORT, () => {
  console.log(`SUCCESS: app listening on http://localhost:${PORT}`);
});
