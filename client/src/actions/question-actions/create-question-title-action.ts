import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";
import { QuestionSchema } from "@/schemas";
import * as z from "zod";

type DataType = {
  folderId: string;
  formData: z.infer<typeof QuestionSchema>;
};

export const createQuestionTitleAction = async ({
  folderId,
  formData,
}: DataType) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/question/create-question-title`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderId,
          ...formData,
        }),
      },
    );

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
