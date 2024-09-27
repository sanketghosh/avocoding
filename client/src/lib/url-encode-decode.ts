// Encode folder ID to a unique string (Base64)
export const encodeId = (id: string): string => {
  return btoa(id); // Encode folder ID
};

// Decode the unique string back to folder ID (Base64)
export const decodeId = (encodedId: string): string => {
  return atob(encodedId); // Decode folder ID
};
