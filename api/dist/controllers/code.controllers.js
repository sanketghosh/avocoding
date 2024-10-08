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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeHandler = exports.saveOrUpdateCodeHandler = void 0;
const prisma_1 = require("../lib/prisma");
/**
 *
 *
 */
const saveOrUpdateCodeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    const { language, content, editorTheme } = req.body;
    const userId = req.userId;
    try {
        // check if the question exists and belongs to the logged in user
        const question = yield prisma_1.db.question.findFirst({
            where: {
                id: questionId,
                folder: {
                    userId: userId,
                },
            },
        });
        // if question does not exist
        if (!question) {
            return res.status(404).json({
                message: "ERROR: Question not found or unauthorized.",
            });
        }
        // check if code already exists for the question
        const existingCode = yield prisma_1.db.code.findFirst({
            where: {
                question: {
                    id: questionId,
                },
            },
        });
        if (existingCode) {
            // update code if exists
            const updatedCode = yield prisma_1.db.code.update({
                where: {
                    id: existingCode.id,
                },
                data: {
                    language: language,
                    content: content,
                    editorTheme: editorTheme,
                },
            });
            return res.status(200).json({
                message: "SUCCESS: Code has been updated.",
                data: updatedCode,
            });
        }
        else {
            // create new code if it does not exist
            const newCode = yield prisma_1.db.code.create({
                data: {
                    language: language,
                    content: content,
                    editorTheme: editorTheme,
                    question: {
                        connect: {
                            id: questionId,
                        },
                    },
                },
            });
            return res.status(201).json({
                message: "SUCCESS! New code has been added.",
                data: newCode,
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "ERROR! Something went wrong. Internal server error",
        });
    }
});
exports.saveOrUpdateCodeHandler = saveOrUpdateCodeHandler;
/**
 *
 *
 */
const getCodeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    // check if user is authenticated
    const userId = req.userId;
    try {
        const question = yield prisma_1.db.question.findUnique({
            where: {
                id: questionId,
            },
            include: {
                code: true,
                folder: {
                    select: {
                        userId: true,
                    },
                },
            },
        });
        //  check if the question exists and belongs to the users folder
        if (!question) {
            return res.status(404).json({
                message: "ERROR! Question has not been found.",
            });
        }
        // check if the folder belongs to the authenticated user
        if (question.folder.userId !== userId) {
            return res.status(403).json({
                message: "ERROR! Unauthorized to access this code.",
            });
        }
        // check if the code exists for the question
        if (!question.code) {
            return res.status(404).json({
                message: "ERROR! Code not found for this question.",
            });
        }
        return res.status(200).json({
            message: "SUCCESS! Code has been fetched.",
            data: question.code,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "ERROR! Something went wrong. Internal server error",
        });
    }
});
exports.getCodeHandler = getCodeHandler;
