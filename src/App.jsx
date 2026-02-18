import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Index from "./pages/Index.jsx"
import Inicio from "./pages/Inicio.jsx"
import Pokedex from "./pages/Pokedex.jsx"
import Generaciones from "./pages/Generaciones.jsx"
import Batallas from "./pages/Batallas.jsx"
import Tipos from "./pages/Tipos.jsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/generaciones" element={<Generaciones />} />
        <Route path="/batallas" element={<Batallas />} />
        <Route path="/tipos" element={<Tipos />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
