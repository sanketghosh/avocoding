"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// PACKAGES
const express_1 = __importDefault(require("express"));
// LOCAL MODULES
const auth_controllers_1 = require("../controllers/auth.controllers");
const router = express_1.default.Router();
const authRouter = express_1.default.Router();
// POST api/v1/auth/register --> REGISTER
authRouter.post("/register", auth_controllers_1.registerUserHandler);
// POST api/v1/auth/login --> LOGIN
authRouter.post("/login", auth_controllers_1.loginUserHandler);
// POST api/v1/auth/logout --> LOGOUT
authRouter.post("/logout", auth_controllers_1.logoutUserHandler);
router.use("/auth", authRouter);
exports.default = router;
