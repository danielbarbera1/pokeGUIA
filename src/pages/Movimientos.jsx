import React, { useEffect, useState } from 'react';
import Progress from '../components/Progress';

const Movimientos = () => {
  const [moves, setMoves] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [types, setTypes] = useState([]);
  const limit = 20;

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

  // Categorías de movimientos
  const categories = [
    { value: 'todos', label: 'Todos' },
    { value: 'physical', label: 'Físico' },
    { value: 'special', label: 'Especial' },
    { value: 'status', label: 'Estado' }
  ];

  // Cargar tipos para el filtro
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

  // Cargar movimientos
  useEffect(() => {
    fetchMoves();
  }, [offset]);

  const fetchMoves = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/move?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();

      // Obtener detalles de cada movimiento
      const movePromises = data.results.map(async (move) => {
        try {
          const moveRes = await fetch(move.url);
          const moveData = await moveRes.json();

          return {
            id: moveData.id,
            name: moveData.name,
            type: moveData.type.name,
            power: moveData.power || '—',
            accuracy: moveData.accuracy || '—',
            pp: moveData.pp || '—',
            category: moveData.damage_class?.name || 'status',
            effect: moveData.effect_entries[0]?.short_effect || 'Sin descripción',
            effectChance: moveData.effect_chance || null
          };
        } catch (error) {
          console.error(`Error fetching move details:`, error);
          return null;
        }
      });

      const movesData = (await Promise.all(movePromises)).filter(m => m !== null);

      if (offset === 0) {
        setMoves(movesData);
        setFilteredMoves(movesData);
      } else {
        setMoves(prev => [...prev, ...movesData]);
        setFilteredMoves(prev => [...prev, ...movesData]);
      }

      setHasMore(!!data.next);
    } catch (error) {
      console.error('Error fetching moves:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar movimientos
  useEffect(() => {
    let filtered = moves;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(move =>
        move.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo
    if (selectedType !== 'todos') {
      filtered = filtered.filter(move => move.type === selectedType);
    }

    // Filtro por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(move => move.category === selectedCategory);
    }

    setFilteredMoves(filtered);
  }, [searchTerm, selectedType, selectedCategory, moves]);

  const [isSearchingApi, setIsSearchingApi] = useState(false)
  const [searchFailed, setSearchFailed] = useState(false)

  // Búsqueda específica en PokeAPI si no está en lista actual
  useEffect(() => {
    const searchExternalMove = async () => {
      if (!searchTerm || searchTerm.trim() === '') return;
      if (filteredMoves.length === 0) {
        try {
          setIsSearchingApi(true)
          setSearchFailed(false)
          const res = await fetch(`https://pokeapi.co/api/v2/move/${searchTerm.toLowerCase().trim().replace(/ /g, '-')}`)
          if (!res.ok) throw new Error('Not found')
          const moveData = await res.json()

          const newMove = {
            id: moveData.id,
            name: moveData.name,
            type: moveData.type.name,
            power: moveData.power || '—',
            accuracy: moveData.accuracy || '—',
            pp: moveData.pp || '—',
            category: moveData.damage_class?.name || 'status',
            effect: moveData.effect_entries?.[0]?.short_effect || 'Sin descripción',
            effectChance: moveData.effect_chance || null
          };

          setMoves(prev => {
            if (prev.find(m => m.id === moveData.id)) return prev;
            return [newMove, ...prev];
          })
        } catch (e) {
          setSearchFailed(true)
        } finally {
          setIsSearchingApi(false)
        }
      }
    }

    const timer = setTimeout(() => {
      searchExternalMove()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, filteredMoves.length])

  // Cargar más movimientos
  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset(prev => prev + limit);
    }
  };

  // Formatear nombre
  const formatName = (name) => {
    return name.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Obtener ícono según categoría
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'physical': return '💪';
      case 'special': return '✨';
      case 'status': return '📊';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header con filtros */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            📚 Base de Datos de Movimientos
          </h1>

          {/* Barra de búsqueda */}
          <div className="max-w-2xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Buscar movimiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Filtro por tipo */}
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

            {/* Filtro por categoría */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contador */}
          <p className="text-center text-gray-400 mt-4">
            Mostrando {filteredMoves.length} movimientos
            {searchTerm && ` (filtrados por "${searchTerm}")`}
          </p>
        </div>
      </div>

      {/* Grid de movimientos */}
      <div className="container mx-auto px-4 py-8">
        {loading && offset === 0 ? (
          <div className="text-center py-12">
            <Progress />
            <p className="mt-4 text-gray-400">Cargando movimientos...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMoves.map((move) => (
                <div 
                  key={move.id} 
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  {/* Header del movimiento */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold capitalize text-white">
                      {formatName(move.name)}
                    </h3>
                    <span className="text-sm text-gray-400">
                      #{move.id.toString().padStart(3, '0')}
                    </span>
                  </div>

                  {/* Tipo y categoría */}
                  <div className="flex gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize text-white
                      ${typeColors[move.type] || 'bg-gray-500'}`}>
                      {move.type}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-600 text-xs font-semibold capitalize text-white">
                      {getCategoryIcon(move.category)} {move.category}
                    </span>
                  </div>

                  {/* Estadísticas del movimiento */}
                  <div className="grid grid-cols-3 gap-2 text-center text-sm mb-3">
                    <div>
                      <div className="text-gray-400">Poder</div>
                      <div className="font-bold text-white">{move.power}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Precisión</div>
                      <div className="font-bold text-white">{move.accuracy === '—' ? '—' : `${move.accuracy}%`}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">PP</div>
                      <div className="font-bold text-white">{move.pp}</div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {move.effect}
                    {move.effectChance && ` (${move.effectChance}% de probabilidad)`}
                  </p>
                </div>
              ))}
            </div>

            {filteredMoves.length === 0 && (
              <div className="text-center py-12">
                {isSearchingApi ? (
                  <div className="flex flex-col items-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                    <p className="text-gray-400">Buscando "{searchTerm}" en la PokeAPI...</p>
                  </div>
                ) : searchFailed ? (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">❓</span>
                    <p className="text-xl text-gray-400 mb-2">
                      No se encontró ningún movimiento llamado "{searchTerm}"
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl text-gray-400 mb-2">
                      No se encontraron movimientos
                    </p>
                    <p className="text-gray-500">
                      Intenta con otros filtros o términos de búsqueda
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Botón cargar más */}
            {!searchTerm && selectedType === 'todos' && selectedCategory === 'todos' && hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
                >
                  {loading ? 'Cargando...' : 'Cargar más movimientos'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Movimientos;