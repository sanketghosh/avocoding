// LOCAL MODULES
import {
  createQuestionProblemStatementHandler,
  createQuestionTitleHandler,
  deleteQuestionHandler,
  getAllQuestionsByFolderHandler,
  updateQuestionHandler,
} from "../controllers/question.controllers";
import { verifyTokenHandler } from "../middlewares/verify-token-middleware";

// PACKAGES
import express from "express";

const router = express.Router();
const authRouter = express.Router();

/**
 */
authRouter.get(
  "/questions/:folderId",
  verifyTokenHandler,
  getAllQuestionsByFolderHandler,
);

/**
 */
authRouter.post(
  "/create-question-title",
  verifyTokenHandler,
  createQuestionTitleHandler,
);

/**
 */
authRouter.post(
  "/create-problem-statement",
  verifyTokenHandler,
  createQuestionProblemStatementHandler,
);

/**
 */
authRouter.put("/update-question", verifyTokenHandler, updateQuestionHandler);

/**
 */
authRouter.delete(
  "/delete-question",
  verifyTokenHandler,
  deleteQuestionHandler,
);

router.use("/question", authRouter);

export default router;
