import React, { useState } from 'react';

const barradebusqueda = ({ 
    onSearch, 
    placeholder = "Buscar Pokémon..."
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Búsqueda en tiempo real
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                {/* Icono de búsqueda */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>
                
                {/* Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                
                {/* Botón para limpiar */}
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default barradebusqueda;