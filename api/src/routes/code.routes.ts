import express from "express";
import {
  getCodeHandler,
  saveOrUpdateCodeHandler,
} from "../controllers/code.controllers";
import { verifyTokenHandler } from "../middlewares/verify-token-middleware";

const router = express.Router();
const codeRouter = express.Router();

codeRouter.put("/:questionId", verifyTokenHandler, saveOrUpdateCodeHandler);

codeRouter.get("/get-code/:questionId", verifyTokenHandler, getCodeHandler);

router.use("/code", codeRouter);

export default router;
