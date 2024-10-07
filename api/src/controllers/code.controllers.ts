import { Request, Response } from "express";
import { db } from "../lib/prisma";

/**
 *
 *
 */
export const saveOrUpdateCodeHandler = async (req: Request, res: Response) => {
  const { questionId } = req.params;
  const { language, content, editorTheme } = req.body;
  const userId = req.userId;

  try {
    // check if the question exists and belongs to the logged in user
    const question = await db.question.findFirst({
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
    const existingCode = await db.code.findFirst({
      where: {
        question: {
          id: questionId,
        },
      },
    });

    if (existingCode) {
      // update code if exists
      const updatedCode = await db.code.update({
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
      });
    } else {
      // create new code if it does not exist
      const newCode = await db.code.create({
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
      });
    }
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
 */

export const getCodeHandler = async (req: Request, res: Response) => {
  const { questionId } = req.params;
  // check if user is authenticated
  const userId = req.userId;

  try {
    const question = await db.question.findUnique({
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
      message: "ERROR! Code has been fetched.",
      data: question.code,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "ERROR! Something went wrong. Internal server error",
    });
  }
};
