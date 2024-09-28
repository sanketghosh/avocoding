import { type Request, type Response } from "express";
import { db } from "../lib/prisma";

/**
 *
 * @param req
 * @param res
 */
export const getAllFoldersHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "ERROR! User is unauthorized.",
      });
    }

    const folders = await db.folder.findMany({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "ERROR! Something went wrong. Internal server error",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const createFolderHandler = async (req: Request, res: Response) => {
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
    const newFolder = await db.folder.create({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "ERROR! Something went wrong. Internal server error",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */

export const updateFolderDetailsHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const { folderId } = req.params;
    const { title, description, emoji } = req.body;

    // check if user is authenticated
    if (!userId) {
      return res.status(401).json({
        message: "ERROR! User is not authorized.",
      });
    }

    // validate folderID exists in the request
    if (!folderId) {
      return res.status(400).json({
        message: "ERROR! Folder ID is required.",
      });
    }

    // find the folder and check if it belongs to the user
    const folder = await db.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        userId: true,
      },
    });

    // if folder not found send error
    if (!folder) {
      return res.status(404).json({
        message: "ERROR! Folder has not been found.",
      });
    }

    // check if the folder belongs to the curreny user
    if (folder.userId !== userId) {
      return res.status(403).json({
        message: "ERROR! You are not authorized to update this folder.",
      });
    }

    // update folder details
    const updateFolder = await db.folder.update({
      where: {
        id: folderId,
      },
      data: {
        title: title,
        description: description,
        emoji: emoji,
      },
    });

    // return data
    return res.status(200).json({
      message: "SUCCESS! Folder details have been updated",
      data: updateFolder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "ERROR! Something went wrong. Internal server error",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const deleteFolderHandler = async (req: Request, res: Response) => {};
