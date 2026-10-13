import React, { useEffect, useState } from "react";

import RecipeCard from "../compoents/Recipecard";
import { getRecipes } from "./service";

const Recipes = () => {
  // Store all recipes
  const [recipes, setRecipes] = useState([]);

  // Store search input
  const [search, setSearch] = useState("");

  // Store filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // 1. Fetch recipes from API
  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();

      setRecipes(data);
      setFilteredRecipes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Search function
  const handleSearch = () => {
    const result = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRecipes(result);
  };

  // 3. Clear search
  const handleClear = () => {
    setSearch("");
    setFilteredRecipes(recipes);
  };

  // Run API function when page loads
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* Page Heading */}
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          🍴 Delicious Recipes
        </h1>

        <p className="mt-2 text-gray-500">
          Discover delicious recipes for every occasion
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mt-8 flex max-w-2xl gap-3">

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Search
        </button>

        <button
          onClick={handleClear}
          className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300"
        >
          Clear
        </button>

      </div>

      {/* Recipe Section */}
      <div className="mx-auto mt-10 max-w-7xl">

        {loading ? (
          <p className="text-center text-gray-500">
            Loading recipes...
          </p>
        ) : filteredRecipes.length === 0 ? (
          <p className="text-center text-red-500">
            No recipes found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Recipes;