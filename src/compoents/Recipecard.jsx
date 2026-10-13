
import React, { useContext } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FavoriteContext } from "../context/Fvoutercontext.jsx";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

  // Support both DummyJSON and MongoDB IDs
  const recipeId = recipe.id || recipe._id;

  const isFavorite = favorites.some(
    (item) => (item.id || item._id) === recipeId
  );

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipe);
    }
  };

  // Support both local backend images and external image URLs
  const imageUrl = recipe.image
    ? recipe.image.startsWith("http")
      ? recipe.image
      : `http://localhost:5000${recipe.image}`
    : "/default-recipe.jpg";

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Recipe Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={recipe.name}
          className="h-56 w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/default-recipe.jpg";
          }}
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 rounded-full bg-white p-3 text-xl shadow"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Recipe Details */}
      <div className="p-5">
        <h2 className="text-xl font-bold">
          {recipe.name}
        </h2>

        <p className="mt-2 text-gray-600">
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-500"
          />{" "}
          {recipe.rating ?? "No rating"}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          ⏱ {recipe.cookTimeMinutes ?? "N/A"} minutes
        </p>

        <Link
          to={`/recipes/${recipeId}`}
          className="mt-4 inline-block font-semibold text-orange-500"
        >
          View Recipe →
        </Link>
      </div>

    </div>
  );
};

export default RecipeCard;
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useContext } from "react"
// import { FavoriteContext } from "../context/Fvoutercontext.jsx";
// import { Link } from "react-router-dom";

// const RecipeCard = ({ recipe }) => {
//   const { favorites, addFavorite, removeFavorite } =
//   useContext(FavoriteContext);

//     const isFavorite = favorites.some(
//     (item) => item.id === recipe.id
//   );


//   const handleFavorite = () => {

//     if (isFavorite) {

//       removeFavorite(recipe.id);

//     } else {

//       addFavorite(recipe);

//     }

//   };


//   return (
//     <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

//       <div className="relative">
//         <img
//           src={recipe.image
//       ? `http://localhost:5000${recipe.image}`
//       : "/default-recipe.jpg"
//   }
//   alt={recipe.name}
//           className="h-56 w-full object-cover"
//         />
//                 <button
//             onClick={handleFavorite}
//             className="absolute right-3 top-3 rounded-full bg-white p-3 text-xl shadow"
//           >
//             {isFavorite ? "❤️" : "🤍"}
//           </button>
  
//       </div>

//       <div className="p-5">

//         <h2 className="text-xl font-bold">
//           {recipe.name}
//         </h2>

//         {/* <p className="mt-2 text-gray-500">
//           ⭐ {recipe.rating}
//         </p> */}
//         <FontAwesomeIcon icon={faStar} className="text-yellow-500" /> {recipe.rating}

//         <p className="mt-2 text-sm text-gray-500">
//           ⏱ {recipe.cookTimeMinutes} minutes
//         </p>

//         <Link
//           to={`/recipes/${recipe.id}`}
//           className="mt-4 inline-block font-semibold text-orange-500"
//         >
//           View Recipe →
//         </Link>

//       </div>

//     </div>
//   );
// };

// export default RecipeCard;