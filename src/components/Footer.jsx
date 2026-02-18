const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black pt-12 pb-6 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    
                    {/* Herramientas Section */}
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                            <span className="bg-red-500 w-2 h-5 rounded"></span>
                            Herramientas
                        </h6>
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-400 hover:text-red-400 transition-colors duration-300 hover:translate-x-1">Calculadora de Tipos</a>
                            <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1">Creador de Equipos</a>
                            <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1">Pokédex Pro</a>
                            <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1">Base de Datos de Movimientos</a>
                        </div>
                    </div>
                    
                    {/* Comunidad Section */}
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                            <span className="bg-blue-500 w-2 h-5 rounded"></span>
                            Comunidad
                        </h6>
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-400 hover:text-blue-300 transition-colors duration-300 hover:translate-x-1">Servidor de Discord</a>
                            <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1">Compartir Equipos</a>
                            <a href="#" className="block text-gray-400 hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1">Torneos</a>
                            <a href="#" className="block text-gray-400 hover:text-green-300 transition-colors duration-300 hover:translate-x-1">Guías</a>
                        </div>
                    </div>
                    
                    {/* Recursos Section */}
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                            <span className="bg-yellow-500 w-2 h-5 rounded"></span>
                            Recursos
                        </h6>
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1">Documentación de API</a>
                            <a href="#" className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:translate-x-1">Tablas de Tipos</a>
                            <a href="#" className="block text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1">Guía de Generaciones</a>
                            <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors duration-300 hover:translate-x-1">Centro de Estrategias</a>
                        </div>
                    </div>
                    
                </div>
                
                {/* Separador */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="px-4 bg-gray-900">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Sección Inferior */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    {/* Marca y Copyright */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full"></div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                                PokéMetric
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} PokéMetric. Hecho con ❤️ para fans de Pokémon.
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                            No afiliado con Nintendo, Game Freak o The Pokémon Company.
                        </p>
                    </div>
                    
                    {/* Enlaces Sociales - estilo Poké Ball */}
                    <div className="flex gap-3">
                        {[
                            { name: 'Discord', color: 'bg-indigo-500 hover:bg-indigo-600', icon: 'D' },
                            { name: 'GitHub', color: 'bg-gray-700 hover:bg-gray-600', icon: 'G' },
                            { name: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600', icon: 'T' },
                            { name: 'Reddit', color: 'bg-orange-500 hover:bg-orange-600', icon: 'R' }
                        ].map((social) => (
                            <a 
                                key={social.name}
                                href="#" 
                                className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 transform hover:scale-110 hover:rotate-12 group relative`}
                                title={social.name}
                            >
                                <span>{social.icon}</span>
                                <div className="absolute inset-0 border-2 border-white/20 rounded-full group-hover:border-white/40 transition-colors"></div>
                            </a>
                        ))}
                    </div>
                    
                </div>
                
                {/* Aviso al estilo Pokémon */}
                <div className="mt-6 pt-4 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-xs">
                        Pokémon y los nombres de personajes de Pokémon son marcas registradas de Nintendo.
                        Todos los datos obtenidos de <a href="https://pokeapi.co" className="text-blue-400 hover:text-blue-300 underline">PokeAPI.co</a>.
                    </p>
                    <div className="flex justify-center gap-4 mt-3 text-gray-600 text-sm">
                        <a href="#" className="hover:text-gray-400 transition-colors">Uso Justo</a>
                        <span>•</span>
                        <a href="#" className="hover:text-gray-400 transition-colors">Privacidad</a>
                        <span>•</span>
                        <a href="#" className="hover:text-gray-400 transition-colors">Términos</a>
                        <span>•</span>
                        <a href="#" className="hover:text-gray-400 transition-colors">Contacto</a>
                    </div>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;