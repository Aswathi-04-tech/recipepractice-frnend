export const getRecipes = async () => {

  const response = await fetch(
    "https://dummyjson.com/recipes"
  );

  const data = await response.json();

  return data.recipes;
}


export const getRecipe = async (id) => {
  const response = await fetch(
    `https://dummyjson.com/recipes/${id}`
  );

  const data = await response.json();

  return data;
};



// GET ALL RECIPES
export const adminGetRecipesApi = async () => {
  return await commonApi(
    "GET",
    `${serverUrl}/recipes`
  );
};


// ADD RECIPE
export const addRecipeApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/recipes`,
    reqBody
  );
};


// UPDATE RECIPE
export const updateRecipeApi = async (id, reqBody) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/recipes/${id}`,
    reqBody
  );
};


// DELETE RECIPE
export const deleteRecipeApi = async (id) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/recipes/${id}`
  );
};