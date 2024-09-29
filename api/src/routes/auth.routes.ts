// PACKAGES
import express from "express";

// LOCAL MODULES
import {
  loginUserHandler,
  logoutUserHandler,
  registerUserHandler,
} from "../controllers/auth.controllers";

const router = express.Router();
const authRouter = express.Router();

// POST api/v1/auth/register --> REGISTER
authRouter.post("/register", registerUserHandler);

// POST api/v1/auth/login --> LOGIN
authRouter.post("/login", loginUserHandler);

// POST api/v1/auth/logout --> LOGOUT
authRouter.post("/logout", logoutUserHandler);

router.use("/auth", authRouter);
export default router;
