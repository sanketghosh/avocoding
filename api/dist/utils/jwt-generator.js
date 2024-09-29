"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
// PACKAGES
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// LOCAL MODULES
const constants_1 = require("../constants");
const generateJWT = (userId) => {
    const jwtToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: constants_1.TOKEN_EXP_AGE });
    return { jwtToken };
};
exports.generateJWT = generateJWT;
