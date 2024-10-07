"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// PACKAGES
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// LOCAL NODULES
const routes_1 = require("./routes");
const swagger_json_1 = __importDefault(require("./swagger.json"));
// PORT
const PORT = process.env.PORT || 8000;
// INITIALIZING APP
const app = (0, express_1.default)();
// MIDDLEWARES
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// ROUTES
app.use("/api/v1", routes_1.authRoutes);
app.use("/api/v1", routes_1.folderRoutes);
app.use("/api/v1", routes_1.questionRoutes);
app.use("/api/v1", routes_1.codeRoutes);
// SWAGGER
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// APP LISTENER
app.listen(PORT, () => {
    console.log(`SUCCESS: API server running on http://localhost:${PORT}`);
    console.log(`API DOCUMENTATION: http://localhost:${PORT}/api-docs`);
});
