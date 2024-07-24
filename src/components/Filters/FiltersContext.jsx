// src/context/FiltersContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFilters = () => {
    return useContext(FiltersContext);
};

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        minPrice: 0,
        maxPrice: 1000,
        categoryId: null,
    });

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};
