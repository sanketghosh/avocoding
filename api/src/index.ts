// PACKAGES
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";

// LOCAL NODULES
import { authRoutes, codeRoutes, folderRoutes, questionRoutes } from "./routes";
import swaggerDoc from "./swagger.json";

// PORT
const PORT = process.env.PORT || 8000;

// INITIALIZING APP
const app = express();

// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// ROUTES
app.use("/api/v1", authRoutes);
app.use("/api/v1", folderRoutes);
app.use("/api/v1", questionRoutes);
app.use("/api/v1", codeRoutes);

// SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// APP LISTENER
app.listen(PORT, () => {
  console.log(`SUCCESS: API server running on http://localhost:${PORT}`);
  console.log(`API DOCUMENTATION: http://localhost:${PORT}/api-docs`);
});
