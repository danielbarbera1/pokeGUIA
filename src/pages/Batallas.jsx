import React, { useState } from 'react';
import Card from '../components/Card';
// Simple image component with basic fallback styling if loading fails
const PokemonImage = ({ src, alt }) => {
  const [err, setErr] = useState(false);
  if (err) {
    return <div className="w-40 h-40 mx-auto mb-2 flex items-center justify-center bg-gray-100 text-gray-500">🟠</div>;
  }
  return (
    <img src={src} alt={alt} className="w-40 h-40 object-contain mx-auto mb-2" onError={() => setErr(true)} />
  );
};
import Button from '../components/Button';
import Progress from '../components/Progress';

const PokemonBattleSimulator = () => {
  // Estado inicial de los Pokémon
  const [pokemon1, setPokemon1] = useState({
    name: 'Pikachu',
    hp: 100,
    maxHp: 100,
    attack: 55,
    defense: 40,
    speed: 90,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    id: 1,
    type: 'Eléctrico'
  });

  const [pokemon2, setPokemon2] = useState({
    name: 'Charmander',
    hp: 100,
    maxHp: 100,
    attack: 52,
    defense: 43,
    speed: 65,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    id: 2,
    type: 'Fuego'
  });

  const [battleLog, setBattleLog] = useState([]);
  const [battleActive, setBattleActive] = useState(false);
  const [winner, setWinner] = useState(null);

  // Movimientos básicos
  const moves = [
    { name: 'Placaje', power: 40, type: 'Normal' },
    { name: 'Ascuas', power: 40, type: 'Fuego' },
    { name: 'Impactrueno', power: 40, type: 'Eléctrico' },
    { name: 'Arañazo', power: 40, type: 'Normal' }
  ];

  // Función para calcular daño
  const calculateDamage = (attacker, defender, move) => {
    const random = Math.random() * (1 - 0.85) + 0.85;
    const damage = Math.floor(((2 * 50 / 5 + 2) * move.power * (attacker.attack / defender.defense)) / 50 + 2) * random;
    return Math.floor(damage);
  };

  // Función para realizar un turno de batalla
  const battleTurn = (attacker, defender, isAttacker1) => {
    if (attacker.hp <= 0 || defender.hp <= 0) return { newDefenderHp: defender.hp, logMessage: '' };

    const move = moves[Math.floor(Math.random() * moves.length)];
    const damage = calculateDamage(attacker, defender, move);
    const newHp = Math.max(0, defender.hp - damage);

    const logMessage = `${attacker.name} usó ${move.name} y causó ${damage} de daño!`;

    return { newDefenderHp: newHp, logMessage };
  };

  // Función para iniciar batalla
  const startBattle = () => {
    setBattleActive(true);
    setWinner(null);
    setBattleLog([]);

    // Resetear HP
    setPokemon1(prev => ({ ...prev, hp: prev.maxHp }));
    setPokemon2(prev => ({ ...prev, hp: prev.maxHp }));
  };

  // Función para ejecutar un ataque
  const executeAttack = () => {
    if (!battleActive || winner) return;

    let newPokemon1Hp = pokemon1.hp;
    let newPokemon2Hp = pokemon2.hp;
    let logs = [];

    // Determinar quién ataca primero basado en velocidad
    if (pokemon1.speed >= pokemon2.speed) {
      // Pokémon 1 ataca primero
      const turn1 = battleTurn(pokemon1, { ...pokemon2, hp: newPokemon2Hp }, true);
      newPokemon2Hp = turn1.newDefenderHp;
      logs.push(turn1.logMessage);

      if (newPokemon2Hp > 0) {
        const turn2 = battleTurn(pokemon2, { ...pokemon1, hp: newPokemon1Hp }, false);
        newPokemon1Hp = turn2.newDefenderHp;
        logs.push(turn2.logMessage);
      }
    } else {
      // Pokémon 2 ataca primero
      const turn1 = battleTurn(pokemon2, { ...pokemon1, hp: newPokemon1Hp }, false);
      newPokemon1Hp = turn1.newDefenderHp;
      logs.push(turn1.logMessage);

      if (newPokemon1Hp > 0) {
        const turn2 = battleTurn(pokemon1, { ...pokemon2, hp: newPokemon2Hp }, true);
        newPokemon2Hp = turn2.newDefenderHp;
        logs.push(turn2.logMessage);
      }
    }

    // Actualizar estados
    setPokemon1(prev => ({ ...prev, hp: newPokemon1Hp }));
    setPokemon2(prev => ({ ...prev, hp: newPokemon2Hp }));
    setBattleLog(prev => [...logs, ...prev].slice(0, 5));

    // Verificar si hay ganador
    if (newPokemon1Hp <= 0) {
      setWinner(pokemon2.name);
      setBattleActive(false);
    } else if (newPokemon2Hp <= 0) {
      setWinner(pokemon1.name);
      setBattleActive(false);
    }
  };

  // Función para reiniciar batalla
  const resetBattle = () => {
    setPokemon1(prev => ({ ...prev, hp: prev.maxHp }));
    setPokemon2(prev => ({ ...prev, hp: prev.maxHp }));
    setBattleLog([]);
    setBattleActive(false);
    setWinner(null);
  };

  return (
    <div className="max mx-auto p-6 bg-gradient-to-b from-blue-100 to-red-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-600">
        ⚔️ Simulador de Batalla Pokémon ⚔️
      </h1>

      {/* Arena de batalla */}
      <div className="grid grid-cols-2 gap-8 mb-8 mx-auto max-w-4xl">
        {/* Pokémon 1 */}
        <Card className="bg-white border-4 border-yellow-400 shadow-lg">
          <div className="p-6">
            <div className="text-center">
              <PokemonImage src={pokemon1.image} alt={pokemon1.name} />
              <h2 className="text-2xl font-bold text-gray-800">{pokemon1.name}</h2>
              <p className="text-sm text-gray-600">Tipo: {pokemon1.type}</p>
              <div className="text-sm text-gray-500 mt-1">ID: {pokemon1.id}</div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>HP</span>
                  <span>{pokemon1.hp}/{pokemon1.maxHp}</span>
                </div>
                <Progress
                  value={(pokemon1.hp / pokemon1.maxHp) * 100}
                  className="h-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>Ataque: {pokemon1.attack}</div>
                <div>Defensa: {pokemon1.defense}</div>
                <div>Velocidad: {pokemon1.speed}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pokémon 2 */}
        <Card className="bg-white border-4 border-red-400 shadow-lg">
          <div className="p-6">
            <div className="text-center">
              <PokemonImage src={pokemon2.image} alt={pokemon2.name} />
              <h2 className="text-2xl font-bold text-gray-800">{pokemon2.name}</h2>
              <p className="text-sm text-gray-600">Tipo: {pokemon2.type}</p>
              <div className="text-sm text-gray-500 mt-1">ID: {pokemon2.id}</div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>HP</span>
                  <span>{pokemon2.hp}/{pokemon2.maxHp}</span>
                </div>
                <Progress
                  value={(pokemon2.hp / pokemon2.maxHp) * 100}
                  className="h-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>Ataque: {pokemon2.attack}</div>
                <div>Defensa: {pokemon2.defense}</div>
                <div>Velocidad: {pokemon2.speed}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* VS Banner */}
      <div className="text-center mb-6">
        <span className="text-2xl font-bold text-red-600 bg-white px-6 py-2 rounded-full shadow-md">
          VS
        </span>
      </div>

      {/* Controles de batalla */}
      <div className="flex justify-center gap-4 mb-8">
        {!battleActive && !winner && (
          <Button
            onClick={startBattle}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            ¡Iniciar Batalla!

          </Button>
        )}

        {battleActive && (
          <Button
            onClick={executeAttack}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg animate-pulse"
          >
            ¡ATACAR!

          </Button>
        )}

        {(winner || !battleActive) && (
          <Button
            onClick={resetBattle}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Reiniciar Batalla
            
          </Button>
        )}
      </div>

      {/* Mensaje de ganador */}
      {winner && (
        <div className="text-center mb-6">
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 inline-block">
            <h2 className="text-2xl font-bold text-yellow-700">
              🏆 ¡{winner} ha ganado la batalla! 🏆
            </h2>
          </div>
        </div>
      )}

      {/* Registro de batalla */}
      <Card className="bg-gray-800 border-2 border-gray-600">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-white">📋 Registro de batalla:</h3>
          <div className="space-y-1">
            {battleLog.length > 0 ? (
              battleLog.map((log, index) => (
                <p key={index} className="text-sm text-gray-200">
                  {log}
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">
                {battleActive ? '¡La batalla ha comenzado!' : 'Esperando para iniciar la batalla...'}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PokemonBattleSimulator;
