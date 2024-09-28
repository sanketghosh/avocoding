import { API_BASE_URL } from "@/constants";
import { ApiError } from "@/lib/handle-api-error";
import { FolderSchema } from "@/schemas";
import * as z from "zod";

type DataType = {
  formData: z.infer<typeof FolderSchema>;
  folderId: string | undefined;
};

export const updateFolderDetailsHandler = async ({
  folderId,
  formData,
}: DataType) => {
  // console.log(folderId);
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/folder/update-folder-details/${folderId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
