"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
// imported routes
const routes_1 = require("./routes");
// port
const PORT = process.env.PORT || 8000;
// initializing app
const app = (0, express_1.default)();
// middlewares
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// routes
app.use("/api/v1", routes_1.authRoutes);
app.use("/api/v1", routes_1.folderRoutes);
// swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// app listener
app.listen(PORT, () => {
    console.log(`SUCCESS: app listening on http://localhost:${PORT}`);
});
