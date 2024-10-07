"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = exports.folderRoutes = exports.codeRoutes = exports.authRoutes = void 0;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.authRoutes = auth_routes_1.default;
const code_routes_1 = __importDefault(require("./code.routes"));
exports.codeRoutes = code_routes_1.default;
const folder_routes_1 = __importDefault(require("./folder.routes"));
exports.folderRoutes = folder_routes_1.default;
const question_routes_1 = __importDefault(require("./question.routes"));
exports.questionRoutes = question_routes_1.default;
