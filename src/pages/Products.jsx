import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { huggiesCatalog, productSizes, productTypes } from '../data/huggiesCatalog';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState(huggiesCatalog);
    const [filters, setFilters] = useState({
        type: 'Todos',
        size: 'Todos',
        search: ''
    });

    useEffect(() => {
        let result = huggiesCatalog;

        if (filters.type !== 'Todos') {
            result = result.filter(p => p.type === filters.type);
        }

        if (filters.size !== 'Todos') {
            result = result.filter(p => p.size === filters.size);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        setProducts(result);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="products-page">
            <div className="container">
                <div className="products-header">
                    <h1>Catálogo de Productos Huggies</h1>
                    <p>Encuentra el pañal o toallita ideal para cada etapa de tu bebé.</p>
                </div>

                <div className="products-layout">
                    {/* Sidebar Filters */}
                    <aside className="products-sidebar">
                        <div className="filter-section">
                            <h3>Búsqueda</h3>
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar productos..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="search-input"
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

                        <div className="filter-section">
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
                                {productSizes.map(size => (
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

                        <Button
                            variant="outline"
                            className="clear-filters-btn"
                            onClick={() => setFilters({ type: 'Todos', size: 'Todos', search: '' })}
                        >
                            Limpiar Filtros
                        </Button>
                    </aside>

                    {/* Products Grid */}
                    <main className="products-main">
                        <div className="products-results-info">
                            <span>Mostrando <strong>{products.length}</strong> productos</span>
                        </div>

                        {products.length > 0 ? (
                            <div className="products-grid">
                                {products.map(product => (
                                    <Card key={product.id} className="product-card">
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                            {product.discountPrice && (
                                                <div className="discount-badge">Oferta</div>
                                            )}
                                        </div>
                                        <div className="product-content">
                                            <div className="product-tags">
                                                <span className="tag type-tag">{product.type}</span>
                                                <span className="tag size-tag">Talla {product.size}</span>
                                            </div>
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-weight">{product.weightRange}</p>
                                            <p className="product-desc">{product.description}</p>

                                            <div className="product-price">
                                                {product.discountPrice ? (
                                                    <>
                                                        <span className="current-price">${product.discountPrice.toFixed(2)}</span>
                                                        <span className="original-price">${product.price.toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    <span className="current-price">${product.price.toFixed(2)}</span>
                                                )}
                                            </div>

                                            <Button variant="primary" className="add-to-cart-btn">
                                                Agregar al Carrito
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <div className="no-results-icon">🔍</div>
                                <h2>No se encontraron productos</h2>
                                <p>Intenta ajustar tus filtros de búsqueda para ver más resultados.</p>
                                <Button
                                    variant="primary"
                                    onClick={() => setFilters({ type: 'Todos', size: 'Todos', search: '' })}
                                >
                                    Ver todos los productos
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
