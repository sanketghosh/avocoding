"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LOCAL MODULES
const question_controllers_1 = require("../controllers/question.controllers");
const verify_token_middleware_1 = require("../middlewares/verify-token-middleware");
// PACKAGES
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authRouter = express_1.default.Router();
/** */
authRouter.get("/questions/:folderId", verify_token_middleware_1.verifyTokenHandler, question_controllers_1.getAllQuestionsByFolderHandler);
/** */
authRouter.get("/question/:questionId", verify_token_middleware_1.verifyTokenHandler, question_controllers_1.getSingleQuestionByIdHandler);
/** */
authRouter.post("/create-question-title", verify_token_middleware_1.verifyTokenHandler, question_controllers_1.createQuestionTitleHandler);
/** */
authRouter.post("/create-problem-statement/", verify_token_middleware_1.verifyTokenHandler, question_controllers_1.createQuestionProblemStatementHandler);
/** */
authRouter.put("/update-question", verify_token_middleware_1.verifyTokenHandler, question_controllers_1.updateQuestionHandler);
/** */
authRouter.delete("/delete-question", verify_token_middleware_1.verifyTokenHandler, question_controllers_1.deleteQuestionHandler);
router.use("/question", authRouter);
exports.default = router;
