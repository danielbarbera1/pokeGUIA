import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import { safeFetch } from '../utils/api'

const Index = () => {
    // Tipos movidos a /tipos
    const [pokemon, setPokemon] = useState([]);
    const [selectedType, setSelectedType] = useState(null); // Tipo seleccionado
    const [loading, setLoading] = useState(false); // Para mostrar carga

    // Tipos movidos a la página /tipos

    /* Función para obtener todos los Pokémon (sin filtro) */
    const fetchAllPokemon = async () => {
        try {
            setLoading(true);
            const resPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1300");
            if (!resPokemon.ok) {
                throw new Error(`Error HTTP: ${resPokemon.status}`);
            }
            const dataPokemon = await resPokemon.json();

            const pokemonsWithId = await Promise.all(
                dataPokemon.results.map(async (poke) => {
                    const urlParts = poke.url.split('/');
                    const id = urlParts[urlParts.length - 2];

                    // Obtener datos adicionales del Pokémon para tener su tipo
                    try {
                        const detail = await safeFetch(poke.url)
                        if (!detail.ok) throw new Error(detail.error || 'Error al cargar datos de Pokémon')
                        const pokemonData = detail.data

                        return {
                            ...poke,
                            id: id,
                            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                            types: pokemonData.types.map(t => t.type.name)
                        };
                    } catch (error) {
                        return {
                            ...poke,
                            id: id,
                            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                            types: []
                        };
                    }
                })
            );

            setPokemon(pokemonsWithId);
            setSelectedType(null); // Limpiar tipo seleccionado
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    /* Función para filtrar Pokémon por tipo */
    const fetchPokemonByType = async (typeUrl) => {
        try {
            setLoading(true);
            const response = await safeFetch(typeUrl)
            if (!response.ok) throw new Error(response.error || 'Error HTTP al obtener tipo')
            const data = response.data

            // La API devuelve los Pokémon en data.pokemon
            const pokemonPromises = data.pokemon.map(async (p) => {
                const pokemonData = p.pokemon;
                const urlParts = pokemonData.url.split('/');
                const id = urlParts[urlParts.length - 2];

                // Obtener imagen del Pokémon
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                // Obtener datos adicionales para los tipos
                try {
                    const detail = await safeFetch(pokemonData.url)
                    if (!detail.ok) throw new Error(detail.error || 'Error al cargar datos del Pokémon')
                    const detailData = detail.data

                    return {
                        ...pokemonData,
                        id: id,
                        imageUrl: imageUrl,
                        types: detailData.types.map(t => t.type.name)
                    };
                } catch (error) {
                    return {
                        ...pokemonData,
                        id: id,
                        imageUrl: imageUrl,
                        types: [data.name] // Usar el tipo principal como fallback
                    };
                }
            });

            const pokemons = await Promise.all(pokemonPromises);
            setPokemon(pokemons);
            setSelectedType(data.name); // Guardar el tipo seleccionado
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    /* Cargar todos los Pokémon al inicio */
    useEffect(() => {
        fetchAllPokemon();
    }, []);

    /* Manejar clic en tipo */
    const handleTypeClick = (tipo) => {
        console.log(`Filtrando por tipo: ${tipo.name}`);
        if (tipo.name === selectedType) {
            // Si ya está seleccionado, mostrar todos
            fetchAllPokemon();
        } else {
            // Filtrar por el tipo seleccionado
            fetchPokemonByType(tipo.url);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="flex flex-col lg:flex-row gap-8">
                    {/* Inicio: Contenido principal sin columna de tipos */}
                    {/* Columna derecha - Contenido principal */}
                <div className="lg:w-2/3 xl:w-3/4">
                    {/* Mostrar estado actual del filtro */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">
                            {selectedType
                                ? `Pokémon de tipo: ${selectedType.toUpperCase()}`
                                : 'Todos los Pokémon'
                            }
                        </h1>
                        <p className="text-gray-400">
                            Mostrando {pokemon.length} Pokémon
                            {selectedType && ` de tipo ${selectedType}`}
                        </p>
                    </div>

                    {/* Indicador de carga */}
                    {loading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="mt-2">Cargando Pokémon...</p>
                        </div>
                    )}

                    {/* Grid de Pokémon */}
                    {!loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pokemon.map((poke) => (
                                <Card
                                    key={`${poke.name}-${poke.id}`}
                                    name={poke.name}
                                    imageUrl={poke.imageUrl}
                                    pokemonId={poke.id}
                                    types={poke.types || []} // Pasar tipos al Card
                                />
                            ))}
                        </div>
                    )}

                    {/* Mensaje si no hay Pokémon */}
                    {!loading && pokemon.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl">No se encontraron Pokémon</p>
                            <button
                                onClick={fetchAllPokemon}
                                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                Volver a ver todos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index
