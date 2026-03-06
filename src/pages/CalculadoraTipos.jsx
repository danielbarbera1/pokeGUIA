import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from'../components/Button'

const CalculadoraTipos = () => {
  const [types, setTypes] = useState([]);
  const [attackingType, setAttackingType] = useState(null);
  const [defendingTypes, setDefendingTypes] = useState([]);
  const [effectiveness, setEffectiveness] = useState({
    multiplier: 1,
    text: 'Normal',
    color: 'gray'
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

  // Relaciones de tipos (ventajas/desventajas)
  const typeRelations = {
    normal: { weakTo: ['fighting'], resists: [], immuneTo: ['ghost'], strongAgainst: [], weakAgainst: ['rock', 'steel'], immuneAgainst: ['ghost'] },
    fire: { weakTo: ['water', 'ground', 'rock'], resists: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], strongAgainst: ['grass', 'ice', 'bug', 'steel'], weakAgainst: ['water', 'ground', 'rock'] },
    water: { weakTo: ['electric', 'grass'], resists: ['fire', 'water', 'ice', 'steel'], strongAgainst: ['fire', 'ground', 'rock'], weakAgainst: ['electric', 'grass'] },
    electric: { weakTo: ['ground'], resists: ['electric', 'flying', 'steel'], strongAgainst: ['water', 'flying'], weakAgainst: ['grass', 'electric', 'dragon'] },
    grass: { weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'], resists: ['water', 'electric', 'grass', 'ground'], strongAgainst: ['water', 'ground', 'rock'], weakAgainst: ['fire', 'ice', 'poison', 'flying', 'bug'] },
    ice: { weakTo: ['fire', 'fighting', 'rock', 'steel'], resists: ['ice'], strongAgainst: ['grass', 'ground', 'flying', 'dragon'], weakAgainst: ['fire', 'fighting', 'rock', 'steel'] },
    fighting: { weakTo: ['flying', 'psychic', 'fairy'], resists: ['bug', 'rock', 'dark'], strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'], weakAgainst: ['poison', 'flying', 'psychic', 'bug', 'fairy'] },
    poison: { weakTo: ['ground', 'psychic'], resists: ['grass', 'fighting', 'poison', 'bug', 'fairy'], strongAgainst: ['grass', 'fairy'], weakAgainst: ['poison', 'ground', 'rock', 'ghost'] },
    ground: { weakTo: ['water', 'grass', 'ice'], resists: ['poison', 'rock'], immuneTo: ['electric'], strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'], weakAgainst: ['grass', 'bug'] },
    flying: { weakTo: ['electric', 'ice', 'rock'], resists: ['grass', 'fighting', 'bug'], immuneTo: ['ground'], strongAgainst: ['grass', 'fighting', 'bug'], weakAgainst: ['electric', 'rock', 'steel'] },
    psychic: { weakTo: ['bug', 'ghost', 'dark'], resists: ['fighting', 'psychic'], strongAgainst: ['fighting', 'poison'], weakAgainst: ['psychic', 'steel'] },
    bug: { weakTo: ['fire', 'flying', 'rock'], resists: ['grass', 'fighting', 'ground'], strongAgainst: ['grass', 'psychic', 'dark'], weakAgainst: ['fire', 'flying', 'rock'] },
    rock: { weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'], resists: ['normal', 'fire', 'poison', 'flying'], strongAgainst: ['fire', 'ice', 'flying', 'bug'], weakAgainst: ['fighting', 'ground', 'steel'] },
    ghost: { weakTo: ['ghost', 'dark'], resists: ['poison', 'bug'], immuneTo: ['normal', 'fighting'], strongAgainst: ['psychic', 'ghost'], weakAgainst: ['dark'] },
    dragon: { weakTo: ['ice', 'dragon', 'fairy'], resists: ['fire', 'water', 'electric', 'grass'], strongAgainst: ['dragon'], weakAgainst: ['steel'] },
    dark: { weakTo: ['fighting', 'bug', 'fairy'], resists: ['ghost', 'dark'], immuneTo: ['psychic'], strongAgainst: ['psychic', 'ghost'], weakAgainst: ['fighting', 'dark', 'fairy'] },
    steel: { weakTo: ['fire', 'fighting', 'ground'], resists: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immuneTo: ['poison'], strongAgainst: ['ice', 'rock', 'fairy'], weakAgainst: ['fire', 'water', 'electric'] },
    fairy: { weakTo: ['poison', 'steel'], resists: ['fighting', 'bug', 'dark'], immuneTo: ['dragon'], strongAgainst: ['fighting', 'dragon', 'dark'], weakAgainst: ['fire', 'poison', 'steel'] }
  };

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
        console.error(error);
      }
    };
    fetchTypes();
  }, []);

  // Calcular efectividad
  const calculateEffectiveness = (attacker, defenders) => {
    if (!attacker || defenders.length === 0) return { multiplier: 1, text: 'Normal', color: 'gray' };

    let multiplier = 1;
    const relations = typeRelations[attacker.name];

    defenders.forEach(defender => {
      // Debilidades (super efectivo)
      if (relations.strongAgainst.includes(defender.name)) {
        multiplier *= 2;
      }
      // Resistencias (no muy efectivo)
      if (relations.weakAgainst.includes(defender.name)) {
        multiplier *= 0.5;
      }
      // Inmunidades
      if (relations.immuneAgainst?.includes(defender.name)) {
        multiplier *= 0;
      }
    });

    // Determinar texto y color según multiplicador
    if (multiplier === 0) {
      return { multiplier, text: 'Inmune', color: 'gray' };
    } else if (multiplier === 0.25) {
      return { multiplier, text: 'Muy poco efectivo', color: 'red' };
    } else if (multiplier === 0.5) {
      return { multiplier, text: 'Poco efectivo', color: 'orange' };
    } else if (multiplier === 1) {
      return { multiplier, text: 'Normal', color: 'gray' };
    } else if (multiplier === 2) {
      return { multiplier, text: 'Super efectivo', color: 'green' };
    } else if (multiplier === 4) {
      return { multiplier, text: '¡Super efectivo!', color: 'green' };
    }
  };

  // Manejar selección de tipo atacante
  const handleAttackingType = (type) => {
    setAttackingType(type);
    if (defendingTypes.length > 0) {
      setEffectiveness(calculateEffectiveness(type, defendingTypes));
    }
  };

  // Manejar selección de tipos defensores
  const handleDefendingType = (type) => {
    let newDefendingTypes;
    if (defendingTypes.includes(type)) {
      newDefendingTypes = defendingTypes.filter(t => t.name !== type.name);
    } else if (defendingTypes.length < 2) {
      newDefendingTypes = [...defendingTypes, type];
    } else {
      newDefendingTypes = [type];
    }
    setDefendingTypes(newDefendingTypes);
    
    if (attackingType) {
      setEffectiveness(calculateEffectiveness(attackingType, newDefendingTypes));
    }
  };

  // Formatear nombre
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          ⚔️ Calculadora de Tipos Pokémon
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Selecciona el tipo atacante y los tipos defensores para calcular la efectividad
        </p>

        {/* Selector de tipo atacante */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
            Tipo Atacante:
          </h2>
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type.name}
                onClick={() => handleAttackingType(type)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all transform hover:scale-105
                  ${attackingType?.name === type.name 
                    ? 'ring-2 ring-white scale-105' 
                    : 'opacity-70 hover:opacity-100'
                  }
                  ${typeColors[type.name] || 'bg-gray-500'} text-white`}
              >
                {formatName(type.name)}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de tipos defensores */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Tipos Defensores (máximo 2):
          </h2>
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type.name}
                onClick={() => handleDefendingType(type)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all
                  ${defendingTypes.some(t => t.name === type.name)
                    ? 'ring-2 ring-white scale-105' 
                    : 'opacity-70 hover:opacity-100'
                  }
                  ${typeColors[type.name] || 'bg-gray-500'} text-white`}
              >
                {formatName(type.name)}
              </button>
            ))}
          </div>
        </div>

        {/* Resultado de efectividad */}
        {(attackingType || defendingTypes.length > 0) && (
          <Card className="bg-gray-800 border-2 border-gray-700 mb-8">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Resultado:</h2>
              
              <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                {attackingType && (
                  <div className="flex flex-col items-center">
                    <span className={`px-6 py-3 rounded-lg font-bold text-lg capitalize
                      ${typeColors[attackingType.name] || 'bg-gray-500'} text-white`}>
                      {formatName(attackingType.name)}
                    </span>
                  </div>
                )}
                
                <span className="text-2xl font-bold">⚔️</span>
                
                {defendingTypes.length > 0 ? (
                  <div className="flex gap-2">
                    {defendingTypes.map(type => (
                      <span
                        key={type.name}
                        className={`px-6 py-3 rounded-lg font-bold text-lg capitalize
                          ${typeColors[type.name] || 'bg-gray-500'} text-white`}
                      >
                        {formatName(type.name)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">Selecciona tipo(s) defensor(es)</span>
                )}
              </div>

              {attackingType && defendingTypes.length > 0 && (
                <div className="mt-4">
                  <div className={`text-4xl font-bold mb-2
                    ${effectiveness.color === 'green' ? 'text-green-400' : ''}
                    ${effectiveness.color === 'orange' ? 'text-orange-400' : ''}
                    ${effectiveness.color === 'red' ? 'text-red-400' : ''}
                    ${effectiveness.color === 'gray' ? 'text-gray-400' : ''}
                  `}>
                    {effectiveness.text}
                  </div>
                  <div className="text-2xl text-gray-300">
                    x{effectiveness.multiplier}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Tabla de referencia rápida */}
        <Card className="bg-gray-800 border-2 border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              📊 Referencia Rápida
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-green-900/30 p-3 rounded-lg">
                <span className="text-green-400 font-bold">x2 / x4</span>
                <p className="text-sm text-gray-400">Super efectivo</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <span className="text-gray-300 font-bold">x1</span>
                <p className="text-sm text-gray-400">Normal</p>
              </div>
              <div className="bg-orange-900/30 p-3 rounded-lg">
                <span className="text-orange-400 font-bold">x0.5 / x0.25</span>
                <p className="text-sm text-gray-400">Poco efectivo</p>
              </div>
              <div className="bg-gray-600 p-3 rounded-lg md:col-span-3">
                <span className="text-gray-300 font-bold">x0</span>
                <p className="text-sm text-gray-400">Inmune</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              * Los multiplicadores se combinan cuando hay dos tipos (ej: 2x2=4, 2x0.5=1)
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CalculadoraTipos;