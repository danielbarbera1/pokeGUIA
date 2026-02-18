import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'

const Tipos = () => {
  const [types, setTypes] = useState([])
  const [selectedType, setSelectedType] = useState(null)
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(false)
  const [typeDetails, setTypeDetails] = useState(null)

  // Colores para cada tipo
  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-600',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300',
  }

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/type/')
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
        const data = await res.json()
        // Filtrar tipos desconocidos y shadow, y ordenar alfabéticamente
        const filtered = data.results
          .filter(t => !['unknown', 'shadow'].includes(t.name))
          .sort((a, b) => a.name.localeCompare(b.name))
        setTypes(filtered)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTypes()
  }, [])

  const fetchPokemonByType = async (type) => {
    try {
      setLoading(true)
      
      // Obtener detalles del tipo
      const res = await fetch(type.url)
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
      const data = await res.json()
      
      console.log("Detalles del tipo:", data)

      // Guardar detalles del tipo
      setTypeDetails({
        name: data.name,
        id: data.id,
        damage_relations: data.damage_relations,
        move_count: data.moves?.length || 0,
        pokemon_count: data.pokemon?.length || 0,
      })

      // Procesar los Pokémon de este tipo
      const pokemonPromises = data.pokemon.map(async (p) => {
        const id = p.pokemon.url.split('/').filter(Boolean).pop()
        
        // Obtener datos adicionales del Pokémon
        try {
          const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
          const pokemonData = await pokemonRes.json()
          
          return {
            name: p.pokemon.name,
            url: p.pokemon.url,
            id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: pokemonData.types?.map(t => t.type.name) || [],
            stats: pokemonData.stats || [],
          }
        } catch (error) {
          // Fallback si no se pueden obtener datos completos
          return {
            name: p.pokemon.name,
            url: p.pokemon.url,
            id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: [],
          }
        }
      })

      const pokemonList = await Promise.all(pokemonPromises)
      
      // Ordenar Pokémon por ID
      const sortedPokemon = pokemonList.sort((a, b) => parseInt(a.id) - parseInt(b.id))
      
      setPokemon(sortedPokemon)
      setSelectedType(type)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Formatear nombre del tipo
  const formatTypeName = (name) => {
    if (!name) return ''
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  // Traducir relaciones de daño
  const translateDamageRelation = (relation) => {
    const translations = {
      no_damage_to: 'Sin daño a',
      half_damage_to: 'Poco daño a',
      double_damage_to: 'Mucho daño a',
      no_damage_from: 'Sin daño de',
      half_damage_from: 'Poco daño de',
      double_damage_from: 'Mucho daño de',
    }
    return translations[relation] || relation
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda - Lista de Tipos */}
        <div className="lg:w-1/3 xl:w-1/4">
          <div className="bg-gray-800 rounded-3xl border border-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-700 text-center">
              Tipos de Pokémon
            </h2>

            {/* Grid de 2 columnas para los tipos */}
            <div className='grid grid-cols-2 gap-2'>
              {types.map((type) => {
                const typeName = type.name
                const bgColor = typeColors[typeName] || 'bg-gray-500'
                
                return (
                  <div
                    key={type.name}
                    onClick={() => fetchPokemonByType(type)}
                    className="w-full"
                  >
                    <Button
                      name={formatTypeName(type.name)}
                      isSelected={selectedType?.name === type.name}
                      onClick={() => fetchPokemonByType(type)}
                      customColor={`${bgColor} hover:opacity-90 transition-opacity`}
                      className="w-full py-2 px-2 rounded-lg text-white font-semibold capitalize text-sm"
                    />
                  </div>
                )
              })}
            </div>

            {/* Información del tipo seleccionado */}
            {typeDetails && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-bold mb-3 text-center capitalize">
                  {formatTypeName(typeDetails.name)}
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pokémon:</span>
                    <span className="font-medium">{typeDetails.pokemon_count}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Movimientos:</span>
                    <span className="font-medium">{typeDetails.move_count}</span>
                  </div>

                  {/* Relaciones de daño */}
                  {typeDetails.damage_relations && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-300">Relaciones de daño</h4>
                      
                      {Object.entries(typeDetails.damage_relations).map(([relation, types]) => {
                        if (types.length === 0) return null
                        
                        return (
                          <div key={relation} className="text-xs">
                            <span className="text-gray-400 block mb-1">
                              {translateDamageRelation(relation)}:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {types.map(t => (
                                <span
                                  key={t.name}
                                  className={`px-2 py-1 rounded-full text-white text-xs capitalize
                                    ${typeColors[t.name] || 'bg-gray-500'}`}
                                >
                                  {t.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha - Pokémon del tipo */}
        <div className="lg:w-2/3 xl:w-3/4">
          {/* Encabezado con información */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {selectedType 
                ? `Pokémon de tipo ${formatTypeName(selectedType.name)}`
                : 'Selecciona un tipo'
              }
            </h1>

            {typeDetails && (
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium text-white
                  ${typeColors[selectedType?.name] || 'bg-gray-500'}`}
                >
                  {typeDetails.pokemon_count} Pokémon
                </span>
                <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium">
                  {typeDetails.move_count} Movimientos
                </span>
              </div>
            )}

            <p className="text-gray-400">
              {selectedType 
                ? `Mostrando ${pokemon.length} Pokémon de tipo ${formatTypeName(selectedType.name)}`
                : 'Haz clic en un tipo para ver sus Pokémon'
              }
            </p>
          </div>

          {/* Indicador de carga */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <p className="mt-4 text-lg">Cargando Pokémon...</p>
              <p className="text-gray-400 text-sm mt-2">
                {selectedType 
                  ? `Obteniendo Pokémon de tipo ${formatTypeName(selectedType.name)}`
                  : 'Cargando...'
                }
              </p>
            </div>
          )}

          {/* Grid de Pokémon */}
          {!loading && pokemon.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pokemon.map((poke) => (
                <Card
                  key={`${poke.name}-${poke.id}`}
                  name={poke.name}
                  imageUrl={poke.imageUrl}
                  pokemonId={poke.id}
                  types={poke.types || []}
                />
              ))}
            </div>
          )}

          {/* Mensaje si no hay Pokémon seleccionados */}
          {!loading && !selectedType && (
            <div className="text-center py-12">
              <div className="inline-block p-8 bg-gray-800 rounded-2xl">
                <p className="text-6xl mb-4">👆</p>
                <p className="text-xl text-gray-300">
                  Selecciona un tipo para ver sus Pokémon
                </p>
              </div>
            </div>
          )}

          {/* Mensaje si no hay Pokémon (por si acaso) */}
          {!loading && selectedType && pokemon.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-gray-800 rounded-2xl">
                <p className="text-xl mb-4">No se encontraron Pokémon de este tipo</p>
                <button
                  onClick={() => types.length > 0 && fetchPokemonByType(types[0])}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Ver primer tipo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tipos