import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";
import { AddFolderSchema } from "@/schemas";
import * as z from "zod";

export const createFolderHandler = async (
  formData: z.infer<typeof AddFolderSchema>,
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/folder/create-folder`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.statusCode}: ${error.message}`);
    } else {
      console.error("Unexpected error: ", error);
    }

    throw error;
  }
};
