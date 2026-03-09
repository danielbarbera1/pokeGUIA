import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { useSearch } from '../context/SearchContext'

const Pokedex = () => {
  const { searchTerm, setSearchTerm } = useSearch()
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const limit = 20

  // Cargar Pokémon iniciales
  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
      const data = await res.json()

      // Procesar cada Pokémon para obtener su imagen
      const pokemonPromises = data.results.map(async (pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop()

        // Obtener detalles del Pokémon para la imagen
        try {
          const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
          const detailData = await detailRes.json()

          return {
            name: pokemon.name,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: detailData.types.map(t => t.type.name)
          }
        } catch (error) {
          // Fallback si no se pueden obtener detalles
          return {
            name: pokemon.name,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: []
          }
        }
      })

      const newPokemon = await Promise.all(pokemonPromises)

      if (offset === 0) {
        setPokemonList(newPokemon)
      } else {
        setPokemonList(prev => [...prev, ...newPokemon])
      }

      setHasMore(!!data.next)
    } catch (error) {
      console.error('Error fetching Pokémon:', error)
    } finally {
      setLoading(false)
    }
  }

  // Cargar más Pokémon
  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset(prev => prev + limit)
      fetchPokemon()
    }
  }

  // Filtrar Pokémon por búsqueda
  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [isSearchingApi, setIsSearchingApi] = useState(false)
  const [searchFailed, setSearchFailed] = useState(false)

  // Búsqueda específica en la PokeAPI si no está en la lista actual
  useEffect(() => {
    const searchExternalPokemon = async () => {
      if (!searchTerm || searchTerm.trim() === '') return;
      // Solo buscamos si no lo hemos encontrado localmente (con exact match)
      if (filteredPokemon.length === 0) {
        try {
          setIsSearchingApi(true)
          setSearchFailed(false)
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`)
          if (!res.ok) throw new Error('Not found')
          const data = await res.json()

          const newPoke = {
            name: data.name,
            id: data.id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            types: data.types.map(t => t.type.name)
          }

          // Añadir a la lista sin duplicarlo
          setPokemonList(prev => {
            if (prev.find(p => p.id === data.id)) return prev;
            return [newPoke, ...prev];
          })
        } catch (e) {
          setSearchFailed(true)
        } finally {
          setIsSearchingApi(false)
        }
      }
    }

    // Un pequeño delay (debounce) para no saturar la API al escribir
    const timer = setTimeout(() => {
      searchExternalPokemon()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, filteredPokemon.length])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Pokédex
          </h1>

          <input
            type="text"
            placeholder="Buscar Pokémon por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 mb-4">
          Mostrando {filteredPokemon.length} de {pokemonList.length} Pokémon
          {searchTerm && ` (filtrados por "${searchTerm}")`}
        </p>

        {pokemonList.length === 0 && loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Cargando Pokémon...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredPokemon.map(pokemon => (
                <Card
                  key={pokemon.id}
                  name={pokemon.name}
                  pokemonId={pokemon.id}
                  imageUrl={pokemon.imageUrl}
                  types={pokemon.types}
                  className="hover:shadow-lg transition-shadow"
                />
              ))}
            </div>

            {filteredPokemon.length === 0 && (
              <div className="text-center py-12">
                {isSearchingApi ? (
                  <div className="flex flex-col items-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                    <p className="text-gray-500 text-lg">Buscando "{searchTerm}" en la PokeAPI...</p>
                  </div>
                ) : searchFailed ? (
                  <p className="text-gray-500 text-lg gap-2 flex flex-col items-center">
                    <span className="text-4xl text-gray-400">❓</span>
                    No se encontró ningún Pokémon llamado "{searchTerm}"
                  </p>
                ) : (
                  <p className="text-gray-500 text-lg">
                    No se encontraron Pokémon con ese nombre
                  </p>
                )}
              </div>
            )}

            {/* Botón cargar más (solo si hay más Pokémon y no hay búsqueda activa) */}
            {!searchTerm && hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold rounded-lg transition-colors"
                >
                  {loading ? 'Cargando...' : 'Cargar más Pokémon'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Pokedex