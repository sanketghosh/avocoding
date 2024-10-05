import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";

export const deleteQuestionAction = async (questionId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/question/delete-question/${questionId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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
