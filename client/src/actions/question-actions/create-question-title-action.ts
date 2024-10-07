import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";
import { QuestionTitleSchema } from "@/schemas";
import * as z from "zod";

type DataType = {
  folderId: string;
  formData: z.infer<typeof QuestionTitleSchema>;
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
