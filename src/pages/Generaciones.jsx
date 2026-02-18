import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const Generaciones = () => {
    const [generations, setGenerations] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [selectedGeneration, setSelectedGeneration] = useState(null);
    const [loading, setLoading] = useState(false);
    const [generationDetails, setGenerationDetails] = useState(null);

    /* Obtener lista de generaciones */
    useEffect(() => {
        const fetchGenerations = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/generation/");
                if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
                const data = await res.json();
                console.log("Generaciones:", data);

                // Ordenar generaciones por ID (la API ya viene ordenada, pero por si acaso)
                const sortedGenerations = data.results.sort((a, b) => {
                    const idA = parseInt(a.url.split('/').filter(Boolean).pop());
                    const idB = parseInt(b.url.split('/').filter(Boolean).pop());
                    return idA - idB;
                });

                setGenerations(sortedGenerations || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGenerations();
    }, []);

    /* Función para obtener todos los Pokémon (sin filtro) - Opcional */
    const fetchAllPokemon = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=100");
            if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
            const data = await res.json();

            const pokemonsWithId = data.results.map(poke => {
                const urlParts = poke.url.split('/');
                const id = urlParts[urlParts.length - 2];

                return {
                    ...poke,
                    id: id,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                };
            });

            setPokemon(pokemonsWithId);
            setSelectedGeneration(null);
            setGenerationDetails(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    /* Función para obtener Pokémon de una generación específica */
    const fetchPokemonByGeneration = async (generationUrl) => {
        try {
            setLoading(true);
            const response = await fetch(generationUrl);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json();

            console.log("Datos de generación:", data);

            // Guardar detalles de la generación
            setGenerationDetails({
                id: data.id,
                name: data.name,
                main_region: data.main_region?.name || "Desconocida",
                moves: data.moves?.length || 0,
                types: data.types?.length || 0,
                version_groups: data.version_groups?.length || 0
            });

            // Procesar los Pokémon de esta generación
            const pokemonPromises = data.pokemon_species.map(async (species) => {
                // Obtener el ID del Pokémon
                const urlParts = species.url.split('/');
                const speciesId = urlParts[urlParts.length - 2];

                // Obtener datos completos del Pokémon para la imagen
                try {
                    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesId}/`);
                    const pokemonData = await pokemonRes.json();

                    return {
                        name: species.name,
                        id: speciesId,
                        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`,
                        types: pokemonData.types?.map(t => t.type.name) || []
                    };
                } catch (error) {
                    // Fallback si no se pueden obtener datos completos
                    return {
                        name: species.name,
                        id: speciesId,
                        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`,
                        types: []
                    };
                }
            });

            const pokemons = await Promise.all(pokemonPromises);

            // Ordenar Pokémon por ID
            const sortedPokemons = pokemons.sort((a, b) => parseInt(a.id) - parseInt(b.id));

            setPokemon(sortedPokemons);

            // Extraer el nombre de la generación de la URL
            const genName = data.name || generationUrl.split('/').filter(Boolean).pop();
            setSelectedGeneration(genName);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    /* Cargar la primera generación al inicio */
    useEffect(() => {
        if (generations.length > 0) {
            fetchPokemonByGeneration(generations[0].url);
        }
    }, [generations]);

    /* Manejar clic en generación */
    const handleGenerationClick = (generation) => {
        console.log(`Seleccionando generación: ${generation.name}`);
        if (generation.name === selectedGeneration) {
            // Si ya está seleccionada, mostrar todos (opcional)
            fetchAllPokemon();
        } else {
            // Cargar Pokémon de esta generación
            fetchPokemonByGeneration(generation.url);
        }
    };

    /* Formatear nombres de generación */
    const formatGenerationName = (name) => {
        if (!name) return '';

        // Ejemplo: "generation-i" -> "Generation I"
        const parts = name.split('-');
        if (parts.length === 2) {
            const number = parts[1].toUpperCase();
            return `Generation ${number}`;
        }

        // Capitalizar primera letra
        return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
    };

    /* Formatear región */
    const formatRegionName = (region) => {
        if (!region) return '';

        const regionMap = {
            'kanto': 'Kanto',
            'johto': 'Johto',
            'hoenn': 'Hoenn',
            'sinnoh': 'Sinnoh',
            'unova': 'Unova',
            'kalos': 'Kalos',
            'alola': 'Alola',
            'galar': 'Galar',
            'hisui': 'Hisui',
            'paldea': 'Paldea'
        };

        return regionMap[region] || region.charAt(0).toUpperCase() + region.slice(1);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Columna izquierda - Lista de Generaciones */}
                <div className="lg:w-1/3 xl:w-1/4">
                    <div className="bg-gray-800 rounded-3xl border border-gray-700 p-8">
                        <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-700 text-center">
                            Generaciones Pokémon
                        </h2>

                        {/* Botón para mostrar todos los Pokémon (opcional) */}
                        <div className="mb-4">
                            <button
                                onClick={fetchAllPokemon}
                                className={`w-full py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer capitalize text-center ${!selectedGeneration
                                    ? 'bg-purple-600 hover:bg-purple-700'
                                    : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                            >
                                Ver Todos los Pokémon
                            </button>
                        </div>

                        <div className='grid grid-cols-1 gap-3 place-items-center '>
                            {generations.map((gen) => {
                                // Extraer número de generación
                                const genNumber = gen.url.split('/').filter(Boolean).pop();

                                return (
                                    <div
                                        key={gen.name}
                                        onClick={() => handleGenerationClick(gen)}
                                    >
                                        <Button 
                                            id={gen.name}
                                            name={formatGenerationName(gen.name)}
                                            isSelected={selectedGeneration === gen.name}
                                            onClick={() => handleGenerationClick(gen)}
                                            // Puedes personalizar el color por generación
                                            customColor={`bg-gradient-to-r from-purple-${parseInt(genNumber) * 100 + 500} to-pink-${parseInt(genNumber) * 100 + 500}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Información de la generación seleccionada */}
                        {generationDetails && (
                            <div className="mt-8 pt-6 border-t border-gray-700">
                                <h3 className="text-lg font-bold mb-3 text-center">
                                    {formatGenerationName(generationDetails.name)}
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Región:</span>
                                        <span className="font-medium">{formatRegionName(generationDetails.main_region)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Pokémon:</span>
                                        <span className="font-medium">{pokemon.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Movimientos:</span>
                                        <span className="font-medium">{generationDetails.moves}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Tipos:</span>
                                        <span className="font-medium">{generationDetails.types}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna derecha - Pokémon de la generación */}
                <div className="lg:w-2/3 xl:w-3/4">
                    {/* Encabezado con información */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">
                            {selectedGeneration
                                ? `${formatGenerationName(selectedGeneration)} Pokémon`
                                : 'Todos los Pokémon'
                            }
                        </h1>

                        {generationDetails && (
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                                <span className="px-4 py-2 bg-purple-600 rounded-full text-sm font-medium">
                                    Región: {formatRegionName(generationDetails.main_region)}
                                </span>
                                <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium">
                                    {generationDetails.moves} Movimientos
                                </span>
                                <span className="px-4 py-2 bg-green-600 rounded-full text-sm font-medium">
                                    {generationDetails.types} Tipos
                                </span>
                            </div>
                        )}

                        <p className="text-gray-400">
                            Mostrando {pokemon.length} Pokémon
                            {selectedGeneration && ` de ${formatGenerationName(selectedGeneration)}`}
                        </p>
                    </div>

                    {/* Indicador de carga */}
                    {loading && (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            <p className="mt-4 text-lg">Cargando Pokémon...</p>
                            <p className="text-gray-400 text-sm mt-2">
                                {selectedGeneration ? `Obteniendo Pokémon de ${formatGenerationName(selectedGeneration)}` : 'Obteniendo todos los Pokémon'}
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

                    {/* Mensaje si no hay Pokémon */}
                    {!loading && pokemon.length === 0 && (
                        <div className="text-center py-12">
                            <div className="inline-block p-6 bg-gray-800 rounded-2xl">
                                <p className="text-xl mb-4">No se encontraron Pokémon</p>
                                <button
                                    onClick={() => generations.length > 0 && fetchPokemonByGeneration(generations[0].url)}
                                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                >
                                    Ver Primera Generación
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Generaciones;