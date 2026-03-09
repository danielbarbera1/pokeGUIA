import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'
import Card from '../components/Card'

const SearchResults = () => {
  const { searchTerm, setSearchTerm } = useSearch()
  const [loading, setLoading] = useState(false)
  const [pokemonResults, setPokemonResults] = useState([])
  const [typeResults, setTypeResults] = useState(null) // { type, pokemon: [] }
  const [moveResults, setMoveResults] = useState([])
  const [activeTab, setActiveTab] = useState('all')

  // Lista de tipos válidos para detectar búsquedas de tipo
  const validTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dragon', 'dark', 'steel', 'fairy'
  ]

  // Traducción de tipos español -> inglés
  const typeTranslations = {
    'fuego': 'fire', 'agua': 'water', 'planta': 'grass', 'electrico': 'electric',
    'eléctrico': 'electric', 'hielo': 'ice', 'lucha': 'fighting', 'veneno': 'poison',
    'tierra': 'ground', 'volador': 'flying', 'psiquico': 'psychic', 'psíquico': 'psychic',
    'bicho': 'bug', 'roca': 'rock', 'fantasma': 'ghost', 'dragon': 'dragon',
    'dragón': 'dragon', 'siniestro': 'dark', 'acero': 'steel', 'hada': 'fairy',
    'normal': 'normal'
  }

  // Colores para cada tipo
  const typeColors = {
    normal: 'bg-gray-400', fire: 'bg-orange-500', water: 'bg-blue-500',
    electric: 'bg-yellow-400', grass: 'bg-green-500', ice: 'bg-cyan-300',
    fighting: 'bg-red-700', poison: 'bg-purple-600', ground: 'bg-yellow-600',
    flying: 'bg-indigo-300', psychic: 'bg-pink-500', bug: 'bg-lime-500',
    rock: 'bg-yellow-800', ghost: 'bg-purple-800', dragon: 'bg-indigo-700',
    dark: 'bg-gray-700', steel: 'bg-gray-400', fairy: 'bg-pink-300',
  }

  // Detectar si el término es un tipo
  const getTypeFromSearch = (term) => {
    const lowerTerm = term.toLowerCase().trim()
    // Primero buscar traducción español
    if (typeTranslations[lowerTerm]) {
      return typeTranslations[lowerTerm]
    }
    // Si no, verificar si es un tipo en inglés
    if (validTypes.includes(lowerTerm)) {
      return lowerTerm
    }
    return null
  }

  // Búsqueda principal
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setPokemonResults([])
      setTypeResults(null)
      setMoveResults([])
      return
    }

    const performSearch = async () => {
      setLoading(true)
      const term = searchTerm.toLowerCase().trim()

      try {
        // Ejecutar todas las búsquedas en paralelo
        await Promise.all([
          searchPokemon(term),
          searchType(term),
          searchMove(term)
        ])
      } catch (error) {
        console.error('Error en búsqueda:', error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(performSearch, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Buscar Pokémon por nombre
  const searchPokemon = async (term) => {
    try {
      // Búsqueda directa por nombre exacto
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`)
      if (res.ok) {
        const data = await res.json()
        setPokemonResults([{
          name: data.name,
          id: data.id,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          types: data.types.map(t => t.type.name)
        }])
        return
      }
    } catch {
      // No encontrado exacto, buscar parcialmente
    }

    // Búsqueda parcial en lista de Pokémon
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
      if (res.ok) {
        const data = await res.json()
        const matches = data.results
          .filter(p => p.name.includes(term))
          .slice(0, 12)

        const pokemonDetails = await Promise.all(
          matches.map(async (p) => {
            const id = p.url.split('/').filter(Boolean).pop()
            try {
              const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
              const detailData = await detailRes.json()
              return {
                name: p.name,
                id,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                types: detailData.types.map(t => t.type.name)
              }
            } catch {
              return {
                name: p.name,
                id,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                types: []
              }
            }
          })
        )
        setPokemonResults(pokemonDetails)
      }
    } catch (error) {
      console.error('Error buscando Pokémon:', error)
      setPokemonResults([])
    }
  }

  // Buscar por tipo
  const searchType = async (term) => {
    const typeName = getTypeFromSearch(term)
    if (!typeName) {
      setTypeResults(null)
      return
    }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      if (!res.ok) {
        setTypeResults(null)
        return
      }

      const data = await res.json()
      
      // Obtener los primeros 20 Pokémon de este tipo
      const pokemonList = data.pokemon.slice(0, 20)
      const pokemonDetails = await Promise.all(
        pokemonList.map(async (p) => {
          const id = p.pokemon.url.split('/').filter(Boolean).pop()
          try {
            const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const detailData = await detailRes.json()
            return {
              name: p.pokemon.name,
              id,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              types: detailData.types.map(t => t.type.name)
            }
          } catch {
            return {
              name: p.pokemon.name,
              id,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              types: []
            }
          }
        })
      )

      setTypeResults({
        type: typeName,
        totalCount: data.pokemon.length,
        pokemon: pokemonDetails
      })
    } catch (error) {
      console.error('Error buscando tipo:', error)
      setTypeResults(null)
    }
  }

  // Buscar movimiento
  const searchMove = async (term) => {
    const formattedTerm = term.replace(/ /g, '-')
    
    try {
      // Búsqueda directa por nombre
      const res = await fetch(`https://pokeapi.co/api/v2/move/${formattedTerm}`)
      if (res.ok) {
        const data = await res.json()
        setMoveResults([{
          id: data.id,
          name: data.name,
          type: data.type.name,
          power: data.power || '—',
          accuracy: data.accuracy || '—',
          pp: data.pp || '—',
          category: data.damage_class?.name || 'status',
          effect: data.effect_entries.find(e => e.language.name === 'en')?.short_effect || 'Sin descripción'
        }])
        return
      }
    } catch {
      // No encontrado exacto
    }

    // Búsqueda parcial
    try {
      const res = await fetch('https://pokeapi.co/api/v2/move?limit=900')
      if (res.ok) {
        const data = await res.json()
        const matches = data.results
          .filter(m => m.name.includes(formattedTerm) || m.name.includes(term))
          .slice(0, 8)

        const moveDetails = await Promise.all(
          matches.map(async (m) => {
            try {
              const moveRes = await fetch(m.url)
              const moveData = await moveRes.json()
              return {
                id: moveData.id,
                name: moveData.name,
                type: moveData.type.name,
                power: moveData.power || '—',
                accuracy: moveData.accuracy || '—',
                pp: moveData.pp || '—',
                category: moveData.damage_class?.name || 'status',
                effect: moveData.effect_entries.find(e => e.language.name === 'en')?.short_effect || 'Sin descripción'
              }
            } catch {
              return null
            }
          })
        )
        setMoveResults(moveDetails.filter(m => m !== null))
      }
    } catch (error) {
      console.error('Error buscando movimientos:', error)
      setMoveResults([])
    }
  }

  // Formatear nombre
  const formatName = (name) => {
    return name.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Contar resultados totales
  const totalResults = pokemonResults.length + 
    (typeResults ? typeResults.pokemon.length : 0) + 
    moveResults.length

  // Obtener ícono de categoría de movimiento
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'physical': return '💪'
      case 'special': return '✨'
      case 'status': return '📊'
      default: return '❓'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">
            🔍 Resultados de búsqueda
          </h1>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar Pokémon, tipos, movimientos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white"
          />

          {searchTerm && !loading && (
            <p className="text-gray-400 mt-3">
              {totalResults} resultados para "{searchTerm}"
            </p>
          )}

          {/* Tabs */}
          {searchTerm && totalResults > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Todos ({totalResults})
              </button>
              {pokemonResults.length > 0 && (
                <button
                  onClick={() => setActiveTab('pokemon')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'pokemon' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Pokémon ({pokemonResults.length})
                </button>
              )}
              {typeResults && (
                <button
                  onClick={() => setActiveTab('type')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'type' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Tipo {formatName(typeResults.type)} ({typeResults.pokemon.length})
                </button>
              )}
              {moveResults.length > 0 && (
                <button
                  onClick={() => setActiveTab('moves')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'moves' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Movimientos ({moveResults.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-400">Buscando "{searchTerm}"...</p>
          </div>
        ) : !searchTerm ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-xl text-gray-400">
              Escribe algo para buscar Pokémon, tipos o movimientos
            </p>
            <div className="mt-6 text-gray-500 text-sm">
              <p>Ejemplos: "pikachu", "hielo", "corte", "dragon"</p>
            </div>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">😕</p>
            <p className="text-xl text-gray-400">
              No se encontraron resultados para "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Sección Pokémon por nombre */}
            {pokemonResults.length > 0 && (activeTab === 'all' || activeTab === 'pokemon') && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🎮</span> Pokémon
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {pokemonResults.map(pokemon => (
                    <Card
                      key={pokemon.id}
                      name={pokemon.name}
                      pokemonId={pokemon.id}
                      imageUrl={pokemon.imageUrl}
                      types={pokemon.types}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Sección Tipo */}
            {typeResults && (activeTab === 'all' || activeTab === 'type') && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${typeColors[typeResults.type]}`}>
                      {formatName(typeResults.type)}
                    </span>
                    Pokémon de tipo {formatName(typeResults.type)}
                  </h2>
                  <Link 
                    to="/tipos" 
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Ver todos ({typeResults.totalCount}) →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {typeResults.pokemon.map(pokemon => (
                    <Card
                      key={`type-${pokemon.id}`}
                      name={pokemon.name}
                      pokemonId={pokemon.id}
                      imageUrl={pokemon.imageUrl}
                      types={pokemon.types}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Sección Movimientos */}
            {moveResults.length > 0 && (activeTab === 'all' || activeTab === 'moves') && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>⚔️</span> Movimientos
                  </h2>
                  <Link 
                    to="/movimientos" 
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Ver todos →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {moveResults.map(move => (
                    <div key={move.id} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold capitalize">
                          {formatName(move.name)}
                        </h3>
                        <span className="text-sm text-gray-400">
                          #{move.id.toString().padStart(3, '0')}
                        </span>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize text-white
                          ${typeColors[move.type] || 'bg-gray-500'}`}>
                          {move.type}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-gray-700 text-xs font-semibold capitalize">
                          {getCategoryIcon(move.category)} {move.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Poder</div>
                          <div className="font-bold">{move.power}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Precisión</div>
                          <div className="font-bold">{move.accuracy}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">PP</div>
                          <div className="font-bold">{move.pp}</div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 line-clamp-2">
                        {move.effect}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
