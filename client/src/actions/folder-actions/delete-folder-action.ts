import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";

export const deleteFolderHandler = async (folderId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/folder/delete-folder/${folderId}`,
      {
        method: "DELETE",
        credentials: "include",
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
      console.error("Unexpected error: ", error);
    }

    throw error;
  }
};
