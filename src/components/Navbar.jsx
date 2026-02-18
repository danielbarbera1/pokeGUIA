import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="w-full bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">

                    {/* Logo/Texto izquierda */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                            PokéMetric
                        </Link>

                        {/* Navegación Desktop */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link to="/inicio" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Inicio</Link>
                            <Link to="/pokedex" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Pokédex</Link>
                            <Link to="/batallas" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Batallas (Simulador)</Link>
                            <Link to="/tipos" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Tipos/Weakness</Link>
                            <Link to="/generaciones" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Generaciones</Link>
                        </nav>
                    </div>

                    {/* Elementos derecha */}
                    <div className="flex items-center space-x-4">

                        {/* Botón de búsqueda */}
                        <input placeholder="Buscar..." className="bg-gray-100 rounded px-3 py-1 outline-none" />
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
