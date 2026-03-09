import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Index from "./pages/Index.jsx"
import Inicio from "./pages/Inicio.jsx"
import Pokedex from "./pages/Pokedex.jsx"
import Generaciones from "./pages/Generaciones.jsx"
import Batallas from "./pages/Batallas.jsx"
import Tipos from "./pages/Tipos.jsx"
import CalculadoraTipos from './pages/CalculadoraTipos.jsx'
import Movimientos from './pages/Movimientos.jsx'
import CreadorEquipo from './pages/CreadorEquipo.jsx'
import Privacidad from './pages/Privacidad.jsx'
import Terminos from './pages/Terminos.jsx'
import SearchResults from './pages/SearchResults.jsx'

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/generaciones" element={<Generaciones />} />
          <Route path="/batallas" element={<Batallas />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/calculadora" element={<CalculadoraTipos />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/creador" element={<CreadorEquipo />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/buscar" element={<SearchResults />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App
