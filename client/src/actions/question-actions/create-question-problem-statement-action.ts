import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";
import { QuestionProblemStatementSchema } from "@/schemas";
import * as z from "zod";

type DataType = {
  questionId?: string;
  formData: z.infer<typeof QuestionProblemStatementSchema>;
};

export const createQuestionProblemStatementAction = async ({
  formData,
  questionId,
}: DataType) => {
  console.log({
    ...formData,
    questionId,
  });

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/question/create-problem-statement`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId, ...formData }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.statusCode}: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
