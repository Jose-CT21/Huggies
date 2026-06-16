import { useState, useMemo } from 'react';
import { huggiesCatalog, productSizes, sizelessTypes } from '../data/huggiesCatalog';

export const useProductFilters = (childData) => {
    const [filters, setFilters] = useState({
        type: 'Todos',
        size: 'Todos',
        search: ''
    });

    const activeFilterCount = [
        filters.type !== 'Todos',
        filters.size !== 'Todos',
        filters.search !== ''
    ].filter(Boolean).length;

    // Determine if the current type selection supports sizes
    const currentTypeHasSizes = filters.type === 'Todos' || !sizelessTypes.includes(filters.type);

    // Calculate available sizes based on selected type
    const availableSizes = useMemo(() => {
        if (!currentTypeHasSizes) return [];

        if (filters.type === 'Todos') return productSizes;

        // Get unique sizes for the selected type
        const sizesForType = [...new Set(
            huggiesCatalog
                .filter(p => p.type === filters.type && p.size !== null)
                .map(p => p.size)
        )];

        // Maintain canonical order from productSizes
        return productSizes.filter(s => sizesForType.includes(s));
    }, [filters.type, currentTypeHasSizes]);

    // Filter products based on current filters
    const products = useMemo(() => {
        let result = huggiesCatalog;

        if (filters.type !== 'Todos') {
            result = result.filter(p => p.type === filters.type);
        }

        if (filters.size !== 'Todos') {
            // When a size is selected, show products matching that size
            // PLUS sizeless products (toallitas, cuidado) when viewing "Todos"
            result = result.filter(p =>
                p.size === filters.size || (filters.type === 'Todos' && p.size === null)
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.type.toLowerCase().includes(searchTerm)
            );
        }

        return result;
    }, [filters]);

    // Calculate recommended products based on childData
    const recommendedProducts = useMemo(() => {
        if (!childData || childData.skipped) return [];
        const { diaperSize, skinType, ageInMonths } = childData;
        return huggiesCatalog.filter(product => {
            if (skinType === 'sensitive' || skinType === 'atopic') {
                return (
                    (product.size === diaperSize && product.name.includes('Supreme')) ||
                    (product.type === 'Toallitas' && product.name.includes('Supreme'))
                );
            }
            if (ageInMonths && ageInMonths >= 12 && product.type === 'Pants') {
                return true;
            }
            return product.size === diaperSize || (product.type === 'Toallitas' && product.size === null);
        }).slice(0, 4);
    }, [childData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => {
            const nextFilters = { ...prev, [name]: value };

            // Determine if the next type selection supports sizes
            const nextTypeHasSizes = nextFilters.type === 'Todos' || !sizelessTypes.includes(nextFilters.type);
            if (!nextTypeHasSizes && nextFilters.size !== 'Todos') {
                nextFilters.size = 'Todos';
            }

            return nextFilters;
        });
    };

    return {
        filters,
        setFilters,
        activeFilterCount,
        currentTypeHasSizes,
        availableSizes,
        products,
        recommendedProducts,
        handleFilterChange
    };
};
