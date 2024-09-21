import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";

export const handleLogoutUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.message || "Logout failed");
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.statusCode}: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
