import { commonApi } from "./commanApi";
import { serverUrl } from "./serverUrl";

export const registerApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/register`, reqBody);

}
export const loginApi= async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/login`, reqBody);
}



// GET ALL RECIPES
export const getRecipesApi = async (reqHeader) => {
  return await commonApi(
    "GET",
    `${serverUrl}/getrecipes`,
    null,
    reqHeader
  );
};


// ADD RECIPE
export const addRecipeApi = async (reqBody, reqHeader) => {
  return await commonApi(
    "POST",
    `${serverUrl}/recipes`,
    reqBody,
    reqHeader
  );
};


// UPDATE RECIPE
export const updateRecipeApi = async (id, reqBody, reqHeader) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/recipes/${id}`,
    reqBody,
    reqHeader
  );
};


// DELETE RECIPE
export const deleteRecipeApi = async (id, reqHeader) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/recipes/${id}`,
    null,
    reqHeader
  );
};