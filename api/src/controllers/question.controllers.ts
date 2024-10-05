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
  res: Response
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

/**
 *
 *
 *
 */
export const getSingleQuestionByIdHandler = async (
  req: Request,
  res: Response
) => {
  const { questionId } = req.params;
  const userId = req.userId;

  try {
    // check if you are authenticated
    if (!userId) {
      return res.status(401).json({
        message: "ERROR! User is no",
      });
    }

    // fetch question
    const singleQuestionData = await db.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        folder: true,
        code: true,
      },
    });

    // if question is not found
    if (!singleQuestionData) {
      return res.status(404).json({
        message: "ERROR! Question not found.",
      });
    }

    // check if the folder belongs to the logged-in-user
    if (singleQuestionData.folder.userId !== userId) {
      return res.status(403).json({
        message: "ERROR! You do not have access to this folder.",
      });
    }

    // send single question data
    return res.status(200).json({
      message: "SUCCESS! Single question data has been fetched.",
      data: singleQuestionData,
    });
  } catch (error) {
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

export const createQuestionTitleHandler = async (
  req: Request,
  res: Response
) => {
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
export const createQuestionProblemStatementHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;
  const { questionId, problemStatement } = req.body;
  try {
    // validate if questionId and problemStatement are provided
    if (!questionId || !problemStatement) {
      return res.status(400).json({
        message: "ERROR! Question ID and problem statement are required.",
      });
    }

    // find the question and ensure the user owns the folder
    const question = await db.question.findFirst({
      where: {
        id: questionId,
        folder: {
          userId: userId,
        },
      },
    });

    // If the question is not found or the user doesn't own the folder
    if (!question) {
      return res.status(404).json({
        message: "ERROR! Question not found or unauthorized.",
      });
    }
    // Update the problem statement for the question
    const createdProblemStatement = await db.question.update({
      where: { id: questionId },
      data: {
        problemStatement: problemStatement,
      },
    });

    // Send a success response
    return res.status(200).json({
      message: "Problem statement created successfully.",
      data: createdProblemStatement,
    });
  } catch (error) {
    console.error("Error creating problem statement:", error);
    return res.status(500).json({
      message: "ERROR! Internal server error.",
    });
  }
};

/*
 *
 *
 */

export const updateQuestionHandler = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { questionId } = req.params;
  const { title, problemStatement } = req.body;

  try {
    // validate if questionId is provided
    if (!questionId) {
      return res.status(400).json({
        message: "ERROR! Question ID is required.",
      });
    }

    //  ensure either title or problemStatement is provided
    if (!title && !problemStatement) {
      return res.status(400).json({
        message:
          "ERROR! Either title or problem statement must be provided for updating.",
      });
    }

    // find the question and ensure the user owns the folder
    const question = await db.question.findFirst({
      where: {
        id: questionId,
        folder: {
          userId: userId, // ensure that the folder belongs to the logged in user
        },
      },
    });

    // if the question is not found or the user doesn't own the folder
    if (!question) {
      return res.status(404).json({
        message: "ERROR! Question not found or unauthorized.",
      });
    }

    // prepare the data object for update (only include fields that are provided)

    // update the question with the provided title an/or problem statement
    const updatedQuestion = await db.question.update({
      where: {
        id: questionId,
      },
      data: {
        title: title,
        problemStatement: problemStatement,
      },
    });

    // send a success response
    return res.status(200).json({
      message: "SUCCESS! Question updated successfully.",
      data: updatedQuestion,
    });
  } catch (error) {
    console.error("Error creating problem statement:", error);
    return res.status(500).json({
      message: "ERROR! Internal server error.",
    });
  }
};

/*
 *
 *
 */

export const deleteQuestionHandler = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const userId = req.userId;

    // check if the question exists
    const question = await db.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        folder: true, // to access the folder and ensure user owns it
      },
    });

    // if question does not exist
    if (!question) {
      return res.status(404).json({
        message: "ERROR! Question has not been found.",
      });
    }

    // check if the user owns the folder where the question belongs
    if (question.folder.userId !== userId) {
      return res.status(403).json({
        message: "ERROR! Unauthorized to delete this question.",
      });
    }

    // delete the question (with cascading to delete associated code)
    await db.question.delete({
      where: {
        id: questionId,
      },
    });

    return res.status(200).json({
      message: "SUCCESS! Question and its code deleted successfully.",
    });
  } catch (error) {
    console.error("Error creating problem statement:", error);
    return res.status(500).json({
      message: "ERROR! Internal server error.",
    });
  }
};
