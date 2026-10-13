import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './compoents/Navbar'
import Login from './paged/Login'
import Home from './paged/Home'
import Register from './paged/Register'
import RecipeDetails from './paged/RcipeDetails'
import Favorites from './paged/FavoritesPage'
import Recipes from './paged/Recipes'
import AdminDaashbord from './paged/AdminDaashbord'

// Lazy loading
// const Home = lazy(() => import('./paged/Home'))
// const Register = lazy(() => import('./paged/Register'))
// const RecipeDetails = lazy(() => import('./paged/RcipeDetails'))
// const Favorites = lazy(() => import('./paged/FavoritesPage'))
// const Recipes = lazy(() => import('./paged/Recipes'))

const App = () => {

  return (
    <>
      <Navbar />

      {/* <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-xl font-semibold text-orange-500">
              Loading...
            </p>
          </div>
        } */}
      {/* > */}

        <Routes>
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/register"
            element={<Register/>}
          />
          <Route path="/" element={<Login />} />

          <Route
            path="/recipes"
            element={<Recipes />}
          />

          <Route
            path="/recipes/:id"
            element={<RecipeDetails />}
          />

          <Route
            path="/AdminDaashbord"
            element={<AdminDaashbord />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/about"
            element={<div>About Page</div>}
          />

          <Route
            path="/contact"
            element={<div>Contact Page</div>}
          />

        </Routes>

      {/* </Suspense> */}
    </>
  )
}

export default App