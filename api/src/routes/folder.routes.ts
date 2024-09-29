// PACKAGES
import express from "express";

// LOCAL MODULES
import {
  createFolderHandler,
  deleteFolderHandler,
  getAllFoldersHandler,
  updateFolderDetailsHandler,
} from "../controllers/folder.controllers";
import { verifyTokenHandler } from "../middlewares/verify-token-middleware";

const router = express.Router();
const folderRouter = express.Router();

//
folderRouter.get("/folders", verifyTokenHandler, getAllFoldersHandler);

//
folderRouter.post("/create-folder", verifyTokenHandler, createFolderHandler);

//
folderRouter.put(
  "/update-folder-details/:folderId",
  verifyTokenHandler,
  updateFolderDetailsHandler,
);

//
folderRouter.delete(
  "/delete-folder/:folderId",
  verifyTokenHandler,
  deleteFolderHandler,
);

router.use("/folder", folderRouter);

export default router;
