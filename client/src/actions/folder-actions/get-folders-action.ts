import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";
import { SortOrderType } from "@/types";

export const getFoldersHandler = async (sortOrder: SortOrderType) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/folder/folders?sort=${sortOrder}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.message);
    }

    const data = await response.json();
    // console.log(data);
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
