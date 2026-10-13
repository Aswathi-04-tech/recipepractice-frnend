import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import FavoriteContextProvider from './context/Fvoutercontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><FavoriteContextProvider><App /></FavoriteContextProvider></BrowserRouter>
  </StrictMode>,
)