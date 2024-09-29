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
exports.deleteQuestionHandler = exports.updateQuestionHandler = exports.createQuestionHandler = exports.getAllQuestionsByFolderHandler = void 0;
// LOCAL MODULES
const prisma_1 = require("../lib/prisma");
/**
 *
 *
 */
const getAllQuestionsByFolderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { folderId } = req.params;
    const { sort } = req.query;
    try {
        // check if user is authenticated
        if (!userId) {
            return res.status(401).json({
                message: "ERROR! User is not authenticated.",
            });
        }
        // validate folderID
        if (!folderId) {
            return res.status(400).json({
                message: "ERROR! Folder ID is required",
            });
        }
        // check if the folder exists and is owned by the logged in user
        const folder = yield prisma_1.db.folder.findUnique({
            where: { id: folderId },
        });
        if (!folder) {
            return res.status(404).json({
                message: "ERROR! Folder is not found.",
            });
        }
        //  check if the logged in user owns the folder
        if (folder.userId !== userId) {
            return res.status(403).json({
                message: "ERROR! You do not own this folder.",
            });
        }
        // fetch all questions
        const questions = yield prisma_1.db.question.findMany({
            where: {
                folderId: folderId,
            },
            orderBy: {
                createdAt: sort === "latest" ? "desc" : "asc",
            },
        });
        return res.status(200).json({
            message: "SUCCESS! Questions have been fetched.",
            data: questions,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "ERROR! Something went wrong. Internal server error",
        });
    }
});
exports.getAllQuestionsByFolderHandler = getAllQuestionsByFolderHandler;
/*
 *
 *
 *
 */
const createQuestionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { title, folderId } = req.body;
    try {
        // check if user is authenticated
        if (!userId) {
            return res.status(401).json({
                message: "ERROR! User is not authenticated.",
            });
        }
        // validate folderId
        if (!folderId) {
            return res.status(400).json({
                message: "ERROR! Folder ID is required.",
            });
        }
        // title not found
        if (!title) {
            return res.status(400).json({
                message: "ERROR! Title is absolutely required.",
            });
        }
        // check if the folder exists and is owned by the logged in user
        const folder = yield prisma_1.db.folder.findUnique({
            where: {
                id: folderId,
            },
        });
        // if folder doesn't exist
        if (!folder) {
            return res.status(404).json({
                message: "ERROR! Folder not found.",
            });
        }
        // check if the logged in user owns the folder
        if (folder.userId !== userId) {
            return res.status(403).json({
                message: "ERROR! You do not own this folder.",
            });
        }
        const newQuestion = yield prisma_1.db.question.create({
            data: {
                title: title,
                folder: {
                    connect: {
                        id: folderId, // link the folder by its ID
                    },
                },
            },
        });
        return res.status(201).json({
            message: "SUCCESS! Question has been created successfully.",
            data: newQuestion,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "ERROR! Something went wrong. Internal server error",
        });
    }
});
exports.createQuestionHandler = createQuestionHandler;
/*
 *
 *
 */
const updateQuestionHandler = (req, res) => { };
exports.updateQuestionHandler = updateQuestionHandler;
/*
 *
 *
 */
const deleteQuestionHandler = (req, res) => { };
exports.deleteQuestionHandler = deleteQuestionHandler;
