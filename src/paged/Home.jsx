import React from 'react'
import RecipeCard from '../compoents/Recipecard'
import { getRecipes } from './service';
import { useEffect, useState } from 'react';
import { getRecipesApi } from '../services/allApi';





const Home = () => {
    const [recipes, setRecipes] = useState([]);

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


 const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Recipe Book loaded");
  }, []);


  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
  useEffect(() => {
    console.log("Recipes updated:");
  }, [recipes]);

    return (
        <section className="bg-white px-6 py-16"> 
        <div className="mx-auto max-w-7xl"> {/* Section Heading */} 
            <div className="text-center"> 
               <button onClick={() => setCount(count + 1)}>
        Add
      </button>
                <p className="font-semibold uppercase tracking-widest text-orange-500"> Explore </p> 
                <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl"> Popular Categories </h2> 
                <p className="mx-auto mt-4 max-w-2xl text-gray-600"> Find delicious recipes based on what you're in the mood for. </p> 
                </div> {/* Categories */} <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4"> {/* Breakfast */} 
                    <div className="group cursor-pointer rounded-2xl border bg-orange-50 p-8 text-center transition hover:-translate-y-2 hover:shadow-lg"> 
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl"> 🍳 </div> 
                        <h3 className="mt-5 text-lg font-semibold"> Breakfast </h3> <p className="mt-2 text-sm text-gray-500"> Start your day right </p>
                         </div> {/* Lunch */} <div className="group cursor-pointer rounded-2xl border bg-orange-50 p-8 text-center transition hover:-translate-y-2 hover:shadow-lg"> 
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl"> 🍕 </div> 
                            <h3 className="mt-5 text-lg font-semibold"> Lunch </h3> <p className="mt-2 text-sm text-gray-500"> Delicious midday meals </p> </div> {/* Dinner */}
                             <div className="group cursor-pointer rounded-2xl border bg-orange-50 p-8 text-center transition hover:-translate-y-2 hover:shadow-lg"> 
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl"> 🍝 </div> 
                                <h3 className="mt-5 text-lg font-semibold"> Dinner </h3> <p className="mt-2 text-sm text-gray-500"> Perfect evening meals </p> </div> {/* Dessert */}
                                 <div className="group cursor-pointer rounded-2xl border bg-orange-50 p-8 text-center transition hover:-translate-y-2 hover:shadow-lg"> 
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl"> 🍰 </div> 
                                    <h3 className="mt-5 text-lg font-semibold"> Dessert </h3> 
                             <p className="mt-2 text-sm text-gray-500"> Sweet treats </p> 
                             </div> </div> </div> 
                       <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {recipes.map((recipe) => (
    <RecipeCard
      key={recipe._id}
      recipe={recipe}
    />
  ))}
</div>
                             </section>
    )
}

export default Home