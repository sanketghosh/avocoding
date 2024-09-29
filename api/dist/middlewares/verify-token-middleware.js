"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenHandler = void 0;
// PACKAGES
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyTokenHandler = (req, res, next) => {
    const token = req.cookies["auth_token"];
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            message: "Not authenticated",
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        if (decoded && typeof decoded === "object") {
            req.userId = decoded.id; // Ensure payload.id exists and is a string
            next();
        }
        else {
            return res.status(403).json({ message: "Token payload is invalid" });
        }
    });
};
exports.verifyTokenHandler = verifyTokenHandler;
