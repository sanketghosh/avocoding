"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUserHandler = exports.loginUserHandler = exports.registerUserHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../constants");
const prisma_1 = require("../lib/prisma");
const jwt_generator_1 = require("../utils/jwt-generator");
/**
REGISTER USER
*/
const registerUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield prisma_1.db.user.findUnique({
            where: {
                email: email,
            },
        });
        // if user exists with same email cannot create one
        if (user) {
            return res.status(401).json({
                message: "ERROR! Bad request cannot register now.",
            });
        }
        // hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // else create user
        const newUser = yield prisma_1.db.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        });
        const { password: usersPassword } = newUser, userData = __rest(newUser, ["password"]);
        // get token from token generator
        const { jwtToken } = (0, jwt_generator_1.generateJWT)(userData.id);
        // data we are sending as response
        const registeredDataToBeSent = {
            userId: newUser.id,
            userUsername: newUser.username,
            userEmail: newUser.email,
            userAvatar: newUser.avatar,
            userCreatedAt: newUser.createdAt,
            message: "SUCCESS! You have been registered.",
        };
        res
            .cookie("auth_token", jwtToken, {
            httpOnly: true,
            maxAge: constants_1.TOKEN_EXP_AGE,
            // secure: true // in production un-comment it
        })
            .status(200)
            .json(registeredDataToBeSent);
    }
    catch (error) {
        res.status(500).json({
            message: "ERROR! Internal server error.",
        });
        console.log(error);
    }
});
exports.registerUserHandler = registerUserHandler;
/**
LOGIN USER
*/
const loginUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({
            message: "ERROR! Bad request. Email is required",
        });
    }
    if (!password) {
        return res.status(400).json({
            message: "ERROR! Bad request. Password is required",
        });
    }
    try {
        // find user
        const existingUser = yield prisma_1.db.user.findUnique({
            where: {
                email: email,
            },
        });
        // if user doesn't exist
        if (!existingUser) {
            return res.status(401).json({
                message: "ERROR! Bad request. Cannot login, check your credentials and try again.",
            });
        }
        // assert that existingUser is not null
        const user = existingUser;
        // compare password
        let comparePassword = yield bcrypt_1.default.compare(password, user.password);
        // if compare password fails
        if (!comparePassword) {
            return res.set(401).json({
                message: "ERROR! Invalid credentials.",
            });
        }
        // get token from token generator
        const { jwtToken } = (0, jwt_generator_1.generateJWT)(user.id);
        // data we are sending as response
        const loggedInDataToBeSent = {
            userId: user.id,
            userUsername: user.username,
            userEmail: user.email,
            userAvatar: user.avatar,
            userCreatedAt: user.createdAt,
            message: "SUCCESS! You have been logged in.",
        };
        res
            .cookie("auth_token", jwtToken, {
            httpOnly: true,
            maxAge: constants_1.TOKEN_EXP_AGE,
            // secure: true // in production un-comment it
        })
            .status(200)
            .json(loggedInDataToBeSent);
    }
    catch (error) {
        res.status(500).json({
            message: "ERROR! Internal server error.",
        });
        console.log(error);
    }
});
exports.loginUserHandler = loginUserHandler;
/**
LOGOUT USER
*/
const logoutUserHandler = (req, res) => {
    try {
        res.clearCookie("auth_token").status(200).json({
            message: "SUCCESS! Logged out of your account.",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "ERROR! Internal server error.",
        });
        console.log(error);
    }
};
exports.logoutUserHandler = logoutUserHandler;
