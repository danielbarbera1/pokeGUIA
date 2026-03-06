import { Link } from 'react-router-dom';

const Privacidad = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Política de Privacidad
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Contenido */}
                <div className="space-y-8">
                    {/* Introducción */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-blue-400">🔒</span>
                            Introducción
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            En PokéMetric, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
                            Esta política de privacidad explica cómo manejamos tu información cuando visitas nuestro sitio web.
                        </p>
                    </section>

                    {/* Información que recopilamos */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-yellow-400">📋</span>
                            Información que recopilamos
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <p>PokéMetric está diseñado como un sitio web estático e informativo. No recopilamos información personal a través de formularios o registro de usuarios.</p>
                            
                            <h3 className="text-xl font-semibold text-white mt-4">Información automática:</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Datos de navegación básicos (como cualquier sitio web)</li>
                                <li>Dirección IP anonimizada</li>
                                <li>Tipo de navegador y dispositivo</li>
                                <li>Páginas visitadas y tiempo de navegación</li>
                            </ul>
                            
                            <p className="text-sm text-gray-400 mt-2">
                                Esta información se recopila de forma agregada y no permite identificarte personalmente.
                            </p>
                        </div>
                    </section>

                    {/* Uso de la información */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-green-400">🎯</span>
                            Uso de la información
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            La información que recopilamos se utiliza únicamente para:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-gray-300">
                            <li>Mejorar la experiencia del usuario en el sitio</li>
                            <li>Optimizar el rendimiento y la velocidad del sitio</li>
                            <li>Analizar tendencias de uso para mejorar el contenido</li>
                            <li>Identificar y solucionar problemas técnicos</li>
                        </ul>
                    </section>

                    {/* Cookies */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-orange-400">🍪</span>
                            Cookies
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            PokéMetric utiliza cookies esenciales para el funcionamiento básico del sitio. 
                            No utilizamos cookies de rastreo publicitario ni compartimos datos con terceros.
                        </p>
                        <div className="mt-4 bg-gray-700/30 rounded-lg p-4">
                            <h3 className="font-semibold text-white mb-2">Tipos de cookies que utilizamos:</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                                <li>Cookies técnicas: necesarias para la navegación</li>
                                <li>Cookies de preferencias: recuerdan tus ajustes</li>
                                <li>No usamos cookies de publicidad o marketing</li>
                            </ul>
                        </div>
                    </section>

                    {/* Enlaces a terceros */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-purple-400">🔗</span>
                            Enlaces a terceros
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Nuestro sitio contiene enlaces a sitios externos como:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-gray-300">
                            <li>
                                <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                    PokeAPI
                                </a> - Para datos de Pokémon
                            </li>
                            <li>
                                <a href="https://www.wikidex.net" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                    WikiDex
                                </a> - Enciclopedia Pokémon
                            </li>
                            <li>
                                <a href="https://discord.gg/pokemon" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                    Discord
                                </a> - Comunidad Pokémon
                            </li>
                        </ul>
                        <p className="text-sm text-gray-400 mt-4">
                            No nos hacemos responsables de las políticas de privacidad de estos sitios externos. 
                            Te recomendamos leer sus políticas al visitarlos.
                        </p>
                    </section>

                    {/* Seguridad */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-red-400">🛡️</span>
                            Seguridad
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Implementamos medidas de seguridad básicas para proteger el sitio. Sin embargo, 
                            recuerda que ninguna transmisión por internet es 100% segura. Como sitio estático 
                            sin backend ni base de datos propia, el riesgo de exposición de datos es mínimo.
                        </p>
                    </section>

                    {/* Cambios en la política */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-indigo-400">📝</span>
                            Cambios en esta política
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
                            cualquier cambio publicando la nueva versión en esta página. Te recomendamos 
                            revisarla periódicamente.
                        </p>
                    </section>

                    {/* Contacto */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-pink-400">📧</span>
                            Contacto
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de:
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                            <a 
                                href="https://github.com/danielbarbera1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                <span>🐙</span>
                                <span>GitHub</span>
                            </a>
                            <a 
                                href="https://www.instagram.com/danxvlogs/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-colors"
                            >
                                <span>📸</span>
                                <span>Instagram</span>
                            </a>
                        </div>
                    </section>

                    {/* Resumen simple */}
                    <div className="bg-blue-900/20 border border-blue-800 rounded-2xl p-6 text-center">
                        <p className="text-blue-300 text-lg">
                            ⚡ En resumen: No vendemos tus datos, no te rastreamos con publicidad, 
                            solo queremos que disfrutes aprendiendo sobre Pokémon. ⚡
                        </p>
                    </div>
                </div>

                {/* Botón volver */}
                <div className="text-center mt-12">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
                    >
                        <span>←</span>
                        <span>Volver al inicio</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Privacidad;