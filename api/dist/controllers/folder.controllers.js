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
exports.deleteFolderHandler = exports.updateFolderDetailsHandler = exports.createFolderHandler = exports.getAllFoldersHandler = void 0;
const prisma_1 = require("../lib/prisma");
/**
 *
 * @param req
 * @param res
 */
const getAllFoldersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                error: "ERROR! User is unauthorized.",
            });
        }
        const folders = yield prisma_1.db.folder.findMany({
            where: {
                userId: userId,
            },
            include: {
                questions: true,
            },
        });
        return res.status(200).json({
            message: "SUCCESS! All folders has been fetched.",
            data: folders,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "ERROR! Something went wrong. Internal server error",
        });
    }
});
exports.getAllFoldersHandler = getAllFoldersHandler;
/**
 *
 * @param req
 * @param res
 */
const createFolderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // assuming userId is added to req.user by your auth middleware
        const userId = req.userId;
        // get folder details from the request body
        const { title, description, emoji } = req.body;
        // basic validation
        if (!userId) {
            return res.status(401).json({
                message: "ERROR! User is not authorized.",
            });
        }
        // title is required
        if (!title) {
            return res.status(400).json({
                message: "ERROR! Title is required to move ahed.",
            });
        }
        // create a new folder in the db
        const newFolder = yield prisma_1.db.folder.create({
            data: {
                title: title,
                description: description || "",
                emoji: emoji || null,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return res.status(200).json({
            message: "SUCCESS! Folder has been created.",
            folderTitle: newFolder.title,
            folderDescription: newFolder.description,
            folderEmoji: newFolder.emoji,
            folderCreatedAt: newFolder.createdAt,
            folderUpdatedAt: newFolder.updatedAt,
            folderId: newFolder.id,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "ERROR! Something went wrong. Internal server error",
        });
    }
});
exports.createFolderHandler = createFolderHandler;
/**
 *
 * @param req
 * @param res
 */
const updateFolderDetailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateFolderDetailsHandler = updateFolderDetailsHandler;
/**
 *
 * @param req
 * @param res
 */
const deleteFolderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteFolderHandler = deleteFolderHandler;
