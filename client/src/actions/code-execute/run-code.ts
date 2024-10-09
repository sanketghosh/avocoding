import { ApiError } from "@/lib/handle-api-error";

type DataType = {
  code: string;
  language: string;
  version: string;
};

export const executeCodeAction = async ({
  code,
  language,
  version,
}: DataType) => {
  // console.log(language);
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        version: version,
        files: [
          {
            content: code,
          },
        ],
      }),
    });

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
