import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "./service";

const RecipeDetails = () => {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {

    const fetchRecipe = async () => {
              
      const data=await getRecipe(id);

      setRecipe(data);

    };

    fetchRecipe();

  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
 
  <section className="bg-gray-50 px-6 py-16">

    <div className="mx-auto max-w-6xl">

      <div className="grid gap-10 md:grid-cols-2">

        {/* Image */}
        <div>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-112.5 w-full rounded-3xl object-cover shadow-lg"    
          />
        </div>

        {/* Details */}
        <div>

          <p className="font-semibold uppercase tracking-widest text-orange-500">
            Recipe Details
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            {recipe.name}
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            ⭐ {recipe.rating}
          </p>

          <div className="mt-6 flex gap-6 text-gray-600">

            <p>
              ⏱ {recipe.prepTimeMinutes} min prep
            </p>

            <p>
              🍳 {recipe.cookTimeMinutes} min cook
            </p>

          </div>

          <p className="mt-4 text-gray-600">
            👨‍👩‍👧 Servings: {recipe.servings}
          </p>

          <div className="mt-8">

            <h2 className="text-2xl font-bold">
              Ingredients
            </h2>

            <ul className="mt-4 space-y-2">
              

              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm"
                >
                  ✓ {ingredient}
                </li>
              ))}

            </ul>

          </div>

        </div>

      </div>


      {/* Instructions */}
      <div className="mt-16">

        <h2 className="text-3xl font-bold">
          Cooking Instructions
        </h2>

        <div className="mt-6 space-y-4">

          {recipe.instructions.map((instruction, index) => (

            <div
              key={index}
              className="flex gap-4 rounded-xl bg-white p-5 shadow-sm"
            >

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                {index + 1}
              </div>

              <p className="text-gray-600">
                {instruction}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  </section>

  );
};

export default RecipeDetails;