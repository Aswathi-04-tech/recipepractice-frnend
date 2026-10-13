import React, { useEffect, useState } from "react";
import { getRecipesApi, addRecipeApi, updateRecipeApi, deleteRecipeApi } from "../services/allApi";

function AdminDaashbord() {
  const [recipes, setRecipes] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "",
    cuisine: "",
    caloriesPerServing: "",
    image:null,
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // GET ALL RECIPES
  // =========================
const getRecipes = async () => {
  try {

    const token = localStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const result = await getRecipesApi(reqHeader);

    if (result.status === 200) {
      setRecipes(result.data.recipes);
    }

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  useEffect(() => {
    getRecipes();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
  setFormData({
    ...formData,
    image: e.target.files[0]
  });
};
  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      name: "",
      ingredients: "",
      instructions: "",
      prepTimeMinutes: "",
      cookTimeMinutes: "",
      servings: "",
      difficulty: "",
      cuisine: "",
      caloriesPerServing: "",
      image: "",
    });

    setEditId(null);
  };

  // =========================
  // ADD / UPDATE
  // =========================
  const handleEdit = (recipe) => {
  setEditId(recipe._id);

  setFormData({
    name: recipe.name || "",
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join(", ")
      : recipe.ingredients || "",
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions.join(", ")
      : recipe.instructions || "",
    prepTimeMinutes: recipe.prepTimeMinutes || "",
    cookTimeMinutes: recipe.cookTimeMinutes || "",
    servings: recipe.servings || "",
    difficulty: recipe.difficulty || "",
    cuisine: recipe.cuisine || "",
    caloriesPerServing: recipe.caloriesPerServing || "",
    image:null
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "ingredients" || key === "instructions") {
        data.append(
          key,
          JSON.stringify(
            formData[key]
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          )
        );
      } else if (key !== "image") {
        data.append(key, formData[key]);
      }
    });

    // Upload only if a new image is selected
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    let result;

    if (editId) {
      result = await updateRecipeApi(editId, data, reqHeader);
    } else {
      result = await addRecipeApi(data, reqHeader);
    }

    if (result.status === 200 || result.status === 201) {
      alert(
        editId
          ? "Recipe updated successfully"
          : "Recipe added successfully"
      );

      resetForm();
      getRecipes();
    }
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   setLoading(true);

//   try {
//     // Get token from localStorage
//     const token = localStorage.getItem("token");

//     // Create request header
//     const reqHeader = {
//       Authorization: `Bearer ${token}`
//     };
//     let result;
//     const data = new FormData();

// Object.keys(formData).forEach((key) => {
//   if (key !== "image") {
//     data.append(key, formData[key]);
//   }
// });

// // Append image only if a new file is selected
// if (formData.image instanceof File) {
//   data.append("image", formData.image);
// }

//     if (editId) {
//       // Call update recipe API
//     result = await updateRecipeApi(editId, data, reqHeader);    } else {
//     // Call add recipe API
//     result = await addRecipeApi(data, reqHeader);
//     }
//     if (result.status === 200 || result.status === 201) {
//       alert( editId ? "Recipe updated successfully" : "Recipe added successfully");

//       // Clear form
//       resetForm();

//       // Get updated recipe list
//       getRecipes();
//     }

//   } catch (error) {
//     console.log(error);

//     alert(
//       error.response?.data?.message ||
//       "Something went wrong"
//     );
//   }

//   setLoading(false);
// };

  // =========================
  // EDIT
  // =========================
  

  // =========================
  // DELETE
  // =========================
 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this recipe?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const result = await deleteRecipeApi(id, reqHeader);

    if (result.status === 200) {
      alert("Recipe deleted successfully");

      // Refresh recipe list
      getRecipes();
    }

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ================= HEADER ================= */}

      <div className="max-w-7xl mx-auto mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Admin Recipe Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your recipes
        </p>

      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* ================= FORM ================= */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            {editId ? "Update Recipe" : "Add Recipe"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Recipe name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              name="ingredients"
              placeholder="Ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              name="instructions"
              placeholder="Instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              name="prepTimeMinutes"
              placeholder="Preparation time"
              value={formData.prepTimeMinutes}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              name="cookTimeMinutes"
              placeholder="Cooking time"
              value={formData.cookTimeMinutes}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              name="servings"
              placeholder="Servings"
              value={formData.servings}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              name="caloriesPerServing"
              placeholder="Calories per serving"
              value={formData.caloriesPerServing}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          <input
  type="file"
  name="image"
  accept="image/*"
  onChange={handleImageChange}
  className="w-full border rounded-xl px-4 py-3"
/>

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white rounded-xl py-3 font-semibold"
              >
                {editId ? "Update Recipe" : "Add Recipe"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 bg-gray-200 rounded-xl"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* ================= RECIPE LIST ================= */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold">
                Recipe List
              </h2>

              <p className="text-sm text-gray-500">
                Total recipes: {recipes.length}
              </p>

            </div>

            <div className="divide-y">

              {recipes.length === 0 ? (

                <div className="p-8 text-center text-gray-500">
                  No recipes found
                </div>

              ) : (

                recipes.map((recipe) => (

                  <div
                    key={recipe._id}
                    className="p-5 flex gap-5 items-center"
                  >

                    {/* IMAGE */}

                   <img
  src={
    recipe.image
      ? `http://localhost:5000${recipe.image}`
      : "/default-recipe.jpg"
  }
  alt={recipe.name}
  className="w-full h-48 object-cover rounded-xl"
/>

                    {/* DETAILS */}

                    <div className="flex-1">

                      <h3 className="font-bold text-lg">
                        {recipe.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {recipe.cuisine}
                      </p>

                      <div className="flex gap-4 text-xs text-gray-400 mt-2">
                        <span>
                          Prep: {recipe.prepTimeMinutes} min
                        </span>

                        <span>
                          Cook: {recipe.cookTimeMinutes} min
                        </span>

                        <span>
                          {recipe.difficulty}
                        </span>
                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleEdit(recipe)}
                        className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold"
                      >
                        Edit
                      </button>

                      <button
                         onClick={() => handleDelete(recipe._id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDaashbord;