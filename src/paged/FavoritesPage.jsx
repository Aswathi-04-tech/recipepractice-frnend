import React, { useContext } from "react";
import RecipeCard from "../compoents/Recipecard";

import { FavoriteContext } from "../context/Fvoutercontext";


const Favorites = () => {

  const { favorites } = useContext(FavoriteContext);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <h1 className="mb-8 text-center text-3xl font-bold">
        ❤️ My Favorite Recipes 
        =============================
      </h1>


      {favorites.length === 0 ? (

        <p className="text-center text-gray-500">
          No favorite recipes yet.
        </p>

      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {favorites.map((recipe) => (

            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default Favorites;
