import React from 'react'
import { Link } from 'react-router-dom'

const Inicio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo o título principal */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Poké<span className="text-yellow-400">Metric</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Descripción */}
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Tu guía completa del mundo Pokémon. Explora información detallada 
            sobre todos los Pokémon, sus tipos y generaciones.
          </p>

          {/* Botones de navegación */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              to="/pokedex"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              📱 Ver Pokédex
            </Link>
            
            <Link
              to="/generaciones"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              📚 Generaciones
            </Link>
            
            <Link
              to="/tipos"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              ⚡ Tipos
            </Link>
          </div>

          {/* Stats simples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-gray-400">Pokémon</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-400 mb-2">18</div>
              <div className="text-gray-400">Tipos</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-400 mb-2">9</div>
              <div className="text-gray-400">Generaciones</div>
            </div>
          </div>

          {/* Pokémon destacado simple */}
          <div className="mt-16">
            <p className="text-gray-500 mb-4">Pokémon destacado</p>
            <div className="flex justify-center">
              <div className="bg-gray-800/30 rounded-xl p-4 inline-block">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                  alt="Pikachu"
                  className="w-32 h-32 mx-auto"
                />
                <p className="text-white font-semibold mt-2">Pikachu</p>
                <p className="text-gray-500 text-sm">#025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="border-t border-gray-800 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>PokéMetric © 2026 - Tu enciclopedia Pokémon</p>
        </div>
      </footer>
    </div>
  )
}

export default Inicio