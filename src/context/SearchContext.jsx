// src/context/SearchContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const SearchContext = createContext();

// Hook personalizado para usar el contexto
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch debe usarse dentro de SearchProvider');
    }
    return context;
};

// Proveedor del contexto
export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchCategory, setSearchCategory] = useState('pokemon'); // pokemon, tipos, movimientos

    // Limpiar búsqueda
    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setIsSearching(false);
    };

    // Valor que se proveerá a los componentes
    const value = {
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        isSearching,
        setIsSearching,
        searchCategory,
        setSearchCategory,
        clearSearch
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};