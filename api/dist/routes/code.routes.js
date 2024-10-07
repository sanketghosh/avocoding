"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const code_controllers_1 = require("../controllers/code.controllers");
const verify_token_middleware_1 = require("../middlewares/verify-token-middleware");
const router = express_1.default.Router();
const codeRouter = express_1.default.Router();
codeRouter.put("/:questionId", verify_token_middleware_1.verifyTokenHandler, code_controllers_1.saveOrUpdateCodeHandler);
codeRouter.get("/get-code/:questionId", verify_token_middleware_1.verifyTokenHandler, code_controllers_1.getCodeHandler);
router.use("/code", codeRouter);
exports.default = router;
