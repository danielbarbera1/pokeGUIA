import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la búsqueda
        console.log('Buscando:', searchTerm);
        // Redirigir a la página de búsqueda
        // navigate(`/buscar?q=${searchTerm}`);
    };

    return (
        <div className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Texto izquierda */}
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent whitespace-nowrap">
                        PokéMetric
                    </Link>

                    {/* Barra de búsqueda - Centrada (solo desktop) */}
                    <div className="hidden md:block flex-1 max-w-xl mx-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Buscar Pokémon, movimientos, tipos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-700"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    {/* Navegación Desktop - Derecha */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                        <Link to="/inicio" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap">Inicio</Link>
                        <Link to="/pokedex" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap">Pokédex</Link>
                        <Link to="/batallas" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap">Batallas</Link>
                        <Link to="/tipos" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap">Tipos</Link>
                        <Link to="/generaciones" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap">Generaciones</Link>
                    </nav>

                    {/* Menú Hamburguesa para móvil */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Barra de búsqueda móvil (visible solo en móvil cuando el menú está abierto) */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <form onSubmit={handleSearch} className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Buscar Pokémon..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-700"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>

                        {/* Enlaces móviles */}
                        <nav className="flex flex-col space-y-3">
                            <Link
                                to="/inicio"
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                                onClick={toggleMenu}
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/pokedex"
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                                onClick={toggleMenu}
                            >
                                Pokédex
                            </Link>
                            <Link
                                to="/batallas"
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                                onClick={toggleMenu}
                            >
                                Batallas (Simulador)
                            </Link>
                            <Link
                                to="/tipos"
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                                onClick={toggleMenu}
                            >
                                Tipos/Weakness
                            </Link>
                            <Link
                                to="/generaciones"
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                                onClick={toggleMenu}
                            >
                                Generaciones
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;