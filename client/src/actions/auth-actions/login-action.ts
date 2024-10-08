import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const loginUserHandler = async (
  formData: z.infer<typeof LoginSchema>,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

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
      console.error("Unexpected error:", error);
    }
    throw error; // rethrow the error
  }
};
