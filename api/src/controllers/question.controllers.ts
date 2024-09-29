// PACKAGES
import { type Request, type Response } from "express";

// LOCAL MODULES
import { db } from "../lib/prisma";

/**
 *
 *
 */

export const getAllQuestionsByFolderHandler = async (
  req: Request,
  res: Response,
) => {
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
    const folder = await db.folder.findUnique({
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
    const questions = await db.question.findMany({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "ERROR! Something went wrong. Internal server error",
    });
  }
};

/*
 *
 *
 *
 */

export const createQuestionHandler = async (req: Request, res: Response) => {
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
    const folder = await db.folder.findUnique({
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

    const newQuestion = await db.question.create({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "ERROR! Something went wrong. Internal server error",
    });
  }
};

/*
 *
 *
 */

export const updateQuestionHandler = (req: Request, res: Response) => {};

/*
 *
 *
 */

export const deleteQuestionHandler = (req: Request, res: Response) => {};
