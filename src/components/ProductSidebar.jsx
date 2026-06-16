import React from 'react';
import Button from './ui/Button';
import { productTypes } from '../data/huggiesCatalog';

const ProductSidebar = ({
    isFilterOpen,
    setIsFilterOpen,
    filters,
    setFilters,
    handleFilterChange,
    currentTypeHasSizes,
    availableSizes
}) => {
    return (
        <>
            {/* Filter Drawer Overlay */}
            <div
                className={`filter-overlay ${isFilterOpen ? 'open' : ''}`}
                onClick={() => setIsFilterOpen(false)}
                aria-hidden="true"
            />

            {/* Slide-in Filter Drawer */}
            <aside className={`products-sidebar ${isFilterOpen ? 'open' : ''}`} id="filter-drawer">
                <div className="filter-drawer-header">
                    <span className="filter-drawer-title">Filtros</span>
                    <button
                        className="filter-drawer-close"
                        id="filter-drawer-close-btn"
                        onClick={() => setIsFilterOpen(false)}
                        aria-label="Cerrar filtros"
                    >
                        ✕
                    </button>
                </div>

                <div className="filter-section">
                    <h3>Búsqueda</h3>
                    <input
                        type="text"
                        name="search"
                        placeholder="Buscar productos..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="search-input"
                        id="filter-search"
                    />
                </div>

                <div className="filter-section">
                    <h3>Tipo de Producto</h3>
                    <div className="filter-options">
                        <label className="filter-radio">
                            <input
                                type="radio"
                                name="type"
                                value="Todos"
                                checked={filters.type === 'Todos'}
                                onChange={handleFilterChange}
                            />
                            <span>Todos</span>
                        </label>
                        {productTypes.map(type => (
                            <label key={`type-${type}`} className="filter-radio">
                                <input
                                    type="radio"
                                    name="type"
                                    value={type}
                                    checked={filters.type === type}
                                    onChange={handleFilterChange}
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Size filter — hidden for sizeless product types */}
                {currentTypeHasSizes && availableSizes.length > 0 && (
                    <div className="filter-section filter-section-animated">
                        <h3>Talla</h3>
                        <div className="filter-options size-grid">
                            <button
                                className={`size-btn ${filters.size === 'Todos' ? 'active' : ''}`}
                                name="size"
                                value="Todos"
                                onClick={handleFilterChange}
                            >
                                Todas
                            </button>
                            {availableSizes.map(size => (
                                <button
                                    key={`size-${size}`}
                                    className={`size-btn ${filters.size === size ? 'active' : ''}`}
                                    name="size"
                                    value={size}
                                    onClick={handleFilterChange}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <Button
                    variant="outline"
                    className="clear-filters-btn"
                    onClick={() => setFilters({ type: 'Todos', size: 'Todos', search: '' })}
                >
                    Limpiar Filtros
                </Button>
            </aside>
        </>
    );
};

export default ProductSidebar;
