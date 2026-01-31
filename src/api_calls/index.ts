import { FormResponse, User, UserResponse } from "@/types";

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

export const getResponseByUserId = async (
  userId: number
): Promise<UserResponse> => {
  return fetch(`/api/submission?id=${userId}`)
    .then((result)=> {
      if (result.status === 404){
        return undefined;
      }
      return result;
    })
    .then((result) => result?.json())
    .then((result) => {
      if(!result){
        return undefined;
      }
      if (result.error){
        throw new Error(result.error)
      }
      return result;
    });
}

export const getUserByName = async (first: string, last: string):Promise<User> => {
  return fetch(`/api/query_user`,{
    method:"POST",
    body:JSON.stringify({
      first,last
    })
  })
    .then((result) => result.json())
    .then((result) => {
      if (result.error){
        throw new Error(result.error)
      }
      return result;
    });
};

export const getUserByCode = async (code: string):Promise<User> => {
  return fetch(`/api/get_user/${code}`)
    .then((result) => result.json())
    .then((result) => {
      if (result.error){
        throw new Error(result.error)
      }
      return result;
    });
};
