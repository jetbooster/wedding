import { FormResponse } from "@/types";

export const submitResponse = async (
  req: Partial<FormResponse>,
  user_id?: number,
): Promise<Response> => {
  if (!user_id) {
    throw new Error("User ID is required to submit response");
  }
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-id": user_id.toString(),
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    throw new Error("Failed to submit response");
  }

  return response;
};
