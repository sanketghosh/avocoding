import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";

type DataType = {
  content: string;
  language: string;
  editorTheme: string;
  questionId: string;
};

export const saveOrUpdateCodeAction = async ({
  content,
  editorTheme,
  language,
  questionId,
}: DataType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/code/${questionId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        editorTheme,
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.message);
    }

    const data = await response.json();
    console.log(data);
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
