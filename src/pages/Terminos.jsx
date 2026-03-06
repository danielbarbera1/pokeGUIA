// pages/Terminos.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Terminos = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                        Términos y Condiciones
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Contenido */}
                <div className="space-y-8">
                    {/* Aceptación de términos */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-yellow-400">📜</span>
                            Aceptación de los términos
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Al acceder y usar PokéMetric, aceptas cumplir con estos términos y condiciones. 
                            Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al sitio.
                        </p>
                    </section>

                    {/* Uso del sitio */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-green-400">🎮</span>
                            Uso del sitio
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <p>PokéMetric es un sitio web informativo y de entretenimiento para fans de Pokémon. Puedes usar el sitio para:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Consultar información de Pokémon (Pokédex)</li>
                                <li>Usar la calculadora de tipos</li>
                                <li>Crear equipos Pokémon</li>
                                <li>Simular batallas</li>
                                <li>Explorar generaciones y movimientos</li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-2">
                                Todo el contenido es solo para uso personal y no comercial.
                            </p>
                        </div>
                    </section>

                    {/* Propiedad intelectual */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-purple-400">©️</span>
                            Propiedad intelectual
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-300">
                                <span className="text-white font-semibold">Pokémon y sus elementos:</span> Todos los nombres, imágenes, personajes y datos relacionados con Pokémon son propiedad de:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                                <li>Nintendo</li>
                                <li>Game Freak</li>
                                <li>The Pokémon Company</li>
                            </ul>
                            
                            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mt-4">
                                <p className="text-red-300 text-sm">
                                    ⚠️ PokéMetric es un proyecto no oficial creado por fans. No reclamamos propiedad 
                                    sobre los derechos de autor de Pokémon. Todo el material con derechos de autor 
                                    se utiliza bajo el principio de Uso Justo (Fair Use).
                                </p>
                            </div>

                            <p className="text-gray-300 mt-4">
                                <span className="text-white font-semibold">Código y diseño:</span> El código fuente, 
                                el diseño y la implementación de PokéMetric son de código abierto y están disponibles 
                                en nuestro repositorio de GitHub.
                            </p>
                        </div>
                    </section>

                    {/* Limitación de responsabilidad */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-orange-400">⚠️</span>
                            Limitación de responsabilidad
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>La información se proporciona "tal cual", sin garantías de exactitud</li>
                            <li>PokéMetric no se hace responsable por errores en los datos de la API</li>
                            <li>No garantizamos disponibilidad continua del sitio</li>
                            <li>Los simuladores son solo para entretenimiento, no para apuestas o decisiones importantes</li>
                            <li>No nos hacemos responsables por daños derivados del uso del sitio</li>
                        </ul>
                    </section>

                    {/* Enlaces a terceros */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-blue-400">🔗</span>
                            Enlaces a terceros
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            PokéMetric contiene enlaces a sitios externos como PokeAPI, WikiDex y Discord. 
                            No tenemos control sobre el contenido de estos sitios y no somos responsables de ellos.
                        </p>
                    </section>

                    {/* Conducta del usuario */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-pink-400">👥</span>
                            Conducta del usuario
                        </h2>
                        <p className="text-gray-300">Al usar PokéMetric, te comprometes a:</p>
                        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-gray-300">
                            <li>No intentar dañar o interferir con el sitio</li>
                            <li>No usar el sitio para actividades ilegales</li>
                            <li>No realizar scraping excesivo que afecte el rendimiento</li>
                            <li>Respetar los derechos de propiedad intelectual</li>
                            <li>No suplantar identidades</li>
                        </ul>
                    </section>

                    {/* Modificaciones */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-indigo-400">🔄</span>
                            Modificaciones
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                            Los cambios serán efectivos inmediatamente después de su publicación en esta página. 
                            El uso continuado del sitio después de los cambios constituye tu aceptación.
                        </p>
                    </section>

                    {/* Ley aplicable */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-teal-400">⚖️</span>
                            Ley aplicable
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Estos términos se rigen por las leyes del país donde el desarrollador reside, 
                            sin perjuicio de los principios de derecho internacional. Cualquier disputa 
                            relacionada con el sitio será resuelta en los tribunales competentes.
                        </p>
                    </section>

                    {/* Contacto */}
                    <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-cyan-400">📧</span>
                            Contacto
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Para preguntas sobre estos términos, puedes contactarnos a través de:
                        </p>
                        <div className="mt-4 flex flex-wrap gap-4">
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
                    <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-800 rounded-2xl p-6 text-center">
                        <p className="text-yellow-300 text-lg">
                            🎯 En resumen: Sé respetuoso, disfruta el contenido, recuerda que Pokémon no es nuestro, 
                            y úsalo con responsabilidad. 🎯
                        </p>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-wrap justify-center gap-4 mt-12">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
                    >
                        <span>←</span>
                        <span>Volver al inicio</span>
                    </Link>
                    <Link 
                        to="/privacidad" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        <span>🔒</span>
                        <span>Ver Política de Privacidad</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Terminos;