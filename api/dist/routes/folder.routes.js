"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// PACKAGES
const express_1 = __importDefault(require("express"));
// LOCAL MODULES
const folder_controllers_1 = require("../controllers/folder.controllers");
const verify_token_middleware_1 = require("../middlewares/verify-token-middleware");
const router = express_1.default.Router();
const folderRouter = express_1.default.Router();
//
folderRouter.get("/folders", verify_token_middleware_1.verifyTokenHandler, folder_controllers_1.getAllFoldersHandler);
//
folderRouter.post("/create-folder", verify_token_middleware_1.verifyTokenHandler, folder_controllers_1.createFolderHandler);
//
folderRouter.put("/update-folder-details/:folderId", verify_token_middleware_1.verifyTokenHandler, folder_controllers_1.updateFolderDetailsHandler);
//
folderRouter.delete("/delete-folder/:folderId", verify_token_middleware_1.verifyTokenHandler, folder_controllers_1.deleteFolderHandler);
router.use("/folder", folderRouter);
exports.default = router;
