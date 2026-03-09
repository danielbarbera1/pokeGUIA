import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Progress from '../components/Progress';

const CreadorEquipo = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [team, setTeam] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedGen, setSelectedGen] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [teamStats, setTeamStats] = useState({
    totalHP: 0,
    totalAttack: 0,
    totalDefense: 0,
    totalSpeed: 0,
    typeCoverage: []
  });

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
  };

  // Generaciones con rango de IDs
  const generations = [
    { id: 1, name: 'Generación I', start: 1, end: 151 },
    { id: 2, name: 'Generación II', start: 152, end: 251 },
    { id: 3, name: 'Generación III', start: 252, end: 386 },
    { id: 4, name: 'Generación IV', start: 387, end: 493 },
    { id: 5, name: 'Generación V', start: 494, end: 649 },
    { id: 6, name: 'Generación VI', start: 650, end: 721 },
    { id: 7, name: 'Generación VII', start: 722, end: 809 },
    { id: 8, name: 'Generación VIII', start: 810, end: 905 },
    { id: 9, name: 'Generación IX', start: 906, end: 1025 }
  ];

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/type/');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();
        const filtered = data.results
          .filter(t => !['unknown', 'shadow'].includes(t.name))
          .sort((a, b) => a.name.localeCompare(b.name));
        setTypes(filtered);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };
    fetchTypes();
  }, []);

  // Cargar Pokémon cuando cambia la generación
  useEffect(() => {
    fetchPokemonByGeneration();
  }, [selectedGen]);

  const fetchPokemonByGeneration = async () => {
    try {
      setLoading(true);
      
      let start, end;
      
      if (selectedGen === 'todos') {
        // Cargar solo Gen I por defecto cuando es "todos"
        start = 1;
        end = 151;
      } else {
        const gen = generations.find(g => g.id === parseInt(selectedGen));
        start = gen.start;
        end = gen.end;
      }
      
      const limit = end - start + 1;
      const offset = start - 1;
      
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();

      const pokemonPromises = data.results.map(async (pokemon) => {
        try {
          const detailRes = await fetch(pokemon.url);
          const detailData = await detailRes.json();

          return {
            id: detailData.id,
            name: detailData.name,
            image: detailData.sprites.other['official-artwork'].front_default,
            types: detailData.types.map(t => t.type.name),
            stats: {
              hp: detailData.stats[0].base_stat,
              attack: detailData.stats[1].base_stat,
              defense: detailData.stats[2].base_stat,
              speed: detailData.stats[5].base_stat
            },
            height: detailData.height,
            weight: detailData.weight
          };
        } catch (error) {
          console.error('Error fetching Pokemon details:', error);
          return null;
        }
      });

      const pokemonData = (await Promise.all(pokemonPromises)).filter(p => p !== null);
      setPokemonList(pokemonData);
      setFilteredPokemon(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar Pokémon por nombre y tipo (la generación ya se maneja en fetchPokemonByGeneration)
  useEffect(() => {
    let filtered = pokemonList;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'todos') {
      filtered = filtered.filter(p =>
        p.types.includes(selectedType)
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  const [isSearchingApi, setIsSearchingApi] = useState(false)
  const [searchFailed, setSearchFailed] = useState(false)

  // Búsqueda específica en la PokeAPI si no está en la lista actual
  useEffect(() => {
    const searchExternalPokemon = async () => {
      if (!searchTerm || searchTerm.trim() === '') return;
      if (filteredPokemon.length === 0) {
        try {
          setIsSearchingApi(true)
          setSearchFailed(false)
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`)
          if (!res.ok) throw new Error('Not found')
          const detailData = await res.json()

          const newPoke = {
            id: detailData.id,
            name: detailData.name,
            image: detailData.sprites.other['official-artwork'].front_default,
            types: detailData.types.map(t => t.type.name),
            stats: {
              hp: detailData.stats[0].base_stat,
              attack: detailData.stats[1].base_stat,
              defense: detailData.stats[2].base_stat,
              speed: detailData.stats[5].base_stat
            },
            height: detailData.height,
            weight: detailData.weight
          };

          setPokemonList(prev => {
            if (prev.find(p => p.id === detailData.id)) return prev;
            return [newPoke, ...prev];
          })
        } catch (e) {
          setSearchFailed(true)
        } finally {
          setIsSearchingApi(false)
        }
      }
    }

    const timer = setTimeout(() => {
      searchExternalPokemon()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, filteredPokemon.length])

  // Añadir Pokémon al equipo
  const addToTeam = (pokemon) => {
    if (team.length >= 6) {
      alert('¡El equipo ya tiene 6 Pokémon!');
      return;
    }
    if (team.some(p => p.id === pokemon.id)) {
      alert('¡Este Pokémon ya está en tu equipo!');
      return;
    }
    setTeam([...team, pokemon]);
    updateTeamStats([...team, pokemon]);
  };

  // Quitar Pokémon del equipo
  const removeFromTeam = (pokemonId) => {
    const newTeam = team.filter(p => p.id !== pokemonId);
    setTeam(newTeam);
    updateTeamStats(newTeam);
  };

  // Actualizar estadísticas del equipo
  const updateTeamStats = (currentTeam) => {
    const stats = {
      totalHP: 0,
      totalAttack: 0,
      totalDefense: 0,
      totalSpeed: 0,
      typeCoverage: []
    };

    const typesInTeam = [];
    currentTeam.forEach(p => {
      stats.totalHP += p.stats.hp;
      stats.totalAttack += p.stats.attack;
      stats.totalDefense += p.stats.defense;
      stats.totalSpeed += p.stats.speed;
      typesInTeam.push(...p.types);
    });

    // Calcular cobertura de tipos
    const uniqueTypes = [...new Set(typesInTeam)];
    stats.typeCoverage = uniqueTypes;

    setTeamStats(stats);
  };

  // Formatear nombre
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Limpiar equipo
  const clearTeam = () => {
    setTeam([]);
    setTeamStats({
      totalHP: 0,
      totalAttack: 0,
      totalDefense: 0,
      totalSpeed: 0,
      typeCoverage: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          🎮 Creador de Equipo Pokémon
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Construye tu equipo perfecto con hasta 6 Pokémon
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel izquierdo - Filtros y lista de Pokémon */}
          <div className="lg:col-span-2">
            {/* Filtros */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Buscar Pokémon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none text-white"
                />

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none text-white"
                >
                  <option value="todos">Todos los tipos</option>
                  {types.map(type => (
                    <option key={type.name} value={type.name}>
                      {formatName(type.name)}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedGen}
                  onChange={(e) => setSelectedGen(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none text-white"
                >
                  <option value="todos">Todas las generaciones</option>
                  {generations.map(gen => (
                    <option key={gen.id} value={gen.id}>
                      {gen.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-400 mt-2 text-sm">
                Mostrando {filteredPokemon.length} Pokémon
              </p>
            </div>

            {/* Grid de Pokémon disponibles */}
            {loading ? (
              <div className="text-center py-12">
                <Progress />
                <p className="mt-4 text-gray-400">Cargando Pokémon...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPokemon.length === 0 ? (
                  <div className="col-span-1 sm:col-span-2 xl:col-span-3 text-center py-12">
                    {isSearchingApi ? (
                      <div className="flex flex-col items-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                        <p className="text-gray-400">Buscando "{searchTerm}" en la PokeAPI...</p>
                      </div>
                    ) : searchFailed ? (
                      <div className="flex flex-col items-center">
                        <span className="text-4xl mb-2">❓</span>
                        <p className="text-xl text-gray-400 mb-2">
                          No se encontró ningún Pokémon llamado "{searchTerm}"
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xl text-gray-400 mb-2">
                          No se encontraron Pokémon
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  filteredPokemon.map(pokemon => (
                    <div 
                      key={pokemon.id} 
                      className="bg-gray-800 rounded-xl p-3 hover:bg-gray-700 transition-colors border border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={pokemon.image}
                          alt={pokemon.name}
                          className="w-16 h-16 object-contain"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold capitalize text-white">{pokemon.name}</h3>
                            <span className="text-xs text-gray-400">#{pokemon.id}</span>
                          </div>
                          <div className="flex gap-1 mt-1">
                            {pokemon.types.map(type => (
                              <span key={type} className={`text-xs px-2 py-0.5 rounded-full text-white capitalize
                                ${typeColors[type] || 'bg-gray-500'}`}>
                                {type}
                              </span>
                            ))}
                          </div>
                          <div className="grid grid-cols-4 gap-1 mt-2 text-xs text-gray-300">
                            <div>HP {pokemon.stats.hp}</div>
                            <div>ATQ {pokemon.stats.attack}</div>
                            <div>DEF {pokemon.stats.defense}</div>
                            <div>VEL {pokemon.stats.speed}</div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => addToTeam(pokemon)}
                        disabled={team.length >= 6 || team.some(p => p.id === pokemon.id)}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm py-1 rounded"
                      >
                        Añadir al equipo
                      </Button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Panel derecho - Equipo actual */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tu Equipo</h2>
                <span className="text-gray-400">{team.length}/6</span>
              </div>

              {/* Lista del equipo */}
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {team.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Añade Pokémon a tu equipo
                  </p>
                ) : (
                  team.map(pokemon => (
                    <div key={pokemon.id} className="bg-gray-700 rounded-lg p-2 flex items-center gap-2">
                      <img src={pokemon.image} alt={pokemon.name} className="w-12 h-12 object-contain" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-semibold capitalize text-sm">{pokemon.name}</span>
                          <button
                            onClick={() => removeFromTeam(pokemon.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {pokemon.types.map(type => (
                            <span key={type} className={`text-xs px-2 py-0.5 rounded-full text-white capitalize
                              ${typeColors[type] || 'bg-gray-500'}`}>
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Estadísticas del equipo */}
              {team.length > 0 && (
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="font-semibold mb-2">Estadísticas totales</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>HP Total:</span>
                      <span className="font-bold text-green-400">{teamStats.totalHP}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ataque Total:</span>
                      <span className="font-bold text-red-400">{teamStats.totalAttack}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Defensa Total:</span>
                      <span className="font-bold text-blue-400">{teamStats.totalDefense}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Velocidad Total:</span>
                      <span className="font-bold text-yellow-400">{teamStats.totalSpeed}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-semibold mb-1 text-sm">Cobertura de tipos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {teamStats.typeCoverage.map(type => (
                        <span key={type} className={`text-xs px-2 py-1 rounded-full text-white capitalize
                          ${typeColors[type] || 'bg-gray-500'}`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={clearTeam}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                  >
                    Limpiar equipo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreadorEquipo;